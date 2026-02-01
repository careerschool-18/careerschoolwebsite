module.exports = [
"[project]/pages/test/python.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PythonTest
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
(()=>{
    const e = new Error("Cannot find module '@/data/pythonQuestions'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
"use client";
;
;
;
const STORAGE_KEY = "python_test_state_v2";
function PythonTest() {
    /* ---------------- STATES ---------------- */ const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("login"); // login | instructions | test | submitted
    const [timer, setTimer] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(20 * 60);
    const [questions, setQuestions] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [answers, setAnswers] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({});
    const [tabViolated, setTabViolated] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    /* ---------------- LOAD SAVED STATE ---------------- */ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const data = JSON.parse(saved);
            setStep(data.step);
            setTimer(data.timer);
            setQuestions(data.questions || []);
            setAnswers(data.answers || {});
        }
    }, []);
    /* ---------------- SAVE STATE ---------------- */ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (step === "test") {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                step,
                timer,
                questions,
                answers
            }));
        }
    }, [
        step,
        timer,
        questions,
        answers
    ]);
    /* ---------------- RANDOM 50 QUESTIONS ---------------- */ const generateQuestions = ()=>{
        const shuffled = [
            ...pythonQuestions
        ].sort(()=>0.5 - Math.random());
        setQuestions(shuffled.slice(0, 50));
    };
    /* ---------------- TIMER ---------------- */ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (step !== "test") return;
        const interval = setInterval(()=>{
            setTimer((prev)=>{
                if (prev <= 1) {
                    submitTest(true);
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
        document.addEventListener("copy", block);
        document.addEventListener("paste", block);
        document.addEventListener("contextmenu", block);
        const visibilityHandler = ()=>{
            if (document.hidden && !tabViolated) {
                setTabViolated(true);
                alert("Tab switching is not allowed. Test will be submitted.");
                submitTest(true);
            }
        };
        document.addEventListener("visibilitychange", visibilityHandler);
        return ()=>{
            document.removeEventListener("copy", block);
            document.removeEventListener("paste", block);
            document.removeEventListener("contextmenu", block);
            document.removeEventListener("visibilitychange", visibilityHandler);
        };
    }, [
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(CenteredCard, {
            title: "Python Online Assessment",
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
                        fileName: "[project]/pages/test/python.js",
                        lineNumber: 114,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Input, {
                        placeholder: "Email ID"
                    }, void 0, false, {
                        fileName: "[project]/pages/test/python.js",
                        lineNumber: 115,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Input, {
                        placeholder: "Mobile Number"
                    }, void 0, false, {
                        fileName: "[project]/pages/test/python.js",
                        lineNumber: 116,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Input, {
                        placeholder: "College / Company"
                    }, void 0, false, {
                        fileName: "[project]/pages/test/python.js",
                        lineNumber: 117,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(PrimaryButton, {
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(CenteredCard, {
            title: "Test Instructions",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "space-y-3 text-sm text-gray-700",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Instruction, {
                            children: "50 questions – all mandatory"
                        }, void 0, false, {
                            fileName: "[project]/pages/test/python.js",
                            lineNumber: 129,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Instruction, {
                            children: "Time limit: 20 minutes"
                        }, void 0, false, {
                            fileName: "[project]/pages/test/python.js",
                            lineNumber: 130,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Instruction, {
                            children: "No copy, paste or right click"
                        }, void 0, false, {
                            fileName: "[project]/pages/test/python.js",
                            lineNumber: 131,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Instruction, {
                            children: "No tab switching"
                        }, void 0, false, {
                            fileName: "[project]/pages/test/python.js",
                            lineNumber: 132,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Instruction, {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(PrimaryButton, {
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gray-100 px-3 py-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "sticky top-0 z-10 bg-white rounded-xl shadow flex justify-between px-4 py-3 mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                            className: "font-bold text-lg",
                            children: "Python Test"
                        }, void 0, false, {
                            fileName: "[project]/pages/test/python.js",
                            lineNumber: 155,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "max-w-3xl mx-auto",
                    children: [
                        questions.map((q, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "bg-white p-5 rounded-xl shadow mb-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "grid gap-3",
                                        children: q.options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
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
    /* ---------------- SUBMITTED ---------------- */ return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(CenteredCard, {
        title: "Test Submitted 🎉",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
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
/* ---------------- UI COMPONENTS ---------------- */ const CenteredCard = ({ title, children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex items-center justify-center bg-gray-100 px-3",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "bg-white p-6 rounded-2xl shadow w-full max-w-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
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
const Input = ({ placeholder })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
        required: true,
        placeholder: placeholder,
        className: "w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
    }, void 0, false, {
        fileName: "[project]/pages/test/python.js",
        lineNumber: 230,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const PrimaryButton = ({ children, onClick, className = "" })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
        onClick: onClick,
        className: `w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/pages/test/python.js",
        lineNumber: 238,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const Instruction = ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "flex gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                className: "text-blue-600 font-bold",
                children: "•"
            }, void 0, false, {
                fileName: "[project]/pages/test/python.js",
                lineNumber: 248,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
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
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e2b36d66._.js.map