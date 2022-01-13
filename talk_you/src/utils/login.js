import request from './request'

// 登录接口
export const login = data => {
    return request({
        method: "post",
        url: "/login",
        data
    })
}

// 注册接口
export const register = data => {
    return request({
        method: 'post',
        url: "/register",
        data
    })
}


// 获取当前地点的天气
export const getWeather = () => {
    return request({
        method: "get",
        url: "/weather"
    })
}

// 一言接口
export const getSlogn = () => {
    return request({
        method: 'get',
        url:'/slogn'
    })
}


// 文章接口
export const articles = () => {
    return request({
        method: "get",
        url: "/article"
    })
}