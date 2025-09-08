import React from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "@firebase/firestore";
import { app } from "../firebase";

export default function Search() {
    const navigate = useNavigate();
    const [model, setModel] = React.useState("");
    const [serial, setSerial] = React.useState("");
    const [state, setState] = React.useState("");
    const [inspector, setInspector] = React.useState(""); // inspector 1 หรือ 2
    const [foundData, setFoundData] = React.useState(null);

    const isFormValid =
        model.trim() &&
        serial.trim() &&
        state.trim() &&
        inspector;

    const handleSubmit = () => {
        if (!isFormValid) {
            alert("กรุณากรอกข้อมูลให้ครบถ้วน");
            return;
        }
        if (inspector === "1") {
            navigate("/result");
        } else if (inspector === "2") {
            // ลบการนำทางไปยัง /reass และ /statusprob ออก
        }
    };

    const db = getFirestore(app);

    const handleSearchAndEdit = async () => {
        if (!isFormValid) {
            alert("กรุณากรอกข้อมูลให้ครบถ้วน");
            return;
        }
        const docId = `${model}_${serial}_${state}`;
        const docRef = doc(db, "airData", docId);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            alert("ไม่พบข้อมูลที่ค้นหา");
            setFoundData(null);
            return;
        }
        const data = docSnap.data();
        setFoundData(data);

        if (inspector === "2") {
            if (data.inspectionResult === "ok") {
                navigate("/reass");
                return;
            } else if (data.inspectionResult === "ng") {
                navigate("/statusprob");
                return;
            } else {
                alert("ยังไม่มีผลการตรวจสอบสำหรับ Inspector 2");
                return;
            }
        }
        // Inspector 1
        navigate("/result");
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center min-h-screen min-w-full bg-gradient-to-br from-blue-100 via-white to-blue-300">
            <div className="relative z-10 bg-white/90 backdrop-blur-md text-gray-800 shadow-2xl rounded-3xl p-10 w-full max-w-md text-center border border-blue-100 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md text-gray-800 space-y-6">
                    <h1 className="text-2xl font-bold text-blue-600 text-center">ค้นหาข้อมูล</h1>
                    <div>
                        <label className="block mb-1 font-medium">ชื่อรุ่น (Model Name)</label>
                        <input type="text" value={model} onChange={e => setModel(e.target.value)} placeholder="เช่น FTKC18XV2S"
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Serial Number</label>
                        <input type="text" value={serial} onChange={e => setSerial(e.target.value)} placeholder="เช่น E0000001"
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
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
                    <div>
                        <label className="block mb-1 font-medium">เลือก Inspector</label>
                        <select
                            value={inspector}
                            onChange={e => setInspector(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        >
                            <option value="">-- กรุณาเลือก Inspector --</option>
                            <option value="1">Inspector 1</option>
                            <option value="2">Inspector 2</option>
                        </select>
                    </div>
                    <button
                        onClick={handleSearchAndEdit}
                        disabled={!isFormValid}
                        className={`w-full bg-blue-600 hover:bg-blue-700 text-gray-700 font-medium py-3 rounded-xl transition ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        🔍 ค้นหา
                    </button>
                    {foundData && inspector === "1" && (
                        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200 text-left">
                            <div className="font-bold text-blue-700 mb-2">พบข้อมูล:</div>
                            <pre className="text-xs text-gray-800">{JSON.stringify(foundData, null, 2)}</pre>
                            {/* ปุ่มดำเนินการต่อ เฉพาะ inspector 1 */}
                            <button
                                onClick={() => navigate("/result")}
                                className="w-full mt-4 bg-green-600 hover:bg-green-700 text-gray-700 font-medium py-2 rounded-xl transition"
                            >
                                ดำเนินการต่อ
                            </button>
                        </div>
                    )}
                    <button onClick={() => navigate('/next')}
                        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 rounded-xl transition">
                        ⬅ ย้อนกลับ
                    </button>
                </div>
            </div>
        </div>
    );
}
