import * as fs from 'fs';

export class Task {
    id: number;
    name: string;
    discription: string;
    members: string[];
    ddl: string;
    status: string;
    projectBelonged: string;
    comments: string[] = new Array<string>();

    constructor(id: number, name: string, discription: string, members: string[], ddl: string, status: string, projectBelonged: string, comments: string[]) {
        this.name = name;
        this.discription = discription;
        this.members = members;
        this.ddl = ddl;
        this.status = status;
        this.projectBelonged = projectBelonged;
        this.comments = comments;
        this.id = id;
    }

    buildATaskString(): string {
        let result: string = this.id.toString() + '$' + this.name + '$' + this.discription + '$'
            + this.members.join(',') + '$' + this.ddl + '$' + this.status + '$' + this.projectBelonged + '$' + this.comments.join('|') + '\n';
        return result;
    }

    async createATask() {
        return new Promise((resolve, reject) => {
            fs.readFile('./src/service/data/task.txt', 'utf-8', (err, fileContent) => {
                if (err) {
                    console.error('读取文件时出错:', err);
                    reject(false);
                } else {
                    const data = fileContent.split('\n');
                    /*删除data中的空行*/
                    data.forEach((item, index) => {
                        if (item === '') {
                            data.splice(index, 1);
                        }
                    })
                    this.id = data.length;
                    let result: string = this.buildATaskString();
                    fs.appendFile('./src/service/data/task.txt', result, 'utf-8', (err) => {
                        if (err) {
                            console.error('写入文件时发生错误:', err);
                            reject(false);
                        } else {
                            resolve(true);
                        }
                    })
                }
            });
        });
    }

    async changeATask() {
        fs.readFile('./src/service/data/task.txt', 'utf-8', (err, fileContent) => {
            if (err) {
                console.error('读取文件时出错:', err);
                return false;
            } else {
                const data = fileContent.split('\n');
                /*删除data中的空行*/
                data.forEach((item, index) => {
                    if (item === '') {
                        data.splice(index, 1);
                    }
                })
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
        fs.readFile('./src/service/data/task.txt', 'utf-8', async (err, fileContent) => {
            if (err) {
                console.error('读取文件时出错:', err);
                return null;
            } else {
                const datas = fileContent.split('\n');
                /*删除data中的空行*/
                datas.forEach((item, index) => {
                    if (item === '') {
                        datas.splice(index, 1);
                    }
                })
                for (let data of datas) {
                    let aData = data.split('$');
                    if (aData[0] == id) {
                        let id = Number(aData[0]);
                        let name = aData[1];
                        let discription = aData[2];
                        let members = aData[3].split(',');
                        let ddl = aData[4];
                        let status = aData[5];
                        let projectBelonged = aData[6];
                        let comments = aData[7].split('|');
                        return new Task(id, name, discription, members, ddl, status, projectBelonged, comments);
                    }
                }
            }
        })
        return null;
    }
}