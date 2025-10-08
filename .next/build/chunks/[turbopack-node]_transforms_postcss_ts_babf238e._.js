module.exports = [
"[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/cshr-website-full/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "chunks/3635d_2e79f7b1._.js",
  "chunks/[root-of-the-server]__6aa6748d._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/cshr-website-full/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript)");
    });
});
}),
];