import { Body, Controller, Inject, Post } from '@midwayjs/core';
import { UserService } from '../service/user.service';


export class UserDto {
    username: string;
    password: string;
}

@Controller('/register')
export class LoginController {
    @Inject()
    userService: UserService;

    @Post('/')
    async crreateUser(@Body() form:UserDto) {
        try {
            // 调用 UserService 来验证用户名和密码
            console.log(form.username);
            const isValid = await this.userService.CreateAUser(form.username, form.password);
            if (isValid) {
                return {
                    success: true,
                    message: '注册成功',
                };
            } else {
                return {
                    success: false,
                    message: '注册失败，用户名已被注册',
                };
            }
        } catch (error) {
            return {
                success: false,
                message: '服务器错误',
            };
        }
    }
}