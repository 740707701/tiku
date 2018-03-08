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
            <router-link :to="'/questions/'+ val.questionsId" :class="{'active': isNav(/economics/) }" >{{ val.questionsName }}</router-link>
          </li>


  <!-- <router-link :to="'/questions/'+ val.questionsId" v-if="val.questionsId == '2'"  :class="{'active': val.questionsId == 2 }" >{{ val.questionsName }}</router-link>
          <router-link :to="'/questions/'+ val.questionsId" v-if="val.questionsId == '3'"  :class="{'active': val.questionsId == 3 }" >{{ val.questionsName }}</router-link>
          <router-link :to="'/questions/'+ val.questionsId" v-if="val.questionsId == '4'"  :class="{'active': val.questionsId == 4 }" >{{ val.questionsName }}</router-link> -->
            <!-- <router-link :to="'/questions/'+ val.questionsId" v-for="(val, index) in tikuList" :key="index">{{ val.questionsName }}<i></i></router-link>


          <li><router-link to="/questions/economics" :class="{'active': isNav(/economics/) }">经济金融基础题库</router-link></li>
          <li><router-link to="/questions/finance" :class="{'active': isNav(/finance/) }">金融业务题库</router-link></li>
          <li><router-link to="/questions/certificate" :class="{'active': isNav(/certificate/) }">证书类题库</router-link></li> -->
        </ul>
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>

import headerNav from '../../components/Header.vue'

import { mapState } from "vuex";

export default {
  name: "questions",
  data() {
    return {
    };
  },
  computed: {
    ...mapState({ 
      tikuList: state => state.tikuList,
      // fieldList: state => state.fieldList,
    }),
  },
  // asyncData ({ store, route, cookies}) {
  //   return Promise.all([
      

  //   ])
  // },
  created() {
    this.$store.dispatch('TIKU_LIST_FETCH', {}),
    // this.$store.dispatch('FIELD_LIST_FETCH', {}),
    
    this.getPath()
  },
  methods: {
    getPath() {
      this.path = this.$route.path
      
    },
    handleClick(tab, event) {
      console.log(tab, event);
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
@import "../../assets/css/style.less";
.questions-page {
  header{
    padding-top: 10px;
    nav{
      height: 160px;
    }
  }
  .big-banner{
    height: 320px;
    background: #7b27fb url("../../assets/images/list-bg.jpg") center top no-repeat;
    margin-bottom: 30px;
    .title{
      margin-top: 20px;
    }
  }
  .questions-tabs{
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
