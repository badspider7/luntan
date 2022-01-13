const axios = require('axios')

// 一言接口
async function getSlogn() {
    const {data} = await axios({
        method: "get",
        url: 'https://v1.hitokoto.cn?c=d&encode=json&max_length=20'
    })
   return data
}

module.exports = getSlogn