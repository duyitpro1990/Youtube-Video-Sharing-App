import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createConsumer } from '@rails/actioncable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Quan trọng: import CSS của toast

import Home from './pages/Home';
import ShareVideo from './pages/ShareVideo';
import { useAuth } from './context/AuthContext';
import Header from "./components/Header.jsx";

// Định nghĩa URL kết nối tới ActionCable của Rails (thường là ws://localhost:3000/cable)
const WEBSOCKET_URL = 'ws://localhost:3000/cable';

function App() {
    const { currentUser } = useAuth();

    useEffect(() => {
        // Chỉ kết nối WebSocket nếu user đã đăng nhập
        if (!currentUser) return;

        // Khởi tạo consumer kết nối tới Rails ActionCable
        const cable = createConsumer(WEBSOCKET_URL);

        // Đăng ký (Subscribe) vào NotificationsChannel
        const subscription = cable.subscriptions.create('NotificationsChannel', {
            connected() {
                console.log('Đã kết nối tới NotificationsChannel');
            },
            disconnected() {
                console.log('Đã ngắt kết nối WebSocket');
            },
            received(data) {
                if (data.type === 'NEW_VIDEO') {
                    const newVideo = data.video; // Lấy object video từ payload

                    // 1. Hiển thị Pop-up nếu không phải người tự share
                    if (newVideo.user.email !== currentUser) {
                        toast.info(
                            <div>
                                <strong>{newVideo.user.email}</strong> vừa chia sẻ một video mới: <br/>
                                <em>"{newVideo.title}"</em>
                            </div>,
                            { position: "top-right", autoClose: 5000 }
                        );
                    }

                    // 2. Bắn một CustomEvent ra toàn cục, đính kèm dữ liệu video
                    window.dispatchEvent(new CustomEvent('newVideoShared', { detail: newVideo }));
                }
            }
        });

        // Cleanup: Ngắt kết nối khi component unmount hoặc user đăng xuất
        return () => {
            subscription.unsubscribe();
            cable.disconnect();
        };
    }, [currentUser]); // Chạy lại effect này nếu trạng thái currentUser thay đổi

    return (
        <Router>
            {/* Component này bắt buộc phải có mặt để hiển thị các toast */}
            <ToastContainer />

            <div className="max-w-5xl mx-auto px-4">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/share" element={<ShareVideo />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
