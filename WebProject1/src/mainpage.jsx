import React, { useState, useEffect } from 'react';
import './AgileBoard.css'; // 假设您会创建一个CSS文件来定义样式
import axios from 'axios';

const AgileBoard = () => {
    const [tasks, setTasks] = useState({
        todo: [],
        inProgress: [],
        done: []
    });

    const [selectedTask, setSelectedTask] = useState(null); // 用于存储选中的任务
    const [newComment, setNewComment] = useState(''); // 用于存储新评论
    const [commentAdd, setCommentAdd] = useState(false); // 用于检测是否需要增加评论

    useEffect(() => {
        //模拟从后端获取任务数据
        const fetchTasks = async () => {
            const response = await axios.post('http://127.0.0.1:7001/project/getTasks', {
                projectName: 'test'
            });
            const data = await response.data;
            console.log('Received data:', data); // 添加日志
            setTasks(data);
        };

        fetchTasks();
    }, []);

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
    
    const handleSubmit = async () => {
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

    return (
        <div className="agile-board">
            <h1>我的项目看板</h1>
            <div className="top-right-button-container">
                <button className="top-right-button">添加任务</button>
            </div>
            <div className="swimlanes">
                <div className="swimlane">
                    <div className="swimlane-header">
                        <h3>待办</h3>
                    </div>
                    <div className="cards">
                        {tasks.todo.map((task) => (
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
                        {tasks.inProgress.map((task) => (
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
                        {tasks.done.map((task) => (
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
                        <textarea value={newComment} onChange={handleCommentChange} />
                        <button onClick={handleSubmit}>提交</button>
                        <button onClick={() => setCommentAdd(false)}>取消</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AgileBoard;
