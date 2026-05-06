import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ShareVideo = () => {
    // 1. Khai báo các State để lưu dữ liệu người dùng gõ vào form
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // 2. Lấy cái 'token' từ AuthContext để làm "thẻ thông hành"
    const { token, currentUser } = useAuth();
    const navigate = useNavigate();

    // 3. Hàm xử lý khi bấm nút "Share"
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Rào chắn bảo vệ: Nếu chưa có thẻ thông hành thì chặn lại ngay
        if (!token) {
            alert("Bạn cần đăng nhập để chia sẻ video!");
            return;
        }

        try {
            // Gọi API lên Backend Rails
            const response = await fetch('http://localhost:3000/api/videos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // QUAN TRỌNG: Gắn thẻ thông hành vào Header để Backend nhận diện
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    youtube_url: youtubeUrl,
                    title: title,
                    description: description
                })
            });

            if (response.ok) {
                alert("Chia sẻ video thành công!");
                // Chia sẻ xong thì điều hướng tự động về trang chủ
                navigate('/');
            } else {
                // Nếu Backend báo lỗi (ví dụ token hết hạn)
                const errorData = await response.json();
                alert("Lỗi: " + (errorData.error || errorData.errors[0]));
            }
        } catch (error) {
            console.error("Lỗi:", error);
            alert("Không thể kết nối đến máy chủ");
        }
    };

    // Nếu người dùng gõ thẳng link /share mà chưa đăng nhập,
    // bạn có thể hiện thông báo hoặc đẩy họ về trang chủ.
    if (!currentUser) {
        return <div className="text-center mt-10">Vui lòng đăng nhập để chia sẻ video.</div>;
    }

    return (
        <div className="flex justify-center mt-10">
            <div className="border-2 border-black p-8 w-full max-w-lg relative">
                {/* Tiêu đề Box nằm đè lên viền (phong cách giống hình mẫu) */}
                <span className="absolute -top-3 left-4 bg-white px-2 font-bold">
                    Share a Youtube movie
                </span>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
                    <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                        <label className="font-bold w-32">Youtube URL:</label>
                        <input
                            type="text"
                            className="border-2 border-black px-2 py-1 flex-1 outline-none w-full"
                            value={youtubeUrl}
                            onChange={(e) => setYoutubeUrl(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                        <label className="font-bold w-32">Title:</label>
                        <input
                            type="text"
                            className="border-2 border-black px-2 py-1 flex-1 outline-none w-full"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col md:flex-row gap-2 items-start">
                        <label className="font-bold w-32 mt-1">Description:</label>
                        <textarea
                            className="border-2 border-black px-2 py-1 flex-1 outline-none w-full h-24 resize-none"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end mt-2">
                        <button
                            type="submit"
                            className="border-2 border-black px-6 py-2 font-bold hover:bg-gray-100 transition w-full md:w-auto"
                        >
                            Share
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ShareVideo;
