<template>
  <div class="examiner-page" v-if="randomItem.length">
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
          <p class="info-list">
            <span>课程选择：</span><span v-for="(item, index) in curriculumList" :key="index" v-if="item.fieldId == fieldId">{{ item.fieldName}}</span>
          </p>
          <p class="info-list"><span>章节选择：</span><span v-for="(item, index) in chapterList" :key="index" v-if="item.pointId == fieldId">{{ item.pointName}}</span></p>         
          <p class="info-list"><span>题库类型：</span><span v-for="(item, index) in QusTypeList" :key="index">{{ item }}</span></p>
        </div>
        <div class="more-button"></div>
        <div class="topic-item">
          <div class="f-l topic-left">
            <p class="title bg-icon">{{ typeList[randomItem[start]['questionTypeId']-1]['name'] }}</p>
            <div class="pd-left" v-if="randomItem[start]">
              <div class="pd-left-wrap">
                <div class="pd-left-item" v-if="randomItem[start]['questionTypeId'] == 1">
                  <div class="raido-list">
                    <input type="hidden" v-model="questionid">
                    <div class="raido-title">{{ start+1 }}、{{ randomItem[start].content.title }}</div>
                    <p v-for="(num, index) in randomItem[start].content.choiceList " :key="index">
                      <input type="radio" :id="'radio'+(start+1)+'-'+index"  :value="index" v-model="radioNames[start]" @click="disabledItem(index)" :disabled="disabled">
    <!--  -->

                    <label :for="'radio'+(start+1)+'-'+index">{{ index }}、{{ num }}</label></p>
                    <span class="answer-number" v-if="radioNames[start]  && radioNames[start] != randomItem[start].answer">参考答案：{{ randomItem[start].answer }}</span>
                  </div>
                  <p class="answer-style other-answer" v-if="radioNames[start]">其他的答案: {{ radioNames[start] }}</p>
                  <p class="answer-style" v-if="radioNames[start]  && radioNames[start] != randomItem[start].answer">我的参考答案: {{ randomItem[start].analysis}}</p>
                  <p class="reference-msg">我的参考答案解析</p>
                  <div class="textarea-mn">
                    <textarea maxlength="20" cols="30" rows="10" placeholder="请在此输入您的参考答案" v-model.trim="contentMsg"></textarea>
                    <p class="t-right">限20字以内 <span @click="submitComment">发表</span> </p>
                  </div>
                </div>


              <div class="pd-left-item" v-else-if="randomItem[start]['questionTypeId'] == 2">
                  <div class="raido-list">
                    <input type="hidden" v-model="questionid">
                    <div class="raido-title">{{ start+1 }}、{{ randomItem[start].content.title }}</div>
                    <p v-for="(num, index) in randomItem[start].content.choiceList " :key="index">
                      <input type="radio" :id="'radio'+(start+1)+'-'+index"  :value="index" v-model="radioNames[start]" @click="disabledItem(index)" :disabled="disabled">
    <!--  -->

                    <label :for="'radio'+(start+1)+'-'+index">{{ index }}、{{ num }}</label></p>
                    <span class="answer-number" v-if="radioNames[start]  && radioNames[start] != randomItem[start].answer">参考答案：{{ randomItem[start].answer }}</span>
                  </div>
                  <p class="answer-style other-answer">其他的答案: {{ randomItem[start].answer }}</p>
                  <p class="answer-style" v-if="radioNames[start]  && radioNames[start] != randomItem[start].answer">参考答案解析: {{ randomItem[start].analysis}}</p>
                  <p class="reference-msg">我的参考答案</p>
                  <div class="textarea-mn">
                    <textarea maxlength="20" cols="30" rows="10" placeholder="请在此输入您的参考答案" v-model.trim="contentMsg"></textarea>
                    <p class="t-right">限20字以内 <span @click="submitComment">发表</span> </p>
                  </div>
                </div>

                
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
            <div class="msg-button" @click="sliceItem">
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
              <!-- <p class="diff-level">难度等级:</p> -->
              <!-- <p class="diff-level" v-if="radioNames[start]  && radioNames[start] != randomItem[start].answer">{{ randomItem[start].analysis}}</p> -->
              <p class="diff-level" v-if="radioNames[start]  && radioNames[start] != randomItem[start].answer">{{ randomItem[start].analysis}}</p>
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
    contentMsg: '',
    sliderList:[{
      name: '难度',
      value: 0,
    },{
      name: '专业性',
      value: 0,
    },{
      name: '重要性',
      value: 0,
    },{
      name: '知识相关性',
      value: 0,
    }],
    sliderNumber: [],
    randomItem: [],
    start: 0,
    fieldId: 1,
    pointId: [],
    questionTypeId: [],
    curriculumList: [],
    questionid: 1,
    disabled: false,
    QusTypeList:[]
  }),
  computed: {
    ...mapState({
      answersList: state => state.exam.answersList,
      commentList: state => state.exam.commentList,
      typeList: state => state.question.typeList,
      // curriculumList: state => state.curriculumList,
      chapterList: state => state.chapterList,
    })
  },

  created() {

    this.$store.dispatch("QUESTION_TYPE_SET", {});

    this.fieldId = this.$route.query.fieldId;
    this.pointId = this.$route.query.pointId.split(',');
    this.questionTypeId = this.$route.query.questionTypeId.split(',');

    if(this.fieldId){

      this.$store.dispatch("CURRICULUM_LIST_FETCH", {
        questionsId: this.fieldId
      }).then( res => {


        this.curriculumList = res
      })
      this.$store.dispatch("CHAPTER_LIST_FETCH", {
        fieldId: this.fieldId
      }).then( res => {
        if(res.result == 'success' && res.object){
          this.typeList.forEach((val, index) => {
            this.questionTypeId.forEach((qusVal, qusIndex) => {
              if(val.id == qusVal){
                this.QusTypeList.push(val.name)
              }
            })
          })
        }
      });

      this.$store.dispatch("QUESTION_RANDOM_SET", {
        fieldId: this.fieldId,
        pointId: this.pointId,
        questionTypeId: this.questionTypeId
      }).then( res => {
        if(res.object){
          this.randomItem = res.object
          this.questionid =  this.randomItem[this.start].questionId
          this.randomItem.map((val, index, arr) =>{
            return val.content = JSON.parse(val.content)
          })
          this.getCommentList(this.questionid)


          this.randomItem[this.start]['questionTypeId'] = 2;
        }else{
        }
      })
    }else{
      this.$router.push(`/`)
    }

    this.getPath()
  },
  methods: {
    disabledItem(id) {
      if(id){
        this.disabled = true;
      }

    },
    getCommentList(id){
      // 我的题库
      this.$store.dispatch('EXAM_ANSWERS_PAGE', {
        "commentType":"0",
        "referId": id+'',
        "index":"0",
        "indexId":"7"
      })
    },
    sliceItem(){
      let answer = this.randomItem[this.start].answer
      let thisRandom = this.randomItem[this.start]
      this.$store.dispatch('QUESTION_PRACTICE_IMPROVE', {
          "questionId": this.questionid+'',  //题目id
          answer,			//参考答案
          "myAnswer": this.radioNames[this.start],     //自己的答案
          "questionTypeId": thisRandom.questionTypeId+'', //题目类型id
          "pointId": thisRandom.knowledgePointId+''    //章节id
        }).then( res => {
          if(res.result == "success"){
            if(this.start < this.randomItem.length - 1){
              this.start++
              this.questionid =  this.randomItem[this.start].questionId
              this.contentMsg = ''
              this.radioNames[this.start] = ''
              this.sliderList = this.sliderList.map((v, i) => {
                v.value = 0
                return v;
              })
              this.disabled = false;
              this.getCommentList(this.questionid)

              this.$message({
                message: "提交成功！查看下一题",
                type: "success"
              });
              document.documentElement.scrollTo(0,0);
            }else{
              this.$message({
                message: "本次练习已完成！请选择其他题库练习",
                type: "success"
              });
            }

          }
      })

    },
    submitComment(){ // 提交留言
      this.sliderNumber = this.sliderList.map((v, i) => {
        return v.value
      })
      this.$store.dispatch('SBUMIT_ANSWERS_PAGE', {
          "referId": this.questionid, // 题目ID
          "commentType":"0",
          "indexId":"7",
          "userId":"2",
          "contentMsg": this.contentMsg, // 内容
          "reId":"1",
          "difficulty": this.sliderNumber[0], // 题目难度
          "speciality": this.sliderNumber[1], // 题目专业度
          "importance": this.sliderNumber[2], // 知识重要性
          "knowledgeCorrelation": this.sliderNumber[3], // 知识相关性
          "referenceAnswer": this.radioNames[this.start] // 参考答案
        }).then( res => {
          console.log(res)
          if(res.result == "success"){
            this.contentMsg = ''
            this.$message({
              message: "发表成功！",
              type: "success"
            });
            this.getCommentList(this.questionid)
          }
      })
    },
    getPath() {
      this.path = this.$route.path
      let that = this;
    },
    pingfen(){




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
      margin-bottom: 40px;
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
          line-height: 30px;
          padding-top: 15px;
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
          margin-top: 20px;
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
