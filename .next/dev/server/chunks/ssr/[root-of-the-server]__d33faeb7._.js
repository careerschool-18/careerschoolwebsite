module.exports = [
"[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("styled-jsx/style.js", () => require("styled-jsx/style.js"));

module.exports = mod;
}),
"[project]/pages/NewYearOffer2026.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NewYearOffer2026
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
"use client";
;
;
;
function NewYearOffer2026() {
    const reviewTrack = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    let reviewIndex = 0;
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const interval = setInterval(()=>{
            if (!reviewTrack.current) return;
            const visible = window.innerWidth <= 900 ? 1 : 2;
            const cardWidth = reviewTrack.current.children[0].getBoundingClientRect().width + 24;
            reviewIndex++;
            if (reviewIndex > reviewTrack.current.children.length - visible) {
                reviewIndex = 0;
            }
            reviewTrack.current.style.transform = `translateX(-${reviewIndex * cardWidth}px)`;
        }, 3000);
        return ()=>clearInterval(interval);
    }, []);
    const toggleSyllabus = (e)=>{
        const syllabus = e.currentTarget.closest(".course").querySelector(".syllabus");
        syllabus.classList.toggle("open");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
                id: "65c958c66a7a71fa",
                children: ':root{--primary:#1ecbff;--primary-dark:#0fa0cf;--bg-dark:#0b1a24;--text-light:#d6e9f5}*{box-sizing:border-box;margin:0;padding:0}body{background:radial-gradient(circle at top,#0e2a3f,var(--bg-dark));color:#fff;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif}.hero{padding:80px 16px 100px;position:relative;overflow:hidden}.hero-bg{z-index:0;position:absolute;inset:0}.hero-bg img{object-fit:cover;width:100%;height:100%}.hero-overlay{background:linear-gradient(#050f16a6,#050f16e6);position:absolute;inset:0}.hero-inner{z-index:1;grid-template-columns:1.1fr .9fr;align-items:center;gap:40px;max-width:1100px;margin:auto;display:grid;position:relative}.hero h1{margin-bottom:16px;font-size:max(30px,min(5vw,56px));font-weight:800}.hero p{color:var(--text-light);margin-bottom:24px;font-size:18px}.hero ul{margin-bottom:28px;list-style:none}.hero li{margin-bottom:10px}.hero li:before{content:"✓";color:var(--primary);margin-right:10px}.primary-btn{background:linear-gradient(135deg,var(--primary),var(--primary-dark));color:#fff;cursor:pointer;border:none;border-radius:12px;padding:16px 34px;font-weight:700}.form-card{color:#111;background:#fff;border-radius:18px;padding:28px}.form-card input,.form-card select{border:1px solid #ddd;border-radius:10px;width:100%;margin-bottom:14px;padding:14px}.trust{text-align:center;color:#cdefff;background:#020a10;padding:32px;font-size:14px}.section{padding:80px 16px}.section h2{text-align:center;margin-bottom:40px;font-size:38px}.courses{grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px;max-width:1100px;margin:auto;display:grid}.course{color:#111;background:#fff;border-radius:18px;padding:60px 26px 26px;position:relative}.course-icon{background:#eef7ff;border-radius:50%;justify-content:center;align-items:center;width:46px;height:46px;display:flex;position:absolute;top:18px;left:18px;box-shadow:0 6px 14px #0000002e}.course-icon img{object-fit:contain;width:26px;height:26px}.course-actions{gap:10px;margin:16px 0;display:flex}.btn-syllabus{background:linear-gradient(135deg,var(--primary),var(--primary-dark));color:#fff;cursor:pointer;border:none;border-radius:10px;flex:1;padding:12px;font-weight:700}.btn-enroll{border:2px solid var(--primary);color:var(--primary);cursor:pointer;background:0 0;border-radius:10px;flex:1;padding:12px;font-weight:700}.syllabus{color:#333;background:#f7fbff;border-radius:12px;max-height:0;padding:0 14px;transition:all .35s;overflow:hidden}.syllabus.open{max-height:280px;padding:14px}.review-section{background:#020a10}.review-carousel{max-width:1100px;margin:auto;overflow:hidden}.review-track{gap:24px;transition:transform .6s;display:flex}.review-card{color:#111;background:#fff;border-radius:18px;flex:0 0 50%;padding:24px}@media (width<=900px){.hero-inner{grid-template-columns:1fr}.review-card{flex:0 0 100%}}'
            }, void 0, false, void 0, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                className: "jsx-65c958c66a7a71fa" + " " + "hero",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-65c958c66a7a71fa" + " " + "hero-bg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                src: "/Newyear/Banner.png",
                                alt: "New Year Offer",
                                className: "jsx-65c958c66a7a71fa"
                            }, void 0, false, {
                                fileName: "[project]/pages/NewYearOffer2026.js",
                                lineNumber: 294,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-65c958c66a7a71fa" + " " + "hero-overlay"
                            }, void 0, false, {
                                fileName: "[project]/pages/NewYearOffer2026.js",
                                lineNumber: 295,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/NewYearOffer2026.js",
                        lineNumber: 293,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-65c958c66a7a71fa" + " " + "hero-inner",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-65c958c66a7a71fa",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                        className: "jsx-65c958c66a7a71fa",
                                        children: "Open New Opportunities in 2026 🚀"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/NewYearOffer2026.js",
                                        lineNumber: 300,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "jsx-65c958c66a7a71fa",
                                        children: "New Year Special Offer on Job-Ready Skill Programs"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/NewYearOffer2026.js",
                                        lineNumber: 301,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                                        className: "jsx-65c958c66a7a71fa",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                className: "jsx-65c958c66a7a71fa",
                                                children: "Industry-aligned curriculum"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/NewYearOffer2026.js",
                                                lineNumber: 303,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                className: "jsx-65c958c66a7a71fa",
                                                children: "Live mentor support"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/NewYearOffer2026.js",
                                                lineNumber: 304,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                className: "jsx-65c958c66a7a71fa",
                                                children: "Career & placement guidance"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/NewYearOffer2026.js",
                                                lineNumber: 305,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/NewYearOffer2026.js",
                                        lineNumber: 302,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "jsx-65c958c66a7a71fa" + " " + "primary-btn",
                                        children: "🎉 Claim New Year Offer"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/NewYearOffer2026.js",
                                        lineNumber: 307,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/NewYearOffer2026.js",
                                lineNumber: 299,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-65c958c66a7a71fa" + " " + "form-card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                        className: "jsx-65c958c66a7a71fa",
                                        children: "Get Offer Details"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/NewYearOffer2026.js",
                                        lineNumber: 311,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        placeholder: "Full Name",
                                        className: "jsx-65c958c66a7a71fa"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/NewYearOffer2026.js",
                                        lineNumber: 312,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        placeholder: "Mobile Number",
                                        className: "jsx-65c958c66a7a71fa"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/NewYearOffer2026.js",
                                        lineNumber: 313,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                        className: "jsx-65c958c66a7a71fa",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                className: "jsx-65c958c66a7a71fa",
                                                children: "Select Course"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/NewYearOffer2026.js",
                                                lineNumber: 315,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                className: "jsx-65c958c66a7a71fa",
                                                children: "Java"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/NewYearOffer2026.js",
                                                lineNumber: 316,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                className: "jsx-65c958c66a7a71fa",
                                                children: "Python"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/NewYearOffer2026.js",
                                                lineNumber: 317,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                className: "jsx-65c958c66a7a71fa",
                                                children: "Data Analytics"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/NewYearOffer2026.js",
                                                lineNumber: 318,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/NewYearOffer2026.js",
                                        lineNumber: 314,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "jsx-65c958c66a7a71fa" + " " + "primary-btn",
                                        children: "Submit"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/NewYearOffer2026.js",
                                        lineNumber: 320,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/NewYearOffer2026.js",
                                lineNumber: 310,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/NewYearOffer2026.js",
                        lineNumber: 298,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/NewYearOffer2026.js",
                lineNumber: 292,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "jsx-65c958c66a7a71fa" + " " + "trust",
                children: "Trusted by thousands of learners • CareerSchool 2026 Skill Upgrade"
            }, void 0, false, {
                fileName: "[project]/pages/NewYearOffer2026.js",
                lineNumber: 325,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                className: "jsx-65c958c66a7a71fa" + " " + "section",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        className: "jsx-65c958c66a7a71fa",
                        children: "Choose Your Learning Path"
                    }, void 0, false, {
                        fileName: "[project]/pages/NewYearOffer2026.js",
                        lineNumber: 331,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-65c958c66a7a71fa" + " " + "courses",
                        children: [
                            {
                                title: "Java Mastery",
                                image: "/course-icons/java.png",
                                points: [
                                    "Core Java",
                                    "OOPS",
                                    "Spring Basics",
                                    "Mini Project"
                                ]
                            },
                            {
                                title: "Python Pro",
                                image: "/course-icons/python.png",
                                points: [
                                    "Python Basics",
                                    "Automation",
                                    "Libraries",
                                    "Capstone"
                                ]
                            },
                            {
                                title: "Data Analytics",
                                image: "/course-icons/data.png",
                                points: [
                                    "Excel",
                                    "SQL",
                                    "Power BI",
                                    "Case Studies"
                                ]
                            }
                        ].map((course, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-65c958c66a7a71fa" + " " + "course",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-65c958c66a7a71fa" + " " + "course-icon",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                            src: course.image,
                                            alt: course.title,
                                            className: "jsx-65c958c66a7a71fa"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/NewYearOffer2026.js",
                                            lineNumber: 353,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/NewYearOffer2026.js",
                                        lineNumber: 352,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                        className: "jsx-65c958c66a7a71fa",
                                        children: course.title
                                    }, void 0, false, {
                                        fileName: "[project]/pages/NewYearOffer2026.js",
                                        lineNumber: 356,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-65c958c66a7a71fa" + " " + "course-actions",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: toggleSyllabus,
                                                className: "jsx-65c958c66a7a71fa" + " " + "btn-syllabus",
                                                children: "Get Syllabus"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/NewYearOffer2026.js",
                                                lineNumber: 359,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                className: "jsx-65c958c66a7a71fa" + " " + "btn-enroll",
                                                children: "Enroll"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/NewYearOffer2026.js",
                                                lineNumber: 362,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/NewYearOffer2026.js",
                                        lineNumber: 358,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-65c958c66a7a71fa" + " " + "syllabus",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                                            className: "jsx-65c958c66a7a71fa",
                                            children: course.points.map((p, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                    className: "jsx-65c958c66a7a71fa",
                                                    children: p
                                                }, j, false, {
                                                    fileName: "[project]/pages/NewYearOffer2026.js",
                                                    lineNumber: 368,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/pages/NewYearOffer2026.js",
                                            lineNumber: 366,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/NewYearOffer2026.js",
                                        lineNumber: 365,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/pages/NewYearOffer2026.js",
                                lineNumber: 351,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/pages/NewYearOffer2026.js",
                        lineNumber: 333,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/NewYearOffer2026.js",
                lineNumber: 330,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                className: "jsx-65c958c66a7a71fa" + " " + "section review-section",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        className: "jsx-65c958c66a7a71fa",
                        children: "What Learners Say"
                    }, void 0, false, {
                        fileName: "[project]/pages/NewYearOffer2026.js",
                        lineNumber: 379,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-65c958c66a7a71fa" + " " + "review-carousel",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            ref: reviewTrack,
                            className: "jsx-65c958c66a7a71fa" + " " + "review-track",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "jsx-65c958c66a7a71fa" + " " + "review-card",
                                    children: "★★★★★ Excellent training experience"
                                }, void 0, false, {
                                    fileName: "[project]/pages/NewYearOffer2026.js",
                                    lineNumber: 383,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "jsx-65c958c66a7a71fa" + " " + "review-card",
                                    children: "★★★★★ Best institute for analytics"
                                }, void 0, false, {
                                    fileName: "[project]/pages/NewYearOffer2026.js",
                                    lineNumber: 384,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "jsx-65c958c66a7a71fa" + " " + "review-card",
                                    children: "Java course helped me crack interviews"
                                }, void 0, false, {
                                    fileName: "[project]/pages/NewYearOffer2026.js",
                                    lineNumber: 385,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "jsx-65c958c66a7a71fa" + " " + "review-card",
                                    children: "Great mentors and structure"
                                }, void 0, false, {
                                    fileName: "[project]/pages/NewYearOffer2026.js",
                                    lineNumber: 388,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/NewYearOffer2026.js",
                            lineNumber: 382,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pages/NewYearOffer2026.js",
                        lineNumber: 381,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/NewYearOffer2026.js",
                lineNumber: 378,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/components/HeroBanner.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HeroBanner
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$NewYearOffer2026$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/pages/NewYearOffer2026.js [ssr] (ecmascript)");
"use client";
;
;
;
;
;
function HeroBanner() {
    const [showOffer, setShowOffer] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                className: "jsx-1965333e49312bb2" + " " + "relative overflow-hidden bg-[#f9ca1b] py-1 sm:py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-1965333e49312bb2" + " " + "relative flex items-center justify-end w-full px-4 sm:px-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowOffer(true),
                                className: "jsx-1965333e49312bb2" + " " + "z-20 flex-shrink-0 bg-[#1f4a7e] text-[#f9ca1b] px-4 sm:px-6 py-1.5 sm:py-2 font-semibold rounded-[7px] text-xs sm:text-sm lg:text-base transition-all duration-300 hover:scale-105 hover:bg-[#173a65] focus:outline-none focus:ring-2 focus:ring-[#1f4a7e] focus:ring-offset-2",
                                children: "ENROLL NOW"
                            }, void 0, false, {
                                fileName: "[project]/components/HeroBanner.js",
                                lineNumber: 16,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    right: "min(8vw, 180px)"
                                },
                                className: "jsx-1965333e49312bb2" + " " + "absolute left-0 overflow-hidden whitespace-nowrap",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "jsx-1965333e49312bb2" + " " + "marquee-track text-sm sm:text-lg md:text-xl xl:text-2xl font-bold text-[#1f4a7e]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "jsx-1965333e49312bb2",
                                            children: "Open New Opportunities in 2026 🚀 | Start Your Skill Journey Today •"
                                        }, void 0, false, {
                                            fileName: "[project]/components/HeroBanner.js",
                                            lineNumber: 29,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "jsx-1965333e49312bb2",
                                            children: "Open New Opportunities in 2026 🚀 | Start Your Skill Journey Today •"
                                        }, void 0, false, {
                                            fileName: "[project]/components/HeroBanner.js",
                                            lineNumber: 32,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/HeroBanner.js",
                                    lineNumber: 28,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/HeroBanner.js",
                                lineNumber: 24,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/HeroBanner.js",
                        lineNumber: 13,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
                        id: "1965333e49312bb2",
                        children: "@keyframes marquee{0%{transform:translate(0)}to{transform:translate(-50%)}}.marquee-track.jsx-1965333e49312bb2{white-space:nowrap;will-change:transform;width:200%;animation:25s linear infinite marquee;display:inline-flex}@media (width>=2560px){.marquee-track.jsx-1965333e49312bb2{font-size:1.8rem;animation-duration:35s}}@media (width>=1920px) and (width<=2559px){.marquee-track.jsx-1965333e49312bb2{font-size:1.5rem;animation-duration:30s}}@media (width<=768px){.marquee-track.jsx-1965333e49312bb2{animation-duration:18s}}"
                    }, void 0, false, void 0, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/HeroBanner.js",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            showOffer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[100] overflow-y-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 bg-black bg-opacity-75 transition-opacity",
                        onClick: ()=>setShowOffer(false)
                    }, void 0, false, {
                        fileName: "[project]/components/HeroBanner.js",
                        lineNumber: 86,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "relative min-h-screen flex items-center justify-center p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowOffer(false),
                                className: "absolute top-6 right-6 z-10 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white",
                                "aria-label": "Close offer",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                                    className: "w-6 h-6",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: "2",
                                        d: "M6 18L18 6M6 6l12 12"
                                    }, void 0, false, {
                                        fileName: "[project]/components/HeroBanner.js",
                                        lineNumber: 100,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/HeroBanner.js",
                                    lineNumber: 99,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/HeroBanner.js",
                                lineNumber: 94,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "relative w-full max-w-6xl",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$NewYearOffer2026$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/components/HeroBanner.js",
                                    lineNumber: 106,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/HeroBanner.js",
                                lineNumber: 105,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/HeroBanner.js",
                        lineNumber: 92,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/HeroBanner.js",
                lineNumber: 84,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
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
"[project]/components/FullImage.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FullImage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
"use client";
;
;
function FullImage() {
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let animationFrameId;
        let snowflakes = [];
        const resizeCanvas = ()=>{
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            initSnowflakes();
        };
        const initSnowflakes = ()=>{
            snowflakes = [];
            const count = Math.floor(canvas.width * canvas.height / 8000); // Reduced density
            for(let i = 0; i < count; i++){
                const isStar = Math.random() < 0.2; // 20% chance to be a falling star
                snowflakes.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: isStar ? Math.random() * 1.5 + 1.8 : Math.random() * 2.5 + 1.2,
                    speed: Math.random() * 1 + 0.5,
                    drift: Math.random() * 0.5 - 0.25,
                    isStar: isStar,
                    opacity: isStar ? 0.9 : 0.75,
                    sparklePhase: Math.random() * Math.PI * 2,
                    rotation: 0,
                    rotationSpeed: isStar ? (Math.random() - 0.5) * 0.05 : 0
                });
            }
        };
        const drawSnowflakes = ()=>{
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            snowflakes.forEach((flake)=>{
                if (flake.isStar) {
                    // Calculate pulsing opacity for sparkle effect
                    const pulseOpacity = (0.6 + Math.sin(flake.sparklePhase) * 0.3) * flake.opacity;
                    ctx.save();
                    ctx.translate(flake.x, flake.y);
                    ctx.rotate(flake.rotation);
                    // Draw yellow star with strong golden glow
                    ctx.shadowBlur = 12;
                    ctx.shadowColor = `rgba(255, 215, 0, ${pulseOpacity * 0.8})`;
                    ctx.fillStyle = `rgba(255, 215, 0, ${pulseOpacity})`;
                    // Draw 4-pointed star
                    ctx.beginPath();
                    for(let i = 0; i < 8; i++){
                        const angle = i * Math.PI / 4;
                        const radius = i % 2 === 0 ? flake.radius : flake.radius * 0.4;
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;
                        if (i === 0) ctx.moveTo(x, y);
                        else ctx.lineTo(x, y);
                    }
                    ctx.closePath();
                    ctx.fill();
                    // Add extra bright golden center
                    ctx.shadowBlur = 6;
                    ctx.shadowColor = `rgba(255, 223, 0, ${pulseOpacity})`;
                    ctx.beginPath();
                    ctx.arc(0, 0, flake.radius * 0.3, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 223, 0, ${Math.min(1, pulseOpacity + 0.2)})`;
                    ctx.fill();
                    // Add outer glow ring
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = `rgba(255, 215, 0, ${pulseOpacity * 0.5})`;
                    ctx.beginPath();
                    ctx.arc(0, 0, flake.radius * 0.15, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 235, 50, ${pulseOpacity})`;
                    ctx.fill();
                    ctx.restore();
                } else {
                    // Draw regular white snowflake with subtle glow
                    ctx.shadowBlur = 2;
                    ctx.shadowColor = `rgba(255, 255, 255, ${flake.opacity * 0.4})`;
                    ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
                    ctx.beginPath();
                    ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
                    ctx.fill();
                }
                // Reset shadow
                ctx.shadowBlur = 0;
            });
        };
        const updateSnowflakes = ()=>{
            snowflakes.forEach((flake)=>{
                flake.y += flake.speed;
                flake.x += flake.drift;
                // Update sparkle animation for stars
                if (flake.isStar) {
                    flake.sparklePhase += 0.08;
                    flake.rotation += flake.rotationSpeed;
                }
                if (flake.y > canvas.height) {
                    flake.y = -10;
                    flake.x = Math.random() * canvas.width;
                }
                if (flake.x > canvas.width) {
                    flake.x = 0;
                } else if (flake.x < 0) {
                    flake.x = canvas.width;
                }
            });
        };
        const animate = ()=>{
            drawSnowflakes();
            updateSnowflakes();
            animationFrameId = requestAnimationFrame(animate);
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        animate();
        return ()=>{
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
        className: "relative w-full h-screen overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                src: "/Home page images/Home Page - 3840 x 2160.jpg",
                alt: "Desktop View",
                className: "hidden sm:block w-full h-full object-cover"
            }, void 0, false, {
                fileName: "[project]/components/FullImage.js",
                lineNumber: 148,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                src: "/Home page images/Home Page - 1080 x 920.jpg",
                alt: "Mobile View",
                className: "block sm:hidden w-full h-full object-cover",
                loading: "eager"
            }, void 0, false, {
                fileName: "[project]/components/FullImage.js",
                lineNumber: 155,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/40"
            }, void 0, false, {
                fileName: "[project]/components/FullImage.js",
                lineNumber: 163,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("canvas", {
                ref: canvasRef,
                className: "absolute inset-0 pointer-events-none z-10",
                style: {
                    width: "100%",
                    height: "100%"
                }
            }, void 0, false, {
                fileName: "[project]/components/FullImage.js",
                lineNumber: 166,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "absolute left-5 sm:left-10 top-1/2 transform -translate-y-1/2 text-left z-20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                    className: "text-[#ffd02b] font-extrabold uppercase text-3xl sm:text-5xl md:text-6xl leading-tight drop-shadow-lg",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            className: "block mb-4 sm:mb-6 md:mb-8",
                            children: "Your"
                        }, void 0, false, {
                            fileName: "[project]/components/FullImage.js",
                            lineNumber: 175,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            className: "block mb-4 sm:mb-6 md:mb-8",
                            children: "Trusted Training"
                        }, void 0, false, {
                            fileName: "[project]/components/FullImage.js",
                            lineNumber: 176,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            className: "block mb-4 sm:mb-6 md:mb-8",
                            children: "&"
                        }, void 0, false, {
                            fileName: "[project]/components/FullImage.js",
                            lineNumber: 177,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            className: "block",
                            children: "Placement Hub"
                        }, void 0, false, {
                            fileName: "[project]/components/FullImage.js",
                            lineNumber: 178,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/FullImage.js",
                    lineNumber: 174,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/FullImage.js",
                lineNumber: 173,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/FullImage.js",
        lineNumber: 146,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/GoogleReview.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ShowcaseSection
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
"use client";
;
;
function ShowcaseSection() {
    const words = [
        "STUDENTS",
        "COLLEGES",
        "CLIENTS",
        "PROFESSIONALS"
    ];
    const [text, setText] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [index, setIndex] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [isDeleting, setIsDeleting] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const current = words[index];
        const speed = isDeleting ? 80 : 120;
        const typingEffect = setTimeout(()=>{
            if (!isDeleting) {
                setText(current.substring(0, text.length + 1));
                if (text === current) {
                    setTimeout(()=>setIsDeleting(true), 1000);
                }
            } else {
                setText(current.substring(0, text.length - 1));
                if (text === "") {
                    setIsDeleting(false);
                    setIndex((prev)=>(prev + 1) % words.length);
                }
            }
        }, speed);
        return ()=>clearTimeout(typingEffect);
    }, [
        text,
        isDeleting,
        index
    ]);
    const desktopSlides = [
        {
            src: "/Social Media Banner image/Social Media Banners - Google (1).jpg",
            link: "https://www.google.com/search?q=Career+School+HR+Solutions+Reviews",
            alt: "Careerschool Google Review"
        },
        {
            src: "/Social Media Banner image/Social Media Banners - LinkedIn(1).jpg",
            link: "https://www.linkedin.com/company/careerschool-hr-solutions/",
            alt: "Careerschool LinkIn"
        },
        {
            src: "/Social Media Banner image/Social Media Banners - Instagram(2).jpg",
            link: "https://www.instagram.com/careerschoolhrsolutions",
            alt: "Careerschool Instagram"
        }
    ];
    const mobileSlides = [
        {
            src: "/Social Media Banner image/Mobile view image/SM Banner - Google (Mobile).jpg",
            link: "https://www.google.com/search?q=Career+School+HR+Solutions+Reviews",
            alt: "Careerschool Google Review"
        },
        {
            src: "/Social Media Banner image/Mobile view image/SM Banner - Linkedin (Mobile).jpg",
            link: "https://www.linkedin.com/company/careerschool-hr-solutions/",
            alt: "Careerschool LinkIn"
        },
        {
            src: "/Social Media Banner image/Mobile view image/SM Banner - Insta (Mobile).jpg",
            link: "https://www.instagram.com/careerschoolhrsolutions",
            alt: "Careerschool Instagram"
        }
    ];
    const [currentDesktop, setCurrentDesktop] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [currentMobile, setCurrentMobile] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const interval = setInterval(()=>{
            setCurrentDesktop((prev)=>(prev + 1) % desktopSlides.length);
        }, 4000);
        return ()=>clearInterval(interval);
    }, [
        desktopSlides.length
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const interval = setInterval(()=>{
            setCurrentMobile((prev)=>(prev + 1) % mobileSlides.length);
        }, 4000);
        return ()=>clearInterval(interval);
    }, [
        mobileSlides.length
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
        className: "relative w-full flex flex-col items-center justify-center overflow-hidden bg-white py-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "text-center mb-6 px-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                    className: "text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-snug",
                    children: [
                        "TRUSTED BY",
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            className: "text-blue-600 font-extrabold",
                            children: "1,000+"
                        }, void 0, false, {
                            fileName: "[project]/components/GoogleReview.js",
                            lineNumber: 90,
                            columnNumber: 11
                        }, this),
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("br", {
                            className: "block sm:hidden"
                        }, void 0, false, {
                            fileName: "[project]/components/GoogleReview.js",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            className: "bg-yellow-400 px-3 py-1 rounded font-extrabold text-gray-900 inline-block mt-2",
                            children: [
                                text,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    className: "animate-pulse",
                                    children: "|"
                                }, void 0, false, {
                                    fileName: "[project]/components/GoogleReview.js",
                                    lineNumber: 94,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/GoogleReview.js",
                            lineNumber: 92,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/GoogleReview.js",
                    lineNumber: 88,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/GoogleReview.js",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden items-center justify-center bg-white hidden sm:flex",
                children: [
                    desktopSlides.map((slide, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                            href: slide.link,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: `absolute inset-0 flex items-center justify-center transition-opacity duration-[2000ms] ease-in-out ${currentDesktop === i ? "opacity-100 z-10" : "opacity-0 z-0"}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                src: slide.src,
                                alt: slide.alt,
                                className: "w-[100vw] h-auto max-h-full object-contain object-center"
                            }, void 0, false, {
                                fileName: "[project]/components/GoogleReview.js",
                                lineNumber: 111,
                                columnNumber: 13
                            }, this)
                        }, i, false, {
                            fileName: "[project]/components/GoogleReview.js",
                            lineNumber: 102,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-10 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20",
                        children: desktopSlides.map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: ()=>setCurrentDesktop(i),
                                className: `w-3 h-3 rounded-full transition-colors duration-300 ${currentDesktop === i ? "bg-blue-600" : "bg-gray-300"}`
                            }, i, false, {
                                fileName: "[project]/components/GoogleReview.js",
                                lineNumber: 122,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/GoogleReview.js",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/GoogleReview.js",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "relative w-full h-[45vh] overflow-hidden flex items-center justify-center bg-white sm:hidden",
                children: [
                    mobileSlides.map((slide, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                            href: slide.link,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: `absolute inset-0 flex items-center justify-center transition-opacity duration-[2000ms] ease-in-out ${currentMobile === i ? "opacity-100 z-10" : "opacity-0 z-0"}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                src: slide.src,
                                alt: slide.alt,
                                className: "w-full h-auto object-contain object-center"
                            }, void 0, false, {
                                fileName: "[project]/components/GoogleReview.js",
                                lineNumber: 145,
                                columnNumber: 13
                            }, this)
                        }, i, false, {
                            fileName: "[project]/components/GoogleReview.js",
                            lineNumber: 136,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 z-20",
                        children: mobileSlides.map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: ()=>setCurrentMobile(i),
                                className: `w-2.5 h-2.5 rounded-full transition-colors duration-300 ${currentMobile === i ? "bg-blue-600" : "bg-gray-300"}`
                            }, i, false, {
                                fileName: "[project]/components/GoogleReview.js",
                                lineNumber: 156,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/GoogleReview.js",
                        lineNumber: 154,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/GoogleReview.js",
                lineNumber: 134,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/GoogleReview.js",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/Discover.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Discover
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
;
function Discover() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
        className: "py-10 sm:py-16 bg-blue-700 text-center px-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                className: "text-2xl sm:text-2xl md:text-3xl font-bold leading-snug text-white max-w-3xl mx-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                    children: "Discover the right training to boost your career"
                }, void 0, false, {
                    fileName: "[project]/components/Discover.js",
                    lineNumber: 5,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Discover.js",
                lineNumber: 4,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                href: "https://wa.me/7708938866",
                target: "_blank",
                rel: "noopener noreferrer",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                    className: "mt-6 sm:mt-8 text-white px-5 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition",
                    style: {
                        backgroundColor: "#ffcb0e"
                    },
                    children: "Get Free Career Guidance"
                }, void 0, false, {
                    fileName: "[project]/components/Discover.js",
                    lineNumber: 13,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Discover.js",
                lineNumber: 8,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Discover.js",
        lineNumber: 3,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/StudentsReview.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StudentsReview
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
"use client";
;
;
function StudentsReview() {
    const [selectedReview, setSelectedReview] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [showAllMobile, setShowAllMobile] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const reviews = [
        {
            id: 1,
            name: "Sarathi S",
            training: "PYTHON WITH AI",
            review: "I’m really thankful to Careerschool HR Solutions for their excellent training and placement support. The learning experience was very practical and helped me gain strong technical skills.A special thanks to Ms. Roshini, my placement officer, for her continuous guidance, motivation, and support throughout my journey.With their help, I successfully got placed as a Software Trainee. I truly recommend Careerschool HR Solutions to anyone looking to start a successful IT career.",
            photo: "/sarathi pic.jpeg",
            alt: "Sarathi S_PYTHON WITH AI"
        },
        {
            id: 2,
            name: "Pavithra S",
            training: "PYTHON WITH AI",
            review: "I recently completed my Python with AI training at Careerschool, and it was an amazing learning experience. The Offline sessions in Chennai were clear, practical, and easy to understand, which helped me build strong technical knowledge and confidence. With the effective placement support and guidance from the team, I successfully got placed as a Software Trainee. I highly recommend Careerschool HR Solutions to anyone who wants to start a successful career in IT.",
            photo: "/Student Review Images/Pavithra.jpg",
            alt: "Pavithra S_PYTHON WITH AI"
        },
        {
            id: 3,
            name: "Subha Vadivu Lakshmi",
            training: "HR TRAINING",
            review: "I’m delighted to share that I’ve been placed as an HR Recruiter, and I’m truly thankful to Careerschool for this wonderful opportunity. The HR training and internship program helped me gain practical knowledge of key HR functions such as recruitment, college visits, and candidate interviews. It was an unforgettable experience that shaped my confidence and skills. I’m really happy to be moving closer to my dream career at such an early stage.",
            photo: "/Student Review Images/Subha Vadivu Lakshmi.jpg",
            alt: "Subha Vadivu Lakshmi_HR"
        },
        {
            id: 4,
            name: "Rajiya",
            training: "DATA ANALYTICS",
            review: "I’m Rajiya, and I recently completed my IT training in Nellore at Careerschool IT Solutions. Even after a 5-year career gap, I was able to secure a job in an IT company thanks to their excellent training, mentorship, and placement guidance. For students and job seekers in and around Nellore, I highly recommend Careerschool IT Solutions — it’s the best place to upgrade your skills and restart your career in IT.",
            photo: "/Student Review Images/Rajiya.jpg",
            alt: "Rajiya_Data Analytics"
        },
        {
            id: 5,
            name: "Malathi",
            training: "DATA ANALYTICS",
            review: "I completed a Data Analytics course from Careerschool HR Solutions. Good experience of training and placement sessions. The whole team gave full support and guidance for interviews. This is a good platform to start your career. Thank you...",
            photo: "/Student Review Images/Malathi.jpg",
            alt: "Malathi_Data Analytics"
        },
        {
            id: 6,
            name: "Ranjith",
            training: "DATA ANALYTICS",
            review: "First of all, special thanks to my great teacher Karthick Sir, my moral supporter Kathiya Ma'am, and my king maker Brindha Ma'am. I have 7+ years of experience in backend operations but lacked updated skills. When I joined Careerschool for Data Analytics, the training completely changed my confidence and career direction. Thanks to Careerschool, I now feel skilled and appreciated in my workplace!",
            photo: "/Student Review Images/Ranjith.jpg",
            alt: "Ranjith_Data Analytics"
        },
        {
            id: 7,
            name: "Afsal Ahamed",
            training: "HR TRAINING",
            review: "I am incredibly grateful to Careerschool HR Solutions for the invaluable guidance and support during my HR internship. A special thanks to Brindha Ma'am for her mentorship and encouragement. I’m thrilled to share that I’ve been placed as an HRBP — this achievement wouldn’t have been possible without the Careerschool team.",
            photo: "/Student Review Images/Afsal Ahamed.jpg",
            alt: "Afsal Ahamed_HR"
        },
        {
            id: 8,
            name: "Shyam Ganesh Prasad",
            training: "HR TRAINING",
            review: "I joined Careerschool 4 months ago as an HR intern. The staff and mentors were very supportive, especially Keerthana Ma'am, Brintha Ma'am, and Roshini Ma'am. I’m now placed as an HR Recruiter in a reputed company. Thanks to Careerschool HR Solutions!",
            photo: "/Student Review Images/Shyam Ganesh Prasad.jpg",
            alt: "Shyam Ganesh Prasad_HR"
        },
        {
            id: 9,
            name: "Manav Magesh",
            training: "DATA ANALYTICS",
            review: "I joined Careerschool HR Solutions to pursue Data Analytics, and it completely changed me. The training was excellent — Karthick Sir explains every concept clearly and gives interview tips. Kathya Ma’am encouraged me in both technical and soft skills. Now I’m placed and confident — highly recommended!",
            photo: "/Student Review Images/Manav.jpg",
            alt: "Manav_Data Analytics"
        },
        {
            id: 10,
            name: "Bhuvaneshwaran",
            training: "DATA ANALYTICS",
            review: "I completed the Data Analytics course at Careerschool. The sessions covered Advanced Excel, SQL, and Power BI with real-time examples. The HR team also provided strong resume and interview guidance.",
            photo: "/Student Review Images/Bhuwaneswar.jpg",
            alt: "Bhuwaneswar_Data Analytics"
        },
        {
            id: 11,
            name: "Saikumar Mallarapu",
            training: "FRONTEND DEVELOPMENT",
            review: "Hi, I’m Sai Kumar from Nellore. I attended the Careerschool Campus Drive and got selected as a Software Trainee. Great place to learn Python, Java Full Stack, AI, and Data Analytics with placement assistance.",
            photo: "/Student Review Images/Saikumar.jpg",
            alt: "Saikumar_NA"
        },
        {
            id: 12,
            name: "Gayathri",
            training: "DATA ANALYTICS",
            review: "I’m glad to have completed my training and internship with Careerschool HR Solutions. Throughout this journey, I gained valuable real-time exposure to data handling, analysis, and reporting — from collecting and cleaning data to presenting meaningful insights. This experience greatly boosted my confidence, technical skills, and professional approach.I’m also excited to share that I got placed! It’s truly the perfect start to my Data Analytics career.",
            photo: "/Student Review Images/Gayathri.jpg",
            alt: "Gayathri_Data Analytics"
        },
        {
            id: 13,
            name: "Divya",
            training: "HR",
            review: "I’m glad to have completed my HR internship at Careerschool HR Solutions, Guindy (one of the best training institutions in Chennai), under the guidance of the amazing Placement Team. Throughout the internship, I gained real-time exposure to recruitment and placement activities — from approaching clients to managing candidate communication and coordination.The Learning & Development (L&D) sessions were equally valuable. They helped me enhance my interpersonal skills, understand training and growth needs, and develop strong professional communication.",
            photo: "/Student Review Images/Divya.jpg",
            alt: "Divya_HR"
        },
        {
            id: 14,
            name: "Bhargav",
            training: "BUSSINESS ANALYTICS",
            review: "I completed my internship at Careerschool HR Solutions as a Business Analyst, where I gained valuable hands-on experience in the HR training and placement domain. This internship gave me the opportunity to work on real-time business processes, interact with clients, and support their business requirements.The mentors were extremely supportive, offering constant guidance that strengthened my practical skills and confidence in the Business Analyst role.",
            photo: "/Student Review Images/Bhargav.jpg",
            alt: "Bhargav_Bussiness Analytics"
        },
        {
            id: 15,
            name: "Velmurugan Vignesh",
            training: "DATA ANALYTICS",
            review: "I’m truly grateful to Careerschool for providing excellent Data Analytics Training and Placement support. Coming from a non-IT background, I was unsure how to start my career in IT field, but their training and internship program gave me the right guidance and hands-on experience to confidently begin my journey as a Data Analyst. Thanks to their continuous support, I was able to secure a job and build my career in the IT domain. I highly recommend Careerschool to anyone looking for career-oriented Online & Offline Training or internships in Data Analytics or other software programs.",
            photo: "/Student Review Images/Velmurugan.jpg",
            alt: "Velmurugan_Data Analytics"
        }
    ];
    const visibleReviews = ("TURBOPACK simplified expression", ("TURBOPACK compile-time value", "undefined") !== "undefined") && !showAllMobile ? "TURBOPACK unreachable" : reviews;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
        className: "py-10 bg-white text-center overflow-hidden px-4 sm:px-6 relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                className: "text-2xl sm:text-2xl md:text-3xl font-bold mb-8 text-[#004AAD]",
                children: "Hear It From Our Learners"
            }, void 0, false, {
                fileName: "[project]/components/StudentsReview.js",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 justify-center",
                children: visibleReviews.map((student)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "bg-blue-700 text-white p-4 sm:p-6 rounded-xl flex flex-col items-center gap-3 shadow-lg w-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                src: student.photo,
                                alt: student.name,
                                className: "w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-white shadow-md"
                            }, void 0, false, {
                                fileName: "[project]/components/StudentsReview.js",
                                lineNumber: 42,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                className: "font-semibold text-[14px] sm:text-[16px] truncate w-full text-center",
                                children: student.name
                            }, void 0, false, {
                                fileName: "[project]/components/StudentsReview.js",
                                lineNumber: 47,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "text-[12px] sm:text-[13px] opacity-95 text-yellow-300 font-semibold truncate w-full text-center",
                                children: student.training
                            }, void 0, false, {
                                fileName: "[project]/components/StudentsReview.js",
                                lineNumber: 50,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelectedReview(student),
                                className: "mt-2 bg-yellow-400 text-blue-900 font-semibold text-[12px] sm:text-[13px] px-3 py-1 rounded-lg hover:bg-yellow-300 transition",
                                children: "Read Review"
                            }, void 0, false, {
                                fileName: "[project]/components/StudentsReview.js",
                                lineNumber: 54,
                                columnNumber: 13
                            }, this)
                        ]
                    }, student.id, true, {
                        fileName: "[project]/components/StudentsReview.js",
                        lineNumber: 38,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/StudentsReview.js",
                lineNumber: 36,
                columnNumber: 8
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "mt-6 sm:hidden",
                children: !showAllMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                    onClick: ()=>setShowAllMobile(true),
                    className: "bg-blue-700 text-white font-semibold text-sm px-4 py-2 rounded-lg hover:bg-blue-800 transition",
                    children: "See More"
                }, void 0, false, {
                    fileName: "[project]/components/StudentsReview.js",
                    lineNumber: 66,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                    onClick: ()=>setShowAllMobile(false),
                    className: "bg-gray-300 text-gray-800 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-400 transition",
                    children: "See Less"
                }, void 0, false, {
                    fileName: "[project]/components/StudentsReview.js",
                    lineNumber: 73,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/StudentsReview.js",
                lineNumber: 64,
                columnNumber: 8
            }, this),
            selectedReview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "bg-white text-gray-800 rounded-xl shadow-lg max-w-md w-full p-6 relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            onClick: ()=>setSelectedReview(null),
                            className: "absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-lg",
                            children: "✖"
                        }, void 0, false, {
                            fileName: "[project]/components/StudentsReview.js",
                            lineNumber: 85,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "flex items-center mb-4 gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: selectedReview.photo,
                                    alt: selectedReview.name,
                                    className: "w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border border-gray-300"
                                }, void 0, false, {
                                    fileName: "[project]/components/StudentsReview.js",
                                    lineNumber: 93,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                            className: "font-bold text-base sm:text-lg text-left",
                                            children: selectedReview.name
                                        }, void 0, false, {
                                            fileName: "[project]/components/StudentsReview.js",
                                            lineNumber: 99,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            className: "text-sm sm:text-base text-yellow-500 font-semibold text-left",
                                            children: selectedReview.training
                                        }, void 0, false, {
                                            fileName: "[project]/components/StudentsReview.js",
                                            lineNumber: 102,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/StudentsReview.js",
                                    lineNumber: 98,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/StudentsReview.js",
                            lineNumber: 92,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            className: "text-[13px] sm:text-[15px] leading-relaxed text-justify",
                            children: selectedReview.review
                        }, void 0, false, {
                            fileName: "[project]/components/StudentsReview.js",
                            lineNumber: 108,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/StudentsReview.js",
                    lineNumber: 84,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/StudentsReview.js",
                lineNumber: 83,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/StudentsReview.js",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/MeetOurStars.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MeetOurStars
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)");
"use client";
;
;
function MeetOurStars() {
    const students = [
        {
            img: "/Meet Our stars/Shalini.png",
            name: "Shalini",
            training: "DATA ANALYTICS TRAINING",
            started: "BSC",
            landed: "Jr Software Developer"
        },
        {
            img: "/Meet Our stars/Jayakumar.png",
            name: "Jayakumar",
            training: "DATA ANALYTICS TRAINING",
            started: "BSC",
            landed: "Operations"
        },
        {
            img: "/Meet Our stars/Sirisha Dasari.png",
            name: "Sirisha Dasari",
            started: "BSC Data Science",
            landed: "IT Internship"
        },
        {
            img: "/Meet Our stars/Prem.png",
            name: "Prem",
            training: "HR TRAINING",
            started: "MSW",
            landed: "HR Recruiter"
        },
        {
            img: "/Meet Our stars/Balakumaran.png",
            name: "Balakumaran",
            training: "WEB DEVELOPER TRAINING",
            started: "BCA",
            landed: "IT Backend"
        },
        {
            img: "/Meet Our stars/Sindhu.png",
            name: "Sindhu",
            training: "HR TRAINING",
            started: "BE ECE",
            landed: "HR Executive"
        },
        {
            img: "/Meet Our stars/HariPriya.png",
            name: "Haripriya",
            training: "HR TRAINING",
            started: "BE CSE",
            landed: "HR Recruiter"
        },
        {
            img: "/Meet Our stars/Shanthini.png",
            name: "Shanthini",
            training: "DATA ANALYTICS TRAINING",
            started: "B.COM",
            landed: "Data Executive"
        },
        {
            img: "/Meet Our stars/Medhuru Girish Kumar.png",
            name: "Medhuru Girish Kumar",
            started: "BCA",
            landed: "UI/UX Designer"
        },
        {
            img: "/Meet Our stars/Dhanyasree Javali.png",
            name: "Dhanyasree Javali",
            started: "MCA",
            landed: "Python Developer"
        },
        {
            img: "/Meet Our stars/Ashwathi.png",
            name: "Aswathi",
            training: "PYTHON WITH AI TRAINING",
            started: "BE ECE",
            landed: "Prompt Engineer"
        }
    ];
    const loopedStudents = [
        ...students,
        ...students
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
        id: "meet-our-stars",
        style: {
            backgroundColor: "#1d1e22"
        },
        className: "jsx-399f1f5880812373" + " " + "py-16 text-center overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                className: "jsx-399f1f5880812373" + " " + "text-2xl sm:text-2xl md:text-3xl font-bold text-white",
                children: "Meet Our Stars"
            }, void 0, false, {
                fileName: "[project]/components/MeetOurStars.js",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "jsx-399f1f5880812373" + " " + "relative w-full overflow-hidden mt-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "jsx-399f1f5880812373" + " " + "flex animate-marquee gap-5",
                    children: loopedStudents.map((student, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "jsx-399f1f5880812373" + " " + "bg-white rounded-xl shadow overflow-hidden min-w-[240px] flex-shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: student.img,
                                    alt: student.name,
                                    className: "jsx-399f1f5880812373" + " " + "h-52 w-full object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/components/MeetOurStars.js",
                                    lineNumber: 100,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "jsx-399f1f5880812373" + " " + "bg-blue-700 text-white p-4 h-52 flex flex-col justify-between text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "jsx-399f1f5880812373" + " " + "mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                    className: "jsx-399f1f5880812373" + " " + "font-bold text-base",
                                                    children: student.name
                                                }, void 0, false, {
                                                    fileName: "[project]/components/MeetOurStars.js",
                                                    lineNumber: 107,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "jsx-399f1f5880812373" + " " + "text-sm font-semibold text-yellow-400 mt-1",
                                                    children: student.training
                                                }, void 0, false, {
                                                    fileName: "[project]/components/MeetOurStars.js",
                                                    lineNumber: 108,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/MeetOurStars.js",
                                            lineNumber: 106,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "jsx-399f1f5880812373",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "jsx-399f1f5880812373" + " " + "text-xs text-white mb-1",
                                                    children: "Where I Started"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/MeetOurStars.js",
                                                    lineNumber: 114,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    className: "jsx-399f1f5880812373" + " " + "bg-yellow-400 text-black font-bold text-xs px-3 py-1 rounded",
                                                    children: student.started
                                                }, void 0, false, {
                                                    fileName: "[project]/components/MeetOurStars.js",
                                                    lineNumber: 115,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/MeetOurStars.js",
                                            lineNumber: 113,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "jsx-399f1f5880812373" + " " + "flex justify-center my-1",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                src: "/Meet Our stars/Arrow.png",
                                                alt: "Arrow Down",
                                                className: "jsx-399f1f5880812373" + " " + "h-5 w-5 animate-bounce opacity-90"
                                            }, void 0, false, {
                                                fileName: "[project]/components/MeetOurStars.js",
                                                lineNumber: 121,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/MeetOurStars.js",
                                            lineNumber: 120,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "jsx-399f1f5880812373" + " " + "mb-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "jsx-399f1f5880812373" + " " + "text-xs text-white mb-1",
                                                    children: "Where I Landed"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/MeetOurStars.js",
                                                    lineNumber: 129,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    className: "jsx-399f1f5880812373" + " " + "bg-yellow-400 text-black font-bold text-xs px-3 py-1 rounded",
                                                    children: student.landed
                                                }, void 0, false, {
                                                    fileName: "[project]/components/MeetOurStars.js",
                                                    lineNumber: 130,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/MeetOurStars.js",
                                            lineNumber: 128,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/MeetOurStars.js",
                                    lineNumber: 105,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/components/MeetOurStars.js",
                            lineNumber: 96,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/MeetOurStars.js",
                    lineNumber: 94,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/MeetOurStars.js",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
                id: "399f1f5880812373",
                children: "@keyframes marquee{0%{transform:translate(0)}to{transform:translate(-50%)}}.animate-marquee.jsx-399f1f5880812373{width:max-content;animation:35s linear infinite marquee;display:flex}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/MeetOurStars.js",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/Courses.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Courses
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
"use client";
;
;
function Courses() {
    const courses = [
        {
            title: "Learn Python with AI",
            duration: "3 Months (Rapid Learning)",
            highlight: "Internship & Placement Included",
            poster: "/Training cards image/Python Banner.jpg"
        },
        {
            title: "HR with Analytics",
            duration: "3 Months (Rapid Learning)",
            highlight: "ZOHO Pay Roll Module Included",
            poster: "/Training cards image/HR Analytics Banner.png"
        },
        {
            title: "Data Analytics",
            duration: "3 Months (Rapid Learning)",
            highlight: "ZOHO Pay Roll Module Included",
            poster: "/Training cards image/Data Analytics Banner.png"
        }
    ];
    const enrollLink = "https://243742367.hs-sites-na2.com/training-internship-with-certification-launch-your-career-today";
    const [current, setCurrent] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const interval = setInterval(()=>{
            setCurrent((prev)=>(prev + 1) % courses.length);
        }, 3000);
        return ()=>clearInterval(interval);
    }, [
        courses.length
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
        id: "courses",
        className: "w-full bg-white py-12 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "text-center mb-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        className: "text-2xl sm:text-3xl md:text-4xl font-bold text-[#004AAD] mb-3",
                        children: "Next Batch Starts Soon"
                    }, void 0, false, {
                        fileName: "[project]/components/Courses.js",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "text-sm sm:text-base text-gray-700 max-w-2xl mx-auto px-4",
                        children: "Industry-ready Training Programs with Internships & Placement Support for Students, Freshers, and Working Professionals."
                    }, void 0, false, {
                        fileName: "[project]/components/Courses.js",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Courses.js",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "hidden sm:flex justify-center gap-6 px-6 flex-wrap",
                children: courses.map((course, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex flex-col bg-[#004AAD] rounded-3xl shadow-xl overflow-hidden text-white transition-transform hover:scale-[1.04] flex-shrink-0 w-[300px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                src: course.poster,
                                alt: course.title,
                                className: "w-full h-[230px] object-cover"
                            }, void 0, false, {
                                fileName: "[project]/components/Courses.js",
                                lineNumber: 56,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex flex-col justify-center items-center p-4 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                        className: "font-bold text-base sm:text-lg mb-1",
                                        children: course.title
                                    }, void 0, false, {
                                        fileName: "[project]/components/Courses.js",
                                        lineNumber: 63,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-xs sm:text-sm mb-2",
                                        children: [
                                            "⏰ ",
                                            course.duration
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Courses.js",
                                        lineNumber: 66,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "text-black font-semibold text-[10px] sm:text-xs px-3 py-1 rounded-full inline-block mb-3",
                                        style: {
                                            backgroundColor: "#FFD02B"
                                        },
                                        children: course.highlight
                                    }, void 0, false, {
                                        fileName: "[project]/components/Courses.js",
                                        lineNumber: 67,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                        href: enrollLink,
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            className: "font-bold px-5 py-2 rounded-full text-xs sm:text-sm transition hover:scale-[1.05]",
                                            style: {
                                                backgroundColor: "#FFFFFF",
                                                color: "#004AAD"
                                            },
                                            children: "ENROLL NOW"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Courses.js",
                                            lineNumber: 75,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Courses.js",
                                        lineNumber: 74,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Courses.js",
                                lineNumber: 62,
                                columnNumber: 13
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/components/Courses.js",
                        lineNumber: 52,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/Courses.js",
                lineNumber: 50,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "block sm:hidden relative w-full px-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex justify-center items-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "flex flex-col bg-[#004AAD] rounded-3xl shadow-xl overflow-hidden text-white transition-all duration-700 ease-in-out w-full max-w-[330px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: courses[current].poster,
                                    alt: courses[current].title,
                                    className: "w-full h-[220px] object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/components/Courses.js",
                                    lineNumber: 96,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col justify-center items-center p-4 text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                            className: "font-bold text-base mb-1",
                                            children: courses[current].title
                                        }, void 0, false, {
                                            fileName: "[project]/components/Courses.js",
                                            lineNumber: 103,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            className: "text-xs mb-2",
                                            children: [
                                                "⏰ ",
                                                courses[current].duration
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/Courses.js",
                                            lineNumber: 106,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "text-black font-semibold text-[10px] px-3 py-1 rounded-full inline-block mb-3",
                                            style: {
                                                backgroundColor: "#FFD02B"
                                            },
                                            children: courses[current].highlight
                                        }, void 0, false, {
                                            fileName: "[project]/components/Courses.js",
                                            lineNumber: 107,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                            href: enrollLink,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                className: "font-bold px-5 py-2 rounded-full text-xs transition hover:scale-[1.05]",
                                                style: {
                                                    backgroundColor: "#FFFFFF",
                                                    color: "#004AAD"
                                                },
                                                children: "ENROLL NOW"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Courses.js",
                                                lineNumber: 115,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/Courses.js",
                                            lineNumber: 114,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Courses.js",
                                    lineNumber: 102,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, current, true, {
                            fileName: "[project]/components/Courses.js",
                            lineNumber: 92,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/Courses.js",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex justify-center mt-4 space-x-2",
                        children: courses.map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: `w-2 h-2 rounded-full transition-all ${i === current ? "bg-[#004AAD] scale-125" : "bg-gray-300"}`
                            }, i, false, {
                                fileName: "[project]/components/Courses.js",
                                lineNumber: 131,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/Courses.js",
                        lineNumber: 129,
                        columnNumber: 10
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Courses.js",
                lineNumber: 90,
                columnNumber: 8
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "mt-12 text-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                    href: enrollLink,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        className: "font-extrabold px-7 py-3 rounded-full text-sm sm:text-base transition hover:scale-[1.05]",
                        style: {
                            backgroundColor: "#004AAD",
                            color: "#FFFFFF"
                        },
                        children: "Explore More Courses"
                    }, void 0, false, {
                        fileName: "[project]/components/Courses.js",
                        lineNumber: 143,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/Courses.js",
                    lineNumber: 142,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Courses.js",
                lineNumber: 141,
                columnNumber: 8
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Courses.js",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/Alumni.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Alumni
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)");
;
;
function Alumni() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
        className: "jsx-837583ddbb29a9ca" + " " + "py-12 sm:py-16 text-center bg-blue-900 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                className: "jsx-837583ddbb29a9ca" + " " + "text-2xl sm:text-2xl md:text-3xl font-bold mb-8 sm:mb-10 text-white",
                children: "Our Alumni Proudly Placed In"
            }, void 0, false, {
                fileName: "[project]/components/Alumni.js",
                lineNumber: 4,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "jsx-837583ddbb29a9ca" + " " + "relative w-full overflow-hidden py-2 sm:py-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "jsx-837583ddbb29a9ca" + " " + "flex animate-marquee-left gap-6 sm:gap-10",
                    children: [
                        ...Array(3)
                    ].map((_, copy)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "jsx-837583ddbb29a9ca" + " " + "flex gap-6 sm:gap-10 items-center flex-shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Cognizant.png",
                                    alt: "Cognizant",
                                    className: "jsx-837583ddbb29a9ca" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/components/Alumni.js",
                                    lineNumber: 13,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Concentrix.png",
                                    alt: "Concentrix",
                                    className: "jsx-837583ddbb29a9ca" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/components/Alumni.js",
                                    lineNumber: 14,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Foundever.png",
                                    alt: "Foundever",
                                    className: "jsx-837583ddbb29a9ca" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/components/Alumni.js",
                                    lineNumber: 15,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Zoho.png",
                                    alt: "Zoho",
                                    className: "jsx-837583ddbb29a9ca" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/components/Alumni.js",
                                    lineNumber: 16,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Hexaware.png",
                                    alt: "Hexaware",
                                    className: "jsx-837583ddbb29a9ca" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/components/Alumni.js",
                                    lineNumber: 17,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Hcl.png",
                                    alt: "HCL",
                                    className: "jsx-837583ddbb29a9ca" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/components/Alumni.js",
                                    lineNumber: 18,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Ideas 2 IT.png",
                                    alt: "Ideal 2 IT",
                                    className: "jsx-837583ddbb29a9ca" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/components/Alumni.js",
                                    lineNumber: 19,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Hinduja.png",
                                    alt: "Hinduja",
                                    className: "jsx-837583ddbb29a9ca" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/components/Alumni.js",
                                    lineNumber: 20,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Indusind Bank.png",
                                    alt: "Indusind Bank",
                                    className: "jsx-837583ddbb29a9ca" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/components/Alumni.js",
                                    lineNumber: 21,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Tata Consultancy Services.png",
                                    alt: "Tata Consultancy Services",
                                    className: "jsx-837583ddbb29a9ca" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/components/Alumni.js",
                                    lineNumber: 22,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, copy, true, {
                            fileName: "[project]/components/Alumni.js",
                            lineNumber: 12,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/Alumni.js",
                    lineNumber: 10,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Alumni.js",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "jsx-837583ddbb29a9ca" + " " + "relative w-full overflow-hidden py-2 sm:py-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "jsx-837583ddbb29a9ca" + " " + "flex animate-marquee-right gap-6 sm:gap-10",
                    children: [
                        ...Array(3)
                    ].map((_, copy)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "jsx-837583ddbb29a9ca" + " " + "flex gap-6 sm:gap-10 items-center flex-shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/VThink.png",
                                    alt: "VThink",
                                    className: "jsx-837583ddbb29a9ca" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/components/Alumni.js",
                                    lineNumber: 33,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Movate.png",
                                    alt: "Movate",
                                    className: "jsx-837583ddbb29a9ca" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/components/Alumni.js",
                                    lineNumber: 34,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Omega Healthcare.png",
                                    alt: "Omega Healthcare",
                                    className: "jsx-837583ddbb29a9ca" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/components/Alumni.js",
                                    lineNumber: 35,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Quess.png",
                                    alt: "Quess",
                                    className: "jsx-837583ddbb29a9ca" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/components/Alumni.js",
                                    lineNumber: 36,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Advertflair.png",
                                    alt: "Advertflair",
                                    className: "jsx-837583ddbb29a9ca" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/components/Alumni.js",
                                    lineNumber: 37,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Altruist.png",
                                    alt: "Altruist",
                                    className: "jsx-837583ddbb29a9ca" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/components/Alumni.js",
                                    lineNumber: 38,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Ison.png",
                                    alt: "Ison",
                                    className: "jsx-837583ddbb29a9ca" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/components/Alumni.js",
                                    lineNumber: 39,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Teleperformance.png",
                                    alt: "Teleperformance",
                                    className: "jsx-837583ddbb29a9ca" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/components/Alumni.js",
                                    lineNumber: 40,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Tech Mahindra.png",
                                    alt: "Tech Mahindra",
                                    className: "jsx-837583ddbb29a9ca" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/components/Alumni.js",
                                    lineNumber: 41,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Startek.png",
                                    alt: "Startek",
                                    className: "jsx-837583ddbb29a9ca" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/components/Alumni.js",
                                    lineNumber: 42,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, copy, true, {
                            fileName: "[project]/components/Alumni.js",
                            lineNumber: 32,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/Alumni.js",
                    lineNumber: 30,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Alumni.js",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "jsx-837583ddbb29a9ca" + " " + "relative w-full overflow-hidden py-2 sm:py-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "jsx-837583ddbb29a9ca" + " " + "flex animate-marquee-left gap-6 sm:gap-10",
                    children: [
                        ...Array(3)
                    ].map((_, copy)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "jsx-837583ddbb29a9ca" + " " + "flex gap-6 sm:gap-10 items-center flex-shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Datamark.png",
                                    alt: "Datamark",
                                    className: "jsx-837583ddbb29a9ca" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/components/Alumni.js",
                                    lineNumber: 53,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/HDFC Bank.png",
                                    alt: "HDFC",
                                    className: "jsx-837583ddbb29a9ca" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/components/Alumni.js",
                                    lineNumber: 54,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/STAR Health Insurance.png",
                                    alt: "STAR Health Insurance",
                                    className: "jsx-837583ddbb29a9ca" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/components/Alumni.js",
                                    lineNumber: 55,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Sysekam.png",
                                    alt: "Sysekam",
                                    className: "jsx-837583ddbb29a9ca" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/components/Alumni.js",
                                    lineNumber: 56,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Access Healthcare.png",
                                    alt: "Access Healthcare",
                                    className: "jsx-837583ddbb29a9ca" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/components/Alumni.js",
                                    lineNumber: 57,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Emayam Tech.png",
                                    alt: "Emayam Tech",
                                    className: "jsx-837583ddbb29a9ca" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/components/Alumni.js",
                                    lineNumber: 58,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Paisabazaar.png",
                                    alt: "Paisabazaar",
                                    className: "jsx-837583ddbb29a9ca" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/components/Alumni.js",
                                    lineNumber: 59,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Mtutor.png",
                                    alt: "Mtutor",
                                    className: "jsx-837583ddbb29a9ca" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/components/Alumni.js",
                                    lineNumber: 60,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/ICICI Bank.png",
                                    alt: "ICICI Bank",
                                    className: "jsx-837583ddbb29a9ca" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/components/Alumni.js",
                                    lineNumber: 61,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Sutherland.png",
                                    alt: "Sutherland",
                                    className: "jsx-837583ddbb29a9ca" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/components/Alumni.js",
                                    lineNumber: 62,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, copy, true, {
                            fileName: "[project]/components/Alumni.js",
                            lineNumber: 52,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/Alumni.js",
                    lineNumber: 50,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Alumni.js",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
                id: "837583ddbb29a9ca",
                children: "@keyframes marquee-left{0%{transform:translate(0)}to{transform:translate(-33.333%)}}.animate-marquee-left.jsx-837583ddbb29a9ca,.animate-marquee-right.jsx-837583ddbb29a9ca{will-change:transform;width:max-content;animation-timing-function:linear;animation-iteration-count:infinite;display:flex}.animate-marquee-left.jsx-837583ddbb29a9ca{animation:30s linear infinite marquee-left}.animate-marquee-right.jsx-837583ddbb29a9ca{animation:30s linear infinite reverse marquee-left}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Alumni.js",
        lineNumber: 3,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/NeedHelp.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NeedHelp
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
"use client";
;
;
function NeedHelp() {
    // ✅ 6 Python Questions and Answers
    const faqs = [
        {
            q: "What are the best placement-oriented training courses after graduation?",
            a: "At Careerschool HR & IT Solutions, we offer top-rated career programs like Python Full Stack, Data Analytics, HR Analytics, Digital Marketing, and Java Training with internship and placement support."
        },
        {
            q: "Does Careerschool provide placement assistance after completing the training?",
            a: "Yes! Every training program at Careerschool includes pre-placement and post-placement support — covering interview preparation, resume building, aptitude sessions, and company tie-ups to help you get hired faster."
        },
        {
            q: "Why should I choose Careerschool HR & IT Solutions for training and placement?",
            a: "Careerschool stands out for its industry-ready curriculum, live tools exposure, certified trainers, internships, and placement tie-ups with leading companies. With branches in Guindy (Chennai) and Nellore (Andhra Pradesh), we’re helping learners across allover India launch their dream careers."
        },
        {
            q: "Who can enroll in Careerschool training & internship programs?",
            a: "Our programs are open to college students, fresh graduates (freshers), and working professionals who want to start or switch careers in IT, HR, or Analytics domains. No prior technical background is required — our courses are beginner-friendly and skill-based."
        },
        {
            q: "Do you have any free courses or demo training programs?",
            a: "Yes, Careerschool provides free demo training sessions and career guidance workshops for students, freshers, and professionals. These sessions cover the basics and helps learners choose the right course for their career goals."
        },
        {
            q: "Do you have courses in Chennai and Nellore only?",
            a: "Careerschool currently has training centers in Guindy, Chennai and Nellore, Andhra Pradesh, where we conduct offline sessions with internship and placement support. However, we also offer LIVE online classes with the same benefits that can be accessed from anywhere in India. So, whether you’re in Chennai, Nellore, or another city, you can still join our programs and learn from our expert trainers."
        }
    ];
    // ✅ State to track which question is open
    const [openIndex, setOpenIndex] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    // ✅ Toggle open/close on click
    const toggleAnswer = (index)=>{
        setOpenIndex(openIndex === index ? null : index);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
        className: "py-12 sm:py-16 bg-blue-800 text-center px-4 sm:px-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                className: "text-2xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-white",
                children: "Need Help"
            }, void 0, false, {
                fileName: "[project]/components/NeedHelp.js",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "max-w-3xl mx-auto flex flex-col items-center space-y-4 sm:space-y-6",
                children: faqs.map((faq, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "w-full rounded-xl shadow-md overflow-hidden bg-gradient-to-r from-white via-yellow-200 to-yellow-400 transition-transform duration-300 hover:scale-[1.02]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: ()=>toggleAnswer(i),
                                className: "w-full text-left px-5 py-4 text-gray-800 font-semibold text-base sm:text-lg flex justify-between items-center",
                                children: [
                                    faq.q,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "text-gray-700 font-bold text-xl",
                                        children: openIndex === i ? "−" : "+"
                                    }, void 0, false, {
                                        fileName: "[project]/components/NeedHelp.js",
                                        lineNumber: 61,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/NeedHelp.js",
                                lineNumber: 56,
                                columnNumber: 13
                            }, this),
                            openIndex === i && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "bg-white text-gray-800 text-sm sm:text-base px-5 py-4 border-t border-yellow-400",
                                children: faq.a
                            }, void 0, false, {
                                fileName: "[project]/components/NeedHelp.js",
                                lineNumber: 68,
                                columnNumber: 15
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/components/NeedHelp.js",
                        lineNumber: 51,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/NeedHelp.js",
                lineNumber: 49,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/NeedHelp.js",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/Footer.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa/index.mjs [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [ssr] (ecmascript) <export default as X>");
"use client";
;
;
;
;
function Footer() {
    const [showPolicy, setShowPolicy] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [activeModal, setActiveModal] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const courseLink = "https://243742367.hs-sites-na2.com/training-internship-with-certification-launch-your-career-today";
    const policies = {
        cancellation: {
            title: "Cancellation & Refund Policy",
            content: `Careerschool HR Solutions – Cancellation and Refund Policy:

- Once the registration is complete, no refunds will be issued under any circumstances.

- Candidates who discontinue or fail to complete the program remain liable for any unpaid fees.`
        },
        disclaimer: {
            title: "Disclaimer & Limitation of Liability",
            content: `Disclaimer & Limitation of Liability:

- All training materials and course content are provided "as is" without warranty of any kind.

- Careerschool HR Solutions is not liable for any indirect, incidental, or consequential damages arising from the use of our services.

- Participants are responsible for their own career outcomes and job placements.

- We do not guarantee employment or specific salary outcomes upon course completion.`
        },
        privacy: {
            title: "Privacy Policy",
            content: `Privacy Policy:

- We collect personal information including name, email, phone number, and educational details during registration.

- Your information is used solely for course administration, communication, and improving our services.

- We do not sell or share your personal data with third parties without consent, except as required by law.

- We implement appropriate security measures to protect your personal information.

- You have the right to access, modify, or request deletion of your personal data by contacting us.

- By registering, you consent to our collection and use of your information as described.`
        },
        shipping: {
            title: "Shipping & Exchange Policy",
            content: `Shipping & Exchange Policy:

- Course materials, certificates, and physical resources will be provided as per the program schedule.

- Digital materials are delivered via email or online platforms within 24-48 hours of enrollment.

- Physical materials (if applicable) are shipped within 7-10 business days.

- No exchanges or returns are accepted for course materials once accessed or received.

- Damaged materials must be reported within 48 hours of receipt for replacement.`
        },
        terms: {
            title: "Terms & Conditions",
            content: `Terms & Conditions:

- By enrolling, you agree to abide by all course rules, attendance requirements, and code of conduct.

- Students must maintain respectful behavior towards instructors and peers.

- Plagiarism, cheating, or any form of academic dishonesty may result in immediate termination without refund.

- Careerschool HR Solutions reserves the right to modify course content, schedules, and policies with prior notice.

- Students are expected to attend classes regularly; excessive absences may affect certification eligibility.

- All intellectual property, including course materials and recordings, remains the property of Careerschool HR Solutions.

- Unauthorized distribution or reproduction of course materials is strictly prohibited.

- We reserve the right to terminate enrollment for violations of these terms without refund.`
        }
    };
    const PolicyModal = ({ policy, onClose })=>{
        if (!policy) return null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-start mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                    className: "text-xl md:text-2xl font-bold text-gray-800",
                                    children: policy.title
                                }, void 0, false, {
                                    fileName: "[project]/components/Footer.js",
                                    lineNumber: 99,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: onClose,
                                    className: "text-gray-500 hover:text-gray-700 transition",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.js",
                                        lineNumber: 106,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/Footer.js",
                                    lineNumber: 102,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Footer.js",
                            lineNumber: 98,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "overflow-y-auto max-h-[60vh] pr-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "text-gray-700 whitespace-pre-line leading-relaxed",
                                children: policy.content
                            }, void 0, false, {
                                fileName: "[project]/components/Footer.js",
                                lineNumber: 110,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/Footer.js",
                            lineNumber: 109,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "mt-6 flex justify-end",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "bg-[#004AAD] text-white px-6 py-2 rounded-lg hover:bg-[#003580] transition",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/components/Footer.js",
                                lineNumber: 115,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/Footer.js",
                            lineNumber: 114,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Footer.js",
                    lineNumber: 97,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Footer.js",
                lineNumber: 96,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/Footer.js",
            lineNumber: 95,
            columnNumber: 7
        }, this);
    };
    const socialLinks = {
        CSHR: {
            facebook: "https://www.facebook.com/careerschoolhrsolutions.homepage/",
            instagram: "https://www.instagram.com/careerschoolhrsolutions/?hl=en",
            linkedin: "https://www.linkedin.com/company/careerschool-hr-solutions/?viewAsMember=true",
            youtube: "https://youtube.com/@careerschoolhrsolutions?si=B94JdkhKg7byI1ml",
            whatsapp: "https://whatsapp.com/channel/0029Va4ufgc17Emp80iBn92I"
        },
        CSIT: {
            facebook: "https://www.facebook.com/profile.php?id=61578868656121",
            instagram: "https://www.instagram.com/careerschoolitsolutions/?hl=en",
            linkedin: "https://www.linkedin.com",
            youtube: "https://youtube.com/@careerschoolitsolutionsnellore?si=iNimoC_zvVUEWXnA",
            whatsapp: "https://whatsapp.com/channel/0029Va4ufgc17Emp80iBn92I"
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("footer", {
        className: "bg-white text-gray-800 py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "max-w-[1920px] mx-auto grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-14 2xl:gap-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "text-center xs:text-left",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                className: "font-bold mb-3 sm:mb-4 text-base sm:text-lg md:text-xl xl:text-2xl text-[#004AAD]",
                                children: "TRENDING COURSE"
                            }, void 0, false, {
                                fileName: "[project]/components/Footer.js",
                                lineNumber: 154,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                                className: "space-y-1.5 sm:space-y-2 text-xs sm:text-sm md:text-base xl:text-lg",
                                children: [
                                    "Python + AI",
                                    "HR Analytics",
                                    "Data Analytics",
                                    "Digital Marketing",
                                    "Python Fullstack",
                                    "Java Fullstack",
                                    "Business Analytics",
                                    "Accounts & Finance"
                                ].map((course, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                            href: courseLink,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "hover:text-[#004AAD] transition duration-300 block",
                                            children: course
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.js",
                                            lineNumber: 169,
                                            columnNumber: 17
                                        }, this)
                                    }, i, false, {
                                        fileName: "[project]/components/Footer.js",
                                        lineNumber: 168,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/Footer.js",
                                lineNumber: 157,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Footer.js",
                        lineNumber: 153,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "text-center xs:text-left",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                className: "font-bold mb-3 sm:mb-4 text-base sm:text-lg md:text-xl xl:text-2xl text-[#004AAD]",
                                children: "RESOURCES"
                            }, void 0, false, {
                                fileName: "[project]/components/Footer.js",
                                lineNumber: 184,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                                className: "space-y-1.5 sm:space-y-2 text-xs sm:text-sm md:text-base xl:text-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                            href: "https://wa.me/6369119564",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "hover:text-[#004AAD] transition duration-300",
                                            children: "Referral Rewards"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.js",
                                            lineNumber: 190,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.js",
                                        lineNumber: 189,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                            href: "https://wa.me/7305014818",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "hover:text-[#004AAD] transition duration-300",
                                            children: "Hire students"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.js",
                                            lineNumber: 200,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.js",
                                        lineNumber: 199,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                            href: "https://wa.me/7708938866",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "hover:text-[#004AAD] transition duration-300",
                                            children: "Work with us"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.js",
                                            lineNumber: 210,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.js",
                                        lineNumber: 209,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                            href: "https://wa.me/6369119564",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "hover:text-[#004AAD] transition duration-300",
                                            children: "Become a Freelancer"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.js",
                                            lineNumber: 220,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.js",
                                        lineNumber: 219,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                            href: "https://wa.me/6369119564",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "hover:text-[#004AAD] transition duration-300",
                                            children: "Connect with Training Team"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.js",
                                            lineNumber: 230,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.js",
                                        lineNumber: 229,
                                        columnNumber: 13
                                    }, this),
                                    [].map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                href: courseLink,
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "hover:text-[#004AAD] transition duration-300",
                                                children: item
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.js",
                                                lineNumber: 244,
                                                columnNumber: 17
                                            }, this)
                                        }, i, false, {
                                            fileName: "[project]/components/Footer.js",
                                            lineNumber: 243,
                                            columnNumber: 15
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Footer.js",
                                lineNumber: 188,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Footer.js",
                        lineNumber: 183,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "text-center xs:text-left",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                className: "font-bold mb-3 sm:mb-4 text-base sm:text-lg md:text-xl xl:text-2xl text-[#004AAD]",
                                children: "PLACEMENT"
                            }, void 0, false, {
                                fileName: "[project]/components/Footer.js",
                                lineNumber: 259,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                                className: "space-y-1.5 sm:space-y-2 text-xs sm:text-sm md:text-base xl:text-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                            href: "#meet-our-stars",
                                            className: "hover:text-[#004AAD] scroll-smooth transition duration-300",
                                            children: "Success Stories"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.js",
                                            lineNumber: 264,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.js",
                                        lineNumber: 263,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                            href: "https://wa.me/7708938866",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "hover:text-[#004AAD] transition duration-300",
                                            children: "Speak with campus Team"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.js",
                                            lineNumber: 272,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.js",
                                        lineNumber: 271,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                            href: "https://wa.me/7305014818",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "hover:text-[#004AAD] transition duration-300",
                                            children: "speak with placement Team"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.js",
                                            lineNumber: 282,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.js",
                                        lineNumber: 281,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                            href: "https://wa.me/6382585438",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "hover:text-[#004AAD] transition duration-300",
                                            children: "Non-IT Jobs"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.js",
                                            lineNumber: 292,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.js",
                                        lineNumber: 291,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Footer.js",
                                lineNumber: 262,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Footer.js",
                        lineNumber: 258,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "text-center xs:text-left",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                className: "font-bold mb-3 sm:mb-4 text-base sm:text-lg md:text-xl xl:text-2xl text-[#004AAD]",
                                children: "COMPANY"
                            }, void 0, false, {
                                fileName: "[project]/components/Footer.js",
                                lineNumber: 306,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                                className: "space-y-1.5 sm:space-y-2 text-xs sm:text-sm md:text-base xl:text-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                            href: "#",
                                            className: "hover:text-[#004AAD] transition duration-300",
                                            children: "About Us"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.js",
                                            lineNumber: 311,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.js",
                                        lineNumber: 310,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                            href: "https://wa.me/7708938866",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "hover:text-[#004AAD] transition duration-300",
                                            children: "Contact Us"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.js",
                                            lineNumber: 319,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.js",
                                        lineNumber: 318,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Footer.js",
                                lineNumber: 309,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Footer.js",
                        lineNumber: 305,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Footer.js",
                lineNumber: 150,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "mt-12 border-t border-gray-300"
            }, void 0, false, {
                fileName: "[project]/components/Footer.js",
                lineNumber: 333,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "max-w-[1920px] mx-auto mt-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                        className: "text-center font-bold text-2xl sm:text-3xl xl:text-4xl text-[#004AAD] mb-10",
                        children: "OUR BRANCHES"
                    }, void 0, false, {
                        fileName: "[project]/components/Footer.js",
                        lineNumber: 337,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 lg:grid-cols-2 gap-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 flex flex-col items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "relative w-full h-56 mb-4 rounded-lg overflow-hidden",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("iframe", {
                                                src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.1737921842065!2d80.21105637572875!3d13.021341013514183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52675a57b4f5cf%3A0x1c74b3b91c6e75f1!2sCareer%20School%20HR!5e0!3m2!1sen!2sin!4v1729154500000!5m2!1sen!2sin",
                                                width: "100%",
                                                height: "100%",
                                                style: {
                                                    border: 0
                                                },
                                                allowFullScreen: "",
                                                loading: "lazy",
                                                title: "Career School HR Map"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.js",
                                                lineNumber: 346,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                href: "https://maps.app.goo.gl/h1JTS1oJBWV8Fxeg6",
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "absolute inset-0"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.js",
                                                lineNumber: 355,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Footer.js",
                                        lineNumber: 345,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                        src: "/Footer Logo/New CSHR Logo (TM).png",
                                        alt: "CSHR Logo",
                                        className: "h-14 w-auto mb-3 object-contain"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.js",
                                        lineNumber: 363,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-[#004AAD] font-semibold text-lg mb-2",
                                        children: "📞 CSHR: 77089 38866 / 99386 36935"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.js",
                                        lineNumber: 368,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-gray-800 text-center mb-4 font-medium leading-relaxed text-sm px-2",
                                        children: [
                                            "📍 ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "font-bold",
                                                children: "Address:"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.js",
                                                lineNumber: 372,
                                                columnNumber: 18
                                            }, this),
                                            " Careerschool HR Solutions, L2, SIDCO Industrial Estate, Guindy, Chennai, Tamil Nadu 600032"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Footer.js",
                                        lineNumber: 371,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "flex justify-center gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                href: socialLinks.CSHR.instagram,
                                                target: "_blank",
                                                rel: "noreferrer",
                                                className: "bg-[#004AAD] w-10 h-10 flex items-center justify-center rounded-full text-white hover:opacity-80 transition",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FaInstagram"], {}, void 0, false, {
                                                    fileName: "[project]/components/Footer.js",
                                                    lineNumber: 384,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.js",
                                                lineNumber: 378,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                href: socialLinks.CSHR.facebook,
                                                target: "_blank",
                                                rel: "noreferrer",
                                                className: "bg-[#004AAD] w-10 h-10 flex items-center justify-center rounded-full text-white hover:opacity-80 transition",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FaFacebookF"], {}, void 0, false, {
                                                    fileName: "[project]/components/Footer.js",
                                                    lineNumber: 392,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.js",
                                                lineNumber: 386,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                href: socialLinks.CSHR.linkedin,
                                                target: "_blank",
                                                rel: "noreferrer",
                                                className: "bg-[#004AAD] w-10 h-10 flex items-center justify-center rounded-full text-white hover:opacity-80 transition",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FaLinkedinIn"], {}, void 0, false, {
                                                    fileName: "[project]/components/Footer.js",
                                                    lineNumber: 400,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.js",
                                                lineNumber: 394,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                href: socialLinks.CSHR.youtube,
                                                target: "_blank",
                                                rel: "noreferrer",
                                                className: "bg-[#004AAD] w-10 h-10 flex items-center justify-center rounded-full text-white hover:opacity-80 transition",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FaYoutube"], {}, void 0, false, {
                                                    fileName: "[project]/components/Footer.js",
                                                    lineNumber: 408,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.js",
                                                lineNumber: 402,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                href: socialLinks.CSHR.whatsapp,
                                                target: "_blank",
                                                rel: "noreferrer",
                                                className: "bg-[#004AAD] w-10 h-10 flex items-center justify-center rounded-full text-white hover:opacity-80 transition",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FaWhatsapp"], {}, void 0, false, {
                                                    fileName: "[project]/components/Footer.js",
                                                    lineNumber: 416,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.js",
                                                lineNumber: 410,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Footer.js",
                                        lineNumber: 377,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Footer.js",
                                lineNumber: 344,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 flex flex-col items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "relative w-full h-56 mb-4 rounded-lg overflow-hidden",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("iframe", {
                                                src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.9361762215854!2d79.97834327566755!3d14.419817784712054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4cf2d284d13ed3%3A0xe52b9f52d17b904a!2sCareer%20School%20IT!5e0!3m2!1sen!2sin!4v1729154600000!5m2!1sen!2sin",
                                                width: "100%",
                                                height: "100%",
                                                style: {
                                                    border: 0
                                                },
                                                allowFullScreen: "",
                                                loading: "lazy",
                                                title: "Career School IT Map"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.js",
                                                lineNumber: 424,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                href: "https://maps.app.goo.gl/Dp5tKAe5r29MFmCDA",
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "absolute inset-0"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.js",
                                                lineNumber: 433,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Footer.js",
                                        lineNumber: 423,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                        src: "/Footer Logo/New CSIT Logo (TM).png",
                                        alt: "CSIT Logo",
                                        className: "h-14 w-auto mb-3 object-contain"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.js",
                                        lineNumber: 441,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-[#004AAD] font-semibold text-lg mb-2",
                                        children: "📞 CSIT: 93422 86753 / 77089 38866"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.js",
                                        lineNumber: 446,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-gray-800 text-center mb-4 font-medium leading-relaxed text-sm px-2",
                                        children: [
                                            "📍 ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "font-bold",
                                                children: "Address:"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.js",
                                                lineNumber: 450,
                                                columnNumber: 18
                                            }, this),
                                            " Careerschool IT Solutions, Children's Park Road, Opposite to Aditya Degree College, Aditya Nagar, Nellore, Andhra Pradesh 524002"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Footer.js",
                                        lineNumber: 449,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "flex justify-center gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                href: socialLinks.CSIT.instagram,
                                                target: "_blank",
                                                rel: "noreferrer",
                                                className: "bg-[#004AAD] w-10 h-10 flex items-center justify-center rounded-full text-white hover:opacity-80 transition",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FaInstagram"], {}, void 0, false, {
                                                    fileName: "[project]/components/Footer.js",
                                                    lineNumber: 461,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.js",
                                                lineNumber: 455,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                href: socialLinks.CSIT.facebook,
                                                target: "_blank",
                                                rel: "noreferrer",
                                                className: "bg-[#004AAD] w-10 h-10 flex items-center justify-center rounded-full text-white hover:opacity-80 transition",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FaFacebookF"], {}, void 0, false, {
                                                    fileName: "[project]/components/Footer.js",
                                                    lineNumber: 469,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.js",
                                                lineNumber: 463,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                href: socialLinks.CSIT.linkedin,
                                                target: "_blank",
                                                rel: "noreferrer",
                                                className: "bg-[#004AAD] w-10 h-10 flex items-center justify-center rounded-full text-white hover:opacity-80 transition",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FaLinkedinIn"], {}, void 0, false, {
                                                    fileName: "[project]/components/Footer.js",
                                                    lineNumber: 477,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.js",
                                                lineNumber: 471,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                href: socialLinks.CSIT.youtube,
                                                target: "_blank",
                                                rel: "noreferrer",
                                                className: "bg-[#004AAD] w-10 h-10 flex items-center justify-center rounded-full text-white hover:opacity-80 transition",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FaYoutube"], {}, void 0, false, {
                                                    fileName: "[project]/components/Footer.js",
                                                    lineNumber: 485,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.js",
                                                lineNumber: 479,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                href: socialLinks.CSIT.whatsapp,
                                                target: "_blank",
                                                rel: "noreferrer",
                                                className: "bg-[#004AAD] w-10 h-10 flex items-center justify-center rounded-full text-white hover:opacity-80 transition",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FaWhatsapp"], {}, void 0, false, {
                                                    fileName: "[project]/components/Footer.js",
                                                    lineNumber: 493,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.js",
                                                lineNumber: 487,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Footer.js",
                                        lineNumber: 454,
                                        columnNumber: 16
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Footer.js",
                                lineNumber: 422,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Footer.js",
                        lineNumber: 341,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Footer.js",
                lineNumber: 336,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "mt-12 border-t border-gray-300"
            }, void 0, false, {
                fileName: "[project]/components/Footer.js",
                lineNumber: 501,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "text-center mt-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 text-sm md:text-base",
                        children: [
                            "© ",
                            new Date().getFullYear(),
                            " Careerschool HR & IT Solutions — All Rights Reserved."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Footer.js",
                        lineNumber: 505,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center mt-4 text-gray-600 text-xs sm:text-sm md:text-base",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowPolicy(!showPolicy),
                                className: "hover:text-[#004AAD] font-medium transition flex items-center gap-2",
                                children: [
                                    "Privacy Policy",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: `transform transition-transform ${showPolicy ? "rotate-180" : "rotate-0"}`,
                                        children: "▼"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.js",
                                        lineNumber: 516,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Footer.js",
                                lineNumber: 511,
                                columnNumber: 11
                            }, this),
                            showPolicy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                                className: "mt-3 space-y-2 text-gray-700 text-xs sm:text-sm md:text-base",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setActiveModal("cancellation"),
                                            className: "hover:text-[#004AAD] transition flex items-center gap-2",
                                            children: "🔹 Cancellation & Refund policy"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.js",
                                            lineNumber: 528,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.js",
                                        lineNumber: 527,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setActiveModal("disclaimer"),
                                            className: "hover:text-[#004AAD] transition flex items-center gap-2",
                                            children: "🔹 Disclaimer & Limitation of Liability"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.js",
                                            lineNumber: 536,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.js",
                                        lineNumber: 535,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setActiveModal("privacy"),
                                            className: "hover:text-[#004AAD] transition flex items-center gap-2",
                                            children: "🔹 Privacy policy"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.js",
                                            lineNumber: 544,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.js",
                                        lineNumber: 543,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setActiveModal("shipping"),
                                            className: "hover:text-[#004AAD] transition flex items-center gap-2",
                                            children: "🔹 Shipping & Exchange policy"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.js",
                                            lineNumber: 552,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.js",
                                        lineNumber: 551,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setActiveModal("terms"),
                                            className: "hover:text-[#004AAD] transition flex items-center gap-2",
                                            children: "🔹 Terms & Conditions"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.js",
                                            lineNumber: 560,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.js",
                                        lineNumber: 559,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Footer.js",
                                lineNumber: 526,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Footer.js",
                        lineNumber: 510,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Footer.js",
                lineNumber: 504,
                columnNumber: 7
            }, this),
            activeModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(PolicyModal, {
                policy: policies[activeModal],
                onClose: ()=>setActiveModal(null)
            }, void 0, false, {
                fileName: "[project]/components/Footer.js",
                lineNumber: 573,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Footer.js",
        lineNumber: 148,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/chatbot.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatbotFlow
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
"use client";
;
;
/* ---------- CONFIG (tweak these) ---------- */ // Desktop navbar height
const NAVBAR_HEIGHT = "80px";
// Mobile navbar height (used when viewport < 640px)
const NAVBAR_HEIGHT_MOBILE = "64px";
// Space to reserve at bottom so chat doesn't overlap the floating bot icon.
const BOT_ICON_GAP = "140px";
const BOT_ICON_GAP_MOBILE = "120px";
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxyz123.../exec";
/* Avatar image paths — replace with your real asset paths */ const BOT_AVATAR = "/chatbot image/Simran last .png";
const USER_AVATAR = "/chatbot image/User PFP.png";
/* ---------- Flow (unchanged) ---------- */ const FLOW = {
    rootOptions: [
        {
            label: "💼 Job Seeker",
            key: "job_seeker"
        },
        {
            label: "🎓 Student / Learning",
            key: "student_learning"
        },
        {
            label: "🏫 Placement Officer / College Staff",
            key: "placement_officer"
        }
    ],
    job_seeker: {
        title: "Job Seeker",
        options: [
            {
                label: "🖥️ IT Jobs",
                key: "nonit_jobs",
                form: true,
                team: "HR Team"
            },
            {
                label: "🛠️ Non-IT Jobs",
                key: "work_with_us",
                form: true,
                team: "HR Team"
            }
        ]
    },
    student_learning: {
        title: "Student / Learning",
        options: [
            {
                label: "💻 IT & Software Trainings",
                key: "it_training",
                form: true,
                team: "Training Team"
            },
            {
                label: "🧩 Non-IT Trainings",
                key: "nonit_training",
                form: true,
                team: "Training Team"
            },
            {
                label: "🧑‍💼 Internships",
                key: "internships",
                form: true,
                team: "Training Team"
            }
        ]
    },
    placement_officer: {
        title: "Placement Officer / College Staff",
        options: [
            {
                label: "🎯 Campus Drive / Placements",
                key: "campus_drive",
                form: true,
                team: "Campus Team"
            },
            {
                label: "📘 Campus Training & Placements",
                key: "campus_training",
                form: true,
                team: "Campus Team"
            }
        ]
    }
};
function ChatbotFlow() {
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([
        {
            sender: "bot",
            text: "Hi, I’m Simran, your virtual assistant. Select who you are 👇"
        },
        {
            sender: "options",
            options: FLOW.rootOptions
        }
    ]);
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [showBot, setShowBot] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [ctx, setCtx] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({});
    const endRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    // responsive offsets (top and bottom) that update on resize
    const [topOffset, setTopOffset] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(NAVBAR_HEIGHT);
    const [bottomGap, setBottomGap] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(BOT_ICON_GAP);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const applyOffsets = ()=>{
            const w = window.innerWidth;
            if (w < 640) {
                setTopOffset(NAVBAR_HEIGHT_MOBILE);
                setBottomGap(BOT_ICON_GAP_MOBILE);
            } else {
                setTopOffset(NAVBAR_HEIGHT);
                setBottomGap(BOT_ICON_GAP);
            }
        };
        applyOffsets();
        window.addEventListener("resize", applyOffsets);
        return ()=>window.removeEventListener("resize", applyOffsets);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const t = setTimeout(()=>setShowBot(true), 1000);
        return ()=>clearTimeout(t);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!isOpen) {
            const t = setTimeout(()=>setShowBot(true), 2000);
            return ()=>clearTimeout(t);
        }
    }, [
        isOpen
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        endRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [
        messages
    ]);
    const push = (m)=>setMessages((p)=>[
                ...p,
                m
            ]);
    const pushBot = (t)=>push({
            sender: "bot",
            text: t
        });
    const pushUser = (t)=>push({
            sender: "user",
            text: t
        });
    const pushOptions = (o)=>push({
            sender: "options",
            options: o
        });
    const pushForm = (m)=>push({
            sender: "form",
            meta: m
        });
    const restart = ()=>{
        setMessages([
            {
                sender: "bot",
                text: "Hi, I’m Simran, your virtual assistant. Select who you are 👇"
            },
            {
                sender: "options",
                options: FLOW.rootOptions
            }
        ]);
        setCtx({});
        setIsOpen(true);
        setTimeout(()=>endRef.current?.scrollIntoView({
                behavior: "smooth"
            }), 50);
    };
    const endChat = ()=>{
        pushBot("This chat has ended. Click Start New Chat to begin again.");
        setTimeout(()=>setIsOpen(false), 400);
    };
    const keyToLabel = (key, list)=>{
        const found = list.find((l)=>l.key === key);
        return found ? found.label : key;
    };
    const handleRootSelect = (key)=>{
        pushUser(keyToLabel(key, FLOW.rootOptions));
        if (!FLOW[key]) {
            pushBot("Sorry, wrong option.");
            return;
        }
        pushBot(`Please choose an option under "${FLOW[key].title}" 👇`);
        pushOptions(FLOW[key].options);
    };
    const handleSubOption = (opt)=>{
        pushUser(opt.label);
        if (opt.redirect) {
            pushBot(`🔗 Opening ${opt.label}...`);
            push({
                sender: "final",
                text: `${opt.label}`,
                meta: {
                    action: "redirect",
                    url: opt.redirect
                }
            });
            push({
                sender: "endActions"
            });
            return;
        }
        if (opt.form) {
            setCtx({
                lastChosen: opt
            });
            pushBot(`Please fill this form — our ${opt.team} team will contact you.`);
            pushForm({
                team: opt.team,
                type: opt.label
            });
            return;
        }
    };
    const submitForm = async (formData)=>{
        pushUser("✅ Form Submitted");
        pushBot("Saving your details...");
        const payload = {
            ...ctx.lastChosen,
            ...formData,
            timestamp: new Date().toISOString()
        };
        try {
            if (!GOOGLE_SCRIPT_URL.includes("xyz123")) {
                await fetch(GOOGLE_SCRIPT_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                });
            }
            pushBot(`🎉 Thank you! Our ${ctx.lastChosen.team} will contact you soon.`);
        } catch  {
            pushBot("❌ Failed to save. We will still contact you soon.");
        }
        push({
            sender: "endActions"
        });
    };
    /* ---------- UI pieces ---------- */ const ChatBubble = ({ sender, text })=>{
        const isBot = sender === "bot";
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: `w-full flex ${isBot ? "justify-start" : "justify-end"} items-start gap-2`,
            children: [
                isBot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                    src: "/chatbot image/Simran - 3.png",
                    alt: "Simran",
                    className: "w-8 h-8 rounded-full object-cover shadow-sm",
                    style: {
                        flex: "0 0 36px"
                    }
                }, void 0, false, {
                    fileName: "[project]/components/chatbot.js",
                    lineNumber: 190,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "px-3 py-2 text-sm max-w-[78%] rounded-2xl shadow-sm " + (isBot ? "bg-blue-500 text-white rounded-bl-none" : "bg-gray-200 text-black rounded-br-none"),
                    children: text
                }, void 0, false, {
                    fileName: "[project]/components/chatbot.js",
                    lineNumber: 197,
                    columnNumber: 9
                }, this),
                !isBot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                    src: USER_AVATAR,
                    alt: "You",
                    className: "w-8 h-8 rounded-full object-cover shadow-sm",
                    style: {
                        flex: "0 0 36px"
                    }
                }, void 0, false, {
                    fileName: "[project]/components/chatbot.js",
                    lineNumber: 206,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/chatbot.js",
            lineNumber: 188,
            columnNumber: 7
        }, this);
    };
    const OptionsRow = ({ options })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "flex flex-wrap gap-2 w-full",
            children: options.map((o, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                    onClick: ()=>{
                        const rootKeys = FLOW.rootOptions.map((r)=>r.key);
                        if (rootKeys.includes(o.key)) handleRootSelect(o.key);
                        else handleSubOption(o);
                    },
                    className: "bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-xs",
                    children: o.label
                }, i, false, {
                    fileName: "[project]/components/chatbot.js",
                    lineNumber: 220,
                    columnNumber: 9
                }, this))
        }, void 0, false, {
            fileName: "[project]/components/chatbot.js",
            lineNumber: 218,
            columnNumber: 5
        }, this);
    const EndActions = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "flex gap-2 w-full justify-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                    className: "bg-gray-200 text-black px-3 py-1 rounded-md text-sm",
                    onClick: ()=>setIsOpen(false),
                    children: "End Chat"
                }, void 0, false, {
                    fileName: "[project]/components/chatbot.js",
                    lineNumber: 237,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                    className: "bg-blue-600 text-white px-3 py-1 rounded-md text-sm",
                    onClick: restart,
                    children: "Start New Chat"
                }, void 0, false, {
                    fileName: "[project]/components/chatbot.js",
                    lineNumber: 243,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/chatbot.js",
            lineNumber: 236,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "fixed bottom-4 right-4 z-[1300] flex flex-col items-center sm:bottom-6 sm:right-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                    src: BOT_AVATAR,
                    alt: "bot",
                    onClick: ()=>{
                        const newState = !isOpen;
                        setIsOpen(newState);
                        if (newState) setShowBot(false);
                        else setTimeout(()=>setShowBot(true), 2000);
                    },
                    className: `cursor-pointer mb-2 transition-all duration-700 ease-out hover:scale-110
            w-16 h-16 sm:w-24 sm:h-24 rounded-full shadow-lg`,
                    style: {
                        transformOrigin: "center",
                        display: "block",
                        // simple show/hide animation
                        transform: showBot ? "translateY(0)" : "translateY(200%)",
                        opacity: showBot ? 1 : 0
                    }
                }, void 0, false, {
                    fileName: "[project]/components/chatbot.js",
                    lineNumber: 253,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/chatbot.js",
                lineNumber: 252,
                columnNumber: 7
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "fixed right-4 sm:right-6 z-[1250] bg-[#f5f5f7] rounded-3xl shadow-xl border border-gray-300   w-[94%] max-w-md sm:w-96",
                style: {
                    top: topOffset,
                    bottom: bottomGap,
                    display: "flex",
                    flexDirection: "column"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "bg-blue-600 text-white py-3 rounded-t-3xl px-4 flex items-center justify-between",
                        style: {
                            height: 56
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                        src: BOT_AVATAR,
                                        alt: "Simran",
                                        className: "w-8 h-8 rounded-full object-cover border-2 border-white"
                                    }, void 0, false, {
                                        fileName: "[project]/components/chatbot.js",
                                        lineNumber: 292,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "text-left",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "text-sm font-bold leading-tight",
                                                children: "Simran"
                                            }, void 0, false, {
                                                fileName: "[project]/components/chatbot.js",
                                                lineNumber: 298,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "text-xs opacity-90",
                                                children: "Virtual Assistant"
                                            }, void 0, false, {
                                                fileName: "[project]/components/chatbot.js",
                                                lineNumber: 299,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/chatbot.js",
                                        lineNumber: 297,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/chatbot.js",
                                lineNumber: 291,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                className: "text-white text-2xl leading-none",
                                onClick: ()=>setIsOpen(false),
                                "aria-label": "Close chat",
                                children: "×"
                            }, void 0, false, {
                                fileName: "[project]/components/chatbot.js",
                                lineNumber: 302,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/chatbot.js",
                        lineNumber: 287,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "p-3 sm:p-4 overflow-y-auto flex-1 flex flex-col gap-3",
                        children: [
                            messages.map((m, i)=>{
                                if (m.sender === "bot" || m.sender === "user") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(ChatBubble, {
                                    sender: m.sender,
                                    text: m.text
                                }, i, false, {
                                    fileName: "[project]/components/chatbot.js",
                                    lineNumber: 311,
                                    columnNumber: 24
                                }, this);
                                if (m.sender === "options") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(OptionsRow, {
                                    options: m.options
                                }, i, false, {
                                    fileName: "[project]/components/chatbot.js",
                                    lineNumber: 312,
                                    columnNumber: 50
                                }, this);
                                if (m.sender === "form") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(ContactForm, {
                                    meta: m.meta,
                                    onSubmit: submitForm
                                }, i, false, {
                                    fileName: "[project]/components/chatbot.js",
                                    lineNumber: 313,
                                    columnNumber: 47
                                }, this);
                                if (m.sender === "final") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-100 p-3 rounded-xl text-sm",
                                    children: [
                                        m.text,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/components/chatbot.js",
                                            lineNumber: 318,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                            className: "text-blue-600 underline",
                                            href: m.meta.url,
                                            target: "_blank",
                                            rel: "noreferrer",
                                            children: "Open →"
                                        }, void 0, false, {
                                            fileName: "[project]/components/chatbot.js",
                                            lineNumber: 319,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/components/chatbot.js",
                                    lineNumber: 316,
                                    columnNumber: 19
                                }, this);
                                if (m.sender === "endActions") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(EndActions, {}, i, false, {
                                    fileName: "[project]/components/chatbot.js",
                                    lineNumber: 324,
                                    columnNumber: 53
                                }, this);
                                return null;
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                ref: endRef
                            }, void 0, false, {
                                fileName: "[project]/components/chatbot.js",
                                lineNumber: 327,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/chatbot.js",
                        lineNumber: 308,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "p-3 border-t bg-white rounded-b-3xl flex gap-2 justify-between",
                        style: {
                            height: 64
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: restart,
                                className: "flex-1 bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700",
                                children: "Start New Chat"
                            }, void 0, false, {
                                fileName: "[project]/components/chatbot.js",
                                lineNumber: 332,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: endChat,
                                className: "flex-1 ml-2 bg-red-600 text-white py-2 rounded-md text-sm font-medium hover:bg-red-700",
                                children: "End Chat"
                            }, void 0, false, {
                                fileName: "[project]/components/chatbot.js",
                                lineNumber: 338,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/chatbot.js",
                        lineNumber: 331,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/chatbot.js",
                lineNumber: 276,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
/* ---------- Contact form (responsive tweaks) ---------- */ function ContactForm({ meta, onSubmit }) {
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        fullName: "",
        whatsapp: "",
        alternatePhone: "",
        email: "",
        location: "",
        college: "",
        degree: "",
        stream: "",
        passingYear: "",
        experience: "",
        trainingCourse: "",
        source: "",
        questions: ""
    });
    const update = (e)=>setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
        onSubmit: (e)=>{
            e.preventDefault();
            onSubmit(form);
        },
        className: "bg-white border p-3 sm:p-4 rounded-xl flex flex-col gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "text-xs text-gray-600",
                children: [
                    "Enroll Now for ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("b", {
                        children: meta.type
                    }, void 0, false, {
                        fileName: "[project]/components/chatbot.js",
                        lineNumber: 380,
                        columnNumber: 24
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/chatbot.js",
                lineNumber: 379,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                name: "fullName",
                placeholder: "Full Name*",
                className: "border p-2 rounded-md text-sm w-full",
                required: true,
                onChange: update
            }, void 0, false, {
                fileName: "[project]/components/chatbot.js",
                lineNumber: 383,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                name: "whatsapp",
                placeholder: "Phone Number (WhatsApp)*",
                className: "border p-2 rounded-md text-sm w-full",
                required: true,
                onChange: update
            }, void 0, false, {
                fileName: "[project]/components/chatbot.js",
                lineNumber: 390,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                        name: "alternatePhone",
                        placeholder: "Alternate Contact Number",
                        className: "border p-2 rounded-md text-sm",
                        onChange: update
                    }, void 0, false, {
                        fileName: "[project]/components/chatbot.js",
                        lineNumber: 400,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                        name: "email",
                        placeholder: "Email",
                        className: "border p-2 rounded-md text-sm",
                        onChange: update
                    }, void 0, false, {
                        fileName: "[project]/components/chatbot.js",
                        lineNumber: 401,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                        name: "location",
                        placeholder: "Location",
                        className: "border p-2 rounded-md text-sm",
                        onChange: update
                    }, void 0, false, {
                        fileName: "[project]/components/chatbot.js",
                        lineNumber: 402,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                        name: "college",
                        placeholder: "College Name",
                        className: "border p-2 rounded-md text-sm",
                        onChange: update
                    }, void 0, false, {
                        fileName: "[project]/components/chatbot.js",
                        lineNumber: 403,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                        name: "degree",
                        placeholder: "Highest Degree",
                        className: "border p-2 rounded-md text-sm",
                        onChange: update
                    }, void 0, false, {
                        fileName: "[project]/components/chatbot.js",
                        lineNumber: 404,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                        name: "stream",
                        placeholder: "Stream",
                        className: "border p-2 rounded-md text-sm",
                        onChange: update
                    }, void 0, false, {
                        fileName: "[project]/components/chatbot.js",
                        lineNumber: 405,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                        name: "passingYear",
                        placeholder: "Year of Passing",
                        className: "border p-2 rounded-md text-sm",
                        onChange: update
                    }, void 0, false, {
                        fileName: "[project]/components/chatbot.js",
                        lineNumber: 406,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                        name: "experience",
                        placeholder: "Experience",
                        className: "border p-2 rounded-md text-sm",
                        onChange: update
                    }, void 0, false, {
                        fileName: "[project]/components/chatbot.js",
                        lineNumber: 407,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/chatbot.js",
                lineNumber: 399,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                name: "trainingCourse",
                placeholder: "Course Interested",
                className: "border p-2 rounded-md text-sm",
                onChange: update
            }, void 0, false, {
                fileName: "[project]/components/chatbot.js",
                lineNumber: 410,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                name: "source",
                placeholder: "How did you hear about us?",
                className: "border p-2 rounded-md text-sm",
                onChange: update
            }, void 0, false, {
                fileName: "[project]/components/chatbot.js",
                lineNumber: 411,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("textarea", {
                name: "questions",
                placeholder: "Any Questions?",
                className: "border p-2 rounded-md text-sm",
                onChange: update
            }, void 0, false, {
                fileName: "[project]/components/chatbot.js",
                lineNumber: 413,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                type: "submit",
                className: "bg-blue-600 text-white p-2 rounded-md text-sm",
                children: "Submit"
            }, void 0, false, {
                fileName: "[project]/components/chatbot.js",
                lineNumber: 415,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/chatbot.js",
        lineNumber: 372,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/Popupform.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CourseEnquiryPopup
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
"use client";
;
;
;
function CourseEnquiryPopup({ open, onOpenChange, showInlineTriggers = false, initialEnquiry = "" }) {
    // internal state
    const [internalOpen, setInternalOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [showImage, setShowImage] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [submitted, setSubmitted] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [showSuccessPopup, setShowSuccessPopup] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // new state for hover behaviour of the floating bubble/icon
    const [isHovered, setIsHovered] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // form data + validation
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        fullName: "",
        phone: "",
        email: "",
        enquiryFor: "",
        location: "",
        state: "",
        experience: "",
        branch: "",
        course: "",
        customCourse: "",
        preferredRole: "",
        currentEmployer: "",
        countryCode: "+91"
    });
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({});
    const isControlled = typeof open === "boolean";
    const isOpen = isControlled ? open : internalOpen;
    // uncontrolled auto-open after 10s (one-time)
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (isControlled) return;
        const timer = setTimeout(()=>{
            setInternalOpen(true);
            setShowImage(true);
        }, 10000);
        return ()=>clearTimeout(timer);
    }, [
        isControlled
    ]);
    // sync parent's initialEnquiry into form when provided
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!initialEnquiry) return;
        setFormData((p)=>{
            const next = {
                ...p,
                enquiryFor: initialEnquiry
            };
            if (initialEnquiry === "Courses / Internship") {
                next.preferredRole = "";
                next.currentEmployer = "";
            } else if (initialEnquiry === "Jobs") {
                next.course = "";
                next.customCourse = "";
            }
            return next;
        });
    }, [
        initialEnquiry
    ]);
    // lock scrolling while modal open (prevent horizontal & vertical)
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (isOpen) {
            document.documentElement.style.overflow = "hidden";
            document.documentElement.style.overflowX = "hidden";
            document.body.style.overflow = "hidden";
            document.body.style.overflowX = "hidden";
        } else {
            document.documentElement.style.overflow = "";
            document.documentElement.style.overflowX = "";
            document.body.style.overflow = "";
            document.body.style.overflowX = "";
        }
        return ()=>{
            document.documentElement.style.overflow = "";
            document.documentElement.style.overflowX = "";
            document.body.style.overflow = "";
            document.body.style.overflowX = "";
        };
    }, [
        isOpen
    ]);
    const setOpen = (value)=>{
        if (isControlled) {
            if (typeof onOpenChange === "function") onOpenChange(value);
        } else {
            setInternalOpen(value);
        }
    };
    // Note: no reopen timer — once closed it will not reopen until page refresh
    const handleClose = ()=>{
        setSubmitted(false);
        setOpen(false);
    };
    const openWith = (enquiryType)=>{
        setFormData((p)=>{
            const next = {
                ...p,
                enquiryFor: enquiryType ?? p.enquiryFor
            };
            if (enquiryType === "Courses / Internship") {
                next.preferredRole = "";
                next.currentEmployer = "";
            } else if (enquiryType === "Jobs") {
                next.course = "";
                next.customCourse = "";
            }
            return next;
        });
        setOpen(true);
        setShowImage(true);
    };
    // Country list for dropdown
    const countryList = [
        {
            code: "+91",
            name: "India"
        },
        {
            code: "+1",
            name: "United States"
        },
        {
            code: "+44",
            name: "United Kingdom"
        },
        {
            code: "+61",
            name: "Australia"
        },
        {
            code: "+971",
            name: "UAE"
        },
        {
            code: "+974",
            name: "Qatar"
        },
        {
            code: "+965",
            name: "Kuwait"
        },
        {
            code: "+966",
            name: "Saudi Arabia"
        },
        {
            code: "+64",
            name: "New Zealand"
        }
    ];
    const validateName = (value)=>{
        if (!value.trim()) return "Name is required";
        if (!/^[A-Za-z\s]+$/.test(value)) return "Only alphabets and spaces allowed";
        return "";
    };
    const validatePhone = (value)=>{
        if (!value) return "Phone is required";
        if (!/^\d{10}$/.test(value)) return "Enter a 10 digit phone number";
        return "";
    };
    const validateEmail = (value)=>{
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address";
        return "";
    };
    const handleChange = (e)=>{
        const { name, value: rawValue } = e.target;
        let value = rawValue;
        if (name === "fullName") {
            value = rawValue.replace(/[^A-Za-z\s]/g, "");
            setFormData((p)=>({
                    ...p,
                    [name]: value
                }));
            setErrors((p)=>({
                    ...p,
                    fullName: validateName(value)
                }));
            return;
        }
        if (name === "phone") {
            value = rawValue.replace(/\D/g, "").slice(0, 10);
            setFormData((p)=>({
                    ...p,
                    [name]: value
                }));
            setErrors((p)=>({
                    ...p,
                    phone: validatePhone(value)
                }));
            return;
        }
        if (name === "email") {
            value = rawValue.trim().toLowerCase();
            setFormData((p)=>({
                    ...p,
                    [name]: value
                }));
            setErrors((p)=>({
                    ...p,
                    email: validateEmail(value)
                }));
            return;
        }
        if (name === "enquiryFor") {
            const next = {
                ...formData,
                enquiryFor: value
            };
            if (value === "Courses / Internship") {
                next.preferredRole = "";
                next.currentEmployer = "";
            } else if (value === "Jobs") {
                next.course = "";
                next.customCourse = "";
            }
            setFormData(next);
            return;
        }
        if (name === "countryCode") {
            setFormData((p)=>({
                    ...p,
                    [name]: value
                }));
            return;
        }
        setFormData((p)=>({
                ...p,
                [name]: value
            }));
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        // Validation
        const nameErr = validateName(formData.fullName);
        const phoneErr = validatePhone(formData.phone);
        const emailErr = validateEmail(formData.email);
        const stateErr = !formData.state ? "Please select your state" : "";
        let extraErr = {};
        if (formData.enquiryFor === "Courses / Internship") {
            if (!formData.course) extraErr.course = "Please select a course or internship";
            if (formData.course === "Other" && !formData.customCourse) extraErr.customCourse = "Please enter the course name";
        } else if (formData.enquiryFor === "Jobs") {
            if (!formData.preferredRole) extraErr.preferredRole = "Please enter your preferred role";
        } else {
            extraErr.enquiryFor = "Please select enquiry type";
        }
        setErrors({
            fullName: nameErr,
            phone: phoneErr,
            email: emailErr,
            state: stateErr,
            ...extraErr
        });
        if (nameErr || phoneErr || emailErr || stateErr || Object.keys(extraErr).length) return;
        // Start submission
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/quickform", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            if (result.success) {
                // Reset form
                setFormData({
                    fullName: "",
                    phone: "",
                    email: "",
                    enquiryFor: "",
                    location: "",
                    state: "",
                    experience: "",
                    branch: "",
                    course: "",
                    customCourse: "",
                    preferredRole: "",
                    currentEmployer: "",
                    countryCode: "+91"
                });
                // Close form popup and show success popup
                setSubmitted(true);
                setShowSuccessPopup(true);
                setIsSubmitting(false);
            // NOTE: no reopen timer — will not reopen until page refresh
            } else {
                throw new Error("Submission failed");
            }
        } catch (error) {
            console.error("Form submission error:", error);
            alert("Failed to submit form. Please try again.");
            setIsSubmitting(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (isOpen) setShowImage(true);
    }, [
        isOpen
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            showInlineTriggers && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "jsx-701d884d5b8b0fb2" + " " + "fixed bottom-24 left-4 z-[99999] flex flex-col gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>openWith("Courses / Internship"),
                        className: "jsx-701d884d5b8b0fb2" + " " + "bg-blue-700 text-white px-3 py-2 rounded-md text-sm shadow hover:bg-blue-600",
                        children: "Courses / Internship"
                    }, void 0, false, {
                        fileName: "[project]/components/Popupform.js",
                        lineNumber: 291,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>openWith("Jobs"),
                        className: "jsx-701d884d5b8b0fb2" + " " + "bg-green-700 text-white px-3 py-2 rounded-md text-sm shadow hover:bg-green-600",
                        children: "IT / Non-IT Jobs"
                    }, void 0, false, {
                        fileName: "[project]/components/Popupform.js",
                        lineNumber: 297,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Popupform.js",
                lineNumber: 290,
                columnNumber: 9
            }, this),
            !isControlled && showImage && !isOpen && !showSuccessPopup && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                onClick: ()=>setOpen(true),
                onMouseEnter: ()=>setIsHovered(true),
                onMouseLeave: ()=>setIsHovered(false),
                role: "button",
                tabIndex: 0,
                "aria-label": "Open enquiry form",
                onKeyDown: (e)=>{
                    if (e.key === "Enter" || e.key === " ") setOpen(true);
                },
                className: "jsx-701d884d5b8b0fb2" + " " + "fixed bottom-32 right-6 z-[99999] cursor-pointer",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "jsx-701d884d5b8b0fb2" + " " + "floating-bubble-container",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "jsx-701d884d5b8b0fb2" + " " + `chat-bubble ${isHovered ? "bubble-hide" : "bubble-show"}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "jsx-701d884d5b8b0fb2" + " " + "bubble-content",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "jsx-701d884d5b8b0fb2" + " " + "bubble-text",
                                            children: "Enquire Now"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Popupform.js",
                                            lineNumber: 324,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            "aria-hidden": "true",
                                            className: "jsx-701d884d5b8b0fb2" + " " + "bubble-pulse"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Popupform.js",
                                            lineNumber: 325,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Popupform.js",
                                    lineNumber: 323,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    "aria-hidden": "true",
                                    className: "jsx-701d884d5b8b0fb2" + " " + "bubble-tail"
                                }, void 0, false, {
                                    fileName: "[project]/components/Popupform.js",
                                    lineNumber: 327,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Popupform.js",
                            lineNumber: 322,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "jsx-701d884d5b8b0fb2" + " " + `form-icon ${isHovered ? "icon-show" : "icon-hide"}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                src: "/Popup images/Form Icon 2.png",
                                alt: "Enquiry Form",
                                className: "jsx-701d884d5b8b0fb2" + " " + "w-14 h-14 object-contain"
                            }, void 0, false, {
                                fileName: "[project]/components/Popupform.js",
                                lineNumber: 332,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/Popupform.js",
                            lineNumber: 331,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Popupform.js",
                    lineNumber: 320,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Popupform.js",
                lineNumber: 308,
                columnNumber: 9
            }, this),
            isOpen && !showSuccessPopup && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "jsx-701d884d5b8b0fb2" + " " + "fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[999999] px-4 sm:px-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "jsx-701d884d5b8b0fb2" + " " + "bg-blue-800 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md p-4 sm:p-6 relative animate-fadeIn overflow-y-auto max-h-[85vh] text-white",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            onClick: handleClose,
                            disabled: isSubmitting,
                            className: "jsx-701d884d5b8b0fb2" + " " + "absolute top-2 right-3 text-white hover:text-gray-200 text-lg",
                            children: "✕"
                        }, void 0, false, {
                            fileName: "[project]/components/Popupform.js",
                            lineNumber: 342,
                            columnNumber: 13
                        }, this),
                        !submitted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "jsx-701d884d5b8b0fb2" + " " + "flex justify-center mb-2 mt-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                src: "/Popup images/Form Icon 2.png",
                                alt: "Form Public",
                                className: "jsx-701d884d5b8b0fb2" + " " + "w-14 h-14 sm:w-16 sm:h-16 object-contain"
                            }, void 0, false, {
                                fileName: "[project]/components/Popupform.js",
                                lineNumber: 348,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/Popupform.js",
                            lineNumber: 347,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "jsx-701d884d5b8b0fb2" + " " + "flex justify-center mb-2 mt-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                src: "/Popup images/Form Submitted Icon.png",
                                alt: "Submission Public",
                                className: "jsx-701d884d5b8b0fb2" + " " + "w-12 h-12 sm:w-16 sm:h-16 object-contain"
                            }, void 0, false, {
                                fileName: "[project]/components/Popupform.js",
                                lineNumber: 352,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/Popupform.js",
                            lineNumber: 351,
                            columnNumber: 15
                        }, this),
                        !submitted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                    className: "jsx-701d884d5b8b0fb2" + " " + "text-lg sm:text-xl font-semibold text-center mb-1 text-yellow-300",
                                    children: "Instant Enquiry for Jobs or Training"
                                }, void 0, false, {
                                    fileName: "[project]/components/Popupform.js",
                                    lineNumber: 358,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                                    onSubmit: handleSubmit,
                                    className: "jsx-701d884d5b8b0fb2" + " " + "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "jsx-701d884d5b8b0fb2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    name: "fullName",
                                                    required: true,
                                                    placeholder: "Full Name",
                                                    value: formData.fullName,
                                                    onChange: handleChange,
                                                    disabled: isSubmitting,
                                                    className: "jsx-701d884d5b8b0fb2" + " " + "w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Popupform.js",
                                                    lineNumber: 364,
                                                    columnNumber: 21
                                                }, this),
                                                errors.fullName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "jsx-701d884d5b8b0fb2" + " " + "text-xs text-red-300 mt-1",
                                                    children: errors.fullName
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Popupform.js",
                                                    lineNumber: 374,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/Popupform.js",
                                            lineNumber: 363,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "jsx-701d884d5b8b0fb2" + " " + "flex bg-white rounded-md items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                                    name: "countryCode",
                                                    value: formData.countryCode,
                                                    onChange: handleChange,
                                                    disabled: isSubmitting,
                                                    className: "jsx-701d884d5b8b0fb2" + " " + "bg-transparent text-gray-700 px-2 outline-none text-sm w-28 border-r border-gray-300",
                                                    children: countryList.map((country)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                            value: country.code,
                                                            className: "jsx-701d884d5b8b0fb2",
                                                            children: [
                                                                country.name,
                                                                " ",
                                                                country.code
                                                            ]
                                                        }, country.code, true, {
                                                            fileName: "[project]/components/Popupform.js",
                                                            lineNumber: 387,
                                                            columnNumber: 25
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Popupform.js",
                                                    lineNumber: 379,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                    type: "tel",
                                                    name: "phone",
                                                    required: true,
                                                    maxLength: "10",
                                                    inputMode: "numeric",
                                                    placeholder: "WhatsApp Number",
                                                    value: formData.phone,
                                                    onChange: handleChange,
                                                    disabled: isSubmitting,
                                                    className: "jsx-701d884d5b8b0fb2" + " " + "flex-1 outline-none py-2 px-2 text-sm bg-white text-black rounded-r-md"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Popupform.js",
                                                    lineNumber: 392,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/Popupform.js",
                                            lineNumber: 378,
                                            columnNumber: 19
                                        }, this),
                                        errors.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            className: "jsx-701d884d5b8b0fb2" + " " + "text-xs text-red-300 mt-1",
                                            children: errors.phone
                                        }, void 0, false, {
                                            fileName: "[project]/components/Popupform.js",
                                            lineNumber: 405,
                                            columnNumber: 36
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "jsx-701d884d5b8b0fb2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                    type: "email",
                                                    name: "email",
                                                    required: true,
                                                    placeholder: "Email Address",
                                                    value: formData.email,
                                                    onChange: handleChange,
                                                    disabled: isSubmitting,
                                                    className: "jsx-701d884d5b8b0fb2" + " " + "w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Popupform.js",
                                                    lineNumber: 408,
                                                    columnNumber: 21
                                                }, this),
                                                errors.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "jsx-701d884d5b8b0fb2" + " " + "text-xs text-red-300 mt-1",
                                                    children: errors.email
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Popupform.js",
                                                    lineNumber: 418,
                                                    columnNumber: 38
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/Popupform.js",
                                            lineNumber: 407,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "jsx-701d884d5b8b0fb2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                                    name: "enquiryFor",
                                                    required: true,
                                                    value: formData.enquiryFor,
                                                    onChange: handleChange,
                                                    disabled: isSubmitting,
                                                    className: "jsx-701d884d5b8b0fb2" + " " + "w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            className: "jsx-701d884d5b8b0fb2",
                                                            children: "Enquiring For"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Popupform.js",
                                                            lineNumber: 430,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                            value: "Courses / Internship",
                                                            className: "jsx-701d884d5b8b0fb2",
                                                            children: "Courses / Internship"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Popupform.js",
                                                            lineNumber: 431,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                            value: "Jobs",
                                                            className: "jsx-701d884d5b8b0fb2",
                                                            children: "IT / Non-IT Jobs"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Popupform.js",
                                                            lineNumber: 432,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/Popupform.js",
                                                    lineNumber: 422,
                                                    columnNumber: 21
                                                }, this),
                                                errors.enquiryFor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "jsx-701d884d5b8b0fb2" + " " + "text-xs text-red-300 mt-1",
                                                    children: errors.enquiryFor
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Popupform.js",
                                                    lineNumber: 434,
                                                    columnNumber: 43
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/Popupform.js",
                                            lineNumber: 421,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            name: "location",
                                            required: true,
                                            placeholder: "Location (City)",
                                            value: formData.location,
                                            onChange: handleChange,
                                            disabled: isSubmitting,
                                            className: "jsx-701d884d5b8b0fb2" + " " + "w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Popupform.js",
                                            lineNumber: 437,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "jsx-701d884d5b8b0fb2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                                    name: "state",
                                                    required: true,
                                                    value: formData.state,
                                                    onChange: handleChange,
                                                    disabled: isSubmitting,
                                                    className: "jsx-701d884d5b8b0fb2" + " " + "w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            className: "jsx-701d884d5b8b0fb2",
                                                            children: "Select State / Region"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Popupform.js",
                                                            lineNumber: 457,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                            value: "Andhra Pradesh",
                                                            className: "jsx-701d884d5b8b0fb2",
                                                            children: "Andhra Pradesh"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Popupform.js",
                                                            lineNumber: 458,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                            value: "Tamil Nadu",
                                                            className: "jsx-701d884d5b8b0fb2",
                                                            children: "Tamil Nadu"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Popupform.js",
                                                            lineNumber: 459,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                            value: "Telangana",
                                                            className: "jsx-701d884d5b8b0fb2",
                                                            children: "Telangana"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Popupform.js",
                                                            lineNumber: 460,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                            value: "Karnataka",
                                                            className: "jsx-701d884d5b8b0fb2",
                                                            children: "Karnataka"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Popupform.js",
                                                            lineNumber: 461,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                            value: "Kerala",
                                                            className: "jsx-701d884d5b8b0fb2",
                                                            children: "Kerala"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Popupform.js",
                                                            lineNumber: 462,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                            value: "Maharashtra",
                                                            className: "jsx-701d884d5b8b0fb2",
                                                            children: "Maharashtra"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Popupform.js",
                                                            lineNumber: 463,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                            value: "Other",
                                                            className: "jsx-701d884d5b8b0fb2",
                                                            children: "Other"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Popupform.js",
                                                            lineNumber: 464,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/Popupform.js",
                                                    lineNumber: 449,
                                                    columnNumber: 21
                                                }, this),
                                                errors.state && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "jsx-701d884d5b8b0fb2" + " " + "text-xs text-red-300 mt-1",
                                                    children: errors.state
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Popupform.js",
                                                    lineNumber: 466,
                                                    columnNumber: 38
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/Popupform.js",
                                            lineNumber: 448,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                            name: "experience",
                                            required: true,
                                            value: formData.experience,
                                            onChange: handleChange,
                                            disabled: isSubmitting,
                                            className: "jsx-701d884d5b8b0fb2" + " " + "w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    className: "jsx-701d884d5b8b0fb2",
                                                    children: "Total Experience"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Popupform.js",
                                                    lineNumber: 477,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "Fresher",
                                                    className: "jsx-701d884d5b8b0fb2",
                                                    children: "Fresher"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Popupform.js",
                                                    lineNumber: 478,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "1-2 Years",
                                                    className: "jsx-701d884d5b8b0fb2",
                                                    children: "1–2 Years"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Popupform.js",
                                                    lineNumber: 479,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "3-5 Years",
                                                    className: "jsx-701d884d5b8b0fb2",
                                                    children: "3–5 Years"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Popupform.js",
                                                    lineNumber: 480,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "5+ Years",
                                                    className: "jsx-701d884d5b8b0fb2",
                                                    children: "5+ Years"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Popupform.js",
                                                    lineNumber: 481,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/Popupform.js",
                                            lineNumber: 469,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                            name: "branch",
                                            required: true,
                                            value: formData.branch,
                                            onChange: handleChange,
                                            disabled: isSubmitting,
                                            className: "jsx-701d884d5b8b0fb2" + " " + "w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    className: "jsx-701d884d5b8b0fb2",
                                                    children: "Mode of Training"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Popupform.js",
                                                    lineNumber: 492,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "Offline",
                                                    className: "jsx-701d884d5b8b0fb2",
                                                    children: "Offline"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Popupform.js",
                                                    lineNumber: 493,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "Online",
                                                    className: "jsx-701d884d5b8b0fb2",
                                                    children: "Online"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Popupform.js",
                                                    lineNumber: 494,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/Popupform.js",
                                            lineNumber: 484,
                                            columnNumber: 19
                                        }, this),
                                        formData.enquiryFor === "Courses / Internship" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                                    name: "course",
                                                    required: true,
                                                    value: formData.course,
                                                    onChange: handleChange,
                                                    disabled: isSubmitting,
                                                    className: "jsx-701d884d5b8b0fb2" + " " + "w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            className: "jsx-701d884d5b8b0fb2",
                                                            children: "Select Course / Training"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Popupform.js",
                                                            lineNumber: 508,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                            value: "Internship",
                                                            className: "jsx-701d884d5b8b0fb2",
                                                            children: "Internship"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Popupform.js",
                                                            lineNumber: 509,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                            value: "Data Analytics",
                                                            className: "jsx-701d884d5b8b0fb2",
                                                            children: "Data Analytics"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Popupform.js",
                                                            lineNumber: 510,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                            value: "HR Analytics",
                                                            className: "jsx-701d884d5b8b0fb2",
                                                            children: "HR Analytics"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Popupform.js",
                                                            lineNumber: 511,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                            value: "Python Fullstack + AI",
                                                            className: "jsx-701d884d5b8b0fb2",
                                                            children: "Python Fullstack + AI"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Popupform.js",
                                                            lineNumber: 512,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                            value: "Java Fullstack",
                                                            className: "jsx-701d884d5b8b0fb2",
                                                            children: "Java Fullstack"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Popupform.js",
                                                            lineNumber: 513,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                            value: "Zoho Payroll",
                                                            className: "jsx-701d884d5b8b0fb2",
                                                            children: "Zoho Payroll Training"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Popupform.js",
                                                            lineNumber: 514,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                            value: "Digital Marketing",
                                                            className: "jsx-701d884d5b8b0fb2",
                                                            children: "Digital Marketing"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Popupform.js",
                                                            lineNumber: 515,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                            value: "Business Analytics",
                                                            className: "jsx-701d884d5b8b0fb2",
                                                            children: "Business Analytics"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Popupform.js",
                                                            lineNumber: 516,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                            value: "Other",
                                                            className: "jsx-701d884d5b8b0fb2",
                                                            children: "Other"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Popupform.js",
                                                            lineNumber: 517,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/Popupform.js",
                                                    lineNumber: 500,
                                                    columnNumber: 23
                                                }, this),
                                                errors.course && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "jsx-701d884d5b8b0fb2" + " " + "text-xs text-red-300 mt-1",
                                                    children: errors.course
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Popupform.js",
                                                    lineNumber: 519,
                                                    columnNumber: 41
                                                }, this),
                                                formData.course === "Other" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    name: "customCourse",
                                                    required: true,
                                                    placeholder: "Enter your course name",
                                                    value: formData.customCourse,
                                                    onChange: handleChange,
                                                    disabled: isSubmitting,
                                                    className: "jsx-701d884d5b8b0fb2" + " " + "w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Popupform.js",
                                                    lineNumber: 522,
                                                    columnNumber: 25
                                                }, this),
                                                errors.customCourse && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "jsx-701d884d5b8b0fb2" + " " + "text-xs text-red-300 mt-1",
                                                    children: errors.customCourse
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Popupform.js",
                                                    lineNumber: 533,
                                                    columnNumber: 47
                                                }, this)
                                            ]
                                        }, void 0, true) : formData.enquiryFor === "Jobs" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    name: "preferredRole",
                                                    required: true,
                                                    placeholder: "Preferred Role (e.g. Support Engineer, HR Executive)",
                                                    value: formData.preferredRole,
                                                    onChange: handleChange,
                                                    disabled: isSubmitting,
                                                    className: "jsx-701d884d5b8b0fb2" + " " + "w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Popupform.js",
                                                    lineNumber: 537,
                                                    columnNumber: 23
                                                }, this),
                                                errors.preferredRole && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "jsx-701d884d5b8b0fb2" + " " + "text-xs text-red-300 mt-1",
                                                    children: errors.preferredRole
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Popupform.js",
                                                    lineNumber: 547,
                                                    columnNumber: 48
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    name: "currentEmployer",
                                                    placeholder: "Current Employer (optional)",
                                                    value: formData.currentEmployer,
                                                    onChange: handleChange,
                                                    disabled: isSubmitting,
                                                    className: "jsx-701d884d5b8b0fb2" + " " + "w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Popupform.js",
                                                    lineNumber: 549,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true) : null,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "jsx-701d884d5b8b0fb2" + " " + "flex justify-center mt-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                disabled: isSubmitting,
                                                className: "jsx-701d884d5b8b0fb2" + " " + "w-1/2 bg-yellow-400 text-black py-2 rounded-md text-sm font-semibold hover:bg-yellow-300 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed",
                                                children: isSubmitting ? "Submitting..." : "Submit"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Popupform.js",
                                                lineNumber: 562,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/Popupform.js",
                                            lineNumber: 561,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Popupform.js",
                                    lineNumber: 362,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "jsx-701d884d5b8b0fb2" + " " + "text-center py-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                    className: "jsx-701d884d5b8b0fb2" + " " + "text-lg sm:text-xl font-semibold mb-2 text-yellow-300",
                                    children: "Thank you!"
                                }, void 0, false, {
                                    fileName: "[project]/components/Popupform.js",
                                    lineNumber: 574,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: "jsx-701d884d5b8b0fb2" + " " + "text-gray-200 text-sm mb-4",
                                    children: "Your enquiry has been submitted."
                                }, void 0, false, {
                                    fileName: "[project]/components/Popupform.js",
                                    lineNumber: 575,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: "jsx-701d884d5b8b0fb2" + " " + "text-green-200 text-sm font-bold",
                                    children: [
                                        "Our team will connect with you within ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "jsx-701d884d5b8b0fb2" + " " + "text-yellow-300",
                                            children: "24 hours"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Popupform.js",
                                            lineNumber: 576,
                                            columnNumber: 103
                                        }, this),
                                        "."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Popupform.js",
                                    lineNumber: 576,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "jsx-701d884d5b8b0fb2" + " " + "flex justify-center mt-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            handleClose();
                                            setSubmitted(false);
                                        },
                                        className: "jsx-701d884d5b8b0fb2" + " " + "px-4 py-2 bg-yellow-400 text-black rounded-md font-semibold hover:bg-yellow-300",
                                        children: "Close"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Popupform.js",
                                        lineNumber: 578,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/Popupform.js",
                                    lineNumber: 577,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Popupform.js",
                            lineNumber: 573,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Popupform.js",
                    lineNumber: 341,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Popupform.js",
                lineNumber: 340,
                columnNumber: 9
            }, this),
            showSuccessPopup && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "jsx-701d884d5b8b0fb2" + " " + "fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[999999] px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "jsx-701d884d5b8b0fb2" + " " + "bg-white rounded-xl shadow-2xl w-full max-w-xs p-5 text-center animate-fadeIn",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "jsx-701d884d5b8b0fb2" + " " + "flex justify-center mb-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                src: "/Popup images/Form Submitted Icon.png",
                                alt: "Success",
                                className: "jsx-701d884d5b8b0fb2" + " " + "w-16 h-16 object-contain"
                            }, void 0, false, {
                                fileName: "[project]/components/Popupform.js",
                                lineNumber: 599,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/Popupform.js",
                            lineNumber: 598,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                            className: "jsx-701d884d5b8b0fb2" + " " + "text-lg font-semibold text-blue-600 mb-2",
                            children: "Form Submitted Successfully!"
                        }, void 0, false, {
                            fileName: "[project]/components/Popupform.js",
                            lineNumber: 602,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            className: "jsx-701d884d5b8b0fb2" + " " + "text-gray-700 mb-4 text-sm",
                            children: "Thank you for your enquiry. Our team will contact you within 24 hours."
                        }, void 0, false, {
                            fileName: "[project]/components/Popupform.js",
                            lineNumber: 604,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                setShowSuccessPopup(false);
                                setSubmitted(false);
                                handleClose();
                            },
                            className: "jsx-701d884d5b8b0fb2" + " " + "bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition w-full",
                            children: "OK"
                        }, void 0, false, {
                            fileName: "[project]/components/Popupform.js",
                            lineNumber: 606,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Popupform.js",
                    lineNumber: 597,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Popupform.js",
                lineNumber: 596,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
                id: "701d884d5b8b0fb2",
                children: ".floating-bubble-container.jsx-701d884d5b8b0fb2{justify-content:center;align-items:center;display:flex;position:relative}.chat-bubble.jsx-701d884d5b8b0fb2{background:linear-gradient(135deg,#2e477d 0%,#184274 100%);border-radius:25px;padding:12px 20px;transition:all .36s cubic-bezier(.22,1,.36,1);animation:3s ease-in-out infinite floatBubble;position:relative;box-shadow:0 10px 30px #1842742e,0 6px 18px #0e1e3c14}.bubble-content.jsx-701d884d5b8b0fb2{align-items:center;gap:8px;display:flex;position:relative}.bubble-text.jsx-701d884d5b8b0fb2{color:#ffcb0e;white-space:nowrap;text-shadow:0 2px 6px #06122440;font-size:15px;font-weight:700}.bubble-pulse.jsx-701d884d5b8b0fb2{background:#ffcb0e;border-radius:50%;width:8px;height:8px;animation:2s ease-in-out infinite pulse;box-shadow:0 0 10px #ffcb0ea6}.bubble-tail.jsx-701d884d5b8b0fb2{border-top:10px solid #184274;border-left:10px solid #0000;border-right:10px solid #0000;width:0;height:0;transition:all .32s;position:absolute;bottom:-8px;right:20px}.bubble-show.jsx-701d884d5b8b0fb2{opacity:1;pointer-events:auto;transform:scale(1)translateY(0)}.bubble-hide.jsx-701d884d5b8b0fb2{opacity:0;pointer-events:none;transform:scale(.86)translateY(10px)}.form-icon.jsx-701d884d5b8b0fb2{background:linear-gradient(135deg,#184274 0%,#2e477d 100%);border-radius:50%;padding:12px;transition:all .36s cubic-bezier(.22,1,.36,1);position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);box-shadow:0 10px 26px #1842742e,0 6px 18px #0612240f}.icon-show.jsx-701d884d5b8b0fb2{opacity:1;pointer-events:auto;transform:translate(-50%,-50%)scale(1)rotate(0)}.icon-hide.jsx-701d884d5b8b0fb2{opacity:0;pointer-events:none;transform:translate(-50%,-50%)scale(.5)rotate(-180deg)}@keyframes floatBubble{0%,to{transform:translateY(0)}50%{transform:translateY(-8px)}}@keyframes pulse{0%,to{opacity:1;transform:scale(1)}50%{opacity:.55;transform:scale(1.25)}}.floating-bubble-container.jsx-701d884d5b8b0fb2:hover .chat-bubble.jsx-701d884d5b8b0fb2{transform:scale(1.06);box-shadow:0 20px 48px #18427447,0 14px 34px #0612241f}.floating-bubble-container.jsx-701d884d5b8b0fb2:hover .form-icon.jsx-701d884d5b8b0fb2{transform:translate(-50%,-50%)scale(1.08)rotate(0);box-shadow:0 18px 44px #18427438,0 12px 30px #06122414}.floating-bubble-container.jsx-701d884d5b8b0fb2:focus-visible{outline-offset:4px;border-radius:30px;outline:3px solid #ffcb0ef2}@media (prefers-reduced-motion:reduce){.chat-bubble.jsx-701d884d5b8b0fb2,.form-icon.jsx-701d884d5b8b0fb2,.bubble-pulse.jsx-701d884d5b8b0fb2{transition:none;animation:none}}@media (width<=640px){.bubble-text.jsx-701d884d5b8b0fb2{font-size:13px}.chat-bubble.jsx-701d884d5b8b0fb2{padding:10px 16px}}@keyframes fadeIn{0%{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}.animate-fadeIn.jsx-701d884d5b8b0fb2{animation:.3s ease-out fadeIn}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true);
}
}),
"[project]/components/Jobsection.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/jobs/page.jsx
__turbopack_context__.s([
    "default",
    ()=>JobsPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
"use client";
;
;
const HERO_SRC = "/mnt/data/Screenshot 2025-11-25 151317.png";
const FREE_JOBS = [
    {
        id: 1,
        title: "International - Voice Support",
        location: "Ambattur, Chennai",
        description: "Handle inbound/outbound international calls, resolve customer queries, and log interactions in CRM. Fluent English required. Shift: Rotational."
    },
    {
        id: 2,
        title: "Hindi - Customer Support",
        location: "Ambattur, Chennai",
        description: "Provide voice & chat support in Hindi for domestic customers. Good problem solving and typing speed required. Freshers welcome."
    },
    {
        id: 3,
        title: "AML Analyst",
        location: "Ambattur, Chennai",
        description: "Monitor transactions to detect suspicious activity, prepare reports, and escalate alerts. Requires attention to detail and basic Excel skills."
    },
    {
        id: 4,
        title: "Tamil Customer Support - Voice",
        location: "Ambattur, Chennai",
        description: "Handle Tamil-language customer calls, update CRM tickets, and assist with local enquiries. Strong Tamil communication required."
    },
    {
        id: 5,
        title: "International - Voice Support",
        location: "Ambattur, Chennai",
        description: "Assist overseas customers with product/service queries. Soft skills and clear pronunciation essential. Training provided."
    },
    {
        id: 6,
        title: "International - Voice Support",
        location: "Ambattur, Chennai",
        description: "Inbound voice role supporting various geographies. Must be comfortable with rotational shifts and targets."
    },
    {
        id: 7,
        title: "International - Voice Support",
        location: "Ambattur, Chennai",
        description: "Resolve customer issues on calls, ensure high CSAT, and follow SOPs. Prior BPO experience preferred but not mandatory."
    },
    {
        id: 8,
        title: "International - Voice Support",
        location: "Ambattur, Chennai",
        description: "Voice support role focused on troubleshooting and empathy-driven customer care. Good listening skills required."
    },
    {
        id: 9,
        title: "International - Voice Support",
        location: "Ambattur, Chennai",
        description: "Work with international customers across channels, maintain call quality, and meet SLA targets."
    },
    {
        id: 10,
        title: "International - Voice Support",
        location: "Ambattur, Chennai",
        description: "Provide timely resolutions for customer inquiries, escalate issues when necessary, and maintain accurate call notes."
    },
    {
        id: 11,
        title: "International - Voice Support",
        location: "Ambattur, Chennai",
        description: "Handle high-volume inbound calls, follow scripts where applicable, and ensure first-call resolution whenever possible."
    },
    {
        id: 12,
        title: "International - Voice Support",
        location: "Ambattur, Chennai",
        description: "Engage with customers professionally, adapt to varying accents, and contribute to team KPIs. Freshers with good English encouraged."
    }
];
const PLACEMENT_JOBS = [
    {
        id: 101,
        title: "Java Fullstack Developer",
        location: "Ambattur, Chennai",
        description: "Develop and maintain Java-based web applications. Java, Spring Boot, basic frontend (React/Angular)."
    },
    {
        id: 102,
        title: "Digital Marketing Executive",
        location: "Ambattur, Chennai",
        description: "Run campaigns, manage social channels, analyze KPIs. SEO & Ads experience preferred."
    },
    {
        id: 103,
        title: "Business Analyst",
        location: "Ambattur, Chennai",
        description: "Gather requirements, produce documentation, liaise with stakeholders."
    },
    {
        id: 104,
        title: "Data Analyst",
        location: "Ambattur, Chennai",
        description: "Analyze datasets, build dashboards. SQL & Excel required."
    },
    {
        id: 105,
        title: "HR Executive",
        location: "Ambattur, Chennai",
        description: "Coordinate recruitment, onboarding and employee communication."
    },
    {
        id: 106,
        title: "Technical Support Engineer",
        location: "Ambattur, Chennai",
        description: "Provide L1/L2 support, troubleshoot, document resolutions."
    }
];
function JobsPage() {
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("free");
    const [descJob, setDescJob] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [applyFor, setApplyFor] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        name: "",
        phone: "",
        altPhone: "",
        email: "",
        locationAreaCity: "",
        language: "English",
        followings: "No",
        highestEducation: "",
        collegeName: "",
        stream: "",
        yearOfPassing: "",
        anyArrears: "No",
        fresherOrExp: "Fresher",
        locationApplyingFor: "IT",
        positionApplyingFor: "",
        currentWork: "",
        experienceYears: "",
        howDidYouKnow: "",
        referenceName: ""
    });
    const [submitted, setSubmitted] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({});
    const jobsToShow = tab === "free" ? FREE_JOBS : PLACEMENT_JOBS;
    function openDesc(job) {
        setDescJob(job);
    }
    function closeDesc() {
        setDescJob(null);
    }
    function openApply(job) {
        setApplyFor(job);
        setForm((s)=>({
                ...s,
                positionApplyingFor: job?.title || ""
            }));
        setSubmitted(false);
        setErrors({});
    }
    function closeModal() {
        setApplyFor(null);
        setSubmitted(false);
    }
    function handleChange(e) {
        const { name, value } = e.target;
        // keep only digits for phone fields
        if (name === "phone" || name === "altPhone") {
            const digits = value.replace(/\D/g, "").slice(0, 10);
            setForm((s)=>({
                    ...s,
                    [name]: digits
                }));
            return;
        }
        setForm((s)=>({
                ...s,
                [name]: value
            }));
    }
    function validate() {
        const errs = {};
        if (!form.name.trim()) errs.name = "Enter full name";
        if (!/^\d{10}$/.test(form.phone)) errs.phone = "Enter 10-digit primary phone";
        if (form.altPhone && !/^\d{10}$/.test(form.altPhone)) errs.altPhone = "Enter 10-digit alternate phone or leave blank";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email";
        if (!form.locationAreaCity.trim()) errs.locationAreaCity = "Enter area & city";
        if (!form.highestEducation.trim()) errs.highestEducation = "Select highest education";
        if (!form.yearOfPassing.trim()) errs.yearOfPassing = "Enter year of passing";
        // experience requirements: if Experienced, ensure experienceYears is provided
        if (form.fresherOrExp === "Experienced" && !form.experienceYears.trim()) errs.experienceYears = "Enter experience in years";
        return errs;
    }
    function handleSubmit(e) {
        e.preventDefault();
        const errs = validate();
        setErrors(errs);
        if (Object.keys(errs).length) return;
        // simulate submit action (replace with real API call)
        console.log("Submitting application:", {
            applyFor,
            form
        });
        setSubmitted(true);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#FFD500] font-sans",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "max-w-6xl mx-auto px-6 py-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-3 gap-6 items-start",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "md:col-span-2 pt-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                    className: "text-4xl md:text-5xl font-extrabold leading-tight text-[#0b2447]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "block",
                                            children: "Find the job that fits"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Jobsection.js",
                                            lineNumber: 129,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "block text-blue-600",
                                            children: "your future"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Jobsection.js",
                                            lineNumber: 130,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Jobsection.js",
                                    lineNumber: 128,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/Jobsection.js",
                                lineNumber: 127,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex justify-end pt-4 md:pt-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "w-44 h-44 md:w-60 md:h-60 rounded-sm overflow-hidden bg-blue-700 flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                        src: HERO_SRC,
                                        alt: "hero",
                                        className: "object-cover w-full h-full"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Jobsection.js",
                                        lineNumber: 136,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/Jobsection.js",
                                    lineNumber: 135,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/Jobsection.js",
                                lineNumber: 134,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Jobsection.js",
                        lineNumber: 126,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "mt-8 flex justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "w-full max-w-3xl bg-blue-800 rounded-full p-1 flex items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setTab("free"),
                                    className: `flex-1 py-3 rounded-full font-semibold transition flex items-center justify-center ${tab === "free" ? "bg-white text-black" : "text-white"}`,
                                    style: {
                                        minWidth: 160
                                    },
                                    children: "Free Jobs"
                                }, void 0, false, {
                                    fileName: "[project]/components/Jobsection.js",
                                    lineNumber: 144,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setTab("placement"),
                                    className: `flex-1 py-3 rounded-full font-semibold transition flex items-center justify-center ${tab === "placement" ? "bg-white text-black" : "text-white"}`,
                                    style: {
                                        minWidth: 160
                                    },
                                    children: "Placement Jobs"
                                }, void 0, false, {
                                    fileName: "[project]/components/Jobsection.js",
                                    lineNumber: 152,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Jobsection.js",
                            lineNumber: 143,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/Jobsection.js",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "mt-8 grid grid-cols-1 md:grid-cols-3 gap-6",
                        children: jobsToShow.map((job)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "w-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between rounded-[40px] px-4 py-3 shadow-md",
                                    style: {
                                        background: "#0b4090",
                                        border: "4px solid #FFD500"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "text-white font-semibold text-sm md:text-base truncate",
                                                    children: job.title
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Jobsection.js",
                                                    lineNumber: 174,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "mt-2 flex items-center gap-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "inline-flex items-center gap-2 bg-[#FFD500] text-[#0b2447] text-xs font-medium px-2 py-1 rounded-full",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                                                                width: "14",
                                                                height: "14",
                                                                viewBox: "0 0 24 24",
                                                                fill: "none",
                                                                "aria-hidden": true,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                                                        d: "M12 2C8.13 2 5 4.9 5 8.5C5 13.48 12 22 12 22C12 22 19 13.48 19 8.5C19 4.9 15.87 2 12 2Z",
                                                                        fill: "#0B2447"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Jobsection.js",
                                                                        lineNumber: 181,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("circle", {
                                                                        cx: "12",
                                                                        cy: "8.5",
                                                                        r: "2.5",
                                                                        fill: "#FFD500"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Jobsection.js",
                                                                        lineNumber: 185,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 180,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: "truncate max-w-[12rem]",
                                                                children: job.location
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 188,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/Jobsection.js",
                                                        lineNumber: 179,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Jobsection.js",
                                                    lineNumber: 178,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/Jobsection.js",
                                            lineNumber: 173,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3 ml-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>openDesc(job),
                                                    className: "w-9 h-9 rounded-full bg-white flex items-center justify-center shadow",
                                                    "aria-label": "View description",
                                                    title: "View description",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                                                        width: "14",
                                                        height: "14",
                                                        viewBox: "0 0 24 24",
                                                        fill: "none",
                                                        "aria-hidden": true,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                                            d: "M7 10l5 5 5-5",
                                                            stroke: "#0B2447",
                                                            strokeWidth: "2",
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Jobsection.js",
                                                            lineNumber: 201,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Jobsection.js",
                                                        lineNumber: 200,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Jobsection.js",
                                                    lineNumber: 194,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>openApply(job),
                                                    className: "flex items-center gap-3 bg-white text-[#0B2447] font-semibold px-4 py-2 rounded-full shadow",
                                                    "aria-label": `Apply for ${job.title}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "text-sm",
                                                            children: "Apply"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Jobsection.js",
                                                            lineNumber: 210,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "w-7 h-7 bg-[#0b2447] rounded-full flex items-center justify-center text-white",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                                                                width: "12",
                                                                height: "12",
                                                                viewBox: "0 0 24 24",
                                                                fill: "none",
                                                                "aria-hidden": true,
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                                                    d: "M9 5l7 7-7 7",
                                                                    stroke: "currentColor",
                                                                    strokeWidth: "2",
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/Jobsection.js",
                                                                    lineNumber: 213,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 212,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Jobsection.js",
                                                            lineNumber: 211,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/Jobsection.js",
                                                    lineNumber: 205,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/Jobsection.js",
                                            lineNumber: 193,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Jobsection.js",
                                    lineNumber: 166,
                                    columnNumber: 15
                                }, this)
                            }, job.id, false, {
                                fileName: "[project]/components/Jobsection.js",
                                lineNumber: 165,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/Jobsection.js",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "mt-8 text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            className: "text-sm text-black/80"
                        }, void 0, false, {
                            fileName: "[project]/components/Jobsection.js",
                            lineNumber: 225,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/Jobsection.js",
                        lineNumber: 224,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Jobsection.js",
                lineNumber: 123,
                columnNumber: 7
            }, this),
            descJob && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center px-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-black/60",
                        onClick: closeDesc
                    }, void 0, false, {
                        fileName: "[project]/components/Jobsection.js",
                        lineNumber: 232,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "relative bg-white rounded-xl w-full max-w-lg mx-auto p-6 z-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: closeDesc,
                                className: "absolute top-3 right-3 text-gray-700 text-lg",
                                children: "✕"
                            }, void 0, false, {
                                fileName: "[project]/components/Jobsection.js",
                                lineNumber: 234,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                className: "text-xl font-bold mb-2 text-gray-800",
                                children: descJob.title
                            }, void 0, false, {
                                fileName: "[project]/components/Jobsection.js",
                                lineNumber: 235,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-600 mb-4",
                                children: descJob.location
                            }, void 0, false, {
                                fileName: "[project]/components/Jobsection.js",
                                lineNumber: 236,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "text-sm text-gray-700 leading-relaxed",
                                children: descJob.description
                            }, void 0, false, {
                                fileName: "[project]/components/Jobsection.js",
                                lineNumber: 237,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                                className: "mt-4 text-sm text-gray-600 list-disc list-inside",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                        children: "Experience: Freshers to 2 years"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Jobsection.js",
                                        lineNumber: 240,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                        children: "Shift: Rotational (may include weekends)"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Jobsection.js",
                                        lineNumber: 241,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                        children: "Salary: Depends on role (discussed on interview)"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Jobsection.js",
                                        lineNumber: 242,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Jobsection.js",
                                lineNumber: 239,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "mt-6 flex gap-3 justify-end",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: closeDesc,
                                        className: "px-4 py-2 border rounded",
                                        children: "Close"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Jobsection.js",
                                        lineNumber: 246,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            openApply(descJob);
                                            closeDesc();
                                        },
                                        className: "px-4 py-2 bg-blue-700 text-white rounded",
                                        children: "Apply"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Jobsection.js",
                                        lineNumber: 247,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Jobsection.js",
                                lineNumber: 245,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Jobsection.js",
                        lineNumber: 233,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Jobsection.js",
                lineNumber: 231,
                columnNumber: 9
            }, this),
            applyFor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center px-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-black/50",
                        onClick: closeModal
                    }, void 0, false, {
                        fileName: "[project]/components/Jobsection.js",
                        lineNumber: 256,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "relative bg-white rounded-xl w-full max-w-3xl mx-auto p-6 z-10 overflow-auto",
                        style: {
                            maxHeight: "90vh"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: closeModal,
                                className: "absolute top-3 right-3 text-gray-700 text-lg",
                                children: "✕"
                            }, void 0, false, {
                                fileName: "[project]/components/Jobsection.js",
                                lineNumber: 258,
                                columnNumber: 13
                            }, this),
                            !submitted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-bold mb-1 text-gray-800",
                                        children: [
                                            "Apply for ",
                                            applyFor.title
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Jobsection.js",
                                        lineNumber: 262,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-600 mb-4",
                                        children: applyFor.location
                                    }, void 0, false, {
                                        fileName: "[project]/components/Jobsection.js",
                                        lineNumber: 263,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                                        onSubmit: handleSubmit,
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                        className: "text-sm font-medium block mb-1",
                                                        children: "Full name"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Jobsection.js",
                                                        lineNumber: 268,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                        name: "name",
                                                        value: form.name,
                                                        onChange: handleChange,
                                                        placeholder: "Full name",
                                                        className: "w-full border rounded px-3 py-2 text-sm outline-none"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Jobsection.js",
                                                        lineNumber: 269,
                                                        columnNumber: 21
                                                    }, this),
                                                    errors.name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-red-500 mt-1",
                                                        children: errors.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Jobsection.js",
                                                        lineNumber: 270,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/Jobsection.js",
                                                lineNumber: 267,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 md:grid-cols-2 gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "text-sm font-medium block mb-1",
                                                                children: "Phone number"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 276,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                        className: "px-3 py-2 bg-gray-100 rounded-l text-sm",
                                                                        children: "+91"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Jobsection.js",
                                                                        lineNumber: 278,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                        name: "phone",
                                                                        value: form.phone,
                                                                        onChange: handleChange,
                                                                        placeholder: "10-digit mobile",
                                                                        inputMode: "numeric",
                                                                        className: "flex-1 border rounded-r px-3 py-2 text-sm outline-none",
                                                                        maxLength: 10
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Jobsection.js",
                                                                        lineNumber: 279,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 277,
                                                                columnNumber: 23
                                                            }, this),
                                                            errors.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-red-500 mt-1",
                                                                children: errors.phone
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 281,
                                                                columnNumber: 40
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/Jobsection.js",
                                                        lineNumber: 275,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "text-sm font-medium block mb-1",
                                                                children: "Alternate phone (optional)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 285,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                        className: "px-3 py-2 bg-gray-100 rounded-l text-sm",
                                                                        children: "+91"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Jobsection.js",
                                                                        lineNumber: 287,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                        name: "altPhone",
                                                                        value: form.altPhone,
                                                                        onChange: handleChange,
                                                                        placeholder: "Alternate mobile",
                                                                        inputMode: "numeric",
                                                                        className: "flex-1 border rounded-r px-3 py-2 text-sm outline-none",
                                                                        maxLength: 10
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Jobsection.js",
                                                                        lineNumber: 288,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 286,
                                                                columnNumber: 23
                                                            }, this),
                                                            errors.altPhone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-red-500 mt-1",
                                                                children: errors.altPhone
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 290,
                                                                columnNumber: 43
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/Jobsection.js",
                                                        lineNumber: 284,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/Jobsection.js",
                                                lineNumber: 274,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                        className: "text-sm font-medium block mb-1",
                                                        children: "Email"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Jobsection.js",
                                                        lineNumber: 296,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                        name: "email",
                                                        value: form.email,
                                                        onChange: handleChange,
                                                        placeholder: "name@example.com",
                                                        className: "w-full border rounded px-3 py-2 text-sm outline-none"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Jobsection.js",
                                                        lineNumber: 297,
                                                        columnNumber: 21
                                                    }, this),
                                                    errors.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-red-500 mt-1",
                                                        children: errors.email
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Jobsection.js",
                                                        lineNumber: 298,
                                                        columnNumber: 38
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/Jobsection.js",
                                                lineNumber: 295,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                        className: "text-sm font-medium block mb-1",
                                                        children: "Current location (Area & city)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Jobsection.js",
                                                        lineNumber: 303,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                        name: "locationAreaCity",
                                                        value: form.locationAreaCity,
                                                        onChange: handleChange,
                                                        placeholder: "Eg: Porur, Chennai",
                                                        className: "w-full border rounded px-3 py-2 text-sm outline-none"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Jobsection.js",
                                                        lineNumber: 304,
                                                        columnNumber: 21
                                                    }, this),
                                                    errors.locationAreaCity && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-red-500 mt-1",
                                                        children: errors.locationAreaCity
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Jobsection.js",
                                                        lineNumber: 305,
                                                        columnNumber: 49
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/Jobsection.js",
                                                lineNumber: 302,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 md:grid-cols-3 gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "text-sm font-medium block mb-1",
                                                                children: "Language you speak"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 311,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                                                name: "language",
                                                                value: form.language,
                                                                onChange: handleChange,
                                                                className: "w-full border rounded px-3 py-2 text-sm",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                        children: "English"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Jobsection.js",
                                                                        lineNumber: 313,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                        children: "Tamil"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Jobsection.js",
                                                                        lineNumber: 314,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                        children: "Both"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Jobsection.js",
                                                                        lineNumber: 315,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 312,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/Jobsection.js",
                                                        lineNumber: 310,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "text-sm font-medium block mb-1",
                                                                children: "I have followings"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 320,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                                                name: "followings",
                                                                value: form.followings,
                                                                onChange: handleChange,
                                                                className: "w-full border rounded px-3 py-2 text-sm",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                        children: "No"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Jobsection.js",
                                                                        lineNumber: 322,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                        children: "Yes"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Jobsection.js",
                                                                        lineNumber: 323,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 321,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/Jobsection.js",
                                                        lineNumber: 319,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "text-sm font-medium block mb-1",
                                                                children: "Any arrears"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 328,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                                                name: "anyArrears",
                                                                value: form.anyArrears,
                                                                onChange: handleChange,
                                                                className: "w-full border rounded px-3 py-2 text-sm",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                        children: "No"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Jobsection.js",
                                                                        lineNumber: 330,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                        children: "Yes"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Jobsection.js",
                                                                        lineNumber: 331,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 329,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/Jobsection.js",
                                                        lineNumber: 327,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/Jobsection.js",
                                                lineNumber: 309,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 md:grid-cols-4 gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "text-sm font-medium block mb-1",
                                                                children: "Highest Education"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 339,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                                                name: "highestEducation",
                                                                value: form.highestEducation,
                                                                onChange: handleChange,
                                                                className: "w-full border rounded px-3 py-2 text-sm",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                        value: "",
                                                                        children: "Select"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Jobsection.js",
                                                                        lineNumber: 341,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                        children: "10th"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Jobsection.js",
                                                                        lineNumber: 342,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                        children: "12th"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Jobsection.js",
                                                                        lineNumber: 343,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                        children: "Diploma"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Jobsection.js",
                                                                        lineNumber: 344,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                        children: "UG (B.Sc / BCom / BA)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Jobsection.js",
                                                                        lineNumber: 345,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                        children: "UG (BTech / BE)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Jobsection.js",
                                                                        lineNumber: 346,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                        children: "PG (MSc / MCom / MA)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Jobsection.js",
                                                                        lineNumber: 347,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                        children: "PG (MTech / ME)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Jobsection.js",
                                                                        lineNumber: 348,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                        children: "Other"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Jobsection.js",
                                                                        lineNumber: 349,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 340,
                                                                columnNumber: 23
                                                            }, this),
                                                            errors.highestEducation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-red-500 mt-1",
                                                                children: errors.highestEducation
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 351,
                                                                columnNumber: 51
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/Jobsection.js",
                                                        lineNumber: 338,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "text-sm font-medium block mb-1",
                                                                children: "Name of the college"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 355,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                name: "collegeName",
                                                                value: form.collegeName,
                                                                onChange: handleChange,
                                                                placeholder: "College name",
                                                                className: "w-full border rounded px-3 py-2 text-sm outline-none"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 356,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/Jobsection.js",
                                                        lineNumber: 354,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "text-sm font-medium block mb-1",
                                                                children: "Stream / course of study"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 360,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                name: "stream",
                                                                value: form.stream,
                                                                onChange: handleChange,
                                                                placeholder: "Eg: BCom / CS / EEE",
                                                                className: "w-full border rounded px-3 py-2 text-sm outline-none"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 361,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/Jobsection.js",
                                                        lineNumber: 359,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "text-sm font-medium block mb-1",
                                                                children: "Year of passing"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 365,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                name: "yearOfPassing",
                                                                value: form.yearOfPassing,
                                                                onChange: handleChange,
                                                                placeholder: "Eg: 2023",
                                                                className: "w-full border rounded px-3 py-2 text-sm outline-none"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 366,
                                                                columnNumber: 23
                                                            }, this),
                                                            errors.yearOfPassing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-red-500 mt-1",
                                                                children: errors.yearOfPassing
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 367,
                                                                columnNumber: 48
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/Jobsection.js",
                                                        lineNumber: 364,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/Jobsection.js",
                                                lineNumber: 337,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 md:grid-cols-3 gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "text-sm font-medium block mb-1",
                                                                children: "Are you fresher or experienced?"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 374,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                                                name: "fresherOrExp",
                                                                value: form.fresherOrExp,
                                                                onChange: handleChange,
                                                                className: "w-full border rounded px-3 py-2 text-sm",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                        children: "Fresher"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Jobsection.js",
                                                                        lineNumber: 376,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                        children: "Experienced"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Jobsection.js",
                                                                        lineNumber: 377,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 375,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/Jobsection.js",
                                                        lineNumber: 373,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "text-sm font-medium block mb-1",
                                                                children: "Experience (years)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 382,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                name: "experienceYears",
                                                                value: form.experienceYears,
                                                                onChange: handleChange,
                                                                placeholder: "Eg: 2",
                                                                className: "w-full border rounded px-3 py-2 text-sm outline-none"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 383,
                                                                columnNumber: 23
                                                            }, this),
                                                            errors.experienceYears && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-red-500 mt-1",
                                                                children: errors.experienceYears
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 384,
                                                                columnNumber: 50
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/Jobsection.js",
                                                        lineNumber: 381,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "text-sm font-medium block mb-1",
                                                                children: "Current work (position/company)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 388,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                name: "currentWork",
                                                                value: form.currentWork,
                                                                onChange: handleChange,
                                                                placeholder: "Eg: Customer Support - ABC Pvt Ltd",
                                                                className: "w-full border rounded px-3 py-2 text-sm outline-none"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 389,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/Jobsection.js",
                                                        lineNumber: 387,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/Jobsection.js",
                                                lineNumber: 372,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 md:grid-cols-2 gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "text-sm font-medium block mb-1",
                                                                children: "Location Applying For"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 396,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                                                name: "locationApplyingFor",
                                                                value: form.locationApplyingFor,
                                                                onChange: handleChange,
                                                                className: "w-full border rounded px-3 py-2 text-sm",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                        children: "IT"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Jobsection.js",
                                                                        lineNumber: 398,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                        children: "Non-IT"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Jobsection.js",
                                                                        lineNumber: 399,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 397,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/Jobsection.js",
                                                        lineNumber: 395,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "text-sm font-medium block mb-1",
                                                                children: "Position applying for"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 404,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                name: "positionApplyingFor",
                                                                value: form.positionApplyingFor,
                                                                onChange: handleChange,
                                                                placeholder: "Position",
                                                                className: "w-full border rounded px-3 py-2 text-sm outline-none"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 405,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/Jobsection.js",
                                                        lineNumber: 403,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/Jobsection.js",
                                                lineNumber: 394,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 md:grid-cols-2 gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "text-sm font-medium block mb-1",
                                                                children: "How did you know about Career School?"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 412,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                name: "howDidYouKnow",
                                                                value: form.howDidYouKnow,
                                                                onChange: handleChange,
                                                                placeholder: "Eg: Social media / Friend / Walk-in",
                                                                className: "w-full border rounded px-3 py-2 text-sm outline-none"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 413,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/Jobsection.js",
                                                        lineNumber: 411,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "text-sm font-medium block mb-1",
                                                                children: "If reference, please mention name"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 417,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                name: "referenceName",
                                                                value: form.referenceName,
                                                                onChange: handleChange,
                                                                placeholder: "Reference name (optional)",
                                                                className: "w-full border rounded px-3 py-2 text-sm outline-none"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Jobsection.js",
                                                                lineNumber: 418,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/Jobsection.js",
                                                        lineNumber: 416,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/Jobsection.js",
                                                lineNumber: 410,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "flex gap-3 justify-end mt-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: closeModal,
                                                        className: "px-4 py-2 border rounded",
                                                        children: "Cancel"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Jobsection.js",
                                                        lineNumber: 424,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        type: "submit",
                                                        className: "px-4 py-2 bg-blue-600 text-white rounded font-semibold",
                                                        children: "Submit"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Jobsection.js",
                                                        lineNumber: 425,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/Jobsection.js",
                                                lineNumber: 423,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Jobsection.js",
                                        lineNumber: 265,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "text-center py-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "mb-3",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                                            className: "mx-auto",
                                            width: "48",
                                            height: "48",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            "aria-hidden": true,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                                d: "M9 12l2 2 4-4",
                                                stroke: "#0B2447",
                                                strokeWidth: "2",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Jobsection.js",
                                                lineNumber: 433,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/Jobsection.js",
                                            lineNumber: 432,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Jobsection.js",
                                        lineNumber: 431,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                        className: "text-lg font-semibold mb-2",
                                        children: "Thanks — we've got your application"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Jobsection.js",
                                        lineNumber: 436,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-600 mb-4",
                                        children: [
                                            "Our team will connect with you within ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "font-bold text-yellow-500",
                                                children: "24 hours"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Jobsection.js",
                                                lineNumber: 438,
                                                columnNumber: 57
                                            }, this),
                                            "."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Jobsection.js",
                                        lineNumber: 437,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "flex gap-3 justify-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                className: "px-4 py-2 bg-green-600 text-white rounded",
                                                href: `https://wa.me/91${form.phone || ""}?text=${encodeURIComponent(`Hi, I'm ${form.name || ""} regarding ${applyFor.title}. My email: ${form.email || ""}.`)}`,
                                                target: "_blank",
                                                rel: "noreferrer",
                                                children: "Message on WhatsApp"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Jobsection.js",
                                                lineNumber: 442,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: closeModal,
                                                className: "px-4 py-2 border rounded",
                                                children: "Close"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Jobsection.js",
                                                lineNumber: 453,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Jobsection.js",
                                        lineNumber: 441,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Jobsection.js",
                                lineNumber: 430,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Jobsection.js",
                        lineNumber: 257,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Jobsection.js",
                lineNumber: 255,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Jobsection.js",
        lineNumber: 122,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/Zohopage.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/FullImage.jsx
__turbopack_context__.s([
    "default",
    ()=>FullImage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
"use client";
;
function FullImage({ heroSrc = "/Zoho images/careerschool-zoho-main.png", zohoLogo = "/Zoho images/ZOHO LOGO - Zoho Card.png", payrollLogo = "/Zoho images/Zoho Payroll Logo - Zoho Card.png", cshrLogo = "/Zoho images/CSHR LOGO White - Zoho Card.png" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
        className: "w-full bg-white pt-0 pb-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "w-full px-0 mx-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "relative w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                            src: heroSrc,
                            alt: "Careerschool and Zoho team announcing the training partnership",
                            className: "w-full h-screen object-cover block",
                            loading: "eager"
                        }, void 0, false, {
                            fileName: "[project]/components/Zohopage.js",
                            lineNumber: 18,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 flex flex-col justify-end items-start p-12",
                            style: {
                                background: "linear-gradient(180deg, rgba(2,6,23,0.0) 0%, rgba(2,6,23,0.35) 60%, rgba(2,6,23,0.55) 100%)",
                                color: "#e5e7eb"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "inline-flex flex-col gap-2 max-w-[520px]",
                                style: {
                                    padding: "12px 18px",
                                    background: "rgba(8,12,20,0.36)",
                                    backdropFilter: "blur(6px)",
                                    borderRadius: "12px",
                                    boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
                                    border: "1px solid rgba(255,255,255,0.05)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "self-start px-3 py-1 rounded-full text-[15px] font-semibold uppercase tracking-[0.12em]",
                                        style: {
                                            background: "rgba(234,179,8,0.12)",
                                            border: "1px solid rgba(250,204,21,0.6)",
                                            color: "#ffd86b"
                                        },
                                        children: "Official Zoho Authorized Training Partner"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Zohopage.js",
                                        lineNumber: 46,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "inline-flex items-center gap-3 mt-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                src: "/Zoho Images/ZOHO LOGO - Zoho card.png",
                                                className: "max-h-[44px]"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Zohopage.js",
                                                lineNumber: 59,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                src: payrollLogo,
                                                className: "max-h-[44px]"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Zohopage.js",
                                                lineNumber: 60,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "w-[1px] h-[32px]",
                                                style: {
                                                    background: "rgba(255,255,255,0.06)"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/Zohopage.js",
                                                lineNumber: 61,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                src: cshrLogo,
                                                className: "max-h-[52px]"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Zohopage.js",
                                                lineNumber: 62,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Zohopage.js",
                                        lineNumber: 58,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "m-0 text-[16px] leading-snug",
                                        style: {
                                            color: "#e6eef8"
                                        },
                                        children: "A FOCUSED PARTNERSHIP TO BUILD JOB-READY TALENTS."
                                    }, void 0, false, {
                                        fileName: "[project]/components/Zohopage.js",
                                        lineNumber: 66,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Zohopage.js",
                                lineNumber: 34,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/Zohopage.js",
                            lineNumber: 26,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Zohopage.js",
                    lineNumber: 15,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Zohopage.js",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 w-full max-w-[1120px] mx-auto mt-6 gap-[18px] px-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "relative bg-[#0b1120] rounded-[35px] overflow-hidden flex flex-col",
                        style: {
                            border: "1px solid rgba(15,23,42,0.65)",
                            boxShadow: "0 6px 18px rgba(0,0,0,0.18)"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                            src: "/Zoho images/careerschool-zoho-training.png",
                            className: "w-full h-auto object-cover block"
                        }, void 0, false, {
                            fileName: "[project]/components/Zohopage.js",
                            lineNumber: 87,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/Zohopage.js",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "relative bg-[#0b1120] rounded-[20px] overflow-hidden flex flex-col",
                        style: {
                            border: "1px solid rgba(15,23,42,0.65)",
                            boxShadow: "0 6px 18px rgba(0,0,0,0.18)"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "w-full aspect-video overflow-hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("iframe", {
                                src: "https://www.youtube.com/embed/Sbd5RsKO6_Y?autoplay=1&mute=1&rel=0&playsinline=1",
                                title: "YouTube video",
                                allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
                                allowFullScreen: true,
                                className: "w-full h-full block"
                            }, void 0, false, {
                                fileName: "[project]/components/Zohopage.js",
                                lineNumber: 102,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/Zohopage.js",
                            lineNumber: 101,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/Zohopage.js",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Zohopage.js",
                lineNumber: 77,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Zohopage.js",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
}),
"[project]/pages/index.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$HeroBanner$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/HeroBanner.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Header$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Header.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FullImage$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/FullImage.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$GoogleReview$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/GoogleReview.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Discover$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Discover.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$StudentsReview$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/StudentsReview.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MeetOurStars$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/MeetOurStars.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Courses$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Courses.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Alumni$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Alumni.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NeedHelp$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/NeedHelp.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Footer$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Footer.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chatbot$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/chatbot.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Popupform$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Popupform.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Jobsection$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Jobsection.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Zohopage$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Zohopage.js [ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function Home() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$chatbot$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$HeroBanner$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Header$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Popupform$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FullImage$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Zohopage$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$GoogleReview$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Discover$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Jobsection$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$StudentsReview$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Courses$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MeetOurStars$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Alumni$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NeedHelp$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Footer$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 34,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/index.js",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d33faeb7._.js.map