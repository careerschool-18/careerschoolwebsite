module.exports = [
"[project]/pages/test/data-analytics.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DataAnalyticsTest
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
"use client";
;
;
const STORAGE_KEY = "data_analytics_test_state_v1";
function DataAnalyticsTest() {
    /* ---------------- STATES ---------------- */ const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("login"); // login | instructions | test | submitted
    const [timer, setTimer] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(20 * 60);
    const [questions, setQuestions] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [answers, setAnswers] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({});
    const [tabViolated, setTabViolated] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    /* ---------------- DATA ANALYTICS QUESTION BANK ---------------- */ const questionBank = [
        {
            id: 1,
            question: "Which tool is commonly used for data visualization?",
            options: [
                "Excel",
                "Python",
                "Tableau",
                "All of the above"
            ],
            correct: "All of the above"
        },
        {
            id: 2,
            question: "What does SQL stand for?",
            options: [
                "Structured Query Language",
                "Simple Query Language",
                "Sequential Query Logic",
                "None of the above"
            ],
            correct: "Structured Query Language"
        },
        {
            id: 3,
            question: "Which Python library is mainly used for data analysis?",
            options: [
                "NumPy",
                "Pandas",
                "Matplotlib",
                "TensorFlow"
            ],
            correct: "Pandas"
        },
        {
            id: 4,
            question: "What is a primary key in a database?",
            options: [
                "A key that can be null",
                "A unique identifier",
                "A foreign key",
                "An index"
            ],
            correct: "A unique identifier"
        },
        {
            id: 5,
            question: "Which chart is best for showing trends over time?",
            options: [
                "Pie Chart",
                "Bar Chart",
                "Line Chart",
                "Histogram"
            ],
            correct: "Line Chart"
        },
        {
            id: 6,
            question: "Which SQL clause is used to filter records?",
            options: [
                "WHERE",
                "GROUP BY",
                "ORDER BY",
                "HAVING"
            ],
            correct: "WHERE"
        },
        {
            id: 7,
            question: "What does ETL stand for?",
            options: [
                "Extract, Transform, Load",
                "Export, Transfer, Load",
                "Extract, Test, Load",
                "Evaluate, Transform, Load"
            ],
            correct: "Extract, Transform, Load"
        },
        {
            id: 8,
            question: "Which data type stores textual data?",
            options: [
                "INT",
                "FLOAT",
                "VARCHAR",
                "BOOLEAN"
            ],
            correct: "VARCHAR"
        },
        {
            id: 9,
            question: "Which measure shows the average value?",
            options: [
                "Median",
                "Mode",
                "Mean",
                "Range"
            ],
            correct: "Mean"
        },
        {
            id: 10,
            question: "Which process removes duplicate data?",
            options: [
                "Data Mining",
                "Data Cleaning",
                "Data Modeling",
                "Data Storage"
            ],
            correct: "Data Cleaning"
        }
    ];
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
    /* ---------------- RANDOM QUESTIONS ---------------- */ const generateQuestions = ()=>{
        const shuffled = [
            ...questionBank
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
                alert("Tab switching detected. Test will be submitted.");
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
        if (!forced && Object.keys(answers).length < questions.length) {
            alert("Please answer all questions.");
            return;
        }
        localStorage.removeItem(STORAGE_KEY);
        setStep("submitted");
    };
    /* ---------------- TIMER FORMAT ---------------- */ const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
    const seconds = String(timer % 60).padStart(2, "0");
    /* ---------------- LOGIN PAGE ---------------- */ if (step === "login") {
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
                        lineNumber: 192,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Input, {
                        placeholder: "Email ID"
                    }, void 0, false, {
                        fileName: "[project]/pages/test/data-analytics.js",
                        lineNumber: 193,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Input, {
                        placeholder: "Mobile Number"
                    }, void 0, false, {
                        fileName: "[project]/pages/test/data-analytics.js",
                        lineNumber: 194,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Input, {
                        placeholder: "College / Company"
                    }, void 0, false, {
                        fileName: "[project]/pages/test/data-analytics.js",
                        lineNumber: 195,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(PrimaryButton, {
                        children: "Proceed to Instructions"
                    }, void 0, false, {
                        fileName: "[project]/pages/test/data-analytics.js",
                        lineNumber: 196,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/test/data-analytics.js",
                lineNumber: 185,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/pages/test/data-analytics.js",
            lineNumber: 184,
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
                            fileName: "[project]/pages/test/data-analytics.js",
                            lineNumber: 207,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Instruction, {
                            children: "Time limit: 20 minutes"
                        }, void 0, false, {
                            fileName: "[project]/pages/test/data-analytics.js",
                            lineNumber: 208,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Instruction, {
                            children: "Copy / Paste disabled"
                        }, void 0, false, {
                            fileName: "[project]/pages/test/data-analytics.js",
                            lineNumber: 209,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Instruction, {
                            children: "Tab switching not allowed"
                        }, void 0, false, {
                            fileName: "[project]/pages/test/data-analytics.js",
                            lineNumber: 210,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Instruction, {
                            children: "Auto submit on timeout"
                        }, void 0, false, {
                            fileName: "[project]/pages/test/data-analytics.js",
                            lineNumber: 211,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/test/data-analytics.js",
                    lineNumber: 206,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(PrimaryButton, {
                    className: "mt-6",
                    onClick: ()=>{
                        generateQuestions();
                        localStorage.setItem(STORAGE_KEY, JSON.stringify({
                            step: "test",
                            timer: 20 * 60,
                            questions,
                            answers: {}
                        }));
                        window.open("/test/data-analytics", "_blank");
                    },
                    children: "Start Test"
                }, void 0, false, {
                    fileName: "[project]/pages/test/data-analytics.js",
                    lineNumber: 214,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/pages/test/data-analytics.js",
            lineNumber: 205,
            columnNumber: 7
        }, this);
    }
    /* ---------------- TEST PAGE ---------------- */ if (step === "test") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gray-100 px-3 py-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "sticky top-0 bg-white p-4 rounded-xl shadow flex justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                            className: "font-bold",
                            children: "Data Analytics Test"
                        }, void 0, false, {
                            fileName: "[project]/pages/test/data-analytics.js",
                            lineNumber: 243,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            className: "bg-red-100 text-red-600 px-3 py-1 rounded-full",
                            children: [
                                "⏱ ",
                                minutes,
                                ":",
                                seconds
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/test/data-analytics.js",
                            lineNumber: 244,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/test/data-analytics.js",
                    lineNumber: 242,
                    columnNumber: 9
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
                                        lineNumber: 252,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "grid gap-2",
                                        children: q.options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setAnswers((prev)=>({
                                                            ...prev,
                                                            [q.id]: opt
                                                        })),
                                                className: `px-4 py-2 rounded border text-left ${answers[q.id] === opt ? "bg-blue-600 text-white" : "hover:bg-blue-50"}`,
                                                children: opt
                                            }, opt, false, {
                                                fileName: "[project]/pages/test/data-analytics.js",
                                                lineNumber: 258,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/pages/test/data-analytics.js",
                                        lineNumber: 256,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, q.id, true, {
                                fileName: "[project]/pages/test/data-analytics.js",
                                lineNumber: 251,
                                columnNumber: 13
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            onClick: ()=>submitTest(),
                            className: "w-full bg-green-600 text-white py-3 rounded-xl font-bold",
                            children: "Submit Test"
                        }, void 0, false, {
                            fileName: "[project]/pages/test/data-analytics.js",
                            lineNumber: 276,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/test/data-analytics.js",
                    lineNumber: 249,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/pages/test/data-analytics.js",
            lineNumber: 241,
            columnNumber: 7
        }, this);
    }
    /* ---------------- SUBMITTED ---------------- */ return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(CenteredCard, {
        title: "Test Submitted 🎉",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
            className: "text-center text-gray-600",
            children: "Thank you for attending the assessment."
        }, void 0, false, {
            fileName: "[project]/pages/test/data-analytics.js",
            lineNumber: 290,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/pages/test/data-analytics.js",
        lineNumber: 289,
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
                    lineNumber: 302,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                children
            ]
        }, void 0, true, {
            fileName: "[project]/pages/test/data-analytics.js",
            lineNumber: 301,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/pages/test/data-analytics.js",
        lineNumber: 300,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const Input = ({ placeholder })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
        required: true,
        placeholder: placeholder,
        className: "w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
    }, void 0, false, {
        fileName: "[project]/pages/test/data-analytics.js",
        lineNumber: 309,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const PrimaryButton = ({ children, onClick, className = "" })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
        onClick: onClick,
        className: `w-full bg-blue-600 text-white py-2 rounded-lg font-semibold ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/pages/test/data-analytics.js",
        lineNumber: 317,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const Instruction = ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "flex gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                className: "text-blue-600 font-bold",
                children: "•"
            }, void 0, false, {
                fileName: "[project]/pages/test/data-analytics.js",
                lineNumber: 327,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                children: children
            }, void 0, false, {
                fileName: "[project]/pages/test/data-analytics.js",
                lineNumber: 328,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/pages/test/data-analytics.js",
        lineNumber: 326,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__06f9b57f._.js.map