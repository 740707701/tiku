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
}
</script>

<style lang="less">
  
  //  display inline-block
  // vertical-align middle
</style>