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
"[project]/data/aptitude-questions.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("[{\"id\":1,\"question\":\"If APPLE is coded as ELPPA, then MANGO is coded as:\",\"options\":[\"OGNAM\",\"OGMAN\",\"ANGOM\",\"GNOMA\"],\"answer\":\"OGNAM\"},{\"id\":2,\"question\":\"Which number will replace the question mark? 4, 9, 16, 25, ?\",\"options\":[\"30\",\"36\",\"49\",\"64\"],\"answer\":\"36\"},{\"id\":3,\"question\":\"A is taller than B but shorter than C. D is taller than C. Who is the shortest?\",\"options\":[\"A\",\"B\",\"C\",\"D\"],\"answer\":\"B\"},{\"id\":4,\"question\":\"Find the odd one out.\",\"options\":[\"Triangle\",\"Square\",\"Rectangle\",\"Circle\"],\"answer\":\"Circle\"},{\"id\":5,\"question\":\"If CLOCK is written as KCOLC, how is WATCH written?\",\"options\":[\"HCTAW\",\"HCATW\",\"WTAHC\",\"TCAWH\"],\"answer\":\"HCTAW\"},{\"id\":6,\"question\":\"In a certain code, TRAIN = USBJO. What is PLANE?\",\"options\":[\"QMBOF\",\"QMBOF\",\"QNBOF\",\"QMBPE\"],\"answer\":\"QMBOF\"},{\"id\":7,\"question\":\"Statements: All pens are books. Some books are papers. Conclusion: I. Some pens are papers II. All books are pens\",\"options\":[\"Only I\",\"Only II\",\"Both\",\"Neither\"],\"answer\":\"Neither\"},{\"id\":8,\"question\":\"Find the missing number: 7, 14, 28, 56, ?\",\"options\":[\"84\",\"98\",\"112\",\"126\"],\"answer\":\"112\"},{\"id\":9,\"question\":\"If SISTER is related to BROTHER, then DAUGHTER is related to:\",\"options\":[\"Uncle\",\"Father\",\"Son\",\"Mother\"],\"answer\":\"Son\"},{\"id\":10,\"question\":\"Pointing to a man, a woman said, 'His mother is my mother's only daughter.' Who is the man?\",\"options\":[\"Son\",\"Brother\",\"Nephew\",\"Cousin\"],\"answer\":\"Son\"},{\"id\":11,\"question\":\"Find the next term: 1, 4, 9, 16, 25, ?\",\"options\":[\"30\",\"36\",\"49\",\"64\"],\"answer\":\"36\"},{\"id\":12,\"question\":\"If DELHI → EDLHI, then MUMBAI →\",\"options\":[\"UMMAIB\",\"UMMBAI\",\"UMBAIM\",\"UMBMAI\"],\"answer\":\"UMMBAI\"},{\"id\":13,\"question\":\"If today is Monday, what day will it be after 61 days?\",\"options\":[\"Wednesday\",\"Friday\",\"Saturday\",\"Sunday\"],\"answer\":\"Friday\"},{\"id\":14,\"question\":\"Find the odd pair:\",\"options\":[\"(2, 4)\",\"(3, 9)\",\"(4, 16)\",\"(5, 20)\"],\"answer\":\"(5, 20)\"},{\"id\":15,\"question\":\"A is the brother of B. C is the sister of A. D is the mother of C. How is D related to B?\",\"options\":[\"Mother\",\"Aunt\",\"Sister\",\"Grandmother\"],\"answer\":\"Mother\"},{\"id\":16,\"question\":\"Which number will replace ? 8, 24, 12, 36, 18, ?\",\"options\":[\"48\",\"54\",\"60\",\"72\"],\"answer\":\"54\"},{\"id\":17,\"question\":\"If PENCIL is written as RGPEKN, then ERASER is:\",\"options\":[\"GTCUGT\",\"GTCTUG\",\"GTCUTG\",\"GUCTTG\"],\"answer\":\"GTCUGT\"},{\"id\":18,\"question\":\"If A + B means A is the son of B and A × B means A is the sister of B, then how is P related to Q in P × R + Q?\",\"options\":[\"Daughter\",\"Sister\",\"Niece\",\"Aunt\"],\"answer\":\"Niece\"},{\"id\":19,\"question\":\"Find the next number: 11, 22, 44, 88, ?\",\"options\":[\"154\",\"176\",\"166\",\"198\"],\"answer\":\"176\"},{\"id\":20,\"question\":\"Which word cannot be formed using letters of EXTRAORDINARY?\",\"options\":[\"EXTRA\",\"RAY\",\"DRAIN\",\"HAND\"],\"answer\":\"HAND\"},{\"id\":21,\"question\":\"Statements: All cups are plates. Some plates are bowls. Conclusions: I. Some cups are bowls II. Some bowls are plates\",\"options\":[\"Only I\",\"Only II\",\"Both\",\"Neither\"],\"answer\":\"Only II\"},{\"id\":22,\"question\":\"Find the missing term: AZ, CY, EX, ?\",\"options\":[\"GW\",\"FV\",\"HW\",\"GU\"],\"answer\":\"GW\"},{\"id\":23,\"question\":\"If MARCH is coded as NBSFI, how is APRIL coded?\",\"options\":[\"BQSJM\",\"BQTJM\",\"BQSIL\",\"BQTIL\"],\"answer\":\"BQSJM\"},{\"id\":24,\"question\":\"Which number does not belong?\",\"options\":[\"18\",\"27\",\"45\",\"54\"],\"answer\":\"27\"},{\"id\":25,\"question\":\"A man walks 10 m east, then 6 m south, then 10 m west. How far is he from the starting point?\",\"options\":[\"4 m\",\"6 m\",\"10 m\",\"16 m\"],\"answer\":\"6 m\"},{\"id\":26,\"question\":\"If TABLE → ELBAT, then CHAIR → ?\",\"options\":[\"RIAHC\",\"RCHIA\",\"IARCH\",\"HCAIR\"],\"answer\":\"RIAHC\"},{\"id\":27,\"question\":\"How many meaningful English words can be formed from the letters of DOG?\",\"options\":[\"1\",\"2\",\"3\",\"6\"],\"answer\":\"2\"},{\"id\":28,\"question\":\"Find missing number: 2, 6, 12, 20, 30, ?\",\"options\":[\"40\",\"42\",\"44\",\"48\"],\"answer\":\"42\"},{\"id\":29,\"question\":\"Which pair is different?\",\"options\":[\"(2, 6)\",\"(3, 12)\",\"(4, 20)\",\"(5, 30)\"],\"answer\":\"(5, 30)\"},{\"id\":30,\"question\":\"Pointing to a photograph, Ram said, 'She is the daughter of my father’s only son.' Who is she?\",\"options\":[\"Sister\",\"Daughter\",\"Cousin\",\"Niece\"],\"answer\":\"Daughter\"},{\"id\":31,\"question\":\"If the 5th day of a month is Friday, what day will the 20th be?\",\"options\":[\"Saturday\",\"Sunday\",\"Monday\",\"Tuesday\"],\"answer\":\"Monday\"},{\"id\":32,\"question\":\"Which word does not belong?\",\"options\":[\"Mercury\",\"Venus\",\"Earth\",\"Moon\"],\"answer\":\"Moon\"},{\"id\":33,\"question\":\"If 6 → 36, 7 → 49, then 8 → ?\",\"options\":[\"56\",\"64\",\"72\",\"81\"],\"answer\":\"64\"},{\"id\":34,\"question\":\"How many times do the hands of a clock coincide in 24 hours?\",\"options\":[\"22\",\"24\",\"44\",\"48\"],\"answer\":\"44\"},{\"id\":35,\"question\":\"Find the odd number:\",\"options\":[\"121\",\"144\",\"169\",\"196\"],\"answer\":\"144\"},{\"id\":36,\"question\":\"If A is brother of B, B is sister of C, C is father of D, then A is related to D as:\",\"options\":[\"Uncle\",\"Father\",\"Brother\",\"Cousin\"],\"answer\":\"Uncle\"},{\"id\":37,\"question\":\"Choose the incorrect pair:\",\"options\":[\"CPU – Computer\",\"Heart – Human\",\"Engine – Train\",\"Wheel – Road\"],\"answer\":\"Wheel – Road\"},{\"id\":38,\"question\":\"Which letter comes next? B, E, H, K, ?\",\"options\":[\"M\",\"N\",\"O\",\"P\"],\"answer\":\"N\"},{\"id\":39,\"question\":\"If BOOK → CPPL, then READ → ?\",\"options\":[\"SFBF\",\"SFBE\",\"SFEF\",\"TFBF\"],\"answer\":\"SFBF\"},{\"id\":40,\"question\":\"Find the missing term: 4, 9, 19, 39, ?\",\"options\":[\"59\",\"79\",\"69\",\"89\"],\"answer\":\"79\"},{\"id\":41,\"question\":\"Which conclusion follows? All roses are flowers. Some flowers are red.\",\"options\":[\"All roses are red\",\"Some roses are red\",\"Some flowers are roses\",\"None follows\"],\"answer\":\"Some flowers are roses\"},{\"id\":42,\"question\":\"Which number replaces the question mark? 1, 4, 9, 16, ?, 36\",\"options\":[\"20\",\"24\",\"25\",\"30\"],\"answer\":\"25\"},{\"id\":43,\"question\":\"If A # B means A is the mother of B and A @ B means A is the brother of B, then how is P related to Q in P @ R # Q?\",\"options\":[\"Uncle\",\"Brother\",\"Son\",\"Nephew\"],\"answer\":\"Uncle\"},{\"id\":44,\"question\":\"Find the next number: 1, 8, 27, 64, ?\",\"options\":[\"100\",\"121\",\"125\",\"216\"],\"answer\":\"125\"},{\"id\":45,\"question\":\"Which word does NOT belong to the group?\",\"options\":[\"Vein\",\"Artery\",\"Nerve\",\"Muscle\"],\"answer\":\"Muscle\"},{\"id\":46,\"question\":\"If COMPUTER is written as RFUVQNPC, then SCIENCE is written as:\",\"options\":[\"TGKEMEG\",\"TGKFMFG\",\"TGKEMFG\",\"THKEMFG\"],\"answer\":\"TGKEMFG\"},{\"id\":47,\"question\":\"Find the missing term: 2, 3, 6, 11, 18, ?\",\"options\":[\"27\",\"29\",\"30\",\"31\"],\"answer\":\"29\"},{\"id\":48,\"question\":\"Statements: All laptops are devices. No device is cheap. Conclusions: I. No laptop is cheap II. Some devices are laptops\",\"options\":[\"Only I\",\"Only II\",\"Both\",\"Neither\"],\"answer\":\"Only I\"},{\"id\":49,\"question\":\"In a row of 50 students, Ramesh is 17th from the left. What is his position from the right?\",\"options\":[\"32\",\"33\",\"34\",\"35\"],\"answer\":\"34\"},{\"id\":50,\"question\":\"A man walks 12 m north, then 5 m west, then 12 m south. How far is he from the starting point?\",\"options\":[\"5 m\",\"12 m\",\"17 m\",\"24 m\"],\"answer\":\"5 m\"},{\"id\":51,\"question\":\"Choose the odd pair:\",\"options\":[\"(4, 20)\",\"(5, 30)\",\"(6, 42)\",\"(7, 56)\"],\"answer\":\"(7, 56)\"},{\"id\":52,\"question\":\"If PAPER → RCRGT, then BOOK → ?\",\"options\":[\"DQQM\",\"DPPM\",\"CQQM\",\"DRRM\"],\"answer\":\"DQQM\"},{\"id\":53,\"question\":\"Find the next letter: A, C, F, J, O, ?\",\"options\":[\"T\",\"U\",\"V\",\"W\"],\"answer\":\"U\"},{\"id\":54,\"question\":\"Which number will replace the question mark? 5, 13, 29, 61, ?\",\"options\":[\"101\",\"117\",\"125\",\"133\"],\"answer\":\"117\"},{\"id\":55,\"question\":\"If BLUE is related to COLOR, then SPARROW is related to:\",\"options\":[\"Bird\",\"Animal\",\"Feather\",\"Fly\"],\"answer\":\"Bird\"},{\"id\":56,\"question\":\"How many meaningful English words can be formed using letters of RATE without repetition?\",\"options\":[\"6\",\"12\",\"18\",\"24\"],\"answer\":\"12\"},{\"id\":57,\"question\":\"Which one is different?\",\"options\":[\"Inch\",\"Yard\",\"Mile\",\"Acre\"],\"answer\":\"Acre\"},{\"id\":58,\"question\":\"If 3rd March 2024 is Sunday, what day is 17th March 2024?\",\"options\":[\"Friday\",\"Saturday\",\"Sunday\",\"Monday\"],\"answer\":\"Sunday\"},{\"id\":59,\"question\":\"Find the odd word:\",\"options\":[\"Oxygen\",\"Nitrogen\",\"Hydrogen\",\"Carbon\"],\"answer\":\"Carbon\"},{\"id\":60,\"question\":\"Which number does not belong?\",\"options\":[\"121\",\"169\",\"196\",\"225\"],\"answer\":\"225\"},{\"id\":61,\"question\":\"If A is father of B, B is sister of C, then A is ___ of C.\",\"options\":[\"Father\",\"Uncle\",\"Brother\",\"Grandfather\"],\"answer\":\"Father\"},{\"id\":62,\"question\":\"Which number replaces the question mark? 7, 21, 42, 70, ?\",\"options\":[\"105\",\"98\",\"110\",\"140\"],\"answer\":\"105\"},{\"id\":63,\"question\":\"If MONDAY is coded as NQPFEC, then FRIDAY is:\",\"options\":[\"GSKFEC\",\"GSKFDC\",\"GSKFEC\",\"HSLFEC\"],\"answer\":\"GSKFEC\"},{\"id\":64,\"question\":\"Find the odd one:\",\"options\":[\"Square\",\"Rectangle\",\"Parallelogram\",\"Circle\"],\"answer\":\"Circle\"},{\"id\":65,\"question\":\"If the clock shows 3:20, what is the angle between the hands?\",\"options\":[\"10°\",\"20°\",\"30°\",\"40°\"],\"answer\":\"10°\"},{\"id\":66,\"question\":\"Which word cannot be formed from DEMOCRACY?\",\"options\":[\"CORE\",\"MODE\",\"READ\",\"RACE\"],\"answer\":\"READ\"},{\"id\":67,\"question\":\"If 8 → 512, 6 → 216, then 5 → ?\",\"options\":[\"125\",\"100\",\"150\",\"625\"],\"answer\":\"125\"},{\"id\":68,\"question\":\"Choose the incorrect pair:\",\"options\":[\"Ear – Hearing\",\"Eye – Seeing\",\"Nose – Smelling\",\"Skin – Breathing\"],\"answer\":\"Skin – Breathing\"},{\"id\":69,\"question\":\"Which letter is 4th to the right of the 13th letter from left in the alphabet?\",\"options\":[\"Q\",\"R\",\"S\",\"T\"],\"answer\":\"S\"},{\"id\":70,\"question\":\"Which arrangement forms a meaningful word? T E S C A\",\"options\":[\"CASTE\",\"SECTA\",\"ECAST\",\"TCESA\"],\"answer\":\"CASTE\"},{\"id\":71,\"question\":\"Which number is missing? 3, 7, 15, 31, ?\",\"options\":[\"47\",\"63\",\"61\",\"59\"],\"answer\":\"61\"},{\"id\":72,\"question\":\"All apples are fruits. All fruits are sweet. Conclusion: All apples are sweet.\",\"options\":[\"True\",\"False\"],\"answer\":\"True\"},{\"id\":73,\"question\":\"Find the odd number:\",\"options\":[\"14\",\"21\",\"28\",\"35\"],\"answer\":\"21\"},{\"id\":74,\"question\":\"If CAT → DBU, then DOG → ?\",\"options\":[\"EPH\",\"EOH\",\"EPI\",\"FPI\"],\"answer\":\"EPH\"},{\"id\":75,\"question\":\"Which comes next? Z, X, U, Q, ?\",\"options\":[\"L\",\"M\",\"N\",\"O\"],\"answer\":\"L\"},{\"id\":76,\"question\":\"Pointing to a lady, Rahul said, 'She is my mother’s daughter’s daughter.' Who is she?\",\"options\":[\"Sister\",\"Niece\",\"Cousin\",\"Daughter\"],\"answer\":\"Niece\"},{\"id\":77,\"question\":\"Which pair is different?\",\"options\":[\"(2, 8)\",\"(3, 27)\",\"(4, 64)\",\"(5, 100)\"],\"answer\":\"(5, 100)\"},{\"id\":78,\"question\":\"Which word does not belong?\",\"options\":[\"Piano\",\"Guitar\",\"Flute\",\"Violin\"],\"answer\":\"Flute\"},{\"id\":79,\"question\":\"If today is Wednesday, what day will it be after 100 days?\",\"options\":[\"Thursday\",\"Friday\",\"Saturday\",\"Sunday\"],\"answer\":\"Friday\"},{\"id\":80,\"question\":\"If A → C, B → E, C → G, then D → ?\",\"options\":[\"H\",\"I\",\"J\",\"K\"],\"answer\":\"I\"},{\"id\":81,\"question\":\"Find the missing number: 6, 13, 28, 59, ?\",\"options\":[\"118\",\"120\",\"122\",\"124\"],\"answer\":\"122\"},{\"id\":82,\"question\":\"Which word is different from the others?\",\"options\":[\"Quartz\",\"Diamond\",\"Ruby\",\"Pearl\"],\"answer\":\"Quartz\"},{\"id\":83,\"question\":\"If SUNDAY is written as TZOECA, how is MONDAY written?\",\"options\":[\"NPQECB\",\"NOPEDB\",\"NPQEDB\",\"OQPEDB\"],\"answer\":\"NPQECB\"},{\"id\":84,\"question\":\"Choose the odd number.\",\"options\":[\"143\",\"187\",\"221\",\"299\"],\"answer\":\"299\"},{\"id\":85,\"question\":\"A person moves 15 m south, turns left and moves 10 m, then turns right and moves 5 m. What is the straight distance from start?\",\"options\":[\"10 m\",\"15 m\",\"18 m\",\"20 m\"],\"answer\":\"18 m\"},{\"id\":86,\"question\":\"Which pair follows the same relation as Knife : Cut?\",\"options\":[\"Pen : Write\",\"Brush : Paint\",\"Axe : Chop\",\"Spoon : Eat\"],\"answer\":\"Axe : Chop\"},{\"id\":87,\"question\":\"Find the next term: A1, C4, F9, J16, ?\",\"options\":[\"O25\",\"N25\",\"O36\",\"M25\"],\"answer\":\"O25\"},{\"id\":88,\"question\":\"If P × Q means P is the father of Q and P − Q means P is the wife of Q, then what is P to R in P − Q × R?\",\"options\":[\"Mother\",\"Aunt\",\"Sister\",\"Daughter\"],\"answer\":\"Mother\"},{\"id\":89,\"question\":\"Choose the correct alternative: Iron : Rust :: Wood : ?\",\"options\":[\"Burn\",\"Rot\",\"Break\",\"Bend\"],\"answer\":\"Rot\"},{\"id\":90,\"question\":\"Find the missing letter: D, G, K, P, ?\",\"options\":[\"U\",\"V\",\"W\",\"X\"],\"answer\":\"V\"},{\"id\":91,\"question\":\"Which number replaces the question mark? 4, 18, 64, 150, ?\",\"options\":[\"288\",\"256\",\"270\",\"294\"],\"answer\":\"288\"},{\"id\":92,\"question\":\"Which word cannot be formed from CONVERSATION?\",\"options\":[\"VOTE\",\"NOISE\",\"REASON\",\"SEASON\"],\"answer\":\"SEASON\"},{\"id\":93,\"question\":\"Statements: All journals are magazines. Some magazines are books. Conclusion: Some journals may be books.\",\"options\":[\"True\",\"False\"],\"answer\":\"True\"},{\"id\":94,\"question\":\"Choose the odd one out.\",\"options\":[\"CPU\",\"RAM\",\"ROM\",\"Keyboard\"],\"answer\":\"Keyboard\"},{\"id\":95,\"question\":\"If 1st April 2025 is Tuesday, what day is 30th April 2025?\",\"options\":[\"Tuesday\",\"Wednesday\",\"Thursday\",\"Friday\"],\"answer\":\"Wednesday\"},{\"id\":96,\"question\":\"Find the incorrect pair.\",\"options\":[\"Saturn – Rings\",\"Earth – Axis\",\"Mars – Ocean\",\"Venus – Atmosphere\"],\"answer\":\"Mars – Ocean\"},{\"id\":97,\"question\":\"Which number is missing? 5, 11, 23, 47, ?\",\"options\":[\"95\",\"96\",\"97\",\"99\"],\"answer\":\"97\"},{\"id\":98,\"question\":\"Pointing to a man, Neha said, 'He is the son of my grandmother’s only child.' Who is he?\",\"options\":[\"Brother\",\"Cousin\",\"Uncle\",\"Father\"],\"answer\":\"Brother\"},{\"id\":99,\"question\":\"Find the odd word.\",\"options\":[\"Sparrow\",\"Penguin\",\"Ostrich\",\"Eagle\"],\"answer\":\"Eagle\"},{\"id\":100,\"question\":\"Choose the missing term: 2A, 5D, 10I, 17P, ?\",\"options\":[\"26Y\",\"26X\",\"25Y\",\"25X\"],\"answer\":\"26Y\"}]"));}),
"[project]/pages/test/aptitude.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// pages/test/aptitude
__turbopack_context__.s([
    "default",
    ()=>AptitudeTest
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$aptitude$2d$questions$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/data/aptitude-questions.json (json)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
const STORAGE_KEY = "aptitude_test_state_v1";
function AptitudeTest() {
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
        "AptitudeTest.useEffect": ()=>{
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
    }["AptitudeTest.useEffect"], []);
    /* ---------------- SAVE STATE ---------------- */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AptitudeTest.useEffect": ()=>{
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
    }["AptitudeTest.useEffect"], [
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
        "AptitudeTest.useEffect": ()=>{
            if (step !== "test") return;
            const block = {
                "AptitudeTest.useEffect.block": (e)=>e.preventDefault()
            }["AptitudeTest.useEffect.block"];
            const blockKeys = {
                "AptitudeTest.useEffect.blockKeys": (e)=>{
                    const forbidden = e.key === "F12" || e.ctrlKey && e.shiftKey && [
                        "I",
                        "J",
                        "C"
                    ].includes(e.key) || e.ctrlKey && e.key === "U";
                    if (forbidden) {
                        triggerAutoSubmit("You violated the exam rules, so the Aptitude test was automatically submitted. Kindly contact HR.");
                    }
                }
            }["AptitudeTest.useEffect.blockKeys"];
            document.addEventListener("contextmenu", block);
            document.addEventListener("copy", block);
            document.addEventListener("cut", block);
            document.addEventListener("paste", block);
            document.addEventListener("keydown", blockKeys);
            return ({
                "AptitudeTest.useEffect": ()=>{
                    document.removeEventListener("contextmenu", block);
                    document.removeEventListener("copy", block);
                    document.removeEventListener("cut", block);
                    document.removeEventListener("paste", block);
                    document.removeEventListener("keydown", blockKeys);
                }
            })["AptitudeTest.useEffect"];
        }
    }["AptitudeTest.useEffect"], [
        step
    ]);
    /* ---------------- QUESTIONS ---------------- */ const generateQuestions = ()=>{
        const shuffled = [
            ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$aptitude$2d$questions$2e$json__$28$json$29$__["default"]
        ].sort(()=>0.5 - Math.random());
        setQuestions(shuffled.slice(0, 50));
    };
    /* ---------------- AUTO START ---------------- */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AptitudeTest.useEffect": ()=>{
            if (router.query.start === "true") {
                generateQuestions();
                setStep("test");
            }
        }
    }["AptitudeTest.useEffect"], [
        router.query.start
    ]);
    /* ---------------- TIMER ---------------- */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AptitudeTest.useEffect": ()=>{
            if (step !== "test") return;
            const interval = setInterval({
                "AptitudeTest.useEffect.interval": ()=>{
                    setTimer({
                        "AptitudeTest.useEffect.interval": (prev)=>{
                            if (prev <= 1) {
                                triggerAutoSubmit("The time is over, so the Aptitude test was automatically submitted. Please contact HR for further details.");
                                clearInterval(interval);
                                return 0;
                            }
                            return prev - 1;
                        }
                    }["AptitudeTest.useEffect.interval"]);
                }
            }["AptitudeTest.useEffect.interval"], 1000);
            return ({
                "AptitudeTest.useEffect": ()=>clearInterval(interval)
            })["AptitudeTest.useEffect"];
        }
    }["AptitudeTest.useEffect"], [
        step
    ]);
    /* ---------------- TAB SWITCH ---------------- */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AptitudeTest.useEffect": ()=>{
            if (step !== "test") return;
            const handleVisibility = {
                "AptitudeTest.useEffect.handleVisibility": ()=>{
                    if (document.visibilityState === "hidden") {
                        setTabCount({
                            "AptitudeTest.useEffect.handleVisibility": (prev)=>{
                                const count = prev + 1;
                                if (count <= 2) {
                                    alert(`Warning ${count}/3: Tab switching is not allowed.`);
                                    return count;
                                }
                                triggerAutoSubmit("You violated the rules 3 times, so the Aptitude test was submitted. Kindly contact HR.");
                                return count;
                            }
                        }["AptitudeTest.useEffect.handleVisibility"]);
                    }
                }
            }["AptitudeTest.useEffect.handleVisibility"];
            document.addEventListener("visibilitychange", handleVisibility);
            return ({
                "AptitudeTest.useEffect": ()=>document.removeEventListener("visibilitychange", handleVisibility)
            })["AptitudeTest.useEffect"];
        }
    }["AptitudeTest.useEffect"], [
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
            title: "Aptitude Test Submitted",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-center text-red-600 font-semibold mb-6",
                    children: autoSubmitReason || "Your Aptitude test was successfully submitted."
                }, void 0, false, {
                    fileName: "[project]/pages/test/aptitude.js",
                    lineNumber: 166,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>router.push("/"),
                    className: "w-full bg-blue-600 text-white py-2 rounded-lg font-semibold",
                    children: "OK"
                }, void 0, false, {
                    fileName: "[project]/pages/test/aptitude.js",
                    lineNumber: 171,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/pages/test/aptitude.js",
            lineNumber: 165,
            columnNumber: 7
        }, this);
    }
    /* ---------------- INSTRUCTIONS ---------------- */ if (step === "instructions") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CenteredCard, {
            title: "Aptitude Test Instructions",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Instruction, {
                    children: "50 questions – all mandatory"
                }, void 0, false, {
                    fileName: "[project]/pages/test/aptitude.js",
                    lineNumber: 185,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Instruction, {
                    children: "Time limit: 20 minutes"
                }, void 0, false, {
                    fileName: "[project]/pages/test/aptitude.js",
                    lineNumber: 186,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Instruction, {
                    children: "No tab switch / copy / inspect"
                }, void 0, false, {
                    fileName: "[project]/pages/test/aptitude.js",
                    lineNumber: 187,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Instruction, {
                    children: "Violations → auto submit"
                }, void 0, false, {
                    fileName: "[project]/pages/test/aptitude.js",
                    lineNumber: 188,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PrimaryButton, {
                    className: "mt-6",
                    onClick: ()=>window.open("/test/aptitude?start=true", "_blank"),
                    children: "Start Aptitude Test"
                }, void 0, false, {
                    fileName: "[project]/pages/test/aptitude.js",
                    lineNumber: 190,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/pages/test/aptitude.js",
            lineNumber: 184,
            columnNumber: 7
        }, this);
    }
    /* ---------------- LOGIN ---------------- */ if (step === "login") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CenteredCard, {
            title: "Aptitude Online Assessment",
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
                        fileName: "[project]/pages/test/aptitude.js",
                        lineNumber: 213,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Input, {
                        placeholder: "Email ID"
                    }, void 0, false, {
                        fileName: "[project]/pages/test/aptitude.js",
                        lineNumber: 214,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Input, {
                        placeholder: "Mobile Number"
                    }, void 0, false, {
                        fileName: "[project]/pages/test/aptitude.js",
                        lineNumber: 215,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Input, {
                        placeholder: "College / Company"
                    }, void 0, false, {
                        fileName: "[project]/pages/test/aptitude.js",
                        lineNumber: 216,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PrimaryButton, {
                        children: "Proceed"
                    }, void 0, false, {
                        fileName: "[project]/pages/test/aptitude.js",
                        lineNumber: 217,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/test/aptitude.js",
                lineNumber: 206,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/pages/test/aptitude.js",
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
                        children: "Aptitude Test"
                    }, void 0, false, {
                        fileName: "[project]/pages/test/aptitude.js",
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
                        fileName: "[project]/pages/test/aptitude.js",
                        lineNumber: 228,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/test/aptitude.js",
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
                                    fileName: "[project]/pages/test/aptitude.js",
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
                                        fileName: "[project]/pages/test/aptitude.js",
                                        lineNumber: 240,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, q.id, true, {
                            fileName: "[project]/pages/test/aptitude.js",
                            lineNumber: 235,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>submitTest(),
                        className: "w-full bg-green-600 text-white py-3 rounded-xl font-bold",
                        children: "Submit Aptitude Test"
                    }, void 0, false, {
                        fileName: "[project]/pages/test/aptitude.js",
                        lineNumber: 257,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/test/aptitude.js",
                lineNumber: 233,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/test/aptitude.js",
        lineNumber: 225,
        columnNumber: 5
    }, this);
}
_s(AptitudeTest, "k503SsbTVcKAmIrbOrTe4ABWVEw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AptitudeTest;
/* ---------------- UI HELPERS ---------------- */ const CenteredCard = ({ title, children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex items-center justify-center bg-gray-100 px-3",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white p-6 rounded-2xl shadow w-full max-w-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-xl font-bold text-center mb-5",
                    children: title
                }, void 0, false, {
                    fileName: "[project]/pages/test/aptitude.js",
                    lineNumber: 273,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                children
            ]
        }, void 0, true, {
            fileName: "[project]/pages/test/aptitude.js",
            lineNumber: 272,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/pages/test/aptitude.js",
        lineNumber: 271,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c1 = CenteredCard;
const Input = ({ placeholder })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        required: true,
        placeholder: placeholder,
        className: "w-full border px-3 py-2 rounded-lg"
    }, void 0, false, {
        fileName: "[project]/pages/test/aptitude.js",
        lineNumber: 280,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c2 = Input;
const PrimaryButton = ({ children, onClick, className = "" })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        className: `w-full bg-blue-600 text-white py-2 rounded-lg font-semibold ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/pages/test/aptitude.js",
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
        fileName: "[project]/pages/test/aptitude.js",
        lineNumber: 297,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c4 = Instruction;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "AptitudeTest");
__turbopack_context__.k.register(_c1, "CenteredCard");
__turbopack_context__.k.register(_c2, "Input");
__turbopack_context__.k.register(_c3, "PrimaryButton");
__turbopack_context__.k.register(_c4, "Instruction");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/test/aptitude.js [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/test/aptitude";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/test/aptitude.js [client] (ecmascript)");
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
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/pages/test/aptitude.js\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/test/aptitude.js [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__6bc42f11._.js.map