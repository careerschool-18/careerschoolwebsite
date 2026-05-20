import {useState} from "react";
import {useRouter} from "next/router";

export default function LoginForm() {
    const router = useRouter();

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[forgotMessage, setForgotMessage] = useState("");

    

    const handleLogin = () => {
        console.log("Login Clicked");
    };

    const handleForgotPassword = () => {
        setForgotMessage("Feature coming soon");

    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-lg">
                <h2 className="text-xl font-bold text-blue-500 bg-yellow-300 p-5 mb-20 text-center rounded-xl">
                    Welcome to Careerschool
                </h2>

                <input type="email" placeholder="Enter Email Address" value={email} onchange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 p-4 rounded-lg focus:ring-2 focus:ring-blue-500 mb-4"/>

                <input type="password" placeholder="Enter Password" value={password} onchange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 p-4 rounded-lg focus:ring-2 focus:ring-blue-500"/>

                <button type="button" onClick={handleLogin} className="w-full py-4 mt-5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                    Login
                </button>

                
                    <p>New User? {" "}
                        <span onClick={() => router.push("/signup")} className="text-blue-600 font-semibold cursor-pointer hover:underline">
                            Create an Account
                        </span>
                    </p>
                    <p onClick={handleForgotPassword} className="text-blue-600 font-semibold cursor-pointer hover:underline">
                        Forgot Password?
                    </p>

                    {forgotMessage && (
                        <p className="text-red-600 text-sm font-bold mt-2">{forgotMessage}</p>
                    )}
                

            </div>
        </div>
    );
}