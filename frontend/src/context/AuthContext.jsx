import { createContext, useContext, useState, useEffect } from 'react';

// Tạo Context
const AuthContext = createContext();

// Hook custom để sử dụng nhanh
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(null);

    // Kiểm tra xem user đã đăng nhập trước đó chưa (khi F5 lại trang)
    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        const storedToken = localStorage.getItem('token');
        if (storedEmail && storedToken) {
            setCurrentUser(storedEmail);
            setToken(storedToken);
        }
    }, []);

    // Hàm xử lý chung cho cả Login và Register
    const login = async (email, password) => {
        try {
            // 1. Thử gọi API Đăng nhập
            let res = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            // 2. Nếu đăng nhập thất bại (chưa có tài khoản), tự động chuyển sang Đăng ký
            if (!res.ok) {
                res = await fetch('http://localhost:3000/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
            }

            // 3. Xử lý kết quả trả về
            if (res.ok) {
                const data = await res.json();
                const userEmail = data.user.email;
                const userToken = data.token;

                // Cập nhật State
                setCurrentUser(userEmail);
                setToken(userToken);

                // Lưu vào Local Storage để giữ phiên đăng nhập
                localStorage.setItem('email', userEmail);
                localStorage.setItem('token', userToken);
            } else {
                const errData = await res.json();
                // Báo lỗi nếu gõ sai mật khẩu hoặc lỗi validation
                alert(errData.error || (errData.errors && errData.errors[0]) || "Đã có lỗi xảy ra");
            }
        } catch (error) {
            console.error("Lỗi kết nối:", error);
            alert("Không thể kết nối tới Server API");
        }
    };

    // Hàm Đăng xuất
    const logout = () => {
        setCurrentUser(null);
        setToken(null);
        localStorage.removeItem('email');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ currentUser, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
