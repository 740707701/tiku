<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
    <dialogBox></dialogBox>
  </div>
</template>
<script>

import dialogBox from './components/Dialog.vue'

export default {
  name: 'index',
  methods: {
    isLogin( status ) {
      console.log('子组件', status);
      
    }
  },
  components: {
    dialogBox,
  }
}
</script>

<style lang="less">
  
  //  display inline-block
  // vertical-align middle
</style>