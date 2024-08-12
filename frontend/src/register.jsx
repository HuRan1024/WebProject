import React, { useState } from 'react';
import './App.css'
import { useNavigate } from 'react-router-dom';
import * as axios from 'axios';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const data = {
        username: username,
        password: password
    }; 
    const client = axios.default;
    const handleRegisterSuccess = () => {
        navigate('/'); //跳转到主界面
    };

    const handleRegisterFailure = (errorMessage) => {
        alert(errorMessage);
        // 可以添加显示错误消息的逻辑
    };
    const handleRegister = async (event) => {
        event.preventDefault(); // 阻止表单默认提交行为

        if (username && password) {
            try {
                const response = await client.post('http://127.0.0.1:7001/register', data); //需要填写后端端口，从该端口发送post请求
                const { success, message } = response.data;
                if (success === true) {  //成功的status对应为0
                    alert(message);
                    handleRegisterSuccess();
                } else {
                    handleRegisterFailure(message);
                }
            } catch (error) {
                console.error('注册请求失败:', error);
                handleLoginFailure('注册请求失败');
            }
        }
    };

    return (
        <div className="card">
            <form onSubmit={handleRegister}>
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
                    <button type="submit">注册</button>
                </div>
            </form>
            {/* 错误消息的显示逻辑 */}
            { /* <p className="error-message">错误消息</p> */}
        </div>
    );
}
export default RegisterPage