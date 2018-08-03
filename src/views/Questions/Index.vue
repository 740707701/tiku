<template>
  <div class="questions-page">
    <header-nav></header-nav>
    <div class="big-banner">
      <div class="wrapper">
        <img src="../../assets/images/title.png" class="title">
      </div>
    </div>
    <div class="questions-list">
      <div class="wrapper">
        <ul class="questions-tabs border-bottom-color" >
          <li v-for="(val, index) in tikuList" :key="index">
            <router-link :to="'/questions/'+ val.questionsId" :class="{'active': isNav(/val.questionsId/) }" @click.native="flushCom">{{ val.questionsName }}</router-link>
          </li>
        </ul>
        <!-- 就设置一个内页 router-view-->
        <div class="occupation-page">
          <div class="wrapper" v-if="curriculumList.length">
            <p class="title">课程选择：<span v-if="curriculumList.length > 8" @click="showCurr" v-show="!isShowCurr">更多></span> <span v-show="isShowCurr" @click="showCurr">收起</span></p>
            <curriculum-box :curriculum="curriculumList" :selectedData="currData"  @selectEvent="radioItem"></curriculum-box>
            <p class="title" v-if="isShowChapter">章节选择：<span v-if="chapterList.length > 8">更多></span></p>
            <chapterBox :curriculum="chapterList" :selectedData="chaptData" @selectEvent="checkboxItem"></chapterBox>
            <p class="title">题型：</p>
            <!-- <topic :topicType="typeList" :selectedData="checkList" @topicEvent="checkoutTopic"></topic> -->
            <div class="topic-type">
              <!-- :checked="list.subjective" -->
              <el-checkbox-group v-model="checkList">
                <el-checkbox v-if="list.id!=7" v-for="list in typeList" :key="list.id"  :label="list.id" >{{list.name}}</el-checkbox>
              </el-checkbox-group>
            <!-- {{ checkList }} -->
            </div>

            <div class="occupation-button">
              <span  @click="random">随机练习</span><span  @click="intelligence">智能答题</span>
            </div>
          </div>
          <div class="wrapper" style="height: 200px;text-align:center;line-height: 100px;font-size:30px;" v-else-if="!curriculumList.length">
            没有更多数据
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import headerNav from "../../components/Header.vue";
import curriculumBox from "../../components/curriculumItem.vue";
import chapterBox from "../../components/chapterItem.vue";
import { mapState } from "vuex";

