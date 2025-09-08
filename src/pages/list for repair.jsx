import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { app } from "../firebase";

export default function ListForRepair() {
    const [items, setItems] = useState(["", "", "", "", ""]);
    const navigate = useNavigate();
    const db = getFirestore(app);

    // ลบ saveToFirestore ออกจาก handleChange/handleAdd แล้วใช้ useEffect แทน
    useEffect(() => {
        const saveToFirestore = async () => {
            const model = localStorage.getItem("model");
            const serial = localStorage.getItem("serial");
            const state = localStorage.getItem("state");
            if (!model || !serial || !state) return;
            const docId = `${model}_${serial}_${state}`;
            try {
                await updateDoc(doc(db, "airData", docId), {
                    repairList: items
                });
            } catch (err) {
                // ไม่แจ้งเตือนทันทีเพื่อไม่รบกวน UX
            }
        };
        saveToFirestore();
    }, [items, db]);

    const handleChange = (idx, value) => {
        const newItems = [...items];
        newItems[idx] = value;
        setItems(newItems);
    };

    const handleAdd = () => {
        setItems([...items, ""]);
    };

    const handleSave = () => {
        localStorage.setItem("repairList", JSON.stringify(items));
        navigate('/edit');
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center min-h-screen min-w-full bg-gradient-to-br from-blue-100 via-white to-blue-300">
            <div className="relative z-10 bg-white/90 backdrop-blur-md text-gray-800 shadow-2xl rounded-3xl p-10 w-full max-w-md border border-blue-100">
                <h1 className="text-2xl font-bold text-blue-600 text-center mb-2">Status : สถานะแอร์</h1>
                <div className="text-2xl font-bold text-blue-700 mb-ุ">แอร์จัดประชุมแล้ว : ต้องแก้ไขแอร์</div>
                <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">บันทึกรายการแก้ไข</h2>
                <div className="space-y-4 mb-6">
                    {items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                            <span className="font-medium">{idx + 1}.</span>
                            <input
                                type="text"
                                value={item}
                                onChange={e => handleChange(idx, e.target.value)}
                                className="flex-1 border rounded px-2 py-1"
                                placeholder={`รายการที่ ${idx + 1}`}
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        className="w-full bg-gray-100 hover:bg-gray-200 text-blue-700 font-medium py-2 rounded-xl transition"
                        onClick={handleAdd}
                    >
                        + เพิ่มข้อ
                    </button>
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