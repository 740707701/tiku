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
    let uInfo = sessionStorage.getItem('userinfo')
    if(uInfo){
      this.$store.commit('ACCOUNT_SET', {
        target: 'isShowPop',
        data: true
      })
    }else{
      this.$router.push(`/`) 
      
    }

    console.log('33333', uInfo)
  }
}
</script>

<style lang="less">
  
  //  display inline-block
  // vertical-align middle
</style>