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
"[project]/data/data-analytics-questions.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("[{\"id\":1,\"question\":\"Which function finds the total of values in a range?\",\"options\":[\"TOTAL\",\"ADD\",\"SUM\",\"CALCULATE\"],\"answer\":\"SUM\"},{\"id\":2,\"question\":\"The formula =AVERAGE(10,20,30) returns:\",\"options\":[\"60\",\"30\",\"20\",\"15\"],\"answer\":\"20\"},{\"id\":3,\"question\":\"To find the difference between A1 and B1, the correct formula is:\",\"options\":[\"DIFF(A1,B1)\",\"=@A1−B1\",\"A1/B1\",\"SUBTRACT(A1,B1)\"],\"answer\":\"=@A1−B1\"},{\"id\":4,\"question\":\"If C2 contains 50 and D2 contains 200, the formula to find C2 as a percentage of D2 is:\",\"options\":[\"=C2%/D2\",\"=C2+D2\",\"=C2/D2\",\"=@PERCENTAGE(C2,D2)\"],\"answer\":\"=C2/D2\"},{\"id\":5,\"question\":\"Which function assigns a rank to a number within a list of numbers?\",\"options\":[\"SORT\",\"RANK\",\"INDEX\",\"ORDER\"],\"answer\":\"RANK\"},{\"id\":6,\"question\":\"What does RANK.AVG return if two values in the list are identical?\",\"options\":[\"An error\",\"The lower rank\",\"The average of the tied ranks\",\"The higher rank\"],\"answer\":\"The average of the tied ranks\"},{\"id\":7,\"question\":\"The IF function requires how many arguments?\",\"options\":[\"One\",\"Two\",\"Three\",\"Four\"],\"answer\":\"Three\"},{\"id\":8,\"question\":\"What is the benefit of using IFS over multiple nested IF statements?\",\"options\":[\"It has better error handling\",\"It is only for numerical checks\",\"It avoids deep nesting and is easier to read\",\"It can only check two conditions\"],\"answer\":\"It avoids deep nesting and is easier to read\"},{\"id\":9,\"question\":\"The COUNT function only counts cells containing which type of data?\",\"options\":[\"Text\",\"Logical values\",\"Numbers\",\"Formulas\"],\"answer\":\"Numbers\"},{\"id\":10,\"question\":\"Which function counts cells in a range that are not empty, including text and numbers?\",\"options\":[\"COUNT\",\"COUNTA\",\"COUNTALL\",\"COUNTIF\"],\"answer\":\"COUNTA\"},{\"id\":11,\"question\":\"To count how many times 'Pass' appears in the range E1:E100, the formula should be:\",\"options\":[\"0\",\"0\",\"COUNT(E1:E100)\",\"COUNTIFS\"],\"answer\":\"COUNTIFS\"},{\"id\":12,\"question\":\"Which function calculates the sum of values that meet a single specified criterion?\",\"options\":[\"SUM\",\"SUMS\",\"SUMIF\",\"SUMIFS\"],\"answer\":\"SUMIF\"},{\"id\":13,\"question\":\"What is the key difference in syntax between SUMIF and SUMIFS?\",\"options\":[\"The criteria range and sum range positions are swapped\",\"SUMIFS can only use one criteria\",\"SUMIF is faster\",\"SUMIFS only works with text\"],\"answer\":\"The criteria range and sum range positions are swapped\"},{\"id\":14,\"question\":\"Which function finds the largest numeric value in a dataset?\",\"options\":[\"MAX\",\"LARGE\",\"TOP\",\"UPPER\"],\"answer\":\"MAX\"},{\"id\":15,\"question\":\"What type of values does the MAXA function include that MAX ignores?\",\"options\":[\"Only text values\",\"Only FALSE logical values\",\"Text and logical values\",\"Blank cells\"],\"answer\":\"Text and logical values\"},{\"id\":16,\"question\":\"The formula =MIN(5,1,10,3) returns:\",\"options\":[\"1\",\"3\",\"10\",\"5\"],\"answer\":\"1\"},{\"id\":17,\"question\":\"In a range containing {1,0,'Value',TRUE}, what value will MINA treat 'Value' as?\",\"options\":[\"0\",\"1\",\"-1\",\"An error\"],\"answer\":\"1\"},{\"id\":18,\"question\":\"To find the 2nd highest score in a list of scores in A1:A100, the correct formula is:\",\"options\":[\"MAX(A1:A100,2)\",\"LARGE(A1:A100,2)\",\"SMALL(A1:A100,2)\",\"RANK(A1:A100,2)\"],\"answer\":\"LARGE(A1:A100,2)\"},{\"id\":19,\"question\":\"Which formula returns the 3rd smallest number in a dataset in B5:B20?\",\"options\":[\"MIN(B5:B20,3)\",\"LARGE(B5:B20,3)\",\"SMALL(B5:B20,3)\",\"COUNTIF(B5:B20,3)\"],\"answer\":\"SMALL(B5:B20,3)\"},{\"id\":20,\"question\":\"Which operator can be used as an alternative to the CONCATENATE function?\",\"options\":[\"=+\",\"&\",\"*\",\"/\"],\"answer\":\"&\"},{\"id\":20,\"question\":\"Which operator can be used as an alternative to the CONCATENATE function?\",\"options\":[\"=+\",\"&\",\"*\",\"/\"],\"answer\":\"&\"},{\"id\":21,\"question\":\"If A1 contains 'Data', what is the result of =LEFT(A1,2)?\",\"options\":[\"Da\",\"ta\",\"Dat\",\"a\"],\"answer\":\"Da\"},{\"id\":22,\"question\":\"To extract the department code 'HR' from 'Employee_HR', you would use the RIGHT function with the number of characters set to:\",\"options\":[\"1\",\"2\",\"3\",\"4\"],\"answer\":\"2\"},{\"id\":23,\"question\":\"If C5 contains 'Apples and Oranges', what is the result of =MID(C5,8,3)?\",\"options\":[\"and\",\"App\",\"Ora\",\"es\"],\"answer\":\"and\"},{\"id\":24,\"question\":\"What does the LEN function count?\",\"options\":[\"The number of words in a cell\",\"The number of numerical digits in a cell\",\"The number of characters, including spaces, in a cell\",\"The number of cells in a range\"],\"answer\":\"The number of characters, including spaces, in a cell\"},{\"id\":25,\"question\":\"The MEAN is another term for which spreadsheet function?\",\"options\":[\"SUM\",\"AVERAGE\",\"MEDIAN\",\"MODE\"],\"answer\":\"AVERAGE\"},{\"id\":26,\"question\":\"What is the MEDIAN of the dataset {10,20,5,25,15}?\",\"options\":[\"15\",\"10\",\"25\",\"75\"],\"answer\":\"15\"},{\"id\":27,\"question\":\"In the dataset {5,8,8,10,15}, what is the MODE?\",\"options\":[\"15\",\"8\",\"5\",\"9.2\"],\"answer\":\"8\"},{\"id\":28,\"question\":\"The VAR.S function calculates the variance based on what assumption?\",\"options\":[\"The entire population\",\"A sample of the population\",\"A skewed distribution\",\"Only integer values\"],\"answer\":\"A sample of the population\"},{\"id\":29,\"question\":\"Which function measures the dispersion of a dataset relative to its mean?\",\"options\":[\"AVERAGE\",\"STDEV\",\"VAR\",\"COUNT\"],\"answer\":\"STDEV\"},{\"id\":30,\"question\":\"If =PERCENTILE(A1:A100,0.9) is used, what value is returned?\",\"options\":[\"The value below which 90% of the data falls\",\"The 90th item in the list\",\"90% of the AVERAGE\",\"The rank of the value 0.9\"],\"answer\":\"The value below which 90% of the data falls\"},{\"id\":31,\"question\":\"What is the key difference between =TODAY() and =NOW()?\",\"options\":[\"TODAY includes the date and time\",\"NOW includes the date and time\",\"TODAY only updates manually\",\"NOW is for financial data\"],\"answer\":\"NOW includes the date and time\"},{\"id\":32,\"question\":\"When is the value of =NOW() updated in a spreadsheet?\",\"options\":[\"Only when the file is saved\",\"When the workbook is opened or a calculation is triggered\",\"Only when the function is first entered\",\"Every second\"],\"answer\":\"When the workbook is opened or a calculation is triggered\"},{\"id\":33,\"question\":\"To create the date March 15, 2025, which formula is correct?\",\"options\":[\"DATE(2025,03,15)\",\"DATE(15,03,2025)\",\"DATE(March,15,2025)\",\"DATE(2025,15,03)\"],\"answer\":\"DATE(2025,03,15)\"},{\"id\":34,\"question\":\"If A1 contains 12/31/2024, what does =YEAR(A1) return?\",\"options\":[\"12\",\"31\",\"2024\",\"24\"],\"answer\":\"2024\"},{\"id\":35,\"question\":\"What is the result of =MONTH('10/5/2023')?\",\"options\":[\"5\",\"10\",\"2023\",\"20\"],\"answer\":\"10\"},{\"id\":36,\"question\":\"If B1 contains today's date, which function extracts the day number of the month?\",\"options\":[\"DATE\",\"DAY\",\"WEEKDAY\",\"MONTH\"],\"answer\":\"DAY\"},{\"id\":37,\"question\":\"The INDEX function retrieves a value at the intersection of a specified row and column within a:\",\"options\":[\"Range\",\"Criteria\",\"Lookup value\",\"Worksheet\"],\"answer\":\"Range\"},{\"id\":38,\"question\":\"The MATCH function returns:\",\"options\":[\"The actual value found\",\"The position of the found value\",\"The row or column number\",\"An error if not found\"],\"answer\":\"The position of the found value\"},{\"id\":39,\"question\":\"Which feature is used to restrict the type or value of data that users enter into a cell?\",\"options\":[\"Conditional Formatting\",\"Data Cleaning\",\"Data Validation\",\"Protection\"],\"answer\":\"Data Validation\"},{\"id\":40,\"question\":\"The key advantage of INDEX+MATCH over VLOOKUP is its ability to:\",\"options\":[\"Handle wildcards\",\"Perform case-sensitive lookups\",\"Handle multiple criteria\",\"Look up a value in any column\"],\"answer\":\"Look up a value in any column\"},{\"id\":41,\"question\":\"Which column number must VLOOKUP always look in for the lookup value?\",\"options\":[\"The last column of the table\",\"Any column\",\"The first column of the table\",\"The column specified as the column index\"],\"answer\":\"The first column of the table\"},{\"id\":42,\"question\":\"The HLOOKUP function looks up a value across which direction?\",\"options\":[\"Vertically\",\"Horizontally (across rows)\",\"Diagonally\",\"Only within the same column\"],\"answer\":\"Horizontally (across rows)\"},{\"id\":43,\"question\":\"To display the number 50000 as '$50,000.00', which function is best suited?\",\"options\":[\"CURRENCY\",\"FORMAT\",\"TEXT\",\"NUMBER\"],\"answer\":\"TEXT\"},{\"id\":44,\"question\":\"Which array function is used to count how often values occur within a range of values (bins)?\",\"options\":[\"COUNTIF\",\"FREQUENCY\",\"OCCURS\",\"DISTRIBUTION\"],\"answer\":\"FREQUENCY\"},{\"id\":45,\"question\":\"What does the IFERROR function return if the first argument (the value) results in an error?\",\"options\":[\"The value of the second argument\",\"An error\",\"TRUE\",\"FALSE\"],\"answer\":\"The value of the second argument\"},{\"id\":46,\"question\":\"Which tool separates the contents of one cell into multiple columns based on a delimiter or fixed width?\",\"options\":[\"Concatenate\",\"Data Validation\",\"Text to Columns\",\"Split\"],\"answer\":\"Text to Columns\"},{\"id\":47,\"question\":\"Sorting data using a spreadsheet tool rearranges the data either:\",\"options\":[\"Only alphabetically\",\"Only numerically\",\"Ascending or Descending\",\"Randomly\"],\"answer\":\"Ascending or Descending\"},{\"id\":48,\"question\":\"Which tool temporarily hides rows that do not meet specified criteria?\",\"options\":[\"Sort\",\"Conditional Formatting\",\"Freeze Panes\",\"Filter\"],\"answer\":\"Filter\"},{\"id\":49,\"question\":\"When using the 'Remove Duplicates' feature, which rows are kept?\",\"options\":[\"All rows are kept, but duplicates are marked\",\"The last occurrence of the duplicate row is kept\",\"The first occurrence of the duplicate row is kept\",\"Only the unique rows are moved to a new sheet\"],\"answer\":\"The first occurrence of the duplicate row is kept\"},{\"id\":50,\"question\":\"The primary purpose of 'Freezing Panes' is to keep which parts of the worksheet visible while scrolling?\",\"options\":[\"Only the last row and column\",\"The first column or row headers\",\"Only the active cell\",\"Only the formulas\"],\"answer\":\"The first column or row headers\"},{\"id\":51,\"question\":\"A Pivot Table is primarily used for what?\",\"options\":[\"Simple data entry\",\"Summarizing, analyzing, and exploring large datasets\",\"Writing formulas\",\"Creating macros\"],\"answer\":\"Summarizing, analyzing, and exploring large datasets\"},{\"id\":52,\"question\":\"Pivot Charts are dynamic visualizations that are directly linked to:\",\"options\":[\"VLOOKUP formulas\",\"The source data table\",\"The corresponding Pivot Table\",\"Another workbook\"],\"answer\":\"The corresponding Pivot Table\"},{\"id\":53,\"question\":\"Which function or tool rotates a range of cells, turning rows into columns and vice-versa?\",\"options\":[\"ROTATE\",\"REVERSE\",\"TRANSPOSE\",\"CHANGE\"],\"answer\":\"TRANSPOSE\"},{\"id\":54,\"question\":\"Which feature is used to automatically change the appearance of cells based on their values?\",\"options\":[\"Data Validation\",\"Filter\",\"Conditional Formatting\",\"Styles\"],\"answer\":\"Conditional Formatting\"},{\"id\":55,\"question\":\"In simple Regression Analysis, the relationship between how many variables is studied?\",\"options\":[\"One\",\"Two\",\"Three\",\"Four or more\"],\"answer\":\"Two\"},{\"id\":56,\"question\":\"A Multiple Regression Analysis studies the relationship between a dependent variable and:\",\"options\":[\"A single independent variable\",\"Two dependent variables\",\"Two or more independent variables\",\"No independent variables\"],\"answer\":\"Two or more independent variables\"},{\"id\":57,\"question\":\"If A1 contains 'excel function', what does =PROPER(A1) return?\",\"options\":[\"Excel Function\",\"EXCEL FUNCTION\",\"excel function\",\"Excel function\"],\"answer\":\"Excel Function\"},{\"id\":58,\"question\":\"The function that converts all letters in a text string to capital letters is:\",\"options\":[\"CAPS\",\"UPPER\",\"PROPER\",\"LARGE\"],\"answer\":\"UPPER\"},{\"id\":59,\"question\":\"Which function converts all text in a cell to lowercase?\",\"options\":[\"SMALL\",\"CASE\",\"LOWER\",\"TEXT\"],\"answer\":\"LOWER\"},{\"id\":60,\"question\":\"The TRIM function removes which types of characters from a text string?\",\"options\":[\"Leading, trailing, and multiple spaces between words\",\"All spaces\",\"Only leading spaces\",\"Only trailing spaces\"],\"answer\":\"Leading, trailing, and multiple spaces between words\"},{\"id\":61,\"question\":\"The combination =IF(LEN(A1)>0,'Not Blank','Blank') is used to check if a cell:\",\"options\":[\"Is a number\",\"Contains a formula\",\"Has a length greater than zero (is not blank)\",\"Contains only text\"],\"answer\":\"Has a length greater than zero (is not blank)\"},{\"id\":62,\"question\":\"A dataset with a positive Skewness is characterized by:\",\"options\":[\"A longer tail on the left side\",\"A perfectly symmetric distribution\",\"A longer tail on the right side\",\"A uniform distribution\"],\"answer\":\"A longer tail on the right side\"},{\"id\":63,\"question\":\"Kurtosis measures the degree of what in a distribution?\",\"options\":[\"Symmetry\",\"Spread\",\"Peakedness (tailedness)\",\"Central tendency\"],\"answer\":\"Peakedness (tailedness)\"},{\"id\":64,\"question\":\"In statistical hypothesis testing, a small P Value (e.g., <0.05) indicates:\",\"options\":[\"The Null Hypothesis is likely true\",\"The Null Hypothesis should be rejected\",\"The data is normally distributed\",\"The sample size is too small\"],\"answer\":\"The Null Hypothesis should be rejected\"},{\"id\":65,\"question\":\"The Standard Error of the mean is the Standard Deviation divided by:\",\"options\":[\"The variance\",\"The square root of the sample size\",\"The total sample size\",\"The mean\"],\"answer\":\"The square root of the sample size\"},{\"id\":66,\"question\":\"The Null Hypothesis (H0) usually states that there is:\",\"options\":[\"A significant difference or relationship\",\"No significant difference or relationship\",\"An error in the data\",\"A positive correlation\"],\"answer\":\"No significant difference or relationship\"},{\"id\":67,\"question\":\"To perform a sum of squared differences on a range, one might use which specialized array function?\",\"options\":[\"SUMSQ\",\"SUMPRODUCT\",\"SUM\",\"SUMIF\"],\"answer\":\"SUMPRODUCT\"},{\"id\":68,\"question\":\"SUMPRODUCT is commonly used for a 'Multiple Array' calculation, which involves:\",\"options\":[\"Multiplying corresponding components in given arrays and returning the sum of those products\",\"Summing multiple ranges\",\"Finding the product of all numbers in a range\",\"Only multiplying two arrays\"],\"answer\":\"Multiplying corresponding components in given arrays and returning the sum of those products\"},{\"id\":69,\"question\":\"When copying the formula =A1+B1 from C1 to C2, the formula becomes =A2+B2. This is an example of:\",\"options\":[\"Absolute referencing\",\"Mixed referencing\",\"Circular referencing\",\"Relative referencing\"],\"answer\":\"Relative referencing\"},{\"id\":70,\"question\":\"Which symbol is used to create an Absolute Reference for a column, a row, or both?\",\"options\":[\"*\",\"#\",\"$\",\"!\"],\"answer\":\"$\"},{\"id\":71,\"question\":\"The formula =RANDBETWEEN(1,100) generates:\",\"options\":[\"A random integer between 1 and 100, inclusive\",\"A random decimal between 1 and 100\",\"The average of 1 and 100\",\"Only the number 50\"],\"answer\":\"A random integer between 1 and 100, inclusive\"},{\"id\":72,\"question\":\"In IF statements, the AND function returns TRUE only if:\",\"options\":[\"At least one condition is TRUE\",\"Both conditions are FALSE\",\"All conditions are TRUE\",\"None of the conditions are met\"],\"answer\":\"All conditions are TRUE\"},{\"id\":73,\"question\":\"The OR function returns FALSE only if:\",\"options\":[\"All arguments are TRUE\",\"Only one argument is FALSE\",\"All arguments are FALSE\",\"No arguments are present\"],\"answer\":\"All arguments are FALSE\"},{\"id\":74,\"question\":\"The REPLACE function changes existing text by specifying its:\",\"options\":[\"New text only\",\"Starting position and number of characters to replace\",\"Only the character to be replaced\",\"The end position\"],\"answer\":\"Starting position and number of characters to replace\"},{\"id\":75,\"question\":\"Which group of spreadsheet functions (like FORECAST.LINEAR) is used to predict a future value based on existing values?\",\"options\":[\"STAT functions\",\"FINANCIAL functions\",\"LOOKUP functions\",\"FORECAST functions\"],\"answer\":\"FORECAST functions\"},{\"id\":76,\"question\":\"MySQL is a popular example of which type of system?\",\"options\":[\"Spreadsheet software\",\"Relational Database Management System (RDBMS)\",\"Statistical programming language\",\"Cloud storage\"],\"answer\":\"Relational Database Management System (RDBMS)\"},{\"id\":77,\"question\":\"Power BI is primarily used for:\",\"options\":[\"Writing complex spreadsheet formulas\",\"Data Visualization and Business Intelligence\",\"Sending mass emails\",\"Web development\"],\"answer\":\"Data Visualization and Business Intelligence\"},{\"id\":78,\"question\":\"If a range A1:A5 contains {5,10,'Text',20,15}, the result of SUM is:\",\"options\":[\"50\",\"45\",\"40\",\"#VALUE!\"],\"answer\":\"45\"},{\"id\":79,\"question\":\"The AVERAGE of 10,20,30,and 40 is:\",\"options\":[\"25\",\"20\",\"100\",\"40\"],\"answer\":\"25\"},{\"id\":80,\"question\":\"If cell C10 is 100 and cell D10 is 150, the formula =C10−D10 returns:\",\"options\":[\"50\",\"-50\",\"250\",\"1.5\"],\"answer\":\"-50\"},{\"id\":81,\"question\":\"If A1=75 and B1=50, what is A1 as a percentage of B1?\",\"options\":[\"150%\",\"75%\",\"50%\",\"125%\"],\"answer\":\"150%\"},{\"id\":82,\"question\":\"In the list {10,50,30,20}, what is the rank of 30 in descending order?\",\"options\":[\"2\",\"3\",\"1\",\"4\"],\"answer\":\"3\"},{\"id\":83,\"question\":\"The formula =IF(10>5,'Yes','No') returns:\",\"options\":[\"No\",\"Yes\",\"TRUE\",\"FALSE\"],\"answer\":\"Yes\"},{\"id\":84,\"question\":\"How many numerical values are counted by COUNT in the range {A,1,B,2,C,3}?\",\"options\":[\"6\",\"3\",\"5\",\"0\"],\"answer\":\"3\"},{\"id\":85,\"question\":\"Which function correctly counts the number of non-empty cells in the range {A,1,B,2,C,3}?\",\"options\":[\"COUNT\",\"COUNTIF\",\"COUNTA\",\"SUM\"],\"answer\":\"COUNTA\"},{\"id\":86,\"question\":\"To count cells in A1:A10 where the value is greater than 100, the criterion should be:\",\"options\":[\">100\",\"\\\"100\\\"\",\"\\\">100\\\"\",\"<100\"],\"answer\":\"\\\">100\\\"\"},{\"id\":87,\"question\":\"If A1:A5 is {1,2,3,4,5} and you SUMIF for values >3, the result is:\",\"options\":[\"15\",\"7\",\"9\",\"12\"],\"answer\":\"9\"},{\"id\":88,\"question\":\"The largest value in the range D1:D10 is returned by:\",\"options\":[\"TOP\",\"MAX\",\"LARGE\",\"HIGH\"],\"answer\":\"MAX\"},{\"id\":89,\"question\":\"The minimum value in the dataset {100,50,75,25} is:\",\"options\":[\"50\",\"100\",\"75\",\"25\"],\"answer\":\"25\"},{\"id\":90,\"question\":\"What does LARGE(range,1) always return?\",\"options\":[\"The second largest value\",\"The smallest value\",\"The largest value (equivalent to MAX)\",\"The average value\"],\"answer\":\"The largest value (equivalent to MAX)\"},{\"id\":91,\"question\":\"SMALL(A1:A10,1) is equivalent to which other function?\",\"options\":[\"MIN\",\"MAX\",\"AVERAGE\",\"MEDIAN\"],\"answer\":\"MIN\"},{\"id\":92,\"question\":\"Which formula correctly joins 'Hello' and 'World' with a space in between?\",\"options\":[\"HelloWorld\",\"HelloWorld\",\"Hello World\",\"=\\\"Hello\\\"+\\\"World\\\"\"],\"answer\":\"Hello World\"},{\"id\":93,\"question\":\"To get 'Jan' from 'January', you would use =LEFT('January',__):\",\"options\":[\"1\",\"2\",\"3\",\"4\"],\"answer\":\"3\"},{\"id\":94,\"question\":\"The result of =RIGHT('Data Mining',6) is:\",\"options\":[\"Mining\",\"Mining\",\"Data M\",\"Mining\"],\"answer\":\"Mining\"},{\"id\":95,\"question\":\"If A1 contains 1234567, LEN(A1) returns:\",\"options\":[\"6\",\"7\",\"8\",\"5\"],\"answer\":\"7\"},{\"id\":96,\"question\":\"What is the MEDIAN of the even-numbered dataset {1,2,5,8}?\",\"options\":[\"4\",\"5\",\"3.5\",\"3\"],\"answer\":\"3.5\"},{\"id\":97,\"question\":\"Which formula is used to find the most frequently occurring number in a dataset?\",\"options\":[\"MODE.SNGL\",\"AVERAGE\",\"COUNT\",\"MEDIAN\"],\"answer\":\"MODE.SNGL\"},{\"id\":98,\"question\":\"If all values in a dataset are the same (e.g., {10,10,10}), the Standard Deviation is:\",\"options\":[\"10\",\"1\",\"0\",\"Undefined\"],\"answer\":\"0\"},{\"id\":99,\"question\":\"What value must the k argument be between in the PERCENTILE function?\",\"options\":[\"1 and 100\",\"0 and 1\",\"0 and 100\",\"0 and 10\"],\"answer\":\"0 and 1\"},{\"id\":100,\"question\":\"What is the output of the formula =TODAY()?\",\"options\":[\"The current time and date\",\"The current date, formatted as a date\",\"The number of days since January 1, 1900\",\"The current year\"],\"answer\":\"The current date, formatted as a date\"},{\"id\":101,\"question\":\"Which formula extracts the day value (1 to 31) from a date in A1?\",\"options\":[\"DAY(A1)\",\"MONTH(A1)\",\"YEAR(A1)\",\"DATE(A1)\"],\"answer\":\"DAY(A1)\"},{\"id\":102,\"question\":\"If A1:C5 is a 5×3 range, what does INDEX(A1:C5,3,2) return?\",\"options\":[\"The value in A3\",\"The value in C2\",\"The value in B3\",\"The value in C3\"],\"answer\":\"The value in B3\"},{\"id\":103,\"question\":\"The MATCH function's match_type argument 0 is used for:\",\"options\":[\"Approximate match\",\"Exact match\",\"Less than match\",\"Greater than match\"],\"answer\":\"Exact match\"},{\"id\":104,\"question\":\"Which match type in VLOOKUP requires the first column of the table to be sorted?\",\"options\":[\"Exact match (FALSE)\",\"Approximate match (TRUE)\",\"All matches\",\"Any match\"],\"answer\":\"Approximate match (TRUE)\"},{\"id\":105,\"question\":\"For HLOOKUP, the result is retrieved from a row index number, counting from:\",\"options\":[\"The top of the sheet\",\"The lookup row\",\"The beginning of the table array\",\"The bottom of the sheet\"],\"answer\":\"The beginning of the table array\"},{\"id\":106,\"question\":\"If A1=0.75, what does =TEXT(A1,'0%') return?\",\"options\":[\"75%\",\"0.75%\",\"75\",\"0.75\"],\"answer\":\"75%\"},{\"id\":107,\"question\":\"If A1/0 results in #DIV/0!, using IFERROR can replace this with:\",\"options\":[\"#ERROR!\",\"'Zero Division'\",\"TRUE\",\"FALSE\"],\"answer\":\"'Zero Division'\"},{\"id\":108,\"question\":\"If you Sort data on multiple columns, the column designated as the primary sort key determines:\",\"options\":[\"The lowest level of ordering\",\"The final ordering after all other sorts\",\"The highest level of ordering\",\"The filter applied\"],\"answer\":\"The highest level of ordering\"},{\"id\":109,\"question\":\"A custom Filter can be used to display rows where a cell value is less than or equal to a specific number. This uses a:\",\"options\":[\"Simple filter\",\"Text filter\",\"Number filter\",\"Date filter\"],\"answer\":\"Number filter\"},{\"id\":110,\"question\":\"Which is NOT a primary area (field) in a Pivot Table?\",\"options\":[\"Values\",\"Filters\",\"Format\",\"Columns\"],\"answer\":\"Format\"},{\"id\":111,\"question\":\"When using the TRANSPOSE function, it must be entered as what type of formula?\",\"options\":[\"A standard formula\",\"A logical formula\",\"An array formula\",\"A text formula\"],\"answer\":\"An array formula\"},{\"id\":112,\"question\":\"Which of the following is a type of Conditional Formatting rule?\",\"options\":[\"VLOOKUP rule\",\"Data Bars\",\"SUMIF rule\",\"FILTER rule\"],\"answer\":\"Data Bars\"},{\"id\":113,\"question\":\"The line that minimizes the sum of squared differences between the observed values and the values predicted by the model is called the:\",\"options\":[\"Mean line\",\"Median line\",\"Line of Best Fit\",\"Standard line\"],\"answer\":\"Line of Best Fit\"},{\"id\":114,\"question\":\"What will =PROPER('mCDONALD’S') return?\",\"options\":[\"McDonald's\",\"MCDONALD'S\",\"Mcdonald's\",\"mcdonald's\"],\"answer\":\"Mcdonald's\"},{\"id\":115,\"question\":\"The formula =UPPER('sales data') returns:\",\"options\":[\"SALES Data\",\"Sales Data\",\"SALES DATA\",\"sales data\"],\"answer\":\"SALES DATA\"},{\"id\":116,\"question\":\"Which statement best describes the function of TRIM?\",\"options\":[\"Removes all whitespace\",\"Removes unnecessary spaces from both ends and ensures single spaces between words\",\"Standardizes case\",\"Splits text into words\"],\"answer\":\"Removes unnecessary spaces from both ends and ensures single spaces between words\"},{\"id\":117,\"question\":\"A distribution with a Skewness value of exactly 0 is considered:\",\"options\":[\"Positively skewed\",\"Uniformly distributed\",\"Perfectly symmetric\",\"Bimodal\"],\"answer\":\"Perfectly symmetric\"},{\"id\":118,\"question\":\"A distribution with Kurtosis>3 (or excess Kurtosis>0) is called:\",\"options\":[\"Platykurtic\",\"Mesokurtic\",\"Leptokurtic\",\"Hypokurtic\"],\"answer\":\"Leptokurtic\"},{\"id\":119,\"question\":\"If you set the significance level (α) to 0.01, and the P Value is 0.05, you should:\",\"options\":[\"Reject the null hypothesis\",\"Fail to reject the null hypothesis\",\"Accept the alternative hypothesis\",\"Increase the sample size\"],\"answer\":\"Fail to reject the null hypothesis\"},{\"id\":120,\"question\":\"A larger sample size generally leads to a Standard Error that is:\",\"options\":[\"Larger\",\"Unchanged\",\"Smaller\",\"Undefined\"],\"answer\":\"Smaller\"},{\"id\":121,\"question\":\"If we reject the Null Hypothesis, it means we found enough evidence to support the:\",\"options\":[\"H0\",\"Alternative Hypothesis (Ha)\",\"Type I error\",\"Type II error\"],\"answer\":\"Alternative Hypothesis (Ha)\"},{\"id\":122,\"question\":\"To sum all values in A1:B5, you would use:\",\"options\":[\"SUM(A1:B5)\",\"SUMARRAY(A1:B5)\",\"ARRAY(A1:B5)\",\"SUM\"],\"answer\":\"SUM(A1:B5)\"},{\"id\":123,\"question\":\"Why is Relative Referencing the default behavior in spreadsheets?\",\"options\":[\"To allow formulas to be easily copied and adjusted to new locations\",\"To always refer to the same cell\",\"To prevent errors\",\"To make formulas easier to write\"],\"answer\":\"To allow formulas to be easily copied and adjusted to new locations\"},{\"id\":124,\"question\":\"If a formula needs to always reference the cell Z5 when copied, the correct reference is:\",\"options\":[\"Z5\",\"$Z$5\",\"Z$5\",\"$Z5\"],\"answer\":\"$Z$5\"},{\"id\":125,\"question\":\"The formula =RANDBETWEEN(10,50) will never return:\",\"options\":[\"10\",\"50\",\"51\",\"30\"],\"answer\":\"51\"},{\"id\":126,\"question\":\"AND(2>1,5=5,10<8) returns:\",\"options\":[\"TRUE\",\"FALSE\",\"2\",\"8\"],\"answer\":\"FALSE\"},{\"id\":127,\"question\":\"OR(1=0,2>1,3=4) returns:\",\"options\":[\"TRUE\",\"FALSE\",\"0\",\"1\"],\"answer\":\"TRUE\"},{\"id\":128,\"question\":\"REPLACE('ABCDEFG',3,2,'XX') returns:\",\"options\":[\"ABXXEFG\",\"ABCDEFG\",\"XXDEFG\",\"ABCXXFG\"],\"answer\":\"ABXXEFG\"},{\"id\":129,\"question\":\"Which is a key assumption for using LINEAR FORECASTING functions?\",\"options\":[\"The data has cyclical components\",\"The relationship between variables is exponential\",\"The relationship between variables is linear\",\"The data has many outliers\"],\"answer\":\"The relationship between variables is linear\"},{\"id\":130,\"question\":\"What language is primarily used to interact with a MySQL database?\",\"options\":[\"Python\",\"Java\",\"SQL (Structured Query Language)\",\"VBA\"],\"answer\":\"SQL (Structured Query Language)\"},{\"id\":131,\"question\":\"Which component of Power BI is used for connecting to, transforming, and loading data?\",\"options\":[\"Power Query (or Get Data)\",\"Power Map\",\"Power View\",\"DAX\"],\"answer\":\"Power Query (or Get Data)\"},{\"id\":132,\"question\":\"In SUMIFS(Sum_Range,Criteria_Range1,Criteria1), where is the Sum_Range located?\",\"options\":[\"It is always the last argument\",\"It is the first argument\",\"It must be the same size as the Criteria_Range\",\"It is optional\"],\"answer\":\"It is the first argument\"},{\"id\":133,\"question\":\"For a range containing {5,10,TRUE}, MAXA returns:\",\"options\":[\"10\",\"5\",\"TRUE\",\"11\"],\"answer\":\"10\"},{\"id\":134,\"question\":\"The MINA function treats TRUE values as:\",\"options\":[\"0\",\"1\",\"-1\",\"TRUE\"],\"answer\":\"1\"},{\"id\":135,\"question\":\"In a dataset where three values are tied for 3rd place, the RANK.AVG function will assign what rank to those three values?\",\"options\":[\"3\",\"4\",\"5\",\"4\"],\"answer\":\"5\"},{\"id\":136,\"question\":\"Which of the following is not a type of Data Validation restriction?\",\"options\":[\"Whole number\",\"List\",\"Custom formula\",\"Conditional Formatting\"],\"answer\":\"Conditional Formatting\"},{\"id\":137,\"question\":\"Using INDEX with two MATCH functions allows for a two-dimensional lookup based on:\",\"options\":[\"Row criteria only\",\"Column criteria only\",\"Both row and column criteria\",\"The value of the cell\"],\"answer\":\"Both row and column criteria\"},{\"id\":138,\"question\":\"Which delimiter is often used to separate different fields in a CSV file during the Text to Columns process?\",\"options\":[\"Semicolon (;) or Comma (,)\",\"Period (.)\",\"Hyphen (-)\",\"Asterisk (*)\"],\"answer\":\"Semicolon (;) or Comma (,)\"},{\"id\":139,\"question\":\"The Remove Duplicates feature treats two rows as duplicates only if:\",\"options\":[\"They have the same value in the first column\",\"They have the same value in all selected columns\",\"They have different values in one column\",\"They are adjacent to each other\"],\"answer\":\"They have the same value in all selected columns\"},{\"id\":140,\"question\":\"To freeze the top two rows and the first column simultaneously, you must select which cell before clicking 'Freeze Panes'?\",\"options\":[\"A1\",\"B2\",\"B3\",\"C3\"],\"answer\":\"B3\"},{\"id\":141,\"question\":\"Which of the following changes automatically updates a Pivot Chart?\",\"options\":[\"Deleting the source data\",\"Changing the chart type\",\"Filtering a field in the associated Pivot Table\",\"Manually changing the chart colors\"],\"answer\":\"Filtering a field in the associated Pivot Table\"},{\"id\":142,\"question\":\"If A1:B2 contains (13 24), TRANSPOSE(A1:B2) returns:\",\"options\":[\"(12 34)\",\"(31 42)\",\"(42 31)\",\"(13 24)\"],\"answer\":\"(12 34)\"},{\"id\":143,\"question\":\"The formula =IF(LEN(B1)<5,'Short','Long') returns 'Short' if B1 contains:\",\"options\":[\"Data Analysis\",\"Excel\",\"Four\",\"Test\"],\"answer\":\"Test\"},{\"id\":144,\"question\":\"Variance is the Standard Deviation squared. What is the unit of Variance compared to the original data?\",\"options\":[\"The same unit\",\"The square of the original unit\",\"Unitless\",\"Standard Error\"],\"answer\":\"The square of the original unit\"},{\"id\":145,\"question\":\"If a P Value is 0.10 and α=0.05, the conclusion is that the difference is:\",\"options\":[\"Statistically significant\",\"Not statistically significant\",\"Caused by chance\",\"Small\"],\"answer\":\"Not statistically significant\"},{\"id\":146,\"question\":\"SUMPRODUCT is often used instead of SUMIFS for calculations involving:\",\"options\":[\"Single criteria\",\"Complex multiple-criteria conditions in older software versions\",\"Text data only\",\"Date calculations only\"],\"answer\":\"Complex multiple-criteria conditions in older software versions\"},{\"id\":147,\"question\":\"For HLOOKUP, the result is retrieved based on a row index number specified by which argument?\",\"options\":[\"lookup_value\",\"table_array\",\"row_index_num\",\"range_lookup\"],\"answer\":\"row_index_num\"},{\"id\":148,\"question\":\"In MySQL, which command is used to retrieve data from a table?\",\"options\":[\"INSERT\",\"UPDATE\",\"SELECT\",\"DELETE\"],\"answer\":\"SELECT\"},{\"id\":149,\"question\":\"Which programming language is Power BI's primary formula language for creating measures and calculated columns?\",\"options\":[\"Python\",\"SQL\",\"DAX (Data Analysis eXpressions)\",\"M-language\"],\"answer\":\"DAX (Data Analysis eXpressions)\"}]"));}),
"[project]/pages/test/data-analytics.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// pages/test/data-analytics
__turbopack_context__.s([
    "default",
    ()=>DataAnalyticsTest
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$data$2d$analytics$2d$questions$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/data/data-analytics-questions.json (json)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
const STORAGE_KEY = "data_analytics_test_state_v1";
function DataAnalyticsTest() {
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
        "DataAnalyticsTest.useEffect": ()=>{
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
    }["DataAnalyticsTest.useEffect"], []);
    /* ---------------- SAVE STATE ---------------- */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DataAnalyticsTest.useEffect": ()=>{
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
    }["DataAnalyticsTest.useEffect"], [
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
        "DataAnalyticsTest.useEffect": ()=>{
            if (step !== "test") return;
            const block = {
                "DataAnalyticsTest.useEffect.block": (e)=>e.preventDefault()
            }["DataAnalyticsTest.useEffect.block"];
            const blockKeys = {
                "DataAnalyticsTest.useEffect.blockKeys": (e)=>{
                    const forbidden = e.key === "F12" || e.ctrlKey && e.shiftKey && [
                        "I",
                        "J",
                        "C"
                    ].includes(e.key) || e.ctrlKey && e.key === "U";
                    if (forbidden) {
                        triggerAutoSubmit("You violated the exam rules, so the test was automatically submitted. Kindly contact HR.");
                    }
                }
            }["DataAnalyticsTest.useEffect.blockKeys"];
            document.addEventListener("contextmenu", block);
            document.addEventListener("copy", block);
            document.addEventListener("cut", block);
            document.addEventListener("paste", block);
            document.addEventListener("keydown", blockKeys);
            return ({
                "DataAnalyticsTest.useEffect": ()=>{
                    document.removeEventListener("contextmenu", block);
                    document.removeEventListener("copy", block);
                    document.removeEventListener("cut", block);
                    document.removeEventListener("paste", block);
                    document.removeEventListener("keydown", blockKeys);
                }
            })["DataAnalyticsTest.useEffect"];
        }
    }["DataAnalyticsTest.useEffect"], [
        step
    ]);
    /* ---------------- QUESTIONS ---------------- */ const generateQuestions = ()=>{
        const shuffled = [
            ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$data$2d$analytics$2d$questions$2e$json__$28$json$29$__["default"]
        ].sort(()=>0.5 - Math.random());
        setQuestions(shuffled.slice(0, 50));
    };
    /* ---------------- AUTO START ---------------- */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DataAnalyticsTest.useEffect": ()=>{
            if (router.query.start === "true") {
                generateQuestions();
                setStep("test");
            }
        }
    }["DataAnalyticsTest.useEffect"], [
        router.query.start
    ]);
    /* ---------------- TIMER ---------------- */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DataAnalyticsTest.useEffect": ()=>{
            if (step !== "test") return;
            const interval = setInterval({
                "DataAnalyticsTest.useEffect.interval": ()=>{
                    setTimer({
                        "DataAnalyticsTest.useEffect.interval": (prev)=>{
                            if (prev <= 1) {
                                triggerAutoSubmit("The time is over, so the test was automatically submitted. Please contact HR for further details.");
                                clearInterval(interval);
                                return 0;
                            }
                            return prev - 1;
                        }
                    }["DataAnalyticsTest.useEffect.interval"]);
                }
            }["DataAnalyticsTest.useEffect.interval"], 1000);
            return ({
                "DataAnalyticsTest.useEffect": ()=>clearInterval(interval)
            })["DataAnalyticsTest.useEffect"];
        }
    }["DataAnalyticsTest.useEffect"], [
        step
    ]);
    /* ---------------- TAB SWITCH ---------------- */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DataAnalyticsTest.useEffect": ()=>{
            if (step !== "test") return;
            const handleVisibility = {
                "DataAnalyticsTest.useEffect.handleVisibility": ()=>{
                    if (document.visibilityState === "hidden") {
                        setTabCount({
                            "DataAnalyticsTest.useEffect.handleVisibility": (prev)=>{
                                const count = prev + 1;
                                if (count <= 2) {
                                    alert(`Warning ${count}/3: Tab switching is not allowed.`);
                                    return count;
                                }
                                triggerAutoSubmit("You violated the rules 3 times, so the test was submitted. Kindly contact HR.");
                                return count;
                            }
                        }["DataAnalyticsTest.useEffect.handleVisibility"]);
                    }
                }
            }["DataAnalyticsTest.useEffect.handleVisibility"];
            document.addEventListener("visibilitychange", handleVisibility);
            return ({
                "DataAnalyticsTest.useEffect": ()=>document.removeEventListener("visibilitychange", handleVisibility)
            })["DataAnalyticsTest.useEffect"];
        }
    }["DataAnalyticsTest.useEffect"], [
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
            title: "Data Analytics Test Submitted",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-center text-red-600 font-semibold mb-6",
                    children: autoSubmitReason || "Your Data Analytics test was successfully submitted."
                }, void 0, false, {
                    fileName: "[project]/pages/test/data-analytics.js",
                    lineNumber: 165,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>router.push("/"),
                    className: "w-full bg-blue-600 text-white py-2 rounded-lg font-semibold",
                    children: "OK"
                }, void 0, false, {
                    fileName: "[project]/pages/test/data-analytics.js",
                    lineNumber: 170,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/pages/test/data-analytics.js",
            lineNumber: 164,
            columnNumber: 7
        }, this);
    }
    /* ---------------- INSTRUCTIONS ---------------- */ if (step === "instructions") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CenteredCard, {
            title: "Data Analytics Test Instructions",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Instruction, {
                    children: "50 questions – all mandatory"
                }, void 0, false, {
                    fileName: "[project]/pages/test/data-analytics.js",
                    lineNumber: 184,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Instruction, {
                    children: "Time limit: 20 minutes"
                }, void 0, false, {
                    fileName: "[project]/pages/test/data-analytics.js",
                    lineNumber: 185,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Instruction, {
                    children: "No tab switch / copy / inspect"
                }, void 0, false, {
                    fileName: "[project]/pages/test/data-analytics.js",
                    lineNumber: 186,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Instruction, {
                    children: "Violations → auto submit"
                }, void 0, false, {
                    fileName: "[project]/pages/test/data-analytics.js",
                    lineNumber: 187,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PrimaryButton, {
                    className: "mt-6",
                    onClick: ()=>window.open("/test/data-analytics?start=true", "_blank"),
                    children: "Start Data Analytics Test"
                }, void 0, false, {
                    fileName: "[project]/pages/test/data-analytics.js",
                    lineNumber: 189,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/pages/test/data-analytics.js",
            lineNumber: 183,
            columnNumber: 7
        }, this);
    }
    /* ---------------- LOGIN ---------------- */ if (step === "login") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CenteredCard, {
            title: "Data Analytics Online Assessment",
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
                        fileName: "[project]/pages/test/data-analytics.js",
                        lineNumber: 212,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Input, {
                        placeholder: "Email ID"
                    }, void 0, false, {
                        fileName: "[project]/pages/test/data-analytics.js",
                        lineNumber: 213,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Input, {
                        placeholder: "Mobile Number"
                    }, void 0, false, {
                        fileName: "[project]/pages/test/data-analytics.js",
                        lineNumber: 214,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Input, {
                        placeholder: "College / Company"
                    }, void 0, false, {
                        fileName: "[project]/pages/test/data-analytics.js",
                        lineNumber: 215,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PrimaryButton, {
                        children: "Proceed"
                    }, void 0, false, {
                        fileName: "[project]/pages/test/data-analytics.js",
                        lineNumber: 216,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/test/data-analytics.js",
                lineNumber: 205,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/pages/test/data-analytics.js",
            lineNumber: 204,
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
                        children: "Data Analytics Test"
                    }, void 0, false, {
                        fileName: "[project]/pages/test/data-analytics.js",
                        lineNumber: 226,
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
                        fileName: "[project]/pages/test/data-analytics.js",
                        lineNumber: 227,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/test/data-analytics.js",
                lineNumber: 225,
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
                                    fileName: "[project]/pages/test/data-analytics.js",
                                    lineNumber: 235,
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
                                        fileName: "[project]/pages/test/data-analytics.js",
                                        lineNumber: 239,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, q.id, true, {
                            fileName: "[project]/pages/test/data-analytics.js",
                            lineNumber: 234,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>submitTest(),
                        className: "w-full bg-green-600 text-white py-3 rounded-xl font-bold",
                        children: "Submit Data Analytics Test"
                    }, void 0, false, {
                        fileName: "[project]/pages/test/data-analytics.js",
                        lineNumber: 256,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/test/data-analytics.js",
                lineNumber: 232,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/test/data-analytics.js",
        lineNumber: 224,
        columnNumber: 5
    }, this);
}
_s(DataAnalyticsTest, "k503SsbTVcKAmIrbOrTe4ABWVEw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = DataAnalyticsTest;
/* ---------------- UI HELPERS ---------------- */ const CenteredCard = ({ title, children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex items-center justify-center bg-gray-100 px-3",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white p-6 rounded-2xl shadow w-full max-w-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-xl font-bold text-center mb-5",
                    children: title
                }, void 0, false, {
                    fileName: "[project]/pages/test/data-analytics.js",
                    lineNumber: 272,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                children
            ]
        }, void 0, true, {
            fileName: "[project]/pages/test/data-analytics.js",
            lineNumber: 271,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/pages/test/data-analytics.js",
        lineNumber: 270,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c1 = CenteredCard;
const Input = ({ placeholder })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        required: true,
        placeholder: placeholder,
        className: "w-full border px-3 py-2 rounded-lg"
    }, void 0, false, {
        fileName: "[project]/pages/test/data-analytics.js",
        lineNumber: 279,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c2 = Input;
const PrimaryButton = ({ children, onClick, className = "" })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        className: `w-full bg-blue-600 text-white py-2 rounded-lg font-semibold ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/pages/test/data-analytics.js",
        lineNumber: 287,
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
        fileName: "[project]/pages/test/data-analytics.js",
        lineNumber: 296,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c4 = Instruction;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "DataAnalyticsTest");
__turbopack_context__.k.register(_c1, "CenteredCard");
__turbopack_context__.k.register(_c2, "Input");
__turbopack_context__.k.register(_c3, "PrimaryButton");
__turbopack_context__.k.register(_c4, "Instruction");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/test/data-analytics.js [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/test/data-analytics";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/test/data-analytics.js [client] (ecmascript)");
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
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/pages/test/data-analytics.js\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/test/data-analytics.js [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__f3a13413._.js.map