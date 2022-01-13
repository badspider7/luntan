const cheerio = require("cheerio");
const axios = require("axios");
const dayjs = require('dayjs');
const { Article } = require("./user");

const baseURL = "http://en.people.cn/";

let title = []; // 文章标题
let titleHref = []; //文章链接
const time = 1000 * 60 * 60; // 定时爬取文章的时间

// 格式化当前时间
let now = dayjs().format('YYYY/MM/DD HH:mm:ss')

// 获取每日新闻
async function getNews() {
  const { data } = await axios({
    method: "get",
    url: baseURL,
  });
  const $ = cheerio.load(data);
  // 文章标题
  $(".fr .foreign_list1 li").each(function (i, elem) {
    title[i] = $(this).text();
  });
  // 文章链接
  $(".fr .foreign_list1 li a").each(function (i, elem) {
    titleHref[i] = `${baseURL}${$(this).attr("href")}`;
  });
  return {
    title,
    titleHref,
  };
}


// 把文章标题存入数据库
async function storage() {
  const { title, titleHref } = await getNews()

  let arr = title.filter(async function (item, index, array) {
    const Exist = await Article.find({ title: item })
    if (Exist.length === 0) {
      // 文章标题不存在
      const article = new Article({
        title: item,
        titleUrl: titleHref[index],
        time: now
      })
      console.log('文章存储成功');
      article.save()
    }
    else {
      // 文章已经在数据库中了
      console.log('文章已经存在');
    }
    return true
  })

  /*  仅在测试时用
  // 删除所有文章标题
  // Article.deleteMany({}).then(res=>console.log(res))
  */
}

// 一小时爬取一次标题
setTimeout(() => {
  storage();
}, time);


