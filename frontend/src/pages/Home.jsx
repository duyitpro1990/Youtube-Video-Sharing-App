import { useState, useEffect } from 'react';
import VideoCard from '../components/VideoCard';
import { useAuth } from '../context/AuthContext'; // Nhúng AuthContext vào

const Home = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Lấy thông tin user và token từ Context
    const { currentUser, token } = useAuth();

    useEffect(() => {

        const fetchVideos = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/videos', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Không thể tải danh sách video');
                }

                const data = await response.json();
                setVideos(data);
            } catch (err) {
                console.error("Lỗi khi tải video:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
        // Lắng nghe sự kiện từ App.jsx bắn ra
        const handleNewVideo = (event) => {
            const newVideoData = event.detail;

            // Cập nhật state videos: nhét video mới lên đầu mảng hiện tại
            setVideos((prevVideos) => {
                // Đề phòng trường hợp trùng lặp do dội event
                if (prevVideos.some(v => v.id === newVideoData.id)) return prevVideos;
                return [newVideoData, ...prevVideos];
            });
        };
        // Bật lắng nghe
        window.addEventListener('newVideoShared', handleNewVideo);

        // Cleanup function (quan trọng để không bị rò rỉ bộ nhớ)
        return () => {
            window.removeEventListener('newVideoShared', handleNewVideo);
        };

    }, [currentUser, token]); // Gọi lại useEffect nếu user đăng nhập/đăng xuất


    // 2. Giao diện đang tải dữ liệu
    if (loading) {
        return <div className="text-center py-10 font-bold">Đang tải danh sách video...</div>;
    }

    // 3. Giao diện khi có lỗi (ví dụ token hết hạn)
    if (error) {
        return <div className="text-center py-10 text-red-500 font-bold">Lỗi: {error}</div>;
    }

    // 4. Giao diện hiển thị danh sách video bình thường
    return (
        <div className="py-4">
            {videos.length === 0 ? (
                <div className="text-center mt-10">Chưa có video nào được chia sẻ. Hãy là người đầu tiên!</div>
            ) : (
                videos.map(video => (
                    <VideoCard key={video.id} video={video} />
                ))
            )}
        </div>
    );
};

export default Home;
