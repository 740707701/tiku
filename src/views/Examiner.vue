<template>
  <div class="examiner-page">
    <header-nav></header-nav>
    <div class="big-banner">
      <div class="wrapper">
        <img src="../assets/images/title.png" class="title">
      </div>
    </div>
    <div class="examiner-list">
      <div class="wrapper">
        <p class="list-title">职业题库</p>
        <div class="menu-row">
          <p class="info-list"><span>课程选择：</span> <span>简历</span></p>
          <p class="info-list"><span>章节选择：</span> <span>宏观经济学慨述        职业规划      沟通</span></p>
          <p class="info-list"><span>题库类型：</span> <span>单选题 多选题 案例题</span></p>
        </div>
        <div class="more-button"> <span>更多选项<i class="triangle"></i></span> </div>
        <div class="topic-item">
          <div class="f-l topic-left">
            <p class="title bg-icon">选择题</p>
            <div class="pd-left">
              <div class="raido-list" v-for="(item, index) in dataList" :key="index">
                <div class="raido-title">{{ index+1 }}、{{ item.name }}</div>
                <p v-for="(num, i) in item.sle" :key="i"><input type="radio" :id="'radio'+(index+1)+'-'+(i+1)"  :value="letter[i]" v-model="radioNames[index]">
                <label :for="'radio'+(index+1)+'-'+(i+1)">{{ letter[i]}}、{{ num }}</label></p>
                <span class="answer-number">参考答案：D</span>
              </div>
              <p class="answer-style other-answer">其他的答案: A</p>
              <p class="answer-style">我的参考答案: 发生故障移动到应急车道内 斤启危险报警闪光灯 并且放置警告标志</p>
              <p class="reference-msg">我的参考答案</p>
              <div class="textarea-mn">
                <textarea maxlength="20" cols="30" rows="10" placeholder="请在此输入您的参考答案" v-model.trim="content"></textarea>
                <p class="t-right">限20字以内 <span>发表</span> </p>
              </div>
              <p class="reference-msg">建议答案</p>
              <div class="msg-list" v-for="(item, index) in answersList.comments" :key="index">
                <div class="msg-page-number">0{{ index+1 }}</div>
                <div class="msg-page-content">
                  <p>{{ item.username }}</p>
                  <p>{{ item.contentMsg }}</p>
                  <p>{{ new Date(item.createTime).toISOString().replace('T', ' ').slice(0, -8) }}</p>
                </div>
              </div>
            </div>
            <div class="msg-button">
              <span>提交</span>
            </div>
            
          </div>
          <div class="f-l topic-right">
            <p class="title" @click="pingfen">评分</p>
            <div class="pd-left">
              <div class="slider-list clearfix" v-for="(item, index) in sliderList" :key="index">
                <div class="left">{{ item.name }}: </div><el-slider v-model="item.value" class="center"></el-slider><div class="right">{{ item.value }}分</div>
              </div>
              <p class="analysis">题目解析</p>
              <p class="diff-level">难度等级:</p>
              <p class="diff-level">驾驶拼装的机动车或者已达到报废标准的机动车上道路行驶的，公安机关交通管理部门应当予以收缴强制报废对驾驶前款所列机动车上道路行驶的驾驶人，处二百元以上二千元以下罚款，并吊销机动车驾驶证。</p>
            </div>
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
  name: "examiner-page",
  data: () => ({
    progressing: 60,
    radioNames: [],
    checkboxNames:[],
    letter: ['A','B','C','D','E','F','G','H'],
    dataList:[{
      name: '机动车驾驶证遗失的，机动车驾驶人应当向哪里的车辆管理所申请补发？',
      sle:['正确', '错误', '对的', '不对']
    }],
    dataList2: [],
    content: '',
    msgList:[{
      userName: '吻别',
      msg: '发生故障移动到应急车道内 斤启危险报警闪光灯 并且放置警告标志',
      time: '2018-02-01  12:20'
    },{
      userName: '期待明天',
      msg: '这一刻 尽在无言中...',
      time: '2018-02-02  12:20'        
    },{
      userName: '伤离别',
      msg: '每天多爱你一天，无求甚么。。',
      time: '2018-02-02  12:20'
    },{
      userName: '风雨无助',
      msg: '发生故障移动到应急车道内 斤启危险报警闪光灯 并且放置警告标志',
      time: '2018-02-02  12:20'
    }],
    sliderList:[{
      name: '难度',
      value: 20,
    },{
      name: '专业性',
      value: 80,
    },{
      name: '重要性',
      value: 85,
    },{
      name: '知识相关性',
      value: 65,
    }],
    sliderNumber: []

  }),
  computed: {
    ...mapState({
      answersList: state => state.exam.answersList
    })
  },

  created() {
    // 我的题库
    this.$store.dispatch('EXAM_ANSWERS_PAGE', {
      "commentType":"0",
      "referId":"1",
      "index":"0",
      "indexId":"7"
    })

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
    pingfen(){
     
      this.sliderNumber = this.sliderList.map((v, i) => {
        return v.value
      })
 console.log(this.sliderNumber);

      
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
.examiner-page {
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
  .examiner-list{
    .list-title{
      font-size: 28px;
      color: #000;
      border-bottom: 1px solid #ccc;
      padding-bottom: 18px;
      position: relative;
      &::before{
        content: "";
          display: block;
          clear: both;
          width: 110px;
          height: 4px;
          background: #5a9cff;
          position: absolute;
          bottom: 0;
      }
    }
    .menu-row{

      .info-list{
        margin-top: 20px;
        span{
          display: inline-block;
          color: #808080;
        }
        span:first-child{
          width: 110px;
          vertical-align: top;
        }
        span:last-child{
          width: 1150px;
          line-height: 1.3;
        }
      }
    }
    .more-button{
      text-align: center;
      position: relative;
      span{
        height: 60px;
        line-height: 60px;
        cursor: pointer;
      }
      .triangle{
        width: 0;
        height: 0;
        border-top: 10px solid transparent;
        border-right: 10px solid transparent;
        border-left: 10px solid transparent;
        border-bottom: 10px solid #ccc;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: 40px;
        margin-top: -4px;
        transform: rotate(180deg);
        &::before{
          content: "";
          border-top: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 8px solid #fff;
          border-left: 8px solid transparent;
          position: absolute;
          top: -6px;
          left: -8px;
        }
      }
    }
    .topic-item{
      margin-bottom: 160px;
      .topic-left{
        width: 875px;
        margin-right: 30px;
        .raido-list{
          border-bottom: 1px solid #ccc;
          position: relative;
          .raido-title{
            padding: 20px 0 20px;
            font-size: 20px;
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
          .answer-number{
            position: absolute;
            bottom: 22px;
            right: 40px;
            font-size: 20px;
            color: #ff0000;
          }
        }
        .answer-style{
          font-size: 18px;
          color: #000;
          line-height: 50px;
          &.other-answer{
            margin-top: 10px;
          }
        }
        .reference-msg{
          font-size: 18px;
          color: #808080;
          background: url(../assets/images/msg.png) 0 center no-repeat;
          line-height: 30px;
          padding-left: 40px;
        }
        .textarea-mn {
          position: relative;
          padding: 5px;
          border: 1px solid #ddd;
          margin: 16px 0;
          em {
            position: absolute;
            top: 5px;
            left: 5px;
            font-style: normal;
            font-size: 14px;
            color: #999;
          }
          textarea {
            width: 100%;
            height: 95px;
            line-height: 16px;
            resize: none;
          }
          .t-right {
            position: absolute;
            bottom: 18px;
            right: 18px;
            color: #999;
            span{
              background: #5a9cff;
              padding: 8px 18px;
              border-radius: 6px;
              color: #fff;
              margin-left: 20px;
              cursor: pointer;
            }
          }
        }
        .msg-list{
          margin-top: 10px;
          border-bottom: 1px solid #ccc;
          padding: 20px 0;
          line-height: 30px;
          font-size: 18px;
          .msg-page-number{ 
            float: left;
            padding-right: 30px;
          }
          .msg-page-content{
            overflow: hidden;
            color: #000;
            p:last-child{
              color: #b3b3b3;
            }
          }
        }
      .msg-button{
          margin: 80px auto;
          text-align: center;
          >span{
            padding: 10px 44px;
            color: #fff;
            border-radius: 4px; 
            background: #5a9cff;
            cursor: pointer;
          }
        }
      }
      .topic-right{
        width: 372px;
        font-size: 18px;
        .slider-list{
          margin-top: 4px;
          line-height: 38px;
          .left{
            width: 106px;
            float: left;
            color: #979699;
          }
          .center{
            width: 190px;
             float: left;
          }
          .right{
            float: right;
            padding-right: 4px;
          }
        }
        .analysis{
          line-height: 60px;
          color: #808080;
        }
        .diff-level{
          color: #f59631;
          line-height: 1.4;
        }
      }
      .pd-left{
        padding-left: 15px;
      }
      .title{
        line-height: 50px;
        color: #fff;
        font-family: "宋体";
        font-size: 18px;
        padding-left: 50px; 
        background: #5a9cff;
        &.bg-icon{
          background: #5a9cff url(../assets/images/icon-list.png) 18px center no-repeat;
        }
      }
    }
  }

}
</style>
