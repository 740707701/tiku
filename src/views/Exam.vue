<template>
  <div class="exam-page">
    <header class="header">
      <nav class="wrapper">
        <router-link to="/" exact class="logo m-t-25">
          <img src="../assets/images/logo.png" alt="logo" >
        </router-link>
        <div class="nav-right m-t-25">
          <a class="sign-button sign-in" href="javascript:;" title="SIGN IN"></a>
          <a class="sign-button sign-up" href="javascript:;" title="SIGN UP"></a>
        </div>
      </nav>
    </header>
    <div class="big-banner">
      <div class="wrapper">
        <img src="../assets/images/title.png" class="title">
      </div>
    </div>
    <div class="exam-list">
      <div class="wrapper">
        12321321
      </div>
    </div>


    <div class="dialog" v-show="isShow">
      <div class="dialog-bg" @click="isShow = !isShow"></div>
      <!-- <div class="dialog-body">
        <div class="dialog-content">
          <h3>选择课程</h3>
          <a href="" class="active">职业题库<i></i></a>
          <a href="" class="">经济金融基础题库<i></i></a>
          <a href="">金融业务题库<i></i></a>
          <a href="">工作方法<i></i></a>
          <a href="">工作方法<i></i></a>
        </div>
      </div> -->
      <div class="dialog-sign">
        登录 / 注册
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "index",
  data() {
    return {
      isShow: false,
    };
  },
  computed: {
    ...mapState({
      getMovie: state => state.home.getMovie
    })

    // newMovies () {
    //   this.$store.dispatch('HOME_FILTERS_FETCH')
    // }
  },
  // asyncData ({ store, route, cookies}) {
  //   return Promise.all([
  //     store.dispatch('HOME_FILTERS_FETCH', {}),
  //   ])
  // },
  methods: {
    tiku() {
      this.isShow = true;
    }
    // getMovie: function () {
    // console.log('================');
    //   // this.$store.dispatch('HOME_FILTERS_FETCH', {})
    // }
  },
  beforeCreate() {
    console.log(11111111111111);
  },
  created() {
    console.log(22222222222222);
    // this.getMovie()
  }
};
</script>
<style lang="less">
@import "../assets/css/style.less";
.exam-page {
  .header {
    width: 100%;
    background-color: @c-bg;
    nav {
      height: 170px;
      .logo{
        display: inline-block;
      }
      .sign-button {
        display: inline-block;
        width: 110px;
        height: 46px;
        background: url(../assets/images/sign-up-in.png) no-repeat;
        margin-top: 10px;
        &.sign-in{
          background-position: 0 0;
          margin-right: 36px;
        }
        &.sign-up{
          background-position: -144px 0;
        }
      }
    }

  }
  .big-banner{
    height: 320px;
    background: url("../assets/images/list-bg.jpg") center top no-repeat;
    .title{
      margin-top: 20px;
    }
  }
  .item-list{
    height: 816px;
    margin-top: -100px;
    font-size: 0;
    letter-spacing: -4px;
    text-align: center;
    .list-box{
      font-size: 20px;
      letter-spacing: 0;
      display: inline-block;
      height: 318px;
      background-color: #fff;
      box-shadow: 0 0 40px 20px rgba(102,0,255,.04);
      border-radius: 14px;
      margin-bottom: 50px;
      &.list-small{
        width: 406px;
      }
      &.list-middle{
        width: 622px;
      }
      &.list-margin{
        margin: 0 30px;
      }
      &.list-margin-right{
        margin-right: 36px;
      }
      a{
        display: block;
        width: 100%;
        height: 100%;
        text-decoration: none;
        img{
          margin-top: 56px;
        }
        p{
          font-size: 20px;
          color: #2c285f;
        }
      }
    }
  }
  .dialog{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 501;
    .dialog-bg{
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: #808080;
      opacity: .5;
    }
    .dialog-body{
      position: absolute;
      top: 50%;
      left: 50%;
      width: 1130px;
      padding: 0 76px 76px;
      transform: translate(-50%, -50%);
      background: #fff;
    }
    .dialog-sign{
      position: absolute;
      top: 50%;
      left: 50%;
      width: 600px;
      transform: translate(-50%, -50%);
      background: #fff;
    }
    .dialog-content{
      margin-right: -30px;
      h3{
        height: 66px;
        line-height: 66px;
        border-bottom: 1px solid #dadada;
        font-size: 28px;
        color: #000;
        position: relative;
        &::after{
          content: "";
          display: block;
          clear: both;
          width: 112px;
          height: 4px;
          background-color: #000;
          position: absolute;
          left: 0;
          bottom: 0;
        }
      }
      a{
        display: inline-block;
        width: 256px;
        height: 120px;
        line-height: 120px;
        text-align: center;
        border: 2px #ccc solid;
        margin-right: 30px;
        margin-bottom: 52px;
        font-size: 26px;
        color: #b2b2b2;
        text-decoration: none;
        position: relative;
        &:hover{
          border-color: #f95c54;
          color: #010101;
          font-size: 28px;
          i{
            width: 30px;
            height: 30px;
            background: url('../assets/images/icon-check.png') -32px 0 no-repeat;
            position: absolute;
            right: -1px;
            bottom: -1px;
            display: block;
          }
        }
        &.active i{
            width: 30px;
            height: 30px;
            position: absolute;
            right: -1px;
            bottom: -1px;
            display: block;
          }
      }
    }
  }
}
</style>
