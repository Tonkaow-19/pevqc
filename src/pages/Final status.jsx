import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FinalStatus() {
    const [returnDate, setReturnDate] = useState("");
    const [returnTime, setReturnTime] = useState("");
    const [airImage, setAirImage] = useState(null);
    const [returnImage, setReturnImage] = useState(null);
    const navigate = useNavigate();

    const handleAirImageChange = (e) => {
        if (e.target.files[0]) setAirImage(e.target.files[0]);
    };

    const handleReturnImageChange = (e) => {
        if (e.target.files[0]) setReturnImage(e.target.files[0]);
    };

    const handleBack = () => {
        window.history.back();
    };

    const handleConfirm = () => {
        if (!returnDate || !returnTime || !airImage || !returnImage) {
            alert("กรุณากรอกข้อมูลและแนบรูปให้ครบถ้วน");
            return;
        }
        alert("บันทึกเสร็จสิ้น");
        navigate('/');
        // เพิ่ม logic ส่งข้อมูลได้ที่นี่
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center min-h-screen min-w-full bg-gradient-to-br from-blue-100 via-white to-blue-300">
            <div className="relative z-10 bg-white/90 backdrop-blur-md text-gray-800 shadow-2xl rounded-3xl p-10 w-full max-w-md text-center border border-blue-100 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="bg-white shadow-2xl rounded-3xl p-10 w-full text-gray-800 space-y-6">
                    <h1 className="text-2xl font-bold text-green-600 text-center mb-6">แอร์พร้อมส่งคืน (Ready for return)</h1>
                    <div>
                        <label className="block mb-1 font-medium">วันที่คืนแอร์</label>
                        <input
                            type="date"
                            value={returnDate}
                            onChange={e => setReturnDate(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-2"
                        />
                        <label className="block mb-1 font-medium">เวลาคืนแอร์</label>
                        <input
                            type="time"
                            value={returnTime}
                            onChange={e => setReturnTime(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl px-4 py-2"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">แนบรูปแอร์</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleAirImageChange}
                            className="w-full border border-gray-300 rounded-xl px-4 py-2"
                        />
                        {airImage && (
                            <img
                                src={URL.createObjectURL(airImage)}
                                alt="air"
                                className="w-24 h-24 object-cover rounded-xl border mt-2 mx-auto"
                            />
                        )}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">แนบรูปตอนคืน</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleReturnImageChange}
                            className="w-full border border-gray-300 rounded-xl px-4 py-2"
                        />
                        {returnImage && (
                            <img
                                src={URL.createObjectURL(returnImage)}
                                alt="return"
                                className="w-24 h-24 object-cover rounded-xl border mt-2 mx-auto"
                            />
                        )}
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
                            className={`w-1/2 bg-green-600 hover:bg-green-700 text-gray font-medium py-2 rounded-xl transition ${(!returnDate || !returnTime || !airImage || !returnImage) ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={!returnDate || !returnTime || !airImage || !returnImage}
                        >
                            ✔ ยืนยัน
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
