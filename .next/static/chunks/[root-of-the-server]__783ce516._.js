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
                src: "/Home Page - 3840 x 2160.png",
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
                        "Learn & Practice Top Courses with",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/cshr-website-full/components/FullImage.js",
                            lineNumber: 17,
                            columnNumber: 44
                        }, this),
                        " Placement Support"
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
        "COLLEGES",
        "CLIENTS",
        "PROFESSIONALS"
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
    // ⏱️ Auto-slide every 5 seconds (rotation)
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
                        className: "text-lg sm:text-xl font-semibold text-gray-700 mb-4"
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
                    slides.map((slide, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: slide.link,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: `absolute w-full h-[90vh] flex items-center justify-center transition-opacity duration-[1500ms] ease-in-out ${current === i ? "opacity-100 z-10" : "opacity-0 z-0"}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: slide.src,
                                alt: slide.alt,
                                className: "w-full h-full object-cover rounded-none brightness-105 transition-transform duration-700 hover:scale-105"
                            }, void 0, false, {
                                fileName: "[project]/cshr-website-full/components/GoogleReview.js",
                                lineNumber: 91,
                                columnNumber: 13
                            }, this)
                        }, i, false, {
                            fileName: "[project]/cshr-website-full/components/GoogleReview.js",
                            lineNumber: 82,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20",
                        children: slides.map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setCurrent(i),
                                className: `w-3 h-3 rounded-full transition-colors duration-300 ${current === i ? "bg-blue-600" : "bg-gray-300"}`
                            }, i, false, {
                                fileName: "[project]/cshr-website-full/components/GoogleReview.js",
                                lineNumber: 102,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/cshr-website-full/components/GoogleReview.js",
                        lineNumber: 100,
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
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/node_modules/react/index.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function StudentsReview() {
    _s();
    const [selectedReview, setSelectedReview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const reviews = [
        {
            id: 1,
            name: "Velmurugan Vignesh",
            training: "Data Analytics",
            review: "Excellent Data Analytics training and placement support! Helped me start my IT career confidently.",
            photo: "/sarathi pic.jpeg"
        },
        {
            id: 2,
            name: "Pavithra S",
            training: "Python with AI",
            review: "Great learning experience! The sessions were simple and clear. I got placed successfully as a Software Trainee.",
            photo: "/pavi pic.jpeg"
        },
        {
            id: 3,
            name: "Subha Vadivu Lakshmi",
            training: "HR Training",
            review: "Hands-on HR training helped me gain real-world skills in recruitment. It built my confidence and career path.",
            photo: "/Subha Vadivu Lakshmi.png"
        },
        {
            id: 4,
            name: "Rajiya",
            training: "Data Analytics",
            review: "After a long career gap, I restarted my career with Careerschool’s amazing IT training and placement support.",
            photo: "/Rajiya.png"
        },
        {
            id: 5,
            name: "Malathi",
            training: "Data Analytics",
            review: "I completed a Data analytics course from Careerschool HR solutions. Good experience of training and placements session.Whole team full support and guidance for interviews.This is a good platform of start your career. Thank you...",
            photo: "/Malathi.png"
        },
        {
            id: 6,
            name: "Ranjith",
            training: "Data Analystics",
            review: "Hi Myself Ranjith Kumar Im proud",
            photo: "/Ranjith.png"
        },
        {
            id: 7,
            name: "Afsal Ahamed",
            training: "HR Training",
            review: "I am incredibly grateful to Career School HR Solutions for the invaluable guidance and support I received during my HR internship. A special thanks to Brindha Ma'am for her exceptional mentorship and for guiding not just our group but also me personally. Her encouragement and insights have been instrumental in my growth.",
            photo: "/Afsal Ahamed.png"
        },
        {
            id: 8,
            name: "Shyam Ganesh Prasad",
            training: "HR Training",
            review: "It's perfect for learning I joined CareerSchool 4 months ago I worked as a HR intern their very friendly staffs and mam especially Keerthana mam , Brintha mam & Roshini mam not only them all the other staffs are amazingly doing well",
            photo: "/Shyam Ganesh Prasad.png"
        },
        {
            id: 9,
            name: "Manav Magesh",
            training: "Data Analytics",
            review: "I joined Careerschool HR Solutions to pursue Data Analytics, and it completely changed me. The training was excellent — Karthikey Sir is one of the most friendly and patient mentors I’ve ever met. He explains every concept in detail and gives important tips that really helped me in interviews.",
            photo: "/Manav.png"
        },
        {
            id: 10,
            name: "Bhuvaneshwaran",
            training: "Data Analytics",
            review: "Manual and automation testing were explained clearly. Helpful for placement preparation.",
            photo: "/Bhuwaneswar.png"
        },
        {
            id: 11,
            name: "Saikumar Mallarapu",
            training: "Frontend Development",
            review: "React and Tailwind sessions were practical. I created my own frontend projects confidently.",
            photo: "/Saikumar.png"
        },
        {
            id: 12,
            name: "Manoj Kumar",
            training: "Cloud Computing",
            review: "Good exposure to AWS and cloud fundamentals with live practice sessions and excellent trainer support.",
            photo: "/sarathi pic.jpeg"
        },
        {
            id: 13,
            name: "Priya",
            training: "Graphic Design",
            review: "Covered Photoshop and Illustrator basics perfectly. The practical assignments were very helpful.",
            photo: "/pavi pic.jpeg"
        },
        {
            id: 14,
            name: "Sathish",
            training: "Java Full Stack",
            review: "Java Full Stack sessions were clear and project-oriented. The placement guidance was strong.",
            photo: "/sarathi pic.jpeg"
        },
        {
            id: 15,
            name: "Harini",
            training: "Artificial Intelligence",
            review: "I have completed the Data Analytics course at Careerschool HR Solutions. The training mainly covered Advanced Excel, SQL, and Power BI. The teaching was clear and practical.",
            photo: "/pavi pic.jpeg"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "py-10 bg-white text-center overflow-hidden px-6 relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-2xl font-extrabold mb-8 text-gray-900",
                children: "Hear It From Our Learners"
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-5 gap-5 max-w-full mx-auto justify-center",
                children: reviews.map((student)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: ()=>setSelectedReview(student),
                        className: "bg-blue-700 text-white p-6 rounded-xl flex flex-col items-center gap-3 cursor-pointer hover:scale-[1.05] transition-transform duration-300 shadow-lg",
                        style: {
                            width: "230px",
                            height: "230px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: student.photo,
                                alt: student.name,
                                className: "w-20 h-20 rounded-full object-cover border-2 border-white shadow-md"
                            }, void 0, false, {
                                fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                                lineNumber: 40,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-semibold text-[16px] truncate w-full text-center",
                                children: student.name
                            }, void 0, false, {
                                fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                                lineNumber: 45,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[13px] opacity-95 truncate w-full text-center",
                                children: student.training
                            }, void 0, false, {
                                fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                                lineNumber: 48,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex text-yellow-400 justify-center mt-1",
                                children: [
                                    ...Array(5)
                                ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[12px]",
                                        children: "★"
                                    }, i, false, {
                                        fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                                        lineNumber: 53,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                                lineNumber: 51,
                                columnNumber: 13
                            }, this)
                        ]
                    }, student.id, true, {
                        fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                        lineNumber: 34,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            selectedReview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white text-gray-800 rounded-xl shadow-lg max-w-md w-full p-6 relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setSelectedReview(null),
                            className: "absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-lg",
                            children: "✖"
                        }, void 0, false, {
                            fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                            lineNumber: 64,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center mb-4 gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: selectedReview.photo,
                                    alt: selectedReview.name,
                                    className: "w-14 h-14 rounded-full object-cover border border-gray-300"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                                    lineNumber: 72,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-bold text-base",
                                            children: selectedReview.name
                                        }, void 0, false, {
                                            fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                                            lineNumber: 78,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-600",
                                            children: selectedReview.training
                                        }, void 0, false, {
                                            fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                                            lineNumber: 79,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                                    lineNumber: 77,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                            lineNumber: 71,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[15px] leading-relaxed",
                            children: selectedReview.review
                        }, void 0, false, {
                            fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                            lineNumber: 83,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                    lineNumber: 63,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                lineNumber: 62,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cshr-website-full/components/StudentsReview.js",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_s(StudentsReview, "pCyQ8WBbvzVSsLTh+VozJeiGLjs=");
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
"use client";
;
;
function MeetOurStars() {
    const students = [
        {
            img: "/Shalini.png",
            name: "Shalini",
            training: "DATA ANALYTICS TRAINING",
            started: "BSC",
            landed: "Jr Software Developer"
        },
        {
            img: "/Jayakumar.png",
            name: "Jayakumar",
            training: "DATA ANALYTICS TRAINING",
            started: "BSC",
            landed: "Operations"
        },
        {
            img: "/Sirisha Dasari.png",
            name: "Sirisha Dasari",
            started: "BSC Data Science",
            landed: "IT Internship"
        },
        {
            img: "/Prem.png",
            name: "Prem",
            training: "HR TRAINING",
            started: "MSW",
            landed: "HR Recruiter"
        },
        {
            img: "/Balakumaran.png",
            name: "Balakumaran",
            training: "WEB DEVELOPER TRAINING",
            started: "BCA",
            landed: "IT Backend"
        },
        {
            img: "/Sindhu.png",
            name: "Sindhu",
            training: "HR TRAINING",
            started: "BE ECE",
            landed: "HR Executive"
        },
        {
            img: "/HariPriya.png",
            name: "Haripriya",
            training: "HR TRAINING",
            started: "BE CSE",
            landed: "HR Recruiter"
        },
        {
            img: "/Shanthini.png",
            name: "Shanthini",
            training: "DATA ANALYTICS TRAINING",
            started: "B.COM",
            landed: "Data Executive"
        },
        {
            img: "/Medhuru Girish Kumar.png",
            name: "Medhuru Girish Kumar",
            started: "BCA",
            landed: "UI/UX Designer"
        },
        {
            img: "/Dhanyasree Javali.png",
            name: "Dhanyasree Javali",
            started: "MCA",
            landed: "Python Developer"
        },
        {
            img: "/Ashwathi.png",
            name: "Aswathi",
            training: "PYTHON WITH AI TRAINING",
            started: "BE ECE",
            landed: "Prompt Engineer"
        }
    ];
    const loopedStudents = [
        ...students,
        ...students
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "meet-our-stars",
        style: {
            backgroundColor: "#1d1e22"
        },
        className: "jsx-399f1f5880812373" + " " + "py-16 text-center overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "jsx-399f1f5880812373" + " " + "text-2xl sm:text-2xl md:text-3xl font-bold text-white",
                children: "Meet Our Stars"
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-399f1f5880812373" + " " + "relative w-full overflow-hidden mt-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-399f1f5880812373" + " " + "flex animate-marquee gap-5",
                    children: loopedStudents.map((student, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-399f1f5880812373" + " " + "bg-white rounded-xl shadow overflow-hidden min-w-[240px] flex-shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: student.img,
                                    alt: student.name,
                                    className: "jsx-399f1f5880812373" + " " + "h-52 w-full object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                                    lineNumber: 100,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-399f1f5880812373" + " " + "bg-blue-700 text-white p-4 h-52 flex flex-col justify-between text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-399f1f5880812373" + " " + "mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "jsx-399f1f5880812373" + " " + "font-bold text-base",
                                                    children: student.name
                                                }, void 0, false, {
                                                    fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                                                    lineNumber: 107,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-399f1f5880812373" + " " + "text-sm font-semibold text-yellow-400 mt-1",
                                                    children: student.training
                                                }, void 0, false, {
                                                    fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                                                    lineNumber: 108,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                                            lineNumber: 106,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-399f1f5880812373",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-399f1f5880812373" + " " + "text-xs text-white mb-1",
                                                    children: "Where I Started"
                                                }, void 0, false, {
                                                    fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                                                    lineNumber: 114,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "jsx-399f1f5880812373" + " " + "bg-yellow-400 text-black font-bold text-xs px-3 py-1 rounded",
                                                    children: student.started
                                                }, void 0, false, {
                                                    fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                                                    lineNumber: 115,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                                            lineNumber: 113,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-399f1f5880812373" + " " + "flex justify-center my-1",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: "/Arrow[1].png",
                                                alt: "Arrow Down",
                                                className: "jsx-399f1f5880812373" + " " + "h-5 w-5 animate-bounce opacity-90"
                                            }, void 0, false, {
                                                fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                                                lineNumber: 121,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                                            lineNumber: 120,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-399f1f5880812373" + " " + "mb-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-399f1f5880812373" + " " + "text-xs text-white mb-1",
                                                    children: "Where I Landed"
                                                }, void 0, false, {
                                                    fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                                                    lineNumber: 129,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "jsx-399f1f5880812373" + " " + "bg-yellow-400 text-black font-bold text-xs px-3 py-1 rounded",
                                                    children: student.landed
                                                }, void 0, false, {
                                                    fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                                                    lineNumber: 130,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                                            lineNumber: 128,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                                    lineNumber: 105,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                            lineNumber: 96,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                    lineNumber: 94,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                id: "399f1f5880812373",
                children: "@keyframes marquee{0%{transform:translate(0)}to{transform:translate(-50%)}}.animate-marquee.jsx-399f1f5880812373{width:max-content;animation:35s linear infinite marquee;display:flex}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
        lineNumber: 84,
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
            poster: "/Python Banner.jpg"
        },
        {
            title: "HR with Analytics",
            duration: "3 Months (Rapid Learning)",
            highlight: "ZOHO Pay Roll Module Included",
            poster: "/HR Analytics Banner.png"
        },
        {
            title: "Data Analytics",
            duration: "3 Months (Rapid Learning)",
            highlight: "ZOHO Pay Roll Module Included",
            poster: "/Data Analytics Banner.png"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        style: {
            backgroundColor: "#FFFFFF"
        },
        className: "jsx-20afbeb9e1e0d4f5" + " " + "py-12 sm:py-16 text-center px-4 sm:px-6 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "jsx-20afbeb9e1e0d4f5" + " " + "text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-[#004AAD]",
                children: "Next Batch Starts Soon"
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/Courses.js",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "jsx-20afbeb9e1e0d4f5" + " " + "mb-10 text-sm sm:text-base text-gray-700 max-w-2xl mx-auto",
                children: "Industry-ready Training Programs with Internships & Placement Support for Students, Freshers and Working Professionals."
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/Courses.js",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-20afbeb9e1e0d4f5" + " " + "overflow-hidden relative",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-20afbeb9e1e0d4f5" + " " + "flex animate-marquee gap-6 sm:gap-8",
                    children: courses.concat(courses).map((course, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                borderRadius: "20px",
                                overflow: "hidden",
                                backgroundColor: "#004AAD",
                                minWidth: "280px",
                                maxWidth: "280px",
                                height: "380px"
                            },
                            className: "jsx-20afbeb9e1e0d4f5" + " " + "shadow-lg flex flex-col hover:scale-[1.02] transition-transform duration-300 flex-shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: course.poster,
                                    alt: course.title,
                                    style: {
                                        height: "160px",
                                        borderTopLeftRadius: "20px",
                                        borderTopRightRadius: "20px"
                                    },
                                    className: "jsx-20afbeb9e1e0d4f5" + " " + "w-full object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Courses.js",
                                    lineNumber: 56,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-20afbeb9e1e0d4f5" + " " + "flex flex-col justify-between flex-grow p-4 sm:p-6 text-center text-white",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-20afbeb9e1e0d4f5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "jsx-20afbeb9e1e0d4f5" + " " + "font-bold text-base sm:text-lg",
                                                    children: course.title
                                                }, void 0, false, {
                                                    fileName: "[project]/cshr-website-full/components/Courses.js",
                                                    lineNumber: 70,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-20afbeb9e1e0d4f5" + " " + "text-xs sm:text-sm mt-2",
                                                    children: [
                                                        "⏰ ",
                                                        course.duration
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/cshr-website-full/components/Courses.js",
                                                    lineNumber: 74,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        backgroundColor: "#FFD02B"
                                                    },
                                                    className: "jsx-20afbeb9e1e0d4f5" + " " + "text-black font-semibold text-[10px] sm:text-xs px-2 py-1 rounded mt-3 inline-block",
                                                    children: course.highlight
                                                }, void 0, false, {
                                                    fileName: "[project]/cshr-website-full/components/Courses.js",
                                                    lineNumber: 79,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/cshr-website-full/components/Courses.js",
                                            lineNumber: 69,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-20afbeb9e1e0d4f5" + " " + "mt-4 flex justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#",
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "jsx-20afbeb9e1e0d4f5",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    style: {
                                                        backgroundColor: "#FFFFFF",
                                                        color: "#004AAD",
                                                        borderRadius: "20px"
                                                    },
                                                    className: "jsx-20afbeb9e1e0d4f5" + " " + "font-bold px-4 py-2 rounded text-xs sm:text-sm transition",
                                                    children: "ENROLL NOW"
                                                }, void 0, false, {
                                                    fileName: "[project]/cshr-website-full/components/Courses.js",
                                                    lineNumber: 90,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/cshr-website-full/components/Courses.js",
                                                lineNumber: 89,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/cshr-website-full/components/Courses.js",
                                            lineNumber: 88,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/cshr-website-full/components/Courses.js",
                                    lineNumber: 68,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/cshr-website-full/components/Courses.js",
                            lineNumber: 43,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/cshr-website-full/components/Courses.js",
                    lineNumber: 41,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/Courses.js",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-20afbeb9e1e0d4f5" + " " + "mt-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    style: {
                        backgroundColor: "#004AAD",
                        borderRadius: "20px"
                    },
                    className: "jsx-20afbeb9e1e0d4f5" + " " + "text-white px-6 py-3 font-medium shadow-md text-sm sm:text-base transition hover:scale-[1.03]",
                    children: "Explore More Courses"
                }, void 0, false, {
                    fileName: "[project]/cshr-website-full/components/Courses.js",
                    lineNumber: 110,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/Courses.js",
                lineNumber: 109,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                id: "20afbeb9e1e0d4f5",
                children: "@keyframes marquee{0%{transform:translate(0%)}to{transform:translate(-50%)}}.animate-marquee.jsx-20afbeb9e1e0d4f5{gap:1.5rem;animation:30s linear infinite marquee;display:flex}"
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
                                    src: "/Cognizant.png",
                                    alt: "Zoho",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 13,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/Concentrix.png",
                                    alt: "Startek",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 14,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/Foundever.png",
                                    alt: "Teleperformance",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 15,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/Datamark.png",
                                    alt: "Tech Mahindra",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 16,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/Hexaware.png",
                                    alt: "TCS",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 17,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/Hcl.png",
                                    alt: "Quess",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 18,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/Ideas.png",
                                    alt: "Infosys",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 19,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/Hinduja.png",
                                    alt: "Wipro",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 20,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/Induslnd.png",
                                    alt: "Amazon",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 21,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/Tata Consultancy Services.png",
                                    alt: "HCL",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 22,
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
                                    src: "/VThink.png",
                                    alt: "Google",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 33,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/Movate.png",
                                    alt: "Cognizant",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 34,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/Omega Healthcare.png",
                                    alt: "Deloitte",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 35,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/Quess.png",
                                    alt: "Accenture",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 36,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/Altruist.png",
                                    alt: "Microsoft",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 37,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/Ison.png",
                                    alt: "Capgemini",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 38,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/Teleperformance.png",
                                    alt: "CTS",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 39,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/Tech Mahindra.png",
                                    alt: "Mindtree",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 40,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/Startek.png",
                                    alt: "LTI",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 41,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/HDFC Bank.png",
                                    alt: "Hexaware",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 42,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, copy, true, {
                            fileName: "[project]/cshr-website-full/components/Alumni.js",
                            lineNumber: 32,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                    lineNumber: 30,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/Alumni.js",
                lineNumber: 29,
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
                                    src: "/Zoho.png",
                                    alt: "Flipkart",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 53,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/STAR Health Insurance.png",
                                    alt: "PayPal",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 54,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/Sysekam.png",
                                    alt: "Oracle",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 55,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/Access Healthcare.png",
                                    alt: "IBM",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 56,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/Emayam Tech.png",
                                    alt: "HP",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 57,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/Paisabazaar.png",
                                    alt: "Siemens",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 58,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/Mtutor.png",
                                    alt: "EY",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 59,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/ICICI Bank.png",
                                    alt: "KPMG",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 60,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/Sutherland.png",
                                    alt: "Cisco",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 61,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/Tech Mahindra.png",
                                    alt: "Adobe",
                                    className: "jsx-a5d8d500947c4eb3" + " " + "h-8 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 62,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, copy, true, {
                            fileName: "[project]/cshr-website-full/components/Alumni.js",
                            lineNumber: 52,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                    lineNumber: 50,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/Alumni.js",
                lineNumber: 49,
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
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/node_modules/react/index.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function NeedHelp() {
    _s();
    // ✅ 6 Python Questions and Answers
    const faqs = [
        {
            q: " What are the best placement-oriented training courses after graduation?",
            a: "At Careerschool HR & IT Solutions, we offer top-rated career programs like Python Full Stack, Data Analytics, HR Analytics, Digital Marketing, and Java Training with internship and placement support."
        },
        {
            q: " Does Careerschool provide placement assistance after completing the training?",
            a: "Yes! Every training program at Careerschool includes pre-placement and post-placement support — covering interview preparation, resume building, aptitude sessions, and company tie-ups to help you get hired faster."
        },
        {
            q: "Why should I choose Careerschool HR & IT Solutions for training and placement?",
            a: "Careerschool stands out for its industry-ready curriculum, live tools exposure, certified trainers, internships, and placement tie-ups with leading companies. With branches in Guindy (Chennai) and Nellore (Andhra Pradesh), we’re helping learners across allover India launch their dream careers."
        },
        {
            q: "Who can enroll in Careerschool training & internship programs?",
            a: "Our programs are open to college students, fresh graduates (freshers), and working professionals who want to start or switch careers in IT, HR, or Analytics domains. No prior technical background is required — our courses are beginner-friendly and skill-based."
        },
        {
            q: "Do you have any free courses or demo training programs?",
            a: "Yes, Careerschool provides free demo training sessions and career guidance workshops for students, freshers, and professionals. These sessions cover the basics and helps learners choose the right course for their career goals."
        },
        {
            q: "Do you have courses in Chennai and Nellore only?",
            a: "Careerschool currently has training centers in Guindy, Chennai and Nellore, Andhra Pradesh, where we conduct offline sessions with internship and placement support. However, we also offer LIVE online classes with the same benefits that can be accessed from anywhere in India. So, whether you’re in Chennai, Nellore, or another city, you can still join our programs and learn from our expert trainers."
        }
    ];
    // ✅ State to track which question is open
    const [openIndex, setOpenIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // ✅ Toggle open/close on click
    const toggleAnswer = (index)=>{
        setOpenIndex(openIndex === index ? null : index);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "py-12 sm:py-16 bg-blue-800 text-center px-4 sm:px-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-white",
                children: "Need Help"
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/NeedHelp.js",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-3xl mx-auto flex flex-col items-center space-y-4 sm:space-y-6",
                children: faqs.map((faq, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full rounded-xl shadow-md overflow-hidden bg-gradient-to-r from-white via-yellow-200 to-yellow-400 transition-transform duration-300 hover:scale-[1.02]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>toggleAnswer(i),
                                className: "w-full text-left px-5 py-4 text-gray-800 font-semibold text-base sm:text-lg flex justify-between items-center",
                                children: [
                                    faq.q,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-gray-700 font-bold text-xl",
                                        children: openIndex === i ? "−" : "+"
                                    }, void 0, false, {
                                        fileName: "[project]/cshr-website-full/components/NeedHelp.js",
                                        lineNumber: 61,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/cshr-website-full/components/NeedHelp.js",
                                lineNumber: 56,
                                columnNumber: 13
                            }, this),
                            openIndex === i && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white text-gray-800 text-sm sm:text-base px-5 py-4 border-t border-yellow-400",
                                children: faq.a
                            }, void 0, false, {
                                fileName: "[project]/cshr-website-full/components/NeedHelp.js",
                                lineNumber: 68,
                                columnNumber: 15
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/cshr-website-full/components/NeedHelp.js",
                        lineNumber: 51,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/NeedHelp.js",
                lineNumber: 49,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cshr-website-full/components/NeedHelp.js",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_s(NeedHelp, "7z1SfW1ag/kVV/D8SOtFgmPOJ8o=");
_c = NeedHelp;
var _c;
__turbopack_context__.k.register(_c, "NeedHelp");
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
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$Courses$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/components/Courses.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$Alumni$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/components/Alumni.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$Discover$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/components/Discover.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$NeedHelp$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/components/NeedHelp.js [client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../components/Footer'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
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
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$Header$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/cshr-website-full/pages/index.js",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$FullImage$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/cshr-website-full/pages/index.js",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$GoogleReview$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/cshr-website-full/pages/index.js",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$StudentsReview$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/cshr-website-full/pages/index.js",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$MeetOurStars$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/cshr-website-full/pages/index.js",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$Courses$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/cshr-website-full/pages/index.js",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$Alumni$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/cshr-website-full/pages/index.js",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$Discover$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/cshr-website-full/pages/index.js",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$NeedHelp$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/cshr-website-full/pages/index.js",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Footer, {}, void 0, false, {
                fileName: "[project]/cshr-website-full/pages/index.js",
                lineNumber: 37,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cshr-website-full/pages/index.js",
        lineNumber: 15,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__783ce516._.js.map