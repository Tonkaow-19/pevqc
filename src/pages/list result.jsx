import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { app } from "../firebase";

export default function ListResult() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [results, setResults] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("repairList")) || [];
        setItems(saved);
        setResults(saved.map(() => ""));
    }, []);

    const handleResultChange = (idx, value) => {
        const arr = [...results];
        arr[idx] = value;
        setResults(arr);
    };

    const handleSave = async () => {
        // ...บันทึกผลตรวจสอบตามต้องการ...
        // ดึง model, serial, state จาก localStorage
        const model = localStorage.getItem("model");
        const serial = localStorage.getItem("serial");
        const state = localStorage.getItem("state");
        if (!model || !serial || !state) {
            alert("ไม่พบข้อมูลสำหรับบันทึก กรุณาค้นหาข้อมูลใหม่อีกครั้ง");
            return;
        }
        const db = getFirestore(app);
        const docId = `${model}_${serial}_${state}`;
        try {
            await updateDoc(doc(db, "airData", docId), {
                repairCheckResults: results
            });
            navigate("/recheck");
        } catch (err) {
            alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล: " + err.message);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center min-h-screen min-w-full bg-gradient-to-br from-blue-100 via-white to-blue-300">
            <div className="relative z-10 bg-white/90 backdrop-blur-md text-gray-800 shadow-2xl rounded-3xl p-10 w-full max-w-md border border-blue-100">
                <h2 className="text-2xl font-bold text-center mb-2 text-blue-700">Status : สถานะแอร์</h2>
                <div className="text-lg text-gray-700 mb-4">แก้ไขแอร์เรียบร้อยแล้ว</div>
                <div className="flex flex-row gap-8 mb-6">
                    <div className="flex-1">
                        <div className="font-bold mb-2 text-left">ผลการตรวจสอบซ้ำ</div>
                        {/* สามารถเพิ่มข้อมูลผลการตรวจสอบซ้ำที่นี่ */}
                    </div>
                    <div className="flex-1">
                        <div className="font-bold mb-2 text-right">รายการแก้ไข</div>
                        <div className="space-y-4">
                            {items.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <span className="flex-1">{item}</span>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name={`result-${idx}`}
                                            value="pass"
                                            checked={results[idx] === "pass"}
                                            onChange={() => handleResultChange(idx, "pass")}
                                            className="accent-green-600"
                                        />
                                        <span className="text-sm">Pass</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name={`result-${idx}`}
                                            value="ng"
                                            checked={results[idx] === "ng"}
                                            onChange={() => handleResultChange(idx, "ng")}
                                            className="accent-red-600"
                                        />
                                        <span className="text-sm">NG</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
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
    );
}