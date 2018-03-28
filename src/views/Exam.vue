<template>
  <div class="exam-page">
    <header-nav></header-nav>
    <div class="big-banner">
      <div class="wrapper">
        <img src="../assets/images/title.png" class="title">
      </div>
    </div>
    <div class="exam-list">
      <div class="wrapper">
        <ul class="questions-tabs border-bottom-color" >
          <li v-for="(val, index) in tikuList" :key="index">
            <span @click="tabsChange(val.questionsId, index)" :class="{'active': index ==  active}">{{ val.questionsName }}</span>
          </li>
        </ul>
        <div class="test-select" v-if="curriculumList">考试选择：
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in curriculumList"
              :key="item.questionsId"
              :label="item.fieldName"
              :value="item.fieldId">
            </el-option>
          </el-select>
        </div>
        <ul class="exam-tabs border-bottom-color" v-if="curriculumList && value">
          <li><router-link to="/exam/latest" :class="{'active': isNav(/latest/) || path == '/exam/' ||  path == '/exam' }" >我的考试</router-link></li>
          <li><router-link to="/exam/mytest" :class="{'active': isNav(/mytest/) }">考试记录</router-link></li>
        </ul>
        <router-view v-if="curriculumList && value" :value="value"></router-view>
        <div v-if="!curriculumList" style="height: 200px;text-align:center;line-height: 100px;font-size:30px;">没有考试数据</div>
      </div>
    </div>

  </div>
</template>

<script>

import headerNav from '../components/Header.vue'

import { mapState } from "vuex";

export default {
  name: "exam",
  data() {
    return {
      value: '',
      active: 0
    };
  },
  computed: {
    ...mapState({
      tikuList: state => state.tikuList,
      curriculumList: state => state.curriculumList
      // myErrorList: state => state.myErrorList,
    })
  },
  created() {
    this.$store.dispatch("TIKU_LIST_FETCH", {});
    // 下拉框
    this.$store.dispatch('CURRICULUM_LIST_FETCH', {
      questionsId: 1
    }).then(res => {
      if(this.curriculumList){
        this.value = this.curriculumList[0]['fieldId']
      }
      
    })
    this.getPath();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    tabsChange(id, index){
      this.active = index;
      this.$store.dispatch('CURRICULUM_LIST_FETCH', {
        questionsId: id
      }).then(res => {
        if(this.curriculumList){
          this.value = this.curriculumList[0]['fieldId']
        }
      })
    },
    getPath() {
      this.path = this.$route.path;
    },
    isNav(reg){
      if(Object.prototype.toString.call(reg) === '[object RegExp]'){
        return reg.test(this.$router.currentRoute.path)
      }else if(Object.prototype.toString.call(reg) === '[object String]'){
        return new RegExp(reg).test(this.$router.currentRoute.path)
      }else{
        return false
      }
    },
  },
  components: {
    headerNav
  }
};
</script>
<style lang="less">
@import "../assets/css/style.less";
.exam-page {
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
    .title{
      margin-top: 20px;
    }
  }
  .questions-tabs {
    height: 64px;
    li {
      float: left;
      span {
        font-size: 24px;
        color: #999;
        line-height: 64px;
        margin-right: 70px;
        height: 100%;
        &.active {
          color: #000;
          border-bottom: 4px solid #5a9cff;
          padding-bottom: 14px;
        }
      }
    }
  }
  .test-select{
    margin: 30px 0;
    font-size: 18px;
    color: #808080;
  }
  .exam-tabs{
    height: 64px;
    li{
      float: left;
      a{
        font-size: 24px;
        color: #999;
        line-height: 64px;
        margin-right: 70px;
        &.active {
          color: #000;
          border-bottom: 4px solid #5a9cff;
          padding-bottom: 14px;
        }
      }
    }
  }

}
</style>
