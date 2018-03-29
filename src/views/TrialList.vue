<template>
  <div class="questions-page">
    <header-nav></header-nav>
    <div class="big-banner">
      <div class="wrapper">
        <img src="../assets/images/title.png" class="title">
      </div>
    </div>
    <div class="questions-list">
      <div class="wrapper">
        <ul class="questions-tabs border-bottom-color" >
          <li v-for="(val, index) in tikuList" :key="index">
            <router-link :to="'/triallist/'+ val.questionsId" :class="{'active': isNav(/val.questionsId/) }"  @click.native="flushCom">{{ val.questionsName }}</router-link>
          </li>
        </ul>
        <!-- 就设置一个内页 router-view-->
        <div class="occupation-page">
          <div class="wrapper" v-if="curriculumList.length">
            <p class="title">课程选择：<span v-if="curriculumList.length > 8" @click="showCurr" v-show="!isShowCurr">更多></span> <span v-show="isShowCurr" @click="showCurr">收起</span></p>
            <curriculum-box :curriculum="curriculumList" :selectedData="currData"  @selectEvent="radioItem"></curriculum-box>
            <p class="title">题型：</p>
            <div class="topic-type">
              <el-checkbox-group v-model="checkList">
                <el-checkbox v-for="list in thisTypeList" :key="list.id"  :label="list.id" >{{list.name}}</el-checkbox>
              </el-checkbox-group>

            </div>

            <div class="occupation-button">
              <span @click="exitQuestion">点击审题</span>
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
import headerNav from "../components/Header.vue";
import curriculumBox from "../components/curriculumItem.vue";
import { mapState } from "vuex";

export default {
  name: "questions",
  data() {
    return {
      hideCurriculum: [],
      hideChapter: [],
      currData: [],
      isShowCurr: false,
      isShowChapter: false,
      checkList: [],
      thisTypeList: [],
      curriculumList: []
    };
  },
  computed: {
    ...mapState({
      tikuList: state => state.tikuList,
      // fieldList: state => state.fieldList,
      // konwledList: state => state.konwledList,
      typeList: state => state.question.typeList,
      // curriculumList: state => state.curriculumList,
    })
  },
  created() {
    let questions = this.$route.params.id;
    // tabs
    this.$store.dispatch("TIKU_LIST_FETCH", {});
    this.$store.dispatch("QUESTION_TYPE_SET", {});
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
        this.getTypeList(this.curriculumList[0]['fieldId'])
      }
    })

  },
  methods: {
    exitQuestion() {
      if(!this.currData.length){
        this.$message({
          message: "请选择课程",
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
          questionTypeId = this.checkList.sort(),
          questions = this.$route.params.id
      this.$router.push(`/trial/?questions=${questions}&fieldId=${fieldId}&questionTypeId=${questionTypeId}`)
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
          this.getTypeList(this.curriculumList[0]['fieldId'])
        }
      })
　　},
    getTypeList(id){
      this.$store.dispatch('QUESTIONTYPE_GROUPING', {
        fieldId: id

      }).then(res => {
        if(res.result == 'success'){
          this.thisTypeList = [];
          res.object.forEach((val,index) => {
            this.typeList.forEach((valType, indexType) => {
              if(val.questionTypeId == valType.id){
                this.thisTypeList.push(valType)
              }
            })
          })

        }else if(res.result == 'error'){
          this.thisTypeList = [];
        }
        console.log(res)
      })
    },
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

    radioItem(val) {
      if (this.currData.indexOf(val) >= 0) {
        this.currData.splice(this.currData.indexOf(val), 1);
      } else {
        this.currData = [val];
        this.getTypeList(val)
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
  watch: {
    $route(to, from, next) {
      // this.$store.dispatch('CURRICULUM_LIST_FETCH', {
      //   questionsId: to.params.id
      // })
      // this.$store.dispatch('CHAPTER_LIST_FETCH', {
      //   fieldId: to.params.id
      // })
      // this.init(to.params.id)
      // next()
    }
  },
  components: {
    headerNav,
    curriculumBox
  }
};
</script>
<style lang="less">
@import "../assets/css/style.less";
.questions-page {
  header {
    padding-top: 10px;
    nav {
      height: 130px;
    }
  }
  .big-banner {
    height: 320px;
    background: #7b27fb url("../assets/images/list-bg.jpg") center top
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
