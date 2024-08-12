import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Login.jsx';
import RegisterPage from './register.jsx';
import MainPage from './mainPage.jsx';
import StartPage from './startPage.jsx';

const handleLoginSuccess = () => {
  // 登录成功后的处理
  const navigate = useNavigate();
  navigate('/mainpage'); //跳转到 /mainpage
};

const handleLoginFailure = (errorMessage) => {
  // 登录失败后的处理
  console.error(errorMessage);
  // 可以添加显示错误消息的逻辑
};

// 确保使用 React 18 的 createRoot
const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/mainpage' element={<MainPage />} />
        <Route path='/startPage' element={<StartPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);