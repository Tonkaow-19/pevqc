import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { app } from "../firebase";

export default function StatusAirRepair() {
    const [status, setStatus] = useState("wait"); // wait, send, fixed
    const navigate = useNavigate();
    const db = getFirestore(app);

    const handleSend = () => {
        setStatus((prevStatus) => (prevStatus === "send" ? "wait" : "send"));
    };
    const handleFixed = () => {
        setStatus((prevStatus) => (prevStatus === "fixed" ? "wait" : "fixed"));
    };

    const handleSave = async () => {
        // ดึง model, serial, state จาก localStorage
        const model = localStorage.getItem("model");
        const serial = localStorage.getItem("serial");
        const state = localStorage.getItem("state");
        if (!model || !serial || !state) {
            alert("ไม่พบข้อมูลสำหรับบันทึก กรุณาค้นหาข้อมูลใหม่อีกครั้ง");
            return;
        }
        const docId = `${model}_${serial}_${state}`;
        let repairStatus = "";
        if (status === "send") repairStatus = "ส่งแอร์คืนไลน์เพื่อแก้ไขแอร์";
        else if (status === "fixed") repairStatus = "ดำเนินการแก้ไขแล้ว ณ ห้องตรวจสอบ";
        try {
            await updateDoc(doc(db, "airData", docId), {
                repairStatus
            });
            if (status === "send") {
                navigate("/edit2"); // ไปหน้าถัดไป
            } else if (status === "fixed") {
                navigate("/recheck"); // ไปหน้า recheck
            }
        } catch (err) {
            alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล: " + err.message);
        }
    };

    let statusText = "แอร์รอแก้ไข";
    if (status === "send") statusText = "ส่งแอร์คืนไลน์เพื่อแก้ไขแอร์";
    if (status === "fixed") statusText = "ดำเนินการแก้ไขแล้ว ณ ห้องตรวจสอบ";

    return (
        <div className="fixed inset-0 flex items-center justify-center min-h-screen min-w-full bg-gradient-to-br from-blue-100 via-white to-blue-300">
            <div className="relative z-10 bg-white/90 backdrop-blur-md text-gray-800 shadow-2xl rounded-3xl p-10 w-full max-w-md text-center border border-blue-100">
                <h2 className="text-2xl font-bold text-blue-700 mb-6">Status : สถานะแอร์</h2>
                <div className="mb-8 text-lg font-semibold">{statusText}</div>
                <div className="flex flex-col gap-4 mb-8">
                    <button
                        onClick={handleSend}
                        className={`w-full bg-blue-500 hover:bg-blue-700 text-gray-700 font-medium py-3 rounded-xl transition ${status === "send" ? "ring-2 ring-blue-400" : ""
                            }`}
                    >
                        ส่งแอร์คืนไลน์เพื่อแก้ไขแอร์
                    </button>
                    <button
                        onClick={handleFixed}
                        className={`w-full bg-green-500 hover:bg-green-700 text-gray-700 font-medium py-3 rounded-xl transition ${status === "fixed" ? "ring-2 ring-green-400" : ""
                            }`}
                    >
                        ดำเนินการแก้ไขแล้ว ณ ห้องตรวจสอบ
                    </button>
                </div>
                {status !== "wait" && (
                    <button
                        onClick={handleSave}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-gray-700 font-medium py-3 rounded-xl transition"
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
