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
"[project]/pages/test/data-analytics.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// pages/test/data-analytics
__turbopack_context__.s([
    "default",
    ()=>DataAnalyticsTest
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../../data/data-analytics-questions.json'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
;
;
const STORAGE_KEY = "data_analytics_test_state_v1";
function DataAnalyticsTest() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    /* ---------------- STATES ---------------- */ const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("login");
    const [timer, setTimer] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(20 * 60);
    const [questions, setQuestions] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [answers, setAnswers] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({});
    const [tabCount, setTabCount] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [autoSubmitReason, setAutoSubmitReason] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    /* ---------------- REFS ---------------- */ const submittedRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(false);
    /* ---------------- LOAD SAVED STATE ---------------- */ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const data = JSON.parse(saved);
            setStep(data.step);
            setTimer(data.timer);
            setQuestions(data.questions || []);
            setAnswers(data.answers || {});
            setTabCount(data.tabCount || 0);
        }
    }, []);
    /* ---------------- SAVE STATE ---------------- */ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (step === "test") {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                step,
                timer,
                questions,
                answers,
                tabCount
            }));
        }
    }, [
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
    /* ---------------- SECURITY BLOCKS ---------------- */ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (step !== "test") return;
        const block = (e)=>e.preventDefault();
        const blockKeys = (e)=>{
            const forbidden = e.key === "F12" || e.ctrlKey && e.shiftKey && [
                "I",
                "J",
                "C"
            ].includes(e.key) || e.ctrlKey && e.key === "U";
            if (forbidden) {
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
    /* ---------------- QUESTIONS ---------------- */ const generateQuestions = ()=>{
        const shuffled = [
            ...questionBank
        ].sort(()=>0.5 - Math.random());
        setQuestions(shuffled.slice(0, 50));
    };
    /* ---------------- AUTO START ---------------- */ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (router.query.start === "true") {
            generateQuestions();
            setStep("test");
        }
    }, [
        router.query.start
    ]);
    /* ---------------- TIMER ---------------- */ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (step !== "test") return;
        const interval = setInterval(()=>{
            setTimer((prev)=>{
                if (prev <= 1) {
                    triggerAutoSubmit("The time is over, so the test was automatically submitted. Please contact HR for further details.");
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
    /* ---------------- TAB SWITCH ---------------- */ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (step !== "test") return;
        const handleVisibility = ()=>{
            if (document.visibilityState === "hidden") {
                setTabCount((prev)=>{
                    const count = prev + 1;
                    if (count <= 2) {
                        alert(`Warning ${count}/3: Tab switching is not allowed.`);
                        return count;
                    }
                    triggerAutoSubmit("You violated the rules 3 times, so the test was submitted. Kindly contact HR.");
                    return count;
                });
            }
        };
        document.addEventListener("visibilitychange", handleVisibility);
        return ()=>document.removeEventListener("visibilitychange", handleVisibility);
    }, [
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(CenteredCard, {
            title: "Data Analytics Test Submitted",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    className: "text-center text-red-600 font-semibold mb-6",
                    children: autoSubmitReason || "Your Data Analytics test was successfully submitted."
                }, void 0, false, {
                    fileName: "[project]/pages/test/data-analytics.js",
                    lineNumber: 165,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(CenteredCard, {
            title: "Data Analytics Test Instructions",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Instruction, {
                    children: "50 questions – all mandatory"
                }, void 0, false, {
                    fileName: "[project]/pages/test/data-analytics.js",
                    lineNumber: 184,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Instruction, {
                    children: "Time limit: 20 minutes"
                }, void 0, false, {
                    fileName: "[project]/pages/test/data-analytics.js",
                    lineNumber: 185,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Instruction, {
                    children: "No tab switch / copy / inspect"
                }, void 0, false, {
                    fileName: "[project]/pages/test/data-analytics.js",
                    lineNumber: 186,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Instruction, {
                    children: "Violations → auto submit"
                }, void 0, false, {
                    fileName: "[project]/pages/test/data-analytics.js",
                    lineNumber: 187,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(PrimaryButton, {
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(CenteredCard, {
            title: "Data Analytics Online Assessment",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                onSubmit: (e)=>{
                    e.preventDefault();
                    setStep("instructions");
                },
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Input, {
                        placeholder: "Full Name"
                    }, void 0, false, {
                        fileName: "[project]/pages/test/data-analytics.js",
                        lineNumber: 212,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Input, {
                        placeholder: "Email ID"
                    }, void 0, false, {
                        fileName: "[project]/pages/test/data-analytics.js",
                        lineNumber: 213,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Input, {
                        placeholder: "Mobile Number"
                    }, void 0, false, {
                        fileName: "[project]/pages/test/data-analytics.js",
                        lineNumber: 214,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Input, {
                        placeholder: "College / Company"
                    }, void 0, false, {
                        fileName: "[project]/pages/test/data-analytics.js",
                        lineNumber: 215,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(PrimaryButton, {
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
    /* ---------------- TEST PAGE ---------------- */ return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-100 px-3 py-4 select-none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "sticky top-0 bg-white shadow rounded-xl px-4 py-3 flex justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        className: "font-bold",
                        children: "Data Analytics Test"
                    }, void 0, false, {
                        fileName: "[project]/pages/test/data-analytics.js",
                        lineNumber: 226,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
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
                                    fileName: "[project]/pages/test/data-analytics.js",
                                    lineNumber: 235,
                                    columnNumber: 13
                                }, this),
                                q.options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
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
/* ---------------- UI HELPERS ---------------- */ const CenteredCard = ({ title, children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex items-center justify-center bg-gray-100 px-3",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "bg-white p-6 rounded-2xl shadow w-full max-w-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
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
const Input = ({ placeholder })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
        required: true,
        placeholder: placeholder,
        className: "w-full border px-3 py-2 rounded-lg"
    }, void 0, false, {
        fileName: "[project]/pages/test/data-analytics.js",
        lineNumber: 279,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const PrimaryButton = ({ children, onClick, className = "" })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
        onClick: onClick,
        className: `w-full bg-blue-600 text-white py-2 rounded-lg font-semibold ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/pages/test/data-analytics.js",
        lineNumber: 287,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const Instruction = ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
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
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2401cecc._.js.map