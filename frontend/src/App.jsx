import { useState } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom';

function App() {

  const navigate = new useNavigate;
  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register'); //跳转到register页面
  };

  return (
    <>
      <h1> 欢迎使用敏捷看板</h1>
      <div className="card">
        <button onClick={handleLoginClick}>
          点击登录
        </button>
        <div>
          <button onClick={handleRegister}>点击注册</button>
        </div>
      </div>
    </>
  )
}

export default App