export default {
  name: "questions",
  data() {
    return {
      hideCurriculum: [],
      hideChapter: [],
      currData: [],
      chaptData: [],
      isShowCurr: false,
      isShowChapter: false,
      checkList: [],
      chapterList: [],
      curriculumList: []
    };
  },
  computed: {
    ...mapState({
      tikuList: state => state.tikuList,
      typeList: state => state.question.typeList,
    })
  },
  created() {
    let questions = this.$route.params.id;
    // tabs
    this.$store.dispatch("TIKU_LIST_FETCH", {});
    this.$store.dispatch("CURRICULUM_LIST_FETCH", {
      questionsId: questions
    }).then(res => {
      if(res.result != 'success'){
        return false;
      }
      if(!res.object){
        this.curriculumList = []
        return false;
      }
      this.curriculumList = res.object;
      if(this.curriculumList.length){
        this.getChapter(this.curriculumList[0]['fieldId'])
      }
    });

    this.$store.dispatch("QUESTION_TYPE_SET", {});
  },
  methods: {
    showCurr() {
      if (!this.isShowCurr) {
        this.hideCurriculum = this.curriculum;
      } else {
        this.hideCurriculum = this.curriculum.slice(0, 8);
      }
      this.isShowCurr = !this.isShowCurr;
    },
    init(path) {
      console.log("init", path);
    },
    flushCom:function(){
      let questions = this.$route.params.id;
      this.$store.dispatch("CURRICULUM_LIST_FETCH", {
        questionsId: questions
      }).then(res => {
        if(res.result != 'success'){
          return false;
        }
        if(!res.object){
          this.curriculumList = []
          return false;
        }
        this.curriculumList = res.object;
        if(this.curriculumList.length){
          this.getChapter(this.curriculumList[0]['fieldId'])
        }
      });
　　},
    getChapter(id){
      this.$store.dispatch("CHAPTER_LIST_FETCH", {
          fieldId: id
        }).then(res => {
          if(res.object){
            this.chapterList = res.object;
            this.isShowChapter = true;
          }
        });
    },
    random() {

      if(!this.currData.length){
        this.$message({
          message: "请选择课程",
          type: "warning"
        });
        return false;
      }
      if(!this.chaptData.length){
        this.$message({
          message: "请选择章节",
          type: "warning"
        });
        return false;
      }
      if(!this.checkList.length){
        this.$message({
          message: "请选择题型",
          type: "warning"
        });
        return false;
      }

      let fieldId = this.currData[0],
          pointId = this.chaptData.sort(),
      questionTypeId =     this.checkList.sort();

      let questions = this.$route.params.id;

   this.$store.dispatch("QUESTION_RANDOM_SET", {
      fieldId,
      pointId,
      questionTypeId
    }).then( res => {
      if(res.object){
        this.$router.push(`/examiner/?questions=${questions}&fieldId=${encodeURIComponent(fieldId)}&pointId=${pointId}&questionTypeId=${questionTypeId}`)
      }else{
        this.$message({
          message: res.messageInfo,
          type: "error"
        });
      }
    })
      // this.$router.push(`/examiner`)
    },
    intelligence() {
      if(!this.currData.length){
        this.$message({
          message: "请选择课程",
          type: "warning"
        });
        return false;
      }
      if(!this.chaptData.length){
        this.$message({
          message: "请选择章节",
          type: "warning"
        });
        return false;
      }
      if(!this.checkList.length){
        this.$message({
          message: "请选择题型",
          type: "warning"
        });
        return false;
      }
      let fieldId = this.currData[0],
      pointId = this.chaptData.sort().join(),
      questionTypeId =     this.checkList.sort().join();

      let questions = this.$route.params.id;

      this.$store.dispatch("QUESTION_INTELLIGENT_SET", {
        fieldId,
        pointId,
        questionTypeId
      }).then( res => {
        if(res.object){
          this.$router.push(`/itemlist/?questions=${questions}&fieldId=${encodeURIComponent(fieldId)}&pointId=${pointId}&questionTypeId=${questionTypeId}`)
        }else{
          this.$message({
            message: res.messageInfo,
            type: "error"
          });
        }
      })


      // this.$router.push(`/examiner`);
    },
    radioItem(val) {
      if (this.currData.indexOf(val) >= 0) {
        this.currData.splice(this.currData.indexOf(val), 1);
      } else {
        this.currData = [val];
        this.$store.dispatch('CHAPTER_LIST_FETCH', {
          fieldId: val
        }).then( res => {
          this.chaptData = []
          if(res.object){
            this.isShowChapter = true
            this.chapterList = res.object
          }else{
            this.isShowChapter = false
            this.chapterList = []
          }

        })
      }

      // this.currData = [val]
    },
    checkoutTopic(val) {
      if (this.checkList.indexOf(val) >= 0) {
        this.checkList.splice(this.checkList.indexOf(val), 1);
      } else {
        // this.checkList = [val];
        this.checkList.push(val)
      }
    },
    checkboxItem(val) {
      if (this.chaptData.indexOf(val) >= 0) {
        this.chaptData.splice(this.chaptData.indexOf(val), 1);
      } else {
        // this.chaptData = [val];
        this.chaptData.push(val)
      }
    },
    getPath() {
      this.path = this.$route.path;
      // console.log("----", this.path);
    },
    handleClick(tab, event) {
      // console.log(tab, event);
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
    headerNav,
    curriculumBox,
    chapterBox
  }
};
</script>
<style lang="less">
.questions-page {
  .questions-tabs {
    height: 54px;
    li {
      float: left;
      line-height: 54px;
      a {
        font-size: 16px;
        color: #999;
        line-height: 54px;
        display: inline-block;
        margin-right: 30px;
        height: 100%;
        &.router-link-active {
          color: #000;
          border-bottom: 2px solid #5a9cff;
        }
      }
    }
  }
  .occupation-page {
    .title {
      padding: 10px 0;
      font-size: 16px;
      color: #808080;
      span {
        color: #333333;
        float: right;
        margin-right: 46px;
        cursor: pointer;
      }
    }
    .occupation-button {
      margin: 30px auto;
      text-align: center;
      span {
        display: inline-block;
        font-size: 14px;
        padding: 15px;
        text-align: center;
        color: #fff;
        border-radius: 6px;
        background: #6200ff;
        cursor: pointer;
        margin: 0 35px;
      }
    }
  }
}
</style>
