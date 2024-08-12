import { Controller, Get, Inject } from '@midwayjs/core';
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

}
