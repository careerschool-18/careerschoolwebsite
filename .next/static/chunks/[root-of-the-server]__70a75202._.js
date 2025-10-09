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
"[project]/cshr-website-full/components/HeroBanner.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HeroBanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/node_modules/styled-jsx/style.js [client] (ecmascript)");
;
;
function HeroBanner() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "jsx-5e5e868ec3c375f7" + " " + "py-1 sm:py-2 relative overflow-hidden bg-[#f9ca1b]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-5e5e868ec3c375f7" + " " + "container mx-auto flex items-center justify-between px-4 relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-5e5e868ec3c375f7" + " " + "overflow-hidden whitespace-nowrap w-full relative pr-[130px]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-5e5e868ec3c375f7" + " " + "animate-marquee text-sm sm:text-lg md:text-xl font-bold text-black inline-block",
                            children: "PYTHON with AI Training - Batch Starts Soon! • PYTHON with AI Training - Batch Starts Soon! • PYTHON with AI Training - Batch Starts Soon! •"
                        }, void 0, false, {
                            fileName: "[project]/cshr-website-full/components/HeroBanner.js",
                            lineNumber: 8,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/cshr-website-full/components/HeroBanner.js",
                        lineNumber: 6,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "jsx-5e5e868ec3c375f7" + " " + "bg-[#1f4a7e] text-[#f9ca1b] px-3 sm:px-5 py-1.5 font-semibold rounded-[7px] text-xs sm:text-sm absolute right-4 sm:right-8 top-1/2 transform -translate-y-1/2 z-10",
                        children: "ENROLL NOW"
                    }, void 0, false, {
                        fileName: "[project]/cshr-website-full/components/HeroBanner.js",
                        lineNumber: 14,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cshr-website-full/components/HeroBanner.js",
                lineNumber: 4,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                id: "5e5e868ec3c375f7",
                children: "@keyframes marquee{0%{transform:translate(0)}to{transform:translate(-100%)}}.animate-marquee.jsx-5e5e868ec3c375f7{white-space:nowrap;animation:15s linear infinite marquee;display:inline-block}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cshr-website-full/components/HeroBanner.js",
        lineNumber: 3,
        columnNumber: 5
    }, this);
}
_c = HeroBanner;
var _c;
__turbopack_context__.k.register(_c, "HeroBanner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/cshr-website-full/components/Header.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [client] (ecmascript) <export default as X>");
;
var _s = __turbopack_context__.k.signature();
;
;
function Header() {
    _s();
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "flex items-center justify-between px-6 py-4 bg-white shadow relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-shrink-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: "/logo.png",
                    alt: "Logo",
                    className: "h-10 w-auto"
                }, void 0, false, {
                    fileName: "[project]/cshr-website-full/components/Header.js",
                    lineNumber: 11,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/Header.js",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "hidden md:flex items-center gap-3 ml-auto mr-4",
                children: [
                    "Courses",
                    "Placement",
                    "Services",
                    "Hire Students"
                ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "#",
                        className: "bg-blue-100 text-blue-700 px-4 py-2 rounded font-semibold text-sm hover:bg-blue-200 transition",
                        children: item
                    }, item, false, {
                        fileName: "[project]/cshr-website-full/components/Header.js",
                        lineNumber: 17,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/Header.js",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hidden md:block",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "bg-blue-600 text-white px-5 py-2 rounded font-semibold text-sm hover:bg-blue-700 transition",
                    children: "Contact Us"
                }, void 0, false, {
                    fileName: "[project]/cshr-website-full/components/Header.js",
                    lineNumber: 29,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/Header.js",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "md:hidden text-gray-800 focus:outline-none",
                onClick: ()=>setMenuOpen(!menuOpen),
                children: menuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                    size: 28
                }, void 0, false, {
                    fileName: "[project]/cshr-website-full/components/Header.js",
                    lineNumber: 39,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                    size: 28
                }, void 0, false, {
                    fileName: "[project]/cshr-website-full/components/Header.js",
                    lineNumber: 39,
                    columnNumber: 39
                }, this)
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/Header.js",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            menuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-6 md:hidden z-50",
                children: [
                    [
                        "Courses",
                        "Placement",
                        "Services",
                        "Hire Students"
                    ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "#",
                            className: "bg-blue-100 text-blue-700 px-6 py-2 rounded font-semibold text-sm hover:bg-blue-200 transition",
                            children: item
                        }, item, false, {
                            fileName: "[project]/cshr-website-full/components/Header.js",
                            lineNumber: 46,
                            columnNumber: 13
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700 transition",
                        children: "Contact Us"
                    }, void 0, false, {
                        fileName: "[project]/cshr-website-full/components/Header.js",
                        lineNumber: 54,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cshr-website-full/components/Header.js",
                lineNumber: 44,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cshr-website-full/components/Header.js",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_s(Header, "K77eQVFAaxZgbvGoNWFAiCE7OTY=");
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/cshr-website-full/components/FullImage.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FullImage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
;
function FullImage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "relative w-full h-screen overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: "/full-image.jpg",
                alt: "Full Screen",
                className: "w-full h-full object-cover"
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/FullImage.js",
                lineNumber: 5,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/40"
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/FullImage.js",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute left-4 top-1/2 transform -translate-y-1/2 max-w-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-[#ffd02b] text-base sm:text-2xl md:text-4xl font-bold leading-snug",
                    children: [
                        "Learn In-Demand ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/cshr-website-full/components/FullImage.js",
                            lineNumber: 17,
                            columnNumber: 27
                        }, this),
                        " Skills and Get Ready ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/cshr-website-full/components/FullImage.js",
                            lineNumber: 17,
                            columnNumber: 55
                        }, this),
                        " For Your Dream Job"
                    ]
                }, void 0, true, {
                    fileName: "[project]/cshr-website-full/components/FullImage.js",
                    lineNumber: 16,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/FullImage.js",
                lineNumber: 15,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cshr-website-full/components/FullImage.js",
        lineNumber: 3,
        columnNumber: 5
    }, this);
}
_c = FullImage;
var _c;
__turbopack_context__.k.register(_c, "FullImage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/cshr-website-full/components/GoogleReview.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ShowcaseSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/node_modules/react/index.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function ShowcaseSection() {
    _s();
    const words = [
        "STUDENTS",
        "TRAINING",
        "PLACEMENT"
    ];
    const [text, setText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [index, setIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isDeleting, setIsDeleting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // 🎬 Typewriter Effect
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ShowcaseSection.useEffect": ()=>{
            const current = words[index];
            const speed = isDeleting ? 80 : 120;
            const typingEffect = setTimeout({
                "ShowcaseSection.useEffect.typingEffect": ()=>{
                    if (!isDeleting) {
                        setText(current.substring(0, text.length + 1));
                        if (text === current) {
                            setTimeout({
                                "ShowcaseSection.useEffect.typingEffect": ()=>setIsDeleting(true)
                            }["ShowcaseSection.useEffect.typingEffect"], 1000);
                        }
                    } else {
                        setText(current.substring(0, text.length - 1));
                        if (text === "") {
                            setIsDeleting(false);
                            setIndex({
                                "ShowcaseSection.useEffect.typingEffect": (prev)=>(prev + 1) % words.length
                            }["ShowcaseSection.useEffect.typingEffect"]);
                        }
                    }
                }
            }["ShowcaseSection.useEffect.typingEffect"], speed);
            return ({
                "ShowcaseSection.useEffect": ()=>clearTimeout(typingEffect)
            })["ShowcaseSection.useEffect"];
        }
    }["ShowcaseSection.useEffect"], [
        text,
        isDeleting,
        index
    ]);
    // 🖼️ Slides
    const slides = [
        {
            src: "/Website - Social Media Banner (Google).png",
            link: "https://www.google.com/search?q=Career+School+HR+Solutions+Reviews",
            alt: "Google Reviews"
        },
        {
            src: "/Website - Social Media Banner (LinkedIn).png",
            link: "https://www.linkedin.com/company/careerschool-hr-solutions/",
            alt: "LinkedIn Page"
        },
        {
            src: "/Website - Social Media Banner (Instagram).png",
            link: "https://www.instagram.com/careerschoolhrsolutions",
            alt: "Instagram Page"
        }
    ];
    const [current, setCurrent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // ⏱️ Auto-slide every 5 seconds
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ShowcaseSection.useEffect": ()=>{
            const interval = setInterval({
                "ShowcaseSection.useEffect.interval": ()=>{
                    setCurrent({
                        "ShowcaseSection.useEffect.interval": (prev)=>(prev + 1) % slides.length
                    }["ShowcaseSection.useEffect.interval"]);
                }
            }["ShowcaseSection.useEffect.interval"], 5000);
            return ({
                "ShowcaseSection.useEffect": ()=>clearInterval(interval)
            })["ShowcaseSection.useEffect"];
        }
    }["ShowcaseSection.useEffect"], [
        slides.length
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "w-full flex flex-col items-center justify-start text-center overflow-hidden bg-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "py-10 px-4 z-10 relative bg-white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg sm:text-xl font-semibold text-gray-700 mb-4",
                        children: "Learners’ Career Transitions"
                    }, void 0, false, {
                        fileName: "[project]/cshr-website-full/components/GoogleReview.js",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900",
                        children: [
                            "TRUSTED BY 1,000+",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "bg-yellow-400 px-4 py-1 rounded font-extrabold text-gray-900",
                                children: [
                                    text,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "animate-pulse",
                                        children: "|"
                                    }, void 0, false, {
                                        fileName: "[project]/cshr-website-full/components/GoogleReview.js",
                                        lineNumber: 74,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/cshr-website-full/components/GoogleReview.js",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/cshr-website-full/components/GoogleReview.js",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cshr-website-full/components/GoogleReview.js",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full h-[90vh] overflow-hidden bg-gray-100 flex items-center justify-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex transition-transform duration-[1000ms] ease-in-out",
                        style: {
                            transform: `translateX(-${current * 100}%)`,
                            width: `${slides.length * 100}%`
                        },
                        children: slides.map((slide, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: slide.link,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "w-full h-[90vh] flex-shrink-0 flex items-center justify-center bg-white",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: slide.src,
                                    alt: slide.alt,
                                    className: "max-w-[95%] max-h-[85vh] object-contain rounded-2xl shadow-lg"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/GoogleReview.js",
                                    lineNumber: 97,
                                    columnNumber: 15
                                }, this)
                            }, i, false, {
                                fileName: "[project]/cshr-website-full/components/GoogleReview.js",
                                lineNumber: 90,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/cshr-website-full/components/GoogleReview.js",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3",
                        children: slides.map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setCurrent(i),
                                className: `w-3 h-3 rounded-full transition-colors duration-300 ${current === i ? "bg-blue-600" : "bg-gray-300"}`
                            }, i, false, {
                                fileName: "[project]/cshr-website-full/components/GoogleReview.js",
                                lineNumber: 109,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/cshr-website-full/components/GoogleReview.js",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cshr-website-full/components/GoogleReview.js",
                lineNumber: 80,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cshr-website-full/components/GoogleReview.js",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
_s(ShowcaseSection, "fF5xExgGSH2uU9+jqXjuGpq8eMM=");
_c = ShowcaseSection;
var _c;
__turbopack_context__.k.register(_c, "ShowcaseSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/cshr-website-full/components/StudentsReview.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StudentsReview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
;
function StudentsReview() {
    const reviews = [
        {
            id: 1,
            name: "Pavithra",
            training: "HR Training",
            review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            photo: "/pavi pic.jpeg"
        },
        {
            id: 2,
            name: "Sarathi",
            training: "Python with AI",
            review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            photo: "/sarathi pic.jpeg"
        },
        {
            id: 3,
            name: "Pavithra",
            training: "Data Analytics",
            review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            photo: "/pavi pic.jpeg"
        },
        {
            id: 4,
            name: "Sarathi",
            training: "Java Fullstack",
            review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            photo: "/sarathi pic.jpeg"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "py-12 sm:py-16 bg-white text-center overflow-hidden px-4 sm:px-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-xl sm:text-2xl md:text-3xl font-bold mb-8 text-gray-900",
                children: "Student Reviews"
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto",
                children: reviews.map((student)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-blue-700 text-white p-4 sm:p-6 rounded-2xl shadow-md text-left hover:scale-[1.02] transition-transform duration-300",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center mb-3 sm:mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: student.photo,
                                        alt: student.name,
                                        className: "w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover flex-shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                                        lineNumber: 51,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ml-3 sm:ml-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-bold text-base sm:text-lg",
                                                children: student.name
                                            }, void 0, false, {
                                                fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                                                lineNumber: 57,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs sm:text-sm opacity-90",
                                                children: student.training
                                            }, void 0, false, {
                                                fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                                                lineNumber: 58,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                                        lineNumber: 56,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                                lineNumber: 50,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs sm:text-sm leading-relaxed",
                                children: student.review
                            }, void 0, false, {
                                fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                                lineNumber: 65,
                                columnNumber: 13
                            }, this)
                        ]
                    }, student.id, true, {
                        fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                        lineNumber: 45,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                lineNumber: 43,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cshr-website-full/components/StudentsReview.js",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c = StudentsReview;
var _c;
__turbopack_context__.k.register(_c, "StudentsReview");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/cshr-website-full/components/MeetOurStars.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MeetOurStars
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/node_modules/styled-jsx/style.js [client] (ecmascript)");
;
;
function MeetOurStars() {
    const students = [
        {
            img: "/pavi pic.jpeg",
            name: "Pavithra",
            training: "HR Training",
            started: "B.COM",
            landed: "HR GENERALIST"
        },
        {
            img: "/sarathi pic.jpeg",
            name: "Sarathi",
            training: "Python Training",
            started: "BCA",
            landed: "Software Engineer"
        },
        {
            img: "/pavi pic.jpeg",
            name: "Pavithra",
            training: "Data Analytics",
            started: "M.Sc Maths",
            landed: "Data Analyst"
        },
        {
            img: "/sarathi pic.jpeg",
            name: "Sarathi",
            training: "Java Fullstack",
            started: "B.E CSE",
            landed: "Fullstack Developer"
        },
        {
            img: "/pavi pic.jpeg",
            name: "Pavithra",
            training: "HR with Analytics",
            started: "MBA HR",
            landed: "HR Specialist"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "jsx-7e9979ef6398a6b0" + " " + "py-16 bg-gray-50 text-center overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "jsx-7e9979ef6398a6b0" + " " + "text-2xl font-bold mb-10",
                children: "Meet Our Stars"
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-7e9979ef6398a6b0" + " " + "relative w-full overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-7e9979ef6398a6b0" + " " + "flex animate-marquee whitespace-nowrap",
                    children: [
                        ...Array(3)
                    ].map((_, copyIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-7e9979ef6398a6b0" + " " + "flex gap-4 flex-shrink-0",
                            children: students.map((student, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-7e9979ef6398a6b0" + " " + "bg-white rounded-xl shadow overflow-hidden min-w-[220px] flex-shrink-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: student.img,
                                            alt: student.name,
                                            className: "jsx-7e9979ef6398a6b0" + " " + "h-48 w-full object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                                            lineNumber: 54,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-7e9979ef6398a6b0" + " " + "bg-blue-700 text-white p-3 h-44 flex flex-col justify-between text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-7e9979ef6398a6b0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "jsx-7e9979ef6398a6b0" + " " + "font-bold text-base",
                                                            children: student.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                                                            lineNumber: 61,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "jsx-7e9979ef6398a6b0" + " " + "text-xs",
                                                            children: student.training
                                                        }, void 0, false, {
                                                            fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                                                            lineNumber: 62,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                                                    lineNumber: 60,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-7e9979ef6398a6b0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "jsx-7e9979ef6398a6b0" + " " + "bg-yellow-400 text-black font-bold text-xs px-2 py-1 rounded",
                                                            children: "Where I Started"
                                                        }, void 0, false, {
                                                            fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                                                            lineNumber: 65,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "jsx-7e9979ef6398a6b0" + " " + "mt-1 text-sm",
                                                            children: student.started
                                                        }, void 0, false, {
                                                            fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                                                            lineNumber: 68,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                                                    lineNumber: 64,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-7e9979ef6398a6b0" + " " + "text-yellow-400 text-lg",
                                                    children: "⬇"
                                                }, void 0, false, {
                                                    fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                                                    lineNumber: 70,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-7e9979ef6398a6b0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "jsx-7e9979ef6398a6b0" + " " + "bg-yellow-400 text-black font-bold text-xs px-2 py-1 rounded",
                                                            children: "Where I Landed"
                                                        }, void 0, false, {
                                                            fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                                                            lineNumber: 72,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "jsx-7e9979ef6398a6b0" + " " + "mt-1 font-bold text-sm",
                                                            children: student.landed
                                                        }, void 0, false, {
                                                            fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                                                            lineNumber: 75,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                                                    lineNumber: 71,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                                            lineNumber: 59,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, `${copyIndex}-${i}`, true, {
                                    fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                                    lineNumber: 50,
                                    columnNumber: 17
                                }, this))
                        }, copyIndex, false, {
                            fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                            lineNumber: 48,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                    lineNumber: 45,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                id: "7e9979ef6398a6b0",
                children: "@keyframes marquee{0%{transform:translate(0)}to{transform:translate(-33.333%)}}.animate-marquee.jsx-7e9979ef6398a6b0{animation:30s linear infinite marquee;display:flex}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_c = MeetOurStars;
var _c;
__turbopack_context__.k.register(_c, "MeetOurStars");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/cshr-website-full/components/About.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>About
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
;
function About() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "py-12 sm:py-16 bg-white px-4 sm:px-6 text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-xl sm:text-2xl md:text-3xl font-bold mb-8 text-gray-900",
                children: "The Careerschool Edge"
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/About.js",
                lineNumber: 4,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-6xl mx-auto space-y-12 sm:space-y-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/unnamed.jpg",
                                    alt: "Career School Training",
                                    className: "h-48 sm:h-64 md:h-72 w-60 sm:w-72 md:w-80 rounded-lg object-cover shadow-lg"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/About.js",
                                    lineNumber: 13,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/cshr-website-full/components/About.js",
                                lineNumber: 12,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-left text-sm sm:text-base text-gray-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-4 leading-relaxed",
                                        children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
                                    }, void 0, false, {
                                        fileName: "[project]/cshr-website-full/components/About.js",
                                        lineNumber: 22,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "leading-relaxed",
                                        children: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                                    }, void 0, false, {
                                        fileName: "[project]/cshr-website-full/components/About.js",
                                        lineNumber: 28,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/cshr-website-full/components/About.js",
                                lineNumber: 21,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/cshr-website-full/components/About.js",
                        lineNumber: 10,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-left text-sm sm:text-base text-gray-700 order-2 md:order-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-4 leading-relaxed",
                                        children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
                                    }, void 0, false, {
                                        fileName: "[project]/cshr-website-full/components/About.js",
                                        lineNumber: 39,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "leading-relaxed",
                                        children: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                                    }, void 0, false, {
                                        fileName: "[project]/cshr-website-full/components/About.js",
                                        lineNumber: 45,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/cshr-website-full/components/About.js",
                                lineNumber: 38,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-center order-1 md:order-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/2023-03-06.jpg",
                                    alt: "Career School Success",
                                    className: "h-48 sm:h-64 md:h-72 w-60 sm:w-72 md:w-80 rounded-lg object-cover shadow-lg"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/About.js",
                                    lineNumber: 53,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/cshr-website-full/components/About.js",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/cshr-website-full/components/About.js",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cshr-website-full/components/About.js",
                lineNumber: 8,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cshr-website-full/components/About.js",
        lineNumber: 3,
        columnNumber: 5
    }, this);
}
_c = About;
var _c;
__turbopack_context__.k.register(_c, "About");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/cshr-website-full/components/Courses.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Courses
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/node_modules/styled-jsx/style.js [client] (ecmascript)");
;
;
function Courses() {
    const courses = [
        {
            title: "Learn Python with AI",
            duration: "3 Months (Rapid Learning)",
            highlight: "Internship & Placement Included",
            poster: "/Python-AI--(1).webp"
        },
        {
            title: "HR with Analytics",
            duration: "3 Months (Rapid Learning)",
            highlight: "ZOHO Pay Roll Module Included",
            poster: "/HR-Analytics.jpg"
        },
        {
            title: "Data Analytics",
            duration: "3 Months (Rapid Learning)",
            highlight: "ZOHO Pay Roll Module Included",
            poster: "/data-analysis-skills-duties-responsibilities.jpeg"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "jsx-a13527dbde69b075" + " " + "py-12 sm:py-16 bg-blue-50 text-center px-4 sm:px-6 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "jsx-a13527dbde69b075" + " " + "text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-gray-900",
                children: "Next Batch Starts Soon"
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/Courses.js",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "jsx-a13527dbde69b075" + " " + "mb-8 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto",
                children: "Industry-ready Training Programs with Internships & Placement Support for Students, Freshers and Working Professionals."
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/Courses.js",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-a13527dbde69b075" + " " + "overflow-hidden relative",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-a13527dbde69b075" + " " + "flex animate-marquee gap-6 sm:gap-8",
                    children: courses.concat(courses).map((course, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-a13527dbde69b075" + " " + "rounded-xl overflow-hidden shadow-lg bg-white flex flex-col hover:scale-[1.02] transition-transform duration-300 min-w-[280px] flex-shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: course.poster,
                                    alt: course.title,
                                    className: "jsx-a13527dbde69b075" + " " + "h-40 sm:h-48 w-full object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Courses.js",
                                    lineNumber: 43,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-a13527dbde69b075" + " " + "bg-blue-700 text-white p-4 sm:p-6 flex flex-col flex-grow justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-a13527dbde69b075",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "jsx-a13527dbde69b075" + " " + "font-bold text-base sm:text-lg",
                                                    children: course.title
                                                }, void 0, false, {
                                                    fileName: "[project]/cshr-website-full/components/Courses.js",
                                                    lineNumber: 52,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-a13527dbde69b075" + " " + "text-xs sm:text-sm flex items-center gap-2 mt-2",
                                                    children: [
                                                        "⏰ ",
                                                        course.duration
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/cshr-website-full/components/Courses.js",
                                                    lineNumber: 53,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-a13527dbde69b075" + " " + "bg-yellow-400 text-black font-semibold text-[10px] sm:text-xs px-2 py-1 rounded mt-3 inline-block",
                                                    children: course.highlight
                                                }, void 0, false, {
                                                    fileName: "[project]/cshr-website-full/components/Courses.js",
                                                    lineNumber: 56,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/cshr-website-full/components/Courses.js",
                                            lineNumber: 51,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-a13527dbde69b075" + " " + "mt-4 sm:mt-6 flex flex-col gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "jsx-a13527dbde69b075" + " " + "border border-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm hover:bg-white hover:text-blue-700 transition",
                                                    children: "Learn More"
                                                }, void 0, false, {
                                                    fileName: "[project]/cshr-website-full/components/Courses.js",
                                                    lineNumber: 63,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "jsx-a13527dbde69b075" + " " + "bg-white text-blue-700 font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm",
                                                    children: "ENROLL"
                                                }, void 0, false, {
                                                    fileName: "[project]/cshr-website-full/components/Courses.js",
                                                    lineNumber: 66,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/cshr-website-full/components/Courses.js",
                                            lineNumber: 62,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/cshr-website-full/components/Courses.js",
                                    lineNumber: 50,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/cshr-website-full/components/Courses.js",
                            lineNumber: 38,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/cshr-website-full/components/Courses.js",
                    lineNumber: 36,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/Courses.js",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-a13527dbde69b075" + " " + "mt-8 sm:mt-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "jsx-a13527dbde69b075" + " " + "bg-blue-700 hover:bg-blue-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium shadow-md text-sm sm:text-base",
                    children: "Explore More Courses"
                }, void 0, false, {
                    fileName: "[project]/cshr-website-full/components/Courses.js",
                    lineNumber: 78,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/Courses.js",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                id: "a13527dbde69b075",
                children: "@keyframes marquee{0%{transform:translate(0%)}to{transform:translate(-50%)}}.animate-marquee.jsx-a13527dbde69b075{gap:1.5rem;animation:25s linear infinite marquee;display:flex}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cshr-website-full/components/Courses.js",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_c = Courses;
var _c;
__turbopack_context__.k.register(_c, "Courses");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/cshr-website-full/components/Alumni.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Alumni
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/node_modules/styled-jsx/style.js [client] (ecmascript)");
;
;
function Alumni() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "jsx-a5d8d500947c4eb3" + " " + "py-12 sm:py-16 text-center bg-blue-900 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "jsx-a5d8d500947c4eb3" + " " + "text-xl sm:text-2xl font-bold mb-8 sm:mb-10 text-white",
                children: "Our Alumni Proudly Placed In"
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/Alumni.js",
                lineNumber: 4,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-a5d8d500947c4eb3" + " " + "relative w-full overflow-hidden py-2 sm:py-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-a5d8d500947c4eb3" + " " + "flex animate-marquee-left gap-6 sm:gap-10",
                    children: [
                        ...Array(2)
                    ].map((_, copy)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-a5d8d500947c4eb3" + " " + "flex gap-6 sm:gap-10 items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/tcs.jpg",
                                    alt: "TCS",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 13,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/tcs.jpg",
                                    alt: "Infosys",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 14,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/tcs.jpg",
                                    alt: "Wipro",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 15,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/tcs.jpg",
                                    alt: "Amazon",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 16,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/tcs.jpg",
                                    alt: "Zoho",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 17,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/tcs.jpg",
                                    alt: "HCL",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 18,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, copy, true, {
                            fileName: "[project]/cshr-website-full/components/Alumni.js",
                            lineNumber: 12,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                    lineNumber: 10,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/Alumni.js",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-a5d8d500947c4eb3" + " " + "relative w-full overflow-hidden py-2 sm:py-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-a5d8d500947c4eb3" + " " + "flex animate-marquee-right gap-6 sm:gap-10",
                    children: [
                        ...Array(2)
                    ].map((_, copy)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-a5d8d500947c4eb3" + " " + "flex gap-6 sm:gap-10 items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/google.jpg",
                                    alt: "Google",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 29,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/google.jpg",
                                    alt: "Cognizant",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 30,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/google.jpg",
                                    alt: "Deloitte",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 31,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/google.jpg",
                                    alt: "Accenture",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 32,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/google.jpg",
                                    alt: "Microsoft",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 33,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/google.jpg",
                                    alt: "Capgemini",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 34,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, copy, true, {
                            fileName: "[project]/cshr-website-full/components/Alumni.js",
                            lineNumber: 28,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                    lineNumber: 26,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/Alumni.js",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-a5d8d500947c4eb3" + " " + "relative w-full overflow-hidden py-2 sm:py-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-a5d8d500947c4eb3" + " " + "flex animate-marquee-left gap-6 sm:gap-10",
                    children: [
                        ...Array(2)
                    ].map((_, copy)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-a5d8d500947c4eb3" + " " + "flex gap-6 sm:gap-10 items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/flipkart.jpg",
                                    alt: "Flipkart",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 45,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/flipkart.jpg",
                                    alt: "PayPal",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 46,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/flipkart.jpg",
                                    alt: "Oracle",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 47,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/flipkart.jpg",
                                    alt: "IBM",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 48,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/flipkart.jpg",
                                    alt: "HP",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 49,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/flipkart.jpg",
                                    alt: "Siemens",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 50,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, copy, true, {
                            fileName: "[project]/cshr-website-full/components/Alumni.js",
                            lineNumber: 44,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                    lineNumber: 42,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/Alumni.js",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                id: "a5d8d500947c4eb3",
                children: "@keyframes marquee-left{0%{transform:translate(0)}to{transform:translate(-50%)}}@keyframes marquee-right{0%{transform:translate(0)}to{transform:translate(50%)}}.animate-marquee-left.jsx-a5d8d500947c4eb3,.animate-marquee-right.jsx-a5d8d500947c4eb3{will-change:transform;width:max-content;animation-timing-function:linear;animation-iteration-count:infinite;display:flex}.animate-marquee-left.jsx-a5d8d500947c4eb3{animation:25s linear infinite marquee-left}.animate-marquee-right.jsx-a5d8d500947c4eb3{animation:30s linear infinite marquee-right}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cshr-website-full/components/Alumni.js",
        lineNumber: 3,
        columnNumber: 5
    }, this);
}
_c = Alumni;
var _c;
__turbopack_context__.k.register(_c, "Alumni");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/cshr-website-full/components/Discover.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Discover
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
;
function Discover() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "py-10 sm:py-16 bg-yellow-400 text-center px-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-lg sm:text-2xl md:text-3xl font-bold leading-snug text-gray-900 max-w-3xl mx-auto",
                children: "Discover the Right Training to Boost Your Career"
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/Discover.js",
                lineNumber: 4,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "mt-6 sm:mt-8 bg-blue-600 hover:bg-blue-700 text-white px-5 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition",
                children: "Get Free Career Guidance"
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/Discover.js",
                lineNumber: 8,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cshr-website-full/components/Discover.js",
        lineNumber: 3,
        columnNumber: 5
    }, this);
}
_c = Discover;
var _c;
__turbopack_context__.k.register(_c, "Discover");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/cshr-website-full/components/NeedHelp.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NeedHelp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
;
function NeedHelp() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "py-12 sm:py-16 bg-blue-800 text-center px-4 sm:px-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-white",
                children: "Need Help?"
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/NeedHelp.js",
                lineNumber: 4,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-4xl mx-auto space-y-4 sm:space-y-6",
                children: [
                    1,
                    2,
                    3
                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-20 sm:h-24 rounded-xl shadow-md flex items-center justify-center  text-base sm:text-lg font-semibold text-gray-800 bg-gradient-to-r from-white via-yellow-200 to-yellow-400 hover:scale-[1.02] transition-transform duration-300",
                        children: [
                            "Box ",
                            i
                        ]
                    }, i, true, {
                        fileName: "[project]/cshr-website-full/components/NeedHelp.js",
                        lineNumber: 10,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/NeedHelp.js",
                lineNumber: 8,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cshr-website-full/components/NeedHelp.js",
        lineNumber: 3,
        columnNumber: 5
    }, this);
}
_c = NeedHelp;
var _c;
__turbopack_context__.k.register(_c, "NeedHelp");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/cshr-website-full/components/Footer.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
;
function Footer() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "bg-gradient-to-r from-gray-100 to-gray-300 text-gray-900 py-12 sm:py-16 px-4 sm:px-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-left mb-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-bold mb-4 text-lg sm:text-xl",
                                children: "TRENDING COURSE"
                            }, void 0, false, {
                                fileName: "[project]/cshr-website-full/components/Footer.js",
                                lineNumber: 8,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "space-y-2 text-sm sm:text-base",
                                children: [
                                    "Python + AI",
                                    "HR Analytics",
                                    "Data Analytics",
                                    "Digital Marketing",
                                    "Python Fullstack",
                                    "Java Fullstack",
                                    "Business Analytics",
                                    "Accounts & Finance"
                                ].map((course, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "#",
                                            className: "hover:text-blue-700 transition duration-300 block",
                                            children: course
                                        }, void 0, false, {
                                            fileName: "[project]/cshr-website-full/components/Footer.js",
                                            lineNumber: 21,
                                            columnNumber: 17
                                        }, this)
                                    }, i, false, {
                                        fileName: "[project]/cshr-website-full/components/Footer.js",
                                        lineNumber: 20,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/cshr-website-full/components/Footer.js",
                                lineNumber: 9,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/cshr-website-full/components/Footer.js",
                        lineNumber: 7,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-bold mb-4 text-lg sm:text-xl",
                                children: "RESOURCES"
                            }, void 0, false, {
                                fileName: "[project]/cshr-website-full/components/Footer.js",
                                lineNumber: 34,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "space-y-2 text-sm sm:text-base",
                                children: [
                                    "Referral Rewards",
                                    "Hire Students",
                                    "Work with us",
                                    "Become a Mobilizer",
                                    "Connect With Training Team",
                                    "Blogs"
                                ].map((res, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "#",
                                            className: "hover:text-blue-700 transition duration-300 block",
                                            children: res
                                        }, void 0, false, {
                                            fileName: "[project]/cshr-website-full/components/Footer.js",
                                            lineNumber: 45,
                                            columnNumber: 17
                                        }, this)
                                    }, i, false, {
                                        fileName: "[project]/cshr-website-full/components/Footer.js",
                                        lineNumber: 44,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/cshr-website-full/components/Footer.js",
                                lineNumber: 35,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/cshr-website-full/components/Footer.js",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-bold mb-4 text-lg sm:text-xl",
                                children: "PLACEMENTS"
                            }, void 0, false, {
                                fileName: "[project]/cshr-website-full/components/Footer.js",
                                lineNumber: 58,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "space-y-2 text-sm sm:text-base",
                                children: [
                                    "Success Story",
                                    "Speak With Campus Team",
                                    "Speak With Placement Team",
                                    "Non-IT Jobs"
                                ].map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "#",
                                            className: "hover:text-blue-700 transition duration-300 block",
                                            children: item
                                        }, void 0, false, {
                                            fileName: "[project]/cshr-website-full/components/Footer.js",
                                            lineNumber: 67,
                                            columnNumber: 17
                                        }, this)
                                    }, i, false, {
                                        fileName: "[project]/cshr-website-full/components/Footer.js",
                                        lineNumber: 66,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/cshr-website-full/components/Footer.js",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/cshr-website-full/components/Footer.js",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-bold mb-4 text-lg sm:text-xl",
                                children: "COMPANY"
                            }, void 0, false, {
                                fileName: "[project]/cshr-website-full/components/Footer.js",
                                lineNumber: 80,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "space-y-2 text-sm sm:text-base",
                                children: [
                                    "About us",
                                    "Contact us",
                                    "FAQs"
                                ].map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "#",
                                            className: "hover:text-blue-700 transition duration-300 block",
                                            children: item
                                        }, void 0, false, {
                                            fileName: "[project]/cshr-website-full/components/Footer.js",
                                            lineNumber: 84,
                                            columnNumber: 17
                                        }, this)
                                    }, i, false, {
                                        fileName: "[project]/cshr-website-full/components/Footer.js",
                                        lineNumber: 83,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/cshr-website-full/components/Footer.js",
                                lineNumber: 81,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/cshr-website-full/components/Footer.js",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cshr-website-full/components/Footer.js",
                lineNumber: 5,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-gray-400 pt-10 max-w-6xl mx-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-start text-center md:text-left",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mx-auto md:mx-0 bg-gray-400 h-16 w-32 flex items-center justify-center font-bold text-white mb-4 rounded-lg",
                                    children: "LOGO"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Footer.js",
                                    lineNumber: 101,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "font-bold mb-3 text-lg",
                                    children: "Follow Us"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Footer.js",
                                    lineNumber: 104,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-center md:justify-start gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "#",
                                            className: "w-8 h-8 rounded-full bg-blue-700 hover:bg-blue-800 transition"
                                        }, void 0, false, {
                                            fileName: "[project]/cshr-website-full/components/Footer.js",
                                            lineNumber: 106,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "#",
                                            className: "w-8 h-8 rounded-full bg-blue-700 hover:bg-blue-800 transition"
                                        }, void 0, false, {
                                            fileName: "[project]/cshr-website-full/components/Footer.js",
                                            lineNumber: 110,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "#",
                                            className: "w-8 h-8 rounded-full bg-blue-700 hover:bg-blue-800 transition"
                                        }, void 0, false, {
                                            fileName: "[project]/cshr-website-full/components/Footer.js",
                                            lineNumber: 114,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "#",
                                            className: "w-8 h-8 rounded-full bg-blue-700 hover:bg-blue-800 transition"
                                        }, void 0, false, {
                                            fileName: "[project]/cshr-website-full/components/Footer.js",
                                            lineNumber: 118,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/cshr-website-full/components/Footer.js",
                                    lineNumber: 105,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/cshr-website-full/components/Footer.js",
                            lineNumber: 100,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "md:col-span-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "font-bold text-center mb-6 text-lg",
                                    children: "OUR BRANCHES"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Footer.js",
                                    lineNumber: 127,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 sm:grid-cols-2 gap-6 text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "#",
                                                    className: "bg-blue-700 text-white h-24 flex items-center justify-center font-bold rounded-lg hover:bg-blue-800 transition",
                                                    children: "Google Map"
                                                }, void 0, false, {
                                                    fileName: "[project]/cshr-website-full/components/Footer.js",
                                                    lineNumber: 131,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-3 font-bold text-sm sm:text-base",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "#",
                                                        className: "hover:text-blue-700 transition",
                                                        children: "CSIT Number"
                                                    }, void 0, false, {
                                                        fileName: "[project]/cshr-website-full/components/Footer.js",
                                                        lineNumber: 138,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/cshr-website-full/components/Footer.js",
                                                    lineNumber: 137,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-bold text-sm sm:text-base",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "#",
                                                        className: "hover:text-blue-700 transition",
                                                        children: "CSIT Address"
                                                    }, void 0, false, {
                                                        fileName: "[project]/cshr-website-full/components/Footer.js",
                                                        lineNumber: 143,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/cshr-website-full/components/Footer.js",
                                                    lineNumber: 142,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/cshr-website-full/components/Footer.js",
                                            lineNumber: 130,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "#",
                                                    className: "bg-blue-700 text-white h-24 flex items-center justify-center font-bold rounded-lg hover:bg-blue-800 transition",
                                                    children: "Google Map"
                                                }, void 0, false, {
                                                    fileName: "[project]/cshr-website-full/components/Footer.js",
                                                    lineNumber: 151,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-3 font-bold text-sm sm:text-base",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "#",
                                                        className: "hover:text-blue-700 transition",
                                                        children: "CSHR Number"
                                                    }, void 0, false, {
                                                        fileName: "[project]/cshr-website-full/components/Footer.js",
                                                        lineNumber: 158,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/cshr-website-full/components/Footer.js",
                                                    lineNumber: 157,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-bold text-sm sm:text-base",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "#",
                                                        className: "hover:text-blue-700 transition",
                                                        children: "CSHR Address"
                                                    }, void 0, false, {
                                                        fileName: "[project]/cshr-website-full/components/Footer.js",
                                                        lineNumber: 163,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/cshr-website-full/components/Footer.js",
                                                    lineNumber: 162,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/cshr-website-full/components/Footer.js",
                                            lineNumber: 150,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/cshr-website-full/components/Footer.js",
                                    lineNumber: 128,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/cshr-website-full/components/Footer.js",
                            lineNumber: 126,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/cshr-website-full/components/Footer.js",
                    lineNumber: 98,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/Footer.js",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center text-xs sm:text-sm mt-10 text-gray-700 border-t border-gray-300 pt-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "© 2025 CSHR. All Rights Reserved."
                }, void 0, false, {
                    fileName: "[project]/cshr-website-full/components/Footer.js",
                    lineNumber: 175,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/Footer.js",
                lineNumber: 174,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cshr-website-full/components/Footer.js",
        lineNumber: 3,
        columnNumber: 5
    }, this);
}
_c = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/cshr-website-full/pages/index.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$HeroBanner$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/components/HeroBanner.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$Header$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/components/Header.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$FullImage$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/components/FullImage.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$GoogleReview$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/components/GoogleReview.js [client] (ecmascript)"); // 👈 must match file name
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$StudentsReview$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/components/StudentsReview.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$MeetOurStars$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/components/MeetOurStars.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$About$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/components/About.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$Courses$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/components/Courses.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$Alumni$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/components/Alumni.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$Discover$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/components/Discover.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$NeedHelp$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/components/NeedHelp.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$Footer$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/components/Footer.js [client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
function Home() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$HeroBanner$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/cshr-website-full/pages/index.js",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$Header$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/cshr-website-full/pages/index.js",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$FullImage$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/cshr-website-full/pages/index.js",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$GoogleReview$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/cshr-website-full/pages/index.js",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$StudentsReview$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/cshr-website-full/pages/index.js",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$MeetOurStars$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/cshr-website-full/pages/index.js",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$About$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/cshr-website-full/pages/index.js",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$Courses$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/cshr-website-full/pages/index.js",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$Alumni$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/cshr-website-full/pages/index.js",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$Discover$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/cshr-website-full/pages/index.js",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$NeedHelp$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/cshr-website-full/pages/index.js",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$Footer$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/cshr-website-full/pages/index.js",
                lineNumber: 38,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cshr-website-full/pages/index.js",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/cshr-website-full/pages/index.js [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/cshr-website-full/pages/index.js [client] (ecmascript)");
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
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/cshr-website-full/pages/index\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/cshr-website-full/pages/index.js [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__70a75202._.js.map