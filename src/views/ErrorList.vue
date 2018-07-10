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
          <p class="info-list">
            <span>出题人：</span><span> {{randomItem[start].trueName}}</span>
          </p>
          <p class="info-list">
            <span>出题时间：</span><span>{{randomItem[start].createTime}}</span>
          </p>
          <!-- <p class="info-list"><span>章节选择：</span><span v-for="(item, index) in chapterList" :key="index" v-if="item.pointId == pointId[0]">{{ item.pointName}}</span></p> -->
          <!-- <p class="info-list"><span>题库类型：</span><span v-for="(item, index) in QusTypeList" :key="index">{{ item }}&nbsp;&nbsp;</span></p> -->
        </div>
        <div class="more-button"></div>
        <div class="topic-item">
          <div class="f-l topic-left">
            <p class="title bg-icon" v-if="typeList[randomItem[start]['questionTypeId']-1]">{{ typeList[randomItem[start]['questionTypeId']-1]['name'] }}</p>
            <div class="pd-left" v-if="randomItem[start]">
              <div class="pd-left-wrap">
                <div class="pd-left-item" v-if="randomItem[start]['questionTypeId'] == 1">
                  <div class="raido-list">
                    <input type="hidden" v-model="questionid">
                    <div class="raido-title">{{ start+1 }}、{{ randomItem[start].content.title }}</div>
                    <p v-for="(num, index) in randomItem[start].content.choiceList " :key="index">
                      <input type="radio" :id="'radio'+(start+1)+'-'+index"  :value="index" v-model="radioNames[start]" @click="disabledItem(index)" :disabled="disabled">
    <!--  -->

                    <label :for="'radio'+(start+1)+'-'+index">{{ index }}、<span>{{ num }}</span></label></p>
                    <span class="answer-number" v-if="radioNames[start]  && radioNames[start] != randomItem[start].answer">参考答案：{{ randomItem[start].answer }}</span>
                  </div>
                  <!-- <p class="answer-style other-answer" v-if="radioNames[start]">其他的答案: <input maxlength="1" type="text" v-model="otherAnswer"/></p> -->
                  <p class="answer-style" v-if="contentMsgShow">我的建议答案: {{ contentMsg }}</p>
                  <p class="reference-msg">我的建议答案</p>
                  <div class="textarea-mn">
                    <textarea maxlength="20" cols="30" rows="10" placeholder="请在此输入您的参考答案" v-model.trim="contentMsgText"></textarea>
                    <p class="t-right">限20字以内 <span @click="submitComment">发表</span> </p>
                  </div>
                </div>


              <div class="pd-left-item" v-else-if="randomItem[start]['questionTypeId'] == 2">
                  <div class="raido-list">
                    <input type="hidden" v-model="questionid">
                    <div class="raido-title">{{ start+1 }}、{{ randomItem[start].content.title }}</div>
                    <p v-for="(num, index) in randomItem[start].content.choiceList " :key="index">
                      <input type="checkbox" :id="'checkbox'+(start+1)+'-'+index"  :value="index" v-model="checkboxNames" :disabled="disabled">

                    <label :for="'checkbox'+(start+1)+'-'+index">{{ index }}、<span>{{ num }}</span></label></p>
                    <span class="answer-number" v-if="checkboxNamesStr  && checkboxNamesStr != randomItem[start].answer">参考答案：{{ randomItem[start].answer }}</span>
                    <div class="answer-confirm">
                      <span  @click="disabledItem('checkbox')">确认答案</span>
                    </div>
                  </div>
                  <!-- <p class="answer-style other-answer" v-if="checkboxNamesStr">其他的答案: <input type="text" v-model="otherAnswer" placeholder="多个答案用,号隔开"/></p> -->
                  <p class="answer-style" v-if="contentMsgShow">我的建议答案: {{ contentMsg }}</p>
                  <p class="reference-msg">我的建议答案</p>
                  <div class="textarea-mn">
                    <textarea maxlength="20" cols="30" rows="10" placeholder="请在此输入您的参考答案" v-model.trim="contentMsgText"></textarea>
                    <p class="t-right">限20字以内 <span @click="submitComment">发表</span> </p>
                  </div>
                </div>

                <div class="pd-left-item" v-if="randomItem[start]['questionTypeId'] == 3">
                  <div class="raido-list">
                    <input type="hidden" v-model="questionid">
                    <div class="raido-title">{{ start+1 }}、{{ randomItem[start].content.title }}</div>
                    <p>
                      <input type="radio" :id="'radio'+(start+1)+'-A'" value="A" v-model="radioNames[start]" @click="disabledItem(1)" :disabled="disabled">
                             <label :for="'radio'+(start+1)+'-'+'-A'">A、正确</label>
                    </p>
                    <p>
                      <input type="radio" :id="'radio'+(start+1)+'-B'" value="B" v-model="radioNames[start]" @click="disabledItem(2)" :disabled="disabled">
                             <label :for="'radio'+(start+1)+'-B'">B、错误</label>
                      </p>
                    <span class="answer-number" v-if="radioNames[start]  && radioNames[start] != randomItem[start].answer">参考答案：{{ randomItem[start].answer }}</span>
                  </div>
                  <!-- <p class="answer-style other-answer" v-if="radioNames[start]">其他的答案: <input maxlength="1" type="text" v-model="otherAnswer"/></p> -->
                  <p class="answer-style" v-if="contentMsgShow">我的建议答案: {{ contentMsg }}</p>
                  <p class="reference-msg">我的建议答案</p>
                  <div class="textarea-mn">
                    <textarea maxlength="20" cols="30" rows="10" placeholder="请在此输入您的参考答案" v-model.trim="contentMsgText"></textarea>
                    <p class="t-right">限20字以内 <span @click="submitComment">发表</span> </p>
                  </div>
                </div>


              </div>

              <p class="reference-msg">其它答案</p>
              <div class="msg-list" v-for="(item, index) in answersList.comments" :key="index">
                <div class="msg-page-number">0{{ index+1 }}</div>
                <div class="msg-page-content">
                  <p>{{ item.username }}</p>
                  <p><span v-if="item.referenceAnswer">{{ (item.referenceAnswer)+'&nbsp;&nbsp;&nbsp;' }}</span>{{ item.contentMsg }}</p>
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
              <div class="slider-list clearfix">
                <div class="left">差题: </div>
                <el-slider v-model="level" class="center"></el-slider>
                <div class="right">好题</div>
              </div>
              <p class="analysis" v-if="radioNames[start] || checkboxNamesStr">题目解析</p>
              <!-- <p class="diff-level">难度等级:</p> -->
              <!-- <p class="diff-level" v-if="radioNames[start]  && radioNames[start] != randomItem[start].answer">{{ randomItem[start].analysis}}</p> -->
              <p class="diff-level" v-if="radioNames[start] || checkboxNamesStr">{{ randomItem[start].analysis}}</p>
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
    radioNames: [],
    checkboxNames: [],
    checkboxNamesStr: "",
    contentMsg: "",
    level: 0,
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
    pointId: [],
    questionTypeId: [],
    curriculumList: [],
    questionid: 1,
    disabled: false,
    QusTypeList: [],
    contentMsgShow: false,
    contentMsgText: "",
    otherAnswer: "",
    typeList: []
  }),
  computed: {
    ...mapState({
      answersList: state => state.exam.answersList,
      commentList: state => state.exam.commentList,
      // typeList: state => state.question.typeList,
      // curriculumList: state => state.curriculumList,
      chapterList: state => state.chapterList
    })
  },

  created() {
    this.fieldId = this.$route.query.fieldId;
    // this.pointId = this.$route.query.pointId.split(",");

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
      let tikuId = this.$route.query.question
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

       this.$store
          .dispatch("EXAM_ERROR_LIST_FETCH", {
            fieldId: this.fieldId
          })
          .then(res => {
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
          });
    } else {
      this.$router.push(`/`);
    }

    this.getPath();
  },
  methods: {
    disabledItem(id) {
      if (id) {
        if (id == "checkbox") {
          if (this.checkboxNames.length) {
            this.checkboxNamesStr = this.checkboxNames.sort().join(' ');
            this.disabled = true;
          }
        } else {
          this.disabled = true;
        }
      }
    },
    getCommentList(id) {
      // 我的题库
      this.$store.dispatch("EXAM_ANSWERS_PAGE", {
        commentType: "0",
        referId: id + "",
        index: "0",
        indexId: "7"
      });
    },
    sliceItem() {
      this.sliderNumber = this.sliderList.map((v, i) => {
        return v.value;
      });

      let answer = this.randomItem[this.start].answer;
      let thisRandom = this.randomItem[this.start];
      if(thisRandom.questionTypeId == 2){
        answer = answer.split(' ').join()
        this.checkboxNamesStr = this.checkboxNamesStr.split(' ').join()
      }else if(thisRandom.questionTypeId == 3){
        if(answer == 'A'){
          answer = 'T'
        }else if(answer == 'B'){
          answer = 'F'
        }
        if(this.radioNames[this.start] == 'A'){
          this.radioNames[this.start] = 'T'
        }else if(this.radioNames[this.start] == 'B'){
          this.radioNames[this.start] = 'F'
        }
      }
      this.$store
        .dispatch("QUESTION_PRACTICE_IMPROVE", {
          questionHistory: {
            questionId: this.questionid + "", //题目id
            answer, //参考答案
            myAnswer: this.radioNames[this.start] || this.checkboxNamesStr, //自己的答案
            questionTypeId: thisRandom.questionTypeId + "", //题目类型id
            pointId: thisRandom.knowledgePointId + "" //章节id
          },
          comment: {
            referId: this.questionid, // 题目ID
            commentType: "",
            indexId: "",
            userId: "",
            contentMsg: this.contentMsg, // 内容
            reId: "",
            difficulty: this.sliderNumber[0], // 题目难度
            speciality: this.sliderNumber[1], // 题目专业度
            importance: this.sliderNumber[2], // 知识重要性
            knowledgeCorrelation: this.sliderNumber[3], // 知识相关性
            level: this.level, //好差程度
            referenceAnswer: this.otherAnswer // 其他答案
          }
        })
        .then(res => {
          if (res.result == "success") {
            if (this.start < this.randomItem.length - 1) {
              this.start++;
              this.questionid = this.randomItem[this.start].questionId;
              this.contentMsg = "";
              this.radioNames[this.start] = "";
              this.level = 0;
              this.sliderList = this.sliderList.map((v, i) => {
                v.value = 0;
                return v;
              });
              this.disabled = false;
              this.contentMsg = "";
              this.contentMsgShow = false;
              this.otherAnswer = "";
              this.checkboxNamesStr = "";
              this.checkboxNames = [];
              this.getCommentList(this.questionid);

              this.$message({
                message: "提交成功！查看下一题",
                type: "success"
              });
              document.documentElement.scrollTo(0, 0);
            } else {
              this.$message({
                message: "本次练习已完成！请选择其他题库练习",
                type: "success"
              });
            }
          }
        });
    },
    submitComment() {
      // 提交留言
      if(this.contentMsgText){
        this.contentMsgShow = true;
        this.contentMsg = this.contentMsgText;
        this.contentMsgText = "";
      }else{
        this.$message({
          message: "请输入你的参考答案！",
          type: "error"
        });
      }

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