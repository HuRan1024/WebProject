import * as fs from 'fs';

export class Project {
    id: number;  // 存储在文本中的第几行, 从零开始计算
    name: string;
    discription: string;
    members: string[];
    tasks: string[] = [];
    password: string; //用于成员加入项目的验证

    constructor(id: number, name: string, discription: string, members: string[], tasks: string[], password: string) {
        this.name = name;
        this.discription = discription;
        this.members = members;
        this.password = password;
        this.tasks = tasks;
        this.id = id;
    }

    buildAProjectString(): string {
        let result: string = this.id.toString() + ';' + this.name + ';' + this.discription + ';' + this.members.join(',') + ';' + this.tasks.join(',');  // 缺陷：无法在discription中使用';'
        result += ';' + this.password + '\n';
        return result;
    }

    async changeAProject() {
        fs.readFile('./src/service/data/project.txt', 'utf-8', (err, fileContent) => {
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
                /*删除data中的空行*/
                data.forEach((item, index) => {
                    if (item === '') {
                        data.splice(index, 1);
                    }
                })
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
        return new Promise((resolve, reject) => {
            fs.readFile('./src/service/data/project.txt', 'utf-8', async (err, fileContent) => {
                if (err) {
                    console.error('读取文件时出错:', err);
                    reject(null);
                } else {
                    const datas = fileContent.split('\n');
                    /*删除data中的空行*/
                    datas.forEach((item, index) => {
                        if (item === '') {
                            datas.splice(index, 1);
                        }
                    })
                    for (let data of datas) {
                        let aData = data.split(';');
                        if (aData[1] == name) {
                            let id = Number(aData[0]);
                            let name = aData[1];
                            let discription = aData[2];
                            let members = aData[3].split(',');
                            let tasks: string[] = [];
                            if (aData[4] != '') {
                                let task = aData[4].split(',')
                                task.forEach((item, index) => {
                                    if (item === '') {
                                        task.splice(index, 1);
                                    }
                                })
                                tasks = task;
                            }
                            let password = aData[5];
                            resolve(new Project(id, name, discription, members, tasks, password));
                        }
                    }
                    resolve(null);
                }
            });
        });
    }
}
