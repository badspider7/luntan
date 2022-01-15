<template>
  <div class="ant-footer">
    <div class="footer-links">
      <el-tooltip
        effect="dark"
        content="欢迎提交bug和建议"
        placement="top"
      >
        <a href="javascript:;">
          <i class="iconfont icon-spider"></i>
          <span>测评反馈</span>
        </a>
      </el-tooltip>

      <el-tooltip
      class="item"
      effect="dark"
      placement="top"
      >
      <div slot="content">
        <img style="height:100px;width:100px" src="../../../public/images/weixin.png" alt="">
      </div>
      <a href="javascript:;">
        <i class="iconfont icon-weixin"></i>
        <span>联系作者</span>
      </a>
      </el-tooltip>

      <el-tooltip
        effect="dark"
        placement="top"
      >
      <div slot="content">本站所有的文章皆来自网上，仅<br/>用作学习用途，如有侵权，非常<br/>抱歉，联系作者删除</div>
        <a href="javascript:;">
          <i class="iconfont icon-tishi"></i>
          <span>免责声明</span>
        </a>
      </el-tooltip>
    </div>
    <div class="footer-copyright">
      <span>
        <i class="iconfont icon-flower"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ant-footer",
};
</script>

<style lang="less" scoped>
.ant-footer {
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  .footer-links {
    margin-bottom: 20px;
    a {
      margin-right: 40px;
      color: #848587;
      font-size: 14px;
      &:hover{
        color: rgb(22, 22, 22);
      }
    }
  }
  .footer-copyright {
    font-size: 14px;
    i::after {
      content: "TalkToYou |  沪ICP备19026706号-3";
      font-size: 14px;
    }
    color: #848587;
  }
}
</style>
