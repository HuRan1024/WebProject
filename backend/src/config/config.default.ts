import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1721542135536_9451',
  koa: {
    port: 7001,
  },
  cors:{
    origin:'*',
  },
  mongoose: {
    client: {
        url: 'mongodb://localhost:27017/yourDatabaseName', // 替换为你的数据库URL
        options: {},
    },
},
} as MidwayConfig;