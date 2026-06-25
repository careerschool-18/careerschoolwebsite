import { useState } from "react";
import { useRouter } from "next/router";

export default function LoginForm() {
    const router = useRouter();
    const [role, setRole] = useState("student");
    /*const [subRole, setSubRole] = useState("teacher");*/
    const [selectedPortal, setSelectedPortal] = useState("lms");
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [forgotMessage, setForgotMessage] = useState("");

    const PORTAL_REDIRECTS = {
        lms: "https://lms.placeholder.example.com",
        hrms: "https://hrms.placeholder.example.com",
        "job-portal": "https://jobportal.placeholder.example.com"
    };

    const getRestrictionMessage = (reason) => {
        const mapping = {
            "not paid fee": "Your access has been restricted because your course/registration fees have not been paid. Please clear your dues or contact the admin team.",
            "Inactive": "Your dashboard access has been restricted because your student account is inactive. Please reach out to administration to reactivate your profile.",
            "Course dropped": "Your access has been restricted because your course status is marked as dropped. Contact support if you believe this is an error."
        };
        return mapping[reason] || reason || "Access restricted by the administration. Please contact support.";
    };

    const handleLogin = () => {
        setErrors({});
        const errs = {};

        if (role === "employee") {
            if (!username.trim()) {
                errs.username = "Username is required";
            }
            if (!password) {
                errs.password = "Password is required";
            }
            if (Object.keys(errs).length > 0) {
                setErrors(errs);
                return;
            }
            console.log("Login Clicked", { role, selectedPortal, username, password });
            const redirectUrl = PORTAL_REDIRECTS[selectedPortal];
            console.log("Redirecting employee to:", redirectUrl);
            window.location.href = redirectUrl;
        } else {
            if (!email.trim()) {
                errs.email = "Email is required";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                errs.email = "Please enter a valid email address";
            }
            if (!password) {
                errs.password = "Password is required";
            }
            if (Object.keys(errs).length > 0) {
                setErrors(errs);
                return;
            }

            console.log("Login Clicked", { role, email, password });

            // Check if student is blocked
            const isBlocked = localStorage.getItem("mock_student_isBlocked") === "true";
            if (isBlocked) {
                const blockedReason = localStorage.getItem("mock_student_blockedReason") || "not paid fee";
                setErrors({ global: getRestrictionMessage(blockedReason) });
                return;
            }

            // Redirect to student-dashboard
            router.push("/student-dashboard");
        }
    };

    const handleForgotPassword = () => {
        setForgotMessage("Please contact your Administrator/Mentor");
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4 md:p-10">
            <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl flex flex-col md:flex-row overflow-hidden min-h-[600px]">
                
              {/* LEFT COLUMN: VISUAL PANEL */}
               {/* LEFT COLUMN: VISUAL PANEL */}
                <div 
                    className="hidden md:flex md:w-1/2 p-10 flex-col justify-between text-white relative"
                    style={{
                        backgroundImage: (() => {
                            if (role === "student") return "url('/Loginform images/StudentLogin.webp')";
                            if (role === "employee") return "url('/Loginform images/EmployeeLogin.webp')";
                            // if (role === "employer") return "url('/Loginform images/EmployerLogin.webp')";
                            return "none";
                        })(),
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat"
                    }}
                >
                    <div className="text-4xl font-light opacity-90"></div>
                    <div className="max-w-sm mt-auto">
                        {role === "student" && (
                            <p className="text-sm font-medium opacity-80 mb-2"></p>
                        )}
                        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                           
                        </h1>
                    </div>
                </div>

                {/* RIGHT COLUMN: LOGIN FORM */}
                <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white">
                    <div className="w-full max-w-md mx-auto">
                        <div className="flex flex-col items-center mb-8">
                            <img
                                src="/Loginform images/Student pfp.png"
                                alt="Profile Picture"
                                className="w-24 h-24 rounded-full object-cover shadow-md border-2 border-blue-500"
                            />
                        </div>

                        {errors.global && (
                            <div className="p-3 bg-red-100 text-red-700 rounded-xl text-sm mb-4">
                                {errors.global}
                            </div>
                        )}

                        {/* ROLE SELECTOR PILLS */}
                        <div className="flex bg-gray-100 p-1 rounded-2xl mb-6 border border-gray-200">
                            {["student", "employee"].map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => {
                                        setRole(item);
                                        setErrors({});
                                        setForgotMessage("");
                                    }}
                                    className={`flex-1 py-2 text-xs md:text-sm font-semibold rounded-xl transition-all duration-200 capitalize
                                        ${role === item ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>

                        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                           
                            {role === "employee" ? (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5"></label>
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full border border-gray-300 focus:border-blue-500 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 text-gray-800 font-medium placeholder-gray-400 bg-gray-50/50 text-sm transition"
                                    />
                                    {errors.username && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.username}</p>}
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5"></label>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full border border-gray-300 focus:border-blue-500 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 text-gray-800 font-medium placeholder-gray-400 bg-gray-50/50 text-sm transition"
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.email}</p>}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5"></label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full border border-gray-300 focus:border-blue-500 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 text-gray-800 font-medium placeholder-gray-400 bg-gray-50/50 text-sm transition"
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.password}</p>}
                                <div className="flex justify-between items-center mt-2">
                                    <span 
                                        onClick={handleForgotPassword}
                                        className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                                    >
                                        Forgot Password?
                                    </span>
                                </div>
                                {forgotMessage && (
                                    <p className="text-blue-600 text-xs font-bold mt-1.5">{forgotMessage}</p>
                                )}
                            </div>
                            {role === "employee" ? (
                                <div className="flex gap-2 mt-4 w-full">
                                    {[
                                        { label: "LMS", key: "lms" },
                                        { label: "HRMS", key: "hrms" },
                                        { label: "Job Portal", key: "job-portal" },
                                    ].map(({ label, key }) => (
                                        <button
                                        key={key}
                                        type="button"
                                        onClick={() => {
                                            setSelectedPortal(key);
                                            const redirectUrl = PORTAL_REDIRECTS[key];
                                            console.log(`Redirecting employee to ${label}:`, redirectUrl);
                                            window.location.href = redirectUrl;
                                        }}
                                        className="flex-1 py-3.5 bg-blue-600 text-white rounded-xl 
                                        font-bold text-lg font-sans leading-none 
                                        hover:bg-blue-700 active:bg-blue-800 
                                        hover:scale-[1.02] active:scale-95
                                        transition-all duration-300 ease-in-out
                                        shadow-md shadow-blue-200 hover:shadow-xl hover:shadow-blue-300
                                        flex flex-col items-center justify-center gap-1"
                                    >
                                        <span>{label}</span>
                                    </button>
                                                                        ))}
                                                                    </div>
                                                                ) : (
                                                                <button
                                        type="button"
                                        onClick={handleLogin}
                                        className="w-full py-3.5 mt-4 bg-blue-600 text-white rounded-xl font-bold 
                                        hover:bg-blue-700 hover:scale-[1.02] active:scale-95 
                                        transition-all duration-300 ease-in-out 
                                        shadow-md shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 
                                        text-sm"
                                    >
                                        Get Started
                                    </button>
                            )}
                            
                            {role === "student" && (
                                <p className="mt-4 text-sm text-gray-500 text-center">
                                    Don't have an account?{" "}
                                    <span
                                        onClick={() => router.push("/signup")}
                                        className="font-semibold text-blue-600 cursor-pointer hover:underline"
                                    >
                                        Sign Up
                                    </span>
                                </p>
                            )}
                        </form>

                        
                    </div>
                </div>

            </div>
        </div>
    );
}