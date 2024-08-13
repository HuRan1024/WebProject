import { MidwayConfig } from '@midwayjs/core';
// import { uploadWhiteList } from '@midwayjs/upload';
import { tmpdir } from 'os';
import { join } from 'path';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1721542135536_9451',
  koa: {
    port: 7001,
  },
  cors: {
    origin: '*',
  },
  upload: {
    // mode: UploadMode, 默认为file，即上传到服务器临时目录，可以配置为 stream
    mode: 'file',
    // fileSize: string, 最大上传文件大小，默认为 10mb
    fileSize: '10mb',
    // whitelist: string[]，文件扩展名白名单
    whitelist: ['image/jpeg', 'image/png', 'image/gif', '.pdf', '.txt'],
    // tmpdir: string，上传的文件临时存储路径
    tmpdir: join(tmpdir(), 'midway-upload-tmp'),
    // cleanTimeout: number，上传的文件在临时目录中多久之后自动删除，默认为 5 分钟
    cleanTimeout: 0,
    // base64: boolean，设置原始body是否是base64格式，默认为false，一般用于腾讯云的兼容
    base64: false,
    // 仅在匹配路径到 /api/upload 的时候去解析 body 中的文件信息
    match: /.*/,
  },
  staticFile: {
    dirs: {
      default: {
        prefix: '/',
        alias: {
          '/': '/index.html',
        },
      },
    }
  },
} as MidwayConfig;