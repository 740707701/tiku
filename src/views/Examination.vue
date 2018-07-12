<template>
  <div class="examination-page">
    <header-nav></header-nav>
    <div class="big-banner">
      <div class="wrapper">
        <img src="../assets/images/title.png" class="title">
      </div>
    </div>
    <div class="examination-list" v-if="storeExamContent">
      <div class="wrapper">
        <p class="list-title">{{ examContent.name }}试卷测试题 <span>共计:{{ contentLength }}题</span></p>
        <div class="list-main">
          <div class="main-left">
            <div class="box-line timing">
              <p class="line-title title-icon">考试计时</p>
              <div class="line-times">
                <el-progress class="test" type="circle" :percentage="progressing" :show-text="false" :width="120"></el-progress>
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
            <div class="main-right-wrap">
              <!-- 1 单选
              2 多选
              3 判断
              4 填空
              5 解答
              6 论述
              7 分析 -->
                        <div class="main-right-item" v-for="(id, idIndex) in questionTypeId" :key="idIndex">
                          <div v-if="id === 1">
                            <p class="line-title border-bottom">单选题</p>
                            <div class="raido-list" v-for="( item, index) in radioNamesContent" :key="idIndex+'-'+index">
                              <div class="raido-title">{{ index+1 }}、{{ item.content.title }}</div>
                              <p v-for="(num, i) in item.content.choiceList" :key="i">

                                 <input type="radio" :id="'radio'+idIndex+'-'+(index+1)+'-'+i"  :value="i" v-model="radioNames[index]">
                                 <label :for="'radio'+idIndex+'-'+(index+1)+'-'+i">{{ i }}、{{ num }}</label>
                              </p>
                            </div>
                        </div>
                        <div v-else-if="id === 2">
                          <p class="line-title border-bottom">多选题</p>
                          <div class="raido-list" v-for="( item, index) in checkboxNamesContent" :key="idIndex+'-'+index">
                            <div class="raido-title">{{ index+1 }}、{{ item.content.title }}</div>
                            <p v-for="(num, i) in item.content.choiceList" :key="i">

                               <input type="checkbox" :id="'checkbox'+idIndex+'-'+(index+1)+'-'+i"  :value="i" v-model="checkboxNames[index]">
                               <label :for="'checkbox'+idIndex+'-'+(index+1)+'-'+i">{{ i }}、{{ num }}</label>
                            </p>
                          </div>
                      </div>
                      <div v-else-if="id === 3">
                        <p class="line-title border-bottom">判断题</p>
                        <div class="raido-list" v-for="( item, index) in judgeNamesContent" :key="idIndex+'-'+index">
                          <div class="raido-title">{{ index+1 }}、{{ item.content.title }}</div>

                          <p>
                             <input type="radio" :id="'radio'+idIndex+'-'+(index+1)+'-T'" value="T" v-model="judgeNames[index]">
                             <label :for="'radio'+idIndex+'-'+(index+1)+'-T'">A、正确</label>
                          </p>
                          <p>
                             <input type="radio" :id="'radio'+idIndex+'-'+(index+1)+'-F'" value="F" v-model="judgeNames[index]">
                             <label :for="'radio'+idIndex+'-'+(index+1)+'-F'">B、错误</label>
                          </p>
                        </div>
                    </div>
                    <div v-else-if="id === 5">
                      <p class="line-title border-bottom">简答题</p>
                      <div class="raido-list" v-for="( item, index) in answerNamesContent" :key="idIndex+'-'+index">
                        <div class="raido-title">{{ index+1 }}、{{ item.content.title }}</div>

                        <div class="textarea-mn">
                          <textarea cols="30" rows="10" placeholder="答：200字以内" v-model.trim="answerNames[index]"></textarea>
                        </div>
                      </div>
                  </div>
                    <div v-else-if="id === 6">
                      <p class="line-title border-bottom">论述题</p>
                      <div class="raido-list" v-for="( item, index) in discussNamesContent" :key="idIndex+'-'+index">
                        <div class="raido-title">{{ index+1 }}、{{ item.content.title }}</div>
                        <div class="textarea-mn">
                          <textarea cols="30" rows="10" placeholder="答：" v-model.trim="discussNames[index]"></textarea>
                        </div>
                      </div>
                  </div>
                  <div v-else-if="id === 7">
                    <p class="line-title border-bottom">分析题</p>
                    <div class="raido-list" v-for="( item, index) in analysisNamesContent" :key="idIndex+'-'+index">
                      <div class="raido-title">{{ index+1 }}、{{ item.content.title }}</div>

                      <div class="textarea-mn">
                        <textarea cols="30" rows="10" placeholder="答：" v-model.trim="analysisNames[index]"></textarea>
                      </div>
                    </div>
                </div>

              </div>
            </div>
            <p class="main-right-btn">
              <span @click="examSubmit">提交</span>
              <!-- <span @click="centerDialogVisible = true">提交</span> -->
            </p>
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
  name: "examination-page",
  data() {
    return {
      progressing: 0,
      radioNames: [],
      checkboxNames: [],
      judgeNames: [],
      tiankongNames: [],
      answerNames: [],
      discussNames: [],
      analysisNames: [],
      examContent: [],
      radioNamesContent: [],
      checkboxNamesContent: [],
      judgeNamesContent: [],
      answerNamesContent: [],
      discussNamesContent: [],
      analysisNamesContent: [],
      contentLength: 0,
      time: "",
      flag: false,
      format: "",
      questionTypeId: [],
      answerSheetItems: [],
      centerDialogVisible: false,
      enterTime: '',
      examHistroyId: ''
    };
  },
  computed: {
    ...mapState({
      storeExamContent: state => state.exam.storeExamContent
    })
  },
  mounted() {
    this.enterTime = new Date()
  },
  created() {
    this.init();
    this.getPath();
  },
  methods: {
    init() {
      let examId = this.$route.params.examId;
      let examPaperId = this.$route.params.examPaperId;
      // 最新考试我的测试题
      this.$store
        .dispatch("EXAM_CONTENT", {
          examId,
          examPaperId
        })
        .then(res => {
          // this.examContent = res.object
          if(!res.object || !res.object.content) return;
          for (var val in res.object) {
            if (val == "answer_sheet" || val == "content") {
              res.object[val] = JSON.parse(res.object[val]);
            }
            if (val == "startTime" || val == "endTime") {
              res.object[val] = res.object[val];
            }
          }
          let answerArrStr = [
            "radioNames",
            "checkboxNames",
            "judgeNames",
            "tiankongNames",
            "answerNames",
            "discussNames",
            "analysisNames"
          ];
          for (let key in res.object.content) {
            let obj = {};
            for (let keyio in res.object.content[key]) {
              if (keyio == "content") {
                res.object.content[key][keyio] = JSON.parse(
                  res.object.content[key][keyio]
                );
                obj["comment"] = res.object.content[key][keyio]["title"];
              }

              if (keyio == "questionTypeId") {
                obj["questionTypeId"] = res.object.content[key][keyio];
                this.questionTypeId.push(res.object.content[key][keyio]);
                if (res.object.content[key][keyio] === 2) {
                  this.checkboxNames.push([]);
                } else {
                  this[answerArrStr[res.object.content[key][keyio] - 1]].push(
                    ""
                  );
                }
                this[
                  answerArrStr[res.object.content[key][keyio] - 1] + "Content"
                ].push(res.object.content[key]);
              }

              if (keyio == "questionPoint") {
                obj["answer"] = "";
              }
              if (keyio == "questionId") {
                obj["questionId"] = res.object.content[key][keyio];
              }
            }
            this.answerSheetItems.push(obj);
          }
          this.examHistroyId = res.object.examHistroyId
          this.questionTypeId = new Set(this.questionTypeId);
          this.questionTypeId = [...this.questionTypeId];
          this.examContent = res.object;
          this.contentLength = this.examContent.content.length;
        });
      this.totalLine();
    },
    totalLine() {
      let time = setInterval(() => {
        if (this.flag == true) {
          clearInterval(time);
        }

        let now = this.examContent.endTime - +new Date(); // 剩余时间
        if (now < 0) {
          this.flag = true;
          this.progressing = 100;
          return (this.format = "00:00:00");
        }
        let hour = Math.floor(now / (60 * 60 * 1000));
        let min = Math.floor((now / 60000)) - hour * 60;
        let sec = Math.floor((now / 1000)) - (hour * 60 * 60) - (min * 60)
        hour = hour < 10 ? "0" + hour : hour;
        min = min < 10 ? "0" + min : min;
        sec = sec < 10 ? "0" + sec : sec;
        let format = "";

        if (hour > 0) {
          format = `${hour}:${min}:${sec}`;
        }
        if (hour <= 0) {
          format = `${min}:${sec}`;
        }
        this.format = format;
        this.progressing = parseInt(
          (+new Date() - this.examContent.startTime) /
            (this.examContent.endTime - this.examContent.startTime) *
            100
        );
      }, 1000);
    },
    totalTime() {
      let times = this.examContent.endTime - this.examContent.startTime
      let hours = Math.floor(times / (60 * 60 * 1000));
      let miuntes = Math.floor((times / 60000)) - hours * 60
      if (miuntes < 0) {
        hours--;
        miuntes = 60 + miuntes;
      }
      if (hours <= 0) {
        return `${miuntes}分钟`;
      }

      if (miuntes <= 0) {
        return `${hours}小时`;
      }

      return `${hours}小时${miuntes}分钟`;
      // this.examContent.startTime - this.examContent.endTime
    },
    setDate(time) {
      let hours = new Date(time).getHours(),
        miuntes = new Date(time).getMinutes();
      if (hours < 10) {
        hours = `0${hours}`;
      }
      if (miuntes < 10) {
        miuntes = `0${miuntes}`;
      }
      return `${hours}:${miuntes}`;
    },
    setTime(time) {
      let year = new Date(time).getFullYear(),
        month = new Date(time).getMonth() + 1,
        day = new Date(time).getDate();
      return `${year}-${month}-${day}`;
    },
    getPath() {
      this.path = this.$route.path;
    },
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
    },
    examSubmit() {

      let examId = parseInt(this.$route.params.examId);
      let examPaperId = parseInt(this.$route.params.examPaperId);
      let duration = parseInt(
        (+new Date() - this.enterTime.getTime()) / 1000
      );
      let answers = [
        this.radioNames,
        this.checkboxNames,
        this.judgeNames,
        this.tiankongNames,
        this.answerNames,
        this.discussNames,
        this.analysisNames
      ];
      let answerRus = [];

      if (this.checkboxNames.length) {
        this.checkboxNames.forEach((checkVal, checkIndex, checkArr) => {
          checkArr[checkIndex] = checkVal.sort().join().replace(/\,/g,'');
        });
      }

      this.questionTypeId.forEach((val, index, arr) => {
        answers[val - 1].forEach((ansVal, ansIndex, ansArr) => {
          answerRus.push(ansVal);
        });
      });

      answerRus.forEach((ansRusVal, ansRusIndex, ansRusArr) => {
        this.answerSheetItems[ansRusIndex]["answer"] = ansRusVal;
      });
      let answerSheetItems = this.answerSheetItems;
      console.log(answerSheetItems)
      return
      this.$store
        .dispatch("EXAM_SUBMIT", {
          examId,
          examPaperId,
          duration,
          answerSheetItems,
          startTime: this.enterTime,
          examHistroyId: this.examHistroyId
        })
        .then(res => {
          console.log(res);
          if (res.result == "success") {

            this.$alert(this.examContent.name+'提交成功', '', {
              confirmButtonText: '返回我的考试页面',
              showClose: false,
              type: 'success',
              callback: action => {
                this.$router.push('/exam/latest/')
              }
            });
          }
        });
    }
  },
  components: {
    headerNav
  }
};
</script>
<style lang="less">
.examination-page {
  .examination-list {
    .list-title {
      font-size: 18px;
      color: #333;
      padding-left: 14px;
      border-left: 6px solid #6404ff;
      margin-top: 20px;
      margin-bottom: 26px;
      span {
        color: #b2b2b2;
        float: right;
        font-size: 16px;
      }
    }
    .list-main {
      border-top: 1px solid #ccc;
      padding-top: 30px;
      display: inline-block;
      .main-left {
        float: left;
        width: 200px;
        margin-right: 20px;
        .timing {
          width: 200px;
        }
        .examinee {
          width: 200px;
          font-size: 15px;
          .student-info {
            padding: 0 10px;
            margin-bottom: 20px;
            font-size: 14px;
            .info-list {
              margin-top: 10px;
              span {
                // display: inline-block;
              }
              span:first-child {
                width: 80px;
                color: #b2b2b2;
                vertical-align: top;
              }
              span:last-child {
                // width: 110px;
                line-height: 1.3;
                margin-left: 6px;
                color: #000;
              }
            }
          }
        }

        .line-title {
          margin-top: 10px;
        }
        .title-icon {
          line-height: 28px;
          background: url(../assets/images/icon-clock.png) 14px center no-repeat;
          padding-left: 46px;
        }

        .test svg > path:first-of-type {
          stroke: #fafafa !important;
        }
        .test svg > path:last-of-type {
          stroke: #6809ff !important;
        }

        .line-times {
          // width: 156px;
          // height: 156px;
          // background: linear-gradient(to top, #eedeff, #6402ff);
          // border-radius: 50%;
          margin: 15px auto;
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
          .line-timing {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
        .timing-number {
          color: #333333;
          font-family: "PingFang SC";
          font-size: 14px;
          p {
            margin-bottom: 10px;
          }
          .test-time {
            padding-left: 36px;
          }
          .test-number {
            padding-left: 38px;
          }
          .count-number {
            text-align: center;
            color: #b2b2b2;
            margin-bottom: 20px;
          }
        }
      }
      .main-right {
        float: left;
        width: 980px;
        .main-right-btn {
          padding-bottom: 30px;
          span {
            background: #5a9cff;
            padding: 8px 18px;
            border-radius: 6px;
            color: #fff;
            margin-left: 20px;
            cursor: pointer;
            display: inline-block;
          }
        }

        .main-right-item {
          border-bottom: 5px solid #f7f7f7;
          &:last-child {
            border-bottom: 0;
          }
          .line-title {
            line-height: 60px;
            background: url(../assets/images/icon-list.png) 10px center
              no-repeat;
            padding-left: 50px;
          }
          .border-bottom {
            border-bottom: 5px solid #f7f7f7;
          }
          .raido-list {
            padding-left: 30px;
            border-bottom: 1px solid #ccc;
            &:last-child {
              border-bottom: 0;
            }
            .raido-title {
              padding: 20px 0 20px;
            }
            p {
              margin-bottom: 14px;
              input {
                vertical-align: middle;
                cursor: pointer;
              }
              label {
                padding-left: 16px;
                vertical-align: middle;
                display: inline-block;
                cursor: pointer;
              }
            }
          }

          .textarea-mn {
            position: relative;
            padding: 5px;
            border: 1px solid #ddd;
            margin: 0 30px 20px 0;
            border-radius: 5px;
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
          }
        }
      }

      .box-line {
        box-sizing: border-box;
        border: 1px solid #fafafa;
        box-shadow: 0px 6px 6px #e9e7ea;
        margin-bottom: 30px;
        float: left;
      }
    }
  }
}
</style>
