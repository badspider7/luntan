const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/luntan').then(res => {
    console.log('数据库连接成功')
}, err => console.log(err))

// 创建集合规则
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: Number,
        required: true
    }
})

// 文章标题集合规则
const TitleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    titleUrl: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
})

// 使用集合
const User = mongoose.model("user", UserSchema)
const Article = mongoose.model('Article', TitleSchema)


module.exports = {
    User,
    Article
}