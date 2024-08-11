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
        if (newProject.storeAProject()) {
            return {
                status: 'success',
                message: '创建成功'
            };
        } else {
            return {
                status: 'failed',
                message: '创建失败'
            };
        }
    }

    @Post('/getTasks')
    async getTasks(@Body() form: { projectName: string }) {
        let projectName = form.projectName;
        let project: Project = await Project.getAProject(projectName);
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


}