import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { currentUser, login, logout } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (email && password) {
            login(email, password);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="flex flex-col md:flex-row justify-between items-center py-4 border-b-2 border-black mb-8">
            {/* Logo Area */}
            <Link to="/" className="flex items-center gap-2 text-4xl font-bold text-black no-underline mb-4 md:mb-0">
                {/* Simple Home Icon using SVG */}
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Funny Movies
            </Link>

            {/* Authentication / User Actions Area */}
            <div>
                {currentUser ? (
                    <div className="flex items-center gap-4">
                        <span className="text-gray-700">Welcome {currentUser}</span>
                        <Link to="/share" className="border-2 border-black px-4 py-1 font-bold hover:bg-gray-100 transition">
                            Share a movie
                        </Link>
                        <button onClick={handleLogout} className="border-2 border-black px-4 py-1 font-bold hover:bg-gray-100 transition">
                            Logout
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleLogin} className="flex gap-2">
                        <input
                            type="email"
                            placeholder="email"
                            className="border-2 border-black px-2 py-1 outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="password"
                            className="border-2 border-black px-2 py-1 outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="border-2 border-black px-4 py-1 font-bold hover:bg-gray-100 transition whitespace-nowrap">
                            Login / Register
                        </button>
                    </form>
                )}
            </div>
        </header>
    );
};

export default Header;
