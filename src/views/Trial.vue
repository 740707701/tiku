
<template>
  <div class="trial-page" v-if="randomItem.length">
    <header-nav></header-nav>
    <div class="big-banner">
      <div class="wrapper">
        <img src="../assets/images/title.png" class="title">
      </div>
    </div>
    <div class="examiner-list">
      <div class="wrapper">
        <!-- <p class="list-title">职业题库</p> -->
        <div class="menu-row">
          <p class="info-list">
            <span>课程选择：</span><span v-for="(item, index) in curriculumList" :key="index" v-if="item.fieldId == fieldId">{{ item.fieldName}}</span>
          </p>
          <p class="info-list"><span>题库类型：</span><span v-for="(item, index) in QusTypeList" :key="index">{{ item }}&nbsp;&nbsp;</span></p>
        </div>
        <div class="more-button"></div>
        <div class="topic-item clearfix">
          <div class="f-l topic-left">
            <p class="title bg-icon" v-if="typeList[randomItem[start]['questionTypeId']-1]">{{ typeList[randomItem[start]['questionTypeId']-1]['name'] }}</p>
            <div class="pd-left">
              <div class="pd-left-item" v-if="randomItem[start]['questionTypeId'] == 1">
                <div class="raido-list">
                  <div class="raido-title">{{ start+1 }}、{{ randomItem[start].content.title }}</div>
                  <p class="raido-options" v-for="(num, index) in randomItem[start].content.choiceList " :key="index">
                    {{index}}、{{ num }}
                  </p>
                  <span class="answer-number">参考答案：{{ randomItem[start].answer }}</span>
                </div>
              </div>

              <div class="pd-left-item" v-else-if="randomItem[start]['questionTypeId'] == 2">
                  <div class="raido-list">
                    <div class="raido-title">{{ start+1 }}、{{ randomItem[start].content.title }}</div>
                    <p class="raido-options" v-for="(num, index) in randomItem[start].content.choiceList " :key="index">
                      {{index}}、{{ num }}
                    </p>
                    <span class="answer-number">参考答案：{{ randomItem[start].answer }}</span>
                  </div>
                </div>

                <div class="pd-left-item" v-if="randomItem[start]['questionTypeId'] == 3">
                  <div class="raido-list">
                    <div class="raido-title">{{ start+1 }}、{{ randomItem[start].content.title }}</div>
                    <p v-if="randomItem[start].answer == 'T'">
                      <span>正确</span>
                    </p>
                    <p v-if="randomItem[start].answer == 'F'">
                      <span>错误</span>
                    </p>
                  </div>
                </div>
                <div class="pd-left-item" v-if="randomItem[start]['questionTypeId'] == (5 || 6 || 7)">
                  <div class="raido-list">
                    <div class="raido-title">{{ start+1 }}、{{ randomItem[start].content.title }}</div>
                    <p>
                      {{randomItem[start].answer}}
                    </p>
                  </div>
                </div>

            </div>
            <div class="msg-button">
              <span @click="trialSubmit">差题</span><span @click="trialSubmit">好题</span>
            </div>

          </div>
          <div class="f-l topic-right">
            <p class="title" @click="pingfen">评分</p>
            <div class="pd-left">
              <div class="slider-list clearfix" v-for="(item, index) in sliderList" :key="index">
                <div class="left">{{ item.name }}: </div><el-slider v-model="item.value" class="center"></el-slider><div class="right">{{ item.value }}分</div>
              </div>
              <!-- <p class="analysis">其他人对比</p>
              <div class="qita">
                <p>重要性 <span>60</span> </p>
                <p>专业性 <span>60</span></p>
                <p>知识相关性 <span>60</span></p>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import headerNav from "../components/Header.vue";

import { mapState } from "vuex";

