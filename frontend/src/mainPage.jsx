import React, { useState, useEffect } from 'react';
import './mainPage.css'; // 假设您会创建一个CSS文件来定义样式
import axios from 'axios';
import CreateProjectForm from './createProjectForm.jsx'; // 引入创建项目表单组件

const Project = {
    id: 0,
    name: '',
    discription: '',
    members: [],
    tasks: [],
    password: ''
}

const MainPage = () => {

    const [tasks, setTasks] = useState({
        todo: [],
        inProgress: [],
        done: []
    });

    const [project, setProject] = useState(Project);
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [file, setFile] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null); // 用于存储选中的任务
    const [newComment, setNewComment] = useState(''); // 用于存储新评论
    const [commentAdd, setCommentAdd] = useState(false); // 用于检测是否需要增加评论
    const [newTask, setNewTask] = useState({ name: '', discription: '', members: '', ddl: '' }); // 用于存储新任务
    const [joinProject, setJoinProject] = useState({ projectId: '', password: '' }); // 用于存储加入项目的信息
    const [taskAdd, setTaskAdd] = useState(false); // 用于检测是否需要增加任务
    const [showCreateProjectForm, setShowCreateProjectForm] = useState(false); // 用于控制创建项目表单的显示
    const [showJoinProjectForm, setShowJoinProjectForm] = useState(false); // 用于控制加入项目表单的显示
    const [statusChange, setStatusChange] = useState(false);
    const [newStatus, setNewStatus] = useState('');

    useEffect(() => {   //初始化
        //从后端获取任务数据
        fetchProject();
        fetchTasks();
    }, []);

    const fetchProject = async () => {
        // document.cookie = "projectId=0; path=/";  // 设置cookie临时调试，之后删除
        //获取cookie
        const projectId = getCookie('projectId');
        const response = await axios.post('http://127.0.0.1:7001/project/getProject', {
            projectId: projectId
        });
        let data = await response.data;
        console.log('Received data:', data); // 添加日志
        setProject(data);
    }

    const fetchTasks = async () => {
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
    const handleCreateProjectFormClose = () => {
        setShowCreateProjectForm(false);
    };

    const handleCreateProjectSubmit = async (projectData) => {
        try {
            const response = await axios.post('http://127.0.0.1:7001/project/create', projectData);
            const data = await response.data;
            console.log('项目已创建:', data);
            document.cookie = `projectId=${data.projectId}; path=/;`;
            // 更新任务状态以反映新项目
            setTasks(data.tasks);
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
            const user = getCookie('username');
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
                fetchProject();
                fetchTasks();
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

    const handleChangeStatus = () => {
        setStatusChange(true);
    };

    const handleStatusChange = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:7001/task/changeStatus', {
                taskId: selectedTask.id,
                newStatus: newStatus
            });
            const data = await response.data;
            console.log('状态已改变:', data); // 添加日志
            // 更新任务状态以反映新状态
            setTasks((prevTasks) => ({
                ...prevTasks,
                [newStatus]: [...prevTasks[newStatus], selectedTask],
                [selectedTask.status]: prevTasks[selectedTask.status].filter((task) => task.id !== selectedTask.id)
            }));
            setSelectedTask((prevSelectedTask) => ({
                ...prevSelectedTask,
                status: newStatus
            })); // 更新选中的任务以反映新状态
            setStatusChange(false); // 关闭状态改变窗口
        } catch (error) {
            console.error('改变状态时出错:', error); // 添加日志
        }
    };

    const handleStatusChangeSubmit = (e) => {
        e.preventDefault();
        if (!newStatus || newStatus === selectedTask.status) {
            alert('请选择新的状态');
            return;
        }
        handleStatusChange();
    };


    const handleStatusChangeCancel = () => {
        setStatusChange(false);
    };

    const handleUploadFile = () => {
        setShowUploadForm(true);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('taskId', selectedTask.id);
            const response = await axios.post('http://127.0.0.1:7001/file/upload', formData);
            const data = await response.data;
            console.log('文件已上传:', data); // 添加日志
            // 更新任务状态以反映新文件
            setTasks((prevTasks) => ({
                ...prevTasks,
                [selectedTask.status]: prevTasks[selectedTask.status].map((task) =>
                    task.id === selectedTask.id ? data.task : task
                )
            }));
            setSelectedTask(data.task); // 更新选中的任务以反映新文件
            setShowUploadForm(false); // 关闭上传窗口
        } catch (error) {
            console.error('上传文件时出错:', error); // 添加日志
        }
    };

    return (
        <div className="agile-board">
            <h1>我的项目看板</h1>
            <h2>项目名称: {project.name}</h2>
            <p>项目id: {project.id}</p>
            <p>项目描述：{project.discription}</p>
            <p>项目成员：{project.members.join(', ')}</p>
            <p>项目加入密码：{project.password}</p>
            <div className="top-right-button-container">
                <button className="top-right-button" onClick={handleTaskAddClick}>添加任务</button>
                <button className="top-right-button" onClick={handleCreateProject}>创建项目</button>
                <button className="top-right-button" onClick={handleJoinProject}>加入/切换项目</button>
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
                        <button onClick={handleChangeStatus}>改变状态</button>
                        <button onClick={handleUploadFile}>上传附件</button>
                        {selectedTask.files && selectedTask.files.length > 0 && (
                            <div className="attachments">
                                <h4>附件:</h4>
                                <ul>
                                    {selectedTask.files.map((file, index) => (
                                        <li key={index}>
                                            <a href={`http://127.0.0.1:7001/file/download?taskId=${selectedTask.id}&filename=${file.fileName}`} download>{file.fileName}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
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

            {showJoinProjectForm && (
                <div className="join-project-overlay">
                    <div className="join-project-container">
                        <h3>加入项目</h3>
                        <p>若已经加入过目标项目，不必输入密码即可打开项目</p>
                        <input type="text" name="projectId" value={joinProject.projectId} onChange={handleJoinProjectChange} placeholder="项目ID" required />
                        <input type="text" name="password" value={joinProject.password} onChange={handleJoinProjectChange} placeholder="项目密码" />
                        <button onClick={handleJoinProjectSubmit}>提交</button>
                        <button onClick={handleJoinProjectFormClose}>取消</button>
                    </div>
                </div>
            )}

            {statusChange && (
                <div className="status-change-overlay">
                    <div className="status-change-container">
                        <h3>改变状态</h3>
                        <form onSubmit={handleStatusChangeSubmit}>
                            <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                                <option value="todo">待办</option>
                                <option value="inProgress">进行中</option>
                                <option value="done">已完成</option>
                            </select>
                            <button type="submit">提交</button>
                            <button onClick={handleStatusChangeCancel}>取消</button>
                        </form>
                    </div>
                </div>
            )}

            {showUploadForm && (
                <div className="upload-overlay">
                    <div className="upload-container">
                        <h3>上传附件</h3>
                        <p>请选择要上传的文件:(不超过10Mb)</p>
                        <input type="file" onChange={handleFileChange} required />
                        <button onClick={handleFileSubmit}>提交</button>
                        <button onClick={() => setShowUploadForm(false)}>取消</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MainPage;
