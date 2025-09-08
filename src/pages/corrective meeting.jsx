import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { app } from "../firebase";

export default function CorrectiveMeeting() {
    const [meetingDone, setMeetingDone] = useState(false);
    const [needFixAir, setNeedFixAir] = useState(false);
    const [noNeedFixAir, setNoNeedFixAir] = useState(false);

    const navigate = useNavigate();
    const db = getFirestore(app);

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
        let meetingResult = "";
        if (needFixAir) meetingResult = "ต้องแก้ไขแอร์";
        else if (noNeedFixAir) meetingResult = "ไม่ต้องแก้ไขแอร์แล้ว";
        try {
            await updateDoc(doc(db, "airData", docId), {
                meetingDoneStatus: meetingDone ? "จัดประชุมแล้ว" : "",
                meetingResult
            });
            if (needFixAir) {
                navigate("/list");
            } else if (noNeedFixAir) {
                navigate("/reass");
            }
        } catch (err) {
            alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล: " + err.message);
        }
    };

    // ให้ติ๊ก "ต้องแก้ไขแอร์แล้ว" กับ "ไม่ต้องแก้ไขแอร์แล้ว" ได้ทีละอัน
    const handleNeedFixAir = (checked) => {
        setNeedFixAir(checked);
        if (checked) setNoNeedFixAir(false);
    };
    const handleNoNeedFixAir = (checked) => {
        setNoNeedFixAir(checked);
        if (checked) setNeedFixAir(false);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center min-h-screen min-w-full bg-gradient-to-br from-blue-100 via-white to-blue-300">
            <div className="relative z-10 bg-white/90 backdrop-blur-md text-gray-800 shadow-2xl rounded-3xl p-10 w-full max-w-md border border-blue-100 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md text-gray-800 space-y-6">
                    <h2 className="text-2xl font-bold text-center mb-2 text-blue-700">Status : สถานะแอร์</h2>
                    <div className="text-lg text-gray-700 mb-4">แอร์อยู่ระหว่างจัดประชุม</div>
                    <div className="mb-5">
                        <label>
                            <input
                                type="checkbox"
                                checked={meetingDone}
                                onChange={e => setMeetingDone(e.target.checked)}
                            />{" "}
                            จัดประชุมแล้ว
                        </label>
                    </div>
                    <div className="font-medium text-lg mb-2">ผลการจัดประชุม</div>
                    <div className="mb-5">
                        <label>
                            <input
                                type="checkbox"
                                checked={needFixAir}
                                onChange={e => handleNeedFixAir(e.target.checked)}
                            />{" "}
                            ต้องแก้ไขแอร์
                        </label>
                    </div>
                    <div className="mb-8">
                        <label>
                            <input
                                type="checkbox"
                                checked={noNeedFixAir}
                                onChange={e => handleNoNeedFixAir(e.target.checked)}
                            />{" "}
                            ไม่ต้องแก้ไขแอร์แล้ว
                        </label>
                    </div>
                    <div className="flex gap-3">
                        <button
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 rounded-xl transition"
                            onClick={() => navigate(-1)}
                        >
                            ย้อนกลับ
                        </button>
                        <button
                            className={`flex-1 bg-blue-600 hover:bg-blue-700 text-gray-700 font-medium py-2 rounded-xl transition ${(needFixAir || noNeedFixAir) ? "" : "opacity-50 cursor-not-allowed"}`}
                            onClick={handleSave}
                            disabled={!(needFixAir || noNeedFixAir)}
                        >
                            บันทึก
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}