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
              <p class="line-title title-icon">考试计时</p>

              

              <div class="line-times">
                <el-progress class="test" type="circle" :percentage="progressing" :show-text="false" :width="156"></el-progress>
                <span class="line-timing">02:45:35</span>
              </div>
              <div class="timing-number">
                  <p class="test-time">开考时间&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;结束时间</p>
                  <p class="test-number">14:20&nbsp;&nbsp;&nbsp;——&nbsp;&nbsp;&nbsp;15:30</p>
                  <p class="count-number">总时长:1小时10分钟</p>
                </div>
            </div>
            <div class="box-line examinee">
              <p class="line-title title-icon">考生信息</p>
              <div class="student-info">
                <p class="info-list"><span>考生姓名:</span> <span>李晓尔</span></p>
                <p class="info-list"><span>试卷名称:</span> <span>宏观经济学概述试卷测试题</span></p>
                <p class="info-list"><span>试卷题库:</span> <span>单选题 多选题 案例题</span></p>
                <p class="info-list"><span>数量:</span> <span>共180题</span></p>
                <p class="info-list"><span>时长:</span> <span>1小时20分</span></p>
                <p class="info-list"><span>开始时间:</span> <span>2018-03-01</span></p>
              </div>
            </div>
          </div>
          <div class="box-line main-right">
            <p class="line-title border-bottom">单选题</p>
            <div class="raido-list" v-for="(item, index) in dataList" :key="index">
              <div class="raido-title">{{ index+1 }}、{{ item.name }}</div>
              <p v-for="(num, i) in item.sle" :key="i"><input type="radio" :id="'radio'+(index+1)+'-'+(i+1)"  :value="letter[i]" v-model="radioNames[index]">
              <label :for="'radio'+(index+1)+'-'+(i+1)">{{ letter[i]}}、{{ num }}</label></p>
            </div>
            <!-- {{ radioNames }} -->
            <p class="line-title border-bottom">多选题</p>
            <div class="raido-list" v-for="(item, index) in dataList2" :key="index">
              <div class="raido-title">{{ index+1 }}、{{ item.name }}</div>
              <p v-for="(num, i) in item.sle" :key="i"><input type="checkbox" :id="'check'+(index+1)+'-'+(i+1)"  :value="letter[i]" v-model="item.aaa">
              <label :for="'check'+(index+1)+'-'+(i+1)">{{ letter[i]}}、{{ num }}</label></p>
            </div>
            <!-- {{ dataList2 }} -->
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
  name: "examination-page",
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
     this.init()
    this.getPath()
  },
  methods: {
    init(){
      let examId = this.$route.params.examId;
      console.log(examId)
        // 最新考试我的测试题
      this.$store.dispatch('EXAM_CONTENT', {
          examId
      })
    },
    getPath() {
      this.path = this.$route.path

      // 异步数据
      // setTimeout(function(){
      //   var a = [{
      //     name: '机动车驾驶证遗失的，机动车驾驶人应当向哪里的车辆管理所申请补发？',
      //     sle:['正确', '错误', '对的', '不对'],
      //   },{
      //     name: '机动车驾驶证遗失的，机动车驾驶人应当向哪里的车辆管理所申请补发？',
      //     sle:['哈哈', '不对也', '很对', '错'],
      //   }]
        
      //   a.map((v, i, arr) => {
      //     return v.aaa = []
      //   })
      //   return that.dataList2 = a
      // },2000)
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
    background: #7b27fb url("../assets/images/list-bg.jpg") center top no-repeat;
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

        .line-title{
          margin-top: 20px;
          }
          .title-icon{
            line-height: 28px;
            background: url(../assets/images/icon-clock.png) 14px center no-repeat;
            padding-left: 46px; 
          }

          .test svg > path:first-of-type{
            stroke: #fafafa !important;
          }
          .test svg > path:last-of-type{
            stroke: #6809ff !important;
          }

          
          .line-times{
            // width: 156px;
            // height: 156px;
            // background: linear-gradient(to top, #eedeff, #6402ff);
            // border-radius: 50%;
            margin: 36px auto;
            position: relative;
            text-align: center;
            // &::before{
            //   content: "";
            //   display: block;
            //   clear: both;
            //   position: absolute;
            //   left: 50%;
            //   top: 50%;
            //   transform: translate(-50%, -50%);
            //   width: 148px;
            //   height: 148px;
            //   background: #fff;
            //   border-radius: 50%;
            // }
            .line-timing{
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
            }
          }
          .timing-number{
            color: #333333;
            font-family: 'PingFang SC';
            font-size: 15px;
            p{
              margin-bottom: 20px;
            }
            .test-time{
              padding-left: 36px;
            }
            .test-number{
              padding-left: 46px;
            }
            .count-number{
              text-align: center;
              color: #b2b2b2;
              margin-bottom: 40px;
            }
          }

      }
      .main-right{
        width: 1016px;
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

      .box-line{
        box-sizing: border-box;
        border: 1px solid #fafafa;
        box-shadow:0px 6px 6px #E9E7EA;
        margin-bottom: 30px;
        float: left;
      }
      

    }
  }

}
</style>
