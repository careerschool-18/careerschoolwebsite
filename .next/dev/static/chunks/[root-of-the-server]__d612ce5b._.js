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
"[project]/data/python-questions.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("[{\"id\":1,\"question\":\"Which Python data type is ordered and immutable?\",\"options\":[\"list\",\"dict\",\"tuple\",\"set\"],\"answer\":\"tuple\"},{\"id\":2,\"question\":\"What will be the output of print(2 ** 3 ** 2)?\",\"options\":[\"64\",\"512\",\"16\",\"8\"],\"answer\":\"512\"},{\"id\":3,\"question\":\"Which of these creates a dictionary?\",\"options\":[\"{1, 2, 3}\",\"[1, 2, 3]\",\"(1, 2, 3)\",\"{'a': 1, 'b': 2}\"],\"answer\":\"{'a': 1, 'b': 2}\"},{\"id\":4,\"question\":\"What does the pass statement do?\",\"options\":[\"Skips to next iteration\",\"Exits the loop\",\"Does nothing (placeholder)\",\"Raises NotImplementedError\"],\"answer\":\"Does nothing (placeholder)\"},{\"id\":5,\"question\":\"Which module provides support for mathematical functions?\",\"options\":[\"math\",\"random\",\"statistics\",\"math\"],\"answer\":\"math\"},{\"id\":6,\"question\":\"What is the output of print(\\\"Hello\\\" + 3)?\",\"options\":[\"Hello3\",\"HelloHelloHello\",\"Error\",\"None\"],\"answer\":\"Error\"},{\"id\":7,\"question\":\"Which is used to handle exceptions?\",\"options\":[\"try/except\",\"catch/throw\",\"Both a and b\",\"Both a and b\"],\"answer\":\"try/except\"},{\"id\":8,\"question\":\"What does range(1, 10, 2) generate?\",\"options\":[\"[1, 3, 5, 7, 9]\",\"[1, 2, 3, 4, 5, 6, 7, 8, 9]\",\"[2, 4, 6, 8, 10]\",\"[2, 4, 6, 8]\"],\"answer\":\"[1, 3, 5, 7, 9]\"},{\"id\":9,\"question\":\"What is the purpose of yield keyword?\",\"options\":[\"Returns value from function\",\"Creates generator function\",\"Both a and b\",\"Both a and b\"],\"answer\":\"Creates generator function\"},{\"id\":10,\"question\":\"Which decorator is used for class methods?\",\"options\":[\"@staticmethod\",\"@classmethod\",\"@property\",\"@setter\"],\"answer\":\"@classmethod\"},{\"id\":11,\"question\":\"What does sys.argv contain?\",\"options\":[\"Command line arguments\",\"Environment variables\",\"Python path\",\"Python shell\"],\"answer\":\"Command line arguments\"},{\"id\":12,\"question\":\"Which is not a valid string method?\",\"options\":[\"split()\",\"join()\",\"merge()\",\"split()\"],\"answer\":\"merge()\"},{\"id\":13,\"question\":\"What is __str__ method used for?\",\"options\":[\"String representation of object\",\"Object initialization\",\"Object initialization\",\"Object deletion\"],\"answer\":\"String representation of object\"},{\"id\":14,\"question\":\"Which collection removes duplicates?\",\"options\":[\"list\",\"tuple\",\"tuple\",\"set\"],\"answer\":\"set\"},{\"id\":15,\"question\":\"What does zip() function do?\",\"options\":[\"Compresses files\",\"Combines multiple iterables\",\"Creates backup\",\"Restores backup\"],\"answer\":\"Combines multiple iterables\"},{\"id\":16,\"question\":\"Which is true about Python?\",\"options\":[\"Dynamically typed\",\"Statically typed\",\"Compiled language\",\"Interpreted language\"],\"answer\":\"Dynamically typed\"},{\"id\":17,\"question\":\"What is a lambda function?\",\"options\":[\"Anonymous function\",\"Named function\",\"Generator function\",\"Coroutine function\"],\"answer\":\"Anonymous function\"},{\"id\":18,\"question\":\"Which imports all from a module?\",\"options\":[\"import module\",\"import module\",\"import * from module\",\"from module import *\"],\"answer\":\"from module import *\"},{\"id\":19,\"question\":\"What does frozenset() create?\",\"options\":[\"Mutable set\",\"Immutable set\",\"Frozen list\",\"Immutable set\"],\"answer\":\"Immutable set\"},{\"id\":20,\"question\":\"Which operator checks identity?\",\"options\":[\"==\",\"is\",\"in\",\"not in\"],\"answer\":\"is\"},{\"id\":21,\"question\":\"Which is used for file reading?\",\"options\":[\"open('file.txt', 'r')\",\"open('file.txt', 'w')\",\"open('file.txt', 'a')\",\"open('file.txt', 'r')\"],\"answer\":\"open('file.txt', 'r')\"},{\"id\":22,\"question\":\"What is pickle used for?\",\"options\":[\"Object serialization\",\"File compression\",\"Data encryption\",\"Data hashing\"],\"answer\":\"Object serialization\"},{\"id\":23,\"question\":\"Which creates a virtual environment?\",\"options\":[\"venv\",\"virtualenv\",\"pipenv\",\"virtualenv\"],\"answer\":\"All of the above\"},{\"id\":24,\"question\":\"What does globals() return?\",\"options\":[\"Local variables\",\"Global variables\",\"Built-in functions\",\"Modules\"],\"answer\":\"Global variables\"},{\"id\":25,\"question\":\"What does @property decorator do?\",\"options\":[\"Creates getter method\",\"Creates setter method\",\"Creates deleter method\",\"Creates property method\"],\"answer\":\"All of the above\"},{\"id\":26,\"question\":\"Which is true about Python's GIL?\",\"options\":[\"Global Interpreter Lock\",\"Allows multiple threads\",\"Prevents true parallelism\",\"Enables true parallelism\"],\"answer\":\"Both a and c\"},{\"id\":27,\"question\":\"What is the MRO in Python?\",\"options\":[\"Method Resolution Order\",\"Multiple Return Option\",\"Method Reference Object\",\"Function Reference Object\"],\"answer\":\"Method Resolution Order\"},{\"id\":28,\"question\":\"Which is used for asynchronous programming?\",\"options\":[\"async/await\",\"yield from\",\"threading\",\"multiprocessing\"],\"answer\":\"async/await\"},{\"id\":29,\"question\":\"What does collections.namedtuple provide?\",\"options\":[\"Tuple with named fields\",\"Named dictionary\",\"Named list\",\"Deque\"],\"answer\":\"Tuple with named fields\"},{\"id\":30,\"question\":\"Which is a context manager?\",\"options\":[\"with statement\",\"try statement\",\"if statement\",\"if-else statement\"],\"answer\":\"with statement\"},{\"id\":31,\"question\":\"What is __name__ attribute?\",\"options\":[\"Module name\",\"Class name\",\"Function name\",\"Function variable\"],\"answer\":\"All of the above\"},{\"id\":32,\"question\":\"Which is used for type hints?\",\"options\":[\"typing module\",\"type() function\",\"isinstance()\",\"type()\"],\"answer\":\"typing module\"},{\"id\":33,\"question\":\"What does itertools module provide?\",\"options\":[\"Iterators for efficient looping\",\"Mathematical functions\",\"Statistical functions\",\"Math functions\"],\"answer\":\"Iterators for efficient looping\"},{\"id\":34,\"question\":\"Which creates a shallow copy?\",\"options\":[\"copy.copy()\",\"copy.deepcopy()\",\"copy.deepcopy()\",\"copy.copy()\"],\"answer\":\"Both a and c\"},{\"id\":35,\"question\":\"What is the Walrus operator?\",\"options\":[\":=\",\"==\",\"=\",\"==\"],\"answer\":\":=\"},{\"id\":36,\"question\":\"Which is used for testing?\",\"options\":[\"unittest\",\"pytest\",\"doctest\",\"pydoc\"],\"answer\":\"All of the above\"},{\"id\":37,\"question\":\"What does __slots__ do?\",\"options\":[\"Prevents dynamic attribute creation\",\"Improves memory usage\",\"Creates slots for attributes\",\"Restricts attributes\"],\"answer\":\"Both a and b\"},{\"id\":38,\"question\":\"Which is a metaclass?\",\"options\":[\"type\",\"object\",\"class\",\"object\"],\"answer\":\"type\"},{\"id\":39,\"question\":\"What does __call__ method do?\",\"options\":[\"Makes object callable\",\"Calls function\",\"Calls class\",\"Invokes constructor\"],\"answer\":\"Makes object callable\"},{\"id\":40,\"question\":\"Which is used for data classes?\",\"options\":[\"@dataclass\",\"dataclasses module\",\"collections module\",\"itertools module\"],\"answer\":\"Both a and b\"},{\"id\":41,\"question\":\"Which HTML5 element defines navigation links?\",\"options\":[\"<nav>\",\"<navigation>\",\"<links>\",\"<iframe>\"],\"answer\":\"<nav>\"},{\"id\":42,\"question\":\"What does the required attribute do?\",\"options\":[\"Makes input mandatory\",\"Sets default value\",\"Validates input\",\"Sanitizes form\"],\"answer\":\"Makes input mandatory\"},{\"id\":43,\"question\":\"Which creates a dropdown list?\",\"options\":[\"<input type=\\\"dropdown\\\">\",\"<select>\",\"<dropdown>\",\"<select>\"],\"answer\":\"<select>\"},{\"id\":44,\"question\":\"What is the purpose of <meta charset=\\\"UTF-8\\\">?\",\"options\":[\"Sets character encoding\",\"Defines metadata\",\"Sets viewport\",\"Sets charset\"],\"answer\":\"Sets character encoding\"},{\"id\":45,\"question\":\"Which tag defines a footer?\",\"options\":[\"<footer>\",\"<bottom>\",\"<end>\",\"Executes after DOM ready\"],\"answer\":\"<footer>\"},{\"id\":46,\"question\":\"What does defer attribute do in script tag?\",\"options\":[\"Delays script execution\",\"Executes after HTML parsing\",\"Executes immediately\",\"<button>\"],\"answer\":\"Both a and b\"},{\"id\":47,\"question\":\"Which creates a text input field?\",\"options\":[\"<input type=\\\"text\\\">\",\"<textfield>\",\"<textarea>\",\"Navigation bar\"],\"answer\":\"<input type=\\\"text\\\">\"},{\"id\":48,\"question\":\"What is the purpose of ARIA attributes?\",\"options\":[\"Accessibility for screen readers\",\"Animation effects\",\"Responsive design\",\"Transforms elements\"],\"answer\":\"Accessibility for screen readers\"},{\"id\":49,\"question\":\"Which tag defines a section?\",\"options\":[\"<section>\",\"<div>\",\"<article>\",\"<strong>\"],\"answer\":\"All can be used\"},{\"id\":50,\"question\":\"What does async attribute do?\",\"options\":[\"Loads script asynchronously\",\"Delays execution\",\"Blocks parsing\",\"Supports CORS\"],\"answer\":\"Loads script asynchronously\"},{\"id\":51,\"question\":\"Which is a valid HTML5 doctype?\",\"options\":[\"<!DOCTYPE html>\",\"<!DOCTYPE HTML5>\",\"<!DOCTYPE html5>\",\"<figcaption>\"],\"answer\":\"<!DOCTYPE html>\"},{\"id\":52,\"question\":\"What does <datalist> element provide?\",\"options\":[\"Predefined options for input\",\"Data table\",\"List of links\",\"Local storage\"],\"answer\":\"Predefined options for input\"},{\"id\":53,\"question\":\"Which creates a progress bar?\",\"options\":[\"<progress>\",\"<meter>\",\"<bar>\",\"<input type=\\\"time\\\">\"],\"answer\":\"<progress>\"},{\"id\":54,\"question\":\"What is <canvas> used for?\",\"options\":[\"Drawing graphics via JavaScript\",\"Displaying images\",\"Creating animations\",\"Registers service worker\"],\"answer\":\"All of the above\"},{\"id\":55,\"question\":\"Which tag defines important text?\",\"options\":[\"<strong>\",\"<b>\",\"<em>\",\"<video>\"],\"answer\":\"<strong>\"},{\"id\":56,\"question\":\"What does sandbox attribute do in iframe?\",\"options\":[\"Restricts iframe capabilities\",\"Allows all features\",\"Enables cross-origin\",\"Flexible box layout\"],\"answer\":\"Restricts iframe capabilities\"},{\"id\":57,\"question\":\"Which is a semantic HTML element?\",\"options\":[\"<main>\",\"<aside>\",\"<figure>\",\"querySelector()\"],\"answer\":\"All of the above\"},{\"id\":58,\"question\":\"What is web storage?\",\"options\":[\"localStorage\",\"sessionStorage\",\"Cookies\",\"Both b and c\"],\"answer\":\"Both a and b\"},{\"id\":59,\"question\":\"Which creates a date picker?\",\"options\":[\"<input type=\\\"date\\\">\",\"<input type=\\\"calendar\\\">\",\"<input type=\\\"datetime\\\">\",\"<section>\"],\"answer\":\"<input type=\\\"date\\\">\"},{\"id\":60,\"question\":\"What does manifest attribute do?\",\"options\":[\"Defines web app manifest\",\"Caches files for offline\",\"Loads manifest file\",\"Deferred script\"],\"answer\":\"Both a and b\"},{\"id\":61,\"question\":\"Which is used for video?\",\"options\":[\"<video>\",\"<media>\",\"<movie>\",\"<input type=\\\"color\\\">\"],\"answer\":\"<video>\"},{\"id\":62,\"question\":\"What is a viewport meta tag?\",\"options\":[\"<meta name=\\\"viewport\\\">\",\"Controls mobile display\",\"Sets responsive design\",\"Imports automatically\"],\"answer\":\"All of the above\"},{\"id\":63,\"question\":\"Which creates a search field?\",\"options\":[\"<input type=\\\"search\\\">\",\"<search>\",\"<find>\",\"<div>\"],\"answer\":\"<input type=\\\"search\\\">\"},{\"id\":64,\"question\":\"What does preload do?\",\"options\":[\"Loads resources early\",\"Prefetches content\",\"Both a and b\",\"Vector images\"],\"answer\":\"Loads resources early\"},{\"id\":65,\"question\":\"Which is a block-level element?\",\"options\":[\"<div>\",\"<span>\",\"<a>\",\"text-align\"],\"answer\":\"<div>\"},{\"id\":66,\"question\":\"What is the purpose of <noscript>?\",\"options\":[\"Content for non-JS browsers\",\"Alternative script\",\"Alternative script\",\"Hides element\"],\"answer\":\"Content for non-JS browsers\"},{\"id\":67,\"question\":\"Which creates a color picker?\",\"options\":[\"<input type=\\\"color\\\">\",\"<colorpicker>\",\"<input type=\\\"picker\\\">\",\"Sass\"],\"answer\":\"<input type=\\\"color\\\">\"},{\"id\":68,\"question\":\"What does download attribute do?\",\"options\":[\"Makes link download file\",\"Downloads automatically\",\"Downloads automatically\",\"Class > Element > ID > Inline\"],\"answer\":\"Both a and c\"},{\"id\":69,\"question\":\"Which is an inline element?\",\"options\":[\"<span>\",\"<div>\",\"<p>\",\"bg-color: linear\"],\"answer\":\"<span>\"},{\"id\":70,\"question\":\"What is SVG?\",\"options\":[\"Scalable Vector Graphics\",\"XML-based vector images\",\"Both a and b\",\"Fixed until threshold\"],\"answer\":\"Both a and b\"},{\"id\":71,\"question\":\"Which property controls text alignment?\",\"options\":[\"text-align\",\"align-text\",\"text-justify\",\"@function\"],\"answer\":\"text-align\"},{\"id\":72,\"question\":\"What does display: none; do?\",\"options\":[\"Hides element completely\",\"Makes invisible but takes space\",\"Collapses element\",\"flex-direction\"],\"answer\":\"Hides element completely\"},{\"id\":73,\"question\":\"Which is a CSS preprocessor?\",\"options\":[\"Sass\",\"Less\",\"Stylus\",\"All of the above\"],\"answer\":\"All of the above\"},{\"id\":74,\"question\":\"What is the CSS specificity hierarchy?\",\"options\":[\"Inline > ID > Class > Element\",\"ID > Class > Element > Inline\",\"Element > Class > ID > Inline\",\"Clips content outside\"],\"answer\":\"Inline > ID > Class > Element\"},{\"id\":75,\"question\":\"Which creates a gradient background?\",\"options\":[\"background: linear-gradient();\",\"gradient: linear();\",\"bg-gradient: linear\",\"None of the above\"],\"answer\":\"background: linear-gradient();\"},{\"id\":76,\"question\":\"What does position: sticky; do?\",\"options\":[\"Sticks to viewport when scrolling\",\"Fixed positioning\",\"Relative until threshold\",\"Both a and c\"],\"answer\":\"Both a and c\"},{\"id\":77,\"question\":\"Which is a CSS custom property?\",\"options\":[\"--variable-name\",\"var-name\",\"@variable\",\"box-shadow\"],\"answer\":\"--variable-name\"},{\"id\":78,\"question\":\"What is flex-direction?\",\"options\":[\"Controls flex item direction\",\"row, column, row-reverse, column-reverse\",\"Both a and b\",\"Clear property\"],\"answer\":\"Both a and b\"},{\"id\":79,\"question\":\"Which creates animation?\",\"options\":[\"@keyframes\",\"animation property\",\"Both a and b\",\"grid-template\"],\"answer\":\"Both a and b\"},{\"id\":80,\"question\":\"What does overflow: hidden; do?\",\"options\":[\"Hides overflow content\",\"Adds scrollbars\",\"Clips content\",\"Both a and c\"],\"answer\":\"Both a and c\"},{\"id\":81,\"question\":\"Which is a CSS selector?\",\"options\":[\"Element selector (p)\",\"Class selector (.class)\",\"All of the above\",\"word-wrap\"],\"answer\":\"All of the above\"},{\"id\":82,\"question\":\"What is rem unit based on?\",\"options\":[\"Root element font-size\",\"Parent element font-size\",\"Parent element font-size\",\"Improves compatibility\"],\"answer\":\"Root element font-size\"},{\"id\":83,\"question\":\"Which creates a shadow?\",\"options\":[\"box-shadow\",\"text-shadow\",\"drop-shadow\",\"All of theabove\"],\"answer\":\"All of the above\"},{\"id\":84,\"question\":\"What does z-index require to work?\",\"options\":[\"Position property (not static)\",\"Display property\",\"Float property\",\"Both b and c\"],\"answer\":\"Position property (not static)\"},{\"id\":85,\"question\":\"Which is a CSS Grid property?\",\"options\":[\"grid-template-columns\",\"grid-template-rows\",\"grid-area\",\"border-radius\"],\"answer\":\"All of the above\"},{\"id\":86,\"question\":\"What is BEM methodology?\",\"options\":[\"Block Element Modifier\",\"CSS naming convention\",\"JavaScript framework\",\"Background color\"],\"answer\":\"Both a and b\"},{\"id\":87,\"question\":\"Which controls text overflow?\",\"options\":[\"text-overflow\",\"overflow-wrap\",\"word-break\",\":nth-of-type()\"],\"answer\":\"All of the above\"},{\"id\":88,\"question\":\"What does will-change do?\",\"options\":[\"Hints browser about changes\",\"Forces repaint\",\"Improves performance\",\"Both a and c\"],\"answer\":\"Both a and c\"},{\"id\":89,\"question\":\"Which is a CSS function?\",\"options\":[\"calc()\",\"var()\",\"All of the above\",\"filter: contrast()\"],\"answer\":\"All of the above\"},{\"id\":90,\"question\":\"What is vh unit?\",\"options\":[\"1% of viewport height\",\"Viewport height unit\",\"Both a and b\",\"Object fit\"],\"answer\":\"Both a and b\"},{\"id\":91,\"question\":\"Which creates a border radius?\",\"options\":[\"border-radius\",\"border-curve\",\"border-curve\",\"transition-delay\"],\"answer\":\"border-radius\"},{\"id\":92,\"question\":\"What does backface-visibility control?\",\"options\":[\"Visibility when rotated\",\"Both a and c\",\"Background visibility\",\"Inheritance hierarchy\"],\"answer\":\"Both a and c\"},{\"id\":93,\"question\":\"Which is a pseudo-class?\",\"options\":[\":hover\",\":focus\",\":nth-child()\",\"All of the above\"],\"answer\":\"All of the above\"},{\"id\":94,\"question\":\"What is CSS Grid gap property?\",\"options\":[\"grid-gap (gap in newer syntax)\",\"Space between grid items\",\"Both a and b\",\"Maximum viewport width\"],\"answer\":\"Both a and b\"},{\"id\":95,\"question\":\"Which creates a filter effect?\",\"options\":[\"filter: blur()\",\"filter: grayscale()\",\"filter: brightness()\",\"All of the above\"],\"answer\":\"All of the above\"},{\"id\":96,\"question\":\"What does object-fit control?\",\"options\":[\"All of the above\",\"contain, cover, fill\",\"Object position\",\"let\"],\"answer\":\"All of the above\"},{\"id\":97,\"question\":\"Which is a CSS transition property?\",\"options\":[\"transition-property\",\"transition-duration\",\"transition-timing-function\",\"All of the above\"],\"answer\":\"All of the above\"},{\"id\":98,\"question\":\"What is the cascade in CSS?\",\"options\":[\"Order of rule application\",\"Specificity calculation\",\"Inheritance flow\",\"Both a and b\"],\"answer\":\"Both a and b\"},{\"id\":99,\"question\":\"Which creates a CSS variable?\",\"options\":[\"--main-color: #333;\",\"var(--main-color)\",\"@variable main-color\",\"Both a and b\"],\"answer\":\"Both a and b\"},{\"id\":100,\"question\":\"What does min-height: 100vh; do?\",\"options\":[\"Minimum height of viewport\",\"At least full viewport height\",\"Const\",\"Object.assign()\"],\"answer\":\"At least full viewport height\"},{\"id\":101,\"question\":\"What is ES6?\",\"options\":[\"ECMAScript 2015\",\"JavaScript standard\",\"Both a and b\",\"Executes on call\"],\"answer\":\"Both a and b\"},{\"id\":102,\"question\":\"Which declares a constant?\",\"options\":[\"const\",\"let\",\"var\",\"All of the above\"],\"answer\":\"All of the above\"},{\"id\":103,\"question\":\"What is a Promise?\",\"options\":[\"Async operation result\",\"Represents eventual completion\",\"Both a and b\",\"Creates processes\"],\"answer\":\"Both a and b\"},{\"id\":104,\"question\":\"Which is a falsy value?\",\"options\":[\"FALSE\",\"0\",\"Both a and b\",\"All of the above\"],\"answer\":\"All of the above\"},{\"id\":105,\"question\":\"What does Array.prototype.map() do?\",\"options\":[\"Creates new array\",\"Transforms each element\",\"Both a and b\",\"Child to parent\"],\"answer\":\"Both a and b\"},{\"id\":106,\"question\":\"Which is a JavaScript runtime?\",\"options\":[\"Node.js\",\"Deno\",\"Object.create()\",\"Both a and b\"],\"answer\":\"Both a and b\"},{\"id\":107,\"question\":\"What is destructuring?\",\"options\":[\"Extracting values from arrays/objects\",\"ES6 feature\",\"Both a and b\",\"API for CSS/JS\"],\"answer\":\"Both a and b\"},{\"id\":108,\"question\":\"Which is a template literal?\",\"options\":[\"string ${variable}\",\"Backticks syntax\",\"All of the above\",\"WebSQL\"],\"answer\":\"All of the above\"},{\"id\":109,\"question\":\"What is hoisting?\",\"options\":[\"Variable/function declaration moved to top\",\"JS behavior\",\"Creates threads\",\"Cross-origin request\"],\"answer\":\"All of the above\"},{\"id\":110,\"question\":\"Which creates an object?\",\"options\":[\"Object literal {}\",\"new Object()\",\"AMD\",\"All of the above\"],\"answer\":\"All of the above\"},{\"id\":111,\"question\":\"What is an IIFE?\",\"options\":[\"Immediately Invoked Function Expression\",\"(function(){})()\",\"Parent to child\",\"Both b and b\"],\"answer\":\"Both a and b\"},{\"id\":112,\"question\":\"Which is an arrow function?\",\"options\":[\"() => {}\",\"Shorter syntax\",\"Both a and b\",\"Both a and b\"],\"answer\":\"Both a and b\"},{\"id\":113,\"question\":\"What does async/await do?\",\"options\":[\"Simplifies async code\",\"Makes async look synchronous\",\"API for HTML/XML\",\"All of the above\"],\"answer\":\"All of the above\"},{\"id\":114,\"question\":\"Which is a JavaScript module system?\",\"options\":[\"ES6 modules\",\"CommonJS\",\"IndexedDB\",\"All of the above\"],\"answer\":\"All of the above\"},{\"id\":115,\"question\":\"What is event bubbling?\",\"options\":[\"Event propagates upward\",\"Child to parent\",\"Cross-site scripting\",\"Both b and c\"],\"answer\":\"Both a and b\"},{\"id\":116,\"question\":\"Which is a higher-order function?\",\"options\":[\"Function that takes/returns functions\",\"map, filter, reduce\",\"Vue\",\"All of the above\"],\"answer\":\"All of the above\"},{\"id\":117,\"question\":\"What is the DOM?\",\"options\":[\"Document Object Model\",\"Tree structure of HTML\",\"Both a and b\",\"All of the above\"],\"answer\":\"Both a and b\"},{\"id\":118,\"question\":\"Which is a storage API?\",\"options\":[\"localStorage\",\"sessionStorage\",\"Both a and b\",\"Both b and c\"],\"answer\":\"Both a and b\"},{\"id\":119,\"question\":\"What is CORS?\",\"options\":[\"Cross-Origin Resource Sharing\",\"Security mechanism\",\"Classical inheritance\",\"All of the above\"],\"answer\":\"All of the above\"},{\"id\":120,\"question\":\"Which is a JavaScript framework?\",\"options\":[\"React\",\"Angular\",\"Both a and b\",\"All of the above\"],\"answer\":\"Both a and b\"},{\"id\":121,\"question\":\"What does JSON.stringify() do?\",\"options\":[\"Converts object to JSON string\",\"Serializes JavaScript object\",\"Both a and b\",\"async function syntax\"],\"answer\":\"All of the above\"},{\"id\":122,\"question\":\"Which is a JavaScript event?\",\"options\":[\"click\",\"load\",\"UI thread worker\",\"All of the above\"],\"answer\":\"Both a and b\"},{\"id\":123,\"question\":\"What is prototypal inheritance?\",\"options\":[\"Objects inherit from prototypes\",\"JavaScript inheritance model\",\"All of the above\",\"Both b and c\"],\"answer\":\"All of the above\"},{\"id\":124,\"question\":\"Which is a string method?\",\"options\":[\"includes()\",\"startsWith()\",\"Both a and b\",\"Both b and c\"],\"answer\":\"All of the above\"},{\"id\":125,\"question\":\"What is a Web Worker?\",\"options\":[\"Runs script in background\",\"Doesn't block UI\",\"All of the above\",\"Spread operator\"],\"answer\":\"All of the above\"},{\"id\":126,\"question\":\"Which is a number method?\",\"options\":[\"toFixed()\",\"toString()\",\"All of the above\",\"async function syntax\"],\"answer\":\"All of the above\"},{\"id\":127,\"question\":\"What is the event loop?\",\"options\":[\"JavaScript runtime model\",\"Handles async operations\",\"function* syntax\",\"Both b and c\"],\"answer\":\"Both a and b\"},{\"id\":128,\"question\":\"Which is a Set method?\",\"options\":[\"add()\",\"has()\",\"All of the above\",\"Both b and c\"],\"answer\":\"All of the above\"},{\"id\":129,\"question\":\"What is memoization?\",\"options\":[\"Caching function results\",\"Performance optimization\",\"Both a and b\",\"Integer type\"],\"answer\":\"Both a and b\"},{\"id\":130,\"question\":\"Which is a Map method?\",\"options\":[\"set()\",\"get()\",\"Both a and b\",\"All of the above\"],\"answer\":\"All of the above\"},{\"id\":131,\"question\":\"What is a generator function?\",\"options\":[\"function*\",\"Handles async operations\",\"Rest parameter\",\"Both b and c\"],\"answer\":\"Both a and b\"},{\"id\":132,\"question\":\"Which is a date method?\",\"options\":[\"getFullYear()\",\"has()\",\"All of the above\",\"Both b and c\"],\"answer\":\"Both a and b\"},{\"id\":133,\"question\":\"What is a Proxy object?\",\"options\":[\"Creates object wrapper\",\"Performance optimization\",\"Both a and b\",\"All of the above\"],\"answer\":\"All of the above\"},{\"id\":134,\"question\":\"Which is a RegExp method?\",\"options\":[\"test()\",\"get()\",\"Both a and b\",\"All of the above\"],\"answer\":\"All of the above\"},{\"id\":135,\"question\":\"What is the spread operator?\",\"options\":[\"Spread syntax (...)\",\"Expands iterables\",\"String type\",\"All of the above\"],\"answer\":\"All of the above\"},{\"id\":136,\"question\":\"Which is an array method?\",\"options\":[\"Async function\",\"some()\",\"globalThis\",\"All of the above\"],\"answer\":\"All of the above\"},{\"id\":137,\"question\":\"What is the rest parameter?\",\"options\":[\"Promise\",\"Collects remaining arguments\",\"Both a and b\",\"All of the above\"],\"answer\":\"All of the above\"},{\"id\":138,\"question\":\"Which is a math method?\",\"options\":[\"Object.freeze()\",\"Math.floor()\",\"Both a and b\",\"Both b and c\"],\"answer\":\"Both a and b\"},{\"id\":139,\"question\":\"What is a Symbol?\",\"options\":[\"NodeList\",\"ES6 primitive\",\"All of the above\",\"Both b and c\"],\"answer\":\"All of the above\"},{\"id\":140,\"question\":\"Which is a global object?\",\"options\":[\"map()\",\"global (Node.js)\",\"Both a and b\",\"Both b and c\"],\"answer\":\"Both a and b\"},{\"id\":141,\"question\":\"Which is a SQL command category?\",\"options\":[\"call()\",\"DML (Data Manipulation)\",\"Both a and b\",\"Both b and c\"],\"answer\":\"Both a and b\"},{\"id\":142,\"question\":\"What does SELECT do?\",\"options\":[\"Event delegation\",\"From tables\",\"Both a and b\",\"All of the above\"],\"answer\":\"All of the above\"},{\"id\":143,\"question\":\"Which is a SQL constraint?\",\"options\":[\"WeakMap\",\"FOREIGN KEY\",\"Both a and b\",\"Both b and c\"],\"answer\":\"Both a and b\"},{\"id\":144,\"question\":\"What is a JOIN?\",\"options\":[\"querySelector()\",\"Based on related column\",\"Both a and b\",\"All of the above\"],\"answer\":\"All of the above\"},{\"id\":145,\"question\":\"Which is a SQL function?\",\"options\":[\"innerHTML\",\"SUM()\",\"Both a and b\",\"Both b and c\"],\"answer\":\"Both a and b\"},{\"id\":146,\"question\":\"What is normalization?\",\"options\":[\"classList.add()\",\"Reduces redundancy\",\"Both a and b\",\"Both b and c\"],\"answer\":\"Both a and b\"},{\"id\":147,\"question\":\"Which is a transaction property?\",\"options\":[\"CSS Object Model\",\"Atomicity, Consistency, Isolation, Durability\",\"Both a and b\",\"All of the above\"],\"answer\":\"All of the above\"},{\"id\":148,\"question\":\"What is an index?\",\"options\":[\"new\",\"Data structure\",\"Both a and b\",\"All of the above\"],\"answer\":\"All of the above\"},{\"id\":149,\"question\":\"Which is a SQL data type?\",\"options\":[\"Object.assign()\",\"VARCHAR\",\"Both a and b\",\"Both b and c\"],\"answer\":\"Both a and b\"},{\"id\":150,\"question\":\"What is a view?\",\"options\":[\"removeEventListener()\",\"Based on SELECT\",\"Both a and b\",\"Both b and c\"],\"answer\":\"Both a and b\"},{\"id\":151,\"question\":\"Which is a NoSQL database?\",\"options\":[\"position: absolute\",\"Cassandra\",\"Both a and b\",\"All of the above\"],\"answer\":\"All of the above\"},{\"id\":152,\"question\":\"What is a stored procedure?\",\"options\":[\"fetch()\",\"Reusable\",\"Both a and b\",\"All of the above\"],\"answer\":\"All of the above\"},{\"id\":153,\"question\":\"Which is a SQL operator?\",\"options\":[\"sessionStorage\",\"LIKE\",\"Both a and b\",\"Both b and c\"],\"answer\":\"Both a and b\"},{\"id\":154,\"question\":\"What is a trigger?\",\"options\":[\"contains()\",\"INSERT/UPDATE/DELETE\",\"Both a and b\",\"All of the above\"],\"answer\":\"All of the above\"},{\"id\":155,\"question\":\"Which is a database model?\",\"options\":[\"Object.keys()\",\"Document\",\"Both a and b\",\"Both b and c\"],\"answer\":\"Both a and b\"},{\"id\":156,\"question\":\"What is a subquery?\",\"options\":[\"default export\",\"Nested SELECT\",\"Both a and b\",\"All of the above\"],\"answer\":\"All of the above\"},{\"id\":157,\"question\":\"Which is a SQL clause?\",\"options\":[\"import()\",\"ORDER BY\",\"Both a and b\",\"Both b and c\"],\"answer\":\"All of the above\"},{\"id\":158,\"question\":\"What is ORM?\",\"options\":[\"reduce()\",\"Maps objects to database\",\"Both a and b\",\"Both b and c\"],\"answer\":\"Both a and b\"},{\"id\":159,\"question\":\"Which is a database transaction?\",\"options\":[\"slice()\",\"COMMIT\",\"Both a and b\",\"Both b and c\"],\"answer\":\"All of the above\"},{\"id\":160,\"question\":\"What is a cursor?\",\"options\":[\"parseInt()\",\"Traverses result set\",\"Both a and b\",\"Both b and c\"],\"answer\":\"Both a and c\"},{\"id\":161,\"question\":\"Which is a database normalization form?\",\"options\":[\"Promise.all()\",\"2NF\",\"Both a and b\",\"Both b and c\"],\"answer\":\"All of the above\"},{\"id\":162,\"question\":\"What is denormalization?\",\"options\":[\"replace()\",\"Improves read performance\",\"Both a and b\",\"Both b and c\"],\"answer\":\"Both a and b\"},{\"id\":163,\"question\":\"Which is a SQL injection prevention?\",\"options\":[\"Date.now()\",\"Parameterized queries\",\"Both a and b\",\"Both b and c\"],\"answer\":\"All of the above\"},{\"id\":164,\"question\":\"What is replication?\",\"options\":[\"for...of\",\"For backup/performance\",\"Both a and b\",\"Both b and c\"],\"answer\":\"Both a and b\"},{\"id\":165,\"question\":\"Which is a database backup type?\",\"options\":[\"padStart()\",\"Differential\",\"Both a and b\",\"Both b and c\"],\"answer\":\"All of the above\"},{\"id\":166,\"question\":\"What is sharding?\",\"options\":[\"hasOwnProperty()\",\"Distributes data\",\"Both a and b\",\"Both b and c\"],\"answer\":\"Both a and c\"},{\"id\":167,\"question\":\"Which is a database index type?\",\"options\":[\"Object.values()\",\"Hash\",\"Both a and b\",\"Both b and c\"],\"answer\":\"All of the above\"},{\"id\":168,\"question\":\"What is a deadlock?\",\"options\":[\"template literals\",\"Requires intervention\",\"Both a and b\",\"Both b and c\"],\"answer\":\"Both a and b\"},{\"id\":169,\"question\":\"Which is a database isolation level?\",\"options\":[\"includes()\",\"Read Committed\",\"Both a and b\",\"Both b and c\"],\"answer\":\"All of the above\"},{\"id\":170,\"question\":\"What is ETL?\",\"options\":[\"Object.create()\",\"Data integration process\",\"Both a and b\",\"Both b and c\"],\"answer\":\"Both a and b\"},{\"id\":171,\"question\":\"What is Django's architecture?\",\"options\":[\"Math.random()\",\"Similar to MVC\",\"Both a and b\",\"Both b and c\"],\"answer\":\"All of the above\"},{\"id\":172,\"question\":\"Which is a Django command?\",\"options\":[\"querySelectorAll()\",\"startapp\",\"Both a and b\",\"Both b and c\"],\"answer\":\"Both a and c\"},{\"id\":173,\"question\":\"What is a Django app?\",\"options\":[\"Object.entries()\",\"Reusable\",\"Both a and b\",\"Both b and c\"],\"answer\":\"All of the above\"},{\"id\":174,\"question\":\"Which is a Django model field?\",\"options\":[\"Object.fromEntries()\",\"IntegerField\",\"Both a and b\",\"Both b and c\"],\"answer\":\"Both a and b\"},{\"id\":175,\"question\":\"What is Django ORM?\",\"options\":[\"new Map()\",\"Python classes to tables\",\"Both a and b\",\"All of the above\"],\"answer\":\"All of the above\"},{\"id\":176,\"question\":\"Which is a Django view type?\",\"options\":[\"setTimeout()\",\"Class-based\",\"Both a and b\",\"Both b and c\"],\"answer\":\"Both a and b\"},{\"id\":177,\"question\":\"What is a Django template?\",\"options\":[\"setInterval()\",\"Dynamic content\",\"Both a and b\",\"All of the above\"],\"answer\":\"All of the above\"},{\"id\":178,\"question\":\"Which is a Django template tag?\",\"options\":[\"Symbol()\",\"{% if %}\",\"Both a and b\",\"Both b and c\"],\"answer\":\"Both a and c\"},{\"id\":179,\"question\":\"What is Django middleware?\",\"options\":[\"Object.getPrototypeOf()\",\"Global hooks\",\"Both a and b\",\"All of the above\"],\"answer\":\"All of the above\"},{\"id\":180,\"question\":\"Which is a Django authentication feature?\",\"options\":[\"Object.defineProperty()\",\"Login/logout views\",\"Both a and b\",\"Both b and c\"],\"answer\":\"Both a and b\"},{\"id\":181,\"question\":\"What is Django REST Framework?\",\"options\":[\"localStorage.setItem()\",\"RESTful API building\",\"Both a and b\",\"All of the above\"],\"answer\":\"All of the above\"},{\"id\":182,\"question\":\"Which is a Django form?\",\"options\":[\"location.href\",\"Validation\",\"Both a and b\",\"Both b and c\"],\"answer\":\"Both a and b\"},{\"id\":183,\"question\":\"What is Django admin?\",\"options\":[\"addEventListener()\",\"CRUD operations\",\"Both a and b\",\"All of the above\"],\"answer\":\"All of the above\"},{\"id\":184,\"question\":\"Which is a Django signal?\",\"options\":[\"remove()\",\"Decoupled components\",\"Both a and b\",\"Both b and c\"],\"answer\":\"Both a and c\"},{\"id\":185,\"question\":\"What is Django migration?\",\"options\":[\"element.style.property\",\"Version control for DB\",\"Both a and b\",\"All of the above\"],\"answer\":\"All of the above\"},{\"id\":186,\"question\":\"Which is a Django settings configuration?\",\"options\":[\"innerText\",\"DATABASES\",\"Both a and b\",\"Both b and c\"],\"answer\":\"Both a and b\"},{\"id\":187,\"question\":\"What is Django's WSGI?\",\"options\":[\"outerHTML\",\"Deployment standard\",\"Both a and b\",\"All of the above\"],\"answer\":\"All of the above\"},{\"id\":188,\"question\":\"Which is a Django cache backend?\",\"options\":[\"nextElementSibling\",\"Redis\",\"Both a and b\",\"Both b and c\"],\"answer\":\"Both a and b\"},{\"id\":189,\"question\":\"What is Django's ASGI?\",\"options\":[\"previousElementSibling\",\"Async support\",\"Both a and b\",\"All of the above\"],\"answer\":\"All of the above\"},{\"id\":190,\"question\":\"Which is a Django security feature?\",\"options\":[\"parentNode\",\"XSS protection\",\"Both a and b\",\"Both b and c\"],\"answer\":\"Both a and c\"},{\"id\":191,\"question\":\"What is Django's static files?\",\"options\":[\"childNodes\",\"collectstatic command\",\"Both a and b\",\"All of the above\"],\"answer\":\"All of the above\"},{\"id\":192,\"question\":\"Which is a Django test type?\",\"options\":[\"firstElementChild\",\"Integration tests\",\"Both a and b\",\"Both b and c\"],\"answer\":\"Both a and b\"},{\"id\":193,\"question\":\"What is Django's middleware order?\",\"options\":[\"lastElementChild\",\"Response processing reverse\",\"Both a and b\",\"All of the above\"],\"answer\":\"All of the above\"},{\"id\":194,\"question\":\"Which is a Django URL pattern?\",\"options\":[\"appendChild()\",\"re_path()\",\"Both a and b\",\"Both b and c\"],\"answer\":\"Both a and b\"},{\"id\":195,\"question\":\"What is Django's context?\",\"options\":[\"insertBefore()\",\"Dictionary-like object\",\"Both a and b\",\"All of the above\"],\"answer\":\"All of the above\"},{\"id\":196,\"question\":\"Which is a Django session backend?\",\"options\":[\"replaceChild()\",\"Cache\",\"Both a and b\",\"Both b and c\"],\"answer\":\"Both a and c\"},{\"id\":197,\"question\":\"What is Django's queryset?\",\"options\":[\"cloneNode()\",\"Lazy evaluation\",\"Both a and b\",\"All of the above\"],\"answer\":\"All of the above\"},{\"id\":198,\"question\":\"Which is a Django management command?\",\"options\":[\"contains()\",\"migrate\",\"Both a and b\",\"Both b and c\"],\"answer\":\"Both a and b\"},{\"id\":199,\"question\":\"What is Django's fixture?\",\"options\":[\"matches()\",\"JSON/XML/YAML format\",\"Both a and b\",\"All of the above\"],\"answer\":\"All of the above\"},{\"id\":200,\"question\":\"Which is a Django deployment option?\",\"options\":[\"closest()\",\"Docker\",\"Both a and b\",\"Both b and c\"],\"answer\":\"Both a and b\"}]"));}),
"[project]/pages/test/python.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// pages/test/python
__turbopack_context__.s([
    "default",
    ()=>PythonTest
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$python$2d$questions$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/data/python-questions.json (json)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
const STORAGE_KEY = "python_test_state_v1";
function PythonTest() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    /* ---------------- STATES ---------------- */ const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("login");
    const [timer, setTimer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(20 * 60);
    const [questions, setQuestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [answers, setAnswers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [tabCount, setTabCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [autoSubmitReason, setAutoSubmitReason] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    /* ---------------- REFS ---------------- */ const submittedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    /* ---------------- LOAD SAVED STATE ---------------- */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PythonTest.useEffect": ()=>{
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const data = JSON.parse(saved);
                setStep(data.step);
                setTimer(data.timer);
                setQuestions(data.questions || []);
                setAnswers(data.answers || {});
                setTabCount(data.tabCount || 0);
            }
        }
    }["PythonTest.useEffect"], []);
    /* ---------------- SAVE STATE ---------------- */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PythonTest.useEffect": ()=>{
            if (step === "test") {
                localStorage.setItem(STORAGE_KEY, JSON.stringify({
                    step,
                    timer,
                    questions,
                    answers,
                    tabCount
                }));
            }
        }
    }["PythonTest.useEffect"], [
        step,
        timer,
        questions,
        answers,
        tabCount
    ]);
    /* ---------------- AUTO SUBMIT HANDLER ---------------- */ const triggerAutoSubmit = (message)=>{
        if (submittedRef.current) return;
        submittedRef.current = true;
        setAutoSubmitReason(message);
        submitTest(true);
    };
    /* ---------------- SECURITY BLOCKS ---------------- */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PythonTest.useEffect": ()=>{
            if (step !== "test") return;
            const block = {
                "PythonTest.useEffect.block": (e)=>e.preventDefault()
            }["PythonTest.useEffect.block"];
            const blockKeys = {
                "PythonTest.useEffect.blockKeys": (e)=>{
                    const forbidden = e.key === "F12" || e.ctrlKey && e.shiftKey && [
                        "I",
                        "J",
                        "C"
                    ].includes(e.key) || e.ctrlKey && e.key === "U";
                    if (forbidden) {
                        triggerAutoSubmit("You violated the exam rules, so the Python test was automatically submitted. Kindly contact HR.");
                    }
                }
            }["PythonTest.useEffect.blockKeys"];
            document.addEventListener("contextmenu", block);
            document.addEventListener("copy", block);
            document.addEventListener("cut", block);
            document.addEventListener("paste", block);
            document.addEventListener("keydown", blockKeys);
            return ({
                "PythonTest.useEffect": ()=>{
                    document.removeEventListener("contextmenu", block);
                    document.removeEventListener("copy", block);
                    document.removeEventListener("cut", block);
                    document.removeEventListener("paste", block);
                    document.removeEventListener("keydown", blockKeys);
                }
            })["PythonTest.useEffect"];
        }
    }["PythonTest.useEffect"], [
        step
    ]);
    /* ---------------- QUESTIONS ---------------- */ const generateQuestions = ()=>{
        const shuffled = [
            ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$python$2d$questions$2e$json__$28$json$29$__["default"]
        ].sort(()=>0.5 - Math.random());
        setQuestions(shuffled.slice(0, 50));
    };
    /* ---------------- AUTO START ---------------- */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PythonTest.useEffect": ()=>{
            if (router.query.start === "true") {
                generateQuestions();
                setStep("test");
            }
        }
    }["PythonTest.useEffect"], [
        router.query.start
    ]);
    /* ---------------- TIMER ---------------- */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PythonTest.useEffect": ()=>{
            if (step !== "test") return;
            const interval = setInterval({
                "PythonTest.useEffect.interval": ()=>{
                    setTimer({
                        "PythonTest.useEffect.interval": (prev)=>{
                            if (prev <= 1) {
                                triggerAutoSubmit("The time is over, so the Python test was automatically submitted. Please contact HR for further details.");
                                clearInterval(interval);
                                return 0;
                            }
                            return prev - 1;
                        }
                    }["PythonTest.useEffect.interval"]);
                }
            }["PythonTest.useEffect.interval"], 1000);
            return ({
                "PythonTest.useEffect": ()=>clearInterval(interval)
            })["PythonTest.useEffect"];
        }
    }["PythonTest.useEffect"], [
        step
    ]);
    /* ---------------- TAB SWITCH ---------------- */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PythonTest.useEffect": ()=>{
            if (step !== "test") return;
            const handleVisibility = {
                "PythonTest.useEffect.handleVisibility": ()=>{
                    if (document.visibilityState === "hidden") {
                        setTabCount({
                            "PythonTest.useEffect.handleVisibility": (prev)=>{
                                const count = prev + 1;
                                if (count <= 2) {
                                    alert(`Warning ${count}/3: Tab switching is not allowed.`);
                                    return count;
                                }
                                triggerAutoSubmit("You violated the rules 3 times, so the Python test was submitted. Kindly contact HR.");
                                return count;
                            }
                        }["PythonTest.useEffect.handleVisibility"]);
                    }
                }
            }["PythonTest.useEffect.handleVisibility"];
            document.addEventListener("visibilitychange", handleVisibility);
            return ({
                "PythonTest.useEffect": ()=>document.removeEventListener("visibilitychange", handleVisibility)
            })["PythonTest.useEffect"];
        }
    }["PythonTest.useEffect"], [
        step
    ]);
    /* ---------------- SUBMIT ---------------- */ const submitTest = (forced = false)=>{
        if (!forced && Object.keys(answers).length < 50) {
            alert("Please answer all 50 questions before submitting.");
            return;
        }
        localStorage.removeItem(STORAGE_KEY);
        setStep("submitted");
    };
    /* ---------------- TIME FORMAT ---------------- */ const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
    const seconds = String(timer % 60).padStart(2, "0");
    /* ---------------- SUBMITTED ---------------- */ if (step === "submitted") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CenteredCard, {
            title: "Python Test Submitted",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-center text-red-600 font-semibold mb-6",
                    children: autoSubmitReason || "Your Python test was successfully submitted."
                }, void 0, false, {
                    fileName: "[project]/pages/test/python.js",
                    lineNumber: 166,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>router.push("/"),
                    className: "w-full bg-blue-600 text-white py-2 rounded-lg font-semibold",
                    children: "OK"
                }, void 0, false, {
                    fileName: "[project]/pages/test/python.js",
                    lineNumber: 171,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/pages/test/python.js",
            lineNumber: 165,
            columnNumber: 7
        }, this);
    }
    /* ---------------- INSTRUCTIONS ---------------- */ if (step === "instructions") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CenteredCard, {
            title: "Python Test Instructions",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Instruction, {
                    children: "50 questions – all mandatory"
                }, void 0, false, {
                    fileName: "[project]/pages/test/python.js",
                    lineNumber: 185,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Instruction, {
                    children: "Time limit: 20 minutes"
                }, void 0, false, {
                    fileName: "[project]/pages/test/python.js",
                    lineNumber: 186,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Instruction, {
                    children: "No tab switch / copy / inspect"
                }, void 0, false, {
                    fileName: "[project]/pages/test/python.js",
                    lineNumber: 187,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Instruction, {
                    children: "Violations → auto submit"
                }, void 0, false, {
                    fileName: "[project]/pages/test/python.js",
                    lineNumber: 188,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PrimaryButton, {
                    className: "mt-6",
                    onClick: ()=>window.open("/test/python?start=true", "_blank"),
                    children: "Start Python Test"
                }, void 0, false, {
                    fileName: "[project]/pages/test/python.js",
                    lineNumber: 190,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/pages/test/python.js",
            lineNumber: 184,
            columnNumber: 7
        }, this);
    }
    /* ---------------- LOGIN ---------------- */ if (step === "login") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CenteredCard, {
            title: "Python Online Assessment",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: (e)=>{
                    e.preventDefault();
                    setStep("instructions");
                },
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Input, {
                        placeholder: "Full Name"
                    }, void 0, false, {
                        fileName: "[project]/pages/test/python.js",
                        lineNumber: 213,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Input, {
                        placeholder: "Email ID"
                    }, void 0, false, {
                        fileName: "[project]/pages/test/python.js",
                        lineNumber: 214,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Input, {
                        placeholder: "Mobile Number"
                    }, void 0, false, {
                        fileName: "[project]/pages/test/python.js",
                        lineNumber: 215,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Input, {
                        placeholder: "College / Company"
                    }, void 0, false, {
                        fileName: "[project]/pages/test/python.js",
                        lineNumber: 216,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PrimaryButton, {
                        children: "Proceed"
                    }, void 0, false, {
                        fileName: "[project]/pages/test/python.js",
                        lineNumber: 217,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/test/python.js",
                lineNumber: 206,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/pages/test/python.js",
            lineNumber: 205,
            columnNumber: 7
        }, this);
    }
    /* ---------------- TEST PAGE ---------------- */ return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-100 px-3 py-4 select-none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sticky top-0 bg-white shadow rounded-xl px-4 py-3 flex justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-bold",
                        children: "Python Test"
                    }, void 0, false, {
                        fileName: "[project]/pages/test/python.js",
                        lineNumber: 227,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-bold text-red-600",
                        children: [
                            "⏱ ",
                            minutes,
                            ":",
                            seconds
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/test/python.js",
                        lineNumber: 228,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/test/python.js",
                lineNumber: 226,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-3xl mx-auto mt-4",
                children: [
                    questions.map((q, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-4 rounded-xl shadow mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-semibold mb-3",
                                    children: [
                                        i + 1,
                                        ". ",
                                        q.question
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/test/python.js",
                                    lineNumber: 236,
                                    columnNumber: 13
                                }, this),
                                q.options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setAnswers((p)=>({
                                                    ...p,
                                                    [q.id]: opt
                                                })),
                                        className: `w-full text-left px-4 py-2 mb-2 rounded border ${answers[q.id] === opt ? "bg-blue-600 text-white" : "bg-white"}`,
                                        children: opt
                                    }, opt, false, {
                                        fileName: "[project]/pages/test/python.js",
                                        lineNumber: 240,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, q.id, true, {
                            fileName: "[project]/pages/test/python.js",
                            lineNumber: 235,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>submitTest(),
                        className: "w-full bg-green-600 text-white py-3 rounded-xl font-bold",
                        children: "Submit Python Test"
                    }, void 0, false, {
                        fileName: "[project]/pages/test/python.js",
                        lineNumber: 257,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/test/python.js",
                lineNumber: 233,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/test/python.js",
        lineNumber: 225,
        columnNumber: 5
    }, this);
}
_s(PythonTest, "lPIIBlBXcwHaIUNaNE3xyXw25V4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = PythonTest;
/* ---------------- UI HELPERS ---------------- */ const CenteredCard = ({ title, children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex items-center justify-center bg-gray-100 px-3",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white p-6 rounded-2xl shadow w-full max-w-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-xl font-bold text-center mb-5",
                    children: title
                }, void 0, false, {
                    fileName: "[project]/pages/test/python.js",
                    lineNumber: 273,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                children
            ]
        }, void 0, true, {
            fileName: "[project]/pages/test/python.js",
            lineNumber: 272,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/pages/test/python.js",
        lineNumber: 271,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c1 = CenteredCard;
const Input = ({ placeholder })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        required: true,
        placeholder: placeholder,
        className: "w-full border px-3 py-2 rounded-lg"
    }, void 0, false, {
        fileName: "[project]/pages/test/python.js",
        lineNumber: 280,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c2 = Input;
const PrimaryButton = ({ children, onClick, className = "" })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        className: `w-full bg-blue-600 text-white py-2 rounded-lg font-semibold ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/pages/test/python.js",
        lineNumber: 288,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c3 = PrimaryButton;
const Instruction = ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: "text-sm text-gray-700 mb-2",
        children: [
            "• ",
            children
        ]
    }, void 0, true, {
        fileName: "[project]/pages/test/python.js",
        lineNumber: 297,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c4 = Instruction;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "PythonTest");
__turbopack_context__.k.register(_c1, "CenteredCard");
__turbopack_context__.k.register(_c2, "Input");
__turbopack_context__.k.register(_c3, "PrimaryButton");
__turbopack_context__.k.register(_c4, "Instruction");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/test/python.js [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/test/python";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/test/python.js [client] (ecmascript)");
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
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/pages/test/python.js\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/test/python.js [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__d612ce5b._.js.map