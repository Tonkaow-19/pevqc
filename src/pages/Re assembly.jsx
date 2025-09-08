import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, updateDoc } from "@firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../firebase";

// เพิ่ม prop docId สำหรับรับ document id ที่ค้นหาจากหน้า search (model_serial_state)
export default function ReAssembly() {
    const [status, setStatus] = useState("");
    const [images, setImages] = useState([]);
    const navigate = useNavigate();
    const db = getFirestore(app);
    const storage = getStorage(app);

    // รับ docId จาก localStorage ที่ถูกบันทึกจากหน้า search
    const docId = `${localStorage.getItem("model")}_${localStorage.getItem("serial")}_${localStorage.getItem("state")}`;

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(prev => [...prev, ...files]);
    };

    const handleRemoveImage = (idx) => {
        setImages(prev => prev.filter((_, i) => i !== idx));
    };

    const handleConfirm = async () => {
        if (!status.trim()) {
            window.alert("กรุณากรอกสถานะประกอบแอร์คืน");
            return;
        }
        if (images.length < 4) {
            window.alert("กรุณาแนบรูปอย่างน้อย 4 รูป");
            return;
        }

        try {
            // อัปโหลดรูปทั้งหมดแบบ parallel ทีเดียว
            const now = new Date().getTime();
            const uploadPromises = images.map((img, idx) => {
                const storageRef = ref(storage, `reassembly/${docId}/${now}_${idx}`);
                return uploadBytes(storageRef, img)
                    .then(() => getDownloadURL(storageRef));
            });
            const imageUrls = await Promise.all(uploadPromises);

            // อัปเดตข้อมูลใน Firestore โดยเก็บ url ของรูปเป็น array
            const docRef = doc(db, "airData", docId);
            await updateDoc(docRef, {
                reassemblyStatus: status,
                reassemblyImages: imageUrls
            });

            window.alert("บันทึกข้อมูลสำเร็จ!");
            navigate('/recheck');
        } catch (error) {
            window.alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง");
            console.error("Upload error:", error);
        }
    };

    const handleBack = () => {
        window.history.back();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center min-h-screen min-w-full bg-gradient-to-br from-blue-100 via-white to-blue-300">
            <div className="relative z-10 bg-white/90 backdrop-blur-md text-gray-800 shadow-2xl rounded-3xl p-10 w-full max-w-md text-center border border-blue-100 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md text-gray-800 space-y-6">
                    <h1 className="text-2xl font-bold text-green-600 text-center mb-6">Status : สถานะแอร์</h1>
                    <div>
                        <label className="block mb-1 font-medium">สถานะประกอบแอร์คืน</label>
                        <div className="flex flex-col gap-2 text-left">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={status === "ประกอบเสร็จแล้ว"}
                                    onChange={e => {
                                        const checked = e.target.checked;
                                        setStatus(checked ? "ประกอบเสร็จแล้ว" : "");
                                        // ไม่ต้องบันทึกลง firebase ตรงนี้ ให้บันทึกพร้อมรูปใน handleConfirm
                                    }}
                                    className="mr-2 accent-green-600"
                                />
                                ประกอบเสร็จแล้ว
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">แนบรูป (อย่างน้อย 4 รูป)</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="w-full border border-gray-300 rounded-xl px-4 py-2"
                        />
                        <div className="flex flex-wrap gap-2 mt-2 justify-center">
                            {images.map((img, idx) => (
                                <div key={idx} className="relative">
                                    <img
                                        src={URL.createObjectURL(img)}
                                        alt={`img-${idx}`}
                                        className="w-20 h-20 object-cover rounded-xl border"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(idx)}
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                        title="ลบรูป"
                                    >×</button>
                                </div>
                            ))}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                            แนบรูปเพิ่มได้ไม่จำกัด
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
                            className={`w-1/2 bg-green-600 hover:bg-green-700 text-gray font-medium py-2 rounded-xl transition ${(images.length < 4 || !status.trim()) ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={images.length < 4 || !status.trim()}
                        >
                            ✔ ยืนยัน
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

