import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { app } from "../firebase";

const db = getFirestore(app);

export default function RecordTime() {
    const [warehouseStartDate, setWarehouseStartDate] = useState("");
    const [warehouseStartTime, setWarehouseStartTime] = useState("");
    const [warehouseFinishedDate, setWarehouseFinishedDate] = useState("");
    const [warehouseFinishedTime, setWarehouseFinishedTime] = useState("");

    const [docStartDate, setDocStartDate] = useState("");
    const [docStartTime, setDocStartTime] = useState("");
    const [docFinishedDate, setDocFinishedDate] = useState("");
    const [docFinishedTime, setDocFinishedTime] = useState("");

    const [day1StartDate, setDay1StartDate] = useState("");
    const [day1StartTime, setDay1StartTime] = useState("");
    const [day1EndDate, setDay1EndDate] = useState("");
    const [day1EndTime, setDay1EndTime] = useState("");

    const [day2StartDate, setDay2StartDate] = useState("");
    const [day2StartTime, setDay2StartTime] = useState("");
    const [day2EndDate, setDay2EndDate] = useState("");
    const [day2EndTime, setDay2EndTime] = useState(""); // เพิ่ม state สำหรับเวลา End Day2

    const [reportStartDate, setReportStartDate] = useState("");
    const [reportStartTime, setReportStartTime] = useState("");
    const [reportFinishedDate, setReportFinishedDate] = useState("");
    const [reportFinishedTime, setReportFinishedTime] = useState("");

    const navigate = useNavigate();

    const handleBack = () => {
        window.history.back();
    };

    const handleConfirm = async () => {
        // ดึงชื่อ doc จาก localStorage
        const model = localStorage.getItem("model");
        const serial = localStorage.getItem("serial");
        const stateVal = localStorage.getItem("state");
        const docName = model && serial && stateVal ? `${model}_${serial}_${stateVal}` : null;

        if (!docName) {
            alert("ไม่พบข้อมูลสำหรับบันทึกเวลา");
            return;
        }

        try {
            await updateDoc(doc(db, "airData", docName), {
                warehouseStartDate,
                warehouseStartTime,
                warehouseFinishedDate,
                warehouseFinishedTime,
                docStartDate,
                docStartTime,
                docFinishedDate,
                docFinishedTime,
                day1StartDate,
                day1StartTime,
                day1EndDate,
                day1EndTime,
                day2StartDate,
                day2StartTime,
                day2EndDate,
                day2EndTime,
                reportStartDate,
                reportStartTime,
                reportFinishedDate,
                reportFinishedTime,
                recordTimeSavedAt: new Date().toISOString()
            });
            alert("บันทึกข้อมูลสำเร็จ!");
            navigate('/reass');
        } catch (err) {
            alert("เกิดข้อผิดพลาดในการบันทึกเวลา: " + err.message);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center min-h-screen min-w-full bg-gradient-to-br from-blue-100 via-white to-blue-300">
            <div className="relative z-10 bg-white/90 backdrop-blur-md text-gray-800 shadow-2xl rounded-3xl p-10 w-full max-w-xl text-center border border-blue-100 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="bg-white shadow-2xl rounded-3xl p-10 w-full text-gray-800 space-y-8">
                    <h1 className="text-2xl font-bold text-green-600 text-center mb-6">บันทึกเวลาแต่ละขั้นตอน</h1>

                    {/* 1. รับแอร์ที่ warehouse */}
                    <div>
                        <h2 className="font-semibold text-lg mb-2">1. รับแอร์ที่ warehouse</h2>
                        <div className="flex gap-4 mb-2">
                            <div className="flex flex-col flex-1">
                                <label className="font-medium">Start: วันที่</label>
                                <input type="date" value={warehouseStartDate} onChange={e => setWarehouseStartDate(e.target.value)} className="border rounded-xl px-2 py-1" />
                            </div>
                            <div className="flex flex-col flex-1">
                                <label className="font-medium">เวลา</label>
                                <input type="time" value={warehouseStartTime} onChange={e => setWarehouseStartTime(e.target.value)} className="border rounded-xl px-2 py-1" />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex flex-col flex-1">
                                <label className="font-medium">Finished: วันที่</label>
                                <input type="date" value={warehouseFinishedDate} onChange={e => setWarehouseFinishedDate(e.target.value)} className="border rounded-xl px-2 py-1" />
                            </div>
                            <div className="flex flex-col flex-1">
                                <label className="font-medium">เวลา</label>
                                <input type="time" value={warehouseFinishedTime} onChange={e => setWarehouseFinishedTime(e.target.value)} className="border rounded-xl px-2 py-1" />
                            </div>
                        </div>
                    </div>

                    {/* 2. เตรียมเอกสารตรวจแอร์ */}
                    <div>
                        <h2 className="font-semibold text-lg mb-2">2. เตรียมเอกสารตรวจแอร์</h2>
                        <div className="flex gap-4 mb-2">
                            <div className="flex flex-col flex-1">
                                <label className="font-medium">Start: วันที่</label>
                                <input type="date" value={docStartDate} onChange={e => setDocStartDate(e.target.value)} className="border rounded-xl px-2 py-1" />
                            </div>
                            <div className="flex flex-col flex-1">
                                <label className="font-medium">เวลา</label>
                                <input type="time" value={docStartTime} onChange={e => setDocStartTime(e.target.value)} className="border rounded-xl px-2 py-1" />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex flex-col flex-1">
                                <label className="font-medium">Finished: วันที่</label>
                                <input type="date" value={docFinishedDate} onChange={e => setDocFinishedDate(e.target.value)} className="border rounded-xl px-2 py-1" />
                            </div>
                            <div className="flex flex-col flex-1">
                                <label className="font-medium">เวลา</label>
                                <input type="time" value={docFinishedTime} onChange={e => setDocFinishedTime(e.target.value)} className="border rounded-xl px-2 py-1" />
                            </div>
                        </div>
                    </div>

                    {/* 3. ตรวจแอร์ */}
                    <div>
                        <h2 className="font-semibold text-lg mb-2">3. ตรวจแอร์</h2>
                        <div className="mb-2 font-medium">Day 1</div>
                        <div className="flex gap-4 mb-2">
                            <div className="flex flex-col flex-1">
                                <label className="font-medium">Start: วันที่</label>
                                <input type="date" value={day1StartDate} onChange={e => setDay1StartDate(e.target.value)} className="border rounded-xl px-2 py-1" />
                            </div>
                            <div className="flex flex-col flex-1">
                                <label className="font-medium">เวลา</label>
                                <input type="time" value={day1StartTime} onChange={e => setDay1StartTime(e.target.value)} className="border rounded-xl px-2 py-1" />
                            </div>
                        </div>
                        <div className="flex gap-4 mb-2">
                            <div className="flex flex-col flex-1">
                                <label className="font-medium">End: วันที่</label>
                                <input type="date" value={day1EndDate} onChange={e => setDay1EndDate(e.target.value)} className="border rounded-xl px-2 py-1" />
                            </div>
                            <div className="flex flex-col flex-1">
                                <label className="font-medium">เวลา</label>
                                <input type="time" value={day1EndTime} onChange={e => setDay1EndTime(e.target.value)} className="border rounded-xl px-2 py-1" />
                            </div>
                        </div>
                        <div className="mb-2 font-medium">Day 2</div>
                        <div className="flex gap-4 mb-2">
                            <div className="flex flex-col flex-1">
                                <label className="font-medium">Start: วันที่</label>
                                <input type="date" value={day2StartDate} onChange={e => setDay2StartDate(e.target.value)} className="border rounded-xl px-2 py-1" />
                            </div>
                            <div className="flex flex-col flex-1">
                                <label className="font-medium">เวลา</label>
                                <input type="time" value={day2StartTime} onChange={e => setDay2StartTime(e.target.value)} className="border rounded-xl px-2 py-1" />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex flex-col flex-1">
                                <label className="font-medium">End: วันที่</label>
                                <input type="date" value={day2EndDate} onChange={e => setDay2EndDate(e.target.value)} className="border rounded-xl px-2 py-1" />
                            </div>
                            <div className="flex flex-col flex-1">
                                <label className="font-medium">เวลา</label>
                                <input type="time" value={day2EndTime} onChange={e => setDay2EndTime(e.target.value)} className="border rounded-xl px-2 py-1" />
                            </div>
                        </div>
                    </div>

                    {/* 4. สรุปรายงานการตรวจ */}
                    <div>
                        <h2 className="font-semibold text-lg mb-2">4. สรุปรายงานการตรวจ</h2>
                        <div className="flex gap-4 mb-2">
                            <div className="flex flex-col flex-1">
                                <label className="font-medium">Start: วันที่</label>
                                <input type="date" value={reportStartDate} onChange={e => setReportStartDate(e.target.value)} className="border rounded-xl px-2 py-1" />
                            </div>
                            <div className="flex flex-col flex-1">
                                <label className="font-medium">เวลา</label>
                                <input type="time" value={reportStartTime} onChange={e => setReportStartTime(e.target.value)} className="border rounded-xl px-2 py-1" />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex flex-col flex-1">
                                <label className="font-medium">Finished: วันที่</label>
                                <input type="date" value={reportFinishedDate} onChange={e => setReportFinishedDate(e.target.value)} className="border rounded-xl px-2 py-1" />
                            </div>
                            <div className="flex flex-col flex-1">
                                <label className="font-medium">เวลา</label>
                                <input type="time" value={reportFinishedTime} onChange={e => setReportFinishedTime(e.target.value)} className="border rounded-xl px-2 py-1" />
                            </div>
                        </div>
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
                            className="w-1/2 bg-green-600 hover:bg-green-700 text-gray font-medium py-2 rounded-xl transition"
                        >
                            ✔ ยืนยัน
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
