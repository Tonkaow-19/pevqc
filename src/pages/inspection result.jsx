import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { app } from "../firebase";

const db = getFirestore(app);

export default function InspectionResult() {
    const [result, setResult] = useState('');
    const navigate = useNavigate();
    const [docName, setDocName] = useState('');

    useEffect(() => {
        const model = localStorage.getItem("model");
        const serial = localStorage.getItem("serial");
        const state = localStorage.getItem("state");
        if (model && serial && state) {
            setDocName(`${model}_${serial}_${state}`);
        }
    }, []);

    const handleConfirm = async () => {
        if (!result || !docName) {
            alert("ไม่พบข้อมูลสำหรับบันทึกผลการตรวจสอบ");
            return;
        }
        try {
            await updateDoc(doc(db, "airData", docName), {
                inspectionResult: result
            });
            if (result === 'ok') {
                navigate('/rectime');
            } else if (result === 'ng') {
                navigate('/statusprob');
            }
        } catch (err) {
            alert("เกิดข้อผิดพลาดในการบันทึกผลการตรวจสอบ: " + err.message);
        }
    };

    const handleBack = () => {
        window.history.back();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center min-h-screen min-w-full bg-gradient-to-br from-blue-100 via-white to-blue-300">
            <div className="relative z-10 bg-white/90 backdrop-blur-md text-gray-800 shadow-2xl rounded-3xl p-10 w-full max-w-md text-center border border-blue-100 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md text-gray-800 space-y-6">
                    <h2 className="text-2xl font-bold text-green-600 text-center mb-6">ผลการตรวจสอบ (Inspection Result)</h2>
                    <div className="flex flex-col gap-4 items-start">
                        <label className="flex items-center gap-2 text-lg">
                            <input
                                type="radio"
                                name="inspection"
                                value="ok"
                                checked={result === 'ok'}
                                onChange={() => setResult('ok')}
                                className="accent-green-600 w-5 h-5"
                            />
                            <span className="font-medium">OK</span>
                        </label>
                        <label className="flex items-center gap-2 text-lg">
                            <input
                                type="radio"
                                name="inspection"
                                value="ng"
                                checked={result === 'ng'}
                                onChange={() => setResult('ng')}
                                className="accent-red-600 w-5 h-5"
                            />
                            <span className="font-medium">NG</span>
                        </label>
                    </div>
                    <div className="flex justify-between mt-8 gap-4">
                        <button
                            onClick={handleBack}
                            className="w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 rounded-xl transition"
                        >
                            ⬅ ย้อนกลับ
                        </button>
                        <button
                            onClick={handleConfirm}
                            className={`w-1/2 bg-green-600 hover:bg-green-700 text-gray font-medium py-2 rounded-xl transition ${!result ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={!result}
                        >
                            ✔ ยืนยัน
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}