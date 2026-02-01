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
"[project]/pages/online-assessment.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OnlineAssessment
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
"use client";
;
;
;
function OnlineAssessment() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        name: "",
        email: "",
        whatsappNumber: "",
        collegeName: "",
        category: ""
    });
    /* ------------ VALIDATION ------------ */ const nameRegex = /^[A-Za-z ]+$/;
    const mobileRegex = /^[0-9]{10}$/;
    const collegeRegex = /^[A-Za-z ]+$/;
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    /* ================= START TEST ================= */ const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!nameRegex.test(form.name)) return alert("Name should contain only letters.");
        if (!gmailRegex.test(form.email)) return alert("Enter a valid Gmail address.");
        if (!mobileRegex.test(form.whatsappNumber)) return alert("Mobile number must be 10 digits.");
        if (!collegeRegex.test(form.collegeName)) return alert("College name should contain only letters.");
        if (!form.category) return alert("Please select a test category.");
        try {
            const res = await fetch("https://career-school.co.in/api/tests/start", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    whatsappNumber: form.whatsappNumber,
                    collegeName: form.collegeName,
                    category: form.category
                })
            });
            if (!res.ok) {
                const errorText = await res.text();
                alert("Backend error: " + errorText);
                return;
            }
            const data = await res.json();
            /*
        Expected backend response (ANY ONE):
        1️⃣ { studentId: 1, questions: [...] }
        2️⃣ { studentId: 1, data: [...] }
        3️⃣ { studentId: 1, questionsList: [...] }
      */ const questions = data.questions || data.questionsList || data.data || [];
            if (!data.studentId || !Array.isArray(questions) || questions.length === 0) {
                alert("Invalid response from server.");
                return;
            }
            /* ================= STORE SESSION DATA ================= */ localStorage.setItem("studentId", data.studentId);
            localStorage.setItem("name", form.name);
            localStorage.setItem("email", form.email);
            localStorage.setItem("whatsappNumber", form.whatsappNumber);
            localStorage.setItem("collegeName", form.collegeName);
            // 🔑 MOST IMPORTANT: store questions for TestEngine
            localStorage.setItem("questions", JSON.stringify(questions));
            /* ================= GO TO TEST ================= */ router.push(`/test/${form.category}?start=true`);
        } catch (err) {
            console.error("Error calling start API:", err);
            alert("Cannot connect to backend server.");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex items-center justify-center bg-gray-100 px-3",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "bg-white p-6 rounded-2xl shadow w-full max-w-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                    className: "text-xl font-bold text-center mb-5",
                    children: "Online Assessment"
                }, void 0, false, {
                    fileName: "[project]/pages/online-assessment.js",
                    lineNumber: 104,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                            type: "text",
                            name: "name",
                            placeholder: "Full Name",
                            value: form.name,
                            onChange: handleChange,
                            required: true,
                            className: "w-full border px-3 py-2 rounded-lg"
                        }, void 0, false, {
                            fileName: "[project]/pages/online-assessment.js",
                            lineNumber: 110,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                            type: "email",
                            name: "email",
                            placeholder: "Email ID",
                            value: form.email,
                            onChange: handleChange,
                            required: true,
                            className: "w-full border px-3 py-2 rounded-lg"
                        }, void 0, false, {
                            fileName: "[project]/pages/online-assessment.js",
                            lineNumber: 120,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                            type: "text",
                            name: "whatsappNumber",
                            placeholder: "Mobile Number",
                            value: form.whatsappNumber,
                            onChange: handleChange,
                            required: true,
                            className: "w-full border px-3 py-2 rounded-lg"
                        }, void 0, false, {
                            fileName: "[project]/pages/online-assessment.js",
                            lineNumber: 130,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                            type: "text",
                            name: "collegeName",
                            placeholder: "College / Company",
                            value: form.collegeName,
                            onChange: handleChange,
                            required: true,
                            className: "w-full border px-3 py-2 rounded-lg"
                        }, void 0, false, {
                            fileName: "[project]/pages/online-assessment.js",
                            lineNumber: 140,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                            name: "category",
                            value: form.category,
                            onChange: handleChange,
                            required: true,
                            className: "w-full border px-3 py-2 rounded-lg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                    value: "",
                                    children: "Select Test Category"
                                }, void 0, false, {
                                    fileName: "[project]/pages/online-assessment.js",
                                    lineNumber: 157,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                    value: "APTITUDE",
                                    children: "Aptitude"
                                }, void 0, false, {
                                    fileName: "[project]/pages/online-assessment.js",
                                    lineNumber: 158,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                    value: "JAVA",
                                    children: "Java"
                                }, void 0, false, {
                                    fileName: "[project]/pages/online-assessment.js",
                                    lineNumber: 159,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                    value: "PYTHON",
                                    children: "Python"
                                }, void 0, false, {
                                    fileName: "[project]/pages/online-assessment.js",
                                    lineNumber: 160,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                    value: "DATA",
                                    children: "Data Analytics"
                                }, void 0, false, {
                                    fileName: "[project]/pages/online-assessment.js",
                                    lineNumber: 161,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                    value: "COMMUNICATION",
                                    children: "Communication"
                                }, void 0, false, {
                                    fileName: "[project]/pages/online-assessment.js",
                                    lineNumber: 162,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/online-assessment.js",
                            lineNumber: 150,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            type: "submit",
                            className: "w-full bg-blue-600 text-white py-2 rounded-lg font-semibold",
                            children: "Take Test"
                        }, void 0, false, {
                            fileName: "[project]/pages/online-assessment.js",
                            lineNumber: 165,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/online-assessment.js",
                    lineNumber: 108,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/pages/online-assessment.js",
            lineNumber: 103,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/pages/online-assessment.js",
        lineNumber: 102,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__bb59890d._.js.map