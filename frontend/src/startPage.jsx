import React, { useState } from 'react';
import './startPage.css'; // 引入CSS文件
import CreateProjectForm from './createProjectForm.jsx'; // 引入创建项目表单组件
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StartPage = () => {
    const [showCreateProjectForm, setShowCreateProjectForm] = useState(false); // 用于控制创建项目表单的显示
    const [showJoinProjectForm, setShowJoinProjectForm] = useState(false); // 用于控制加入项目表单的显示
    const [joinProject, setJoinProject] = useState({ projectId: '', password: '' }); // 用于存储加入项目的信息
    const navigate = useNavigate();

    function getCookie(name) { //获取cookie
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const handleCreateProject = () => {
        setShowCreateProjectForm(true);
    };
    const handleCreateProjectFormClose = () => {
        setShowCreateProjectForm(false);
    };

    const handleCreateProjectSubmit = async (projectData) => {
        try {
            const response = await axios.post('http://127.0.0.1:7001/project/create', projectData);
            const data = await response.data;
            console.log('项目已创建:', data);
            document.cookie = `projectId=${data.projectId}; path=/;`;
            navigate('/mainpage');
        } catch (error) {
            console.error('创建项目时出错:', error);
        }
    };

    const handleJoinProject = async () => {
        setShowJoinProjectForm(true);
    };
    const handleJoinProjectChange = (e) => {
        const { name, value } = e.target;
        setJoinProject((prevJoinProject) => ({
            ...prevJoinProject,
            [name]: value
        }));
    };
    const handleJoinProjectSubmit = async () => {
        try {
            const user = await getCookie('username');
            console.log('用户:', user);
            const response = await axios.post('http://127.0.0.1:7001/project/join', {
                projectId: joinProject.projectId,
                password: joinProject.password,
                user: user
            });
            const data = await response.data;
            console.log('项目已加入:', data);
            if (data.status === 'success') {
                document.cookie = `projectId=${joinProject.projectId}; path=/;`;
                navigate('/mainpage');
            } else {
                alert(data.message); // 设置警告信息
                console.error('加入项目失败:', data.message);
            }
        } catch (error) {
            console.error('加入项目时出错:', error);
        }
        setShowJoinProjectForm(false);
    };

    const handleJoinProjectFormClose = () => {
        setShowJoinProjectForm(false);
    };

    return (
        <div className="start-page">
            <h1>欢迎使用敏捷快板!</h1>
            <h1>请创建或者打开一个项目来开始使用敏捷快板!</h1>
            <div className="button-container">
                <button className="start-button" onClick={handleCreateProject}>创建项目</button>
                <button className="start-button" onClick={handleJoinProject}>加入/打开项目</button>
            </div>
            {showCreateProjectForm && (
                <CreateProjectForm
                    onClose={handleCreateProjectFormClose}
                    onCreate={handleCreateProjectSubmit}
                />
            )}

            {showJoinProjectForm && (
                <div className="join-project-overlay">
                    <div className="join-project-container">
                        <h3>加入项目</h3>
                        <input type="text" name="projectId" value={joinProject.projectId} onChange={handleJoinProjectChange} placeholder="项目ID" required />
                        <input type="text" name="password" value={joinProject.password} onChange={handleJoinProjectChange} placeholder="项目密码" required />
                        <button onClick={handleJoinProjectSubmit}>提交</button>
                        <button onClick={handleJoinProjectFormClose}>取消</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const handleCreateProject = () => {
    // 创建项目的逻辑
};

const handleJoinProject = () => {
    // 加入/打开项目的逻辑
};

export default StartPage;
