import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { app } from "../firebase";

export default function StatusProblem() {
    const [meeting, setMeeting] = useState(false);
    const [meetingDate, setMeetingDate] = useState("");
    const [meetingTime, setMeetingTime] = useState("");
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
        try {
            await updateDoc(doc(db, "airData", docId), {
                meeting,
                meetingDate: meeting ? meetingDate : "",
                meetingTime: meeting ? meetingTime : "",
                meetingStatus: meeting ? "นัดประชุมแล้ว" : ""
            });
            navigate("/corrective");
        } catch (err) {
            alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล: " + err.message);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center min-h-screen min-w-full bg-gradient-to-br from-blue-100 via-white to-blue-300">
            <div className="relative z-10 bg-white/90 backdrop-blur-md text-gray-800 shadow-2xl rounded-3xl p-10 w-full max-w-md border border-blue-100 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md text-gray-800 space-y-6">
                    <h1 className="text-2xl font-bold text-blue-600 text-center mb-2">Status : สถานะแอร์</h1>
                    <div className="text-lg text-gray-700 mb-4">แอร์รอจัดประชุม</div>
                    <div className="mb-5">
                        <label>
                            <input
                                type="checkbox"
                                checked={meeting}
                                onChange={e => setMeeting(e.target.checked)}
                            />{" "}
                            นัดประชุมแล้ว
                        </label>
                        {meeting && (
                            <div className="mt-2">
                                <input
                                    type="date"
                                    value={meetingDate}
                                    onChange={e => setMeetingDate(e.target.value)}
                                    className="mr-2"
                                />
                                <input
                                    type="time"
                                    value={meetingTime}
                                    onChange={e => setMeetingTime(e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex gap-3">
                        <button
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 rounded-xl transition"
                            onClick={() => navigate(-1)}
                        >
                            ย้อนกลับ
                        </button>
                        <button
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-gray-700 font-medium py-2 rounded-xl transition"
                            onClick={handleSave}
                        >
                            บันทึก
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}