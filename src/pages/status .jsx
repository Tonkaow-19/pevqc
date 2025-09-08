import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StatusAirRepair() {
    const [status, setStatus] = useState("wait"); // wait, send, fixed
    const navigate = useNavigate();

    const handleSend = () => setStatus("send");
    const handleFixed = () => setStatus("fixed");

    const handleSave = () => {
        if (status === "send") {
            navigate("/next"); // ไปหน้าถัดไป
        } else if (status === "fixed") {
            navigate("/recheck"); // ไปหน้า recheck
        }
    };

    let statusText = "รอส่งแอร์แก้ไข";
    if (status === "send") statusText = "ส่งแอร์คืนไลน์เพื่อแก้ไขแอร์";
    if (status === "fixed") statusText = "แก้ไขแอร์แล้วที่ห้องตรวจสอบ";

    return (
        <div className="fixed inset-0 flex items-center justify-center min-h-screen min-w-full bg-gradient-to-br from-blue-100 via-white to-blue-300">
            <div className="relative z-10 bg-white/90 backdrop-blur-md text-gray-800 shadow-2xl rounded-3xl p-10 w-full max-w-md text-center border border-blue-100">
                <h2 className="text-2xl font-bold text-blue-700 mb-6">สถานะแก้ไขแอร์</h2>
                <div className="mb-8 text-lg font-semibold">{statusText}</div>
                {status === "wait" && (
                    <div className="flex flex-col gap-4 mb-8">
                        <button
                            onClick={handleSend}
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition"
                        >
                            ส่งแอร์คืนไลน์เพื่อแก้ไขแอร์
                        </button>
                        <button
                            onClick={handleFixed}
                            className="w-full bg-green-500 hover:bg-green-700 text-white font-medium py-3 rounded-xl transition"
                        >
                            แก้ไขแอร์แล้วที่ห้องตรวจสอบ
                        </button>
                    </div>
                )}
                {status !== "wait" && (
                    <button
                        onClick={handleSave}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition"
                    >
                        บันทึก
                    </button>
                )}
                <button
                    onClick={() => navigate(-1)}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 rounded-xl transition mt-4"
                >
                    ⬅ ย้อนกลับ
                </button>
            </div>
        </div>
    );
}
