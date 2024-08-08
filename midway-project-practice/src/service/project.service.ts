import { T } from "vitest/dist/reporters-B7ebVMkT";
import { Task } from "./task.service";
import * as fs from 'fs';

export class Project {
    id: number;  // 存储在文本中的第几行, 从零开始计算
    name: string;
    discription: string;
    members: string[];
    tasks: Set<Task> = null;
    password: string; //用于成员加入项目的验证

    constructor(id: number, name: string, discription: string, members: string[], tasks:Set<Task>, password: string) {
        this.name = name;
        this.discription = discription;
        this.members = members;
        this.password = password;
        this.tasks = tasks;
        this.id = id;
    }

    buildAProjectString(): string {
        let result: string = this.id.toString() + ';' + this.name + ';' + this.discription + ';' + this.members.join(',') + ';';  // 缺陷：无法在discription中使用'
        for (const task of this.tasks) {
            result += task.id + ',';
        }
        result += this.password;
        return result;
    }

    async changeAProject() {
        fs.readFile('./src/service/data/project.txt', 'utf-8', (err, fileContent) => {
            if (err) {
                console.error('读取文件时出错:', err);
                return false;
            } else {
                const data = fileContent.split('\n');
                let result: string = this.buildAProjectString();
                data[this.id] = result;
                const content = data.join('\n');
                fs.writeFile('./src/service/data/project.txt', content, 'utf-8', (err) => {
                    console.error('写入文件时发生错误:', err);
                    return false;
                })
            }
        })
        return true;
    }

    async storeAProject(): Promise<boolean> {  // 用于创建项目时使用
        fs.readFile('./src/service/data/project.txt', 'utf-8', (err, fileContent) => {
            if (err) {
                console.error('读取文件时出错:', err);
                return false;
            } else {
                const data = fileContent.split('\n');
                this.id = data.length;
                let result: string = this.buildAProjectString();
                fs.appendFile('./src/service/data/project.txt', result, 'utf-8', (err) => {
                    console.error('写入文件时发生错误:', err);
                    return false;
                })
            }
        })
        return true;
    }

    static async getAProject(name: string): Promise<Project> {
        fs.readFile('./src/service/data/project.txt', 'utf-8', async (err, fileContent) => {
            if(err) {
                console.error('读取文件时出错:', err);
                return null;
            }else{
                const datas = fileContent.split('\n');
                for(let data in datas) {
                    let aData = data.split(';');
                    if (aData[1] == name){
                        let id = Number(aData[0]);
                        let name = aData[1];
                        let discription = aData[2];
                        let members = aData[3].split(',');
                        let tasks: Set<Task>;
                        for(let task_id in aData[4].split(',')) {
                            tasks.add(await Task.getATask(task_id));
                        }
                        let password = aData[5];
                        return new Project(id, name, discription, members, tasks, password);
                    }
                }
            }
        })
        return null;
    }

}