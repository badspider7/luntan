const koa = require("koa");
const bodyParser = require("koa-bodyparser");
const router = require('./router/index')
const cors = require('koa2-cors')
const logger = require('koa-logger')

const app = new koa();
app.use(logger())
app.use(cors())
app.use(bodyParser());

app.use(router.routes(),router.allowedMethods())

const port = process.allowedNodeEnvironmentFlags.PORT || 5000;

app.listen(port, () => {
  console.log(`服务在http://localhost:${port}启动了...`);
});