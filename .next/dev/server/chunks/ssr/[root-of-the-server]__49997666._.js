module.exports = [
"[project]/pages/test/pythonQuestions.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "pythonQuestions",
    ()=>pythonQuestions
]);
const pythonQuestions = [
    {
        id: 1,
        question: "Which Python data type is ordered and immutable?",
        options: [
            "list",
            "dict",
            "tuple",
            "set"
        ],
        correct: "tuple"
    },
    {
        id: 2,
        question: "What will be the output of print(2 ** 3 ** 2)?",
        options: [
            "64",
            "512",
            "16",
            "8"
        ],
        correct: "512"
    },
    {
        id: 3,
        question: "Which of these creates a dictionary?",
        options: [
            "{1, 2, 3}",
            "[1, 2, 3]",
            "(1, 2, 3)",
            "{'a': 1, 'b': 2}"
        ],
        correct: "{'a': 1, 'b': 2}"
    },
    {
        id: 4,
        question: "What does the pass statement do?",
        options: [
            "Skips to next iteration",
            "Exits the loop",
            "Does nothing (placeholder)",
            "Raises NotImplementedError"
        ],
        correct: "Does nothing (placeholder)"
    },
    {
        id: 5,
        question: "Which module provides support for mathematical functions?",
        options: [
            "math",
            "random",
            "statistics",
            "datetime"
        ],
        correct: "math"
    },
    {
        id: 6,
        question: 'What is the output of print("Hello" + 3)?',
        options: [
            "Hello3",
            "HelloHelloHello",
            "Error",
            "None"
        ],
        correct: "Error"
    },
    {
        id: 7,
        question: "Which is used to handle exceptions?",
        options: [
            "try/except",
            "catch/throw",
            "Both a and b",
            "error/handle"
        ],
        correct: "try/except"
    },
    {
        id: 8,
        question: "What does range(1, 10, 2) generate?",
        options: [
            "[1, 3, 5, 7, 9]",
            "[1, 2, 3, 4, 5, 6, 7, 8, 9]",
            "[2, 4, 6, 8, 10]",
            "[2, 4, 6, 8]"
        ],
        correct: "[1, 3, 5, 7, 9]"
    },
    {
        id: 9,
        question: "What is the purpose of yield keyword?",
        options: [
            "Returns value from function",
            "Creates generator function",
            "Both a and b",
            "Stops iteration"
        ],
        correct: "Creates generator function"
    },
    {
        id: 10,
        question: "Which decorator is used for class methods?",
        options: [
            "@staticmethod",
            "@classmethod",
            "@property",
            "@setter"
        ],
        correct: "@classmethod"
    },
    {
        id: 11,
        question: "What does sys.argv contain?",
        options: [
            "Command line arguments",
            "Environment variables",
            "Python path",
            "Python shell"
        ],
        correct: "Command line arguments"
    },
    {
        id: 12,
        question: "Which is not a valid string method?",
        options: [
            "split()",
            "join()",
            "merge()",
            "strip()"
        ],
        correct: "merge()"
    },
    {
        id: 13,
        question: "What is __str__ method used for?",
        options: [
            "String representation of object",
            "Object initialization",
            "Object deletion",
            "Memory allocation"
        ],
        correct: "String representation of object"
    },
    {
        id: 14,
        question: "Which collection removes duplicates?",
        options: [
            "list",
            "tuple",
            "dict",
            "set"
        ],
        correct: "set"
    },
    {
        id: 15,
        question: "What does zip() function do?",
        options: [
            "Compresses files",
            "Combines multiple iterables",
            "Creates backup",
            "Restores backup"
        ],
        correct: "Combines multiple iterables"
    },
    {
        id: 16,
        question: "Which is true about Python?",
        options: [
            "Dynamically typed",
            "Statically typed",
            "Compiled language",
            "Low-level language"
        ],
        correct: "Dynamically typed"
    },
    {
        id: 17,
        question: "What is a lambda function?",
        options: [
            "Anonymous function",
            "Named function",
            "Generator function",
            "Coroutine function"
        ],
        correct: "Anonymous function"
    },
    {
        id: 18,
        question: "Which imports all from a module?",
        options: [
            "import module",
            "import module as alias",
            "import * from module",
            "from module import *"
        ],
        correct: "from module import *"
    },
    {
        id: 19,
        question: "What does frozenset() create?",
        options: [
            "Mutable set",
            "Immutable set",
            "Frozen list",
            "Immutable tuple"
        ],
        correct: "Immutable set"
    },
    {
        id: 20,
        question: "Which operator checks identity?",
        options: [
            "==",
            "is",
            "in",
            "not in"
        ],
        correct: "is"
    },
    {
        id: 21,
        question: "Which is used for file reading?",
        options: [
            "open('file.txt', 'r')",
            "open('file.txt', 'w')",
            "open('file.txt', 'a')",
            "read('file.txt')"
        ],
        correct: "open('file.txt', 'r')"
    },
    {
        id: 22,
        question: "What is pickle used for?",
        options: [
            "Object serialization",
            "File compression",
            "Data encryption",
            "Data hashing"
        ],
        correct: "Object serialization"
    },
    {
        id: 23,
        question: "Which creates a virtual environment?",
        options: [
            "venv",
            "virtualenv",
            "pipenv",
            "All of the above"
        ],
        correct: "All of the above"
    },
    {
        id: 24,
        question: "What does globals() return?",
        options: [
            "Local variables",
            "Global variables",
            "Built-in functions",
            "Modules"
        ],
        correct: "Global variables"
    },
    {
        id: 25,
        question: "What does @property decorator do?",
        options: [
            "Creates getter method",
            "Creates setter method",
            "Creates deleter method",
            "All of the above"
        ],
        correct: "All of the above"
    },
    {
        id: 26,
        question: "Which is true about Python's GIL?",
        options: [
            "Global Interpreter Lock",
            "Allows multiple threads",
            "Prevents true parallelism",
            "Both a and c"
        ],
        correct: "Both a and c"
    },
    {
        id: 27,
        question: "What is the MRO in Python?",
        options: [
            "Method Resolution Order",
            "Multiple Return Option",
            "Method Reference Object",
            "Function Reference Object"
        ],
        correct: "Method Resolution Order"
    },
    {
        id: 28,
        question: "Which is used for asynchronous programming?",
        options: [
            "async/await",
            "yield from",
            "threading",
            "multiprocessing"
        ],
        correct: "async/await"
    },
    {
        id: 29,
        question: "What does collections.namedtuple provide?",
        options: [
            "Tuple with named fields",
            "Named dictionary",
            "Named list",
            "Deque"
        ],
        correct: "Tuple with named fields"
    },
    {
        id: 30,
        question: "Which is a context manager?",
        options: [
            "with statement",
            "try statement",
            "if statement",
            "switch statement"
        ],
        correct: "with statement"
    },
    {
        id: 31,
        question: "What is __name__ attribute?",
        options: [
            "Module name",
            "Class name",
            "Function name",
            "All of the above"
        ],
        correct: "All of the above"
    },
    {
        id: 32,
        question: "Which is used for type hints?",
        options: [
            "typing module",
            "type()",
            "isinstance()",
            "cast()"
        ],
        correct: "typing module"
    },
    {
        id: 33,
        question: "What does itertools module provide?",
        options: [
            "Iterators for efficient looping",
            "Mathematical functions",
            "Statistical functions",
            "String functions"
        ],
        correct: "Iterators for efficient looping"
    },
    {
        id: 34,
        question: "Which creates a shallow copy?",
        options: [
            "copy.copy()",
            "copy.deepcopy()",
            "clone()",
            "assign()"
        ],
        correct: "copy.copy()"
    },
    {
        id: 35,
        question: "What is the Walrus operator?",
        options: [
            ":=",
            "==",
            "=",
            "!="
        ],
        correct: ":="
    },
    {
        id: 36,
        question: "Which is used for testing?",
        options: [
            "unittest",
            "pytest",
            "doctest",
            "All of the above"
        ],
        correct: "All of the above"
    },
    {
        id: 37,
        question: "What does __slots__ do?",
        options: [
            "Prevents dynamic attribute creation",
            "Improves memory usage",
            "Restricts attributes",
            "Both a and b"
        ],
        correct: "Both a and b"
    },
    {
        id: 38,
        question: "Which is a metaclass?",
        options: [
            "type",
            "object",
            "class",
            "meta"
        ],
        correct: "type"
    },
    {
        id: 39,
        question: "What does __call__ method do?",
        options: [
            "Makes object callable",
            "Calls function",
            "Invokes constructor",
            "Initializes object"
        ],
        correct: "Makes object callable"
    },
    {
        id: 40,
        question: "Which is used for data classes?",
        options: [
            "@dataclass",
            "dataclasses module",
            "collections module",
            "Both a and b"
        ],
        correct: "Both a and b"
    },
    {
        id: 41,
        question: "Which HTML5 element defines navigation links?",
        options: [
            "<nav>",
            "<navigation>",
            "<links>",
            "<iframe>"
        ],
        correct: "<nav>"
    },
    {
        id: 42,
        question: "What does the required attribute do?",
        options: [
            "Makes input mandatory",
            "Sets default value",
            "Validates input",
            "Sanitizes form"
        ],
        correct: "Makes input mandatory"
    },
    {
        id: 43,
        question: "Which creates a dropdown list?",
        options: [
            "<input type='dropdown'>",
            "<select>",
            "<dropdown>",
            "<list>"
        ],
        correct: "<select>"
    },
    {
        id: 44,
        question: "What is the purpose of <meta charset='UTF-8'>?",
        options: [
            "Sets character encoding",
            "Defines metadata",
            "Sets viewport",
            "Loads script"
        ],
        correct: "Sets character encoding"
    },
    {
        id: 45,
        question: "Which tag defines a footer?",
        options: [
            "<footer>",
            "<bottom>",
            "<end>",
            "<section>"
        ],
        correct: "<footer>"
    },
    {
        id: 46,
        question: "What does defer attribute do in script tag?",
        options: [
            "Delays script execution",
            "Executes after HTML parsing",
            "Executes immediately",
            "Blocks rendering"
        ],
        correct: "Executes after HTML parsing"
    },
    {
        id: 47,
        question: "Which creates a text input field?",
        options: [
            "<input type='text'>",
            "<textfield>",
            "<textarea>",
            "<text>"
        ],
        correct: "<input type='text'>"
    },
    {
        id: 48,
        question: "What is the purpose of ARIA attributes?",
        options: [
            "Accessibility for screen readers",
            "Animation effects",
            "Responsive design",
            "Transforms elements"
        ],
        correct: "Accessibility for screen readers"
    },
    {
        id: 49,
        question: "Which tag defines a section?",
        options: [
            "<section>",
            "<div>",
            "<article>",
            "<strong>"
        ],
        correct: "<section>"
    },
    {
        id: 50,
        question: "Which tag defines an article?",
        options: [
            "<article>",
            "<section>",
            "<div>",
            "<span>"
        ],
        correct: "<article>"
    },
    {
        id: 51,
        question: "What does async attribute do?",
        options: [
            "Loads script asynchronously",
            "Delays execution",
            "Blocks parsing",
            "Supports CORS"
        ],
        correct: "Loads script asynchronously"
    },
    {
        id: 52,
        question: "Which is a valid HTML5 doctype?",
        options: [
            "<!DOCTYPE html>",
            "<!DOCTYPE HTML5>",
            "<!DOCTYPE html5>",
            "<figcaption>"
        ],
        correct: "<!DOCTYPE html>"
    },
    {
        id: 53,
        question: "What does <datalist> element provide?",
        options: [
            "Predefined options for input",
            "Data table",
            "List of links",
            "Local storage"
        ],
        correct: "Predefined options for input"
    },
    {
        id: 54,
        question: "Which creates a progress bar?",
        options: [
            "<progress>",
            "<meter>",
            "<bar>",
            "<input type='time'>"
        ],
        correct: "<progress>"
    },
    {
        id: 55,
        question: "What is <canvas> used for?",
        options: [
            "Drawing graphics via JavaScript",
            "Displaying images",
            "Creating animations",
            "All of the above"
        ],
        correct: "All of the above"
    },
    {
        id: 56,
        question: "Which tag defines important text?",
        options: [
            "<strong>",
            "<b>",
            "<em>",
            "<video>"
        ],
        correct: "<strong>"
    },
    {
        id: 57,
        question: "What does sandbox attribute do in iframe?",
        options: [
            "Restricts iframe capabilities",
            "Allows all features",
            "Enables cross-origin",
            "Flexible box layout"
        ],
        correct: "Restricts iframe capabilities"
    },
    {
        id: 58,
        question: "Which is a semantic HTML element?",
        options: [
            "<main>",
            "<aside>",
            "<figure>",
            "querySelector()"
        ],
        correct: "<main>"
    },
    {
        id: 59,
        question: "What is web storage?",
        options: [
            "localStorage",
            "sessionStorage",
            "Cookies",
            "Both a and b"
        ],
        correct: "Both a and b"
    },
    {
        id: 60,
        question: "Which creates a date picker?",
        options: [
            "<input type='date'>",
            "<input type='calendar'>",
            "<input type='datetime'>",
            "<section>"
        ],
        correct: "<input type='date'>"
    },
    {
        id: 61,
        question: "What does manifest attribute do?",
        options: [
            "Defines web app manifest",
            "Caches files for offline",
            "Loads manifest file",
            "Deferred script"
        ],
        correct: "Defines web app manifest"
    },
    {
        id: 62,
        question: "Which is used for video?",
        options: [
            "<video>",
            "<media>",
            "<movie>",
            "<input type='color'>"
        ],
        correct: "<video>"
    },
    {
        id: 63,
        question: "What is a viewport meta tag?",
        options: [
            "<meta name='viewport'>",
            "Controls mobile display",
            "Sets responsive design",
            "All of the above"
        ],
        correct: "All of the above"
    },
    {
        id: 64,
        question: "Which creates a search field?",
        options: [
            "<input type='search'>",
            "<search>",
            "<find>",
            "<div>"
        ],
        correct: "<input type='search'>"
    },
    {
        id: 65,
        question: "What does preload do?",
        options: [
            "Loads resources early",
            "Prefetches content",
            "Both a and b",
            "Vector images"
        ],
        correct: "Loads resources early"
    },
    {
        id: 66,
        question: "Which is a block-level element?",
        options: [
            "<div>",
            "<span>",
            "<a>",
            "text-align"
        ],
        correct: "<div>"
    },
    {
        id: 67,
        question: "What is the purpose of <noscript>?",
        options: [
            "Content for non-JS browsers",
            "Alternative script",
            "Hides element",
            "Fallback CSS"
        ],
        correct: "Content for non-JS browsers"
    },
    {
        id: 68,
        question: "Which creates a color picker?",
        options: [
            "<input type='color'>",
            "<colorpicker>",
            "<input type='picker'>",
            "Sass"
        ],
        correct: "<input type='color'>"
    },
    {
        id: 69,
        question: "What does download attribute do?",
        options: [
            "Makes link download file",
            "Downloads automatically",
            "Forces save dialog",
            "None of the above"
        ],
        correct: "Makes link download file"
    },
    {
        id: 70,
        question: "Which is an inline element?",
        options: [
            "<span>",
            "<div>",
            "<p>",
            "bg-color"
        ],
        correct: "<span>"
    },
    {
        id: 71,
        question: "What is SVG?",
        options: [
            "Scalable Vector Graphics",
            "XML-based vector images",
            "Both a and b",
            "Fixed graphics"
        ],
        correct: "Both a and b"
    },
    {
        id: 72,
        question: "Which property controls text alignment?",
        options: [
            "text-align",
            "align-text",
            "text-justify",
            "@function"
        ],
        correct: "text-align"
    },
    {
        id: 73,
        question: "What does display: none; do?",
        options: [
            "Hides element completely",
            "Makes invisible but takes space",
            "Collapses element",
            "flex-direction"
        ],
        correct: "Hides element completely"
    },
    {
        id: 74,
        question: "Which is a CSS preprocessor?",
        options: [
            "Sass",
            "Less",
            "Stylus",
            "All of the above"
        ],
        correct: "All of the above"
    },
    {
        id: 75,
        question: "What is the CSS specificity hierarchy?",
        options: [
            "Inline > ID > Class > Element",
            "ID > Class > Element > Inline",
            "Element > Class > ID > Inline",
            "None of the above"
        ],
        correct: "Inline > ID > Class > Element"
    },
    {
        id: 76,
        question: "Which creates a gradient background?",
        options: [
            "background: linear-gradient();",
            "gradient: linear();",
            "bg-gradient: linear",
            "None of the above"
        ],
        correct: "background: linear-gradient();"
    },
    {
        id: 77,
        question: "What does position: sticky; do?",
        options: [
            "Sticks to viewport when scrolling",
            "Fixed positioning",
            "Relative until threshold",
            "Both a and c"
        ],
        correct: "Both a and c"
    },
    {
        id: 78,
        question: "Which is a CSS custom property?",
        options: [
            "--variable-name",
            "var-name",
            "@variable",
            "box-shadow"
        ],
        correct: "--variable-name"
    },
    {
        id: 79,
        question: "What is flex-direction?",
        options: [
            "Controls flex item direction",
            "row, column, row-reverse, column-reverse",
            "Both a and b",
            "Clear property"
        ],
        correct: "Both a and b"
    },
    {
        id: 80,
        question: "Which creates animation?",
        options: [
            "@keyframes",
            "animation property",
            "Both a and b",
            "grid-template"
        ],
        correct: "Both a and b"
    }
];
}),
"[project]/pages/test/python.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PythonTest
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$test$2f$pythonQuestions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/pages/test/pythonQuestions.js [ssr] (ecmascript)");
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
            ...__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$test$2f$pythonQuestions$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["pythonQuestions"]
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

//# sourceMappingURL=%5Broot-of-the-server%5D__49997666._.js.map