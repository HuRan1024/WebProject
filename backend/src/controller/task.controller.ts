import { Body, Controller, Post } from '@midwayjs/core';
import { Task } from '../service/task.service';
import { Project } from '../service/project.service';

export class TaskDto {
    projectId: string;
    name: string;
    discription: string;
    members: string;   // 不同成员之间需要以','为分割
    ddl: string;
}

@Controller('/task')
export class TaskController {

    @Post('/create')
    async createTask(@Body() form: TaskDto) {
        let project: Project = await Project.getAProject(form.projectId);
        let task: Task = new Task(0, form.name, form.discription, form.members.split(','), form.ddl, 'todo', form.projectId, []);
        await task.createATask();
        project.tasks.push(task.id.toString());
        if (await project.changeAProject()) {
            return {
                status: 'success',
                message: '创建任务成功',
                task: task
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

    @Post('/changeStatus')
    async changeStatus(@Body() form: { taskId: string, newStatus: string }) {
        let task: Task = await Task.getATask(form.taskId);
        task.status = form.newStatus;
        if (await task.changeATask()) {
            return {
                message: '修改状态成功',
                status: task.status
            };
        }
    }
}