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

    @Post('/addComment')
    async addComment(@Body() form: { taskId: string, comment: string }) {
        let task: Task = await Task.getATask(form.taskId);
        task.comments.push(form.comment);
        /*删除comments中的所有''*/
        task.comments = task.comments.filter((item) => item !== '');
        if (await task.changeATask()) {
            return {
                status: 'success',
                message: '添加评论成功',
                comments: task.comments
            };
        } else {
            return {
                status: 'failed',
            }
        }
    }
}