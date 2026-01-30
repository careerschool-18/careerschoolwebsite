module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/pages/api/saveStudent.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>handler
]);
(()=>{
    const e = new Error("Cannot find module '../../lib/db'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            message: "Method not allowed"
        });
    }
    try {
        const { name, email, mobile, college, category } = req.body;
        if (!name || !email || !mobile || !college || !category) {
            return res.status(400).json({
                message: "All fields required"
            });
        }
        const [result] = await db.query("INSERT INTO students (name, email, mobile, college, category) VALUES (?, ?, ?, ?, ?)", [
            name,
            email,
            mobile,
            college,
            category
        ]);
        res.status(200).json({
            success: true,
            studentId: result.insertId
        });
    } catch (err) {
        console.error("SAVE STUDENT ERROR FULL:", err); // 🔥 IMPORTANT
        res.status(500).json({
            message: err.message
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4ba479c8._.js.map