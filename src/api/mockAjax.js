// 对于axios进行二次封装
import axios from 'axios';

// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import "nprogress/nprogress.css"
const requests = axios.create({
    // 基础路径路径中会加api
    baseURL: "/mock",
    // 代表请求超时手机5秒
    timeout: 5000,
});

// 请求拦截器
requests.interceptors.request.use((config) => {
    nprogress.start()
    return config
});

// 响应拦截器
requests.interceptors.response.use((res) => {
    nprogress.done()
    return res.data
}, (error) => {
    return Promise.reject(error)
});

export default requests