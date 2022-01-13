import axios from 'axios'
import nProgress from 'nprogress'

const request = axios.create({
    baseURL: 'http://localhost:5000'
})


// 请求拦截器
request.interceptors.request.use((config) => {
    // 进度条开始
    nProgress.start()
    return config
})

// 响应拦截器
request.interceptors.response.use((res) => {
    // 进度条结束
    nProgress.done()
    return res.data
}, (error) => {
    // 响应失败的回调
    return Promise.reject(new Error('fail'))
})

export default request