const axios = require('axios')

// 高德地图的公钥
const key = '4a351f4e36bc504d00aff3e1b70f5652'

// 得到ip
async function getIP() {
    const {data} = await axios({
        method: 'get',
        url:'http://httpbin.org/ip'
    })
    const ip = data.origin
    return ip
}

// 将ip转换为地址
async function getAdress() {
    const ip = await getIP()
    const {data} = await axios({
        url: `https://restapi.amap.com/v5/ip?ip=${ip}&type=4&key=${key}`,
        method: "GET",
    })
    return data
}

// 通过地址得到天气
async function getWeather(chengshi){
    const { data:res } = await axios({
        method: 'get',
        url: `https://api.seniverse.com/v3/weather/now.json?key=S8iUfojW28_QulLmE&location=${chengshi}&language=zh-Hans&unit=c`
    })
    return res
}


module.exports = {
    getAdress,
    getWeather,
}

