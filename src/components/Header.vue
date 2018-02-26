<template>
  <header class="header">
    <nav class="wrapper">
        <router-link to="/" exact class="logo">
          <img src="../assets/images/logo.png" alt="logo" >
        </router-link>
        <ul class="nav-list m-t-14">
          <li><router-link to="/" class="border-line">首页</router-link></li>
          <li><router-link to="/exam/latest">我的题库</router-link></li>
        </ul>
        <div class="nav-right m-t-14">
          <div class="sign-box">
            <a class="sign-button sign-in" href="javascript:;" title="SIGN IN"></a>
            <a class="sign-button sign-up" href="javascript:;" title="SIGN UP"></a>
          </div>
          <div class="user-info">
            <input type="text" placeholder="请输入您要查找的内容" style="display: none">
            <span class="search-button"></span>
            <span class="head-img">
              <ul class="head-select">
                  <li><router-link to="/" class="">我的考试</router-link></li>
                  <li><router-link to="/" class="">我的错题</router-link></li>
                  <li><router-link to="/" class="">我要当考官</router-link></li>
                  <li><router-link to="/" class="">我要当判官</router-link></li>
              </ul>
            </span>
          </div>
        </div>
      </nav>
    </header>
</template>
<script>
export default {
  name: 'header',

}
</script>
<style lang="less">
.header {
  width: 100%;
  background-color: #7b27fb;
  nav {
    .logo{
      display: block;
      float: left;
    }
    .sign-button {
      display: inline-block;
      width: 110px;
      height: 46px;
      background: url(../assets/images/sign-up-in.png) no-repeat;
      &.sign-in{
        background-position: 0 0;
        margin-right: 36px;
      }
      &.sign-up{
        background-position: -144px 0;
      }
    }
  }
  .nav-list{
    float: left;
    list-style: none;
    li{
      float: left;
      height: 38px;
      padding-right: 60px;
      a{
        display: block;
        width: 108px;
        height: 38px;
        line-height: 38px;
        color: #fff;
        font-size: 20px;
        text-align: center;
        border: 1px solid #fff;
        border-radius: 32px;
        &.border-line{
          border: 1px solid #7b27fb;
        }
      }
    }
  }
  .nav-right{
    float: right;
  }
  .sign-box{
  // display: none;
  }
.user-info{
  display: none;
  span{
    display: inline-block;
    vertical-align: middle;
  }
  .search-button{
    width: 21px;
    height: 30px;
    background: url(../assets/images/search.png) center no-repeat;
    margin-right: 30px;
    cursor: pointer;
  }
  .head-img{
    width: 30px;
    height: 30px;
    background: url(../assets/images/head.png) center no-repeat;
    cursor: pointer;
    position: relative;
    .head-select{
      position: absolute;
      top: 45px;
      left: -60px;
      padding: 36px 34px;
      width: 94px;
      background: #fff;
      border-radius: 14px;
      li{
        float: left;
        a{
          display: block;
          color: #333;
          font-size: 18px;
          line-height: 30px;
          &:hover{
            color: #7b27fb;
          }
        }
      }
      &::before{
        content: "";
        clear: both;
        display: block;
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        position: absolute;
        top: -12px;
        border-bottom: 12px solid #fff;
        left: 70px;
      }
    }
  }
    input{
      border: none;
      font-size: 16px;
      color: #333;
      height: 30px;
      margin-right: 20px;
      padding: 0 10px;
      border-radius: 4px;
      vertical-align: middle;
    }
  }
}
</style>

