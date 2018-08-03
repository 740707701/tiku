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
                  <span v-if="!questionId" class="next-ti" @click="nextBtn('radio')">下一题</span>
                  <span v-if="!questionId" @click="resetBtn">退出</span>
                  <span v-if="questionId" @click="nextBtn('radio')">提交</span> 
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
                  <span v-if="!questionId" class="next-ti" @click="nextBtn('checkbox')">下一题</span>
                  <span v-if="questionId" @click="nextBtn('checkbox')">提交</span> 
                  <span v-if="!questionId" @click="resetBtn">退出</span>
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
                  <span v-if="!questionId" class="next-ti" @click="nextBtn('judge')">下一题</span>
                  <span v-if="questionId" @click="nextBtn('judge')">提交</span>
                  <span v-if="!questionId" @click="resetBtn">退出</span>
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
                  <span v-if="!questionId" class="next-ti" @click="nextBtn('answer')">下一题</span>
                  <span v-if="questionId" @click="nextBtn('answer')">提交</span>
                  <span v-if="!questionId" @click="resetBtn">退出</span>
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
                  <span v-if="!questionId" class="next-ti" @click="nextBtn('discuss')">下一题</span>
                  <span v-if="questionId" @click="nextBtn('discuss')">提交</span>
                  <span v-if="!questionId" @click="resetBtn">退出</span>
                </div>
              </el-collapse-item>
              <el-collapse-item title="分析题" v-if="item == 7" :name="(index+1)">
                <div class="raido-list">
                  <div class="raido-title">
                    <!-- <input class="fenxi-title judge-title" v-model="analysisTitle" type="text" placeholder="输入标题"> -->
                    <div class="fenxi-count">{{analysisTopics.length+1}}、</div>
                    <textarea class="textarea-title" v-model="analysisTitle" placeholder="输入标题"></textarea>
                  </div>
                  <div class="fenxi-select select-title">请选择知识点：</div>
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
                  <div class="fenxi-tips">请针对该分析题的题目上传所需要的图片(可不传)</div>
                  <div class="img-content">
                    <div class="img-box">
                      <i class="iconfont icon-camera"></i>
                      <input type="file" class="input-file" @change="changeImage($event)" name="image" ref="imgInput" accept="image/gif,image/jpeg,image/jpg,image/png">
                    </div>
                    <div class="img-list">
                      <div class="item" v-for="(item,index) in uploadImgList" :key="index">
                        <div class="icon-del" @click="deleteUpload(item,index)">×</div>
                        <img :src="rootPath+'/'+item.filePath" alt="">
                        <div class="name">{{item.name}}</div>
                      </div>
                    </div>
                  </div>
                  <div class="fenxi-tips">请针对该分析题出题</div>
                  <div class="fenxi-options">
                    <div class="topic-type">
                      <el-checkbox-group v-model="checkQuesTypeFenxi">
                        <el-checkbox v-if="list.id!=7" v-for="list in typeList" :key="list.id"  :label="list.id" >{{list.name}}</el-checkbox>
                      </el-checkbox-group>
                    </div>
                    <el-collapse accordion v-model="subActiveNames" v-for="(item, index) in checkQuesTypeFenxi" :key="index">
                      <el-collapse-item title="单选题" v-if="item == 1" :name="(index+1)">
                        <div class="raido-list">
                          <div class="raido-title">{{radioTopicsFenxi.length+1}}、<input class="judge-title" v-model="radioTitleFenxi" type="text" placeholder="输入标题"></div>
                          <p class="chuti">A、<input class="judge-option" v-model="radioOptionsFenxi[0]" type="text" placeholder="输入选项A的内容"></p>
                          <p class="chuti">B、<input class="judge-option" v-model="radioOptionsFenxi[1]" type="text" placeholder="输入选项B的内容"></p>
                          <p class="chuti">C、<input class="judge-option" v-model="radioOptionsFenxi[2]" type="text" placeholder="输入选项C的内容"></p>
                          <p class="chuti">D、<input class="judge-option" v-model="radioOptionsFenxi[3]" type="text" placeholder="输入选项D的内容"></p>
                          <p class="answer">输入正确答案: <input type="text" v-model="radioAnswerFenxi" class="judge-answer"> </p>
                        </div>
                        <div class="footer-button">
                          <span class="next-ti" @click="fenxiSave('radio',1)">保存</span>
                        </div>
                      </el-collapse-item>
                      <el-collapse-item title="多选题" v-if="item == 2" :name="(index+1)">
                        <div class="raido-list">
                          <div class="raido-title">{{checkboxTopicsFenxi.length+1}}、<input class="judge-title" v-model="checkboxTitleFenxi" type="text" placeholder="输入标题"></div>
                          <p class="chuti">A、<input class="judge-option" v-model="checkboxOptionsFenxi[0]" type="text" placeholder="输入选项A的内容"></p>
                          <p class="chuti">B、<input class="judge-option" v-model="checkboxOptionsFenxi[1]" type="text" placeholder="输入选项B的内容"></p>
                          <p class="chuti">C、<input class="judge-option" v-model="checkboxOptionsFenxi[2]" type="text" placeholder="输入选项C的内容"></p>
                          <p class="chuti">D、<input class="judge-option" v-model="checkboxOptionsFenxi[3]" type="text" placeholder="输入选项D的内容"></p>
                          <p class="chuti">E、<input class="judge-option" v-model="checkboxOptionsFenxi[4]" type="text" placeholder="输入选项E的内容"></p>
                          <p class="chuti">F、<input class="judge-option" v-model="checkboxOptionsFenxi[5]" type="text" placeholder="输入选项F的内容"></p>
                          <p class="answer">输入正确答案: <input type="text" v-model="checkboxAnswerFenxi" class="judge-answer checkbox-answer"></p>
                        </div>
                        <div class="footer-button">
                          <span class="next-ti" @click="fenxiSave('checkbox',2)">保存</span>
                        </div>
                      </el-collapse-item>
                      <el-collapse-item title="判断题" v-if="item == 3" :name="(index+1)">
                        <div class="raido-list">
                          <div class="raido-title">{{judgeTopicsFenxi.length+1}}、<input class="judge-title" v-model="judgeTitleFenxi" type="text" placeholder="输入标题"></div>
                          <p class="chuti">T、正确</p>
                          <p class="chuti">F、错误</p>
                          <p class="answer">输入正确答案: <input type="text" placeholder="T或F" v-model="judgeAnswerFenxi" class="judge-answer"> </p>
                        </div>
                        <div class="footer-button">
                          <span class="next-ti" @click="fenxiSave('judge',3)">保存</span>
                        </div>
                      </el-collapse-item>
                      <el-collapse-item title="简答题" v-if="item == 5" :name="(index+1)">
                        <div class="raido-list answer-list">
                          <div class="raido-title">{{answerTopicsFenxi.length+1}}、<input class="judge-title" v-model="answerTitleFenxi" maxlength="100" type="text" placeholder="输入标题，100字以内"></div>
                          <p class="answer">输入正确答案: <textarea cols="30" rows="10" maxlength="200" placeholder="请在此输入您的参考答案，200字以内" v-model.trim="answerAnswerFenxi" class="judge-answer"></textarea></p>
                        </div>
                        <div class="footer-button">
                          <span class="next-ti" @click="fenxiSave('answer',5)">保存</span>
                        </div>
                      </el-collapse-item>
                      <el-collapse-item title="论述题" v-if="item == 6" :name="(index+1)">
                        <div class="raido-list answer-list">
                          <div class="raido-title">{{discussTopicsFenxi.length+1}}、<input class="judge-title" v-model="discussTitleFenxi" type="text" placeholder="输入标题"></div>
                          <p class="answer">输入正确答案: <textarea cols="30" rows="10" placeholder="请在此输入您的参考答案" v-model.trim="discussAnswerFenxi" class="judge-answer"></textarea></p>
                        </div>
                        <div class="footer-button">
                          <span class="next-ti" @click="fenxiSave('discuss', 6)">保存</span>
                        </div>
                      </el-collapse-item>
                    </el-collapse>
                  </div>
                  
                </div>
                <div class="footer-button">
                  <span v-if="!questionId" class="next-ti" @click="fenxiNext('analysis')">下一题</span>
                  <span v-if="questionId" @click="fenxiSubmit('')">提交</span>
                  <span v-if="!questionId" @click="resetBtn">退出</span>
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
      activeNames: 1,subActiveNames: 1,

      radioTopics: [],checkboxTopics: [],judgeTopics: [],answerTopics: [],discussTopics: [],analysisTopics: [],
      radioTitle: '',radioOptions: [],radioAnswer: '', radioKnowledge: '',
      checkboxTitle: '',checkboxOptions: [],checkboxAnswer: '',checkboxKnowledge: '',
      judgeTitle: '',judgeOptions: [],judgeAnswer: '',judgeKnowledge: '',
      answerTitle: '',answerOptions: [],answerAnswer: '',answerKnowledge: '',
      discussTitle: '',discussOptions: [],discussAnswer: '',discussKnowledge: '',
      analysisTitle: '',analysisOptions: [],analysisAnswer: '',analysisKnowledge: '',

      questionTypeId: [],typeList: [],QusTypeList: [],curriculumList: [],nowTime: '',tikuId: 1,username: '',
      questionInfo: {},questionId: '',showSubmitBtn: false,
      fenxiQuestionId: '',
      checkQuesTypeFenxi: [], //分析题下选择的出题类型
      titleImgFenxi: [], //分析题目的图片
      //分析题 二级选项数据
      radioTopicsFenxi: [],radioTitleFenxi: '',radioOptionsFenxi: [],radioAnswerFenxi: '',radioKnowledgeFenxi: '',
      checkboxTopicsFenxi: [],checkboxTitleFenxi: '',checkboxOptionsFenxi: [],checkboxAnswerFenxi: '',checkboxKnowledgeFenxi: '',
      judgeTopicsFenxi: [],judgeTitleFenxi: '',judgeOptionsFenxi: [],judgeAnswerFenxi: '',judgeKnowledgeFenxi: '',
      answerTopicsFenxi: [],answerTitleFenxi: '',answerOptionsFenxi: [],answerAnswerFenxi: '',answerKnowledgeFenxi: '',
      discussTopicsFenxi: [],discussTitleFenxi: '',discussOptionsFenxi: [],discussAnswerFenxi: '',discussKnowledgeFenxi: '',
      uploadImgList: [], questionImage: '', file: '',
      fenxiQuestions: []
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
    this.questionId = this.$route.query.questionId
    if(this.questionId){
      this.showSubmitBtn = true;
      this.getQuestionDetail();
    }

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
       //字符串转大写转数组排序
       let arr = answer.toLocaleUpperCase().split('').sort()
       let dup = [...new Set(arr)] //去重
        answer = dup.join('') //转字符串
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
            "id": this.questionId || "",
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
            "status": 0,
          })
          .then(res => {
            if (res.result == "success") {
              if(this.questionId){
                this.$message({
                  message: "题目修改成功，请等待审核。",
                  type: "success"
                });
                this.$router.push({
                  name: 'myRecord'
                })
                return
              }
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

    },
    getQuestionDetail(){
      this.$store.dispatch('QUESTION_DETAIL', this.questionId).then(res => {
        let detail = res.object.question;
        let content = JSON.parse(detail.content)
        let questionTypeId = detail.question_type_id;
        let item = ''
        if(questionTypeId == 1){
          item = 'radio'
        }else if(questionTypeId == 2){
          item = 'checkbox'
        }else if(questionTypeId == 3){
          item = 'judge'
        }else if(questionTypeId == 4){
          item = 'tiankong'
        }else if(questionTypeId == 5){
          item = 'answer'
        }else if(questionTypeId == 6){
          item = 'discuss'
        }else if(questionTypeId == 7){
          item = 'analysis'
          this.uploadImgList = content.titleImgList;
          let subtitleList = content.subtitleList
          subtitleList.map(item => {
            this.checkQuesTypeFenxi.push(item.questionTypeId)
            if(this.checkQuesTypeFenxi.indexOf(item.questionTypeId) == -1){
            }
            let itemType = ''
            if(item.questionTypeId == 1){
              itemType = 'radio'
            }else if(item.questionTypeId == 2){
              itemType = 'checkbox'
            }else if(item.questionTypeId == 3){
              itemType = 'judge'
            }else if(item.questionTypeId == 4){
              itemType = ''
            }else if(item.questionTypeId == 5){
              itemType = 'answer'
            }else if(item.questionTypeId == 6){
              itemType = 'discuss'
            }
            let choiceList = []
            for(var k in item.choiceList){
              if(k == 'A'){
                choiceList[0] = item.choiceList[k]
              }else if(k == 'B'){
                choiceList[1] = item.choiceList[k]
              }else if(k == 'C'){
                choiceList[2] = item.choiceList[k]
              }else if(k == 'D'){
                choiceList[3] = item.choiceList[k]
              }else if(k == 'E'){
                choiceList[4] = item.choiceList[k]
              }else if(k == 'F'){
                choiceList[5] = item.choiceList[k]
              }
            }
            this[itemType+'TitleFenxi'] = item.title
            this[itemType+'OptionsFenxi'] = choiceList
            this[itemType+'AnswerFenxi'] = item.answer
            //分析题下的小题目
            this.fenxiQuestions.push(item)
            // console.log(this.fenxiQuestions)
          })
        }
        let choiceList = []
        for(var k in content.choiceList){
          if(k == 'A'){
            choiceList[0] = content.choiceList[k]
          }else if(k == 'B'){
            choiceList[1] = content.choiceList[k]
          }else if(k == 'C'){
            choiceList[2] = content.choiceList[k]
          }else if(k == 'D'){
            choiceList[3] = content.choiceList[k]
          }else if(k == 'E'){
            choiceList[4] = content.choiceList[k]
          }else if(k == 'F'){
            choiceList[5] = content.choiceList[k]
          }
        }
        this[item + 'Title'] = content.title;
        this[item + 'Options'] = choiceList;
        this[item + 'Answer'] = detail.answer;
        this[item + 'Knowledge'] = detail.knowledgePoint[0].pointId;
      })
    },
    changeImage: function(e){
      let file = e.target.files[0];
      this.file = file
      console.log(this.file)
      let reader = new FileReader()
      let that = this
      reader.readAsDataURL(file)
      reader.onload= function(e){
        that.questionImage = this.result
      }
      this.upload()
    },
    upload: function(){
      if(this.$refs.imgInput[0].files.length !== 0){
        let data = new FormData()
        data.append('multfile', this.$refs.imgInput[0].files[0])
        this.$store.dispatch('UPLOAD', data)
        .then(res => {
          console.log(res)
          if(res.result == "success"){
            this.file = '';
            this.rootPath = res.object.rootPath
            this.uploadImgList.push({name: res.object.fileName, filePath: res.object.filePath})
            this.$message({
              type: "success",
              message: "上传成功！"
            })
          }
          if(res.result == "error"){
            this.$message({
              type: "error",
              message: res.messageInfo
            })
          }
        })
      }
    },
    deleteUpload(item, index){
      this.uploadImgList.splice(index,1)
    },
    fenxiSave(item, question_type_id){
      let topics = item+'TopicsFenxi'
      let choiceList = []
      let answer = this[item+'AnswerFenxi']
      if(this[item+'TitleFenxi'] == ''){
        this.$message({
          message: "标题不能为空",
          type: "warning"
        });
        return false;
      }else if((!this[item+'OptionsFenxi'].length && item == 'radio') || (!this[item+'OptionsFenxi'].length && item == 'checkbox')){
        this.$message({
          message: "选项不能为空",
          type: "warning"
        });
        return false;
      }else if(this[item+'AnswerFenxi'] == ''){
        this.$message({
          message: "答案不能为空",
          type: "warning"
        });
        return false;
      }
      if(this[item+'OptionsFenxi'].length){
        this[item+'OptionsFenxi'].forEach((val, index) => {
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
        answer = this[item+'AnswerFenxi'].toUpperCase()
      }else if(item == 'checkbox'){
       //字符串转大写转数组排序
       let arr = answer.toLocaleUpperCase().split('').sort()
       let dup = [...new Set(arr)] //去重
        answer = dup.join('') //转字符串
      }
      if(item == 'judge'){
        answer = answer.toLocaleUpperCase()
        if(answer == 'A' || answer == 'T' ){
          answer = 'T'
        }else{
          answer = 'F'
        }
      }
      if(this.analysisKnowledge == ''){
        this.$message({
          message: "分析题的知识点不能为空",
          type: "warning"
        });
        return false;
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
      //组合题目
      let questionList = [];
      questionList.push({
        title: this[item+'TitleFenxi'],
        choiceList: choiceListObj,
        answer: answer,
        questionTypeId: question_type_id
      })
        this.$store
          .dispatch("QUESTION_FENXI_ADD", {
            "id": this.fenxiQuestionId || 0,
            "analysis": "", //题目解析
            "answer":  answer,
            "content": "", //试题内容
            "create_time": new Date(),//添加时间
            "creator": this.username,//添加人呢
            "examingPoint": "", //考点
            "is_visible": true,//是否可见
            "keyword": "",//关键字
            "name": this.analysisTitle,//题目名称
            "pointList": [this.analysisKnowledge],//章节知识点
            "pointName": "",
            "points": 0,//分数
            "questionContent": {
              "title": this.analysisTitle,//题目名称
              "titleImgList": this.uploadImgList,//题目图片
              "subtitleList": questionList, //分析题下的题目列表
            },
            "questionTypeName": this.QusTypeList[this.activeNames-1].name,//题目类型名称
            "question_type_id": this.QusTypeList[this.activeNames-1].id,//题目类型ID
            "referenceName": "",//来源
            "status": 0,
          })
          .then(res => {
            if (res.result == "success") {
              this[item+'TopicsFenxi'].push({title: this[item+'TitleFenxi']})
              this.$message({
                message: "题目提交成功，请等待审核。",
                type: "success"
              });
              this[item+'TitleFenxi'] = ''
              this[item+'OptionsFenxi'] = []
              this[item+'AnswerFenxi'] = ''
              this[item+'Knowledge'] = ''
              //第一次添加题目 返回一个question_id
              if(res.generatedId){
                this.fenxiQuestionId = res.generatedId;
              }
            }
            if(res.result == "error"){
              this.$message({
                type: "error",
                message: res.messageInfo
              })
            }
          });

    },
    fenxiNext(item){
      this[item+'Topics'].push({title: this[item+'Title']})
      this[item+'Title'] = ''
      this[item+'Knowledge'] = ''
      this.checkQuesTypeFenxi = []
      this.uploadImgList = []

      this.radioTopicsFenxi = ''
      this.checkboxTopicsFenxi = ''
      this.judgeTopicsFenxi = ''
      this.answerTopicsFenxi = ''
      this.discussTopicsFenxi = ''
      
      this.radioTitleFenxi = ''
      this.checkboxTitleFenxi = ''
      this.judgeTitleFenxi = ''
      this.answerTitleFenxi = ''
      this.discussTitleFenxi = ''

      this.radioOptionsFenxi = ''
      this.checkboxOptionsFenxi = ''
      this.judgeOptionsFenxi = ''
      this.answerOptionsFenxi = ''
      this.discussOptionsFenxi = ''

      this.radioAnswerFenxi = ''
      this.checkboxAnswerFenxi = ''
      this.judgeAnswerFenxi = ''
      this.answerAnswerFenxi = ''
      this.discussAnswerFenxi = ''
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
        float: left;
        width: 900px;
        min-height: 630px;
        background: #fff;
        .img-content {
          width: 100%;
          display: inline-block;
          .img-box {
            float: left;
            width: 100px;
            height: 50px;
            border: 1px solid #ccc;
            border-radius: 4px;
            cursor: pointer;
            position: relative;
            .icon-camera {
              font-size: 30px;
              position: absolute;
              top: 0;
              left: 50%;
              margin-left: -15px;
              margin-top: -2px;
              color: #ccc;
            }
            input[type="file"] {
              width: 100px;
              height: 50px;
              display: inline-block;
              cursor: pointer;
              opacity: 0;
              position: absolute;
              top: 0;
              left: 0;
            }
            .input-img {
              width: 100%;
              position: absolute;
              top: 0;
              left: 0
            }
          }
          .img-list {
            padding-left: 110px;
            .item {
              margin-right: 10px;
              margin-bottom: 10px;
              display: inline-block;
              position: relative;
            }
            img {
              width: 100px;
              height: 50px;
            }
            .name {
              text-align: center;
            }
            .icon-del {
              width: 20px;
              height: 20px;
              line-height: 22px;
              border-radius: 11px;
              text-align: center;
              font-size: 16px;
              font-weight: bold;
              border: 1px solid #ccc;
              background-color: #fff;
              cursor: pointer;
              position: absolute;
              top: -10px;
              right: -10px;
            }
          }
        }
        .fenxi-tips {
          line-height: 30px;
        }
        .fenxi-options {
          padding-top: 5px;
          .el-collapse {
            border: none;
          }
        }
        .fenxi-select {
          padding-top: 0!important;
        }
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
          .fenxi-title {
            height: 50px;
          }
          .raido-title{
            padding: 0px 0 10px 0;
            .judge-title{
              border: 1px solid #ccc;
              width: 90%;
              font-size: 15px;
              line-height: 25px;
              padding: 5px 10px;
              border-radius: 5px;
            }
            .fenxi-count {
              float: left;
            }
            .textarea-title {
              width: 90%;
              min-height: 50px;
              border: 1px solid #ccc;
              border-radius: 8px;
              padding: 5px 10px;
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
