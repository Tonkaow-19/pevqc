import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { app } from "../firebase";

export default function StatusEdit2() {
    const [received, setReceived] = useState(false);
    const [receiver, setReceiver] = useState("");
    const [receiveTime, setReceiveTime] = useState("");
    const navigate = useNavigate();

    const db = getFirestore(app);

    const isFormValid = received ? receiver.trim() && receiveTime : true;

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

    const handleReceive = async () => {
        setReceived(true);
        await saveToFirestore({ receiveStatus: "รับแอร์คืนจากไลน์แล้ว" });
    };

    const handleReceiverChange = async (e) => {
        setReceiver(e.target.value);
        await saveToFirestore({ receiver: e.target.value });
    };

    const handleReceiveTimeChange = async (e) => {
        setReceiveTime(e.target.value);
        await saveToFirestore({ receiveTime: e.target.value });
    };

    const handleSave = () => {
        if (received && !isFormValid) {
            alert("กรุณากรอกชื่อและเวลารับแอร์คืน");
            return;
        }
        navigate("/listre");
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center min-h-screen min-w-full bg-gradient-to-br from-blue-100 via-white to-blue-300">
            <div className="relative z-10 bg-white/90 backdrop-blur-md text-gray-800 shadow-2xl rounded-3xl p-10 w-full max-w-md text-center border border-blue-100">
                <h2 className="text-2xl font-bold text-blue-700 mb-6">Status : สถานะแอร์</h2>
                <div className="mb-8 text-lg font-semibold">กำลังดำเนินการแก้ไขแอร์ ณ ไลน์</div>
                {!received && (
                    <button
                        onClick={handleReceive}
                        className="w-full bg-blue-500 hover:bg-blue-700 text-gray-700 font-medium py-3 rounded-xl transition mb-6"
                    >
                        รับแอร์คืนจากไลน์แล้ว
                    </button>
                )}
                {received && (
                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="block mb-1 font-medium">ชื่อผู้รับแอร์คืน</label>
                            <input
                                type="text"
                                value={receiver}
                                onChange={handleReceiverChange}
                                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="ชื่อผู้รับ"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">เวลารับแอร์คืน</label>
                            <input
                                type="datetime-local"
                                value={receiveTime}
                                onChange={handleReceiveTimeChange}
                                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    </div>
                )}
                <button
                    onClick={handleSave}
                    disabled={received && !isFormValid}
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-gray-700 font-medium py-3 rounded-xl transition ${(received && !isFormValid) ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    บันทึก
                </button>
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
