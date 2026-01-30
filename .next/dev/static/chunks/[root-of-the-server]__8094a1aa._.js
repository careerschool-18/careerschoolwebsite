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
"[project]/pages/NewYearOffer2026.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NewYearOffer2026
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
function NewYearOffer2026() {
    _s();
    const formRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const reviewTrack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [activeReview, setActiveReview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [openSyllabusIndex, setOpenSyllabusIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isFormExpanded, setIsFormExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    /* ================= LOAD HUBSPOT SCRIPT ================= */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NewYearOffer2026.useEffect": ()=>{
            const script = document.createElement("script");
            script.src = "https://js-na2.hsforms.net/forms/embed/243742367.js";
            script.async = true;
            document.body.appendChild(script);
            return ({
                "NewYearOffer2026.useEffect": ()=>{
                    if (document.body.contains(script)) {
                        document.body.removeChild(script);
                    }
                }
            })["NewYearOffer2026.useEffect"];
        }
    }["NewYearOffer2026.useEffect"], []);
    /* ================= REVIEWS ================= */ const reviews = [
        {
            name: "Pavithra",
            role: "Python with AI",
            text: "I recently completed my Python with AI training at Careerschool HR Solutions. The sessions were clear and practical."
        },
        {
            name: "Gayathri",
            role: "Data Analytics",
            text: "The training and internship gave me real-time exposure to data handling, analysis, and reporting."
        },
        {
            name: "Mukthar Ahamed R",
            role: "Data Analyst Intern",
            text: "I gained hands-on experience in dashboards, SQL, Excel, and real-time projects."
        },
        {
            name: "Hema Sai",
            role: "Python Full Stack Intern",
            text: "Receiving the Star Student Award motivated me to keep learning and improving."
        }
    ];
    /* ================= REVIEW AUTO SLIDE (CENTERED) ================= */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NewYearOffer2026.useEffect": ()=>{
            if (!reviewTrack.current) return;
            const isMobile = window.innerWidth <= 768;
            const interval = setInterval({
                "NewYearOffer2026.useEffect.interval": ()=>{
                    if (!reviewTrack.current) return;
                    const cards = reviewTrack.current.children;
                    if (!cards.length) return;
                    const cardWidth = cards[0].offsetWidth + 20;
                    const total = reviews.length;
                    setActiveReview({
                        "NewYearOffer2026.useEffect.interval": (prev)=>{
                            const next = (prev + 1) % total;
                            if (isMobile) {
                                // Simple slide on mobile
                                reviewTrack.current.style.transform = `translateX(-${next * cardWidth}px)`;
                            } else {
                                // Centered slide on desktop
                                const containerWidth = reviewTrack.current.parentElement.offsetWidth;
                                const offset = next * cardWidth - (containerWidth / 2 - cardWidth / 2);
                                reviewTrack.current.style.transform = `translateX(-${offset}px)`;
                            }
                            return next;
                        }
                    }["NewYearOffer2026.useEffect.interval"]);
                }
            }["NewYearOffer2026.useEffect.interval"], 3000);
            return ({
                "NewYearOffer2026.useEffect": ()=>clearInterval(interval)
            })["NewYearOffer2026.useEffect"];
        }
    }["NewYearOffer2026.useEffect"], [
        reviews.length
    ]);
    /* ================= HANDLERS ================= */ const handleLogoClick = ()=>{
        window.location.href = "/";
    };
    const handleEnrollClick = ()=>{
        formRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    };
    const toggleFormExpand = ()=>{
        setIsFormExpanded((prev)=>!prev);
    };
    /* ================= COURSES ================= */ const courses = [
        {
            title: "ZOHO Payroll",
            image: "/Newyear/ZOHO Payroll.png",
            syllabus: [
                "Payroll Cycle",
                "Taxation (Income Tax,TDS)",
                "Statutory Compliance (PF, ESI, PT)",
                "Leave Management System (LMS)",
                "ZOHO Payroll Account Setup",
                "Implementation ZOHO Payroll",
                "Configuring Pay Schedule",
                "Integration with ZOHO Softwares",
                "Automation of Payroll Process",
                "Compliance and Reporting"
            ]
        },
        {
            title: "Java Mastery Program",
            image: "/Newyear/java-svg.svg",
            syllabus: [
                "Core Java & OOPS",
                "Collections & Exception Handling",
                "JDBC & MySQL",
                "Spring & Spring Boot",
                "REST APIs"
            ]
        },
        {
            title: "Python Pro Development",
            image: "/Newyear/python-svg.svg",
            syllabus: [
                "Python Fundamentals",
                "OOPS with Python",
                "Django & Flask",
                "Automation & Scripting",
                "Mini Projects"
            ]
        },
        {
            title: "Data Analytics & Visualization",
            image: "/Newyear/DA-svg.svg",
            syllabus: [
                "Excel & Advanced Formulas",
                "SQL Concepts",
                "Power BI",
                "LIVE Project"
            ]
        },
        {
            title: "HR Analytics",
            image: "/Newyear/HRAnalystics.svg",
            syllabus: [
                "Talent Acquisition",
                "Talent Management",
                "HR Operations",
                "Analytics for HR",
                "Professional Skill Development"
            ]
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                id: "81fd44d5a8cd1dae",
                children: ':root{--primary:#1ecbff;--primary-dark:#0fa0cf;--bg-dark:#0b1a24;--text-light:#d6e9f5}*{box-sizing:border-box;margin:0;padding:0}body{background:radial-gradient(circle at top,#0e2a3f,var(--bg-dark));color:#fff;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif}.white-header-left{z-index:5000;background:#fff;align-items:center;padding:8px 20px;display:flex;position:fixed;top:0;left:0;right:0;box-shadow:0 2px 10px #0000001a}.logo-container-left{cursor:pointer;align-items:center;gap:20px;display:flex}.logo-img{height:42px}.hero{align-items:center;min-height:100vh;padding:140px 16px 100px;display:flex;position:relative}.hero-bg{position:absolute;inset:0}.hero-bg img{object-fit:cover;width:100%;height:100%}.hero-overlay{background:linear-gradient(#050f16a6,#050f16e6);position:absolute;inset:0}.hero-inner{z-index:1;grid-template-columns:1.1fr .9fr;gap:40px;max-width:1100px;margin:auto;font-weight:600;display:grid;position:relative}.hero h1{margin-bottom:16px;font-size:max(32px,min(5vw,56px));font-weight:600}.hero ul{margin-top:20px;font-weight:600;list-style:none}.hero li{margin-bottom:12px}.hero li:before{content:"✓";color:var(--primary);margin-right:8px}.form-card{background:#fff;border-radius:18px;padding:12px;position:relative}.form-container{max-height:400px;transition:max-height .5s;overflow:hidden}.form-container.expanded{max-height:2000px}.form-expand-btn{background:linear-gradient(135deg,var(--primary),var(--primary-dark));color:#fff;cursor:pointer;border:none;border-radius:10px;justify-content:center;align-items:center;gap:8px;width:100%;margin-top:16px;padding:12px;font-weight:600;transition:all .3s;display:flex}.form-expand-btn:hover{transform:translateY(-2px);box-shadow:0 4px 12px #1ecbff4d}.expand-arrow{font-size:18px;transition:transform .3s}.expand-arrow.rotated{transform:rotate(180deg)}.form-card input,.form-card select{border:1px solid #ddd;border-radius:10px;width:100%;margin-bottom:14px;padding:14px}.primary-btn{background:linear-gradient(135deg,var(--primary),var(--primary-dark));color:#fff;cursor:pointer;border:none;border-radius:12px;width:100%;padding:16px;font-weight:700}.section{max-width:1100px;margin:auto;padding:70px 16px}.courses{grid-template-columns:repeat(3,1fr);gap:20px;display:grid}@media (width<=900px){.courses,.hero-inner,.courses{grid-template-columns:1fr}.courses>.course{grid-column:auto;justify-self:stretch}.form-container{max-height:350px}}.course{color:#111;background:#fff;border-radius:16px;padding:22px}.course-head{align-items:center;gap:14px;margin-bottom:14px;display:flex}.course-actions{gap:10px;display:flex}.btn-syllabus,.btn-enroll{cursor:pointer;border-radius:10px;flex:1;padding:11px;font-weight:700}.btn-syllabus{background:var(--primary);color:#fff;border:none}.btn-enroll{border:2px solid var(--primary);color:var(--primary);background:0 0}.syllabus{background:#f5faff;border-radius:10px;margin-top:14px;padding:14px}.spotlight-section{background:radial-gradient(circle,#0b1f2a,#020a10 70%);border-radius:28px;padding:80px 24px}.review-carousel{overflow:hidden}.review-track{will-change:transform;align-items:center;gap:20px;transition:transform .6s;display:flex}.review-card{color:#111;text-align:center;background:#fff;border-radius:16px;flex-shrink:0;width:360px;padding:26px;transition:all .45s}.active-review{opacity:1;transform:scale(1.05);box-shadow:0 25px 70px #0009}.side-review{opacity:.35;filter:blur(1px);pointer-events:none;transform:scale(.88)}@media (width<=768px){.review-card{margin:0 auto}.side-review{display:none}}.review-name{font-size:18px;font-weight:700}.review-role{color:#666;margin-bottom:6px;font-size:14px;display:block}.stars{color:gold;margin-bottom:10px;font-size:18px}.review-subtext{text-align:center;color:#9fb3c8;max-width:520px;margin:0 auto 50px;font-size:15px}'
            }, void 0, false, void 0, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "jsx-81fd44d5a8cd1dae" + " " + "white-header-left",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onClick: handleLogoClick,
                    className: "jsx-81fd44d5a8cd1dae" + " " + "logo-container-left",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "/Nav Logo/CSHR - Nav Logo.png",
                            className: "jsx-81fd44d5a8cd1dae" + " " + "logo-img"
                        }, void 0, false, {
                            fileName: "[project]/pages/NewYearOffer2026.js",
                            lineNumber: 525,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "/Nav Logo/CSIT - Nav Logo.png",
                            className: "jsx-81fd44d5a8cd1dae" + " " + "logo-img"
                        }, void 0, false, {
                            fileName: "[project]/pages/NewYearOffer2026.js",
                            lineNumber: 526,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/NewYearOffer2026.js",
                    lineNumber: 524,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/NewYearOffer2026.js",
                lineNumber: 523,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "jsx-81fd44d5a8cd1dae" + " " + "hero",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-81fd44d5a8cd1dae" + " " + "hero-bg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/Newyear/Banner.png",
                                className: "jsx-81fd44d5a8cd1dae"
                            }, void 0, false, {
                                fileName: "[project]/pages/NewYearOffer2026.js",
                                lineNumber: 533,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-81fd44d5a8cd1dae" + " " + "hero-overlay"
                            }, void 0, false, {
                                fileName: "[project]/pages/NewYearOffer2026.js",
                                lineNumber: 534,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/NewYearOffer2026.js",
                        lineNumber: 532,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-81fd44d5a8cd1dae" + " " + "hero-inner",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-81fd44d5a8cd1dae",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "jsx-81fd44d5a8cd1dae",
                                        children: "Open New Opportunities in 2026 🚀"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/NewYearOffer2026.js",
                                        lineNumber: 539,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-81fd44d5a8cd1dae",
                                        children: "New Year Special Offer on Job-Ready Skill Programs"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/NewYearOffer2026.js",
                                        lineNumber: 540,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "jsx-81fd44d5a8cd1dae",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "jsx-81fd44d5a8cd1dae",
                                                children: "Industry aligned curriculum"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/NewYearOffer2026.js",
                                                lineNumber: 542,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "jsx-81fd44d5a8cd1dae",
                                                children: "Live mentor support"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/NewYearOffer2026.js",
                                                lineNumber: 543,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "jsx-81fd44d5a8cd1dae",
                                                children: "Placement assistance"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/NewYearOffer2026.js",
                                                lineNumber: 544,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "jsx-81fd44d5a8cd1dae",
                                                children: "Lifetime access"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/NewYearOffer2026.js",
                                                lineNumber: 545,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/NewYearOffer2026.js",
                                        lineNumber: 541,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/NewYearOffer2026.js",
                                lineNumber: 538,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: formRef,
                                className: "jsx-81fd44d5a8cd1dae" + " " + "form-card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-81fd44d5a8cd1dae" + " " + `form-container ${isFormExpanded ? 'expanded' : ''}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            "data-region": "na2",
                                            "data-form-id": "0237c445-e852-43ea-9b9f-091cd6c000e5",
                                            "data-portal-id": "243742367",
                                            className: "jsx-81fd44d5a8cd1dae" + " " + "hs-form-frame"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/NewYearOffer2026.js",
                                            lineNumber: 552,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/NewYearOffer2026.js",
                                        lineNumber: 551,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: toggleFormExpand,
                                        className: "jsx-81fd44d5a8cd1dae" + " " + "form-expand-btn",
                                        children: [
                                            isFormExpanded ? 'Show Less' : 'Show More Fields',
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-81fd44d5a8cd1dae" + " " + `expand-arrow ${isFormExpanded ? 'rotated' : ''}`,
                                                children: "▼"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/NewYearOffer2026.js",
                                                lineNumber: 562,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/NewYearOffer2026.js",
                                        lineNumber: 560,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/NewYearOffer2026.js",
                                lineNumber: 549,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/NewYearOffer2026.js",
                        lineNumber: 537,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/NewYearOffer2026.js",
                lineNumber: 531,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "jsx-81fd44d5a8cd1dae" + " " + "section",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        style: {
                            textAlign: "center",
                            marginBottom: 36
                        },
                        className: "jsx-81fd44d5a8cd1dae",
                        children: "Choose Your Learning Path"
                    }, void 0, false, {
                        fileName: "[project]/pages/NewYearOffer2026.js",
                        lineNumber: 572,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-81fd44d5a8cd1dae" + " " + "courses",
                        children: courses.map((course, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-81fd44d5a8cd1dae" + " " + "course",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-81fd44d5a8cd1dae" + " " + "course-head",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: course.image,
                                                width: "48",
                                                className: "jsx-81fd44d5a8cd1dae"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/NewYearOffer2026.js",
                                                lineNumber: 580,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "jsx-81fd44d5a8cd1dae",
                                                children: course.title
                                            }, void 0, false, {
                                                fileName: "[project]/pages/NewYearOffer2026.js",
                                                lineNumber: 581,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/NewYearOffer2026.js",
                                        lineNumber: 579,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-81fd44d5a8cd1dae" + " " + "course-actions",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setOpenSyllabusIndex(openSyllabusIndex === i ? null : i),
                                                className: "jsx-81fd44d5a8cd1dae" + " " + "btn-syllabus",
                                                children: "View Syllabus"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/NewYearOffer2026.js",
                                                lineNumber: 585,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleEnrollClick,
                                                className: "jsx-81fd44d5a8cd1dae" + " " + "btn-enroll",
                                                children: "Enroll"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/NewYearOffer2026.js",
                                                lineNumber: 593,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/NewYearOffer2026.js",
                                        lineNumber: 584,
                                        columnNumber: 15
                                    }, this),
                                    openSyllabusIndex === i && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "jsx-81fd44d5a8cd1dae" + " " + "syllabus",
                                        children: course.syllabus.map((item, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "jsx-81fd44d5a8cd1dae",
                                                children: item
                                            }, j, false, {
                                                fileName: "[project]/pages/NewYearOffer2026.js",
                                                lineNumber: 601,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/pages/NewYearOffer2026.js",
                                        lineNumber: 599,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/pages/NewYearOffer2026.js",
                                lineNumber: 578,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/pages/NewYearOffer2026.js",
                        lineNumber: 576,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/NewYearOffer2026.js",
                lineNumber: 571,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "jsx-81fd44d5a8cd1dae" + " " + "section spotlight-section",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        style: {
                            textAlign: "center"
                        },
                        className: "jsx-81fd44d5a8cd1dae",
                        children: "What Students Love About Us"
                    }, void 0, false, {
                        fileName: "[project]/pages/NewYearOffer2026.js",
                        lineNumber: 612,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "jsx-81fd44d5a8cd1dae" + " " + "review-subtext",
                        children: "Real Google reviews from students who transformed their careers with us"
                    }, void 0, false, {
                        fileName: "[project]/pages/NewYearOffer2026.js",
                        lineNumber: 613,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-81fd44d5a8cd1dae" + " " + "review-carousel",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: reviewTrack,
                            className: "jsx-81fd44d5a8cd1dae" + " " + "review-track",
                            children: reviews.map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-81fd44d5a8cd1dae" + " " + `review-card ${i === activeReview ? "active-review" : "side-review"}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-81fd44d5a8cd1dae" + " " + "review-name",
                                            children: r.name
                                        }, void 0, false, {
                                            fileName: "[project]/pages/NewYearOffer2026.js",
                                            lineNumber: 626,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-81fd44d5a8cd1dae" + " " + "review-role",
                                            children: r.role
                                        }, void 0, false, {
                                            fileName: "[project]/pages/NewYearOffer2026.js",
                                            lineNumber: 627,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-81fd44d5a8cd1dae" + " " + "stars",
                                            children: "★★★★★"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/NewYearOffer2026.js",
                                            lineNumber: 628,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-81fd44d5a8cd1dae",
                                            children: r.text
                                        }, void 0, false, {
                                            fileName: "[project]/pages/NewYearOffer2026.js",
                                            lineNumber: 629,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/pages/NewYearOffer2026.js",
                                    lineNumber: 620,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/pages/NewYearOffer2026.js",
                            lineNumber: 618,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pages/NewYearOffer2026.js",
                        lineNumber: 617,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/NewYearOffer2026.js",
                lineNumber: 611,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(NewYearOffer2026, "o/Y9UUWzvYHzZQxAq5Eyu+BeHA8=");
_c = NewYearOffer2026;
var _c;
__turbopack_context__.k.register(_c, "NewYearOffer2026");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/NewYearOffer2026.js [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/NewYearOffer2026";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/NewYearOffer2026.js [client] (ecmascript)");
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
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/pages/NewYearOffer2026\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/NewYearOffer2026.js [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__8094a1aa._.js.map