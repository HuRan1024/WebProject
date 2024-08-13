import {
  Inject,
  Provide,
  ServerlessTrigger,
  ServerlessTriggerType,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

@Provide()
export class HelloHTTPService {
  @Inject()
  ctx: Context;

  @ServerlessTrigger(ServerlessTriggerType.HTTP, {
    path: '/public/*',
    method: 'get',
  })
  async handleStaticFile() {
    // 这个函数可以没有方法体，只是为了让网关注册一个额外的路由
  }
}