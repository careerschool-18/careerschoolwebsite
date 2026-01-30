module.exports = [
"[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("styled-jsx/style.js", () => require("styled-jsx/style.js"));

module.exports = mod;
}),
"[externals]/react-dom [external] (react-dom, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react-dom", () => require("react-dom"));

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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$script$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/script.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
"use client";
;
;
;
;
function NewYearOffer2026() {
    const formRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const reviewTrack = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const [openSyllabusIndex, setOpenSyllabusIndex] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    let reviewIndex = 0;
    /* ================= REVIEW AUTO SLIDE ================= */ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const interval = setInterval(()=>{
            if (!reviewTrack.current) return;
            const visible = window.innerWidth <= 900 ? 1 : 2;
            const cardWidth = reviewTrack.current.children[0].getBoundingClientRect().width + 20;
            reviewIndex++;
            if (reviewIndex > reviewTrack.current.children.length - visible) {
                reviewIndex = 0;
            }
            reviewTrack.current.style.transform = `translateX(-${reviewIndex * cardWidth}px)`;
        }, 3000);
        return ()=>clearInterval(interval);
    }, []);
    const handleEnrollClick = ()=>{
        formRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    };
    const handleLogoClick = ()=>{
        window.location.href = "/";
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
    /* ================= REVIEWS ================= */ const reviews = [
        {
            name: "Pavithra",
            role: "Python with AI",
            text: "I recently completed my Python with AI training at Careerschool HR Solutions. The sessions were clear, practical, and easy to understand. With strong placement support, I got placed as a Software Trainee."
        },
        {
            name: "Gayathri",
            role: "Data Analytics",
            text: "The training and internship gave me real-time exposure to data handling, analysis, and reporting. It boosted my confidence and helped me start my career successfully."
        },
        {
            name: "Mukthar Ahamed R",
            role: "Data Analyst Intern",
            text: "I gained hands-on experience in business analysis, dashboards, SQL, Excel, and real-time projects. Solving real-world problems improved my analytical skills."
        },
        {
            name: "Hema Sai",
            role: "Python Full Stack Intern",
            text: "Receiving the Star Student Award motivated me to keep learning and improving. The mentorship and guidance were excellent throughout the internship."
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
                id: "dc44f79bbb4a7eda",
                children: ':root{--primary:#1ecbff;--primary-dark:#0fa0cf;--bg-dark:#0b1a24;--text-light:#d6e9f5}*{box-sizing:border-box;margin:0;padding:0}body{background:radial-gradient(circle at top,#0e2a3f,var(--bg-dark));color:#fff;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif}.white-header-left{z-index:5000;background:#fff;align-items:center;padding:8px 20px;display:flex;position:fixed;top:0;left:0;right:0;box-shadow:0 2px 10px #0000001a}.logo-container-left{cursor:pointer;align-items:center;gap:20px;display:flex}.logo-img{height:42px}.hero{align-items:center;min-height:100vh;padding:140px 16px 100px;display:flex;position:relative}.hero-bg{position:absolute;inset:0}.hero-bg img{object-fit:cover;width:100%;height:100%}.hero-overlay{background:linear-gradient(#050f16a6,#050f16e6);position:absolute;inset:0}.hero-inner{z-index:1;grid-template-columns:1.1fr .9fr;gap:40px;max-width:1100px;margin:auto;display:grid;position:relative}.hero h1{margin-bottom:16px;font-size:max(32px,min(5vw,56px));font-weight:400}.hero ul{margin-top:20px;font-weight:600;list-style:none}.hero li{margin-bottom:12px}.hero li:before{content:"✓";color:var(--primary);margin-right:8px}.form-card{color:#111;background:#fff;border-radius:18px;padding:32px}.form-card input,.form-card select{border:1px solid #ddd;border-radius:10px;width:100%;margin-bottom:14px;padding:14px}.primary-btn{background:linear-gradient(135deg,var(--primary),var(--primary-dark));color:#fff;cursor:pointer;border:none;border-radius:12px;width:100%;padding:16px;font-weight:700}.section{max-width:1100px;margin:auto;padding:70px 16px}.courses{grid-template-columns:repeat(3,1fr);gap:20px;display:grid}@media (width<=900px){.courses,.hero-inner,.courses{grid-template-columns:1fr}.courses>.course{grid-column:auto;justify-self:stretch}}.course{color:#111;background:#fff;border-radius:16px;padding:22px}.course-head{align-items:center;gap:14px;margin-bottom:14px;display:flex}.course-actions{gap:10px;display:flex}.btn-syllabus,.btn-enroll{cursor:pointer;border-radius:10px;flex:1;padding:11px;font-weight:700}.btn-syllabus{background:var(--primary);color:#fff;border:none}.btn-enroll{border:2px solid var(--primary);color:var(--primary);background:0 0}.syllabus{background:#f5faff;border-radius:10px;margin-top:14px;padding:14px}.review-section{background:#020a10}.review-carousel{max-width:1100px;margin:auto;overflow:hidden}.review-track{gap:20px;transition:transform .6s;display:flex}.review-card{color:#111;text-align:center;background:#fff;border-radius:16px;flex:0 0 calc(50% - 10px);padding:22px}.review-name{font-size:18px;font-weight:700}.review-role{color:#666;margin-bottom:6px;font-size:14px;display:block}.stars{color:gold;margin-bottom:10px;font-size:18px}'
            }, void 0, false, void 0, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
                className: "jsx-dc44f79bbb4a7eda" + " " + "white-header-left",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    onClick: handleLogoClick,
                    className: "jsx-dc44f79bbb4a7eda" + " " + "logo-container-left",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                            src: "/Nav Logo/CSHR - Nav Logo.png",
                            className: "jsx-dc44f79bbb4a7eda" + " " + "logo-img"
                        }, void 0, false, {
                            fileName: "[project]/pages/NewYearOffer2026.js",
                            lineNumber: 397,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                            src: "/Nav Logo/CSIT - Nav Logo.png",
                            className: "jsx-dc44f79bbb4a7eda" + " " + "logo-img"
                        }, void 0, false, {
                            fileName: "[project]/pages/NewYearOffer2026.js",
                            lineNumber: 398,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/NewYearOffer2026.js",
                    lineNumber: 396,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/NewYearOffer2026.js",
                lineNumber: 395,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                className: "jsx-dc44f79bbb4a7eda" + " " + "hero",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-dc44f79bbb4a7eda" + " " + "hero-bg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                src: "/Newyear/Banner.png",
                                className: "jsx-dc44f79bbb4a7eda"
                            }, void 0, false, {
                                fileName: "[project]/pages/NewYearOffer2026.js",
                                lineNumber: 405,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-dc44f79bbb4a7eda" + " " + "hero-overlay"
                            }, void 0, false, {
                                fileName: "[project]/pages/NewYearOffer2026.js",
                                lineNumber: 406,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/NewYearOffer2026.js",
                        lineNumber: 404,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-dc44f79bbb4a7eda" + " " + "hero-inner",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-dc44f79bbb4a7eda",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                        className: "jsx-dc44f79bbb4a7eda",
                                        children: "Open New Opportunities in 2026 🚀"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/NewYearOffer2026.js",
                                        lineNumber: 411,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "jsx-dc44f79bbb4a7eda",
                                        children: "New Year Special Offer on Job-Ready Skill Programs"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/NewYearOffer2026.js",
                                        lineNumber: 412,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                                        className: "jsx-dc44f79bbb4a7eda",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                className: "jsx-dc44f79bbb4a7eda",
                                                children: "Industry aligned curriculum"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/NewYearOffer2026.js",
                                                lineNumber: 414,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                className: "jsx-dc44f79bbb4a7eda",
                                                children: "Live mentor support"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/NewYearOffer2026.js",
                                                lineNumber: 415,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                className: "jsx-dc44f79bbb4a7eda",
                                                children: "Placement assistance"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/NewYearOffer2026.js",
                                                lineNumber: 416,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                className: "jsx-dc44f79bbb4a7eda",
                                                children: "Lifetime access"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/NewYearOffer2026.js",
                                                lineNumber: 417,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/NewYearOffer2026.js",
                                        lineNumber: 413,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/NewYearOffer2026.js",
                                lineNumber: 410,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                ref: formRef,
                                className: "jsx-dc44f79bbb4a7eda" + " " + "form-card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                        className: "jsx-dc44f79bbb4a7eda",
                                        children: "Get Offer Details"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/NewYearOffer2026.js",
                                        lineNumber: 422,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$script$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        src: "https://js-na2.hsforms.net/forms/embed/243742367.js",
                                        strategy: "lazyOnload"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/NewYearOffer2026.js",
                                        lineNumber: 424,
                                        columnNumber: 1
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        "data-region": "na2",
                                        "data-form-id": "0237c445-e852-43ea-9b9f-091cd6c000e5",
                                        "data-portal-id": "243742367",
                                        className: "jsx-dc44f79bbb4a7eda" + " " + "hs-form-frame"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/NewYearOffer2026.js",
                                        lineNumber: 429,
                                        columnNumber: 1
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/NewYearOffer2026.js",
                                lineNumber: 421,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/NewYearOffer2026.js",
                        lineNumber: 409,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/NewYearOffer2026.js",
                lineNumber: 403,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                className: "jsx-dc44f79bbb4a7eda" + " " + "section",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        style: {
                            textAlign: "center",
                            marginBottom: 36
                        },
                        className: "jsx-dc44f79bbb4a7eda",
                        children: "Choose Your Learning Path"
                    }, void 0, false, {
                        fileName: "[project]/pages/NewYearOffer2026.js",
                        lineNumber: 441,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-dc44f79bbb4a7eda" + " " + "courses",
                        children: courses.map((course, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-dc44f79bbb4a7eda" + " " + "course",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-dc44f79bbb4a7eda" + " " + "course-head",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                src: course.image,
                                                width: "48",
                                                className: "jsx-dc44f79bbb4a7eda"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/NewYearOffer2026.js",
                                                lineNumber: 449,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                className: "jsx-dc44f79bbb4a7eda",
                                                children: course.title
                                            }, void 0, false, {
                                                fileName: "[project]/pages/NewYearOffer2026.js",
                                                lineNumber: 450,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/NewYearOffer2026.js",
                                        lineNumber: 448,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-dc44f79bbb4a7eda" + " " + "course-actions",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setOpenSyllabusIndex(openSyllabusIndex === i ? null : i),
                                                className: "jsx-dc44f79bbb4a7eda" + " " + "btn-syllabus",
                                                children: "View Syllabus"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/NewYearOffer2026.js",
                                                lineNumber: 454,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: handleEnrollClick,
                                                className: "jsx-dc44f79bbb4a7eda" + " " + "btn-enroll",
                                                children: "Enroll"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/NewYearOffer2026.js",
                                                lineNumber: 462,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/NewYearOffer2026.js",
                                        lineNumber: 453,
                                        columnNumber: 15
                                    }, this),
                                    openSyllabusIndex === i && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                                        className: "jsx-dc44f79bbb4a7eda" + " " + "syllabus",
                                        children: course.syllabus.map((item, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                className: "jsx-dc44f79bbb4a7eda",
                                                children: item
                                            }, j, false, {
                                                fileName: "[project]/pages/NewYearOffer2026.js",
                                                lineNumber: 470,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/pages/NewYearOffer2026.js",
                                        lineNumber: 468,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/pages/NewYearOffer2026.js",
                                lineNumber: 447,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/pages/NewYearOffer2026.js",
                        lineNumber: 445,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/NewYearOffer2026.js",
                lineNumber: 440,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                className: "jsx-dc44f79bbb4a7eda" + " " + "section review-section",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        style: {
                            textAlign: "center",
                            marginBottom: 36
                        },
                        className: "jsx-dc44f79bbb4a7eda",
                        children: "What Our Learners Say"
                    }, void 0, false, {
                        fileName: "[project]/pages/NewYearOffer2026.js",
                        lineNumber: 481,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-dc44f79bbb4a7eda" + " " + "review-carousel",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            ref: reviewTrack,
                            className: "jsx-dc44f79bbb4a7eda" + " " + "review-track",
                            children: reviews.map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "jsx-dc44f79bbb4a7eda" + " " + "review-card",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "jsx-dc44f79bbb4a7eda" + " " + "review-name",
                                            children: r.name
                                        }, void 0, false, {
                                            fileName: "[project]/pages/NewYearOffer2026.js",
                                            lineNumber: 489,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "jsx-dc44f79bbb4a7eda" + " " + "review-role",
                                            children: r.role
                                        }, void 0, false, {
                                            fileName: "[project]/pages/NewYearOffer2026.js",
                                            lineNumber: 490,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "jsx-dc44f79bbb4a7eda" + " " + "stars",
                                            children: "★★★★★"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/NewYearOffer2026.js",
                                            lineNumber: 491,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            className: "jsx-dc44f79bbb4a7eda",
                                            children: r.text
                                        }, void 0, false, {
                                            fileName: "[project]/pages/NewYearOffer2026.js",
                                            lineNumber: 492,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/pages/NewYearOffer2026.js",
                                    lineNumber: 488,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/pages/NewYearOffer2026.js",
                            lineNumber: 486,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pages/NewYearOffer2026.js",
                        lineNumber: 485,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/NewYearOffer2026.js",
                lineNumber: 480,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__78a898c0._.js.map