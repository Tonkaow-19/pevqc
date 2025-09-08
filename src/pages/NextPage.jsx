import { useNavigate } from "react-router-dom";

export default function NextPage() {
    const navigate = useNavigate();
    const handleSearch = () => {
        navigate('/search');
    };
    const handleCreate = () => {
        navigate('/add');
    };
    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center min-h-screen min-w-full bg-gradient-to-br from-blue-100 via-white to-blue-300">
            <div className="relative z-10 bg-white/90 backdrop-blur-md text-gray-800 shadow-2xl rounded-3xl p-10 w-full max-w-md text-center border border-blue-100 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="bg-white text-gray-800 shadow-xl rounded-3xl p-10 w-full max-w-md text-center space-y-6">

                    {/* หัวข้อ */}
                    <h1 className="text-2xl font-bold text-blue-700">B-kansa inspection</h1>

                    {/* คำอธิบาย --> */}
                    <p className="text-gray-600">เลือกทำรายการที่ต้องการ</p>

                    {/* ปุ่มต่าง ๆ */}
                    <div className="space-y-4">
                        {/* ปุ่มค้นหา */}
                        <button onClick={handleSearch}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-gray font-medium py-3 rounded-xl transition">
                            🔍 ค้นหา
                        </button>

                        {/* ปุ่มสร้าง */}
                        <button onClick={handleCreate}
                            className="w-full bg-green-500 hover:bg-green-600 text-gray font-medium py-3 rounded-xl transition">
                            ➕ เพิ่ม
                        </button>
                        <button onClick={handleBack}
                            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 rounded-xl transition">
                            ⬅ ย้อนกลับ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}