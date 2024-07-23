import * as axios from 'axios';

const client = axios.default;

const base = 'http://127.0.0.1:7001/get_user';  //请求服务器与前端资源不在同一端口下，会发生跨域错误。
async function fetchUserData(){
    const result = await client.get(base);
}