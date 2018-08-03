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
          <el-select size="small" v-model="value" placeholder="请选择" @change="selectType">
            <el-option
              v-for="item in getEtFieldList"
              :key="item.fieldId"
              :label="item.fieldName"
              :value="item.fieldId">
            </el-option>
          </el-select>
        </div>
        <ul class="exam-tabs border-bottom-color" v-if="getEtFieldList">
          <li><router-link to="/exam/latest" :class="{'active': isNav(/latest/) || path == '/exam/' ||  path == '/exam' }" >我的考试</router-link></li>
          <li><router-link to="/exam/mytest" :class="{'active': isNav(/mytest/) }">考试记录</router-link></li>
        </ul>
        <router-view v-if="getEtFieldList " :value="value||''"></router-view>
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
      active: 0,getEtFieldList: []
    };
  },
  computed: {
    ...mapState({
      // getEtFieldList: state => state.getEtFieldList
      // myErrorList: state => state.myErrorList,
    })
  },
  created() {
    // 下拉框
    this.$store.dispatch('EXAM_Field_LIST_FETCH', {}).then(res => {
      this.getEtFieldList = res.object;
      if(this.getEtFieldList){
        this.getEtFieldList.unshift({
          fieldName: "全部"
        })
        // this.value = this.getEtFieldList[0]['fieldId']
        this.value = "" //默认获取全部列表
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
    selectType(val){
      this.value = val;
    }
  },
  components: {
    headerNav
  }
};
</script>
<style lang="less">
.exam-page {
  .questions-tabs {
    height: 54px;
    li {
      float: left;
      span {
        font-size: 24px;
        color: #999;
        line-height: 54px;
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
    margin: 10px 0;
    font-size: 16px;
    color: #808080;
  }
  .exam-tabs{
    height: 54px;
    li{
      float: left;
      line-height: 54px;
      a{
        font-size: 16px;
        color: #999;
        line-height: 54px;
        margin-right: 70px;
        display: inline-block;
        &.active {
          color: #000;
          border-bottom: 2px solid #5a9cff;
        }
      }
    }
  }

}
</style>
