import { Body, Controller, Post } from '@midwayjs/core';
import { Project } from '../service/project.service';

export class ProjectDto {
    name: string;
    discription: string;
    members: string;   // 不同成员之间需要以','为分割
    password: string;
}

@Controller('/project')
export class projectController {

    @Post('/create')
    async createANewProject(@Body() form: ProjectDto) {
        let newProject = new Project(0, form.name, form.discription, form.members.split(','), [], form.password)
        if (await newProject.storeAProject()) {
            return {
                status: 'success',
                message: '创建成功',
                projectId: newProject.id,
                tasks: {
                    todo: [],
                    inProgress: [],
                    done: []
                }
            };
        } else {
            return {
                status: 'failed',
                message: '创建失败'
            };
        }
    }

    @Post('/getTasks')
    async getTasks(@Body() form: { projectId: string }) {
        let id = form.projectId;
        let project: Project = await Project.getAProject(id);
        let tasks = await project.getTasks();

        let result = tasks.reduce((acc, task) => {
            if (task.status === 'todo') {
                acc.todo.push(task);
            } else if (task.status === 'inProgress') {
                acc.inProgress.push(task);
            } else if (task.status === 'done') {
                acc.done.push(task);
            }
            return acc;
        }, {
            todo: [],
            inProgress: [],
            done: []
        });

        return result;
    }

    @Post('/getProject')
    async getProject(@Body() form: { projectId: string }) {
        let id = form.projectId;
        let project: Project = await Project.getAProject(id);
        return project;
    }

    @Post('/join')
    async joinProject(@Body() form: { projectId: string, password: string, user: string }) {
        let id = form.projectId;
        let password = form.password;
        let project: Project = await Project.getAProject(id);

        if (project == null) {
            return {
                status: 'failed',
                message: '项目不存在'
            }
        } else {
            if (project.password === password) {
                if (!project.members.includes(form.user)) {
                    project.members.push(form.user);
                }
                if (await project.changeAProject()) {
                    return {
                        status: 'success',
                        message: '加入成功',
                        newMember: form.user
                    }
                }
            } else {
                return {
                    status: 'failed',
                    message: '密码错误'                    
                }
            }
        }
    }

}