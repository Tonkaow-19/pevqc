import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 flex items-center justify-center min-h-screen min-w-full bg-gradient-to-br from-blue-100 via-white to-blue-300">
            <div className="relative z-10 bg-white/90 backdrop-blur-md text-gray-800 shadow-2xl rounded-3xl p-10 w-full max-w-md text-center border border-blue-100 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                {/* โลโก้/ไอคอน */}
                <div className="flex justify-center mb-6">
                    <svg className="w-12 h-12 text-blue-400 drop-shadow animate-spin-slow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12h18M4 6h16M4 18h16M9 6c0-1.5 2-1.5 2 0s-2 1.5-2 0zm0 6c0-1.5 2-1.5 2 0s-2 1.5-2 0zm0 6c0-1.5 2-1.5 2 0s-2 1.5-2 0z" />
                    </svg>
                </div>

                <h1 className="text-3xl font-extrabold mb-2 text-blue-700 drop-shadow">Web application for auditor</h1>
                <p className="mb-8 text-gray-500 text-base">ระบบช่วยงานตรวจสอบสถานะของผลิตภัณฑ์</p>

                <div className="mb-4">
                    <button onClick={() => navigate('/next')}
                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-6 py-3 rounded-2xl w-full transition shadow-lg font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                        B-Kansa
                    </button>
                    <span className="block text-xs text-gray-400 mt-1">ตรวจสอบบัญชีแบบ B-Kansa</span>
                </div>

                <div>
                    <button onClick={() => alert('Not yet available')}
                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 text-white px-6 py-3 rounded-2xl w-full transition shadow-lg font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-60"
                        disabled
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728" /></svg>
                        A-Kansa
                    </button>
                    <span className="block text-xs text-gray-400 mt-1">(เร็วๆ นี้) ตรวจสอบ A-Kansa</span>
                </div>

                {/* Footer */}
                <div className="mt-8 text-xs text-gray-300">© 2025 Auditor App. Powered by React & Vite.</div>
            </div>
        </div>
    )
}
