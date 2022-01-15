const koa = require("koa");
const bodyParser = require("koa-bodyparser");
const router = require('./router/index')
const cors = require('koa2-cors')
const logger = require('koa-logger')
const storage = require('./controller/articles')

const app = new koa();
const time = 1000 * 60 * 60; // 定时爬取文章的时间
app.use(logger())
app.use(cors())
app.use(bodyParser());


//一个小时爬取一次文章标题
setInterval(() => {
  storage()
  console.log('正在爬取文章标题....');
}, time)


app.use(router.routes(),router.allowedMethods())

const port = process.allowedNodeEnvironmentFlags.PORT || 5000;

app.listen(port, () => {
  console.log(`服务在http://localhost:${port}启动了...`);
});