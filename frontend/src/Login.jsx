import React, { useState } from 'react';
import './App.css'
import * as axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';



function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const client = axios.default;
    const data = {
        username: username,
        password: password
    }; 

    function hasCookie(cookieName) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(cookieName + '=')) {
                return true;
            }
        }
        return false;
    }

    const handleLoginSuccess = () => {
        // 登录成功后的处理
        document.cookie = `username=${username}; path=/;`;
        console.log(username);
        if(hasCookie('projectId')){
            navigate('/mainpage');
        } else {
            navigate('/startPage');
        }
    };

    const handleLoginFailure = (errorMessage) => {
        // 登录失败后的处理
        alert(errorMessage);
        // 可以添加显示错误消息的逻辑
    };

    const handleLogin = async (event) => {
        event.preventDefault(); // 阻止表单默认提交行为
        if (username && password) {
            try {
                const response = await client.post('http://127.0.0.1:7001/login', data); //需要填写后端端口，从该端口发送post请求
                const { success, message } = response.data;
                if (success === true) {
                    alert(message)
                    Cookies.set('username', username, { expires: 7 });
                    handleLoginSuccess();
                } else {
                    handleLoginFailure(message);
                }
            } catch (error) {
                alert(error);
                console.error('登录请求失败:', error);
                handleLoginFailure('登录请求失败');
            }
        }
    };

    return (
        <div className="card">
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">用户名:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">密码:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <button type="submit">登录</button>
                </div>
            </form>
            {/* 错误消息的显示逻辑 */}
            { /* <p className="error-message">错误消息</p> */}
        </div>
    );
}

export default LoginPage