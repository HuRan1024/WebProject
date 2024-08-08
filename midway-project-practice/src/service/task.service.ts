import { Project } from "./project.service";
import * as fs from 'fs';

export class Task {
    id: number;
    name: string;
    discription: string;
    members: string[];
    ddl: string;
    status: string;
    projectBelonged: Project;
    comments: string[];

    constructor(id: number, name: string, discription: string, members: string[], ddl: string, status: string, projectBelonged: Project, comments: string[]) {
        this.id = id;
        this.name = name;
        this.discription = discription;
        this.members = members;
        this.ddl = ddl;
        this.status = status;
        this.projectBelonged = projectBelonged;
        this.comments = comments;
    }

    buildATaskString(): string {
        let result: string = this.id.toString() + '$' + this.name + '$' + this.discription + '$'
            + this.members.join(',') + '$' + this.ddl + '$' + this.status + '$' + this.projectBelonged.name + '$' + this.comments.join('|');
        return result;
    }

    async storeATask() {  // 加至文件末尾
        fs.readFile('./src/service/data/task.txt', 'utf-8', (err, fileContent) => {
            if (err) {
                console.error('读取文件时出错:', err);
                return false;
            } else {
                const data = fileContent.split('\n');
                this.id = data.length;
                let result: string = this.buildATaskString();
                fs.appendFile('./src/service/data/task.txt', result, 'utf-8', (err) => {
                    console.error('写入文件时发生错误:', err);
                    return false;
                })
            }
        })
        return true;
    }

    async changeATask() {
        fs.readFile('./src/service/data/task.txt', 'utf-8', (err, fileContent) => {
            if (err) {
                console.error('读取文件时出错:', err);
                return false;
            } else {
                const data = fileContent.split('\n');
                let result: string = this.buildATaskString();
                data[this.id] = result;
                const content = data.join('\n');
                fs.writeFile('./src/service/data/task.txt', content, 'utf-8', (err) => {
                    console.error('写入文件时发生错误:', err);
                    return false;
                })
            }
        })
        return true;
    }

    static async getATask(id: string): Promise<Task> {
        fs.readFile('./src/service/data/project.txt', 'utf-8', async (err, fileContent) => {
            if (err) {
                console.error('读取文件时出错:', err);
                return null;
            } else {
                const datas = fileContent.split('\n');
                for (let data in datas) {
                    let aData = data.split('$');
                    if (aData[0] == id) {
                        let id = Number(aData[0]);
                        let name = aData[1];
                        let discription = aData[2];
                        let members = aData[3].split(',');
                        let ddl = aData[4];
                        let status = aData[5];
                        let projectBelonged = await Project.getAProject(aData[6]);
                        let comments = aData[7].split('|');
                        return new Task(id, name, discription, members, ddl, status, await projectBelonged, comments);
                    }
                }
            }
        })
        return null;
    }
}