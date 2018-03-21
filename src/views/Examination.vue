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
        <p class="list-title">{{ examContent.name }}试卷测试题 <span>共计:{{ contentLength }}题</span></p>
        <div class="list-main">
          <div class="main-left">
            <div class="box-line timing">
              <p class="line-title title-icon">考试计时</p>
              <div class="line-times">
                <el-progress class="test" type="circle" :percentage="progressing" :show-text="false" :width="156"></el-progress>
                <span class="line-timing" v-html="format"></span>
              </div>
              <div class="timing-number">
                  <p class="test-time">开考时间&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;结束时间</p>
                  <p class="test-number">{{ setDate(examContent.startTime) }}&nbsp;&nbsp;&nbsp;——&nbsp;&nbsp;&nbsp;{{ setDate(examContent.endTime) }}</p>
                  <p class="count-number">总时长:{{ totalTime() }}</p>
                </div>
            </div>
            <div class="box-line examinee">
              <p class="line-title title-icon">考生信息</p>
              <div class="student-info">
                <p class="info-list"><span>考生姓名:</span> <span>{{ examContent.userName }}</span></p>
                <p class="info-list"><span>试卷名称:</span> <span>{{ examContent.examName }}</span></p>
                <!-- <p class="info-list"><span>试卷题库:</span> <span>单选题 多选题 案例题</span></p> -->
                <p class="info-list"><span>数量:</span> <span>共{{ contentLength }}题</span></p>
                <p class="info-list"><span>时长:</span> <span>{{ totalTime() }}</span></p>
                <p class="info-list"><span>开始时间:</span> <span>{{ setTime(examContent.startTime) }}</span></p>
              </div>
            </div>
          </div>
          <div class="box-line main-right">
  
            <!-- 1 单选
            2 多选
            3 判断
            4 填空 
            5 解答
            6 论述
            7 分析 -->

             <p class="line-title border-bottom">单选题</p>
             
            <div v-for="( item, index) in examContent.content" :key="index">
             
              <div  v-if="item.questionTypeId === 1">
                
                  <div class="raido-list">
                    <div class="raido-title">{{ index+1 }}、{{ item.content.title }}</div>
                    <p v-for="(num, i) in item.content.choiceList" :key="i">

                       <input type="radio" :id="'radio'+(index+1)+'-'+i"  :value="index" v-model="radioNames[index]">
                       <label :for="'radio'+(index+1)+'-'+i">{{ i }}、{{ num }}</label>

                      <!-- <input type="radio" :id="'radio'+(index+1)+'-'+(i+1)"  :value="letter[i]" v-model="radioNames[index]">
                      <label :for="'radio'+(index+1)+'-'+(i+1)">{{ letter[i]}}、{{ num }}</label> -->
                    </p>
                   ---  {{ radioNames }}
                  </div>
              </div>
              <!-- <div class="raido-list" v-for="(item, index) in dataList" :key="index">
                <div class="raido-title">{{ index+1 }}、{{ item.name }}</div>
                <p v-for="(num, i) in item.sle" :key="i"><input type="radio" :id="'radio'+(index+1)+'-'+(i+1)"  :value="letter[i]" v-model="radioNames[index]">
                <label :for="'radio'+(index+1)+'-'+(i+1)">{{ letter[i]}}、{{ num }}</label></p>
              </div> -->

              <!-- {{ radioNames }} -->
              <!-- <p class="line-title border-bottom" v-if="item.questionTypeId === 2">多选题</p> -->
              <!-- <div class="raido-list" v-for="(item, index) in dataList2" :key="index">
                <div class="raido-title">{{ index+1 }}、{{ item.name }}</div>
                <p v-for="(num, i) in item.sle" :key="i"><input type="checkbox" :id="'check'+(index+1)+'-'+(i+1)"  :value="letter[i]" v-model="item.aaa">
                <label :for="'check'+(index+1)+'-'+(i+1)">{{ letter[i]}}、{{ num }}</label></p>
              </div> -->
              <!-- {{ dataList2 }} -->

              <!-- <p class="line-title border-bottom" v-if="item.questionTypeId === 3">判断题</p> -->
             
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
  name: "examination-page",
  data() {
    return {
      progressing: 0,
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
      dataList2: [],
      examContent: [],
      contentLength: 0,
      time: '',
      flag: false,
      format: '',
      questionTypeId: []
    };
  },
  computed: {
    ...mapState({ 
      storeExamContent: state => state.exam.storeExamContent,
    }),
  },
  mounted () {

  },
  created() {
    this.init()
    this.getPath()
  },
  methods: {
    init(){
      let examId = this.$route.params.examId;
      let examPaperId = this.$route.params.examPaperId;
        // 最新考试我的测试题
      this.$store.dispatch('EXAM_CONTENT', {
          examId,
          examPaperId
      }).then( res => {

        // this.examContent = res.object

        for (var val in res.object) {
          if(val == 'answer_sheet' || val == 'content'){
            res.object[val] = JSON.parse(res.object[val])
          }
          if(val == 'startTime' || val == 'endTime'){
            res.object[val] = res.object[val] - 8 * 60 * 60 * 1000;
          }
          
          
          

        }
        for(let key in res.object.content){
          for(let keyio in res.object.content[key]){
            if(keyio == 'questionTypeId'){
              this.questionTypeId.push(res.object.content[key][keyio])
            }
            if(keyio == 'content'){
              res.object.content[key][keyio] = JSON.parse(res.object.content[key][keyio])
            }

          }
            
          }
        
          this.questionTypeId = new Set(this.questionTypeId)
  console.log( this.questionTypeId )
        this.examContent = res.object
        this.contentLength = this.examContent.content.length
      })
      this.totalLine()
    },
    totalLine(){
      

    let time = setInterval(()=>{
        if(this.flag == true){
            clearInterval(time)
        }

        let now = this.examContent.endTime - (+new Date()) // 剩余时间
        if( now < 0){
          this.flag = true
          this.progressing = 100
          return this.format = '00:00:00';
        }
          let hour=Math.floor(( now/3600000)%24);  
          let min=Math.floor((now/60000)%60);  
          let sec=Math.floor((now/1000)%60); 
          hour = hour < 10 ? "0" + hour : hour;  
          min = min < 10 ? "0" + min : min;  
          sec = sec < 10 ? "0" + sec : sec;  
          let format = '';  

          if(hour > 0 ){  
            format = `${hour}:${min}:${sec}`;   
          }  
          if(hour <= 0){  
            format =`${min}:${sec}`;  
          }  
          this.format = format
          this.progressing = parseInt((+new Date() - this.examContent.startTime) / (this.examContent.endTime - this.examContent.startTime) *100);
    },1000)


    },
    totalTime(){
      let hours = new Date(this.examContent.endTime).getHours() - new Date(this.examContent.startTime ).getHours(),
          miuntes = new Date(this.examContent.endTime).getMinutes() - new Date(this.examContent.startTime ).getMinutes();
      if( miuntes < 0){
        hours --;
        miuntes = 60 + miuntes
      }
      if(hours <= 0){
        return `${miuntes}分钟`
      }

      if( miuntes <= 0 ){
        return `${hours}小时`
      }

      
      return `${hours}小时${miuntes}分钟`
      // this.examContent.startTime - this.examContent.endTime
    },
    setDate(time){
      let hours = new Date(time).getHours(),
          miuntes = new Date(time).getMinutes();
      if(miuntes < 10){
        miuntes = `0${miuntes}`
      }
      return `${hours}:${miuntes}`

    },
    setTime(time){
      let year = new Date(time).getFullYear(),
          month = new Date(time).getMonth() + 1,
          day = new Date(time).getDate();
      return `${year}-${month}-${day}`
    },
    getPath() {
      this.path = this.$route.path
      let that = this
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
