<template>
  <div class="exam-page">
    <header-nav></header-nav>
    <div class="big-banner">
      <div class="wrapper">
        <img src="../assets/images/title.png" class="title">
      </div>
    </div>
    <div class="exam-list">
      <div class="wrapper">
        <ul class="exam-tabs border-bottom-color">
          <li><router-link to="/exam/latest" :class="{'active': isNav(/latest/) || path == '/exam/' ||  path == '/exam' }" >最新考试</router-link></li>
          <li><router-link to="/exam/mytest" :class="{'active': isNav(/mytest/) }">我的考试</router-link></li>
        </ul>
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>

import headerNav from '../components/Header.vue'

import { mapState } from "vuex";

export default {
  name: "exam",
  data() {
    return {
    };
  },
  created() {
    this.getPath()
  },
  methods: {
    getPath() {
      this.path = this.$route.path
      
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    isNav(reg){
      if(Object.prototype.toString.call(reg) === '[object RegExp]'){
        return reg.test(this.$router.currentRoute.path)
      }else if(Object.prototype.toString.call(reg) === '[object String]'){
        return new RegExp(reg).test(this.$router.currentRoute.path)
      }else{
        return false
      }
    },
  },
  components: {
    headerNav
  }
};
</script>
<style lang="less">
@import "../assets/css/style.less";
.exam-page {
  header{
    padding-top: 10px;
    nav{
      height: 160px;
    }
  }
  .big-banner{
    height: 320px;
    background: #7b27fb url("../assets/images/list-bg.jpg") center top no-repeat;
    margin-bottom: 30px;
    .title{
      margin-top: 20px;
    }
  }
  .exam-tabs{
    height: 64px;
    li{
      float: left;
      a{
        font-size: 24px;
        color: #999;
        line-height: 64px;
        margin-right: 70px;
        &.active {
          color: #000;
          border-bottom: 4px solid #5a9cff;
          padding-bottom: 14px;
        }
      }
    }
  }

}
</style>
