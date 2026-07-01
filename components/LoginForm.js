import { useState } from "react";
import { useRouter } from "next/router";

export default function LoginForm() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [forgotMessage, setForgotMessage] = useState("");

    const handleLogin = () => {
        console.log("Login Clicked");
    };

    const handleForgotPassword = () => {
        setForgotMessage("Feature coming soon");
    };

    return (
        <div
            className="min-h-screen flex justify-center items-center"
            style={{
                backgroundImage: "url('/Nellore Python/nellorepython.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Frosted glass container */}
            <div
                className="w-full max-w-md px-10 py-12 rounded-2xl"
                style={{
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    backgroundColor: "rgba(255, 255, 255, 0.45)",
                    border: "1px solid rgba(255, 255, 255, 0.35)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                }}
            >
                <h2 className="text-xl font-bold text-white bg-blue-600 p-5 mb-10 text-center rounded-xl">
                    Welcome to Careerschool
                </h2>

                <input
                    type="email"
                    placeholder="Enter Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-none border-opacity-50 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-100 mb-4 placeholder-blue-700 text-blue-700 font-semibold"
                    style={{ backgroundColor: "rgb(249, 241, 15)" }}
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-none border-opacity-50 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-100 mb-4 placeholder-blue-700 text-blue-700 font-semibold"
                    style={{ backgroundColor: "rgb(249, 241, 15)" }}
                />

                <button
                    type="button"
                    onClick={handleLogin}
                    className="w-full py-4 mt-5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                >
                    Login
                </button>

                <p className="mt-10 text-sm text-white">
                    New User?{" "}
                    <span
                        onClick={() => router.push("/signup")}
                        className="font-semibold cursor-pointer underline hover:text-yellow-300"
                    >
                        Create an Account
                    </span>
                </p>

                <p
                    onClick={handleForgotPassword}
                    className="mt-4 text-sm text-white font-semibold cursor-pointer underline hover:text-yellow-300"
                >
                    Forgot Password?
                </p>

                {forgotMessage && (
                    <p className="text-yellow-300 text-sm font-bold mt-2">{forgotMessage}</p>
                )}

            </div>
        </div>
    );
}