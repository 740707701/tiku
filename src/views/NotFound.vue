<template>
  <div class="error-content">
    <div class="text-wrapper">
      <p class="text">哎呀！<br>你访问的页面不在啦！</p>
      <p>
        <router-link to="/">返回首页</router-link>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  mounted(){
    document.getElementById('app').style.height = '100%'
  }
}
</script>

<style lang="less">
.error-content {
  position: absolute;
  width: 100%;
  height: 100%;
  .text-wrapper{
    position: absolute; left: 50%; top: 50%;
    margin-top: -50px; margin-left: 80px;
    .text{
      font-size: 36px; color: #999; letter-spacing: 3px; margin-bottom: 20px;
    } 
    a{
      color: #fb965f; font-size: 18px;
      img{
        vertical-align: middle; margin-right: 10px;
      }
    }
  }
}
</style>
