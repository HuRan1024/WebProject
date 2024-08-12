import React, { useState, useEffect } from 'react';
import './AgileBoard.css'; // 假设您会创建一个CSS文件来定义样式
import axios from 'axios';
import CreateProjectForm from './createProjectForm.jsx'; // 引入创建项目表单组件

const AgileBoard = () => {
    const [tasks, setTasks] = useState({
        todo: [],
        inProgress: [],
        done: []
    });

    const [project, setProject] = useState({id:'', name: '', discription: '', members: '', ddl: '' });

    const [selectedTask, setSelectedTask] = useState(null); // 用于存储选中的任务
    const [newComment, setNewComment] = useState(''); // 用于存储新评论
    const [commentAdd, setCommentAdd] = useState(false); // 用于检测是否需要增加评论
    const [newTask, setNewTask] = useState({ name: '', discription: '', members: '', ddl: '' }); // 用于存储新任务
    const [taskAdd, setTaskAdd] = useState(false); // 用于检测是否需要增加任务
    const [showCreateProjectForm, setShowCreateProjectForm] = useState(false); // 用于控制创建项目表单的显示

    useEffect(() => {   //初始化
        //从后端获取任务数据
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        document.cookie = "projectId=0; path=/";  // 设置cookie临时调试，之后删除
        //获取cookie
        const projectId = getCookie('projectId');
        const response = await axios.post('http://127.0.0.1:7001/project/getTasks', {
            projectId: projectId
        });
        const data = await response.data;
        console.log('Received data:', data); // 添加日志
        setTasks(data);
    };

    function getCookie(name) { //获取cookie
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const handleTaskAddClick = () => {
        setTaskAdd(true);
        console.log('添加任务');
    }

    const handleTaskClick = (task) => {
        setSelectedTask(task);
    };

    const handleClose = () => {
        setSelectedTask(null);
    };

    const handleAddComment = () => {
        setCommentAdd(true);
        console.log('添加评论');
    };

    const handleCommentChange = (e) => {
        const value = e.target.value.replace(/\n/g, '');
        setNewComment(value);
    };

    const handleCommentSubmit = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:7001/task/addComment', {
                taskId: selectedTask.id,
                comment: newComment
            });
            const data = await response.data;
            console.log('评论已添加:', data); // 添加日志
            // 更新任务状态以反映新评论
            setTasks((prevTasks) => ({
                ...prevTasks,
                [selectedTask.status]: prevTasks[selectedTask.status].map((task) =>
                    task.id === selectedTask.id ? { ...task, comments: data.comments } : task
                )
            }));
            setSelectedTask((prevSelectedTask) => ({
                ...prevSelectedTask,
                comments: data.comments
            })); // 更新选中的任务以反映新评论
            setCommentAdd(false); // 关闭评论窗口
        } catch (error) {
            console.error('添加评论时出错:', error); // 添加日志
        }
    };

    const handleTaskChange = (e) => {
        const { name, value } = e.target;
        setNewTask((prevTask) => ({
            ...prevTask,
            [name]: value
        }));
    };

    const handleTaskSubmit = async () => {
        try {
            const projectId = getCookie('projectId');
            const response = await axios.post('http://127.0.0.1:7001/task/create', {
                projectId: projectId,
                name: newTask.name,
                discription: newTask.discription,
                members: newTask.members,
                ddl: newTask.ddl
            });
            const data = await response.data;
            console.log('任务已添加:', data); // 添加日志
            // 更新任务状态以反映新任务
            setTasks((prevTasks) => ({
                ...prevTasks,
                todo: [...prevTasks.todo, data.task]
            }));
            setNewTask({ name: '', discription: '', members: '', ddl: '' }); // 清空表单
            setTaskAdd(false); // 关闭任务窗口
        } catch (error) {
            console.error('添加任务时出错:', error); // 添加日志
        }
    };

    const handleCreateProject = () => {
        setShowCreateProjectForm(true);
    };

    const handleJoinProject = async () => {

    };

    const handleOpenProject = async () => {

    };

    const handleCreateProjectFormClose = () => {
        setShowCreateProjectForm(false);
    };

    const handleCreateProjectSubmit = async (projectData) => {
        try {
            const response = await axios.post('http://127.0.0.1:7001/project/create', projectData);
            const data = await response.data;
            console.log('项目已创建:', data);
            document.cookie = `projectName=${data.projectName}; path=/;`;
            // 更新任务状态以反映新项目
            setTasks(data.tasks);
        } catch (error) {
            console.error('创建项目时出错:', error);
        }
    };

    return (
        <div className="agile-board">
            <h1>我的项目看板</h1>
            <div className="top-right-button-container">
                <button className="top-right-button" onClick={handleTaskAddClick}>添加任务</button>
                <button className="top-right-button" onClick={handleCreateProject}>创建项目</button>
                <button className="top-right-button" onClick={handleJoinProject}>加入项目</button>
                <button className="top-right-button" onClick={handleOpenProject}>打开项目</button>
            </div>
            <div className="swimlanes">
                <div className="swimlane">
                    <div className="swimlane-header">
                        <h3>待办</h3>
                    </div>
                    <div className="cards">
                        {tasks.todo.length > 0 && tasks.todo.map((task) => (
                            <div key={task.id} className="card" onClick={() => handleTaskClick(task)}>
                                <h4>{task.name}</h4>
                                <p>{task.discription}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="swimlane">
                    <div className="swimlane-header">
                        <h3>进行中</h3>
                    </div>
                    <div className="cards">
                        {tasks.inProgress.length > 0 && tasks.inProgress.map((task) => (
                            <div key={task.id} className="card" onClick={() => handleTaskClick(task)}>
                                <h4>{task.name}</h4>
                                <p>{task.discription}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="swimlane">
                    <div className="swimlane-header">
                        <h3>已完成</h3>
                    </div>
                    <div className="cards">
                        {tasks.done.length > 0 && tasks.done.map((task) => (
                            <div key={task.id} className="card" onClick={() => handleTaskClick(task)}>
                                <h4>{task.name}</h4>
                                <p>{task.discription}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {selectedTask && (
                <div className="task-detail-overlay">
                    <div className="task-detail-container">
                        <h2>{selectedTask.name}</h2>
                        <p>{selectedTask.discription}</p>
                        <p>成员: {selectedTask.members.join(', ')}</p>
                        <p>截止日期: {selectedTask.ddl}</p>
                        <p style={{ whiteSpace: 'pre-line', overflow: 'auto' }}>评论: {selectedTask.comments.join('\n')}</p>
                        <button onClick={handleAddComment}>添加评论</button>
                        <button onClick={handleClose}>关闭</button>
                    </div>
                </div>
            )}

            {commentAdd && (
                <div className="comment-overlay">
                    <div className="comment-container">
                        <h3>添加评论</h3>
                        <textarea value={newComment} onChange={handleCommentChange} required />
                        <button onClick={handleCommentSubmit}>提交</button>
                        <button onClick={() => setCommentAdd(false)}>取消</button>
                    </div>
                </div>
            )}

            {taskAdd && (
                <div className="task-overlay">
                    <div className="task-container">
                        <h3>添加任务</h3>
                        <input type="text" name="name" value={newTask.name} onChange={handleTaskChange} placeholder="任务名称" required />
                        <textarea name="discription" value={newTask.discription} onChange={handleTaskChange} placeholder="任务描述" required />
                        <input type="text" name="members" value={newTask.members} onChange={handleTaskChange} placeholder="成员名称，用英文','分割" required />
                        <input type="date" name="ddl" value={newTask.ddl} onChange={handleTaskChange} placeholder="截止日期" required />
                        <p>请选择截止日期</p>
                        <button onClick={handleTaskSubmit}>提交</button>
                        <button onClick={() => setTaskAdd(false)}>取消</button>
                    </div>
                </div>
            )}

            {showCreateProjectForm && (
                <CreateProjectForm
                    onClose={handleCreateProjectFormClose}
                    onCreate={handleCreateProjectSubmit}
                />
            )}
        </div>
    );
};

export default AgileBoard;
