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
          <div class="wrapper" v-if="curriculumList">
            <p class="title">课程选择： {{ currData  }}<span v-if="curriculumList.length > 8" @click="showCurr" v-show="!isShowCurr">更多></span> <span v-show="isShowCurr" @click="showCurr">收起</span></p>
            <curriculum-box :curriculum="curriculumList" :selectedData="currData"  @selectEvent="radioItem"></curriculum-box>
            <p class="title" v-if="isShowChapter">章节选择： {{ chaptData }}<span v-if="chapterList.length > 8">更多></span></p>
            <chapterBox :curriculum="chapterList" :selectedData="chaptData" @selectEvent="checkboxItem"></chapterBox>
            <p class="title">题型：</p>
            <!-- <topic :topicType="typeList" :selectedData="checkList" @topicEvent="checkoutTopic"></topic> -->
            <div class="topic-type">
              <!-- :checked="list.subjective" -->
              <el-checkbox-group v-model="checkList">
                <el-checkbox v-for="list in typeList" :key="list.id"  :label="list.id" >{{list.name}}</el-checkbox>
              </el-checkbox-group>
            {{ checkList }}
            </div>

            <div class="occupation-button">
              <span  @click="random">随机练习</span><span  @click="intelligence">智能答题</span>
            </div>
          </div>
          <div class="wrapper" style="height: 200px;text-align:center;line-height: 100px;font-size:30px;" v-else-if="!curriculumList">
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
// import topic from "../../components/topicType.vue";
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
      chapterList: []
    };
  },
  computed: {
    ...mapState({
      tikuList: state => state.tikuList,
      // fieldList: state => state.fieldList,
      // konwledList: state => state.konwledList,
      typeList: state => state.question.typeList,
      curriculumList: state => state.curriculumList,
      // chapterList: state => state.chapterList,
    })
  },
  created() {
    let questions = this.$route.params.id;
    // tabs
    this.$store.dispatch("TIKU_LIST_FETCH", {});
    this.$store.dispatch("CURRICULUM_LIST_FETCH", {
      questionsId: questions
    });
    this.$store.dispatch("CHAPTER_LIST_FETCH", {
      fieldId: questions
    }).then(res => {
      if(res.object){
        this.chapterList = res.object;
        this.isShowChapter = true;
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
　　　　this.$router.go(0);
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
          pointId = this.chaptData,
      questionTypeId =     this.checkList;

   this.$store.dispatch("QUESTION_RANDOM_SET", {
      fieldId,
      pointId,
      questionTypeId
    }).then( res => {
      if(res.object){
        this.$router.push(`/examiner/?fieldId=${encodeURIComponent(fieldId)}&pointId=${pointId}&questionTypeId=${questionTypeId}`)
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
      pointId = this.chaptData,
      questionTypeId =     this.checkList;

      this.$store.dispatch("QUESTION_INTELLIGENT_SET", {
        fieldId,
        pointId,
        questionTypeId
      }).then( res => {
        if(res.object){
          this.$router.push(`/itemlist/?fieldId=${encodeURIComponent(fieldId)}&pointId=${pointId}&questionTypeId=${questionTypeId}`)
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
      if (this.currData.includes(val)) {
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
      if (this.checkList.includes(val)) {
        this.checkList.splice(this.checkList.indexOf(val), 1);
      } else {
        // this.checkList = [val];
        this.checkList.push(val)
      }
    },
    checkboxItem(val) {
      if (this.chaptData.includes(val)) {
        this.chaptData.splice(this.chaptData.indexOf(val), 1);
      } else {
        this.chaptData = [val];
        // this.chaptData.push(val)
      }
    },
    getPath() {
      this.path = this.$route.path;
      console.log("----", this.path);
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
@import "../../assets/css/style.less";
.questions-page {
  header {
    padding-top: 10px;
    nav {
      height: 160px;
    }
  }
  .big-banner {
    height: 320px;
    background: #7b27fb url("../../assets/images/list-bg.jpg") center top
      no-repeat;
    margin-bottom: 30px;
    .title {
      margin-top: 20px;
    }
  }
  .questions-tabs {
    height: 64px;
    li {
      float: left;
      a {
        font-size: 24px;
        color: #999;
        line-height: 64px;
        margin-right: 70px;
        &.router-link-active {
          color: #000;
          border-bottom: 4px solid #5a9cff;
          padding-bottom: 14px;
        }
      }
    }
  }
  .occupation-page {
    .title {
      padding: 27px 0;
      font-size: 20px;
      color: #808080;
      span {
        color: #333333;
        float: right;
        margin-right: 46px;
        cursor: pointer;
      }
    }
    .occupation-button {
      margin: 100px auto;
      text-align: center;
      span {
        display: inline-block;
        width: 180px;
        height: 80px;
        text-align: center;
        line-height: 80px;
        color: #fff;
        font-size: 28px;
        border-radius: 6px;
        background: #6200ff;
        cursor: pointer;
        margin: 0 35px;
      }
    }
  }
}
</style>
