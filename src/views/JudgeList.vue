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
            <router-link :to="'/judgelist/'+ val.questionsId" :class="{'active': isNav(/val.questionsId/) }"  @click.native="flushCom">{{ val.questionsName }}</router-link>
          </li>
        </ul>
        <!-- 就设置一个内页 router-view-->
        <div class="occupation-page">
          <div class="wrapper" v-if="curriculumList">
            <p class="title">课程选择：<span v-if="curriculumList.length > 8" @click="showCurr" v-show="!isShowCurr">更多></span> <span v-show="isShowCurr" @click="showCurr">收起</span></p>
            <curriculum-box :curriculum="curriculumList" :selectedData="currData"  @selectEvent="radioItem"></curriculum-box>
            <p class="title">题型：</p>
            <!-- <topic :topicType="typeList" :selectedData="checkList" @topicEvent="checkoutTopic"></topic> -->
            <div class="topic-type">
              <!-- :checked="list.subjective" -->
              <el-checkbox-group v-model="checkList">
                <el-checkbox v-for="list in typeList" :key="list.id" :label="list.id"  v-if="list.id!=7">{{list.name}}</el-checkbox>
              </el-checkbox-group>

            </div>

            <div class="occupation-button">
              <span @click="exitQuestion">点击出题</span>
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
      checkList: []
    };
  },
  computed: {
    ...mapState({
      tikuList: state => state.tikuList,
      // fieldList: state => state.fieldList,
      // konwledList: state => state.konwledList,
      typeList: state => state.question.typeList,
      curriculumList: state => state.curriculumList,
    })
  },
  created() {
    let questions = this.$route.params.id;
    // tabs
    this.$store.dispatch("TIKU_LIST_FETCH", {});
    this.$store.dispatch("CURRICULUM_LIST_FETCH", {
      questionsId: questions
    });
    this.$store.dispatch("QUESTION_TYPE_SET", {});
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

      let question = this.$route.params.id,
      fieldId = this.currData[0],
      questionTypeId =     this.checkList.sort();
      this.$router.push(`/judge/?question=${question}&fieldId=${fieldId}&questionTypeId=${questionTypeId}`)
    },
    flushCom:function(){
// 　　　　this.$router.go(0);
      let questions = this.$route.params.id;
      this.$store.dispatch("CURRICULUM_LIST_FETCH", {
        questionsId: questions
      });
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