export default {
  name: "examiner-page",
  data: () => ({
    progressing: 60,
    sliderList: [
      {
        name: "难度",
        value: 0
      },
      {
        name: "专业性",
        value: 0
      },
      {
        name: "重要性",
        value: 0
      },
      {
        name: "知识相关性",
        value: 0
      }
    ],
    sliderNumber: [],
    randomItem: [],
    start: 0,
    fieldId: 1,
    questionTypeId: [],
    curriculumList: [],
    questionid: 1,
    QusTypeList: [],
    typeList: []
  }),
  computed: {
    ...mapState({
      commentList: state => state.exam.commentList,
      // typeList: state => state.question.typeList,
      // curriculumList: state => state.curriculumList,
      chapterList: state => state.chapterList
    })
  },

  created() {
    this.fieldId = this.$route.query.fieldId;
    this.questionTypeId = this.$route.query.questionTypeId.split(',');

    this.$store.dispatch("QUESTION_TYPE_SET", {}).then(res => {
      if (res.result == "success" && res.object) {
        this.typeList = res.object;
        this.typeList.forEach((val, index) => {
          this.questionTypeId.forEach((qusVal, qusIndex) => {
            if (val.id == qusVal) {
              this.QusTypeList.push(val.name);
            }
          });
        });
      }
    });

    if (this.fieldId) {
      let tikuId = this.$route.query.questions
      this.$store
        .dispatch("CURRICULUM_LIST_FETCH", {
          questionsId: tikuId
        })
        .then(res => {
          this.curriculumList = res.object;
        });
      this.$store.dispatch("CHAPTER_LIST_FETCH", {
        fieldId: this.fieldId
      });

      this.$store.dispatch('QUESTION_UNAUDITED', {
        fieldId: this.fieldId,
        questionTypeId: this.questionTypeId
      }).then(res => {
        if (res.object) {
          res.object.forEach((val, index, arr) => {
            val.content = JSON.parse(val.content);
            if(!!val.content){
              if (val['questionTypeId'] == 1){
                val.answer = val.answer.toUpperCase()
              }else if (val['questionTypeId'] == 2){
                val.answer = val.answer.indexOf(',') >= 0? val.answer.split(',') : (val.answer.indexOf('，') >= 0 ? val.answer.split('，') : val.answer.split(''))

                val.answer.map((i, value) => {
                  return i.toUpperCase()
                })
                val.answer = val.answer.join(' ')
              }

              this.randomItem.push(val)
            }
          });
          if(this.randomItem.length){
            this.questionid = this.randomItem[this.start].questionId;
          }
        } else {
        }
      })
    } else {
      this.$router.push(`/`);
    }

    this.getPath();
  },
  methods: {
    trialSubmit() {
      this.sliderNumber = this.sliderList.map((v, i) => {
        return v.value;
      });

      this.$store.dispatch("UPDATE_EXAMINE", {
        id: this.questionid+'',
        difficultynew: this.sliderNumber[0], // 题目难度
        speciality: this.sliderNumber[1], // 题目专业度
        importance: this.sliderNumber[2], // 知识重要性
        knowledgeCorrelation: this.sliderNumber[3], // 知识相关性
      }).then(res => {
        if (res.result == "success") {
          if (this.start < this.randomItem.length - 1) {
            this.start++;
            this.questionid = this.randomItem[this.start].questionId;
            this.sliderList = this.sliderList.map((v, i) => {
              v.value = 0;
              return v;
            });
            this.$message({
              message: "提交成功！查看下一题",
              type: "success"
            });
            document.documentElement.scrollTo(0, 0);
          } else {
            this.$message({
              message: "本课程审核已完成！请选择课程开始审核",
              type: "success"
            });
          }
        }
      });

    },

    getPath() {
      this.path = this.$route.path;
      let that = this;
    },
    pingfen() {},
    handleClick(tab, event) {
      console.log(tab, event);
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
@import "../assets/css/style.less";
.trial-page {
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
       margin-bottom: 30px;
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
            word-break: break-all;
            &.raido-options{
              width: 70%;
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
          margin: 30px auto;
          >span{
            padding: 10px 44px;
            color: #fff;
            font-size: 16px;
            border-radius: 4px;
            background: #5a9cff;
            cursor: pointer;
            margin-right: 36px;
            margin-left: 14px;
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
        .qita{
          box-sizing: border-box;
          p{
            width: 33.3%;
            float: left;
            text-align: center;
            color: 18px;
            color: #979699;
            span{
              padding-top: 20px;
              display: block;
              font-size: 20px;
              color: #000;
            }
          }
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
