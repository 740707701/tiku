<template>
  <div class="set-topic-page">
    <header-nav></header-nav>
    <div class="big-banner">
      <div class="wrapper">
        <img src="../assets/images/title.png" class="title">
      </div>
    </div>
    <div class="set-topic-list">
      <div class="wrapper">
       
        <div class="list-main clearfix">
          <div class="main-left">
            <div class="box-line examinee">
              <p class="line-title clearfix">出题信息</p>
              <div class="student-info">
                <p class="info-list"><span>考生姓名:</span> <span>李晓尔</span></p>
                <p class="info-list"><span>试卷名称:</span> <span>宏观经济学概述试卷测试题</span></p>
                <p class="info-list"><span>试卷题库:</span> <span>单选题 多选题 案例题</span></p>
                <p class="info-list"><span>数量:</span> <span>共180题</span></p>
                <p class="info-list"><span>时长:</span> <span>1小时20分</span></p>
                <p class="info-list"><span>开始时间:</span> <span>2018-03-01</span></p>
              </div>
            </div>
            <i class="kd-bg"></i>
          </div>
          <div class="box-line main-right">
            <p class="line-title border-bottom">单选题</p>
            <div class="raido-list" v-for="(item, index) in dataList" :key="index">
              <div class="raido-title">{{ index+1 }}、{{ item.name }}</div>
              <p v-for="(num, i) in item.sle" :key="i"><input type="radio" :id="'radio'+(index+1)+'-'+(i+1)"  :value="letter[i]" v-model="radioNames[index]">
              <label :for="'radio'+(index+1)+'-'+(i+1)">{{ letter[i]}}、{{ num }}</label></p>
            </div>
            {{ radioNames }}
            <p class="line-title border-bottom">多选题</p>
            <div class="raido-list" v-for="(item, index) in dataList2" :key="index">
              <div class="raido-title">{{ index+1 }}、{{ item.name }}</div>
              <p v-for="(num, i) in item.sle" :key="i"><input type="checkbox" :id="'check'+(index+1)+'-'+(i+1)"  :value="letter[i]" v-model="item.aaa">
              <label :for="'check'+(index+1)+'-'+(i+1)">{{ letter[i]}}、{{ num }}</label></p>
            </div>
            {{ dataList2 }}
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
  name: "set-topic-page",
  data() {
    return {
      progressing: 60,
      radioNames: [],
      checkboxNames:[],
      letter: ['A','B','C','D','E','F','G','H'],
      dataList:[{
        name: '机动车驾驶证遗失的，机动车驾驶人应当向哪里的车辆管理所申请补发？',
        sle:['正确', '错误', '对的', '不对']
      },{
        name: '机动车驾驶证遗失的，机动车驾驶人应当向哪里的车辆管理所申请补发？',
        sle:['哈哈', '不对也', '很对', '错']
      }],
      dataList2: []
    };
  },
  created() {
    this.getPath()
  },
  methods: {
    getPath() {
      this.path = this.$route.path
      let that = this;



      // 异步数据
      setTimeout(function(){
        var a = [{
          name: '机动车驾驶证遗失的，机动车驾驶人应当向哪里的车辆管理所申请补发？',
          sle:['正确', '错误', '对的', '不对'],
        },{
          name: '机动车驾驶证遗失的，机动车驾驶人应当向哪里的车辆管理所申请补发？',
          sle:['哈哈', '不对也', '很对', '错'],
        }]
        
        a.map((v, i, arr) => {
          return v.aaa = []
        })
        return that.dataList2 = a
      },2000)
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
.set-topic-page {
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
  .set-topic-list{
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
      border: 1px solid #fafafa;
      box-shadow:0px 6px 6px #E9E7EA;
      margin-bottom: 30px;
      overflow: hidden; 
      .main-left {
        width: 358px;
        float: left;
        background: linear-gradient(to top, #60a8fe, #357df2);
 
        color: #fff;
        position: relative;
        .examinee{
          width: 358px;
          font-size: 15px;
          .student-info{
            padding: 0 10px;
            margin-bottom: 86px;
            .info-list{
              margin-top: 15px;
              span{
                display: inline-block;
              }
              span:first-child{
                width: 80px;
                color: #b2b2b2;
                vertical-align: top;
              }
              span:last-child{
                width: 110px;
                line-height: 1.3;
                margin-left: 6px;
                color: #000;
              }
            }
          }
        }
        .kd-bg{
          display: block;
          width: 357px;
          height: 258px;
          background: url('../assets/images/kd-bg.png') no-repeat;
 
        }
        .line-title{
          padding-top: 20px;
          font-size: 20px;
        }
      }
      .main-right{
        width: 920px;
        
        float: left;
        .line-title{
          line-height: 60px;
          background: url(../assets/images/icon-list.png) 10px center no-repeat;
          padding-left: 50px; 
        }
        .border-bottom{
          border-bottom: 5px solid #f7f7f7;
        }
        .raido-list{
          padding-left: 30px; 
          border-bottom: 1px solid #ccc;
          .raido-title{
            padding: 20px 0 20px;
          }
          p{
            margin-bottom: 14px;
            input{
              vertical-align:middle;
              cursor: pointer;
            }
            label{
              padding-left: 16px;
              vertical-align:middle;display:inline-block;
              cursor: pointer;
            }
          }
        }
        
      }

      // .box-line{
      //   box-sizing: border-box;
        
      //   float: left;
      // }
      

    }
  }

}
</style>
