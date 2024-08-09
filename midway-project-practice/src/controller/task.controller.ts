import { Body, Controller, Inject, Post } from '@midwayjs/core';
import { Task } from '../service/task.service';
import { Project } from '../service/project.service';
import { Context } from '@midwayjs/koa';

export class TaskDto {
    name: string;
    discription: string;
    members: string;   // 不同成员之间需要以','为分割
    ddl: string;
}

@Controller('/task')
export class TaskController {
    @Inject()
    ctx: Context;

    @Post('/create')
    async createTask(@Body() form: TaskDto) {
        let projectName = this.ctx.cookies.get('project');
        let project: Project = await Project.getAProject(projectName);
        let task: Task = new Task(0, form.name, form.discription, form.members.split(','), form.ddl, 'undone', projectName, []);
        await task.createATask();
        project.tasks.push(task.id.toString());
        if (await project.changeAProject()) {
            return {
                status: 'success',
                message: '创建任务成功'
            };
        } else {
            return {
                status: 'failed',
                message: '创建任务失败'
            };
        }
    }
}