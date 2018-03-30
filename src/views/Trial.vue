
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
                let oldAnswer = val.answer.indexOf(',') >= 0? val.answer.split(',') : (val.answer.indexOf('，') >= 0 ? val.answer.split('，') : val.answer.split(''))
                val.answer = []
                oldAnswer.forEach((i, value) => {
                  if(val.answer.indexOf(i.toUpperCase()) < 0){
                    val.answer.push(i.toUpperCase())
                  }
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
  .examiner-list{
     .topic-item{
       .topic-left{
        .msg-button{
          margin: 30px auto;
          text-align: left;
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
     } 

  }
</style>
