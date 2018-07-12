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
            <div class="line-box">
              <div class="box-line examinee">
                <p class="line-title clearfix">出题信息</p>
                <div class="student-info">
                  <p class="info-list"><span>题库选择:</span> <span><i v-for="(item, index) in tikuList" :key="index" v-if="item.questionsId == tikuId">{{ item.questionsName }}</i></span></p>
                  <p class="info-list"><span>课程选择:</span> <span><i v-for="(item, index) in curriculumList" :key="index" v-if="item.fieldId == fieldId">{{ item.fieldName}}</i></span></p>
                  <p class="info-list"><span>出题时间:</span> <span>{{nowTime}}</span></p>
                  <p class="info-list"><span>出题者:</span> <span>{{username}}</span></p>
                </div>
              </div>
              <div class="box-line examinee">
                <p class="line-title clearfix">出题状态</p>
                <div class="student-info">
                  <p class="info-list" v-for="(item, index) in QusTypeList" :key="index"><span>{{item.name}}</span></p>
                </div>
              </div>

            </div>
            <div class="img-box">
              <img src="../assets/images/kd-bg.png" alt="">
            </div>
          </div>
          <div class="box-line main-right">

            <el-collapse accordion v-model="activeNames" @change="handleChange" v-for="(item, index) in questionTypeId" :key="index">

              <el-collapse-item title="单选题" v-if="item == 1" :name="(index+1)">
                <div class="raido-list">
                  <div class="raido-title">{{radioTopics.length+1}}、<input class="judge-title" v-model="radioTitle" type="text" placeholder="输入标题"></div>
                  <p class="chuti">A、<input class="judge-option" v-model="radioOptions[0]" type="text" placeholder="输入选项A的内容"></p>
                  <p class="chuti">B、<input class="judge-option" v-model="radioOptions[1]" type="text" placeholder="输入选项B的内容"></p>
                  <p class="chuti">C、<input class="judge-option" v-model="radioOptions[2]" type="text" placeholder="输入选项C的内容"></p>
                  <p class="chuti">D、<input class="judge-option" v-model="radioOptions[3]" type="text" placeholder="输入选项D的内容"></p>
                  <p class="answer">输入正确答案: <input type="text" v-model="radioAnswer" class="judge-answer"> </p>
                  <div class="select-title">请选择知识点：</div>
                  <template>
                    <el-select v-model="radioKnowledge" placeholder="请选择">
                      <el-option
                        v-for="item in chapterList"
                        :key="item.pointId"
                        :label="item.pointName"
                        :value="item.pointId">
                      </el-option>
                    </el-select>
                  </template>
                </div>
                <div class="footer-button">
                  <span class="next-ti" @click="nextBtn('radio')">下一题</span>
                    <!-- <span @click="submitBtn">提交</span> --> <span @click="resetBtn">退出</span>
                </div>

              </el-collapse-item>
              <el-collapse-item title="多选题" v-if="item == 2" :name="(index+1)">
                <div class="raido-list">
                  <div class="raido-title">{{checkboxTopics.length+1}}、<input class="judge-title" v-model="checkboxTitle" type="text" placeholder="输入标题"></div>
                  <p class="chuti">A、<input class="judge-option" v-model="checkboxOptions[0]" type="text" placeholder="输入选项A的内容"></p>
                  <p class="chuti">B、<input class="judge-option" v-model="checkboxOptions[1]" type="text" placeholder="输入选项B的内容"></p>
                  <p class="chuti">C、<input class="judge-option" v-model="checkboxOptions[2]" type="text" placeholder="输入选项C的内容"></p>
                  <p class="chuti">D、<input class="judge-option" v-model="checkboxOptions[3]" type="text" placeholder="输入选项D的内容"></p>
                  <p class="chuti">E、<input class="judge-option" v-model="checkboxOptions[4]" type="text" placeholder="输入选项E的内容"></p>
                  <p class="chuti">F、<input class="judge-option" v-model="checkboxOptions[5]" type="text" placeholder="输入选项F的内容"></p>
                  <p class="answer">输入正确答案: <input type="text" v-model="checkboxAnswer" class="judge-answer checkbox-answer"></p>
                  <div class="select-title">请选择知识点：</div>
                  <template>
                    <el-select v-model="checkboxKnowledge" placeholder="请选择">
                      <el-option
                        v-for="item in chapterList"
                        :key="item.pointId"
                        :label="item.pointName"
                        :value="item.pointId">
                      </el-option>
                    </el-select>
                  </template>
                </div>
                <div class="footer-button">
                  <span class="next-ti" @click="nextBtn('checkbox')">下一题</span>
                    <!-- <span @click="submitBtn">提交</span> --> <span @click="resetBtn">退出</span>
                </div>
              </el-collapse-item>
              <el-collapse-item title="判断题" v-if="item == 3" :name="(index+1)">
                <div class="raido-list">
                  <div class="raido-title">{{judgeTopics.length+1}}、<input class="judge-title" v-model="judgeTitle" type="text" placeholder="输入标题"></div>
                  <p class="chuti">T、正确</p>
                  <p class="chuti">F、错误</p>
                  <p class="answer">输入正确答案: <input type="text" placeholder="T或F" v-model="judgeAnswer" class="judge-answer"> </p>
                  <div class="select-title">请选择知识点：</div>
                  <template>
                    <el-select v-model="judgeKnowledge" placeholder="请选择">
                      <el-option
                        v-for="item in chapterList"
                        :key="item.pointId"
                        :label="item.pointName"
                        :value="item.pointId">
                      </el-option>
                    </el-select>
                  </template>
                </div>
                <div class="footer-button">
                  <span class="next-ti" @click="nextBtn('judge')">下一题</span>
                    <!-- <span @click="submitBtn">提交</span> --> <span @click="resetBtn">退出</span>
                </div>
              </el-collapse-item>
              <el-collapse-item title="简答题" v-if="item == 5" :name="(index+1)">
                <div class="raido-list answer-list">
                  <div class="raido-title">{{answerTopics.length+1}}、<input class="judge-title" v-model="answerTitle" maxlength="100" type="text" placeholder="输入标题，100字以内"></div>
                  <p class="answer">输入正确答案: <textarea cols="30" rows="10" maxlength="200" placeholder="请在此输入您的参考答案，200字以内" v-model.trim="answerAnswer" class="judge-answer"></textarea></p>
                  <div class="select-title">请选择知识点：</div>
                  <template>
                    <el-select v-model="answerKnowledge" placeholder="请选择">
                      <el-option
                        v-for="item in chapterList"
                        :key="item.pointId"
                        :label="item.pointName"
                        :value="item.pointId">
                      </el-option>
                    </el-select>
                  </template>
                </div>
                <div class="footer-button">
                  <span class="next-ti" @click="nextBtn('answer')">下一题</span>
                    <!-- <span @click="submitBtn">提交</span> --> <span @click="resetBtn">退出</span>
                </div>
              </el-collapse-item>
              <el-collapse-item title="论述题" v-if="item == 6" :name="(index+1)">
                <div class="raido-list answer-list">
                  <div class="raido-title">{{discussTopics.length+1}}、<input class="judge-title" v-model="discussTitle" type="text" placeholder="输入标题"></div>
                  <p class="answer">输入正确答案: <textarea cols="30" rows="10" placeholder="请在此输入您的参考答案" v-model.trim="discussAnswer" class="judge-answer"></textarea></p>
                  <div class="select-title">请选择知识点：</div>
                  <template>
                    <el-select v-model="discussKnowledge" placeholder="请选择">
                      <el-option
                        v-for="item in chapterList"
                        :key="item.pointId"
                        :label="item.pointName"
                        :value="item.pointId">
                      </el-option>
                    </el-select>
                  </template>
                </div>
                <div class="footer-button">
                  <span class="next-ti" @click="nextBtn('discuss')">下一题</span>
                    <!-- <span @click="submitBtn">提交</span> --> <span @click="resetBtn">退出</span>
                </div>
              </el-collapse-item>
              <el-collapse-item title="分析题" v-if="item == 7" :name="(index+1)">
                <div class="raido-list answer-list">
                  <div class="raido-title">{{analysisTopics.length+1}}、<input class="judge-title" v-model="analysisTitle" type="text" placeholder="输入标题"></div>
                  <p class="answer">输入正确答案: <textarea cols="30" rows="10" placeholder="请在此输入您的参考答案" v-model.trim="analysisAnswer" class="judge-answer"></textarea></p>
                  <div class="select-title">请选择知识点：</div>
                  <template>
                    <el-select v-model="analysisKnowledge" placeholder="请选择" size="small">
                      <el-option
                        v-for="item in chapterList"
                        :key="item.pointId"
                        :label="item.pointName"
                        :value="item.pointId">
                      </el-option>
                    </el-select>
                  </template>
                </div>
                <div class="footer-button">
                  <span class="next-ti" @click="nextBtn('analysis')">下一题</span>
                    <!-- <span @click="submitBtn">提交</span> --> <span @click="resetBtn">退出</span>
                </div>
              </el-collapse-item>
            </el-collapse>

            
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
      activeNames: 1,
      radioTopics: [],
      checkboxTopics: [],
      judgeTopics: [],
      answerTopics: [],
      discussTopics: [],
      analysisTopics: [],
      radioTitle: '',
      radioOptions: [],
      radioAnswer: '',
      radioKnowledge: '',
      checkboxTitle: '',
      checkboxOptions: [],
      checkboxAnswer: '',
      checkboxKnowledge: '',
      judgeTitle: '',
      judgeOptions: [],
      judgeAnswer: '',
      judgeKnowledge: '',
      answerTitle: '',
      answerOptions: [],
      answerAnswer: '',
      answerKnowledge: '',
      discussTitle: '',
      discussOptions: [],
      discussAnswer: '',
      discussKnowledge: '',
      analysisTitle: '',
      analysisOptions: [],
      analysisAnswer: '',
      analysisKnowledge: '',
      questionTypeId: [],
      typeList: [],
      QusTypeList: [],
      curriculumList: [],
      nowTime: '',
      tikuId: 1,
      username: ''
    };
  },
  computed: {
    ...mapState({
      tikuList: state => state.tikuList,
      chapterList: state => state.chapterList
    })
  },
  mounted(){
    this.username = sessionStorage.getItem('username')
  },
  created(){

    let nowTime = new Date()
    let nowYear = nowTime.getFullYear()
    let nowMonth = nowTime.getMonth()+1
    let nowDay = nowTime.getDate()


    this.nowTime = `${nowYear}-${nowMonth}-${nowDay}`

    this.$store.dispatch("TIKU_LIST_FETCH", {});

    this.tikuId = this.$route.query.question

    if(this.$route.query.questionTypeId){
      this.questionTypeId = this.$route.query.questionTypeId.split(',')
    }
    this.fieldId = this.$route.query.fieldId;
    this.$store.dispatch("QUESTION_TYPE_SET", {}).then(res => {
      if(res.result == 'success' && res.object){
        this.typeList = res.object
        this.typeList.forEach((val, index) => {
          this.questionTypeId.forEach((qusVal, qusIndex) => {
            if(val.id == qusVal){
              this.QusTypeList.push(val)
            }
          })
        })
      }
    });

    this.$store.dispatch("CURRICULUM_LIST_FETCH", {
      questionsId: this.tikuId
    }).then( res => {
      this.curriculumList = res.object
    })
    this.$store.dispatch("CHAPTER_LIST_FETCH", {
      fieldId: this.fieldId
    });


  },
  methods: {
    resetBtn() {
      this.$confirm('确定退出当前出题状态！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push('/')
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
    },
    handleChange(val) {
      console.log(val);
    },
    nextBtn(item){

      let topics = item+'Topics'
      let choiceList = []
      let answer = this[item+'Answer']

      if(this[item+'Title'] == ''){
        this.$message({
          message: "标题不能为空",
          type: "warning"
        });
        return false;
      }else if((!this[item+'Options'].length && item == 'radio') || (!this[item+'Options'].length && item == 'checkbox')){
        this.$message({
          message: "选项不能为空",
          type: "warning"
        });
        return false;
      }else if(this[item+'Answer'] == ''){
        this.$message({
          message: "答案不能为空",
          type: "warning"
        });
        return false;
      }else if(this[item+'Knowledge'] == ''){
        this.$message({
          message: "知识点不能为空",
          type: "warning"
        });
        return false;
      }

      
      if(this[item+'Options'].length){
        this[item+'Options'].forEach((val, index) => {
          if(index == 0 && val.trim != ''){
            choiceList.push({A: val})
          }else if(index == 1 && val.trim() != ''){
            choiceList.push({B: val})
          }else if(index == 2 && val.trim() != ''){
            choiceList.push({C: val})
          }else if(index == 3 && val.trim() != ''){
            choiceList.push({D: val})
          }else if(index == 4 && val.trim() != ''){
            choiceList.push({E: val})
          }else if(index == 5 && val.trim() != ''){
            choiceList.push({F: val})
          }
        })
      }

      if(item == 'radio'){
        answer = this[item+'Answer'].toUpperCase()
      }else if(item == 'checkbox'){
        //删除之前的逗号分隔
        /*
        answer = []
        let oldAnswer = this[item+'Answer'].indexOf(',') >= 0 ? this[item+'Answer'].split(',') : (this[item+'Answer'].indexOf('，') >= 0 ? this[item+'Answer'].split('，') : this[item+'Answer'].split(''))
        oldAnswer.forEach((val,index) => {
          if(answer.indexOf(val.toUpperCase()) < 0){
            answer.push(val.toUpperCase())
          }
        })
        */
       //转大写再排序
        answer = answer.toLocaleUpperCase().split('').sort().join('')
      }
      if(item == 'judge'){
        answer = answer.toLocaleUpperCase()
        if(answer == 'A' || answer == 'T' ){
          answer = 'T'
        }else{
          answer = 'F'
        }
      }
      let choiceListObj = {}
      choiceList.forEach((val, index, arr) => {
        Object.assign(choiceListObj,val)
      })

        let questionTypeName = ''
        this.typeList.forEach((val, index) => {
          if(val.id == this.activeNames){
            questionTypeName = val.name
          }
        })
        this.$store
          .dispatch("QUESTION_ADD", {
            "analysis": "", //题目解析
            "answer":  answer,
            "content": "", //试题内容
            "create_time": new Date(),//添加时间
            "creator": this.username,//添加人呢
            "examingPoint": "", //考点
            "is_visible": true,//是否可见
            "keyword": "",//关键字
            "name": this[item+'Title'],//题目名称
            "pointList": [this[item+'Knowledge']],//章节知识点
            "pointName": "",
            "points": 0,//分数
            "questionContent": {
              "choiceImgList": {},//题目图片
              "choiceList": choiceListObj,//题目选项
              "title": this[item+'Title'],//题目名称
              "titleImg": ""
            },
            "questionTypeName": this.QusTypeList[this.activeNames-1].name,//题目类型名称
            "question_type_id": this.QusTypeList[this.activeNames-1].id,//题目类型ID
            "referenceName": "",//来源
            "status": 0
          })
          .then(res => {
            if (res.result == "success") {
              this[item+'Topics'].push({title: this[item+'Title']})
              this.$message({
                message: "题目提交成功，请等待审核。",
                type: "success"
              });
              this[item+'Title'] = ''
              this[item+'Options'] = []
              this[item+'Answer'] = ''
              this[item+'Knowledge'] = ''

            }
            if(res.result == "error"){
              this.$message({
                type: "error",
                message: res.messageInfo
              })
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
.set-topic-page {
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
      height: 100%;
      border: 1px solid #fafafa;
      box-shadow:0px 6px 6px #E9E7EA;
      margin-bottom: 30px;
      margin-top: 10px;
      overflow: hidden;
      background: linear-gradient(to top, #60a8fe, #357df2);
      position: relative;
      // &::before{
      //   width: 298px;
      //   content: "";
      //   position: absolute;
      //   left: 0;
      //   top: 0;
      //   height: 100%;
      //   background: url('../assets/images/kd-bg.png') left bottom no-repeat;
      // }
      .main-left {
        float: left;
        width: 298px;
        height: 100%;
        color: #fff;
        .line-box{
          position: relative;
        }
        .img-box {
          width: 298px;
          position: absolute;
          bottom: -4px;
          left: 0;
          img {
            width: 100%;
          }
        }
        .examinee{
          width: 298px;
          font-size: 14px;
          .student-info{
            padding-left: 30px;
            margin-bottom: 30px;
            font-size: 16px;
            color: #fff;
            .info-list{
              line-height: 32px;
              span{
                line-height: 32px;
                display: inline-block;
              }
              span:first-child{
                width: 80px;
                // vertical-align: top;
              }
              span:last-child{
                // width: 180px;
                // line-height: 1.3;
                i{
                  font-style: normal;
                }
                a{
                  margin-right: 10px;
                  font-size: 16px;
                  color: #fff;
                }
              }
            }
          }
        }
        .line-title{
          margin: 15px 0;
          padding-left: 16px;
          font-size: 20px;
          border-left: 5px solid #ea8661;
        }
      }
      .main-right{
        width: 900px;
        min-height: 630px;
        background: #fff;
        float: left;
        .el-collapse{
          padding: 0 24px;
        }
        .el-collapse-item__content{
          border-bottom: 1px #ccc solid;
        }
        .line-title{
          line-height: 60px;
          // background: url(../assets/images/icon-list.png) 10px center no-repeat;
          padding-left: 50px;
          font-size: 15px;
          color: #999999;
          border-bottom: 1px solid #ccc;
          span{
            font-size: 18px;
            color: #000;
            position: relative;
            padding-left: 10px;
            cursor: pointer;
            i{
              display: block;
              width: 10px;
              height: 10px;
              position: absolute;
              top: 4px;
              right: -20px;
              border-width: 1px;
              border-style: solid;
              border: 1px solid #000;
              border-top: none;
              border-right: none;
              transform: rotate(-45deg);
              &.active{
                transform: rotate(135deg);
                top: 10px;

              }
            }
          }
        }
        .border-bottom{
          border-bottom: 5px solid #f7f7f7;
        }
        .raido-list{
          padding-left: 30px;

          .raido-title{
            padding: 0px 0 20px 0;
            .judge-title{
              border: 1px solid #ccc;
              width: 90%;
              font-size: 15px;
              line-height: 25px;
              padding: 5px 10px;
              border-radius: 5px;
            }
          }
          p{
            margin-bottom: 14px;
            .judge-option{
              border: 1px solid #cfcfcf;
              font-size: 15px;
              line-height: 25px;
              padding: 5px 10px;
              border-radius: 5px;
              width: 70%;
            }
            .judge-answer{
              width: 100px;
              line-height: 28px;
              border: 1px solid #cfcfcf;
              font-size: 14px;
            }
            .checkbox-answer{
              width: 150px;
            }
            .next-ti{
              display: block;
              width: 80px;
              height: 35px;
              text-align: center;
              line-height: 35px;
              color: #fff;
              font-size: 15px;
              border-radius: 4px;
              background: #5a9cff;
              float: right;
              margin-right: 64px;
              cursor: pointer;
            }
          }
          .select-title{
            padding: 15px 0 5px;
          }
        }
        .answer-list{
          .answer{
            .judge-answer{
              width: 89.5%;
              font-size: 15px;
              line-height: 20px;
              height: 100px;
              border-radius: 5px;
              padding: 5px 10px;
            }
          }

        }
        .footer-button{
            padding: 50px 0;
            float: right;
            margin-right: 64px;
            span{
              display: block;
              width: 80px;
              height: 35px;
              float: left;
              margin-left: 40px;
              text-align: center;
              line-height: 35px;
              color: #fff;
              font-size: 18px;
              border-radius: 4px;
              background: #5a9cff;
              cursor: pointer;
            }
          }
      }
    }
  }

}
</style>
