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
"[project]/components/ChristmasHeader.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChristmasHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
"use client";
;
function ChristmasHeader() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        style: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 10000,
            background: "linear-gradient(135deg, #0a1628, #184274)",
            boxShadow: "0 2px 14px rgba(0,0,0,0.4)"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
            style: {
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "12px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        gap: "10px"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "/logo.png",
                            alt: "Careerschool",
                            style: {
                                height: "38px"
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/ChristmasHeader.js",
                            lineNumber: 28,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                color: "#ffcb0e",
                                fontWeight: 700,
                                fontSize: "14px",
                                letterSpacing: "1px"
                            },
                            children: "CHRISTMAS OFFER"
                        }, void 0, false, {
                            fileName: "[project]/components/ChristmasHeader.js",
                            lineNumber: 33,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ChristmasHeader.js",
                    lineNumber: 27,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        gap: "22px",
                        alignItems: "center"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "/",
                            style: linkStyle,
                            children: "Home"
                        }, void 0, false, {
                            fileName: "[project]/components/ChristmasHeader.js",
                            lineNumber: 47,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "#programs",
                            style: linkStyle,
                            children: "Programs"
                        }, void 0, false, {
                            fileName: "[project]/components/ChristmasHeader.js",
                            lineNumber: 48,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "#hubspot-form-container",
                            style: ctaStyle,
                            children: "Enroll Now"
                        }, void 0, false, {
                            fileName: "[project]/components/ChristmasHeader.js",
                            lineNumber: 49,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ChristmasHeader.js",
                    lineNumber: 46,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ChristmasHeader.js",
            lineNumber: 16,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ChristmasHeader.js",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
_c = ChristmasHeader;
const linkStyle = {
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "14px"
};
const ctaStyle = {
    background: "linear-gradient(90deg, #ffcb0e, #ffa500)",
    color: "#2E477D",
    padding: "8px 16px",
    borderRadius: "999px",
    fontWeight: 700,
    fontSize: "14px",
    textDecoration: "none"
};
var _c;
__turbopack_context__.k.register(_c, "ChristmasHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/pages/christmas-offer.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChristmasOfferLanding
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChristmasHeader$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ChristmasHeader.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/code.js [client] (ecmascript) <export default as Code>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-column.js [client] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/graduation-cap.js [client] (ecmascript) <export default as GraduationCap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/briefcase.js [client] (ecmascript) <export default as Briefcase>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rocket$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Rocket$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rocket.js [client] (ecmascript) <export default as Rocket>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trophy.js [client] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gift.js [client] (ecmascript) <export default as Gift>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/target.js [client] (ecmascript) <export default as Target>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [client] (ecmascript) <export default as X>");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function ChristmasOfferLanding() {
    _s();
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChristmasHeader$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/christmas-offer.js",
                lineNumber: 85,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    paddingTop: "70px"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            lineNumber: 103,
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
                            lineNumber: 120,
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
                            lineNumber: 134,
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
                                        lineNumber: 172,
                                        columnNumber: 13
                                    }, this)
                                }, i, false, {
                                    fileName: "[project]/pages/christmas-offer.js",
                                    lineNumber: 162,
                                    columnNumber: 11
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/pages/christmas-offer.js",
                            lineNumber: 150,
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
      `
                        }, void 0, false, {
                            fileName: "[project]/pages/christmas-offer.js",
                            lineNumber: 187,
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
                                            lineNumber: 324,
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
                                        lineNumber: 362,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/pages/christmas-offer.js",
                                    lineNumber: 351,
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
                                                            lineNumber: 415,
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
                                                            lineNumber: 427,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/christmas-offer.js",
                                                    lineNumber: 399,
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
                                                        lineNumber: 454,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/christmas-offer.js",
                                                    lineNumber: 442,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/christmas-offer.js",
                                            lineNumber: 392,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/christmas-offer.js",
                                        lineNumber: 386,
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
                                                    lineNumber: 500,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/christmas-offer.js",
                                                lineNumber: 477,
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
                                                        lineNumber: 516,
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
                                                        lineNumber: 528,
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
                                                        lineNumber: 540,
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
                                                        lineNumber: 552,
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
                                                                    lineNumber: 579,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/christmas-offer.js",
                                                                lineNumber: 566,
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
                                                                lineNumber: 582,
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
                                                                        style: {
                                                                            fontSize: "clamp(40px, 8vw, 64px)",
                                                                            fontWeight: "900",
                                                                            color: "#ffffff",
                                                                            lineHeight: "1",
                                                                            marginBottom: "8px"
                                                                        },
                                                                        children: "30% OFF"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/christmas-offer.js",
                                                                        lineNumber: 603,
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
                                                                        lineNumber: 614,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/christmas-offer.js",
                                                                lineNumber: 594,
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
                                                                lineNumber: 627,
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
                                                                lineNumber: 644,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/christmas-offer.js",
                                                        lineNumber: 565,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/christmas-offer.js",
                                                lineNumber: 503,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/christmas-offer.js",
                                        lineNumber: 470,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/pages/christmas-offer.js",
                                    lineNumber: 384,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/christmas-offer.js",
                            lineNumber: 299,
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
                                                lineNumber: 700,
                                                columnNumber: 5
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: "#ffcb0e"
                                                },
                                                children: "Limited Time Offer"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/christmas-offer.js",
                                                lineNumber: 701,
                                                columnNumber: 5
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/christmas-offer.js",
                                        lineNumber: 683,
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
                                                        lineNumber: 730,
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
                                                        lineNumber: 744,
                                                        columnNumber: 9
                                                    }, this)
                                                ]
                                            }, label, true, {
                                                fileName: "[project]/pages/christmas-offer.js",
                                                lineNumber: 720,
                                                columnNumber: 7
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/pages/christmas-offer.js",
                                        lineNumber: 705,
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
                                                style: {
                                                    background: "linear-gradient(135deg, #ffcb0e 0%, #ffa500 100%)",
                                                    WebkitBackgroundClip: "text",
                                                    WebkitTextFillColor: "transparent",
                                                    backgroundClip: "text"
                                                },
                                                children: "30% Off"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/christmas-offer.js",
                                                lineNumber: 769,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                fileName: "[project]/pages/christmas-offer.js",
                                                lineNumber: 779,
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
                                                lineNumber: 780,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/christmas-offer.js",
                                        lineNumber: 759,
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
                                        lineNumber: 792,
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
                                                        lineNumber: 829,
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
                                                        lineNumber: 830,
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
                                                        lineNumber: 833,
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
                                                        lineNumber: 836,
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
                                                        lineNumber: 839,
                                                        columnNumber: 9
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M256 120   C200 60, 120 90, 160 140   C190 165, 230 160, 256 140Z",
                                                        fill: "#FFD966"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/christmas-offer.js",
                                                        lineNumber: 842,
                                                        columnNumber: 9
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M256 120   C312 60, 392 90, 352 140   C322 165, 282 160, 256 140Z",
                                                        fill: "#FFD966"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/christmas-offer.js",
                                                        lineNumber: 850,
                                                        columnNumber: 10
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                        cx: "256",
                                                        cy: "140",
                                                        r: "14",
                                                        fill: "#FFB703"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/christmas-offer.js",
                                                        lineNumber: 858,
                                                        columnNumber: 11
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/christmas-offer.js",
                                                lineNumber: 818,
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
                                                lineNumber: 860,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/christmas-offer.js",
                                        lineNumber: 807,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/christmas-offer.js",
                                lineNumber: 673,
                                columnNumber: 9
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/pages/christmas-offer.js",
                            lineNumber: 662,
                            columnNumber: 7
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "glass-card",
                                    style: {
                                        borderRadius: "clamp(20px, 4vw, 32px)",
                                        padding: "clamp(20px, 4vw, 36px)",
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
                                                        lineNumber: 919,
                                                        columnNumber: 15
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/christmas-offer.js",
                                                    lineNumber: 907,
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
                                                    lineNumber: 921,
                                                    columnNumber: 13
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/christmas-offer.js",
                                            lineNumber: 899,
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
                                                                lineNumber: 982,
                                                                columnNumber: 19
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/christmas-offer.js",
                                                            lineNumber: 970,
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
                                                            lineNumber: 984,
                                                            columnNumber: 17
                                                        }, this)
                                                    ]
                                                }, text, true, {
                                                    fileName: "[project]/pages/christmas-offer.js",
                                                    lineNumber: 957,
                                                    columnNumber: 15
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/pages/christmas-offer.js",
                                            lineNumber: 934,
                                            columnNumber: 11
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/christmas-offer.js",
                                    lineNumber: 889,
                                    columnNumber: 9
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "glass-card",
                                    style: {
                                        borderRadius: "clamp(20px, 4vw, 32px)",
                                        padding: "clamp(24px, 6vw, 48px)",
                                        boxShadow: "0 30px 80px rgba(46, 71, 125, 0.4), 0 0 0 1px rgba(255, 203, 14, 0.3)",
                                        animation: mounted ? "slideUp 0.8s ease-out 0.6s both" : "none",
                                        position: "relative",
                                        overflow: "hidden"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                height: "100%",
                                                background: "linear-gradient(135deg, rgba(46, 71, 125, 0.1), rgba(255, 203, 14, 0.05))",
                                                pointerEvents: "none"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/pages/christmas-offer.js",
                                            lineNumber: 1012,
                                            columnNumber: 11
                                        }, this),
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
                                                        background: "linear-gradient(135deg, #2E477D, #184274)",
                                                        borderRadius: "16px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        boxShadow: "0 8px 24px rgba(46, 71, 125, 0.4)"
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"], {
                                                        size: 28,
                                                        color: "#ffcb0e"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/christmas-offer.js",
                                                        lineNumber: 1045,
                                                        columnNumber: 15
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/christmas-offer.js",
                                                    lineNumber: 1033,
                                                    columnNumber: 13
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    style: {
                                                        fontSize: "clamp(22px, 4vw, 28px)",
                                                        margin: 0,
                                                        fontWeight: "700",
                                                        color: "#ffffff",
                                                        letterSpacing: "-0.5px"
                                                    },
                                                    children: "Premium Programs"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/christmas-offer.js",
                                                    lineNumber: 1047,
                                                    columnNumber: 13
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/christmas-offer.js",
                                            lineNumber: 1025,
                                            columnNumber: 11
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "grid",
                                                gap: "24px",
                                                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))"
                                            },
                                            children: [
                                                {
                                                    Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__["Code"],
                                                    title: "Java Full Stack Development",
                                                    desc: "Master industry-leading Java stack for backend and frontend development.",
                                                    color: "#2E477D"
                                                },
                                                {
                                                    Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"],
                                                    title: "Python Full Stack + AI",
                                                    desc: "From Python web development to building AI applications, all in one course.",
                                                    color: "#ffcb0e"
                                                },
                                                {
                                                    Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"],
                                                    title: "Data Analytics Mastery",
                                                    desc: "Gain in-demand data analytics skills with hands-on projects & mentorship.",
                                                    color: "#184274"
                                                },
                                                {
                                                    Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
                                                    title: "HR Analytics & Strategy",
                                                    desc: "Specialized HR analytics program for future-ready HR professionals.",
                                                    color: "#ffa500"
                                                }
                                            ].map(({ Icon, title, desc, color })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "course-card glass-card",
                                                    style: {
                                                        padding: "clamp(20px, 3vw, 28px)",
                                                        borderRadius: "20px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "18px",
                                                        minHeight: "120px",
                                                        flexDirection: "column",
                                                        textAlign: "center",
                                                        background: "rgba(255,255,255,0.015)"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                width: "54px",
                                                                height: "54px",
                                                                background: color + "20",
                                                                borderRadius: "14px",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                marginBottom: "8px"
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                                size: 28,
                                                                color: color,
                                                                strokeWidth: 2.2
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/christmas-offer.js",
                                                                lineNumber: 1121,
                                                                columnNumber: 19
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/christmas-offer.js",
                                                            lineNumber: 1109,
                                                            columnNumber: 17
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontWeight: 700,
                                                                fontSize: "17px",
                                                                color: "#fff",
                                                                marginBottom: "6px"
                                                            },
                                                            children: title
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/christmas-offer.js",
                                                            lineNumber: 1123,
                                                            columnNumber: 17
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                color: "rgba(255,255,255,0.7)",
                                                                fontSize: "14px"
                                                            },
                                                            children: desc
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/christmas-offer.js",
                                                            lineNumber: 1133,
                                                            columnNumber: 17
                                                        }, this)
                                                    ]
                                                }, title, true, {
                                                    fileName: "[project]/pages/christmas-offer.js",
                                                    lineNumber: 1094,
                                                    columnNumber: 15
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/pages/christmas-offer.js",
                                            lineNumber: 1061,
                                            columnNumber: 11
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                textAlign: "center",
                                                marginTop: "48px",
                                                animation: mounted ? "slideUp 0.8s ease-out 0.7s both" : "none"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    style: {
                                                        fontSize: "clamp(22px,4vw,28px)",
                                                        fontWeight: "800",
                                                        color: "#ffcb0e",
                                                        marginBottom: "16px",
                                                        letterSpacing: "-0.5px"
                                                    },
                                                    children: "Limited seats. Transform your career now."
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/christmas-offer.js",
                                                    lineNumber: 1148,
                                                    columnNumber: 13
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "#hubspot-form-container",
                                                    style: {
                                                        display: "inline-block",
                                                        background: "linear-gradient(90deg, #ffcb0e, #ffa500, #ffcb0e)",
                                                        color: "#2E477D",
                                                        fontWeight: 700,
                                                        fontSize: "18px",
                                                        padding: "16px 32px",
                                                        borderRadius: "16px",
                                                        boxShadow: "0 6px 20px rgba(255, 203, 14, 0.16)",
                                                        textDecoration: "none",
                                                        transition: "background 0.3s, color 0.3s",
                                                        marginTop: "12px",
                                                        letterSpacing: "1.5px",
                                                        animation: "shimmer 3s linear infinite"
                                                    },
                                                    children: "Enroll Now →"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/christmas-offer.js",
                                                    lineNumber: 1159,
                                                    columnNumber: 13
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/christmas-offer.js",
                                            lineNumber: 1141,
                                            columnNumber: 11
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/christmas-offer.js",
                                    lineNumber: 1000,
                                    columnNumber: 9
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    id: "hubspot-form-container",
                                    style: {
                                        position: "relative"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/pages/christmas-offer.js",
                                    lineNumber: 1182,
                                    columnNumber: 9
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/christmas-offer.js",
                            lineNumber: 879,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/christmas-offer.js",
                    lineNumber: 89,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/christmas-offer.js",
                lineNumber: 88,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(ChristmasOfferLanding, "QBE8wkd0OPZ7MWgjaVE8ljBcyFA=");
_c = ChristmasOfferLanding;
ChristmasOfferLanding.noGlobalHeader = true;
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

//# sourceMappingURL=%5Broot-of-the-server%5D__c0c20305._.js.map