module.exports = [
"[project]/cshr-website-full/components/HeroBanner.js [ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[project]/cshr-website-full/components/Header.js [ssr] (ecmascript)", ((__turbopack_context__) => {
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
    // ✅ WhatsApp links
    const hireStudentsLink = "https://wa.me/7305014818";
    const contactLink = "https://wa.me/7708938866";
    // ✅ Smooth scroll to sections
    const scrollToSection = (id)=>{
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({
                behavior: "smooth"
            });
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
        className: "flex items-center justify-between px-6 py-4 bg-white shadow relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex-shrink-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                    src: "/Footer Logo/CSIT - Footer Logo.png",
                    alt: "Logo",
                    className: "h-10 w-auto"
                }, void 0, false, {
                    fileName: "[project]/cshr-website-full/components/Header.js",
                    lineNumber: 24,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/Header.js",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
                className: "hidden md:flex items-center gap-3 ml-auto mr-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>scrollToSection("courses"),
                        className: "bg-blue-100 text-blue-700 px-4 py-2 rounded font-semibold text-sm hover:bg-blue-200 transition",
                        children: "Courses"
                    }, void 0, false, {
                        fileName: "[project]/cshr-website-full/components/Header.js",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>scrollToSection("meet-our-stars"),
                        className: "bg-blue-100 text-blue-700 px-4 py-2 rounded font-semibold text-sm hover:bg-blue-200 transition",
                        children: "Success Story"
                    }, void 0, false, {
                        fileName: "[project]/cshr-website-full/components/Header.js",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                        href: hireStudentsLink,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "bg-blue-100 text-blue-700 px-4 py-2 rounded font-semibold text-sm hover:bg-blue-200 transition",
                        children: "Hire Students"
                    }, void 0, false, {
                        fileName: "[project]/cshr-website-full/components/Header.js",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cshr-website-full/components/Header.js",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "hidden md:block",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                    href: contactLink,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        className: "bg-blue-600 text-white px-5 py-2 rounded font-semibold text-sm hover:bg-blue-700 transition",
                        children: "Contact Us"
                    }, void 0, false, {
                        fileName: "[project]/cshr-website-full/components/Header.js",
                        lineNumber: 63,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/cshr-website-full/components/Header.js",
                    lineNumber: 58,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/Header.js",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                className: "md:hidden text-gray-800 focus:outline-none",
                onClick: ()=>setMenuOpen(!menuOpen),
                children: menuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                    size: 28
                }, void 0, false, {
                    fileName: "[project]/cshr-website-full/components/Header.js",
                    lineNumber: 74,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                    size: 28
                }, void 0, false, {
                    fileName: "[project]/cshr-website-full/components/Header.js",
                    lineNumber: 74,
                    columnNumber: 39
                }, this)
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/Header.js",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            menuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-6 md:hidden z-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            scrollToSection("courses");
                            setMenuOpen(false);
                        },
                        className: "bg-blue-100 text-blue-700 px-6 py-2 rounded font-semibold text-sm hover:bg-blue-200 transition",
                        children: "Courses"
                    }, void 0, false, {
                        fileName: "[project]/cshr-website-full/components/Header.js",
                        lineNumber: 81,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            scrollToSection("meet-our-stars");
                            setMenuOpen(false);
                        },
                        className: "bg-blue-100 text-blue-700 px-6 py-2 rounded font-semibold text-sm hover:bg-blue-200 transition",
                        children: "Placement"
                    }, void 0, false, {
                        fileName: "[project]/cshr-website-full/components/Header.js",
                        lineNumber: 92,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                        href: hireStudentsLink,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        onClick: ()=>setMenuOpen(false),
                        className: "bg-blue-100 text-blue-700 px-6 py-2 rounded font-semibold text-sm hover:bg-blue-200 transition",
                        children: "Hire Students"
                    }, void 0, false, {
                        fileName: "[project]/cshr-website-full/components/Header.js",
                        lineNumber: 103,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                        href: contactLink,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        onClick: ()=>setMenuOpen(false),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            className: "bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700 transition",
                            children: "Contact Us"
                        }, void 0, false, {
                            fileName: "[project]/cshr-website-full/components/Header.js",
                            lineNumber: 120,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/cshr-website-full/components/Header.js",
                        lineNumber: 114,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cshr-website-full/components/Header.js",
                lineNumber: 79,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cshr-website-full/components/Header.js",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
}),
"[project]/cshr-website-full/components/FullImage.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FullImage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
"use client";
;
function FullImage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
        className: "relative w-full h-screen overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                src: "/Home page images/Home Page - 3840 x 2160.png",
                alt: "Desktop View",
                className: "hidden sm:block w-full h-full object-cover"
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/FullImage.js",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                src: "/Home page images/Home Page - 1080 x 920.png",
                alt: "Mobile View",
                className: "block sm:hidden w-full h-full object-cover",
                loading: "eager"
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/FullImage.js",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/40"
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/FullImage.js",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "absolute left-5 sm:left-10 top-1/2 transform -translate-y-1/2 text-left",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                    className: "text-[#ffd02b] font-extrabold uppercase text-3xl sm:text-5xl md:text-6xl leading-tight drop-shadow-lg",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            className: "block mb-4 sm:mb-6 md:mb-8",
                            children: "Your"
                        }, void 0, false, {
                            fileName: "[project]/cshr-website-full/components/FullImage.js",
                            lineNumber: 27,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            className: "block mb-4 sm:mb-6 md:mb-8",
                            children: "Trusted Training"
                        }, void 0, false, {
                            fileName: "[project]/cshr-website-full/components/FullImage.js",
                            lineNumber: 28,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            className: "block mb-4 sm:mb-6 md:mb-8",
                            children: "&"
                        }, void 0, false, {
                            fileName: "[project]/cshr-website-full/components/FullImage.js",
                            lineNumber: 29,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            className: "block",
                            children: "Placement Hub"
                        }, void 0, false, {
                            fileName: "[project]/cshr-website-full/components/FullImage.js",
                            lineNumber: 30,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/cshr-website-full/components/FullImage.js",
                    lineNumber: 26,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/FullImage.js",
                lineNumber: 25,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cshr-website-full/components/FullImage.js",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
}),
"[project]/cshr-website-full/components/GoogleReview.js [ssr] (ecmascript)", ((__turbopack_context__) => {
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
    // 🎬 Typewriter Effect
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
    // 🖼 Slides
    const slides = [
        {
            src: "/Social Media Banner image/Social Media Banner (Resized) Google.jpg",
            link: "https://www.google.com/search?q=Career+School+HR+Solutions+Reviews",
            alt: "Google Reviews"
        },
        {
            src: "/Social Media Banner image/Social Media Banner (Resized) LinkedIn.jpg",
            link: "https://www.linkedin.com/company/careerschool-hr-solutions/",
            alt: "LinkedIn Page"
        },
        {
            src: "/Social Media Banner image/Social Media Banner (Resized) Instagram.jpg",
            link: "https://www.instagram.com/careerschoolhrsolutions",
            alt: "Instagram Page"
        }
    ];
    const [current, setCurrent] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    // ⏱ Auto-slide every 5 seconds
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const interval = setInterval(()=>{
            setCurrent((prev)=>(prev + 1) % slides.length);
        }, 5000);
        return ()=>clearInterval(interval);
    }, [
        slides.length
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
        className: "w-full flex flex-col items-center justify-start text-center overflow-hidden bg-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "py-8 px-3 sm:py-10 sm:px-6 z-10 relative bg-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                    className: "text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 leading-snug",
                    children: [
                        "TRUSTED BY",
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            className: "text-blue-600 font-extrabold",
                            children: "1,000+"
                        }, void 0, false, {
                            fileName: "[project]/cshr-website-full/components/GoogleReview.js",
                            lineNumber: 68,
                            columnNumber: 11
                        }, this),
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("br", {
                            className: "block sm:hidden"
                        }, void 0, false, {
                            fileName: "[project]/cshr-website-full/components/GoogleReview.js",
                            lineNumber: 69,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            className: "bg-yellow-400 px-2 sm:px-4 py-1 rounded font-extrabold text-gray-900 inline-block mt-2 sm:mt-0",
                            children: [
                                text,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    className: "animate-pulse",
                                    children: "|"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/GoogleReview.js",
                                    lineNumber: 72,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/cshr-website-full/components/GoogleReview.js",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/cshr-website-full/components/GoogleReview.js",
                    lineNumber: 66,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/GoogleReview.js",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "relative w-full h-[40vh] sm:h-[70vh] md:h-[90vh] overflow-hidden bg-gray-100 flex items-center justify-center",
                children: [
                    slides.map((slide, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                            href: slide.link,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: `absolute w-full h-full flex items-center justify-center transition-opacity duration-[1200ms] ease-in-out ${current === i ? "opacity-100 z-10" : "opacity-0 z-0"}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                src: slide.src,
                                alt: slide.alt,
                                className: "w-full h-full object-contain sm:object-cover transition-transform duration-700 hover:scale-105"
                            }, void 0, false, {
                                fileName: "[project]/cshr-website-full/components/GoogleReview.js",
                                lineNumber: 90,
                                columnNumber: 13
                            }, this)
                        }, i, false, {
                            fileName: "[project]/cshr-website-full/components/GoogleReview.js",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3 z-20",
                        children: slides.map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: ()=>setCurrent(i),
                                className: `w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-300 ${current === i ? "bg-blue-600" : "bg-gray-300"}`
                            }, i, false, {
                                fileName: "[project]/cshr-website-full/components/GoogleReview.js",
                                lineNumber: 101,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/cshr-website-full/components/GoogleReview.js",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cshr-website-full/components/GoogleReview.js",
                lineNumber: 78,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cshr-website-full/components/GoogleReview.js",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
}),
"[project]/cshr-website-full/components/StudentsReview.js [ssr] (ecmascript)", ((__turbopack_context__) => {
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
    const [showAllMobile, setShowAllMobile] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false); // 👈 For "See More" toggle in mobile
    const reviews = [
        {
            id: 1,
            name: "Velmurugan Vignesh",
            training: "DATA ANALYTICS",
            review: "I’m truly grateful to Careerschool for providing excellent Data Analytics Training and Placement support. Coming from a non-IT background, I was unsure how to start my career in IT field, but their training and internship program gave me the right guidance and hands-on experience to confidently begin my journey as a Data Analyst. Thanks to their continuous support, I was able to secure a job and build my career in the IT domain. I highly recommend Careerschool to anyone looking for career-oriented Online & Offline Training or internships in Data Analytics or other software programs.",
            photo: "/Velmurugan.png"
        },
        {
            id: 2,
            name: "Pavithra S",
            training: "PYTHON WITH AI",
            review: "I recently completed my Python with AI training at Careerschool, and it was an amazing learning experience. The Offline sessions in Chennai were clear, practical, and easy to understand, which helped me build strong technical knowledge and confidence. With the effective placement support and guidance from the team, I successfully got placed as a Software Trainee. I highly recommend Careerschool HR Solutions to anyone who wants to start a successful career in IT.",
            photo: "/pavi pic.jpeg"
        },
        {
            id: 3,
            name: "Subha Vadivu Lakshmi",
            training: "HR TRAINING",
            review: "I’m delighted to share that I’ve been placed as an HR Recruiter, and I’m truly thankful to Careerschool for this wonderful opportunity. The HR training and internship program helped me gain practical knowledge of key HR functions such as recruitment, college visits, and candidate interviews. It was an unforgettable experience that shaped my confidence and skills. I’m really happy to be moving closer to my dream career at such an early stage.",
            photo: "/Subha Vadivu Lakshmi.png"
        },
        {
            id: 4,
            name: "Rajiya",
            training: "DATA ANALYTICS",
            review: "I’m Rajiya, and I recently completed my IT training in Nellore at Careerschool IT Solutions. Even after a 5-year career gap, I was able to secure a job in an IT company thanks to their excellent training, mentorship, and placement guidance. For students and job seekers in and around Nellore, I highly recommend Careerschool IT Solutions — it’s the best place to upgrade your skills and restart your career in IT.",
            photo: "/Rajiya.png"
        },
        {
            id: 5,
            name: "Malathi",
            training: "DATA ANALYTICS",
            review: "I completed a Data Analytics course from Careerschool HR Solutions. Good experience of training and placement sessions. The whole team gave full support and guidance for interviews. This is a good platform to start your career. Thank you...",
            photo: "/Malathi.png"
        },
        {
            id: 6,
            name: "Ranjith",
            training: "DATA ANALYTICS",
            review: "First of all, special thanks to my great teacher Karthick Sir, my moral supporter Kathiya Ma'am, and my king maker Brindha Ma'am. I have 7+ years of experience in backend operations but lacked updated skills. When I joined Careerschool for Data Analytics, the training completely changed my confidence and career direction. Thanks to Careerschool, I now feel skilled and appreciated in my workplace!",
            photo: "/Ranjith.png"
        },
        {
            id: 7,
            name: "Afsal Ahamed",
            training: "HR TRAINING",
            review: "I am incredibly grateful to Careerschool HR Solutions for the invaluable guidance and support during my HR internship. A special thanks to Brindha Ma'am for her mentorship and encouragement. I’m thrilled to share that I’ve been placed as an HRBP — this achievement wouldn’t have been possible without the Careerschool team.",
            photo: "/Afsal Ahamed.png"
        },
        {
            id: 8,
            name: "Shyam Ganesh Prasad",
            training: "HR TRAINING",
            review: "I joined Careerschool 4 months ago as an HR intern. The staff and mentors were very supportive, especially Keerthana Ma'am, Brintha Ma'am, and Roshini Ma'am. I’m now placed as an HR Recruiter in a reputed company. Thanks to Careerschool HR Solutions!",
            photo: "/Shyam Ganesh Prasad.png"
        },
        {
            id: 9,
            name: "Manav Magesh",
            training: "DATA ANALYTICS",
            review: "I joined Careerschool HR Solutions to pursue Data Analytics, and it completely changed me. The training was excellent — Karthick Sir explains every concept clearly and gives interview tips. Kathya Ma’am encouraged me in both technical and soft skills. Now I’m placed and confident — highly recommended!",
            photo: "/Manav.png"
        },
        {
            id: 10,
            name: "Bhuvaneshwaran",
            training: "DATA ANALYTICS",
            review: "I completed the Data Analytics course at Careerschool. The sessions covered Advanced Excel, SQL, and Power BI with real-time examples. The HR team also provided strong resume and interview guidance.",
            photo: "/Bhuwaneswar.png"
        },
        {
            id: 11,
            name: "Saikumar Mallarapu",
            training: "FRONTEND DEVELOPMENT",
            review: "Hi, I’m Sai Kumar from Nellore. I attended the Careerschool Campus Drive and got selected as a Software Trainee. Great place to learn Python, Java Full Stack, AI, and Data Analytics with placement assistance.",
            photo: "/Saikumar.png"
        },
        {
            id: 12,
            name: "Manoj Kumar",
            training: "CLOUD COMPUTING",
            review: "Good exposure to AWS and cloud fundamentals with live practice sessions and excellent trainer support.",
            photo: "/sarathi pic.jpeg"
        },
        {
            id: 13,
            name: "Priya",
            training: "GRAPHIC DESIGN",
            review: "Covered Photoshop and Illustrator basics perfectly. The practical assignments were very helpful.",
            photo: "/pavi pic.jpeg"
        },
        {
            id: 14,
            name: "Sathish",
            training: "JAVA FULL STACK",
            review: "Java Full Stack sessions were clear and project-oriented. The placement guidance was strong.",
            photo: "/sarathi pic.jpeg"
        },
        {
            id: 15,
            name: "Harini",
            training: "ARTIFICIAL INTELLIGENCE",
            review: "I completed the Data Analytics course at Careerschool HR Solutions. The training mainly covered Advanced Excel, SQL, and Power BI. The teaching was clear and practical.",
            photo: "/pavi pic.jpeg"
        }
    ];
    // ✅ Show only 5 reviews in mobile view unless "See More" is clicked
    const visibleReviews = ("TURBOPACK compile-time value", "undefined") !== "undefined" && window.innerWidth < 640 && !showAllMobile ? "TURBOPACK unreachable" : reviews;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
        className: "py-10 bg-white text-center overflow-hidden px-4 sm:px-6 relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                className: "text-2xl sm:text-2xl md:text-3xl font-bold mb-8 text-[#004AAD]",
                children: "Hear It From Our Learners"
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                lineNumber: 34,
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
                                fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                                lineNumber: 45,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                className: "font-semibold text-[14px] sm:text-[16px] truncate w-full text-center",
                                children: student.name
                            }, void 0, false, {
                                fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                                lineNumber: 50,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "text-[12px] sm:text-[13px] opacity-95 text-yellow-300 font-semibold truncate w-full text-center",
                                children: student.training
                            }, void 0, false, {
                                fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                                lineNumber: 53,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelectedReview(student),
                                className: "mt-2 bg-yellow-400 text-blue-900 font-semibold text-[12px] sm:text-[13px] px-3 py-1 rounded-lg hover:bg-yellow-300 transition",
                                children: "Read Review"
                            }, void 0, false, {
                                fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                                lineNumber: 57,
                                columnNumber: 13
                            }, this)
                        ]
                    }, student.id, true, {
                        fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                        lineNumber: 41,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "mt-6 sm:hidden",
                children: !showAllMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                    onClick: ()=>setShowAllMobile(true),
                    className: "bg-blue-700 text-white font-semibold text-sm px-4 py-2 rounded-lg hover:bg-blue-800 transition",
                    children: "See More"
                }, void 0, false, {
                    fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                    lineNumber: 70,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                    onClick: ()=>setShowAllMobile(false),
                    className: "bg-gray-300 text-gray-800 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-400 transition",
                    children: "See Less"
                }, void 0, false, {
                    fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                    lineNumber: 77,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                lineNumber: 68,
                columnNumber: 7
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
                            fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                            lineNumber: 90,
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
                                    fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                                    lineNumber: 99,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                            className: "font-bold text-base sm:text-lg text-left",
                                            children: selectedReview.name
                                        }, void 0, false, {
                                            fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                                            lineNumber: 105,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            className: "text-sm sm:text-base text-yellow-500 font-semibold text-left",
                                            children: selectedReview.training
                                        }, void 0, false, {
                                            fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                                            lineNumber: 108,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                                    lineNumber: 104,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                            lineNumber: 98,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            className: "text-[13px] sm:text-[15px] leading-relaxed text-justify",
                            children: selectedReview.review
                        }, void 0, false, {
                            fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                            lineNumber: 114,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                    lineNumber: 89,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/StudentsReview.js",
                lineNumber: 88,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cshr-website-full/components/StudentsReview.js",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
}),
"[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("styled-jsx/style.js", () => require("styled-jsx/style.js"));

module.exports = mod;
}),
"[project]/cshr-website-full/components/MeetOurStars.js [ssr] (ecmascript)", ((__turbopack_context__) => {
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
                fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
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
                                    fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
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
                                                    fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                                                    lineNumber: 107,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "jsx-399f1f5880812373" + " " + "text-sm font-semibold text-yellow-400 mt-1",
                                                    children: student.training
                                                }, void 0, false, {
                                                    fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                                                    lineNumber: 108,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
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
                                                    fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                                                    lineNumber: 114,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    className: "jsx-399f1f5880812373" + " " + "bg-yellow-400 text-black font-bold text-xs px-3 py-1 rounded",
                                                    children: student.started
                                                }, void 0, false, {
                                                    fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                                                    lineNumber: 115,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                                            lineNumber: 113,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "jsx-399f1f5880812373" + " " + "flex justify-center my-1",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                src: "/Arrow[1].png",
                                                alt: "Arrow Down",
                                                className: "jsx-399f1f5880812373" + " " + "h-5 w-5 animate-bounce opacity-90"
                                            }, void 0, false, {
                                                fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                                                lineNumber: 121,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
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
                                                    fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                                                    lineNumber: 129,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    className: "jsx-399f1f5880812373" + " " + "bg-yellow-400 text-black font-bold text-xs px-3 py-1 rounded",
                                                    children: student.landed
                                                }, void 0, false, {
                                                    fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                                                    lineNumber: 130,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                                            lineNumber: 128,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                                    lineNumber: 105,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                            lineNumber: 96,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                    lineNumber: 94,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
                id: "399f1f5880812373",
                children: "@keyframes marquee{0%{transform:translate(0)}to{transform:translate(-50%)}}.animate-marquee.jsx-399f1f5880812373{width:max-content;animation:35s linear infinite marquee;display:flex}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cshr-website-full/components/MeetOurStars.js",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}
}),
"[project]/cshr-website-full/components/Courses.js [ssr] (ecmascript)", ((__turbopack_context__) => {
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
    // Auto-slide every 5 seconds (smooth transition)
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const interval = setInterval(()=>{
            setCurrent((prev)=>(prev + 1) % courses.length);
        }, 5000);
        return ()=>clearInterval(interval);
    }, [
        courses.length
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
        id: "courses",
        className: "relative w-full bg-white overflow-hidden scroll-smooth",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "pt-12 pb-6 z-20 relative bg-white text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        className: "text-2xl sm:text-3xl md:text-4xl font-bold text-[#004AAD] mb-3",
                        children: "Next Batch Starts Soon"
                    }, void 0, false, {
                        fileName: "[project]/cshr-website-full/components/Courses.js",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "text-sm sm:text-base text-gray-700 max-w-2xl mx-auto px-4",
                        children: "Industry-ready Training Programs with Internships & Placement Support for Students, Freshers and Working Professionals."
                    }, void 0, false, {
                        fileName: "[project]/cshr-website-full/components/Courses.js",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cshr-website-full/components/Courses.js",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "relative w-full h-[85vh] flex items-center justify-center px-4 sm:px-10 lg:px-24",
                children: [
                    courses.map((course, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: `absolute inset-0 flex justify-center items-center transition-all duration-[1200ms] ease-in-out transform ${current === i ? "opacity-100 translate-x-0 z-10" : "opacity-0 translate-x-10 z-0"}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "w-full h-[75vh] max-w-6xl shadow-2xl flex flex-col overflow-hidden text-white rounded-2xl transition-transform duration-700 ease-in-out",
                                style: {
                                    backgroundColor: "#004AAD"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "flex justify-center items-center w-full h-[50%] bg-white",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                            src: course.poster,
                                            alt: course.title,
                                            className: "max-h-[100%] w-auto object-contain rounded-t-2xl transition-transform duration-700 hover:scale-105"
                                        }, void 0, false, {
                                            fileName: "[project]/cshr-website-full/components/Courses.js",
                                            lineNumber: 73,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/cshr-website-full/components/Courses.js",
                                        lineNumber: 72,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col justify-center items-center h-[50%] p-6 text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                className: "font-bold text-2xl sm:text-3xl md:text-4xl mb-2",
                                                children: course.title
                                            }, void 0, false, {
                                                fileName: "[project]/cshr-website-full/components/Courses.js",
                                                lineNumber: 82,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "text-lg sm:text-xl mb-3",
                                                children: [
                                                    "⏰ ",
                                                    course.duration
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/cshr-website-full/components/Courses.js",
                                                lineNumber: 86,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "text-black font-semibold text-sm sm:text-base px-4 py-2 rounded inline-block mb-4",
                                                style: {
                                                    backgroundColor: "#FFD02B"
                                                },
                                                children: course.highlight
                                            }, void 0, false, {
                                                fileName: "[project]/cshr-website-full/components/Courses.js",
                                                lineNumber: 87,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                href: enrollLink,
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    className: "font-bold px-8 py-3 rounded text-lg sm:text-xl transition hover:scale-[1.05]",
                                                    style: {
                                                        backgroundColor: "#FFFFFF",
                                                        color: "#004AAD",
                                                        borderRadius: "20px"
                                                    },
                                                    children: "ENROLL NOW"
                                                }, void 0, false, {
                                                    fileName: "[project]/cshr-website-full/components/Courses.js",
                                                    lineNumber: 95,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/cshr-website-full/components/Courses.js",
                                                lineNumber: 94,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/cshr-website-full/components/Courses.js",
                                        lineNumber: 81,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/cshr-website-full/components/Courses.js",
                                lineNumber: 67,
                                columnNumber: 13
                            }, this)
                        }, i, false, {
                            fileName: "[project]/cshr-website-full/components/Courses.js",
                            lineNumber: 58,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20",
                        children: courses.map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: ()=>setCurrent(i),
                                className: `w-3 h-3 rounded-full transition-colors duration-300 ${current === i ? "bg-[#004AAD]" : "bg-gray-300"}`
                            }, i, false, {
                                fileName: "[project]/cshr-website-full/components/Courses.js",
                                lineNumber: 114,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/cshr-website-full/components/Courses.js",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cshr-website-full/components/Courses.js",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "mt-10 mb-12 text-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                    href: enrollLink,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        className: "font-extrabold px-6 py-3 rounded text-sm sm:text-base transition hover:scale-[1.05]",
                        style: {
                            backgroundColor: "#004AAD",
                            color: "#FFFFFF",
                            borderRadius: "20px"
                        },
                        children: "Explore More Courses"
                    }, void 0, false, {
                        fileName: "[project]/cshr-website-full/components/Courses.js",
                        lineNumber: 128,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/cshr-website-full/components/Courses.js",
                    lineNumber: 127,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/Courses.js",
                lineNumber: 126,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cshr-website-full/components/Courses.js",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
}),
"[project]/cshr-website-full/components/Alumni.js [ssr] (ecmascript)", ((__turbopack_context__) => {
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
        className: "jsx-3f93a3232f2fb3cb" + " " + "py-12 sm:py-16 text-center bg-blue-900 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                className: "jsx-3f93a3232f2fb3cb" + " " + "text-2xl sm:text-2xl md:text-3xl font-bold mb-8 sm:mb-10 text-white",
                children: "Our Alumni Proudly Placed In"
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/Alumni.js",
                lineNumber: 4,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "jsx-3f93a3232f2fb3cb" + " " + "relative w-full overflow-hidden py-2 sm:py-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "jsx-3f93a3232f2fb3cb" + " " + "flex animate-marquee-left gap-6 sm:gap-10",
                    children: [
                        ...Array(2)
                    ].map((_, copy)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "jsx-3f93a3232f2fb3cb" + " " + "flex gap-6 sm:gap-10 items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Cognizant.png",
                                    alt: "Cognizant",
                                    className: "jsx-3f93a3232f2fb3cb" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 13,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Concentrix.png",
                                    alt: "Concentrix",
                                    className: "jsx-3f93a3232f2fb3cb" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 14,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Foundever.png",
                                    alt: "Foundever",
                                    className: "jsx-3f93a3232f2fb3cb" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 15,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Zoho.png",
                                    alt: "Zoho",
                                    className: "jsx-3f93a3232f2fb3cb" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 16,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Hexaware.png",
                                    alt: "Hexaware",
                                    className: "jsx-3f93a3232f2fb3cb" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 17,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Hcl.png",
                                    alt: "HCL",
                                    className: "jsx-3f93a3232f2fb3cb" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 18,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Ideas 2 IT.png",
                                    alt: "Ideal 2 IT",
                                    className: "jsx-3f93a3232f2fb3cb" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 19,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Hinduja.png",
                                    alt: "Hinduja",
                                    className: "jsx-3f93a3232f2fb3cb" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 20,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Indusind Bank.png",
                                    alt: "Indusind Bank",
                                    className: "jsx-3f93a3232f2fb3cb" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 21,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Tata Consultancy Services.png",
                                    alt: "Tata Consultancy Services",
                                    className: "jsx-3f93a3232f2fb3cb" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 22,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, copy, true, {
                            fileName: "[project]/cshr-website-full/components/Alumni.js",
                            lineNumber: 12,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                    lineNumber: 10,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/Alumni.js",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "jsx-3f93a3232f2fb3cb" + " " + "relative w-full overflow-hidden py-2 sm:py-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "jsx-3f93a3232f2fb3cb" + " " + "flex animate-marquee-right gap-6 sm:gap-10",
                    children: [
                        ...Array(2)
                    ].map((_, copy)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "jsx-3f93a3232f2fb3cb" + " " + "flex gap-6 sm:gap-10 items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/VThink.png",
                                    alt: "VThink",
                                    className: "jsx-3f93a3232f2fb3cb" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 33,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Movate.png",
                                    alt: "Movate",
                                    className: "jsx-3f93a3232f2fb3cb" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 34,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Omega Healthcare.png",
                                    alt: "Omega Healthcare",
                                    className: "jsx-3f93a3232f2fb3cb" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 35,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Quess.png",
                                    alt: "Quess",
                                    className: "jsx-3f93a3232f2fb3cb" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 36,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Advertflair.png",
                                    alt: "Advertflair",
                                    className: "jsx-3f93a3232f2fb3cb" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 37,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Altruist.png",
                                    alt: "Altruist",
                                    className: "jsx-3f93a3232f2fb3cb" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 38,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Ison.png",
                                    alt: "Ison",
                                    className: "jsx-3f93a3232f2fb3cb" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 39,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Teleperformance.png",
                                    alt: "Teleperformance",
                                    className: "jsx-3f93a3232f2fb3cb" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 40,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Tech Mahindra.png",
                                    alt: "Tech Mahindra",
                                    className: "jsx-3f93a3232f2fb3cb" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 41,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Startek.png",
                                    alt: "Startek",
                                    className: "jsx-3f93a3232f2fb3cb" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 42,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, copy, true, {
                            fileName: "[project]/cshr-website-full/components/Alumni.js",
                            lineNumber: 32,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                    lineNumber: 30,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/Alumni.js",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "jsx-3f93a3232f2fb3cb" + " " + "relative w-full overflow-hidden py-2 sm:py-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "jsx-3f93a3232f2fb3cb" + " " + "flex animate-marquee-left gap-6 sm:gap-10",
                    children: [
                        ...Array(2)
                    ].map((_, copy)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "jsx-3f93a3232f2fb3cb" + " " + "flex gap-6 sm:gap-10 items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Datamark.png",
                                    alt: "Datamark",
                                    className: "jsx-3f93a3232f2fb3cb" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 53,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/HDFC Bank.png",
                                    alt: "HDFC",
                                    className: "jsx-3f93a3232f2fb3cb" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 54,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/STAR Health Insurance.png",
                                    alt: "STAR Health Insurance",
                                    className: "jsx-3f93a3232f2fb3cb" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 55,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Sysekam.png",
                                    alt: "Sysekam",
                                    className: "jsx-3f93a3232f2fb3cb" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 56,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Access Healthcare.png",
                                    alt: "Access Healthcare",
                                    className: "jsx-3f93a3232f2fb3cb" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 57,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Emayam Tech.png",
                                    alt: "Emayam Tech",
                                    className: "jsx-3f93a3232f2fb3cb" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 58,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Paisabazaar.png",
                                    alt: "Paisabazaar",
                                    className: "jsx-3f93a3232f2fb3cb" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 59,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Mtutor.png",
                                    alt: "Mtutor",
                                    className: "jsx-3f93a3232f2fb3cb" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 60,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/ICICI Bank.png",
                                    alt: "ICICI Bank",
                                    className: "jsx-3f93a3232f2fb3cb" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 61,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/Client image/Sutherland.png",
                                    alt: "Sutherland",
                                    className: "jsx-3f93a3232f2fb3cb" + " " + "h-12 sm:h-10 md:h-16 object-contain bg-white rounded p-2"
                                }, void 0, false, {
                                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                                    lineNumber: 62,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, copy, true, {
                            fileName: "[project]/cshr-website-full/components/Alumni.js",
                            lineNumber: 52,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/cshr-website-full/components/Alumni.js",
                    lineNumber: 50,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/Alumni.js",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
                id: "3f93a3232f2fb3cb",
                children: "@keyframes marquee-left{0%{transform:translate(0)}to{transform:translate(-50%)}}.animate-marquee-left.jsx-3f93a3232f2fb3cb,.animate-marquee-right.jsx-3f93a3232f2fb3cb{will-change:transform;width:max-content;animation-timing-function:linear;animation-iteration-count:infinite;display:flex}.animate-marquee-left.jsx-3f93a3232f2fb3cb{animation:25s linear infinite marquee-left}.animate-marquee-right.jsx-3f93a3232f2fb3cb{animation:25s linear infinite reverse marquee-left}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cshr-website-full/components/Alumni.js",
        lineNumber: 3,
        columnNumber: 5
    }, this);
}
}),
"[project]/cshr-website-full/components/Discover.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Discover
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
;
function Discover() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
        className: "py-10 sm:py-16 bg-yellow-400 text-center px-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                className: "text-2xl sm:text-2xl md:text-3xl font-boldleading-snug text-gray-900 max-w-3xl mx-auto",
                children: "Discover the Right Training to Boost Your Career"
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/Discover.js",
                lineNumber: 4,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                href: "https://wa.me/7708938866",
                target: "_blank",
                rel: "noopener noreferrer",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                    className: "mt-6 sm:mt-8 bg-blue-600 hover:bg-blue-700 text-white px-5 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition",
                    children: "Get Free Career Guidance"
                }, void 0, false, {
                    fileName: "[project]/cshr-website-full/components/Discover.js",
                    lineNumber: 13,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/Discover.js",
                lineNumber: 8,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cshr-website-full/components/Discover.js",
        lineNumber: 3,
        columnNumber: 5
    }, this);
}
}),
"[project]/cshr-website-full/components/NeedHelp.js [ssr] (ecmascript)", ((__turbopack_context__) => {
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
                fileName: "[project]/cshr-website-full/components/NeedHelp.js",
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
                                        fileName: "[project]/cshr-website-full/components/NeedHelp.js",
                                        lineNumber: 61,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/cshr-website-full/components/NeedHelp.js",
                                lineNumber: 56,
                                columnNumber: 13
                            }, this),
                            openIndex === i && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "bg-white text-gray-800 text-sm sm:text-base px-5 py-4 border-t border-yellow-400",
                                children: faq.a
                            }, void 0, false, {
                                fileName: "[project]/cshr-website-full/components/NeedHelp.js",
                                lineNumber: 68,
                                columnNumber: 15
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/cshr-website-full/components/NeedHelp.js",
                        lineNumber: 51,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/NeedHelp.js",
                lineNumber: 49,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cshr-website-full/components/NeedHelp.js",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
}),
"[project]/cshr-website-full/components/Footer.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/node_modules/react-icons/fa/index.mjs [ssr] (ecmascript)");
"use client";
;
;
function Footer() {
    const courseLink = "https://243742367.hs-sites-na2.com/training-internship-with-certification-launch-your-career-today";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("footer", {
        className: "bg-white text-gray-800 py-12 px-6 sm:px-12",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "text-center sm:text-left",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                className: "font-bold mb-4 text-lg sm:text-xl text-[#004AAD]",
                                children: "TRENDING COURSE"
                            }, void 0, false, {
                                fileName: "[project]/cshr-website-full/components/Footer.js",
                                lineNumber: 20,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                                className: "space-y-2 text-sm sm:text-base",
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
                                            fileName: "[project]/cshr-website-full/components/Footer.js",
                                            lineNumber: 35,
                                            columnNumber: 17
                                        }, this)
                                    }, i, false, {
                                        fileName: "[project]/cshr-website-full/components/Footer.js",
                                        lineNumber: 34,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/cshr-website-full/components/Footer.js",
                                lineNumber: 23,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/cshr-website-full/components/Footer.js",
                        lineNumber: 19,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "text-center sm:text-left",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                className: "font-bold mb-4 text-lg sm:text-xl text-[#004AAD]",
                                children: "RESOURCES"
                            }, void 0, false, {
                                fileName: "[project]/cshr-website-full/components/Footer.js",
                                lineNumber: 50,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                                className: "space-y-2 text-sm sm:text-base",
                                children: [
                                    "Referral Rewards",
                                    "Hire Students",
                                    "Work with us",
                                    "Become a Mobilizer",
                                    "Connect with Training Team"
                                ].map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                            href: courseLink,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "hover:text-[#004AAD]",
                                            children: item
                                        }, void 0, false, {
                                            fileName: "[project]/cshr-website-full/components/Footer.js",
                                            lineNumber: 62,
                                            columnNumber: 17
                                        }, this)
                                    }, i, false, {
                                        fileName: "[project]/cshr-website-full/components/Footer.js",
                                        lineNumber: 61,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/cshr-website-full/components/Footer.js",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/cshr-website-full/components/Footer.js",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "text-center sm:text-left",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                className: "font-bold mb-4 text-lg sm:text-xl text-[#004AAD]",
                                children: "PLACEMENT"
                            }, void 0, false, {
                                fileName: "[project]/cshr-website-full/components/Footer.js",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                                className: "space-y-2 text-sm sm:text-base",
                                children: [
                                    "Success Stories",
                                    "Speak With Campus Team",
                                    "Speak With Placement Team",
                                    "Non-IT Jobs"
                                ].map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                            href: courseLink,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "hover:text-[#004AAD]",
                                            children: item
                                        }, void 0, false, {
                                            fileName: "[project]/cshr-website-full/components/Footer.js",
                                            lineNumber: 88,
                                            columnNumber: 17
                                        }, this)
                                    }, i, false, {
                                        fileName: "[project]/cshr-website-full/components/Footer.js",
                                        lineNumber: 87,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/cshr-website-full/components/Footer.js",
                                lineNumber: 80,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/cshr-website-full/components/Footer.js",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "text-center sm:text-left",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                className: "font-bold mb-4 text-lg sm:text-xl text-[#004AAD]",
                                children: "COMPANY"
                            }, void 0, false, {
                                fileName: "[project]/cshr-website-full/components/Footer.js",
                                lineNumber: 103,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                                className: "space-y-2 text-sm sm:text-base",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                            href: "#",
                                            className: "hover:text-[#004AAD]",
                                            children: "About Us"
                                        }, void 0, false, {
                                            fileName: "[project]/cshr-website-full/components/Footer.js",
                                            lineNumber: 108,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/cshr-website-full/components/Footer.js",
                                        lineNumber: 107,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                            href: "https://wa.me/7708938866",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "hover:text-[#004AAD]",
                                            children: "Contact Us"
                                        }, void 0, false, {
                                            fileName: "[project]/cshr-website-full/components/Footer.js",
                                            lineNumber: 113,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/cshr-website-full/components/Footer.js",
                                        lineNumber: 112,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/cshr-website-full/components/Footer.js",
                                lineNumber: 106,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/cshr-website-full/components/Footer.js",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cshr-website-full/components/Footer.js",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "mt-12 border-t border-gray-300"
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/Footer.js",
                lineNumber: 127,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto mt-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                        className: "text-center font-bold text-2xl text-[#004AAD] mb-8",
                        children: "OUR BRANCHES"
                    }, void 0, false, {
                        fileName: "[project]/cshr-website-full/components/Footer.js",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-xl shadow-md p-6 flex flex-col items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "w-full h-52 mb-4 rounded-lg overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("iframe", {
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
                                            fileName: "[project]/cshr-website-full/components/Footer.js",
                                            lineNumber: 140,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/cshr-website-full/components/Footer.js",
                                        lineNumber: 139,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                        src: "/Footer Logo/CSIT - Footer Logo.png",
                                        alt: "CSIT Logo",
                                        className: "h-14 w-auto mb-3 object-contain"
                                    }, void 0, false, {
                                        fileName: "[project]/cshr-website-full/components/Footer.js",
                                        lineNumber: 152,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-[#004AAD] font-semibold text-lg mb-2 flex items-center justify-center gap-2",
                                        children: [
                                            "📞 ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                children: "CSIT: 77089 38866"
                                            }, void 0, false, {
                                                fileName: "[project]/cshr-website-full/components/Footer.js",
                                                lineNumber: 160,
                                                columnNumber: 18
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/cshr-website-full/components/Footer.js",
                                        lineNumber: 159,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-gray-800 text-center mb-4 font-medium leading-relaxed",
                                        children: [
                                            "📍 ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "font-bold",
                                                children: "Address:"
                                            }, void 0, false, {
                                                fileName: "[project]/cshr-website-full/components/Footer.js",
                                                lineNumber: 165,
                                                columnNumber: 18
                                            }, this),
                                            " Careerschool IT Solutions, Children's Park Road, Opposite to Aditya Degree College, Aditya Nagar, Nellore, Andhra Pradesh 524002"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/cshr-website-full/components/Footer.js",
                                        lineNumber: 164,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "flex justify-center gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                href: "https://www.instagram.com/careerschoolhrsolutions/",
                                                target: "_blank",
                                                rel: "noreferrer",
                                                className: "bg-[#004AAD] w-9 h-9 flex items-center justify-center rounded-full text-white hover:bg-pink-600 transition",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FaInstagram"], {}, void 0, false, {
                                                    fileName: "[project]/cshr-website-full/components/Footer.js",
                                                    lineNumber: 178,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/cshr-website-full/components/Footer.js",
                                                lineNumber: 172,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                href: "https://www.facebook.com/profile.php?id=61578868656121",
                                                target: "_blank",
                                                rel: "noreferrer",
                                                className: "bg-[#004AAD] w-9 h-9 flex items-center justify-center rounded-full text-white hover:bg-blue-800 transition",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FaFacebookF"], {}, void 0, false, {
                                                    fileName: "[project]/cshr-website-full/components/Footer.js",
                                                    lineNumber: 186,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/cshr-website-full/components/Footer.js",
                                                lineNumber: 180,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                href: "https://www.linkedin.com/showcase/careerschool-it-solutions/",
                                                target: "_blank",
                                                rel: "noreferrer",
                                                className: "bg-[#004AAD] w-9 h-9 flex items-center justify-center rounded-full text-white hover:bg-blue-600 transition",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FaLinkedinIn"], {}, void 0, false, {
                                                    fileName: "[project]/cshr-website-full/components/Footer.js",
                                                    lineNumber: 194,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/cshr-website-full/components/Footer.js",
                                                lineNumber: 188,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                href: "https://youtube.com/@careerschoolitsolutionsnellore",
                                                target: "_blank",
                                                rel: "noreferrer",
                                                className: "bg-[#004AAD] w-9 h-9 flex items-center justify-center rounded-full text-white hover:bg-red-500 transition",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FaYoutube"], {}, void 0, false, {
                                                    fileName: "[project]/cshr-website-full/components/Footer.js",
                                                    lineNumber: 202,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/cshr-website-full/components/Footer.js",
                                                lineNumber: 196,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                href: "https://whatsapp.com/channel/0029Va4ufgc17Emp80iBn92I",
                                                target: "_blank",
                                                rel: "noreferrer",
                                                className: "bg-[#004AAD] w-9 h-9 flex items-center justify-center rounded-full text-white hover:bg-green-600 transition",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FaWhatsapp"], {}, void 0, false, {
                                                    fileName: "[project]/cshr-website-full/components/Footer.js",
                                                    lineNumber: 210,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/cshr-website-full/components/Footer.js",
                                                lineNumber: 204,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/cshr-website-full/components/Footer.js",
                                        lineNumber: 171,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/cshr-website-full/components/Footer.js",
                                lineNumber: 137,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-xl shadow-md p-6 flex flex-col items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "w-full h-52 mb-4 rounded-lg overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("iframe", {
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
                                            fileName: "[project]/cshr-website-full/components/Footer.js",
                                            lineNumber: 219,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/cshr-website-full/components/Footer.js",
                                        lineNumber: 218,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                        src: "/Footer Logo/CSHR - Footer Logo.png",
                                        alt: "CSHR Logo",
                                        className: "h-14 w-auto mb-3 object-contain"
                                    }, void 0, false, {
                                        fileName: "[project]/cshr-website-full/components/Footer.js",
                                        lineNumber: 231,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-[#004AAD] font-semibold text-lg mb-2 flex items-center justify-center gap-2",
                                        children: [
                                            "📞 ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                children: "CSHR: 77089 38866"
                                            }, void 0, false, {
                                                fileName: "[project]/cshr-website-full/components/Footer.js",
                                                lineNumber: 239,
                                                columnNumber: 18
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/cshr-website-full/components/Footer.js",
                                        lineNumber: 238,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-gray-800 text-center mb-4 font-medium leading-relaxed",
                                        children: [
                                            "📍 ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "font-bold",
                                                children: "Address:"
                                            }, void 0, false, {
                                                fileName: "[project]/cshr-website-full/components/Footer.js",
                                                lineNumber: 244,
                                                columnNumber: 18
                                            }, this),
                                            " Careerschool HR Solutions, L2, SIDCO Industrial Estate, Guindy, Chennai, Tamil Nadu 600032"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/cshr-website-full/components/Footer.js",
                                        lineNumber: 243,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "flex justify-center gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                href: "https://www.instagram.com/careerschoolhrsolutions/",
                                                target: "_blank",
                                                rel: "noreferrer",
                                                className: "bg-[#004AAD] w-9 h-9 flex items-center justify-center rounded-full text-white hover:bg-pink-600 transition",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FaInstagram"], {}, void 0, false, {
                                                    fileName: "[project]/cshr-website-full/components/Footer.js",
                                                    lineNumber: 257,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/cshr-website-full/components/Footer.js",
                                                lineNumber: 251,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                href: "https://www.facebook.com/careerschoolhrsolutions.homepage/",
                                                target: "_blank",
                                                rel: "noreferrer",
                                                className: "bg-[#004AAD] w-9 h-9 flex items-center justify-center rounded-full text-white hover:bg-blue-800 transition",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FaFacebookF"], {}, void 0, false, {
                                                    fileName: "[project]/cshr-website-full/components/Footer.js",
                                                    lineNumber: 265,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/cshr-website-full/components/Footer.js",
                                                lineNumber: 259,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                href: "https://www.linkedin.com/company/careerschool-hr-solutions/",
                                                target: "_blank",
                                                rel: "noreferrer",
                                                className: "bg-[#004AAD] w-9 h-9 flex items-center justify-center rounded-full text-white hover:bg-blue-600 transition",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FaLinkedinIn"], {}, void 0, false, {
                                                    fileName: "[project]/cshr-website-full/components/Footer.js",
                                                    lineNumber: 273,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/cshr-website-full/components/Footer.js",
                                                lineNumber: 267,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                href: "https://youtube.com/@careerschoolhrsolutions",
                                                target: "_blank",
                                                rel: "noreferrer",
                                                className: "bg-[#004AAD] w-9 h-9 flex items-center justify-center rounded-full text-white hover:bg-red-500 transition",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FaYoutube"], {}, void 0, false, {
                                                    fileName: "[project]/cshr-website-full/components/Footer.js",
                                                    lineNumber: 281,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/cshr-website-full/components/Footer.js",
                                                lineNumber: 275,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                href: "https://whatsapp.com/channel/0029Va4ufgc17Emp80iBn92I",
                                                target: "_blank",
                                                rel: "noreferrer",
                                                className: "bg-[#004AAD] w-9 h-9 flex items-center justify-center rounded-full text-white hover:bg-green-600 transition",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FaWhatsapp"], {}, void 0, false, {
                                                    fileName: "[project]/cshr-website-full/components/Footer.js",
                                                    lineNumber: 289,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/cshr-website-full/components/Footer.js",
                                                lineNumber: 283,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/cshr-website-full/components/Footer.js",
                                        lineNumber: 250,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/cshr-website-full/components/Footer.js",
                                lineNumber: 216,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/cshr-website-full/components/Footer.js",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cshr-website-full/components/Footer.js",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "mt-12 border-t border-gray-300"
            }, void 0, false, {
                fileName: "[project]/cshr-website-full/components/Footer.js",
                lineNumber: 297,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "mt-6 text-center text-gray-600 text-sm",
                children: [
                    "© ",
                    new Date().getFullYear(),
                    " Career School HR Solutions — All Rights Reserved."
                ]
            }, void 0, true, {
                fileName: "[project]/cshr-website-full/components/Footer.js",
                lineNumber: 300,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cshr-website-full/components/Footer.js",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
}),
"[project]/cshr-website-full/pages/index.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$HeroBanner$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/components/HeroBanner.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$Header$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/components/Header.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$FullImage$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/components/FullImage.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$GoogleReview$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/components/GoogleReview.js [ssr] (ecmascript)"); // 👈 must match file name
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$StudentsReview$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/components/StudentsReview.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$MeetOurStars$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/components/MeetOurStars.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$Courses$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/components/Courses.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$Alumni$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/components/Alumni.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$Discover$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/components/Discover.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$NeedHelp$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/components/NeedHelp.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$Footer$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cshr-website-full/components/Footer.js [ssr] (ecmascript)");
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$HeroBanner$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/cshr-website-full/pages/index.js",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$Header$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/cshr-website-full/pages/index.js",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$FullImage$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/cshr-website-full/pages/index.js",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$GoogleReview$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/cshr-website-full/pages/index.js",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$StudentsReview$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/cshr-website-full/pages/index.js",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$MeetOurStars$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/cshr-website-full/pages/index.js",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$Courses$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/cshr-website-full/pages/index.js",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$Alumni$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/cshr-website-full/pages/index.js",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$Discover$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/cshr-website-full/pages/index.js",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$NeedHelp$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/cshr-website-full/pages/index.js",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$cshr$2d$website$2d$full$2f$components$2f$Footer$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/cshr-website-full/pages/index.js",
                lineNumber: 37,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cshr-website-full/pages/index.js",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__925631f8._.js.map