import { Provide } from '@midwayjs/core';
import * as fs from 'fs';
import * as util from 'util';

@Provide()
export class UserService {
  private filereader = util.promisify(fs.readFile);

  public async checkCredentials(username: string, password: string): Promise<boolean> {
    try {
      const data = await this.filereader('./src/service/data/user.txt', 'utf-8');
      const users = data.split('\n');

      for (const user of users) {
        const [StoredUserName, StoredPassword] = user.split(',');
        if (username == StoredUserName) {
          if (password == StoredPassword) {
            return true;
          } else {
            return false;
          }
        }
      }
    } catch (error) {
      if (error.code) {
        console.error(`系统错误: ${error.code}`);
      }
      console.log("服务器错误！")
      throw error;
    }
  }

  public async CreateAUser(username: string, password: string):Promise<boolean> {
    try {
      const data = await this.filereader('./src/service/data/user.txt', 'utf-8');
      const users = data.split('\n');

      for (const user of users) {
        const [StoredUserName] = user.split(',');
        if (username == StoredUserName) {
          return false;
        }
      }
    } catch (error) {
      if (error.code) {
        console.error(`系统错误: ${error.code}`);
      }
      console.log("服务器错误！")
      throw error;
    }  //检验是否重名

    const content = `${username},${password}\n`
    fs.appendFile('./src/service/data/user.txt', content, 'utf8', (err) => {
      if (err) {
        console.error('写入文件时发生错误:', err);
        return false;
      }
      return true;
    });
    return true;
  }
}
