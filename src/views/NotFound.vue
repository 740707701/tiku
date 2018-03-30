<template>
  <div class="questions-page">
    <header-nav></header-nav>
    <div class="big-banner">
      <div class="wrapper">
        <img src="../assets/images/title.png" class="title">
      </div>
    </div>
    <div class="error-content wrapper">
      <div class="text-wrapper">
        <p class="text">哎呀！<br>你访问的页面不在啦！</p>
        <p>
          <router-link to="/">返回首页</router-link>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import headerNav from "../components/Header.vue";
export default {
  mounted(){
    document.getElementById('app').style.height = '100%'
  },
    components: {
    headerNav
  }
}
</script>

<style lang="less">
.error-content {
    margin: 100px auto;
    text-align: center;
  .text-wrapper{
    .text{
      font-size: 36px; color: #999; letter-spacing: 3px; margin-bottom: 20px;
    } 
    a{
      color: #fb965f; font-size: 18px;
    }
  }
}
</style>
