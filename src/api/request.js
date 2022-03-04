// 对于axios进行二次封装
import axios from 'axios';

import store from '@/store';

// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import "nprogress/nprogress.css"

import { getToken } from '@/store/user/token';
const requests = axios.create({
    // 基础路径路径中会加api
    baseURL: "/api",
    // 代表请求超时手机5秒
    timeout: 5000,
});

// 请求拦截器
requests.interceptors.request.use((config) => {
    if (store.state.detail.uuid_token) {
        config.headers.userTempId = store.state.detail.uuid_token
    }
    if(getToken()){
        config.headers.token = getToken()
    }
    nprogress.start()
    return config
});

// 响应拦截器
requests.interceptors.response.use((res) => {
    nprogress.done()
    return res.data
}, (error) => {
    return Promise.reject(new Error('faile'))
});

export default requests