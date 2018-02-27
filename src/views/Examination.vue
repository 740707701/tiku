<template>
  <div class="examination-page">
    <header-nav></header-nav>
    <div class="big-banner">
      <div class="wrapper">
        <img src="../assets/images/title.png" class="title">
      </div>
    </div>
    <div class="examination-list">
      <div class="wrapper">
        <p class="list-title">宏观经济学概述试卷测试题 <span>共计:118题</span></p>
        <div class="list-main">
          <div class="main-left">
            <div class="box-line timing">
              <p class="line-title clearfix"> <i class="icon-clock"></i> <span>考试计时</span></p>
              <div class="line-times">

                <span>02:45:35</span>
              </div>

            </div>
            <div class="box-line examinee">
              111
            </div>
          </div>
          <div class="box-line main-right">
            sfsd
          </div>
        </div>
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
.examination-page {
  header{
    padding-top: 10px;
    nav{
      height: 160px;
    }
  }
  .big-banner{
    height: 320px;
    background: url("../assets/images/list-bg.jpg") center top no-repeat;
    margin-bottom: 30px;
  }
  .examination-list{
    .list-title{
      font-size: 18px;
      color: #333;
      padding-left: 14px;
      border-left: 6px solid #6404ff;
      margin-top: 20px;
      margin-bottom: 26px; 
      span{
        color: #b2b2b2;
        float: right;
        font-size: 16px;
      }
    }
    .list-main{
      border-top: 1px solid #ccc;
      padding-top: 30px;
      .main-left{
        width: 228px;
        margin-right: 26px;
        float: left;
        .timing{
          width: 228px;
        }
        .examinee{
          width: 228px;
        }

        .line-title{
          padding-top: 20px;
            .icon-clock{
              display: block;
              width: 20px;
              height: 23px;
              background: url(../assets/images/icon-clock.png) no-repeat;
              margin: 0 14px;
              float: left;
            }
            span{
              display: block;
              line-height: 23px;
              float: left;
            }
          }
          .line-times{
            width: 156px;
            height: 156px;
            background: linear-gradient(to top, #eedeff, #6402ff);
            border-radius: 50%;
            margin: 36px auto;
            position: relative;
            &::before{
              content: "";
              display: block;
              clear: both;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              width: 148px;
              height: 148px;
              background: #fff;
              border-radius: 50%;
            }
          }

      }
      .main-right{
        width: 1016px;
        float: left;
        
      }

      .box-line{
        box-sizing: border-box;
        border: 1px solid #eaeaea;
        border-top: none;
        box-shadow:0px 6px 6px #E9E7EA;
        margin-bottom: 30px;
        float: left;
      }
      

    }
  }

}
</style>
