<template>
  <div class="my-error-page">
    <header-nav></header-nav>
    <div class="big-banner">
      <div class="wrapper banner-title">
        <img src="../assets/images/title.png" class="title">
        <div class="error-count">未做错题：{{ myErrorList.length }}份</div>
      </div>
    </div>
    <div class="my-error-list">
      <div class="wrapper">
        <ul class="questions-tabs border-bottom-color" >
          <li v-for="(val, index) in tikuList" :key="index">
            <router-link :to="'/myerror/'+ val.questionsId" :class="{'active': isNav(/val.questionsId/) }"  @click.native="flushCom">{{ val.questionsName }}</router-link>
          </li>
        </ul>
        <p class="title" v-if="myErrorList.length">错题列表:</p>
        <p class="title nodata" v-else>暂无数据！</p>
        <el-row :gutter="20">
          <el-col :span="6" v-for="item in myErrorList" :key="item.id" >
            <div class="grid-content bg-purple" @click="getDetails(item)">
              <span class="tag-style" :class="`tag_${sortNumber()}`"></span>
              <div class="grid-right">
                <p>{{ item.fieldName }}</p>
                <p>错题: <span>{{ item.acount }}</span> 题</p>
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
      myErrorList: []
    };
  },
  computed: {
    ...mapState({
      tikuList: state => state.tikuList,
      // myErrorList: state => state.myErrorList,
    })
  },
  created() {
    let questions = this.$route.params.id;
    this.$store.dispatch("TIKU_LIST_FETCH", {});
    this.$store.dispatch("EXAM_ERROR_STATISTICAL", {
      questionsId: questions
    }).then(res => {
      if(res.result == 'success'){
        this.myErrorList = []
        if(res.object){
          this.myErrorList = res.object
        }
      }
    })

  },
  methods: {
    flushCom:function(){
      let questions = this.$route.params.id;
      console.log(questions)
      this.$store.dispatch("EXAM_ERROR_STATISTICAL", {
        questionsId: questions
      }).then(res => {
        if(res.result == 'success'){
          this.myErrorList = []
          if(res.object){
            this.myErrorList = res.object
          }
        }
      })
　　},
    sortNumber() {
      return Math.floor(Math.random() * 7 + 1 )
    },
    getDetails(item) {
      let question = this.$route.params.id;
      this.$router.push(`/errorlist/?question=${question}&fieldId=${encodeURIComponent(item.fieldId)}`)
    },
    isNav(reg) {
      if (Object.prototype.toString.call(reg) === "[object RegExp]") {
        return reg.test(this.$router.currentRoute.path);
      } else if (Object.prototype.toString.call(reg) === "[object String]") {
        return new RegExp(reg).test(this.$router.currentRoute.path);
      } else {
        return false;
      }
    }
  },
  components: {
    headerNav
  }
};
</script>
<style lang="less">
.my-error-page {
  .questions-tabs {
    height: 54px;
    li {
      float: left;
      a {
        font-size: 16px;
        color: #999;
        line-height: 54px;
        margin-right: 70px;
        &.router-link-active {
          color: #000;
          border-bottom: 2px solid #5a9cff;
        }
      }
    }
  }
  .big-banner {
    position: relative;
    .banner-title {
      .error-count {
        width: 1200px;
        font-size: 16px;
        height: 30px;
        line-height: 30px;
        color: #fff;
        position: absolute;
        bottom: 20px;
        left: 50%;
        margin-left: -600px;
      }
    }
  }
  .my-error-title{
    width: 100%;
    height: 86px;
    background-color: #7b27fb;
    color: #fff;
    
    p{
      font-size: 20px;
      padding-top: 20px;
      span{
        margin-left: 40px;
        font-size: 16px;
        vertical-align: bottom;
      }
    }
  }
  .my-error-list{
    margin-bottom: 30px;
    .title{
      width: 100%;
      height: 50px;
      line-height: 50px;
      color: #808080;
      font-size: 16px;
      text-align: left;
      display: inline-block;
    }
    .nodata {
      text-align: center!important;
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
      margin-bottom: 15px;
      transition: all .4s;
      &:hover{
        transform: translateY(-2px);
        box-shadow: 0 2px 10px #b2b2b2;
      }
    }
    .grid-content {
      border-radius: 4px;
      min-height: 70px;
      padding: 10px;
      cursor: pointer;
      .tag-style{
        float: left;
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
        // width: 170px;
        margin-left: 50px;
        p:first-child{
          font-size: 14px;
          color: #010101;
          margin-bottom: 10px;
        }
        p:last-child{
          font-size: 14px;
          color: #999797;
        }
      }
    }


  }



}
</style>
