self.__BUILD_MANIFEST = {
  "/": [
    "static/chunks/pages/index.js"
  ],
  "/_error": [
    "static/chunks/pages/_error.js"
  ],
  "/online-assessment": [
    "static/chunks/pages/online-assessment.js"
  ],
  "/test/[category]": [
    "static/chunks/pages/test/[category].js"
  ],
  "__rewrites": {
    "afterFiles": [
      {
        "source": "/api/:path*"
      }
    ],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/",
    "/Layout",
    "/Login",
    "/NewYearOffer2026",
    "/_app",
    "/_error",
    "/christmas-offer",
    "/online-assessment",
    "/test/[category]"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()