(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/pages/christmas-offer.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChristmasOfferLanding
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/code.js [client] (ecmascript) <export default as Code>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-column.js [client] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/graduation-cap.js [client] (ecmascript) <export default as GraduationCap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/briefcase.js [client] (ecmascript) <export default as Briefcase>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rocket$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Rocket$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rocket.js [client] (ecmascript) <export default as Rocket>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trophy.js [client] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gift.js [client] (ecmascript) <export default as Gift>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [client] (ecmascript) <export default as X>");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function ChristmasOfferLanding() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChristmasOfferLanding.useEffect": ()=>{
            document.body.style.overflow = "auto";
            document.documentElement.style.overflow = "auto";
        }
    }["ChristmasOfferLanding.useEffect"], []);
    const scrollToForm = ()=>{
        const form = document.getElementById("hubspot-form-container");
        if (!form) return;
        document.body.style.overflow = "auto";
        document.documentElement.style.overflow = "auto";
        setTimeout(()=>{
            const y = form.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({
                top: y,
                behavior: "smooth"
            });
        }, 200);
    };
    const [timeLeft, setTimeLeft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        d: 0,
        h: 0,
        m: 0,
        s: 0
    });
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [giftOpened, setGiftOpened] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showCoupon, setShowCoupon] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showGraffiti, setShowGraffiti] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [openFaq, setOpenFaq] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const toggleFaq = (index)=>{
        setOpenFaq(openFaq === index ? null : index);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChristmasOfferLanding.useEffect": ()=>{
            setMounted(true);
            const end = new Date(new Date().getFullYear(), 11, 25, 23, 59, 59);
            end.setHours(end.getHours() + 24);
            const t = setInterval({
                "ChristmasOfferLanding.useEffect.t": ()=>{
                    const now = new Date();
                    const diff = end - now;
                    if (diff <= 0) {
                        clearInterval(t);
                        setTimeLeft({
                            h: 0,
                            m: 0,
                            s: 0
                        });
                        return;
                    }
                    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
                    const h = Math.floor(diff / (1000 * 60 * 60) % 24);
                    const m = Math.floor(diff / (1000 * 60) % 60);
                    const s = Math.floor(diff / 1000 % 60);
                    setTimeLeft({
                        d,
                        h,
                        m,
                        s
                    });
                }
            }["ChristmasOfferLanding.useEffect.t"], 1000);
            return ({
                "ChristmasOfferLanding.useEffect": ()=>clearInterval(t)
            })["ChristmasOfferLanding.useEffect"];
        }
    }["ChristmasOfferLanding.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChristmasOfferLanding.useEffect": ()=>{
            const script = document.createElement("script");
            script.src = "https://js-na1.hsforms.net/forms/embed/v2.js";
            script.charset = "utf-8";
            script.type = "text/javascript";
            script.onload = ({
                "ChristmasOfferLanding.useEffect": ()=>{
                    if (window.hbspt) {
                        window.hbspt.forms.create({
                            region: "na2",
                            portalId: "243742367",
                            formId: "6c8ac9f5-394a-4e95-8f95-19e296c157ac",
                            target: "#hubspot-form-container"
                        });
                    }
                }
            })["ChristmasOfferLanding.useEffect"];
            document.body.appendChild(script);
            return ({
                "ChristmasOfferLanding.useEffect": ()=>{
                    if (document.body.contains(script)) {
                        document.body.removeChild(script);
                    }
                }
            })["ChristmasOfferLanding.useEffect"];
        }
    }["ChristmasOfferLanding.useEffect"], []);
    const handleGiftClick = ()=>{
        setGiftOpened(true);
        setTimeout(()=>{
            setShowGraffiti(true);
        }, 300);
        setTimeout(()=>{
            setShowCoupon(true);
        }, 1200);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: "linear-gradient(180deg, #0a1628 0%, #184274 50%, #0a1628 100%)",
            minHeight: "100vh",
            position: "relative",
            overflow: "hidden",
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "#ffffff",
                    padding: "10px 0",
                    borderBottom: "2px solid #ffcb0e",
                    width: "100%"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        maxWidth: "1200px",
                        margin: "0 auto",
                        padding: "0 20px"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "30px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                style: {
                                    textDecoration: "none"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        padding: "8px 12px",
                                        borderRadius: "6px",
                                        background: "rgba(255, 255, 255, 0.9)",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                        cursor: "pointer",
                                        transition: "all 0.3s ease",
                                        display: "flex",
                                        alignItems: "center"
                                    },
                                    onMouseEnter: (e)=>e.currentTarget.style.transform = "scale(1.03)",
                                    onMouseLeave: (e)=>e.currentTarget.style.transform = "scale(1)",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: "/Nav Logo/CSHR - Nav Logo.png",
                                        alt: "CSHR Logo",
                                        style: {
                                            height: "32px",
                                            objectFit: "contain"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/pages/christmas-offer.js",
                                        lineNumber: 162,
                                        columnNumber: 11
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/pages/christmas-offer.js",
                                    lineNumber: 148,
                                    columnNumber: 9
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/christmas-offer.js",
                                lineNumber: 147,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                style: {
                                    textDecoration: "none"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        padding: "8px 12px",
                                        borderRadius: "6px",
                                        background: "rgba(255, 255, 255, 0.9)",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                        cursor: "pointer",
                                        transition: "all 0.3s ease",
                                        display: "flex",
                                        alignItems: "center"
                                    },
                                    onMouseEnter: (e)=>e.currentTarget.style.transform = "scale(1.03)",
                                    onMouseLeave: (e)=>e.currentTarget.style.transform = "scale(1)",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: "/Nav Logo/CSIT - Nav Logo.png",
                                        alt: "CSIT Logo",
                                        style: {
                                            height: "32px",
                                            objectFit: "contain"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/pages/christmas-offer.js",
                                        lineNumber: 189,
                                        columnNumber: 11
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/pages/christmas-offer.js",
                                    lineNumber: 175,
                                    columnNumber: 9
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/christmas-offer.js",
                                lineNumber: 174,
                                columnNumber: 7
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/christmas-offer.js",
                        lineNumber: 139,
                        columnNumber: 5
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/pages/christmas-offer.js",
                    lineNumber: 132,
                    columnNumber: 3
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/christmas-offer.js",
                lineNumber: 124,
                columnNumber: 1
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `
            linear-gradient(rgba(255, 203, 14, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 203, 14, 0.03) 1px, transparent 1px)
          `,
                    backgroundSize: "50px 50px",
                    pointerEvents: "none"
                }
            }, void 0, false, {
                fileName: "[project]/pages/christmas-offer.js",
                lineNumber: 203,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    top: "-20%",
                    right: "-10%",
                    width: "600px",
                    height: "600px",
                    background: "radial-gradient(circle, rgba(46, 71, 125, 0.3) 0%, transparent 70%)",
                    borderRadius: "50%",
                    filter: "blur(80px)",
                    pointerEvents: "none"
                }
            }, void 0, false, {
                fileName: "[project]/pages/christmas-offer.js",
                lineNumber: 220,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    bottom: "-20%",
                    left: "-10%",
                    width: "500px",
                    height: "500px",
                    background: "radial-gradient(circle, rgba(255, 203, 14, 0.15) 0%, transparent 70%)",
                    borderRadius: "50%",
                    filter: "blur(80px)",
                    pointerEvents: "none"
                }
            }, void 0, false, {
                fileName: "[project]/pages/christmas-offer.js",
                lineNumber: 234,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    overflow: "hidden",
                    pointerEvents: "none"
                },
                children: [
                    ...Array(25)
                ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "absolute",
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `sparkle ${Math.random() * 5 + 3}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 3}s`
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                            size: Math.random() * 12 + 8,
                            color: i % 3 === 0 ? "#2E477D" : i % 3 === 1 ? "#ffcb0e" : "#ffffff",
                            opacity: 0.5
                        }, void 0, false, {
                            fileName: "[project]/pages/christmas-offer.js",
                            lineNumber: 272,
                            columnNumber: 13
                        }, this)
                    }, i, false, {
                        fileName: "[project]/pages/christmas-offer.js",
                        lineNumber: 262,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/pages/christmas-offer.js",
                lineNumber: 250,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes sparkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8) translateY(0); }
          50% { opacity: 0.9; transform: scale(1.2) translateY(-20px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes giftLidOpen {
          0% { transform: rotateX(0deg) translateY(0); }
          100% { transform: rotateX(-120deg) translateY(-40px); }
        }
        @keyframes giftBoxShake {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        @keyframes couponPop {
          0% { transform: scale(0) rotate(-10deg); opacity: 0; }
          60% { transform: scale(1.1) rotate(5deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes graffitiPop {
          0% { 
            opacity: 0; 
            transform: translate(-50%, -50%) scale(0) rotate(-180deg);
          }
          50% { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(1.2) rotate(10deg);
          }
          70% { 
            transform: translate(-50%, -50%) scale(0.9) rotate(-5deg);
          }
          100% { 
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.5) rotate(0deg);
          }
        }
        @keyframes confettifall {
          0% { transform: translateY(-100%) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .course-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .course-card:hover {
          transform: translateY(-8px);
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 203, 14, 0.2);
        }
        .countdown-box {
          transition: all 0.3s ease;
        }
        .gift-box {
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .gift-box:hover {
          transform: scale(1.05);
        }
        .gift-box.shake {
          animation: giftBoxShake 0.5s ease;
        }
        @media (max-width: 768px) {
          .course-card {
            flex-direction: column;
            text-align: center;
          }
        }
          /* =====================================
   FORCE SINGLE-LINE COUNTDOWN ON MOBILE
   ===================================== */
@media (max-width: 640px) {
  .countdown-wrapper {
    flex-wrap: nowrap !important;   /* FORCE single row */
    justify-content: center;
    gap: 8px !important;
  }

  .countdown-box {
    padding: 10px 8px !important;
    min-width: 64px !important;
    border-radius: 14px;
  }

  .countdown-box div:first-child {
    font-size: 22px !important;  /* numbers */
    line-height: 1;
  }

  .countdown-box div:last-child {
    font-size: 9px !important;   /* labels */
    letter-spacing: 0.4px;
  }
}
  /* ===== SHINE TEXT EFFECT (30% OFF) ===== */
@keyframes shineText {
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
}

.shine-text {
  background: linear-gradient(
    90deg,
    #666 0%,
    #666 40%,
rgb(255, 230, 0) 50%,
    #666 60%,
    #666 100%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shineText 3s linear infinite;
}
  

    @media (max-width: 640px) {
  .hero-logos {
    justify-content: center !important;
  }
}

    `
            }, void 0, false, {
                fileName: "[project]/pages/christmas-offer.js",
                lineNumber: 287,
                columnNumber: 7
            }, this),
            (giftOpened || showCoupon) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(0, 0, 0, 0.8)",
                    backdropFilter: "blur(8px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000,
                    padding: "20px"
                },
                onClick: ()=>{
                    setGiftOpened(false);
                    setShowCoupon(false);
                    setShowGraffiti(false);
                },
                children: [
                    showGraffiti && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            ...Array(50)
                        ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: "absolute",
                                    left: `${Math.random() * 100}%`,
                                    top: "-10%",
                                    width: `${Math.random() * 10 + 5}px`,
                                    height: `${Math.random() * 10 + 5}px`,
                                    background: [
                                        "#ffcb0e",
                                        "#DC143C",
                                        "#2E477D",
                                        "#ffa500",
                                        "#ffffff"
                                    ][Math.floor(Math.random() * 5)],
                                    borderRadius: Math.random() > 0.5 ? "50%" : "0",
                                    animation: `confettifall ${Math.random() * 2 + 2}s linear forwards`,
                                    animationDelay: `${Math.random() * 0.5}s`,
                                    pointerEvents: "none"
                                }
                            }, i, false, {
                                fileName: "[project]/pages/christmas-offer.js",
                                lineNumber: 457,
                                columnNumber: 17
                            }, this))
                    }, void 0, false),
                    showGraffiti && !showCoupon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            animation: "graffitiPop 1s ease-out forwards",
                            pointerEvents: "none",
                            zIndex: 10
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: "clamp(60px, 15vw, 150px)",
                                fontWeight: "900",
                                background: "linear-gradient(135deg, #ffcb0e, #ffa500, #DC143C, #2E477D)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                textShadow: "0 0 60px rgba(255, 203, 14, 0.8)",
                                letterSpacing: "-4px",
                                transform: "rotate(-10deg)",
                                textAlign: "center",
                                fontFamily: "'Impact', sans-serif",
                                filter: "drop-shadow(0 0 30px rgba(255, 203, 14, 0.6))"
                            },
                            children: "WOW!"
                        }, void 0, false, {
                            fileName: "[project]/pages/christmas-offer.js",
                            lineNumber: 495,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pages/christmas-offer.js",
                        lineNumber: 484,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: (e)=>e.stopPropagation(),
                        children: !showCoupon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: "relative",
                                animation: "float 2s ease-in-out infinite"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: "relative",
                                    width: "200px",
                                    height: "200px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "200px",
                                            height: "60px",
                                            background: "linear-gradient(135deg, #2E477D, #184274)",
                                            borderRadius: "12px 12px 0 0",
                                            transformOrigin: "bottom",
                                            animation: giftOpened ? "giftLidOpen 0.6s ease forwards" : "none",
                                            boxShadow: "0 4px 20px rgba(46, 71, 125, 0.5)",
                                            zIndex: 2
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    position: "absolute",
                                                    top: 0,
                                                    left: "50%",
                                                    transform: "translateX(-50%)",
                                                    width: "30px",
                                                    height: "100%",
                                                    background: "#ffcb0e",
                                                    boxShadow: "0 2px 10px rgba(255, 203, 14, 0.4)"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/pages/christmas-offer.js",
                                                lineNumber: 548,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    position: "absolute",
                                                    top: "-15px",
                                                    left: "50%",
                                                    transform: "translateX(-50%)",
                                                    width: "50px",
                                                    height: "30px",
                                                    background: "#ffcb0e",
                                                    borderRadius: "50%",
                                                    boxShadow: "0 4px 15px rgba(255, 203, 14, 0.6)"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/pages/christmas-offer.js",
                                                lineNumber: 560,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/christmas-offer.js",
                                        lineNumber: 532,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: "absolute",
                                            top: "60px",
                                            left: 0,
                                            width: "200px",
                                            height: "140px",
                                            background: "linear-gradient(135deg, #DC143C, #B91C1C)",
                                            borderRadius: "0 0 12px 12px",
                                            boxShadow: "0 8px 30px rgba(220, 20, 60, 0.5)"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: "absolute",
                                                top: 0,
                                                left: "50%",
                                                transform: "translateX(-50%)",
                                                width: "30px",
                                                height: "100%",
                                                background: "#ffcb0e",
                                                boxShadow: "0 2px 10px rgba(255, 203, 14, 0.4)"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/pages/christmas-offer.js",
                                            lineNumber: 587,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/christmas-offer.js",
                                        lineNumber: 575,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/christmas-offer.js",
                                lineNumber: 525,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/pages/christmas-offer.js",
                            lineNumber: 519,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: "relative",
                                width: "min(500px, 90vw)",
                                animation: "couponPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setGiftOpened(false);
                                        setShowCoupon(false);
                                        setShowGraffiti(false);
                                    },
                                    style: {
                                        position: "absolute",
                                        top: "-15px",
                                        right: "-15px",
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%",
                                        background: "#DC143C",
                                        border: "none",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        boxShadow: "0 4px 15px rgba(220, 20, 60, 0.5)",
                                        zIndex: 10
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 20,
                                        color: "#ffffff"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/christmas-offer.js",
                                        lineNumber: 633,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/pages/christmas-offer.js",
                                    lineNumber: 610,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: "linear-gradient(135deg, #2E477D 0%, #184274 100%)",
                                        borderRadius: "24px",
                                        padding: "clamp(24px, 5vw, 48px)",
                                        border: "3px solid #ffcb0e",
                                        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 8px rgba(255, 203, 14, 0.1)",
                                        position: "relative",
                                        overflow: "hidden"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: "absolute",
                                                top: "12px",
                                                left: "12px",
                                                width: "40px",
                                                height: "40px",
                                                borderTop: "4px solid #ffcb0e",
                                                borderLeft: "4px solid #ffcb0e",
                                                borderRadius: "8px 0 0 0"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/pages/christmas-offer.js",
                                            lineNumber: 649,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: "absolute",
                                                top: "12px",
                                                right: "12px",
                                                width: "40px",
                                                height: "40px",
                                                borderTop: "4px solid #ffcb0e",
                                                borderRight: "4px solid #ffcb0e",
                                                borderRadius: "0 8px 0 0"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/pages/christmas-offer.js",
                                            lineNumber: 661,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: "absolute",
                                                bottom: "12px",
                                                left: "12px",
                                                width: "40px",
                                                height: "40px",
                                                borderBottom: "4px solid #ffcb0e",
                                                borderLeft: "4px solid #ffcb0e",
                                                borderRadius: "0 0 0 8px"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/pages/christmas-offer.js",
                                            lineNumber: 673,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: "absolute",
                                                bottom: "12px",
                                                right: "12px",
                                                width: "40px",
                                                height: "40px",
                                                borderBottom: "4px solid #ffcb0e",
                                                borderRight: "4px solid #ffcb0e",
                                                borderRadius: "0 0 8px 0"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/pages/christmas-offer.js",
                                            lineNumber: 685,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                textAlign: "center",
                                                position: "relative"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        width: "80px",
                                                        height: "80px",
                                                        background: "linear-gradient(135deg, #ffcb0e, #ffa500)",
                                                        borderRadius: "50%",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        margin: "0 auto 24px",
                                                        boxShadow: "0 8px 30px rgba(255, 203, 14, 0.5)"
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__["Gift"], {
                                                        size: 40,
                                                        color: "#2E477D",
                                                        strokeWidth: 2.5
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/christmas-offer.js",
                                                        lineNumber: 712,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/christmas-offer.js",
                                                    lineNumber: 699,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    style: {
                                                        fontSize: "clamp(24px, 5vw, 36px)",
                                                        fontWeight: "800",
                                                        color: "#ffcb0e",
                                                        marginBottom: "16px",
                                                        textShadow: "0 2px 10px rgba(255, 203, 14, 0.3)"
                                                    },
                                                    children: "CHRISTMAS SPECIAL"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/christmas-offer.js",
                                                    lineNumber: 715,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        background: "rgba(255, 203, 14, 0.1)",
                                                        border: "2px dashed #ffcb0e",
                                                        borderRadius: "16px",
                                                        padding: "20px",
                                                        marginBottom: "24px"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "shine-text",
                                                            style: {
                                                                fontSize: "clamp(40px, 8vw, 64px)",
                                                                fontWeight: "900",
                                                                lineHeight: "1",
                                                                marginBottom: "8px",
                                                                textTransform: "uppercase",
                                                                letterSpacing: "3px"
                                                            },
                                                            children: "30% OFF"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/christmas-offer.js",
                                                            lineNumber: 736,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: "clamp(16px, 3vw, 20px)",
                                                                color: "#ffcb0e",
                                                                fontWeight: "600",
                                                                textTransform: "uppercase",
                                                                letterSpacing: "2px"
                                                            },
                                                            children: "Training & Placement Program"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/christmas-offer.js",
                                                            lineNumber: 749,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/christmas-offer.js",
                                                    lineNumber: 727,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        background: "linear-gradient(90deg, #ffcb0e, #ffa500, #ffcb0e)",
                                                        backgroundSize: "200% auto",
                                                        animation: "shimmer 3s linear infinite",
                                                        padding: "12px 24px",
                                                        borderRadius: "12px",
                                                        fontSize: "18px",
                                                        fontWeight: "700",
                                                        color: "#2E477D",
                                                        marginBottom: "16px",
                                                        letterSpacing: "2px"
                                                    },
                                                    children: "CODE: XMAS2025"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/christmas-offer.js",
                                                    lineNumber: 762,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontSize: "14px",
                                                        color: "rgba(255, 255, 255, 0.7)",
                                                        margin: 0
                                                    },
                                                    children: "Share this code with HR to claim your offer🎄"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/christmas-offer.js",
                                                    lineNumber: 779,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/christmas-offer.js",
                                            lineNumber: 698,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/christmas-offer.js",
                                    lineNumber: 636,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/christmas-offer.js",
                            lineNumber: 603,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pages/christmas-offer.js",
                        lineNumber: 517,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/christmas-offer.js",
                lineNumber: 432,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    background: "linear-gradient(135deg, rgba(46, 71, 125, 0.3) 0%, rgba(24, 66, 116, 0.3) 100%)",
                    padding: "clamp(40px, 8vw, 80px) 24px clamp(60px, 10vw, 100px)",
                    textAlign: "center",
                    color: "#fff",
                    position: "relative",
                    borderBottom: "1px solid rgba(255, 203, 14, 0.2)"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "24px",
                        marginBottom: "32px"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px",
                                background: "linear-gradient(135deg, rgba(46, 71, 125, 0.4), rgba(255, 203, 14, 0.2))",
                                backdropFilter: "blur(10px)",
                                padding: "10px 24px",
                                borderRadius: "100px",
                                fontSize: "13px",
                                fontWeight: "600",
                                textTransform: "uppercase",
                                letterSpacing: "1.5px",
                                border: "1px solid rgba(255, 203, 14, 0.3)"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                    size: 16,
                                    color: "#ffcb0e"
                                }, void 0, false, {
                                    fileName: "[project]/pages/christmas-offer.js",
                                    lineNumber: 835,
                                    columnNumber: 5
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: "#ffcb0e"
                                    },
                                    children: "Limited Time Offer"
                                }, void 0, false, {
                                    fileName: "[project]/pages/christmas-offer.js",
                                    lineNumber: 836,
                                    columnNumber: 5
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/christmas-offer.js",
                            lineNumber: 818,
                            columnNumber: 3
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "countdown-wrapper",
                            style: {
                                display: "flex",
                                gap: "16px",
                                flexWrap: "wrap",
                                justifyContent: "center"
                            },
                            children: [
                                {
                                    label: "Days",
                                    value: timeLeft.d
                                },
                                {
                                    label: "Hours",
                                    value: timeLeft.h
                                },
                                {
                                    label: "Minutes",
                                    value: timeLeft.m
                                },
                                {
                                    label: "Seconds",
                                    value: timeLeft.s
                                }
                            ].map(({ label, value })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "countdown-box glass-card",
                                    style: {
                                        padding: "24px 28px",
                                        borderRadius: "20px",
                                        minWidth: "100px",
                                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: "40px",
                                                fontWeight: "800",
                                                background: "linear-gradient(135deg, #ffcb0e, #ffa500)",
                                                WebkitBackgroundClip: "text",
                                                WebkitTextFillColor: "transparent",
                                                backgroundClip: "text",
                                                lineHeight: "1",
                                                marginBottom: "8px"
                                            },
                                            children: String(value).padStart(2, "0")
                                        }, void 0, false, {
                                            fileName: "[project]/pages/christmas-offer.js",
                                            lineNumber: 865,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: "12px",
                                                fontWeight: "600",
                                                color: "rgba(255, 203, 14, 0.8)",
                                                textTransform: "uppercase",
                                                letterSpacing: "1px"
                                            },
                                            children: label
                                        }, void 0, false, {
                                            fileName: "[project]/pages/christmas-offer.js",
                                            lineNumber: 879,
                                            columnNumber: 9
                                        }, this)
                                    ]
                                }, label, true, {
                                    fileName: "[project]/pages/christmas-offer.js",
                                    lineNumber: 855,
                                    columnNumber: 7
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/pages/christmas-offer.js",
                            lineNumber: 840,
                            columnNumber: 3
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            style: {
                                fontSize: "clamp(36px, 7vw, 72px)",
                                fontWeight: "800",
                                margin: "0 0 20px",
                                lineHeight: "1.1",
                                letterSpacing: "-2px"
                            },
                            children: [
                                "Unlock",
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "shine-text",
                                    style: {
                                        fontWeight: "900",
                                        letterSpacing: "3px"
                                    },
                                    children: "30% OFF"
                                }, void 0, false, {
                                    fileName: "[project]/pages/christmas-offer.js",
                                    lineNumber: 904,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/pages/christmas-offer.js",
                                    lineNumber: 913,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: "clamp(20px, 4vw, 36px)",
                                        fontWeight: "600",
                                        opacity: 0.95,
                                        color: "#ffffff"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/pages/christmas-offer.js",
                                    lineNumber: 914,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/christmas-offer.js",
                            lineNumber: 894,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: "clamp(14px, 3vw, 18px)",
                                maxWidth: "650px",
                                margin: "0 auto 48px",
                                opacity: 0.85,
                                lineHeight: "1.7",
                                fontWeight: "400",
                                padding: "0 16px"
                            },
                            children: "Transform your career with industry-leading training. Build real projects, master cutting-edge skills, and secure your dream job."
                        }, void 0, false, {
                            fileName: "[project]/pages/christmas-offer.js",
                            lineNumber: 926,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "gift-box",
                            onClick: handleGiftClick,
                            style: {
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                marginBottom: "32px",
                                position: "relative"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "160",
                                    height: "160",
                                    viewBox: "0 0 512 512",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    style: {
                                        filter: "drop-shadow(0 14px 35px rgba(0,0,0,0.45))",
                                        animation: "float 2.8s ease-in-out infinite"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                            x: "64",
                                            y: "200",
                                            width: "384",
                                            height: "248",
                                            rx: "20",
                                            fill: "#EB2335"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/christmas-offer.js",
                                            lineNumber: 963,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                            x: "64",
                                            y: "200",
                                            width: "384",
                                            height: "248",
                                            rx: "20",
                                            fill: "#ED3949",
                                            opacity: "0.6"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/christmas-offer.js",
                                            lineNumber: 964,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                            x: "48",
                                            y: "140",
                                            width: "416",
                                            height: "72",
                                            rx: "18",
                                            fill: "#C81D2A"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/christmas-offer.js",
                                            lineNumber: 967,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                            x: "236",
                                            y: "140",
                                            width: "40",
                                            height: "308",
                                            fill: "#FFC943"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/christmas-offer.js",
                                            lineNumber: 970,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                            x: "48",
                                            y: "172",
                                            width: "416",
                                            height: "36",
                                            fill: "#FFC943"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/christmas-offer.js",
                                            lineNumber: 973,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M256 120   C200 60, 120 90, 160 140   C190 165, 230 160, 256 140Z",
                                            fill: "#FFD966"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/christmas-offer.js",
                                            lineNumber: 976,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M256 120   C312 60, 392 90, 352 140   C322 165, 282 160, 256 140Z",
                                            fill: "#FFD966"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/christmas-offer.js",
                                            lineNumber: 984,
                                            columnNumber: 10
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "256",
                                            cy: "140",
                                            r: "14",
                                            fill: "#FFB703"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/christmas-offer.js",
                                            lineNumber: 992,
                                            columnNumber: 11
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/christmas-offer.js",
                                    lineNumber: 952,
                                    columnNumber: 5
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        marginTop: "16px",
                                        fontSize: "14px",
                                        color: "#ffcb0e",
                                        fontWeight: "600",
                                        textTransform: "uppercase",
                                        letterSpacing: "1px",
                                        textAlign: "center"
                                    },
                                    children: "🎁 Click to reveal your offer"
                                }, void 0, false, {
                                    fileName: "[project]/pages/christmas-offer.js",
                                    lineNumber: 994,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/christmas-offer.js",
                            lineNumber: 941,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/christmas-offer.js",
                    lineNumber: 808,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/christmas-offer.js",
                lineNumber: 797,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: "100%",
                    maxWidth: "420px",
                    height: "1px",
                    margin: "48px auto 24px",
                    background: "linear-gradient(90deg, transparent, rgba(255,203,14,0.6), transparent)"
                }
            }, void 0, false, {
                fileName: "[project]/pages/christmas-offer.js",
                lineNumber: 1013,
                columnNumber: 1
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                style: {
                    maxWidth: "760px",
                    margin: "clamp(-30px, -5vw, -50px) auto 0",
                    padding: "0 24px clamp(40px, 8vw, 80px)",
                    position: "relative",
                    zIndex: 1
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        style: {
                            marginBottom: "48px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    textAlign: "center",
                                    fontSize: "clamp(24px, 5vw, 32px)",
                                    fontWeight: "800",
                                    color: "#ffffff",
                                    marginTop: "32px",
                                    marginBottom: "32px",
                                    letterSpacing: "-0.5px"
                                },
                                children: "Premium Training Programs"
                            }, void 0, false, {
                                fileName: "[project]/pages/christmas-offer.js",
                                lineNumber: 1036,
                                columnNumber: 1
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                                    gap: "24px"
                                },
                                children: [
                                    {
                                        title: "Java Full Stack",
                                        subtitle: "Backend • Frontend • Placement",
                                        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__["Code"],
                                        color: "#ffcb0e"
                                    },
                                    {
                                        title: "HR Analytics",
                                        subtitle: "HR Data • Insights • Strategy",
                                        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
                                        color: "#4ade80"
                                    },
                                    {
                                        title: "Zoho Payroll",
                                        subtitle: "Payroll • Compliance • HR Ops",
                                        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__["Briefcase"],
                                        color: "#60a5fa"
                                    },
                                    {
                                        title: "Data Analytics",
                                        subtitle: "Excel • SQL • Power BI • Python",
                                        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"],
                                        color: "#f97316"
                                    }
                                ].map(({ title, subtitle, Icon, color })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "glass-card",
                                        style: {
                                            borderRadius: "20px",
                                            padding: "28px 22px",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            textAlign: "center",
                                            boxShadow: "0 14px 40px rgba(0,0,0,0.35)",
                                            transition: "transform 0.3s ease"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    width: "72px",
                                                    height: "72px",
                                                    borderRadius: "18px",
                                                    background: `${color}20`,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    marginBottom: "16px",
                                                    boxShadow: `0 8px 24px ${color}55`
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                    size: 36,
                                                    color: color,
                                                    strokeWidth: 2.2
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/christmas-offer.js",
                                                    lineNumber: 1111,
                                                    columnNumber: 11
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/christmas-offer.js",
                                                lineNumber: 1098,
                                                columnNumber: 9
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                style: {
                                                    fontSize: "18px",
                                                    fontWeight: "800",
                                                    color: "#ffffff",
                                                    marginBottom: "6px"
                                                },
                                                children: title
                                            }, void 0, false, {
                                                fileName: "[project]/pages/christmas-offer.js",
                                                lineNumber: 1114,
                                                columnNumber: 9
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: "13px",
                                                    color: "rgba(255,255,255,0.75)",
                                                    marginBottom: "20px"
                                                },
                                                children: subtitle
                                            }, void 0, false, {
                                                fileName: "[project]/pages/christmas-offer.js",
                                                lineNumber: 1125,
                                                columnNumber: 9
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: scrollToForm,
                                                style: {
                                                    marginTop: "auto",
                                                    background: "linear-gradient(90deg, #ffcb0e, #ffa500)",
                                                    color: "#2E477D",
                                                    fontWeight: "800",
                                                    fontSize: "14px",
                                                    padding: "12px 18px",
                                                    borderRadius: "14px",
                                                    border: "none",
                                                    cursor: "pointer",
                                                    letterSpacing: "1px",
                                                    boxShadow: "0 6px 20px rgba(255,203,14,0.35)"
                                                },
                                                children: "Claim 30% OFF"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/christmas-offer.js",
                                                lineNumber: 1136,
                                                columnNumber: 3
                                            }, this)
                                        ]
                                    }, title, true, {
                                        fileName: "[project]/pages/christmas-offer.js",
                                        lineNumber: 1083,
                                        columnNumber: 7
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/pages/christmas-offer.js",
                                lineNumber: 1050,
                                columnNumber: 3
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/christmas-offer.js",
                        lineNumber: 1035,
                        columnNumber: 1
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        id: "hubspot-form-container",
                        style: {
                            position: "relative"
                        }
                    }, void 0, false, {
                        fileName: "[project]/pages/christmas-offer.js",
                        lineNumber: 1161,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass-card",
                        style: {
                            borderRadius: "clamp(20px, 4vw, 32px)",
                            padding: "clamp(20px, 4vw, 36px)",
                            marginTop: "64px",
                            marginBottom: "32px",
                            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                            animation: mounted ? "slideUp 0.8s ease-out 0.2s both" : "none"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "16px",
                                    marginBottom: "32px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: "56px",
                                            height: "56px",
                                            background: "linear-gradient(135deg, #ffcb0e, #ffa500)",
                                            borderRadius: "16px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            boxShadow: "0 8px 24px rgba(255, 203, 14, 0.4)"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                            size: 28,
                                            color: "#2E477D"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/christmas-offer.js",
                                            lineNumber: 1195,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/christmas-offer.js",
                                        lineNumber: 1183,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        style: {
                                            fontSize: "clamp(22px, 4vw, 28px)",
                                            margin: 0,
                                            fontWeight: "700",
                                            color: "#ffffff",
                                            letterSpacing: "-0.5px"
                                        },
                                        children: "Why CareerSchool"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/christmas-offer.js",
                                        lineNumber: 1197,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/christmas-offer.js",
                                lineNumber: 1175,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "grid",
                                    gap: "16px"
                                },
                                children: [
                                    {
                                        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__["GraduationCap"],
                                        text: "Industry-aligned curriculum crafted by experts",
                                        color: "#2E477D"
                                    },
                                    {
                                        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__["Briefcase"],
                                        text: "Real-world projects with personalized mentorship",
                                        color: "#ffcb0e"
                                    },
                                    {
                                        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rocket$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Rocket$3e$__["Rocket"],
                                        text: "Comprehensive placement & interview preparation",
                                        color: "#184274"
                                    },
                                    {
                                        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"],
                                        text: "Trusted training partner for 500+ institutions",
                                        color: "#ffa500"
                                    }
                                ].map(({ Icon, text, color })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "16px",
                                            padding: "20px",
                                            background: "rgba(255,255,255,0.02)",
                                            borderRadius: "16px",
                                            border: "1px solid rgba(255, 203, 14, 0.1)",
                                            transition: "all 0.3s ease"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    width: "44px",
                                                    height: "44px",
                                                    background: `${color}20`,
                                                    borderRadius: "12px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    flexShrink: 0
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                    size: 22,
                                                    color: color,
                                                    strokeWidth: 2
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/christmas-offer.js",
                                                    lineNumber: 1258,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/christmas-offer.js",
                                                lineNumber: 1246,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: "clamp(14px, 2.5vw, 16px)",
                                                    fontWeight: "500",
                                                    color: "rgba(255,255,255,0.9)",
                                                    lineHeight: "1.5"
                                                },
                                                children: text
                                            }, void 0, false, {
                                                fileName: "[project]/pages/christmas-offer.js",
                                                lineNumber: 1261,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, text, true, {
                                        fileName: "[project]/pages/christmas-offer.js",
                                        lineNumber: 1233,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/pages/christmas-offer.js",
                                lineNumber: 1210,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/christmas-offer.js",
                        lineNumber: 1164,
                        columnNumber: 1
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass-card",
                        style: {
                            borderRadius: "clamp(20px, 4vw, 32px)",
                            padding: "clamp(20px, 4vw, 36px)",
                            boxShadow: "0 20px 60px rgba(0,0,0,0.4)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                style: {
                                    textAlign: "center",
                                    fontSize: "clamp(22px, 4vw, 28px)",
                                    fontWeight: "800",
                                    color: "#ffffff",
                                    marginBottom: "32px",
                                    letterSpacing: "-0.5px"
                                },
                                children: "FAQ Questions"
                            }, void 0, false, {
                                fileName: "[project]/pages/christmas-offer.js",
                                lineNumber: 1288,
                                columnNumber: 3
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "grid",
                                    gap: "16px"
                                },
                                children: [
                                    {
                                        q: "What are the best placement-oriented training courses after graduation?",
                                        a: "At Careerschool HR & IT Solutions, we offer top-rated career programs like Python Full Stack, Data Analytics, HR Analytics, Digital Marketing, and Java Training with internship and placement support."
                                    },
                                    {
                                        q: "Does Careerschool provide placement assistance after completing the training?",
                                        a: "Yes! Every training program at Careerschool includes pre-placement and post-placement support — interview preparation, resume building, aptitude sessions, and company tie-ups."
                                    },
                                    {
                                        q: "Why should I choose Careerschool HR & IT Solutions for training and placement?",
                                        a: "Careerschool stands out for its industry-ready curriculum, live tools exposure, certified trainers, internships, and placement tie-ups across India."
                                    },
                                    {
                                        q: "Who can enroll in Careerschool training & internship programs?",
                                        a: "College students, fresh graduates, and working professionals can enroll. No prior technical background is required — courses are beginner-friendly."
                                    },
                                    {
                                        q: "Do you have any free courses or demo training programs?",
                                        a: "Yes, Careerschool provides free demo sessions and career guidance workshops to help learners choose the right career path."
                                    },
                                    {
                                        q: "Do you have courses in Chennai and Nellore only?",
                                        a: "We offer offline training in Guindy (Chennai) and Nellore, along with LIVE online classes accessible from anywhere in India."
                                    }
                                ].map((faq, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            borderRadius: "16px",
                                            background: "rgba(255,255,255,0.03)",
                                            border: "1px solid rgba(255,203,14,0.15)",
                                            overflow: "hidden"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>toggleFaq(i),
                                                style: {
                                                    width: "100%",
                                                    padding: "18px 20px",
                                                    textAlign: "left",
                                                    background: "transparent",
                                                    border: "none",
                                                    color: "#ffffff",
                                                    fontSize: "clamp(14px, 2.5vw, 16px)",
                                                    fontWeight: "600",
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    cursor: "pointer"
                                                },
                                                children: [
                                                    faq.q,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: "22px",
                                                            color: "#ffcb0e",
                                                            fontWeight: "800"
                                                        },
                                                        children: openFaq === i ? "−" : "+"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/christmas-offer.js",
                                                        lineNumber: 1357,
                                                        columnNumber: 11
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/christmas-offer.js",
                                                lineNumber: 1339,
                                                columnNumber: 9
                                            }, this),
                                            openFaq === i && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    padding: "16px 20px 20px",
                                                    fontSize: "clamp(13px, 2.5vw, 15px)",
                                                    lineHeight: "1.6",
                                                    color: "rgba(255,255,255,0.85)",
                                                    borderTop: "1px solid rgba(255,203,14,0.1)",
                                                    background: "rgba(0,0,0,0.15)"
                                                },
                                                children: faq.a
                                            }, void 0, false, {
                                                fileName: "[project]/pages/christmas-offer.js",
                                                lineNumber: 1370,
                                                columnNumber: 11
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/pages/christmas-offer.js",
                                        lineNumber: 1329,
                                        columnNumber: 7
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/pages/christmas-offer.js",
                                lineNumber: 1302,
                                columnNumber: 3
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/christmas-offer.js",
                        lineNumber: 1279,
                        columnNumber: 1
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/christmas-offer.js",
                lineNumber: 1024,
                columnNumber: 11
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/christmas-offer.js",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
_s(ChristmasOfferLanding, "qNYLPeRDZpbtBdKelZSYtCprTKY=");
_c = ChristmasOfferLanding;
var _c;
__turbopack_context__.k.register(_c, "ChristmasOfferLanding");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/christmas-offer.js [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/christmas-offer";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/christmas-offer.js [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/pages/christmas-offer\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/christmas-offer.js [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__f90c0bf1._.js.map