<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'index',
  mounted() {
    let username = sessionStorage.getItem('username')
    let password = sessionStorage.getItem('password')
    if(username){
      this.$store.commit('ACCOUNT_SET', {
        target: 'isShowPop',
        data: true
      })

      this.$store
        .dispatch("ACCOUNT_LOGIN", {
          username,
          password
        })
        .then(res => {
          if (res.success) {
            this.$store.commit("INDEX_SET", {
              target: "isLogin",
              data: false
            });
            // console.log('登录成功！')
          } else {
            this.$message({
              message: res.message,
              type: "error"
            });
          }
        });
    }else{
      this.$router.push(`/`) 
    }
  }
}
</script>

<style lang="less">
  @import "./assets/css/style.less";
</style>