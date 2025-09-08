import React from "react";
import { useNavigate } from "react-router-dom";
// ใช้ Firestore จาก firebase.js
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "../../../my-app/src/firebase"; // import app จาก firebase.js

const db = getFirestore(app);

export default function Add() {
    const navigate = useNavigate();
    const [model, setModel] = React.useState("");
    const [serial, setSerial] = React.useState("");
    const [state, setState] = React.useState("");
    const [auditor, setAuditor] = React.useState(""); // เพิ่ม state auditor

    const isFormValid = model.trim() && serial.trim() && state.trim() && auditor.trim();

    const handleSubmit = async () => {
        if (!isFormValid) {
            alert("กรุณากรอกข้อมูลให้ครบถ้วน");
            return;
        }
        const docName = `${model}_${serial}_${state}`;
        try {
            await setDoc(doc(db, "airData", docName), {
                model,
                serial,
                auditor,
                state,
                createdAt: new Date().toISOString()
            });
            // เพิ่มบันทึกลง localStorage
            localStorage.setItem("model", model);
            localStorage.setItem("serial", serial);
            localStorage.setItem("state", state);

            alert(
                "บันทึกข้อมูลสำเร็จ!\n" +
                "Model: " + model +
                "\nSerial: " + serial +
                "\nAuditor: " + auditor +
                "\nState: " + state
            );
            navigate("/next");
        } catch (err) {
            alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล: " + err.message);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center min-h-screen min-w-full bg-gradient-to-br from-blue-100 via-white to-blue-300">
            <div className="relative z-10 bg-white/90 backdrop-blur-md text-gray-800 shadow-2xl rounded-3xl p-10 w-full max-w-md text-center border border-blue-100 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                {/* < กล่องฟอร์ม --> */}
                <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md text-gray-800 space-y-6">

                    {/* <!-- หัวข้อ --> */}
                    <h1 className="text-2xl font-bold text-green-600 text-center">เพิ่มข้อมูลใหม่</h1>

                    {/* <!-- Input: Model Name --> */}
                    <div>
                        <label className="block mb-1 font-medium">ชื่อรุ่น (Model Name)</label>
                        <input type="text" value={model} onChange={e => setModel(e.target.value)} placeholder="เช่น FTKC18XV2S"
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400" />
                    </div>

                    {/* <!-- Input: Serial Number --> */}
                    <div>
                        <label className="block mb-1 font-medium">Serial Number</label>
                        <input type="text" value={serial} onChange={e => setSerial(e.target.value)} placeholder="เช่น E0000001"
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400" />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">ผู้ตรวจสอบ</label>
                        <input type="text" value={auditor} onChange={e => setAuditor(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400" />
                    </div>
                    {/* <!-- Dropdown: เลือก State --> */}
                    <div>
                        <label className="block mb-1 font-medium">สถานะ (State)</label>
                        <select
                            value={state}
                            onChange={e => setState(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">-- กรุณาเลือกสถานะ --</option>
                            <option value="Pilot">Pilot</option>
                            <option value="First Mass">First Mass</option>
                            <option value="Mass">Mass</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>

                    {/* <!-- ปุ่ม "บันทึกข้อมูล" --> */}
                    <button
                        onClick={handleSubmit}
                        disabled={!isFormValid}
                        className={`w-full bg-green-600 hover:bg-green-700 text-gray font-medium py-3 rounded-xl transition ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        💾 บันทึกข้อมูล
                    </button>

                    {/* <!-- ปุ่มกลับหน้าหลัก --> */}
                    <button onClick={() => navigate('/next')}
                        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 rounded-xl transition">
                        ⬅ ย้อนกลับ
                    </button>
                </div>
            </div>
        </div>
    )
}