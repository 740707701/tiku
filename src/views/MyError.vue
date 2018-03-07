<template>
  <div class="my-error-page">
    <header-nav></header-nav>
    <div class="my-error-title">
      <p class="wrapper">我的错题<span>未做错题: 478份</span></p>
    </div>
    <div class="my-error-list">
      <div class="wrapper">
        <p class="title">错题列表:</p>
        <el-row :gutter="20">
          <el-col :span="6" v-for="item in errorList" :key="item.id" >
            <div class="grid-content bg-purple" @click="getDetails(item)">
              <span class="tag-style" :class="`tag_${sortNumber()}`"></span>
              <div class="grid-right">
                <p>{{ item.title }}</p>
                <p>错题: <span>{{ item.number }}</span> 题</p>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    
  </div>
</template>

<script>

import headerNav from '../components/Header.vue'

import { mapState } from "vuex";

export default {
  name: "myerror",
  data() {
    return {
      errorList: [{
        id: 1,
        title: '宏观经济学',
        number: 35,
      },{
        id: 2,
        title: '宏观经济学2',
        number: 35,
      },{
        id: 3,
        title: '宏观经济学3',
        number: 25,
      },{
        id: 4,
        title: '宏观经济学4',
        number: 335,
      },{
        id: 5,
        title: '宏观经济学5',
        number: 35,
      },{
        id: 6,
        title: '宏观经济学6',
        number: 354,
      },{
        id: 7,
        title: '宏观经济学7',
        number: 35,
      },{
        id: 1,
        title: '宏观经济学',
        number: 35,
      },{
        id: 2,
        title: '宏观经济学2',
        number: 35,
      },{
        id: 3,
        title: '宏观经济学3',
        number: 25,
      },{
        id: 4,
        title: '宏观经济学4',
        number: 335,
      },{
        id: 5,
        title: '宏观经济学5',
        number: 35,
      },{
        id: 6,
        title: '宏观经济学6',
        number: 354,
      },{
        id: 7,
        title: '宏观经济学7',
        number: 35,
      }],
    };
  },
  created() {
  
  },
  methods: {
    sortNumber() {
      return Math.floor(Math.random() * 7 + 1 )
    },
    getDetails(item) {
      console.log(item.id);
      this.$router.push(`/trial/${encodeURIComponent(item.id)}`) 
    }
  },
  components: {
    headerNav
  }
};
</script>
<style lang="less">
@import "../assets/css/style.less";
.my-error-page {
  header{
    padding-top: 10px;
    nav{
      height: 150px;
    }
  }
  .my-error-title{
    width: 100%;
    height: 86px;
    background-color: #7b27fb;
    color: #fff;
    p{
      font-size: 26px;
      span{
        margin-left: 40px;
        font-size: 18px;
        vertical-align: bottom;
      }
    }
  }
  .my-error-list{
    margin-bottom: 160px;
    .title{
      height: 70px;
      line-height: 70px;
      color: #808080;
      font-size: 20px;
    }
    .el-row {
      margin-bottom: 30px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 4px;
    }
    .bg-purple-dark {
      background: #99a9bf;
    }
    .bg-purple {
      background: #fff;
      border: 1px solid #f1eff4;
      box-shadow:0px 6px 6px #E9E7EA;
      margin-bottom: 30px;
      transition: all .4s;
      &:hover{
        transform: translateY(-10px);
        box-shadow: 10px 10px 10px #ccc;
      }
    }
    .grid-content {
      border-radius: 4px;
      min-height: 90px;
      padding-top: 35px;
      padding-left: 30px;
      cursor: pointer;
      .tag-style{
        width: 40px;
        height: 52px;
        float: left;
      }
      .tag_1{
        background: url(../assets/images/icon-error-1.png) no-repeat;
      }
      .tag_2{
        background: url(../assets/images/icon-error-2.png) no-repeat;
      }
      .tag_3{
        background: url(../assets/images/icon-error-3.png) no-repeat;
      }
      .tag_4{
        background: url(../assets/images/icon-error-4.png) no-repeat;
      }
      .tag_5{
        background: url(../assets/images/icon-error-5.png) no-repeat;
      }
      .tag_6{
        background: url(../assets/images/icon-error-6.png) no-repeat;
      }
      .tag_7{
        background: url(../assets/images/icon-error-7.png) no-repeat;
      }
      // img{
      //   vertical-align: middle;
      //   float: left;
      // }
      .grid-right{
        width: 170px;
        margin-left: 90px;
        p:first-child{
          font-size: 20px;
          color: #010101;
          margin-bottom: 12px;
        }
        p:last-child{
          font-size: 16px;
          color: #999797;
        }
      }
    }


  }



}
</style>
