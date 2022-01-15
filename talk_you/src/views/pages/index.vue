<template>
  <div class="pages">
    <div class="title">
      <el-divider content-position="left">
        <h4>
          <i class="el-icon-reading"></i>
          <a href="javascript:;" title="注：所有文章来自于人民网">今日文章</a>
        </h4>
      </el-divider>
    </div>
    <div class="content">
      <ul class="page-card">
        <li class="txt" v-for="(article,index) in titleInfo.slice(0,8)"  :key="index">
          <article class="page-article">
            <h4 class="page-title">
              <a :href="article.titleUrl" target="blank">{{article.title}}</a>
            </h4>
          </article>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "pages",
  computed:{
    ...mapState({
      titleInfo:(state) => state.page.titleInfo.reverse(),
      // titleURL: (state) => state.page.titleURL
    }),
  },
  mounted(){
    this.$store.dispatch('Articles')
  }
};
</script>

<style lang="less" scoped>
.pages {
  position: relative;
  left: 50%;
  @Pagewidth: 1007px;
  width: @Pagewidth;
  margin-left: calc(-@Pagewidth / 2);
  margin-top: 30px;
  font-family: Humanist;
  background-color: #fff;
  .title {
    margin-bottom: 20px;
    .el-icon-reading {
      font-size: 20px;
    }
  }
  .content {
    border: 1px solid #ccc;
    border-top: none;
    .page-card {
      .txt {
        // margin-bottom: 20px;
        border-bottom: 1px solid #ccc;
        padding: 15px;
        .page-title {
          color: #303133;
          &:hover {
            a {
              color: red;
            }
            text-decoration: underline;
          }
        }
      }
      .txt:nth-last-child(1) {
        border-bottom: none;
      }
    }
  }
}
</style>
