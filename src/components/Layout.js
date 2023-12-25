
import { Link, Route, Routes } from "react-router-dom";
import Chat from "./Chat/Chat";
import axios from "axios";
import "./Layout.css"
import { useState } from "react";

function Layout() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        axios.post('https://genzii-api.vhiep.com/api/auth/sign-in', {
            email: email,
            password: password
        }, {
            withCredentials: true  // Cho phép Axios sử dụng cookie
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    const handleLogout = () => {
        axios.get('https://genzii-api.vhiep.com/api/auth/sign-out', {
            withCredentials: true  // Cho phép Axios sử dụng cookie
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    return (
        <div className="Layout">
            <div className="Layout_left" to="message">
                <Link className="Layout_left-item" to="/message">
                    <i className='bx bx-message-square-dots'></i>
                    <h3>Tin nhắn</h3>
                </Link>
                <div className='current-user'>
                    <h3>Đăng nhập</h3>
                    <div>
                        <input type='text' placeholder='Nhập email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type='text' placeholder='Nhập password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button onClick={() => handleLogin()}>Login</button>
                        <button onClick={() => handleLogout()}>Logout</button>
                    </div>
                </div>
            </div>
            <div className="Layout_right">
                <Routes>
                    <Route path="message/*" element={<Chat />} />
                </Routes>
            </div>
        </div>
    )
}

export default Layout;