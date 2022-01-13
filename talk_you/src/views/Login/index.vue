<template>
  <div id="Login">
    <router-link to="/" class="back">返回主页</router-link>
    <div class="login-form">
      <div class="title"><h3>登录</h3></div>
      <div class="usename">
        <label for="username">用户名:</label>
        <input
          type="text"
          placeholder="请输入用户名"
          id="username"
          v-model="user.username"
        />
      </div>
      <div class="account">
        <label for="account">邮箱:</label>
        <input
          type="text"
          placeholder="请输入邮箱"
          id="account"
          v-model="user.email"
        />
      </div>
      <div class="password">
        <label for="pwd">密码:</label>
        <input
          type="password"
          placeholder="请输入密码(只能是数字)"
          id="pwd"
          v-model="user.password"
        />
      </div>
      <div class="login-btn">
        <el-button :plain="true" @click="Onlogin">登录</el-button>
        <el-button @click="Onregister">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/utils/login";
export default {
  name: "Login",
  data() {
    return {
      user: {
        username: "badspider",
        email: "1742969779@qq.com",
        password: "123",
      },
      regEmail: "",
    };
  },
  methods: {
    // 正则校验
    test() {
      this.regEmail = /^\d{10,11}@[a-z]{2}\.com$/i.test(this.user.email);
    },
    async Onlogin() {
      try {
        const data = await login(this.user);
        //Tost 提示消息
        this.$message({
          message: "登录成功",
          type: "success",
          duration: "1500",
        });
        this.$store.commit('getToken',data)
        // 登录成功，跳转回原来的页面
        this.$router.back();
      } catch (err) {
        console.log(err);
        this.$message.error("登录失败");
      }
    },
    async Onregister() {
      try {
        const data = await register(this.user);
        this.$message({
          message: "注册成功",
          type: "success",
          duration: "1500",
        });
        console.log(data);
        this.$store.commit('getToken',data)
        this.$router.back();
      } catch (err) {
        console.log(err);
        this.$message.error('注册失败')
      }
    },
  },
};
</script>

<style lang="less" scoped>
#Login {
  height: 100vh;
  background-color: #fff;
  .login-form {
    @width: 500px;
    @height: 350px;
    transform: translate(50%, 50%);
    margin-left: calc(@width / 2);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: left;
    width: @width;
    height: @height;
    border: 1px solid #ccc;
    .title {
      font-size: 20px;
      align-self: center;
    }
    label {
      margin-right: 20px;
      margin-left: 20px;
    }
    input {
      width: 270px;
      border: none;
      border-bottom: 1px solid #ccc;
      outline: none;
    }
    & div:nth-of-type(n + 3) label {
      margin-right: 35px;
    }
    .login-btn {
      display: flex;
      justify-content: center;
      button {
        width: 70px;
        height: 40px;
        margin-right: 20px;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  .back {
    position: relative;
    left: 650px;
    top: 100px;
    font-size: 40px;
  }
}
</style>
