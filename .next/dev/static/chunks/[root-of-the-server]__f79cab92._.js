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
"[project]/pages/test/pythonQuestions.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "pythonQuestions",
    ()=>pythonQuestions
]);
const pythonQuestions = [
    {
        id: 1,
        question: "Which Python data type is ordered and immutable?",
        options: [
            "list",
            "dict",
            "tuple",
            "set"
        ],
        correct: "tuple"
    },
    {
        id: 2,
        question: "What will be the output of print(2 ** 3 ** 2)?",
        options: [
            "64",
            "512",
            "16",
            "8"
        ],
        correct: "512"
    },
    {
        id: 3,
        question: "Which of these creates a dictionary?",
        options: [
            "{1, 2, 3}",
            "[1, 2, 3]",
            "(1, 2, 3)",
            "{'a': 1, 'b': 2}"
        ],
        correct: "{'a': 1, 'b': 2}"
    },
    {
        id: 4,
        question: "What does the pass statement do?",
        options: [
            "Skips to next iteration",
            "Exits the loop",
            "Does nothing (placeholder)",
            "Raises NotImplementedError"
        ],
        correct: "Does nothing (placeholder)"
    },
    {
        id: 5,
        question: "Which module provides support for mathematical functions?",
        options: [
            "math",
            "random",
            "statistics",
            "datetime"
        ],
        correct: "math"
    },
    {
        id: 6,
        question: 'What is the output of print("Hello" + 3)?',
        options: [
            "Hello3",
            "HelloHelloHello",
            "Error",
            "None"
        ],
        correct: "Error"
    },
    {
        id: 7,
        question: "Which is used to handle exceptions?",
        options: [
            "try/except",
            "catch/throw",
            "Both a and b",
            "error/handle"
        ],
        correct: "try/except"
    },
    {
        id: 8,
        question: "What does range(1, 10, 2) generate?",
        options: [
            "[1, 3, 5, 7, 9]",
            "[1, 2, 3, 4, 5, 6, 7, 8, 9]",
            "[2, 4, 6, 8, 10]",
            "[2, 4, 6, 8]"
        ],
        correct: "[1, 3, 5, 7, 9]"
    },
    {
        id: 9,
        question: "What is the purpose of yield keyword?",
        options: [
            "Returns value from function",
            "Creates generator function",
            "Both a and b",
            "Stops iteration"
        ],
        correct: "Creates generator function"
    },
    {
        id: 10,
        question: "Which decorator is used for class methods?",
        options: [
            "@staticmethod",
            "@classmethod",
            "@property",
            "@setter"
        ],
        correct: "@classmethod"
    },
    {
        id: 11,
        question: "What does sys.argv contain?",
        options: [
            "Command line arguments",
            "Environment variables",
            "Python path",
            "Python shell"
        ],
        correct: "Command line arguments"
    },
    {
        id: 12,
        question: "Which is not a valid string method?",
        options: [
            "split()",
            "join()",
            "merge()",
            "strip()"
        ],
        correct: "merge()"
    },
    {
        id: 13,
        question: "What is __str__ method used for?",
        options: [
            "String representation of object",
            "Object initialization",
            "Object deletion",
            "Memory allocation"
        ],
        correct: "String representation of object"
    },
    {
        id: 14,
        question: "Which collection removes duplicates?",
        options: [
            "list",
            "tuple",
            "dict",
            "set"
        ],
        correct: "set"
    },
    {
        id: 15,
        question: "What does zip() function do?",
        options: [
            "Compresses files",
            "Combines multiple iterables",
            "Creates backup",
            "Restores backup"
        ],
        correct: "Combines multiple iterables"
    },
    {
        id: 16,
        question: "Which is true about Python?",
        options: [
            "Dynamically typed",
            "Statically typed",
            "Compiled language",
            "Low-level language"
        ],
        correct: "Dynamically typed"
    },
    {
        id: 17,
        question: "What is a lambda function?",
        options: [
            "Anonymous function",
            "Named function",
            "Generator function",
            "Coroutine function"
        ],
        correct: "Anonymous function"
    },
    {
        id: 18,
        question: "Which imports all from a module?",
        options: [
            "import module",
            "import module as alias",
            "import * from module",
            "from module import *"
        ],
        correct: "from module import *"
    },
    {
        id: 19,
        question: "What does frozenset() create?",
        options: [
            "Mutable set",
            "Immutable set",
            "Frozen list",
            "Immutable tuple"
        ],
        correct: "Immutable set"
    },
    {
        id: 20,
        question: "Which operator checks identity?",
        options: [
            "==",
            "is",
            "in",
            "not in"
        ],
        correct: "is"
    },
    {
        id: 21,
        question: "Which is used for file reading?",
        options: [
            "open('file.txt', 'r')",
            "open('file.txt', 'w')",
            "open('file.txt', 'a')",
            "read('file.txt')"
        ],
        correct: "open('file.txt', 'r')"
    },
    {
        id: 22,
        question: "What is pickle used for?",
        options: [
            "Object serialization",
            "File compression",
            "Data encryption",
            "Data hashing"
        ],
        correct: "Object serialization"
    },
    {
        id: 23,
        question: "Which creates a virtual environment?",
        options: [
            "venv",
            "virtualenv",
            "pipenv",
            "All of the above"
        ],
        correct: "All of the above"
    },
    {
        id: 24,
        question: "What does globals() return?",
        options: [
            "Local variables",
            "Global variables",
            "Built-in functions",
            "Modules"
        ],
        correct: "Global variables"
    },
    {
        id: 25,
        question: "What does @property decorator do?",
        options: [
            "Creates getter method",
            "Creates setter method",
            "Creates deleter method",
            "All of the above"
        ],
        correct: "All of the above"
    },
    {
        id: 26,
        question: "Which is true about Python's GIL?",
        options: [
            "Global Interpreter Lock",
            "Allows multiple threads",
            "Prevents true parallelism",
            "Both a and c"
        ],
        correct: "Both a and c"
    },
    {
        id: 27,
        question: "What is the MRO in Python?",
        options: [
            "Method Resolution Order",
            "Multiple Return Option",
            "Method Reference Object",
            "Function Reference Object"
        ],
        correct: "Method Resolution Order"
    },
    {
        id: 28,
        question: "Which is used for asynchronous programming?",
        options: [
            "async/await",
            "yield from",
            "threading",
            "multiprocessing"
        ],
        correct: "async/await"
    },
    {
        id: 29,
        question: "What does collections.namedtuple provide?",
        options: [
            "Tuple with named fields",
            "Named dictionary",
            "Named list",
            "Deque"
        ],
        correct: "Tuple with named fields"
    },
    {
        id: 30,
        question: "Which is a context manager?",
        options: [
            "with statement",
            "try statement",
            "if statement",
            "switch statement"
        ],
        correct: "with statement"
    },
    {
        id: 31,
        question: "What is __name__ attribute?",
        options: [
            "Module name",
            "Class name",
            "Function name",
            "All of the above"
        ],
        correct: "All of the above"
    },
    {
        id: 32,
        question: "Which is used for type hints?",
        options: [
            "typing module",
            "type()",
            "isinstance()",
            "cast()"
        ],
        correct: "typing module"
    },
    {
        id: 33,
        question: "What does itertools module provide?",
        options: [
            "Iterators for efficient looping",
            "Mathematical functions",
            "Statistical functions",
            "String functions"
        ],
        correct: "Iterators for efficient looping"
    },
    {
        id: 34,
        question: "Which creates a shallow copy?",
        options: [
            "copy.copy()",
            "copy.deepcopy()",
            "clone()",
            "assign()"
        ],
        correct: "copy.copy()"
    },
    {
        id: 35,
        question: "What is the Walrus operator?",
        options: [
            ":=",
            "==",
            "=",
            "!="
        ],
        correct: ":="
    },
    {
        id: 36,
        question: "Which is used for testing?",
        options: [
            "unittest",
            "pytest",
            "doctest",
            "All of the above"
        ],
        correct: "All of the above"
    },
    {
        id: 37,
        question: "What does __slots__ do?",
        options: [
            "Prevents dynamic attribute creation",
            "Improves memory usage",
            "Restricts attributes",
            "Both a and b"
        ],
        correct: "Both a and b"
    },
    {
        id: 38,
        question: "Which is a metaclass?",
        options: [
            "type",
            "object",
            "class",
            "meta"
        ],
        correct: "type"
    },
    {
        id: 39,
        question: "What does __call__ method do?",
        options: [
            "Makes object callable",
            "Calls function",
            "Invokes constructor",
            "Initializes object"
        ],
        correct: "Makes object callable"
    },
    {
        id: 40,
        question: "Which is used for data classes?",
        options: [
            "@dataclass",
            "dataclasses module",
            "collections module",
            "Both a and b"
        ],
        correct: "Both a and b"
    },
    {
        id: 41,
        question: "Which HTML5 element defines navigation links?",
        options: [
            "<nav>",
            "<navigation>",
            "<links>",
            "<iframe>"
        ],
        correct: "<nav>"
    },
    {
        id: 42,
        question: "What does the required attribute do?",
        options: [
            "Makes input mandatory",
            "Sets default value",
            "Validates input",
            "Sanitizes form"
        ],
        correct: "Makes input mandatory"
    },
    {
        id: 43,
        question: "Which creates a dropdown list?",
        options: [
            "<input type='dropdown'>",
            "<select>",
            "<dropdown>",
            "<list>"
        ],
        correct: "<select>"
    },
    {
        id: 44,
        question: "What is the purpose of <meta charset='UTF-8'>?",
        options: [
            "Sets character encoding",
            "Defines metadata",
            "Sets viewport",
            "Loads script"
        ],
        correct: "Sets character encoding"
    },
    {
        id: 45,
        question: "Which tag defines a footer?",
        options: [
            "<footer>",
            "<bottom>",
            "<end>",
            "<section>"
        ],
        correct: "<footer>"
    },
    {
        id: 46,
        question: "What does defer attribute do in script tag?",
        options: [
            "Delays script execution",
            "Executes after HTML parsing",
            "Executes immediately",
            "Blocks rendering"
        ],
        correct: "Executes after HTML parsing"
    },
    {
        id: 47,
        question: "Which creates a text input field?",
        options: [
            "<input type='text'>",
            "<textfield>",
            "<textarea>",
            "<text>"
        ],
        correct: "<input type='text'>"
    },
    {
        id: 48,
        question: "What is the purpose of ARIA attributes?",
        options: [
            "Accessibility for screen readers",
            "Animation effects",
            "Responsive design",
            "Transforms elements"
        ],
        correct: "Accessibility for screen readers"
    },
    {
        id: 49,
        question: "Which tag defines a section?",
        options: [
            "<section>",
            "<div>",
            "<article>",
            "<strong>"
        ],
        correct: "<section>"
    },
    {
        id: 50,
        question: "Which tag defines an article?",
        options: [
            "<article>",
            "<section>",
            "<div>",
            "<span>"
        ],
        correct: "<article>"
    },
    {
        id: 51,
        question: "What does async attribute do?",
        options: [
            "Loads script asynchronously",
            "Delays execution",
            "Blocks parsing",
            "Supports CORS"
        ],
        correct: "Loads script asynchronously"
    },
    {
        id: 52,
        question: "Which is a valid HTML5 doctype?",
        options: [
            "<!DOCTYPE html>",
            "<!DOCTYPE HTML5>",
            "<!DOCTYPE html5>",
            "<figcaption>"
        ],
        correct: "<!DOCTYPE html>"
    },
    {
        id: 53,
        question: "What does <datalist> element provide?",
        options: [
            "Predefined options for input",
            "Data table",
            "List of links",
            "Local storage"
        ],
        correct: "Predefined options for input"
    },
    {
        id: 54,
        question: "Which creates a progress bar?",
        options: [
            "<progress>",
            "<meter>",
            "<bar>",
            "<input type='time'>"
        ],
        correct: "<progress>"
    },
    {
        id: 55,
        question: "What is <canvas> used for?",
        options: [
            "Drawing graphics via JavaScript",
            "Displaying images",
            "Creating animations",
            "All of the above"
        ],
        correct: "All of the above"
    },
    {
        id: 56,
        question: "Which tag defines important text?",
        options: [
            "<strong>",
            "<b>",
            "<em>",
            "<video>"
        ],
        correct: "<strong>"
    },
    {
        id: 57,
        question: "What does sandbox attribute do in iframe?",
        options: [
            "Restricts iframe capabilities",
            "Allows all features",
            "Enables cross-origin",
            "Flexible box layout"
        ],
        correct: "Restricts iframe capabilities"
    },
    {
        id: 58,
        question: "Which is a semantic HTML element?",
        options: [
            "<main>",
            "<aside>",
            "<figure>",
            "querySelector()"
        ],
        correct: "<main>"
    },
    {
        id: 59,
        question: "What is web storage?",
        options: [
            "localStorage",
            "sessionStorage",
            "Cookies",
            "Both a and b"
        ],
        correct: "Both a and b"
    },
    {
        id: 60,
        question: "Which creates a date picker?",
        options: [
            "<input type='date'>",
            "<input type='calendar'>",
            "<input type='datetime'>",
            "<section>"
        ],
        correct: "<input type='date'>"
    },
    {
        id: 61,
        question: "What does manifest attribute do?",
        options: [
            "Defines web app manifest",
            "Caches files for offline",
            "Loads manifest file",
            "Deferred script"
        ],
        correct: "Defines web app manifest"
    },
    {
        id: 62,
        question: "Which is used for video?",
        options: [
            "<video>",
            "<media>",
            "<movie>",
            "<input type='color'>"
        ],
        correct: "<video>"
    },
    {
        id: 63,
        question: "What is a viewport meta tag?",
        options: [
            "<meta name='viewport'>",
            "Controls mobile display",
            "Sets responsive design",
            "All of the above"
        ],
        correct: "All of the above"
    },
    {
        id: 64,
        question: "Which creates a search field?",
        options: [
            "<input type='search'>",
            "<search>",
            "<find>",
            "<div>"
        ],
        correct: "<input type='search'>"
    },
    {
        id: 65,
        question: "What does preload do?",
        options: [
            "Loads resources early",
            "Prefetches content",
            "Both a and b",
            "Vector images"
        ],
        correct: "Loads resources early"
    },
    {
        id: 66,
        question: "Which is a block-level element?",
        options: [
            "<div>",
            "<span>",
            "<a>",
            "text-align"
        ],
        correct: "<div>"
    },
    {
        id: 67,
        question: "What is the purpose of <noscript>?",
        options: [
            "Content for non-JS browsers",
            "Alternative script",
            "Hides element",
            "Fallback CSS"
        ],
        correct: "Content for non-JS browsers"
    },
    {
        id: 68,
        question: "Which creates a color picker?",
        options: [
            "<input type='color'>",
            "<colorpicker>",
            "<input type='picker'>",
            "Sass"
        ],
        correct: "<input type='color'>"
    },
    {
        id: 69,
        question: "What does download attribute do?",
        options: [
            "Makes link download file",
            "Downloads automatically",
            "Forces save dialog",
            "None of the above"
        ],
        correct: "Makes link download file"
    },
    {
        id: 70,
        question: "Which is an inline element?",
        options: [
            "<span>",
            "<div>",
            "<p>",
            "bg-color"
        ],
        correct: "<span>"
    },
    {
        id: 71,
        question: "What is SVG?",
        options: [
            "Scalable Vector Graphics",
            "XML-based vector images",
            "Both a and b",
            "Fixed graphics"
        ],
        correct: "Both a and b"
    },
    {
        id: 72,
        question: "Which property controls text alignment?",
        options: [
            "text-align",
            "align-text",
            "text-justify",
            "@function"
        ],
        correct: "text-align"
    },
    {
        id: 73,
        question: "What does display: none; do?",
        options: [
            "Hides element completely",
            "Makes invisible but takes space",
            "Collapses element",
            "flex-direction"
        ],
        correct: "Hides element completely"
    },
    {
        id: 74,
        question: "Which is a CSS preprocessor?",
        options: [
            "Sass",
            "Less",
            "Stylus",
            "All of the above"
        ],
        correct: "All of the above"
    },
    {
        id: 75,
        question: "What is the CSS specificity hierarchy?",
        options: [
            "Inline > ID > Class > Element",
            "ID > Class > Element > Inline",
            "Element > Class > ID > Inline",
            "None of the above"
        ],
        correct: "Inline > ID > Class > Element"
    },
    {
        id: 76,
        question: "Which creates a gradient background?",
        options: [
            "background: linear-gradient();",
            "gradient: linear();",
            "bg-gradient: linear",
            "None of the above"
        ],
        correct: "background: linear-gradient();"
    },
    {
        id: 77,
        question: "What does position: sticky; do?",
        options: [
            "Sticks to viewport when scrolling",
            "Fixed positioning",
            "Relative until threshold",
            "Both a and c"
        ],
        correct: "Both a and c"
    },
    {
        id: 78,
        question: "Which is a CSS custom property?",
        options: [
            "--variable-name",
            "var-name",
            "@variable",
            "box-shadow"
        ],
        correct: "--variable-name"
    },
    {
        id: 79,
        question: "What is flex-direction?",
        options: [
            "Controls flex item direction",
            "row, column, row-reverse, column-reverse",
            "Both a and b",
            "Clear property"
        ],
        correct: "Both a and b"
    },
    {
        id: 80,
        question: "Which creates animation?",
        options: [
            "@keyframes",
            "animation property",
            "Both a and b",
            "grid-template"
        ],
        correct: "Both a and b"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/pages/test/python.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PythonTest
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$test$2f$pythonQuestions$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/pages/test/pythonQuestions.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const STORAGE_KEY = "python_test_state_v2";
function PythonTest() {
    _s();
    /* ---------------- STATES ---------------- */ const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("login"); // login | instructions | test | submitted
    const [timer, setTimer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(20 * 60);
    const [questions, setQuestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [answers, setAnswers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [tabViolated, setTabViolated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    /* ---------------- LOAD SAVED STATE ---------------- */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PythonTest.useEffect": ()=>{
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const data = JSON.parse(saved);
                setStep(data.step);
                setTimer(data.timer);
                setQuestions(data.questions || []);
                setAnswers(data.answers || {});
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
                    answers
                }));
            }
        }
    }["PythonTest.useEffect"], [
        step,
        timer,
        questions,
        answers
    ]);
    /* ---------------- RANDOM 50 QUESTIONS ---------------- */ const generateQuestions = ()=>{
        const shuffled = [
            ...__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$test$2f$pythonQuestions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["pythonQuestions"]
        ].sort(()=>0.5 - Math.random());
        setQuestions(shuffled.slice(0, 50));
    };
    /* ---------------- TIMER ---------------- */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PythonTest.useEffect": ()=>{
            if (step !== "test") return;
            const interval = setInterval({
                "PythonTest.useEffect.interval": ()=>{
                    setTimer({
                        "PythonTest.useEffect.interval": (prev)=>{
                            if (prev <= 1) {
                                submitTest(true);
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
    /* ---------------- SECURITY ---------------- */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PythonTest.useEffect": ()=>{
            if (step !== "test") return;
            const block = {
                "PythonTest.useEffect.block": (e)=>e.preventDefault()
            }["PythonTest.useEffect.block"];
            document.addEventListener("copy", block);
            document.addEventListener("paste", block);
            document.addEventListener("contextmenu", block);
            const visibilityHandler = {
                "PythonTest.useEffect.visibilityHandler": ()=>{
                    if (document.hidden && !tabViolated) {
                        setTabViolated(true);
                        alert("Tab switching is not allowed. Test will be submitted.");
                        submitTest(true);
                    }
                }
            }["PythonTest.useEffect.visibilityHandler"];
            document.addEventListener("visibilitychange", visibilityHandler);
            return ({
                "PythonTest.useEffect": ()=>{
                    document.removeEventListener("copy", block);
                    document.removeEventListener("paste", block);
                    document.removeEventListener("contextmenu", block);
                    document.removeEventListener("visibilitychange", visibilityHandler);
                }
            })["PythonTest.useEffect"];
        }
    }["PythonTest.useEffect"], [
        step,
        tabViolated
    ]);
    /* ---------------- SUBMIT ---------------- */ const submitTest = (forced = false)=>{
        if (!forced && Object.keys(answers).length < 50) {
            alert("Please answer all 50 questions.");
            return;
        }
        localStorage.removeItem(STORAGE_KEY);
        setStep("submitted");
    };
    /* ---------------- TIMER FORMAT ---------------- */ const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
    const seconds = String(timer % 60).padStart(2, "0");
    /* ---------------- LOGIN PAGE ---------------- */ if (step === "login") {
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
                        lineNumber: 114,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Input, {
                        placeholder: "Email ID"
                    }, void 0, false, {
                        fileName: "[project]/pages/test/python.js",
                        lineNumber: 115,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Input, {
                        placeholder: "Mobile Number"
                    }, void 0, false, {
                        fileName: "[project]/pages/test/python.js",
                        lineNumber: 116,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Input, {
                        placeholder: "College / Company"
                    }, void 0, false, {
                        fileName: "[project]/pages/test/python.js",
                        lineNumber: 117,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PrimaryButton, {
                        children: "Proceed to Instructions"
                    }, void 0, false, {
                        fileName: "[project]/pages/test/python.js",
                        lineNumber: 118,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/test/python.js",
                lineNumber: 107,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/pages/test/python.js",
            lineNumber: 106,
            columnNumber: 7
        }, this);
    }
    /* ---------------- INSTRUCTIONS PAGE ---------------- */ if (step === "instructions") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CenteredCard, {
            title: "Test Instructions",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3 text-sm text-gray-700",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Instruction, {
                            children: "50 questions – all mandatory"
                        }, void 0, false, {
                            fileName: "[project]/pages/test/python.js",
                            lineNumber: 129,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Instruction, {
                            children: "Time limit: 20 minutes"
                        }, void 0, false, {
                            fileName: "[project]/pages/test/python.js",
                            lineNumber: 130,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Instruction, {
                            children: "No copy, paste or right click"
                        }, void 0, false, {
                            fileName: "[project]/pages/test/python.js",
                            lineNumber: 131,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Instruction, {
                            children: "No tab switching"
                        }, void 0, false, {
                            fileName: "[project]/pages/test/python.js",
                            lineNumber: 132,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Instruction, {
                            children: "Auto submit on timeout"
                        }, void 0, false, {
                            fileName: "[project]/pages/test/python.js",
                            lineNumber: 133,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/test/python.js",
                    lineNumber: 128,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PrimaryButton, {
                    className: "mt-6",
                    onClick: ()=>{
                        if (!questions.length) generateQuestions();
                        setStep("test");
                    },
                    children: "Start Test"
                }, void 0, false, {
                    fileName: "[project]/pages/test/python.js",
                    lineNumber: 136,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/pages/test/python.js",
            lineNumber: 127,
            columnNumber: 7
        }, this);
    }
    /* ---------------- TEST PAGE ---------------- */ if (step === "test") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gray-100 px-3 py-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "sticky top-0 z-10 bg-white rounded-xl shadow flex justify-between px-4 py-3 mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "font-bold text-lg",
                            children: "Python Test"
                        }, void 0, false, {
                            fileName: "[project]/pages/test/python.js",
                            lineNumber: 155,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "px-4 py-1 rounded-full bg-red-100 text-red-600 font-bold",
                            children: [
                                "⏱ ",
                                minutes,
                                ":",
                                seconds
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/test/python.js",
                            lineNumber: 156,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/test/python.js",
                    lineNumber: 154,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-3xl mx-auto",
                    children: [
                        questions.map((q, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white p-5 rounded-xl shadow mb-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold mb-4",
                                        children: [
                                            i + 1,
                                            ". ",
                                            q.question
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/test/python.js",
                                        lineNumber: 168,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid gap-3",
                                        children: q.options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setAnswers((prev)=>({
                                                            ...prev,
                                                            [q.id]: opt
                                                        })),
                                                className: `w-full text-left px-4 py-3 rounded-lg border transition ${answers[q.id] === opt ? "bg-blue-600 text-white border-blue-600" : "bg-white border-gray-300 hover:bg-blue-50"}`,
                                                children: opt
                                            }, opt, false, {
                                                fileName: "[project]/pages/test/python.js",
                                                lineNumber: 174,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/pages/test/python.js",
                                        lineNumber: 172,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, q.id, true, {
                                fileName: "[project]/pages/test/python.js",
                                lineNumber: 164,
                                columnNumber: 13
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>submitTest(),
                            className: "w-full bg-green-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-green-700",
                            children: "Submit Test"
                        }, void 0, false, {
                            fileName: "[project]/pages/test/python.js",
                            lineNumber: 197,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/test/python.js",
                    lineNumber: 162,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/pages/test/python.js",
            lineNumber: 152,
            columnNumber: 7
        }, this);
    }
    /* ---------------- SUBMITTED ---------------- */ return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CenteredCard, {
        title: "Test Submitted 🎉",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-center text-gray-600",
            children: "Thank you for attending the Python assessment."
        }, void 0, false, {
            fileName: "[project]/pages/test/python.js",
            lineNumber: 211,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/pages/test/python.js",
        lineNumber: 210,
        columnNumber: 5
    }, this);
}
_s(PythonTest, "y6u/+ZOegwkO9RE3g3xjvYSGYEg=");
_c = PythonTest;
/* ---------------- UI COMPONENTS ---------------- */ const CenteredCard = ({ title, children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex items-center justify-center bg-gray-100 px-3",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white p-6 rounded-2xl shadow w-full max-w-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-xl font-bold text-center mb-5",
                    children: title
                }, void 0, false, {
                    fileName: "[project]/pages/test/python.js",
                    lineNumber: 223,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                children
            ]
        }, void 0, true, {
            fileName: "[project]/pages/test/python.js",
            lineNumber: 222,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/pages/test/python.js",
        lineNumber: 221,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c1 = CenteredCard;
const Input = ({ placeholder })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        required: true,
        placeholder: placeholder,
        className: "w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
    }, void 0, false, {
        fileName: "[project]/pages/test/python.js",
        lineNumber: 230,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c2 = Input;
const PrimaryButton = ({ children, onClick, className = "" })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        className: `w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/pages/test/python.js",
        lineNumber: 238,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c3 = PrimaryButton;
const Instruction = ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-blue-600 font-bold",
                children: "•"
            }, void 0, false, {
                fileName: "[project]/pages/test/python.js",
                lineNumber: 248,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: children
            }, void 0, false, {
                fileName: "[project]/pages/test/python.js",
                lineNumber: 249,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/pages/test/python.js",
        lineNumber: 247,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__f79cab92._.js.map