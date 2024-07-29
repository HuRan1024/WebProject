import { Body, Controller, Inject, Post } from '@midwayjs/core';
import { UserService } from '../service/user.service';


export class UserDto {
    username: string;
    password: string;
}

@Controller('/login')
export class LoginController {
    @Inject()
    userService: UserService;

    @Post('/')
    async checkUser(@Body() form:UserDto) {
        try {
            // 调用 UserService 来验证用户名和密码
            console.log(form.username);
            const isValid = await this.userService.checkCredentials(form.username, form.password);
            if (isValid) {
                return {
                    success: true,
                    message: '登录成功',
                };
            } else {
                return {
                    success: false,
                    message: '用户名或密码错误',
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