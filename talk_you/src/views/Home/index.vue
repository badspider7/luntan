<template>
  <div id="Home">
    <!-- 头部 -->
    <div class="header" v-show="isShow">
      <div class="logo">
        <img src="./images/author.gif" alt="头像" title="头像" />
        <span class="slogan">T*YOU</span>
      </div>
      <div class="search">
        <input type="text" placeholder="输入你要查询的文章" />
        <button>
          <span>
            <i class="iconfont icon-search"></i>
          </span>
        </button>
      </div>
      <div class="right">
        <div class="weather">{{ city }}&nbsp;|&nbsp;{{ temperature }}℃</div>
        <div class="login">
          <router-link class="login-button" to="/login" v-show="!token"
            >登录/注册</router-link
          >
          <div v-show="token" style="color: #fff">
            <span>{{name}}</span
            >/
            <span
              ><a href="#" style="color: #fff" @click="onLoginOut"
                >退出</a
              ></span
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 下滑到一定的距离就开始转换 -->
    <div class="header" v-show="!isShow">
      <div class="logo">
        <img src="./images/author.gif" alt="头像" title="头像" />
        <span class="slogan">T*YOU</span>
      </div>
      <div class="slogn">
        <span>{{ slogn }}</span>
      </div>
      <div class="search">
        <input type="text" placeholder="输入你要查询的文章" />
        <button>
          <span>
            <i class="iconfont icon-search"></i>
          </span>
        </button>
      </div>
    </div>
    <!-- 轮播图 -->
    <div class="carousel">
      <el-carousel trigger="click" height="400px">
        <el-carousel-item v-for="(pic, index) in pics" :key="index">
          <img :src="pic.url" alt="heihei" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 文章 -->
    <Pages />
    <!-- 评论 -->
    <comments/>
  </div>
</template>

<script>
import Pages from "../pages/index.vue";
import Comments from '../comments/index.vue'
import { mapState } from "vuex";
import { getWeather, getSlogn } from "@/utils/login";

export default {
  name: "Home",
  components: { Pages,Comments },
  computed: {
    ...mapState({
      token: (state) => state.login.token,
      name: (state) => state.login.data["username"],
    }),
  },
  data() {
    return {
      temperature: "",
      city: "",
      slogn: "",
      isShow: true,
      pics: [
        { url: require("./images/school.jpg") },
        { url: require("./images/小雪.png") },
        { url: require("./images/雨水.png") },
      ],
    };
  },
  methods: {
    // 退出登录
    onLoginOut() {
      this.$store.commit("deleteUser", null);
    },
    // 一言
    async Slogn() {
      const { hitokoto } = await getSlogn();
      return hitokoto;
    },
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop >= 150) {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    },
  },
  async mounted() {
    // 天气
    const data = await getWeather();
    this.city = data.location.name;
    this.temperature = data.now.temperature;
    // 一言
    this.slogn = await this.Slogn();
    // 滚动
    window.addEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="less" scoped>
.header {
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 70px;
  width: 100vw;
  background-color: #21242a;
  z-index: 999;
  transition: all .5s ease-in-out 0;
  .logo {
    display: flex;
    align-items: center;
    position: relative;
    left: -67px;
    // left: 67px;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    .slogan {
      color: #ede9d9;
      font-size: 33px;
      margin-left: 20px;
    }
  }
  .search {
    input {
      height: 35px;
      width: 300px;
      border-radius: 15px 0 0 15px;
      text-indent: 0.7em;
      outline: none;
      border: none;
      &:focus {
        color: red;
      }
    }
    button {
      height: 35px;
      width: 35px;
      border-radius: 0 15px 15px 0;
      border: none;
      outline: none;
      .iconfont {
        font-size: 14px;
      }
      &:hover {
        cursor: pointer;
        span i {
          color: #b3552c;
        }
      }
    }
  }
  .right {
    display: flex;
    align-items: center;
    .weather {
      // width: 200px;
      margin-right: 50px;
      margin-left: 20px;
      height: inherit;
      color: #ede9d9;
      line-height: 70px;
    }
    .login-button {
      width: 70px;
      height: 35px;
      color: #ede9d9;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .slogn {
    span {
      color: #fff;
    }
  }
}

.carousel {
  position: relative;
  left: 50%;
  margin-top: 70px;
  margin-left: -35vw;
  width: 70vw;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
