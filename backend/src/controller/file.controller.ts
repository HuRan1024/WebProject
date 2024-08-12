import { Controller, Inject, Post, Files, Fields, Body } from '@midwayjs/core';
import { Context } from 'midway';
import { Task, MyFile } from '../service/task.service';
import * as fs from 'fs';
import path = require('path');

@Controller('/file')
export class FileController {

    @Inject()
    ctx: Context;

    @Post('/upload')
    async upload(@Files() files, @Fields() fields) {
        let taskId = fields.taskId;
        let task = await Task.getATask(taskId);
        if (task) {
            for (let file of files) {
                if (file.filename != '') {
                    console.log(file.filename, file.fileData);
                    task.files.push(new MyFile(file.filename, file.data));
                }
            }
            task.changeATask();
        }
        return {
            files,
            fields,
            task
        }
    }

    @Post('/download')
    async download(@Body('data') data: string) {
        await console.log(data);
        const filePath = path.resolve(data); // 确保路径是绝对路径
        console.log(filePath);

        // 检查文件是否存在
        try {
            await fs.promises.access(filePath, fs.constants.F_OK);
        } catch (err) {
            return this.ctx.status = 404;
        }

        // 设置响应头
        const fileExt = path.extname(filePath);
        this.ctx.set('Content-Type', `application/${fileExt === '.pdf' ? 'pdf' : 'octet-stream'}`);
        this.ctx.set('Content-Disposition', `attachment; filename="${path.basename(filePath)}"`);

        console.log('Starting to read file:', filePath);
        // 读取文件并返回
        const fileStream = fs.createReadStream(filePath);
        console.log('File read successfully:', filePath);

        console.log('Starting to send file:', filePath);
        fileStream.pipe(this.ctx.res);
        console.log('File sent successfully:', filePath);

    }
}