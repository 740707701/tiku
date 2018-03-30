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
        <div class="test-select" v-if="getEtFieldList">考试选择：
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in getEtFieldList"
              :key="item.questionsId"
              :label="item.fieldName"
              :value="item.fieldId">
            </el-option>
          </el-select>
        </div>
        <ul class="exam-tabs border-bottom-color" v-if="getEtFieldList && value">
          <li><router-link to="/exam/latest" :class="{'active': isNav(/latest/) || path == '/exam/' ||  path == '/exam' }" >我的考试</router-link></li>
          <li><router-link to="/exam/mytest" :class="{'active': isNav(/mytest/) }">考试记录</router-link></li>
        </ul>
        <router-view v-if="getEtFieldList && value" :value="value"></router-view>
        <div v-if="!getEtFieldList" style="height: 200px;text-align:center;line-height: 100px;font-size:30px;">没有考试数据</div>
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
      getEtFieldList: state => state.getEtFieldList
      // myErrorList: state => state.myErrorList,
    })
  },
  created() {
    // 下拉框
    this.$store.dispatch('EXAM_Field_LIST_FETCH', {}).then(res => {
      if(this.getEtFieldList){
        this.value = this.getEtFieldList[0]['fieldId']
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
        if(this.getEtFieldList){
          this.value = this.getEtFieldList[0]['fieldId']
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
.exam-page {
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
          border-bottom: 2px solid #5a9cff;
          padding-bottom: 13px;;
          font-size: 26px;
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
        font-size: 22px;
        color: #999;
        line-height: 64px;
        margin-right: 70px;
        &.active {
          color: #000;
          border-bottom: 4px solid #5a9cff;
          padding-bottom: 14px;
          font-size: 24px
        }
      }
    }
  }

}
</style>
