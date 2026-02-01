module.exports = [
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/react-dom [external] (react-dom, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react-dom", () => require("react-dom"));

module.exports = mod;
}),
"[project]/pages/test/python.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PythonTest
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
"use client";
;
;
;
function PythonTest() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("loading");
    const [timer, setTimer] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(20 * 60);
    const [questions, setQuestions] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [answers, setAnswers] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({});
    const [tabCount, setTabCount] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [autoSubmitReason, setAutoSubmitReason] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const submittedRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(false);
    /* ---------------- FETCH PYTHON QUESTIONS ---------------- */ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (router.query.start === "true") {
            fetch(`/api/getQuestions?category=python`).then((res)=>res.json()).then((data)=>{
                if (!data || data.length === 0) {
                    alert("No Python questions found in database.");
                    router.push("/");
                    return;
                }
                setQuestions(data);
                setStep("test");
            }).catch(()=>{
                alert("Error loading questions.");
                router.push("/");
            });
        }
    }, [
        router.query.start
    ]);
    /* ---------------- TIMER ---------------- */ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (step !== "test") return;
        const interval = setInterval(()=>{
            setTimer((prev)=>{
                if (prev <= 1) {
                    triggerAutoSubmit("The exam time has ended, so the test was automatically submitted. Kindly contact HR.");
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return ()=>clearInterval(interval);
    }, [
        step
    ]);
    /* ---------------- SECURITY ---------------- */ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (step !== "test") return;
        const block = (e)=>e.preventDefault();
        const blockKeys = (e)=>{
            if (e.key === "F12" || e.ctrlKey && e.shiftKey && [
                "I",
                "J",
                "C"
            ].includes(e.key) || e.ctrlKey && e.key === "U") {
                triggerAutoSubmit("You violated the exam rules, so the test was automatically submitted. Kindly contact HR.");
            }
        };
        document.addEventListener("contextmenu", block);
        document.addEventListener("copy", block);
        document.addEventListener("cut", block);
        document.addEventListener("paste", block);
        document.addEventListener("keydown", blockKeys);
        return ()=>{
            document.removeEventListener("contextmenu", block);
            document.removeEventListener("copy", block);
            document.removeEventListener("cut", block);
            document.removeEventListener("paste", block);
            document.removeEventListener("keydown", blockKeys);
        };
    }, [
        step
    ]);
    /* ---------------- TAB SWITCH DETECTION ---------------- */ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (step !== "test") return;
        const handleVisibility = ()=>{
            if (document.visibilityState === "hidden") {
                setTabCount((prev)=>{
                    const count = prev + 1;
                    if (count === 1 || count === 2) {
                        alert(`Warning ${count}/3: Tab switching is not allowed.`);
                    }
                    if (count >= 3) {
                        triggerAutoSubmit("You violated the rules 3 times, so the test was automatically submitted. Kindly contact HR.");
                    }
                    return count;
                });
            }
        };
        document.addEventListener("visibilitychange", handleVisibility);
        return ()=>document.removeEventListener("visibilitychange", handleVisibility);
    }, [
        step
    ]);
    /* ---------------- AUTO SUBMIT ---------------- */ const triggerAutoSubmit = (message)=>{
        if (submittedRef.current) return;
        submittedRef.current = true;
        setAutoSubmitReason(message);
        submitTest(true);
    };
    /* ---------------- SUBMIT ---------------- */ const submitTest = async (forced = false)=>{
        const studentId = localStorage.getItem("studentId");
        await fetch("/api/saveResult", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                studentId,
                answers,
                questions,
                category: "python"
            })
        });
        setStep("submitted");
    };
    const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
    const seconds = String(timer % 60).padStart(2, "0");
    if (step === "submitted") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(CenteredCard, {
            title: "Python Test Submitted",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    className: "text-red-600 text-center mb-4 font-semibold",
                    children: autoSubmitReason || "Your test has been submitted successfully."
                }, void 0, false, {
                    fileName: "[project]/pages/test/python.js",
                    lineNumber: 153,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                    onClick: ()=>router.push("/"),
                    className: "w-full bg-blue-600 text-white py-2 rounded",
                    children: "OK"
                }, void 0, false, {
                    fileName: "[project]/pages/test/python.js",
                    lineNumber: 156,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/pages/test/python.js",
            lineNumber: 152,
            columnNumber: 7
        }, this);
    }
    if (step === "loading") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(CenteredCard, {
            title: "Loading Python Questions...",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                className: "text-center",
                children: "Please wait..."
            }, void 0, false, {
                fileName: "[project]/pages/test/python.js",
                lineNumber: 169,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/pages/test/python.js",
            lineNumber: 168,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-100 px-3 py-4 select-none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "sticky top-0 bg-white shadow rounded-xl px-4 py-3 flex justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        className: "font-bold",
                        children: "Python Test"
                    }, void 0, false, {
                        fileName: "[project]/pages/test/python.js",
                        lineNumber: 177,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: "text-red-600 font-bold",
                        children: [
                            "⏱ ",
                            minutes,
                            ":",
                            seconds
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/test/python.js",
                        lineNumber: 178,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/test/python.js",
                lineNumber: 176,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "max-w-3xl mx-auto mt-4",
                children: [
                    questions.map((q, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "bg-white p-4 rounded-xl shadow mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: "font-semibold mb-3",
                                    children: [
                                        i + 1,
                                        ". ",
                                        q.question
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/test/python.js",
                                    lineNumber: 184,
                                    columnNumber: 13
                                }, this),
                                [
                                    q.option1,
                                    q.option2,
                                    q.option3,
                                    q.option4
                                ].map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setAnswers((p)=>({
                                                    ...p,
                                                    [q.id]: opt
                                                })),
                                        className: `w-full text-left px-4 py-2 mb-2 rounded border ${answers[q.id] === opt ? "bg-blue-600 text-white" : "bg-white"}`,
                                        children: opt
                                    }, opt, false, {
                                        fileName: "[project]/pages/test/python.js",
                                        lineNumber: 186,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, q.id, true, {
                            fileName: "[project]/pages/test/python.js",
                            lineNumber: 183,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>submitTest(),
                        className: "w-full bg-green-600 text-white py-3 rounded-xl font-bold",
                        children: "Submit Python Test"
                    }, void 0, false, {
                        fileName: "[project]/pages/test/python.js",
                        lineNumber: 199,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/test/python.js",
                lineNumber: 181,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/test/python.js",
        lineNumber: 175,
        columnNumber: 5
    }, this);
}
const CenteredCard = ({ title, children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex items-center justify-center bg-gray-100 px-3",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "bg-white p-6 rounded-xl shadow w-full max-w-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                    className: "text-xl font-bold text-center mb-4",
                    children: title
                }, void 0, false, {
                    fileName: "[project]/pages/test/python.js",
                    lineNumber: 213,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                children
            ]
        }, void 0, true, {
            fileName: "[project]/pages/test/python.js",
            lineNumber: 212,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/pages/test/python.js",
        lineNumber: 211,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0ff9d72c._.js.map