import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { app } from "../firebase";

export default function ReCheckInspector2() {
    const [result, setResult] = useState(""); // pass/reject
    const [sign, setSign] = useState("");
    const [time, setTime] = useState("");
    const navigate = useNavigate();

    const db = getFirestore(app);

    const isFormValid = result && sign.trim() && time;

    // helper สำหรับบันทึกลง firestore
    const saveToFirestore = async (fields) => {
        const model = localStorage.getItem("model");
        const serial = localStorage.getItem("serial");
        const state = localStorage.getItem("state");
        if (!model || !serial || !state) return;
        const docId = `${model}_${serial}_${state}`;
        try {
            await updateDoc(doc(db, "airData", docId), fields);
        } catch (err) {
            // ไม่แจ้งเตือนเพื่อไม่รบกวน UX
        }
    };

    const handleResultChange = async (value) => {
        setResult(value);
        await saveToFirestore({ recheckResult: value });
    };

    const handleSignChange = async (e) => {
        setSign(e.target.value);
        await saveToFirestore({ inspector2: e.target.value });
    };

    const handleTimeChange = async (e) => {
        setTime(e.target.value);
        await saveToFirestore({ recheckTime: e.target.value });
    };

    const handleSubmit = () => {
        if (!isFormValid) {
            alert("กรุณากรอกข้อมูลให้ครบถ้วน");
            return;
        }
        if (result === "pass") {
            navigate("/next");
        } else if (result === "reject") {
            navigate("/reass");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center min-h-screen min-w-full bg-gradient-to-br from-blue-100 via-white to-blue-300">
            <div className="relative z-10 bg-white/90 backdrop-blur-md text-gray-800 shadow-2xl rounded-3xl p-10 w-full max-w-md text-center border border-blue-100 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md text-gray-800 space-y-6">
                    <h1 className="text-2xl font-bold text-blue-600 text-center mb-6">Status : สถานะแอร์</h1>
                    <div className="flex gap-8 justify-center mb-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="result"
                                value="pass"
                                checked={result === "pass"}
                                onChange={() => handleResultChange("pass")}
                                className="accent-green-600 w-5 h-5"
                            />
                            <span>Pass</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="result"
                                value="reject"
                                checked={result === "reject"}
                                onChange={() => handleResultChange("reject")}
                                className="accent-red-600 w-5 h-5"
                            />
                            <span>Reject</span>
                        </label>
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">ลงชื่อผู้ตรวจสอบ</label>
                        <input
                            type="text"
                            value={sign}
                            onChange={handleSignChange}
                            placeholder="ชื่อผู้ตรวจสอบ"
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">เวลาที่ตรวจสอบ</label>
                        <input
                            type="datetime-local"
                            value={time}
                            onChange={handleTimeChange}
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={!isFormValid}
                        className={`w-full bg-blue-600 hover:bg-blue-700 text-gray-700 font-medium py-3 rounded-xl transition ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        ✔ ยืนยัน
                    </button>
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 rounded-xl transition mt-2"
                    >
                        ⬅ ย้อนกลับ
                    </button>
                </div>
            </div>
        </div>
    );
}
