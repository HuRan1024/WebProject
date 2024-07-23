import { Controller, Get, Query, Inject } from '@midwayjs/core';
import { UserService } from '../service/user.service';

@Controller('/')
export class HomeController {
  @Get('/')
  async home1(): Promise<string> {
    return 'I love niuniu!';
  }
  @Get('/test')
  async home(): Promise<string> {
    return 'Hello Midwayjs!';
  }

  @Inject()
  userService: UserService;

  @Get('/get_user')
  async getUser(@Query('uid') uid) {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }
}
