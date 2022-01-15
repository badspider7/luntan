<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body,html {
  // height: 100%;
  overflow-x: hidden; // 禁用横向滚动
  background-color: #F0F2F5;
}
ul li {
    list-style: none;
  }
a{
  text-decoration: none;
  color: black;
}
</style>
