module.exports = [
"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
}),
"[externals]/react/jsx-runtime [external] (react/jsx-runtime, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react/jsx-runtime", () => require("react/jsx-runtime"));

module.exports = mod;
}),
"[externals]/react [external] (react, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react", () => require("react"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/components/Header.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [ssr] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [ssr] (ecmascript) <export default as X>");
"use client";
;
;
;
function Header() {
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [selectCourseModal, setSelectCourseModal] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [detailsModal, setDetailsModal] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [selectedCourse, setSelectedCourse] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [degree, setDegree] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [mobile, setMobile] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    // ============================
    // QUESTION SETS
    // ============================
    const pythonQuestions = [
        {
            id: 1,
            question: "In the context of Levels of Communication, which option is most appropriate?",
            options: [
                "A correct example related to Levels of Communication",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 2,
            question: "In the context of Levels of Communication, which option is most appropriate?",
            options: [
                "A correct example related to Levels of Communication",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 3,
            question: "In the context of Levels of Communication, which option is most appropriate?",
            options: [
                "A correct example related to Levels of Communication",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 4,
            question: "In the context of Levels of Communication, which option is most appropriate?",
            options: [
                "A correct example related to Levels of Communication",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 5,
            question: "In the context of Levels of Communication, which option is most appropriate?",
            options: [
                "A correct example related to Levels of Communication",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 6,
            question: "In the context of Levels of Communication, which option is most appropriate?",
            options: [
                "A correct example related to Levels of Communication",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 7,
            question: "In the context of Levels of Communication, which option is most appropriate?",
            options: [
                "A correct example related to Levels of Communication",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 8,
            question: "In the context of Levels of Communication, which option is most appropriate?",
            options: [
                "A correct example related to Levels of Communication",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 9,
            question: "In the context of Levels of Communication, which option is most appropriate?",
            options: [
                "A correct example related to Levels of Communication",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 10,
            question: "In the context of Levels of Communication, which option is most appropriate?",
            options: [
                "A correct example related to Levels of Communication",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        // ---- continues with the same pattern ----
        {
            id: 11,
            question: "In the context of Levels of Communication, which option is most appropriate?",
            options: [
                "A correct example related to Levels of Communication",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 12,
            question: "In the context of Levels of Communication, which option is most appropriate?",
            options: [
                "A correct example related to Levels of Communication",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 13,
            question: "In the context of Levels of Communication, which option is most appropriate?",
            options: [
                "A correct example related to Levels of Communication",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        // ==========================
        // TYPES OF COMMUNICATION
        // ==========================
        {
            id: 14,
            question: "In the context of Types of Communication, which option is most appropriate?",
            options: [
                "A correct example related to Types of Communication",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 15,
            question: "In the context of Types of Communication, which option is most appropriate?",
            options: [
                "A correct example related to Types of Communication",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 16,
            question: "In the context of Types of Communication, which option is most appropriate?",
            options: [
                "A correct example related to Types of Communication",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        // SAME PATTERN UPTO question 26 …
        {
            id: 26,
            question: "In the context of Types of Communication, which option is most appropriate?",
            options: [
                "A correct example related to Types of Communication",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        // ==========================
        // LEADERSHIP (27–39)
        // ==========================
        {
            id: 27,
            question: "In the context of Leadership, which option is most appropriate?",
            options: [
                "A correct example related to Leadership",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        // ... continues until id: 39
        {
            id: 39,
            question: "In the context of Leadership, which option is most appropriate?",
            options: [
                "A correct example related to Leadership",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        // ==========================
        // BUILDING A NETWORK (40–52)
        // ==========================
        {
            id: 40,
            question: "In the context of Building a Professional Network, which option is most appropriate?",
            options: [
                "A correct example related to Building a Professional Network",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        // ... continues until id: 52
        {
            id: 52,
            question: "In the context of Building a Professional Network, which option is most appropriate?",
            options: [
                "A correct example related to Building a Professional Network",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        // ==========================
        // PUBLIC SPEAKING (53–65)
        // ==========================
        {
            id: 53,
            question: "In the context of Art of Public Speaking & Presentation, which option is most appropriate?",
            options: [
                "A correct example related to Art of Public Speaking & Presentation",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 61,
            question: "In the context of Art of Public Speaking & Presentation, which option is most appropriate?",
            options: [
                "A correct example related to Art of Public Speaking & Presentation",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 62,
            question: "In the context of Art of Public Speaking & Presentation, which option is most appropriate?",
            options: [
                "A correct example related to Art of Public Speaking & Presentation",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 63,
            question: "In the context of Art of Public Speaking & Presentation, which option is most appropriate?",
            options: [
                "A correct example related to Art of Public Speaking & Presentation",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 64,
            question: "In the context of Art of Public Speaking & Presentation, which option is most appropriate?",
            options: [
                "A correct example related to Art of Public Speaking & Presentation",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 65,
            question: "In the context of Art of Public Speaking & Presentation, which option is most appropriate?",
            options: [
                "A correct example related to Art of Public Speaking & Presentation",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        // ==========================
        // PROBLEM SOLVING (66–78)
        // ==========================
        {
            id: 66,
            question: "In the context of Problem Solving, which option is most appropriate?",
            options: [
                "A correct example related to Problem Solving",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 67,
            question: "In the context of Problem Solving, which option is most appropriate?",
            options: [
                "A correct example related to Problem Solving",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 68,
            question: "In the context of Problem Solving, which option is most appropriate?",
            options: [
                "A correct example related to Problem Solving",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 69,
            question: "In the context of Problem Solving, which option is most appropriate?",
            options: [
                "A correct example related to Problem Solving",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 70,
            question: "In the context of Problem Solving, which option is most appropriate?",
            options: [
                "A correct example related to Problem Solving",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 71,
            question: "In the context of Problem Solving, which option is most appropriate?",
            options: [
                "A correct example related to Problem Solving",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 72,
            question: "In the context of Problem Solving, which option is most appropriate?",
            options: [
                "A correct example related to Problem Solving",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 73,
            question: "In the context of Problem Solving, which option is most appropriate?",
            options: [
                "A correct example related to Problem Solving",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 74,
            question: "In the context of Problem Solving, which option is most appropriate?",
            options: [
                "A correct example related to Problem Solving",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 75,
            question: "In the context of Problem Solving, which option is most appropriate?",
            options: [
                "A correct example related to Problem Solving",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 76,
            question: "In the context of Problem Solving, which option is most appropriate?",
            options: [
                "A correct example related to Problem Solving",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 77,
            question: "In the context of Problem Solving, which option is most appropriate?",
            options: [
                "A correct example related to Problem Solving",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 78,
            question: "In the context of Problem Solving, which option is most appropriate?",
            options: [
                "A correct example related to Problem Solving",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        // ==========================
        // DECISION MAKING (79–91)
        // ==========================
        {
            id: 79,
            question: "In the context of Decision Making, which option is most appropriate?",
            options: [
                "A correct example related to Decision Making",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        // ... pattern continues …
        {
            id: 91,
            question: "In the context of Decision Making, which option is most appropriate?",
            options: [
                "A correct example related to Decision Making",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        // ==========================
        // TIME MANAGEMENT (92–104)
        // ==========================
        {
            id: 92,
            question: "In the context of Time Management, which option is most appropriate?",
            options: [
                "A correct example related to Time Management",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        // ... continues …
        {
            id: 104,
            question: "In the context of Time Management, which option is most appropriate?",
            options: [
                "A correct example related to Time Management",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        // ==========================
        // INTERVIEW TECHNIQUES (105–117)
        // ==========================
        {
            id: 105,
            question: "In the context of Interview Techniques, which option is most appropriate?",
            options: [
                "A correct example related to Interview Techniques",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        // ... continues …
        {
            id: 117,
            question: "In the context of Interview Techniques, which option is most appropriate?",
            options: [
                "A correct example related to Interview Techniques",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        // ==========================
        // BODY LANGUAGE (118–130)
        // ==========================
        {
            id: 118,
            question: "In the context of Body Language, which option is most appropriate?",
            options: [
                "A correct example related to Body Language",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        // ... continues …
        {
            id: 130,
            question: "In the context of Body Language, which option is most appropriate?",
            options: [
                "A correct example related to Body Language",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 121,
            question: "In the context of Body Language, which option is most appropriate?",
            options: [
                "A correct example related to Body Language",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 122,
            question: "In the context of Body Language, which option is most appropriate?",
            options: [
                "A correct example related to Body Language",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 123,
            question: "In the context of Body Language, which option is most appropriate?",
            options: [
                "A correct example related to Body Language",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 124,
            question: "In the context of Body Language, which option is most appropriate?",
            options: [
                "A correct example related to Body Language",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 125,
            question: "In the context of Body Language, which option is most appropriate?",
            options: [
                "A correct example related to Body Language",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 126,
            question: "In the context of Body Language, which option is most appropriate?",
            options: [
                "A correct example related to Body Language",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 127,
            question: "In the context of Body Language, which option is most appropriate?",
            options: [
                "A correct example related to Body Language",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 128,
            question: "In the context of Body Language, which option is most appropriate?",
            options: [
                "A correct example related to Body Language",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 129,
            question: "In the context of Body Language, which option is most appropriate?",
            options: [
                "A correct example related to Body Language",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 130,
            question: "In the context of Body Language, which option is most appropriate?",
            options: [
                "A correct example related to Body Language",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        // ==========================
        // PROFESSIONAL APPEARANCE (131–143)
        // ==========================
        {
            id: 131,
            question: "In the context of Professional Appearance & Communication, which option is most appropriate?",
            options: [
                "A correct example related to Professional Appearance & Communication",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        // ... continues …
        {
            id: 143,
            question: "In the context of Professional Appearance & Communication, which option is most appropriate?",
            options: [
                "A correct example related to Professional Appearance & Communication",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        // ==========================
        // RESUME BUILDING (144–156)
        // ==========================
        {
            id: 144,
            question: "In the context of Resume Building, which option is most appropriate?",
            options: [
                "A correct example related to Resume Building",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        // ... continues …
        {
            id: 156,
            question: "In the context of Resume Building, which option is most appropriate?",
            options: [
                "A correct example related to Resume Building",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        // ==========================
        // TELEPHONE ETIQUETTE (157–169)
        // ==========================
        {
            id: 157,
            question: "In the context of Telephone Etiquette, which option is most appropriate?",
            options: [
                "A correct example related to Telephone Etiquette",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        // ... continues …
        {
            id: 169,
            question: "In the context of Telephone Etiquette, which option is most appropriate?",
            options: [
                "A correct example related to Telephone Etiquette",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        // ==========================
        // MASTERING THE VOICE (170–182)
        // ==========================
        {
            id: 170,
            question: "In the context of Mastering the Voice, which option is most appropriate?",
            options: [
                "A correct example related to Mastering the Voice",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        // ... continues …
        {
            id: 182,
            question: "In the context of Mastering the Voice, which option is most appropriate?",
            options: [
                "A correct example related to Mastering the Voice",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        // ==========================
        // TEAM COLLABORATION (183–195)
        // ==========================
        {
            id: 183,
            question: "In the context of Team Collaboration, which option is most appropriate?",
            options: [
                "A correct example related to Team Collaboration",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        // ... continues …
        {
            id: 195,
            question: "In the context of Team Collaboration, which option is most appropriate?",
            options: [
                "A correct example related to Team Collaboration",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        // ==========================
        // GROUP DISCUSSION (196–180)
        // ==========================
        {
            id: 196,
            question: "In the context of Group Discussion, which option is most appropriate?",
            options: [
                "A correct example related to Group Discussion",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 197,
            question: "In the context of Group Discussion, which option is most appropriate?",
            options: [
                "A correct example related to Group Discussion",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 198,
            question: "In the context of Group Discussion, which option is most appropriate?",
            options: [
                "A correct example related to Group Discussion",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 199,
            question: "In the context of Group Discussion, which option is most appropriate?",
            options: [
                "A correct example related to Group Discussion",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        },
        {
            id: 200,
            question: "In the context of Group Discussion, which option is most appropriate?",
            options: [
                "A correct example related to Group Discussion",
                "An incorrect example",
                "A partially correct example",
                "None of the above"
            ]
        }
    ];
    const daQuestions = [
        {
            "id": 1,
            "question": "Which function finds the total of values in a range?",
            "options": [
                "TOTAL",
                "ADD",
                "SUM",
                "CALCULATE"
            ]
        },
        {
            "id": 2,
            "question": "The formula =AVERAGE(10,20,30) returns:",
            "options": [
                "60",
                "30",
                "20",
                "15"
            ]
        },
        {
            "id": 3,
            "question": "To find the difference between A1 and B1, the correct formula is:",
            "options": [
                "DIFF(A1,B1)",
                "=@A1−B1",
                "A1/B1",
                "SUBTRACT(A1,B1)"
            ]
        },
        {
            "id": 4,
            "question": "If C2 contains 50 and D2 contains 200, the formula to find C2 as a percentage of D2 is:",
            "options": [
                "=C2%/D2",
                "=C2+D2",
                "=C2/D2",
                "=@PERCENTAGE(C2,D2)"
            ]
        },
        {
            "id": 5,
            "question": "Which function assigns a rank to a number within a list of numbers?",
            "options": [
                "SORT",
                "RANK",
                "INDEX",
                "ORDER"
            ]
        },
        {
            "id": 6,
            "question": "What does RANK.AVG return if two values in the list are identical?",
            "options": [
                "An error",
                "The lower rank",
                "The average of the tied ranks",
                "The higher rank"
            ]
        },
        {
            "id": 7,
            "question": "The IF function requires how many arguments?",
            "options": [
                "One",
                "Two",
                "Three",
                "Four"
            ]
        },
        {
            "id": 8,
            "question": "What is the benefit of using IFS over multiple nested IF statements?",
            "options": [
                "It has better error handling",
                "It is only for numerical checks",
                "It avoids deep nesting and is easier to read",
                "It can only check two conditions"
            ]
        },
        {
            "id": 9,
            "question": "The COUNT function only counts cells containing which type of data?",
            "options": [
                "Text",
                "Logical values",
                "Numbers",
                "Formulas"
            ]
        },
        {
            "id": 10,
            "question": "Which function counts cells in a range that are not empty, including text and numbers?",
            "options": [
                "COUNT",
                "COUNTA",
                "COUNTALL",
                "COUNTIF"
            ]
        },
        {
            "id": 11,
            "question": "To count how many times 'Pass' appears in the range E1:E100, the formula should be:",
            "options": [
                "0",
                "0",
                "COUNT(E1:E100)",
                "COUNTIFS"
            ]
        },
        {
            "id": 12,
            "question": "Which function calculates the sum of values that meet a single specified criterion?",
            "options": [
                "SUM",
                "SUMS",
                "SUMIF",
                "SUMIFS"
            ]
        },
        {
            "id": 13,
            "question": "What is the key difference in syntax between SUMIF and SUMIFS?",
            "options": [
                "The criteria range and sum range positions are swapped",
                "SUMIFS can only use one criteria",
                "SUMIF is faster",
                "SUMIFS only works with text"
            ]
        },
        {
            "id": 14,
            "question": "Which function finds the largest numeric value in a dataset?",
            "options": [
                "MAX",
                "LARGE",
                "TOP",
                "UPPER"
            ]
        },
        {
            "id": 15,
            "question": "What type of values does the MAXA function include that MAX ignores?",
            "options": [
                "Only text values",
                "Only FALSE logical values",
                "Text and logical values",
                "Blank cells"
            ]
        },
        {
            "id": 16,
            "question": "The formula =MIN(5,1,10,3) returns:",
            "options": [
                "1",
                "3",
                "10",
                "5"
            ]
        },
        {
            "id": 17,
            "question": "In a range containing {1,0,'Value',TRUE}, what value will MINA treat 'Value' as?",
            "options": [
                "0",
                "1",
                "-1",
                "An error"
            ]
        },
        {
            "id": 18,
            "question": "To find the 2nd highest score in A1:A100, the correct formula is:",
            "options": [
                "MAX(A1:A100,2)",
                "LARGE(A1:A100,2)",
                "SMALL(A1:A100,2)",
                "RANK(A1:A100,2)"
            ]
        },
        {
            "id": 19,
            "question": "Which formula returns the 3rd smallest number in B5:B20?",
            "options": [
                "MIN(B5:B20,3)",
                "LARGE(B5:B20,3)",
                "SMALL(B5:B20,3)",
                "COUNTIF(B5:B20,3)"
            ]
        },
        {
            "id": 20,
            "question": "Which operator can be used as an alternative to the CONCATENATE function?",
            "options": [
                "+",
                "&",
                "*",
                "/"
            ]
        },
        {
            "id": 21,
            "question": "If A1 contains 'Data', what is the result of =LEFT(A1,2)?",
            "options": [
                "Da",
                "ta",
                "Dat",
                "a"
            ]
        },
        {
            "id": 22,
            "question": "To extract 'HR' from 'Employee_HR', you would use RIGHT with how many characters?",
            "options": [
                "1",
                "2",
                "3",
                "4"
            ]
        },
        {
            "id": 23,
            "question": "If C5 contains 'Apples and Oranges', what is the result of =MID(C5,8,3)?",
            "options": [
                "and",
                "App",
                "Ora",
                "es"
            ]
        },
        {
            "id": 24,
            "question": "What does the LEN function count?",
            "options": [
                "Words",
                "Digits",
                "Characters including spaces",
                "Cells in a range"
            ]
        },
        {
            "id": 25,
            "question": "The MEAN is another term for which function?",
            "options": [
                "SUM",
                "AVERAGE",
                "MEDIAN",
                "MODE"
            ]
        },
        {
            "id": 26,
            "question": "What is the MEDIAN of {10,20,5,25,15}?",
            "options": [
                "15",
                "10",
                "25",
                "75"
            ]
        },
        {
            "id": 27,
            "question": "In {5,8,8,10,15}, what is the MODE?",
            "options": [
                "15",
                "8",
                "5",
                "9.2"
            ]
        },
        {
            "id": 28,
            "question": "The VAR.S function calculates the variance based on:",
            "options": [
                "Entire population",
                "Sample",
                "Skewed distribution",
                "Only integers"
            ]
        },
        {
            "id": 29,
            "question": "Which function measures dispersion of a dataset relative to the mean?",
            "options": [
                "AVERAGE",
                "STDEV",
                "VAR",
                "COUNT"
            ]
        },
        {
            "id": 30,
            "question": "If =PERCENTILE(A1:A100,0.9) is used, what is returned?",
            "options": [
                "Value below which 90% falls",
                "90th item",
                "90% of AVERAGE",
                "Rank of 0.9"
            ]
        },
        {
            "id": 31,
            "question": "What is the key difference between TODAY() and NOW()?",
            "options": [
                "TODAY includes time",
                "NOW includes time",
                "TODAY updates manually",
                "NOW is for finance"
            ]
        },
        {
            "id": 32,
            "question": "When is NOW() updated?",
            "options": [
                "When file saved",
                "When opened or recalculated",
                "Only when entered",
                "Every second"
            ]
        },
        {
            "id": 33,
            "question": "To create March 15, 2025, which formula is correct?",
            "options": [
                "DATE(2025,03,15)",
                "DATE(15,03,2025)",
                "DATE(March,15,2025)",
                "DATE(2025,15,03)"
            ]
        },
        {
            "id": 34,
            "question": "If A1 contains 12/31/2024, YEAR(A1) returns:",
            "options": [
                "12",
                "31",
                "2024",
                "24"
            ]
        },
        {
            "id": 35,
            "question": "Result of MONTH('10/5/2023')?",
            "options": [
                "5",
                "10",
                "2023",
                "20"
            ]
        },
        {
            "id": 36,
            "question": "Which function extracts the day number?",
            "options": [
                "DATE",
                "DAY",
                "WEEKDAY",
                "MONTH"
            ]
        },
        {
            "id": 37,
            "question": "The INDEX function retrieves a value at the intersection of:",
            "options": [
                "Range",
                "Criteria",
                "Lookup value",
                "Worksheet"
            ]
        },
        {
            "id": 38,
            "question": "The MATCH function returns:",
            "options": [
                "Actual value",
                "Position of value",
                "Row number",
                "Error"
            ]
        },
        {
            "id": 39,
            "question": "Which feature restricts user input?",
            "options": [
                "Conditional Formatting",
                "Data Cleaning",
                "Data Validation",
                "Protection"
            ]
        },
        {
            "id": 40,
            "question": "Key advantage of INDEX+MATCH over VLOOKUP:",
            "options": [
                "Wildcards",
                "Case-sensitive",
                "Multiple criteria",
                "Lookup any column"
            ]
        },
        {
            "id": 41,
            "question": "VLOOKUP always searches in which column?",
            "options": [
                "Last",
                "Any",
                "First",
                "Index column"
            ]
        },
        {
            "id": 42,
            "question": "HLOOKUP searches in which direction?",
            "options": [
                "Vertical",
                "Horizontal",
                "Diagonal",
                "Same column only"
            ]
        },
        {
            "id": 43,
            "question": "To display 50000 as '$50,000.00', use:",
            "options": [
                "CURRENCY",
                "FORMAT",
                "TEXT",
                "NUMBER"
            ]
        },
        {
            "id": 44,
            "question": "Which array function counts frequencies in bins?",
            "options": [
                "COUNTIF",
                "FREQUENCY",
                "OCCURS",
                "DISTRIBUTION"
            ]
        },
        {
            "id": 45,
            "question": "IFERROR returns what if the first argument errors?",
            "options": [
                "Second argument",
                "Error",
                "TRUE",
                "FALSE"
            ]
        },
        {
            "id": 46,
            "question": "Which tool splits text into multiple columns?",
            "options": [
                "Concatenate",
                "Data Validation",
                "Text to Columns",
                "Split"
            ]
        },
        {
            "id": 47,
            "question": "Sorting data rearranges the data:",
            "options": [
                "Alphabetically only",
                "Numerically only",
                "Ascending or Descending",
                "Randomly"
            ]
        },
        {
            "id": 48,
            "question": "Which tool temporarily hides rows that do not meet criteria?",
            "options": [
                "Sort",
                "Conditional Formatting",
                "Freeze Panes",
                "Filter"
            ]
        },
        {
            "id": 49,
            "question": "When using Remove Duplicates, which rows are kept?",
            "options": [
                "All kept but marked",
                "Last occurrence",
                "First occurrence",
                "Unique rows moved"
            ]
        },
        {
            "id": 50,
            "question": "Primary purpose of Freezing Panes?",
            "options": [
                "Freeze last row",
                "Freeze headers",
                "Freeze active cell",
                "Freeze formulas"
            ]
        },
        {
            "id": 51,
            "question": "A Pivot Table is primarily used for what?",
            "options": [
                "Simple data entry",
                "Summarizing, analyzing, and exploring large datasets",
                "Writing formulas",
                "Creating macros"
            ]
        },
        {
            "id": 52,
            "question": "Pivot Charts are dynamic visualizations that are directly linked to:",
            "options": [
                "VLOOKUP formulas",
                "The source data table",
                "The corresponding Pivot Table",
                "Another workbook"
            ]
        },
        {
            "id": 53,
            "question": "Which function or tool rotates a range of cells, turning rows into columns and vice-versa?",
            "options": [
                "ROTATE",
                "REVERSE",
                "TRANSPOSE",
                "CHANGE"
            ]
        },
        {
            "id": 54,
            "question": "Which feature is used to automatically change the appearance of cells based on their values?",
            "options": [
                "Data Validation",
                "Filter",
                "Conditional Formatting",
                "Styles"
            ]
        },
        {
            "id": 55,
            "question": "In simple Regression Analysis, the relationship between how many variables is studied?",
            "options": [
                "One",
                "Two",
                "Three",
                "Four or more"
            ]
        },
        {
            "id": 56,
            "question": "A Multiple Regression Analysis studies the relationship between a dependent variable and:",
            "options": [
                "A single independent variable",
                "Two dependent variables",
                "Two or more independent variables",
                "No independent variables"
            ]
        },
        {
            "id": 57,
            "question": "If A1 contains 'excel function', what does =PROPER(A1) return?",
            "options": [
                "Excel Function",
                "EXCEL FUNCTION",
                "excel function",
                "Excel function"
            ]
        },
        {
            "id": 58,
            "question": "The function that converts all letters in a text string to capital letters is:",
            "options": [
                "CAPS",
                "UPPER",
                "PROPER",
                "LARGE"
            ]
        },
        {
            "id": 59,
            "question": "Which function converts all text in a cell to lowercase?",
            "options": [
                "SMALL",
                "CASE",
                "LOWER",
                "TEXT"
            ]
        },
        {
            "id": 60,
            "question": "The TRIM function removes which types of characters from a text string?",
            "options": [
                "Leading, trailing, and multiple spaces between words",
                "All spaces",
                "Only leading spaces",
                "Only trailing spaces"
            ]
        },
        {
            "id": 61,
            "question": "The combination =IF(LEN(A1)>0,'Not Blank','Blank') is used to check if a cell:",
            "options": [
                "Is a number",
                "Contains a formula",
                "Has a length greater than zero (is not blank)",
                "Contains only text"
            ]
        },
        {
            "id": 62,
            "question": "A dataset with a positive Skewness is characterized by:",
            "options": [
                "A longer tail on the left side",
                "A perfectly symmetric distribution",
                "A longer tail on the right side",
                "A uniform distribution"
            ]
        },
        {
            "id": 63,
            "question": "Kurtosis measures the degree of what in a distribution?",
            "options": [
                "Symmetry",
                "Spread",
                "Peakedness (tailedness)",
                "Central tendency"
            ]
        },
        {
            "id": 64,
            "question": "In hypothesis testing, a small P Value (e.g., <0.05) indicates:",
            "options": [
                "The Null Hypothesis is likely true",
                "The Null Hypothesis should be rejected",
                "The data is normally distributed",
                "The sample size is too small"
            ]
        },
        {
            "id": 65,
            "question": "The Standard Error of the mean is the Standard Deviation divided by:",
            "options": [
                "The variance",
                "The square root of the sample size",
                "The total sample size",
                "The mean"
            ]
        },
        {
            "id": 66,
            "question": "The Null Hypothesis (H0) usually states that there is:",
            "options": [
                "A significant difference or relationship",
                "No significant difference or relationship",
                "An error in the data",
                "A positive correlation"
            ]
        },
        {
            "id": 67,
            "question": "To perform a sum of squared differences on a range, one might use which specialized array function?",
            "options": [
                "SUMSQ",
                "SUMPRODUCT",
                "SUM",
                "SUMIF"
            ]
        },
        {
            "id": 68,
            "question": "SUMPRODUCT is commonly used for a 'Multiple Array' calculation, which involves:",
            "options": [
                "Multiplying corresponding components in arrays and summing them",
                "Summing multiple ranges",
                "Finding the product of all numbers",
                "Only multiplying two arrays"
            ]
        },
        {
            "id": 69,
            "question": "When copying the formula =A1+B1 from C1 to C2, it becomes =A2+B2. This is an example of:",
            "options": [
                "Absolute referencing",
                "Mixed referencing",
                "Circular referencing",
                "Relative referencing"
            ]
        },
        {
            "id": 70,
            "question": "Which symbol is used to create an Absolute Reference?",
            "options": [
                "*",
                "#",
                "$",
                "!"
            ]
        },
        {
            "id": 71,
            "question": "The formula =RANDBETWEEN(1,100) generates:",
            "options": [
                "A random integer between 1 and 100",
                "A random decimal",
                "The average of 1 and 100",
                "Only 50"
            ]
        },
        {
            "id": 72,
            "question": "In IF statements, the AND function returns TRUE only if:",
            "options": [
                "At least one condition is TRUE",
                "Both conditions are FALSE",
                "All conditions are TRUE",
                "None of the conditions are met"
            ]
        },
        {
            "id": 73,
            "question": "The OR function returns FALSE only if:",
            "options": [
                "All arguments are TRUE",
                "Only one argument is FALSE",
                "All arguments are FALSE",
                "No arguments are present"
            ]
        },
        {
            "id": 74,
            "question": "The REPLACE function changes existing text by specifying its:",
            "options": [
                "New text only",
                "Starting position and number of characters to replace",
                "Only the character to be replaced",
                "End position"
            ]
        },
        {
            "id": 75,
            "question": "Which group of functions (like FORECAST.LINEAR) predicts a future value based on existing data?",
            "options": [
                "STAT functions",
                "FINANCIAL functions",
                "LOOKUP functions",
                "FORECAST functions"
            ]
        },
        {
            "id": 76,
            "question": "MySQL is a popular example of which type of system?",
            "options": [
                "Spreadsheet software",
                "Relational Database Management System (RDBMS)",
                "Statistical programming language",
                "Cloud storage"
            ]
        },
        {
            "id": 77,
            "question": "Power BI is primarily used for:",
            "options": [
                "Writing formulas",
                "Data Visualization and Business Intelligence",
                "Sending mass emails",
                "Web development"
            ]
        },
        {
            "id": 78,
            "question": "If A1:A5 contains {5,10,'Text',20,15}, the result of SUM is:",
            "options": [
                "50",
                "45",
                "40",
                "#VALUE!"
            ]
        },
        {
            "id": 79,
            "question": "The AVERAGE of 10, 20, 30, and 40 is:",
            "options": [
                "25",
                "20",
                "100",
                "40"
            ]
        },
        {
            "id": 80,
            "question": "If C10=100 and D10=150, the formula =C10−D10 returns:",
            "options": [
                "50",
                "-50",
                "250",
                "1.5"
            ]
        },
        {
            "id": 81,
            "question": "If A1=75 and B1=50, what is A1 as a percentage of B1?",
            "options": [
                "150%",
                "75%",
                "50%",
                "125%"
            ]
        },
        {
            "id": 82,
            "question": "In {10,50,30,20}, what is the rank of 30 in descending order?",
            "options": [
                "2",
                "3",
                "1",
                "4"
            ]
        },
        {
            "id": 83,
            "question": "The formula =IF(10>5,'Yes','No') returns:",
            "options": [
                "No",
                "Yes",
                "TRUE",
                "FALSE"
            ]
        },
        {
            "id": 84,
            "question": "How many numerical values are counted by COUNT in {A,1,B,2,C,3}?",
            "options": [
                "6",
                "3",
                "5",
                "0"
            ]
        },
        {
            "id": 85,
            "question": "Which function counts the number of non-empty cells?",
            "options": [
                "COUNT",
                "COUNTIF",
                "COUNTA",
                "SUM"
            ]
        },
        {
            "id": 86,
            "question": "To count cells in A1:A10 where value > 100, the criterion should be:",
            "options": [
                ">100",
                "100",
                ">100",
                "<100"
            ]
        },
        {
            "id": 87,
            "question": "If A1:A5 is {1,2,3,4,5} and SUMIF for values >3, the result is:",
            "options": [
                "15",
                "7",
                "9",
                "12"
            ]
        },
        {
            "id": 88,
            "question": "The largest value in D1:D10 is returned by:",
            "options": [
                "TOP",
                "MAX",
                "LARGE",
                "HIGH"
            ]
        },
        {
            "id": 89,
            "question": "The minimum value in {100,50,75,25} is:",
            "options": [
                "50",
                "100",
                "75",
                "25"
            ]
        },
        {
            "id": 90,
            "question": "What does LARGE(range,1) always return?",
            "options": [
                "Second largest value",
                "Smallest value",
                "Largest value (MAX)",
                "Average value"
            ]
        },
        {
            "id": 91,
            "question": "SMALL(A1:A10,1) is equivalent to:",
            "options": [
                "MIN",
                "MAX",
                "AVERAGE",
                "MEDIAN"
            ]
        },
        {
            "id": 92,
            "question": "Which formula joins 'Hello' and 'World' with a space?",
            "options": [
                "HelloWorld",
                "HelloWorld",
                "Hello World",
                "='Hello'+'World'"
            ]
        },
        {
            "id": 93,
            "question": "To get 'Jan' from 'January', use LEFT('January', ):",
            "options": [
                "1",
                "2",
                "3",
                "4"
            ]
        },
        {
            "id": 94,
            "question": "Result of RIGHT('Data Mining', 6)?",
            "options": [
                "Mining",
                "Mining",
                "Data M",
                "Mining"
            ]
        },
        {
            "id": 95,
            "question": "Result of MID('ABCDEFG',2,3)?",
            "options": [
                "BCD",
                "ABC",
                "CDE",
                "B C D"
            ]
        },
        {
            "id": 96,
            "question": "If A1 contains 1234567, LEN(A1) returns:",
            "options": [
                "6",
                "7",
                "8",
                "5"
            ]
        },
        {
            "id": 97,
            "question": "What is the MEDIAN of {1,2,5,8}?",
            "options": [
                "4",
                "5",
                "3.5",
                "3"
            ]
        },
        {
            "id": 98,
            "question": "Which formula finds the most frequently occurring number?",
            "options": [
                "MODE.SNGL",
                "AVERAGE",
                "COUNT",
                "MEDIAN"
            ]
        },
        {
            "id": 99,
            "question": "If all values in a dataset are the same, the Standard Deviation is:",
            "options": [
                "10",
                "1",
                "0",
                "Undefined"
            ]
        },
        {
            "id": 100,
            "question": "In the PERCENTILE function, the k argument must be between:",
            "options": [
                "1 and 100",
                "0 and 1",
                "0 and 100",
                "0 and 10"
            ]
        },
        {
            "id": 101,
            "question": "What does COUNTBLANK(A1:A10) return?",
            "options": [
                "Number of blank cells",
                "Number of non-blank cells",
                "Number of text cells",
                "Number of numeric cells"
            ]
        },
        {
            "id": 102,
            "question": "What does the TODAY() function return?",
            "options": [
                "Current date",
                "Current time",
                "Current date and time",
                "Previous day's date"
            ]
        },
        {
            "id": 103,
            "question": "The NOW() function returns:",
            "options": [
                "Only the date",
                "Only the time",
                "Current date and time",
                "Next day date"
            ]
        },
        {
            "id": 104,
            "question": "Which function calculates loan EMI?",
            "options": [
                "PMT",
                "EMI",
                "PAY",
                "RATE"
            ]
        },
        {
            "id": 105,
            "question": "Which function returns the future value of an investment?",
            "options": [
                "FV",
                "PV",
                "PMT",
                "RATE"
            ]
        },
        {
            "id": 106,
            "question": "Which function returns the present value of a future payment?",
            "options": [
                "PV",
                "FV",
                "NPV",
                "RATE"
            ]
        },
        {
            "id": 107,
            "question": "Which function calculates Net Present Value?",
            "options": [
                "NPV",
                "PV",
                "FV",
                "PMT"
            ]
        },
        {
            "id": 108,
            "question": "The RATE function calculates:",
            "options": [
                "Interest rate per period",
                "Total loan value",
                "Number of periods",
                "Present value"
            ]
        },
        {
            "id": 109,
            "question": "What does the HLOOKUP function do?",
            "options": [
                "Searches horizontally",
                "Searches vertically",
                "Counts matching values",
                "Filters rows"
            ]
        },
        {
            "id": 110,
            "question": "What is the correct order of precedence in Excel?",
            "options": [
                "+ then * then ()",
                "() then * then +",
                "* then () then +",
                "+ then () then *"
            ]
        },
        {
            "id": 111,
            "question": "Which Excel chart is best for showing trends over time?",
            "options": [
                "Pie Chart",
                "Line Chart",
                "Bar Chart",
                "Scatter Chart"
            ]
        },
        {
            "id": 112,
            "question": "Which chart type is best for percentage contribution?",
            "options": [
                "Bar Chart",
                "Line Chart",
                "Pie Chart",
                "Scatter Chart"
            ]
        },
        {
            "id": 113,
            "question": "Histogram is used to display:",
            "options": [
                "Trends",
                "Frequencies",
                "Percentages",
                "Comparisons"
            ]
        },
        {
            "id": 114,
            "question": "A Scatter Plot is used to show:",
            "options": [
                "Relationship between two variables",
                "Percentage contribution",
                "Trends over time",
                "Distribution"
            ]
        },
        {
            "id": 115,
            "question": "In a bar chart, bars run:",
            "options": [
                "Horizontally",
                "Vertically",
                "Diagonal",
                "Circular"
            ]
        },
        {
            "id": 116,
            "question": "Which Excel feature removes duplicate values?",
            "options": [
                "Filter",
                "Sort",
                "Remove Duplicates",
                "Find & Replace"
            ]
        },
        {
            "id": 117,
            "question": "Which function returns TRUE if the cell contains text?",
            "options": [
                "ISTEXT",
                "ISNUMBER",
                "ISLOGICAL",
                "ISBLANK"
            ]
        },
        {
            "id": 118,
            "question": "Which function checks whether a cell is empty?",
            "options": [
                "ISBLANK",
                "ISNUMBER",
                "ISTEXT",
                "ISNONTEXT"
            ]
        },
        {
            "id": 119,
            "question": "Which function returns TRUE for numeric values?",
            "options": [
                "ISNUMBER",
                "ISTEXT",
                "ISBLANK",
                "ISLOGICAL"
            ]
        },
        {
            "id": 120,
            "question": "The function CONCAT is used for:",
            "options": [
                "Calculations",
                "Joining text strings",
                "Counting cells",
                "Formatting"
            ]
        },
        {
            "id": 121,
            "question": "What does the CLEAN function do?",
            "options": [
                "Removes non-printable characters",
                "Removes spaces",
                "Removes formulas",
                "Removes dates"
            ]
        },
        {
            "id": 122,
            "question": "What does TEXT(A1,\"dd-mm-yyyy\") do?",
            "options": [
                "Converts text to number",
                "Converts number to text in date format",
                "Extracts day",
                "Extracts month"
            ]
        },
        {
            "id": 123,
            "question": "Which function returns the number of characters in a text string?",
            "options": [
                "LEN",
                "LEFT",
                "RIGHT",
                "MID"
            ]
        },
        {
            "id": 124,
            "question": "Which function is used to round a number upward?",
            "options": [
                "ROUND",
                "ROUNDUP",
                "ROUNDDOWN",
                "CEILING"
            ]
        },
        {
            "id": 125,
            "question": "Which function is used to round a number downward?",
            "options": [
                "FLOOR",
                "ROUNDUP",
                "ROUND",
                "EVEN"
            ]
        },
        {
            "id": 126,
            "question": "Which function removes extra spaces except single spaces between words?",
            "options": [
                "TRIM",
                "CLEAN",
                "TEXT",
                "SUBSTITUTE"
            ]
        },
        {
            "id": 127,
            "question": "Which function replaces one text string with another?",
            "options": [
                "SUBSTITUTE",
                "REPLACE",
                "TEXT",
                "LEFT"
            ]
        },
        {
            "id": 128,
            "question": "Which function counts cells containing numbers?",
            "options": [
                "COUNT",
                "COUNTA",
                "COUNTIF",
                "COUNTBLANK"
            ]
        },
        {
            "id": 129,
            "question": "Which function counts cells containing any data?",
            "options": [
                "COUNTA",
                "COUNT",
                "COUNTIF",
                "SUM"
            ]
        },
        {
            "id": 130,
            "question": "Which function adds values based on criteria?",
            "options": [
                "SUMIF",
                "SUMIFS",
                "COUNTIF",
                "COUNTIFS"
            ]
        },
        {
            "id": 131,
            "question": "Which function counts values based on multiple criteria?",
            "options": [
                "COUNTIFS",
                "COUNTIF",
                "SUMIF",
                "SUMIFS"
            ]
        },
        {
            "id": 132,
            "question": "Which function adds values based on multiple criteria?",
            "options": [
                "SUMIFS",
                "SUMIF",
                "COUNTIF",
                "AVERAGEIF"
            ]
        },
        {
            "id": 133,
            "question": "AVERAGEIF calculates:",
            "options": [
                "Average of all numbers",
                "Average with one condition",
                "Average with two conditions",
                "Sum of numbers"
            ]
        },
        {
            "id": 134,
            "question": "AVERAGEIFS calculates:",
            "options": [
                "Average with multiple conditions",
                "Sum with multiple conditions",
                "Count with conditions",
                "Largest value"
            ]
        },
        {
            "id": 135,
            "question": "Which function is used to calculate exponential values?",
            "options": [
                "EXP",
                "POWER",
                "LN",
                "LOG"
            ]
        },
        {
            "id": 136,
            "question": "Which function returns the natural logarithm?",
            "options": [
                "LOG",
                "LN",
                "LOG10",
                "EXP"
            ]
        },
        {
            "id": 137,
            "question": "The POWER function calculates:",
            "options": [
                "Square root",
                "Exponentiation",
                "Logarithm",
                "Average power"
            ]
        },
        {
            "id": 138,
            "question": "Which function returns the square root?",
            "options": [
                "SQRT",
                "POWER",
                "ROOT",
                "AVG"
            ]
        },
        {
            "id": 139,
            "question": "Which function returns the remainder after division?",
            "options": [
                "MOD",
                "DIV",
                "ROUND",
                "SUBTOTAL"
            ]
        },
        {
            "id": 140,
            "question": "The function RAND() generates:",
            "options": [
                "Random integer",
                "Random decimal between 0 and 1",
                "Random text",
                "Random date"
            ]
        },
        {
            "id": 141,
            "question": "Which function returns the row number?",
            "options": [
                "ROW",
                "COLUMN",
                "ROWS",
                "INDEX"
            ]
        },
        {
            "id": 142,
            "question": "Which function returns the column number?",
            "options": [
                "COLUMN",
                "ROW",
                "COLUMNS",
                "INDEX"
            ]
        },
        {
            "id": 143,
            "question": "Which function returns the number of rows in a range?",
            "options": [
                "ROW",
                "ROWS",
                "COLUMNS",
                "COUNT"
            ]
        },
        {
            "id": 144,
            "question": "Which function returns the number of columns in a range?",
            "options": [
                "COLUMNS",
                "COLUMN",
                "ROWS",
                "COUNT"
            ]
        },
        {
            "id": 145,
            "question": "Which function converts text to a number?",
            "options": [
                "VALUE",
                "TEXT",
                "NUM",
                "NUMBER"
            ]
        },
        {
            "id": 146,
            "question": "Which function displays a value in a specific numeric format?",
            "options": [
                "TEXT",
                "VALUE",
                "FORMAT",
                "SUBSTITUTE"
            ]
        },
        {
            "id": 147,
            "question": "Which function is used to replace specific characters by position?",
            "options": [
                "REPLACE",
                "SUBSTITUTE",
                "LEFT",
                "MID"
            ]
        },
        {
            "id": 148,
            "question": "Which function returns the lookup value from a specified row and column?",
            "options": [
                "INDEX",
                "MATCH",
                "LOOKUP",
                "FIND"
            ]
        },
        {
            "id": 149,
            "question": "MATCH returns the:",
            "options": [
                "Position of a value",
                "Actual value",
                "Maximum value",
                "Minimum value"
            ]
        },
        {
            "id": 150,
            "question": "INDEX + MATCH together are used as an alternative to:",
            "options": [
                "VLOOKUP",
                "SUM",
                "COUNT",
                "MAX"
            ]
        }
    ];
    const fullstackQuestions = [
        {
            id: 1,
            question: "Fullstack Q1?",
            options: [
                "A",
                "B",
                "",
                ""
            ]
        },
        {
            id: 2,
            question: "Fullstack Q2?",
            options: [
                "A",
                "B",
                "",
                ""
            ]
        }
    ];
    const webQuestions = [
        {
            id: 1,
            question: "Web Dev Q1?",
            options: [
                "A",
                "B",
                "",
                ""
            ]
        },
        {
            id: 2,
            question: "Web Dev Q2?",
            options: [
                "A",
                "B",
                "",
                ""
            ]
        }
    ];
    const questionPools = {
        python: pythonQuestions,
        dataAnalytics: daQuestions,
        fullstack: fullstackQuestions,
        webdev: webQuestions
    };
    const courseOptions = [
        {
            id: "python",
            label: "Python Test"
        },
        {
            id: "dataAnalytics",
            label: "Data Analytics Test"
        },
        {
            id: "fullstack",
            label: "Full Stack Test"
        },
        {
            id: "webdev",
            label: "Web Developer Test"
        }
    ];
    const handleCourseSelect = (courseId)=>{
        setSelectedCourse(courseId);
        setSelectCourseModal(false);
        setDetailsModal(true);
    };
    const handleStartTest = (e)=>{
        e.preventDefault();
        // Validate selected course
        if (!selectedCourse) {
            alert("Please select a course first");
            setDetailsModal(false);
            setSelectCourseModal(true);
            return;
        }
        // Validate form inputs
        if (!name.trim()) return alert("Enter your name");
        if (!degree.trim()) return alert("Enter your degree");
        if (!/^[0-9]{10}$/.test(mobile)) return alert("Enter valid 10-digit number");
        // Save student info
        localStorage.setItem("studentName", name);
        localStorage.setItem("studentDegree", degree);
        localStorage.setItem("studentMobile", mobile);
        // Select question pool based on test
        const pool = questionPools[selectedCourse] || [];
        if (pool.length === 0) return alert("No questions available for this course");
        // Get last index used for this test - ensure it's a number
        const storedIndex = localStorage.getItem(`${selectedCourse}-index`);
        let startIndex = 0;
        if (storedIndex !== null && storedIndex !== undefined) {
            startIndex = parseInt(storedIndex, 10);
            if (isNaN(startIndex)) startIndex = 0;
        }
        // Slice 50 questions for the current user
        const endIndex = Math.min(startIndex + 50, pool.length);
        const userQuestions = pool.slice(startIndex, endIndex);
        // If we don't have 50 questions from current position, wrap around to beginning
        if (userQuestions.length < 50) {
            const remaining = 50 - userQuestions.length;
            const additionalQuestions = pool.slice(0, remaining);
            userQuestions.push(...additionalQuestions);
        }
        // Update index for next user
        let nextIndex = startIndex + 50;
        if (nextIndex >= pool.length) {
            nextIndex = nextIndex % pool.length; // Wrap around
        }
        // Ensure nextIndex is a valid number before saving
        if (typeof nextIndex !== 'number' || isNaN(nextIndex)) {
            nextIndex = 0;
        }
        // Save the next index - convert to string explicitly
        try {
            localStorage.setItem(`${selectedCourse}-index, nextIndex.toString()`);
        } catch (error) {
            console.error("Error saving to localStorage:", error);
            // Fallback to 0 if there's an error
            localStorage.setItem(`${selectedCourse}-index, "0"`);
        }
        // Save user's questions
        localStorage.setItem("userQuestions", JSON.stringify(userQuestions));
        localStorage.setItem("selectedCourse", selectedCourse);
        // Open exam
        const url = `/exam?test=${selectedCourse}`;
        window.open(url, "_blank");
        // Reset form and close modal
        setName("");
        setDegree("");
        setMobile("");
        setDetailsModal(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
        className: "flex items-center justify-between px-6 py-4 bg-white shadow relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4 cursor-pointer",
                onClick: ()=>window.location.reload(),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                        src: "/Nav Logo/CSHR - Nav Logo.png",
                        className: "h-10",
                        alt: "CSHR Logo"
                    }, void 0, false, {
                        fileName: "[project]/components/Header.js",
                        lineNumber: 1737,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                        src: "/Nav Logo/CSIT - Nav Logo.png",
                        className: "h-10",
                        alt: "CSIT Logo"
                    }, void 0, false, {
                        fileName: "[project]/components/Header.js",
                        lineNumber: 1738,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Header.js",
                lineNumber: 1736,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
                className: "hidden md:flex items-center gap-3 ml-auto mr-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>document.getElementById("courses")?.scrollIntoView({
                                behavior: "smooth"
                            }),
                        className: "bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 transition-colors",
                        children: "Courses"
                    }, void 0, false, {
                        fileName: "[project]/components/Header.js",
                        lineNumber: 1743,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>document.getElementById("meet-our-stars")?.scrollIntoView({
                                behavior: "smooth"
                            }),
                        className: "bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 transition-colors",
                        children: "Success Story"
                    }, void 0, false, {
                        fileName: "[project]/components/Header.js",
                        lineNumber: 1750,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>setSelectCourseModal(true),
                        className: "bg-blue-100 text-blue-700 px-4 py-2 rounded font-semibold hover:bg-blue-200 transition-colors",
                        children: "Take Test"
                    }, void 0, false, {
                        fileName: "[project]/components/Header.js",
                        lineNumber: 1757,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                        href: "https://wa.me/7305014818",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 transition-colors",
                        children: "Hire Students"
                    }, void 0, false, {
                        fileName: "[project]/components/Header.js",
                        lineNumber: 1764,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Header.js",
                lineNumber: 1742,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "hidden md:block",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                    href: "https://wa.me/7708938866",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        className: "bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition-colors",
                        children: "Contact Us"
                    }, void 0, false, {
                        fileName: "[project]/components/Header.js",
                        lineNumber: 1777,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/Header.js",
                    lineNumber: 1776,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Header.js",
                lineNumber: 1775,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                className: "md:hidden text-gray-800",
                onClick: ()=>setMenuOpen(!menuOpen),
                "aria-label": menuOpen ? "Close menu" : "Open menu",
                children: menuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                    size: 28
                }, void 0, false, {
                    fileName: "[project]/components/Header.js",
                    lineNumber: 1789,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                    size: 28
                }, void 0, false, {
                    fileName: "[project]/components/Header.js",
                    lineNumber: 1789,
                    columnNumber: 39
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Header.js",
                lineNumber: 1784,
                columnNumber: 7
            }, this),
            menuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "absolute top-full left-0 w-full bg-white p-6 flex flex-col items-center gap-4 shadow-md md:hidden z-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            setSelectCourseModal(true);
                            setMenuOpen(false);
                        },
                        className: "bg-blue-100 text-blue-700 px-6 py-2 rounded font-semibold hover:bg-blue-200 transition-colors w-full",
                        children: "Take Test"
                    }, void 0, false, {
                        fileName: "[project]/components/Header.js",
                        lineNumber: 1795,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            document.getElementById("courses")?.scrollIntoView({
                                behavior: "smooth"
                            });
                            setMenuOpen(false);
                        },
                        className: "bg-blue-100 text-blue-700 px-6 py-2 rounded hover:bg-blue-200 transition-colors w-full",
                        children: "Courses"
                    }, void 0, false, {
                        fileName: "[project]/components/Header.js",
                        lineNumber: 1805,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            document.getElementById("meet-our-stars")?.scrollIntoView({
                                behavior: "smooth"
                            });
                            setMenuOpen(false);
                        },
                        className: "bg-blue-100 text-blue-700 px-6 py-2 rounded hover:bg-blue-200 transition-colors w-full",
                        children: "Success Story"
                    }, void 0, false, {
                        fileName: "[project]/components/Header.js",
                        lineNumber: 1815,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                        href: "https://wa.me/7305014818",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "bg-blue-100 text-blue-700 px-6 py-2 rounded hover:bg-blue-200 transition-colors w-full text-center",
                        children: "Hire Students"
                    }, void 0, false, {
                        fileName: "[project]/components/Header.js",
                        lineNumber: 1825,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                        href: "https://wa.me/7708938866",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors w-full text-center",
                        children: "Contact Us"
                    }, void 0, false, {
                        fileName: "[project]/components/Header.js",
                        lineNumber: 1834,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Header.js",
                lineNumber: 1794,
                columnNumber: 9
            }, this),
            selectCourseModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "bg-white w-full max-w-md rounded-lg p-5 shadow-lg",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                            className: "text-lg font-bold mb-4 text-center",
                            children: "Select Test"
                        }, void 0, false, {
                            fileName: "[project]/components/Header.js",
                            lineNumber: 1849,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-3",
                            children: courseOptions.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleCourseSelect(c.id),
                                    className: "w-full bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-3 rounded transition-colors",
                                    children: c.label
                                }, c.id, false, {
                                    fileName: "[project]/components/Header.js",
                                    lineNumber: 1853,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/Header.js",
                            lineNumber: 1851,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            className: "mt-4 w-full bg-gray-200 hover:bg-gray-300 px-4 py-3 rounded transition-colors",
                            onClick: ()=>setSelectCourseModal(false),
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/components/Header.js",
                            lineNumber: 1863,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Header.js",
                    lineNumber: 1848,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Header.js",
                lineNumber: 1847,
                columnNumber: 9
            }, this),
            detailsModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "bg-white w-full max-w-md rounded-lg p-6 shadow-lg",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-bold mb-4 text-center",
                            children: courseOptions.find((c)=>c.id === selectedCourse)?.label || "Test"
                        }, void 0, false, {
                            fileName: "[project]/components/Header.js",
                            lineNumber: 1877,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                            onSubmit: handleStartTest,
                            className: "flex flex-col gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    className: "border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500",
                                    placeholder: "Full Name",
                                    value: name,
                                    onChange: (e)=>setName(e.target.value),
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/components/Header.js",
                                    lineNumber: 1882,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    className: "border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500",
                                    placeholder: "Degree (BSc, BCA, B.Tech)",
                                    value: degree,
                                    onChange: (e)=>setDegree(e.target.value),
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/components/Header.js",
                                    lineNumber: 1890,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    className: "border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500",
                                    placeholder: "Mobile Number",
                                    maxLength: 10,
                                    value: mobile,
                                    onChange: (e)=>setMobile(e.target.value.replace(/\D/g, '')),
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/components/Header.js",
                                    lineNumber: 1898,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded flex-1 transition-colors",
                                            children: "Start Test"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Header.js",
                                            lineNumber: 1908,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>{
                                                setDetailsModal(false);
                                                setName("");
                                                setDegree("");
                                                setMobile("");
                                            },
                                            className: "bg-gray-200 hover:bg-gray-300 px-4 py-3 rounded flex-1 transition-colors",
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Header.js",
                                            lineNumber: 1915,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Header.js",
                                    lineNumber: 1907,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Header.js",
                            lineNumber: 1881,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Header.js",
                    lineNumber: 1876,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Header.js",
                lineNumber: 1875,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Header.js",
        lineNumber: 1734,
        columnNumber: 5
    }, this);
}
}),
"[project]/pages/_app.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MyApp
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [ssr] (ecmascript)");
// ✅ Import main navbar
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Header$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Header.js [ssr] (ecmascript)");
;
;
;
;
function MyApp({ Component, pageProps }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("link", {
                        rel: "icon",
                        href: "/Fav icon/Fav Icon.png"
                    }, void 0, false, {
                        fileName: "[project]/pages/_app.js",
                        lineNumber: 11,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        httpEquiv: "Content-Type",
                        content: "text/html; charset=utf-8"
                    }, void 0, false, {
                        fileName: "[project]/pages/_app.js",
                        lineNumber: 12,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "language",
                        content: "English"
                    }, void 0, false, {
                        fileName: "[project]/pages/_app.js",
                        lineNumber: 13,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "revisit-after",
                        content: "7 days"
                    }, void 0, false, {
                        fileName: "[project]/pages/_app.js",
                        lineNumber: 14,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("script", {
                        async: true,
                        src: "https://www.googletagmanager.com/gtag/js?id=G-1XKPBTNBET"
                    }, void 0, false, {
                        fileName: "[project]/pages/_app.js",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("script", {
                        dangerouslySetInnerHTML: {
                            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-1XKPBTNBET');
            `
                        }
                    }, void 0, false, {
                        fileName: "[project]/pages/_app.js",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/_app.js",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            !Component.noGlobalHeader && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Header$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/_app.js",
                lineNumber: 35,
                columnNumber: 37
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Component, {
                ...pageProps
            }, void 0, false, {
                fileName: "[project]/pages/_app.js",
                lineNumber: 38,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__92c3de83._.js.map