import React, { useState } from 'react';
import './createProjectForm.css'; // 引入自定义的CSS文件

const CreateProjectForm = ({ onClose, onCreate }) => {
    const [name, setProjectName] = useState('');
    const [discription, setDiscription] = useState('');
    const [members, setMembers] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        onCreate({ name, discription, members, password });
        onClose();
    };

    return (
        <div className="create-project-overlay">
            <div className="create-project-container">
                <h3>创建项目</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="项目名称"
                        required
                    />
                    <textarea
                        value={discription}
                        onChange={(e) => setDiscription(e.target.value)}
                        placeholder="项目描述"
                        required
                    />
                    <input
                        type="text"
                        value={members}
                        onChange={(e) => setMembers(e.target.value)}
                        placeholder="成员名称，用英文','分割"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="密码"
                        required
                    />
                    <button type="submit">创建</button>
                    <button type="button" onClick={onClose}>取消</button>
                </form>
            </div>
        </div>
    );
};

export default CreateProjectForm;
