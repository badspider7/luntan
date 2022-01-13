const Router = require("koa-router");
const weather = require("../utils/weather");
const slogn = require('../utils/slogn')
const jwt = require("jsonwebtoken");
const { User, Article } = require("../controller/user");

const router = new Router();
const secretOrKey = "secret";

/**
 * @router GET /weather
 * @desc  天气接口
 * @access 接口公开
 */
router.get("/weather", async (ctx) => {
  const ip = await weather.getAdress();
  let city = encodeURI(ip.city);
  const { results: end } = await weather.getWeather(city);
  ctx.body = end[0];
});

/**
 * @route POST /register
 * @desc 注册接口
 * @access 接口公开
 */
router.post("/register", async (ctx) => {
  // 判断邮箱是否存在
  const email = await User.find({ email: ctx.request.body.email });
  if (email.length > 0) {
    ctx.status = 500;
    ctx.body = { email: "邮箱已经被占用了", code: 500 };
  } else {
    const newUser = new User({
      username: ctx.request.body.username,
      email: ctx.request.body.email,
      password: ctx.request.body.password,
    });
    // 存在到数据库
    await newUser
      .save()
      .then((user) => (ctx.body = user))
      .catch((err) => console.log(err));

    // 返回json 数据
    const payload = { id: newUser.id, name: newUser.name };
    const token = jwt.sign(payload, secretOrKey, { expiresIn: 3600 });
    ctx.body = { data: newUser, token: "Bearer " + token };
  }
});

/**
 * @route POST /login
 * @desc 登录接口
 * @access 接口公开
 */
router.post("/login", async (ctx) => {
  // 查询，看看数据库中是否有数据
  const findResult = await User.find({ email: ctx.request.body.email });
  const user = findResult[0];
  const password = parseInt(ctx.request.body.password);
  const username = ctx.request.body.username;
  //判断
  if (findResult.length === 0) {
    ctx.status = 404;
    ctx.body = { email: "用户不存在", code: 404 };
  } else {
    // 验证密码
    if (password === user.password && username === user.username) {
      // 返回token
      const payload = { id: user.id, name: user.name };
      const token = jwt.sign(payload, secretOrKey, { expiresIn: 3600 });
      ctx.status = 200;
      ctx.body = {
        success: true,
        token: "Bearer " + token,
        code: 200,
        data: user,
      };
    } else {
      ctx.status = 400;
      ctx.body = { password: "密码或用户名错误", code: 400 };
    }
  }
});

/**
 * @router GET /slogn
 * @desc 一言接口
 * @access 接口公开
 */
router.get("/slogn", async (ctx) => {
  const data = await slogn()
  ctx.body = data
});


/**
 * @route GET /articles
 * @desc 文章接口
 * @access 接口公开
 */
// router.get('/articles', async (ctx) => {
//   const data = await getNews()
//   console.log(data);
//   ctx.body = data
// })
router.get('/article', async ctx => {
  const data = await Article.find().select('title titleUrl -_id')
  ctx.body = data
})

module.exports = router;
