import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === "" || password === "") {
            setError("กรุณากรอกข้อมูลให้ครบถ้วน");
        } else if (username !== "PEVB" || password !== "1150") {
            setError("Username หรือ Password ไม่ถูกต้อง");
        } else {
            setError("");
            alert("เข้าสู่ระบบสำเร็จ");
            navigate("/");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center min-h-screen min-w-full bg-gradient-to-br from-blue-100 via-white to-blue-300">
            <div className="relative z-10 bg-white/90 backdrop-blur-md text-gray-800 shadow-2xl rounded-3xl p-10 w-full max-w-md text-center border border-blue-100 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <h2 className="text-2xl font-bold mb-6 text-blue-700">เข้าสู่ระบบ</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-6 py-3 rounded-2xl w-full transition shadow-lg font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        เข้าสู่ระบบ
                    </button>
                </form>
                <div className="mt-8 text-xs text-gray-300">© 2025 Auditor App. Powered by React & Vite.</div>
            </div>
        </div>
    );
}

