<template>
  <div class="index-page">
    <header-nav></header-nav>
    <!-- {{ getMovie }} -->
    <div class="big-banner">
      <div class="wrapper">
        <img src="../assets/images/title.png" class="title">
        <a href="#" class="system-button"><i></i></a>
      </div>
    </div>
    <div class="item-list">
      <div class="wrapper">
        <div class="list-box list-small">
          <a @click="showTiku = true" href="javascript:;"><img src="../assets/images/icon-book.png" alt=""><p>我的题库</p></a>
        </div>
        <div class="list-box list-small list-margin">
          <router-link to="/exam/mytest" class=""><img src="../assets/images/icon-book.png" alt=""><p>我的考试</p></router-link>
        </div>
        <div class="list-box list-small">
          <router-link to="/myerror" class=""><img src="../assets/images/icon-book.png" alt=""><p>我的错题</p></router-link>
        </div>
        <div class="list-box list-middle list-margin-right">
          <a @click="showExaminer = true" href="javascript:;"><img src="../assets/images/icon-book.png" alt=""><p>我要当考官</p></a>
          
          <!-- <router-link to="/examiner" class=""><img src="../assets/images/icon-book.png" alt=""><p></p></router-link> -->
        </div>
        <div class="list-box list-middle">
          <router-link to="/judge" class=""><img src="../assets/images/icon-book.png" alt=""><p>我要当判官</p></router-link>
        </div>
      </div>
    </div>
    <div class="tiku-dialog" v-if="showTiku">
      <div class="dialog-bg" @click="showTiku = !showTiku"></div>
        <div class="dialog-body">
          <div class="dialog-content">
            <router-link to="/questions/occupation">职业题库<i></i></router-link>
            <router-link to="/questions/economics">经济金融基础题库<i></i></router-link>
            <router-link to="/questions/finance">金融业务题库<i></i></router-link>
            <router-link to="/questions/certificate">证书类题库<i></i></router-link>
          </div>
        </div>
    </div>
    <div class="tiku-dialog" v-if="showExaminer">
      <div class="dialog-bg" @click="showExaminer = !showExaminer"></div>
        <div class="dialog-body">
          <div class="dialog-content">
            <h3>选择课程</h3>
            <div class="examiner-list">
              <router-link to="/examiner">宏观经济学<i></i></router-link>
              <router-link to="/examiner">简历<i></i></router-link>
              <router-link to="/examiner">工作方法<i></i></router-link>
              <router-link to="/examiner">工作态度<i></i></router-link>
              <router-link to="/examiner">职业规划<i></i></router-link>
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
  name: "index",
  data() {
    return {
      showTiku: false,
      showExaminer: false,
    };
  },
  computed: {
    ...mapState({
      getMovie: state => state.home.getMovie
    })

    // newMovies () {
    //   this.$store.dispatch('HOME_FILTERS_FETCH')
    // }
  },
  
  // asyncData ({ store, route, cookies}) {
  //   return Promise.all([
  //     store.dispatch('HOME_FILTERS_FETCH', {}),
  //   ])
  // },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // getMovie: function () {
    // console.log('================');
    //   this.$store.dispatch('HOME_FILTERS_FETCH', {})
    // }
  },
  components: {
    headerNav
  }
};
</script>
<style lang="less">
@import "../assets/css/style.less";
.index-page {
  header{
    padding-top: 48px;
    nav{
      height: 216px;
    }
  }
  .big-banner{
    height: 742px;
    background: #7b27fb url("../assets/images/home-bg.jpg") center top no-repeat;
    .title{
      margin-top: 90px;
      margin-bottom: 134px;
    }
    .system-button{
      display: block;
      width: 318px;
      height: 68px;
      background: url("../assets/images/system.png") no-repeat;
      background-position: 120px 20px;
      border: 2px solid #ece9f2;
      border-radius: 34px;
      position: relative;
      i{
        display: inline-block;
        width: 38px;
        height: 32px;
        background: url("../assets/images/triangle.png") no-repeat;
        position: absolute;
        top: 20px;
        left: 40px;
      }
      
    }
  }
  .item-list{
    height: 816px;
    margin-top: -100px;
    font-size: 0;
    letter-spacing: -4px;
    text-align: center;
    .list-box{
      font-size: 20px;
      letter-spacing: 0;
      display: inline-block;
      height: 318px;
      background-color: #fff;
      box-shadow: 0 0 40px 20px rgba(102,0,255,.04);
      border-radius: 14px;
      margin-bottom: 50px;
      border: 1px solid #ccc;
      &.list-small{
        width: 404px;
      }
      &.list-middle{
        width: 620px;
      }
      &.list-margin{
        margin: 0 30px;
      }
      &.list-margin-right{
        margin-right: 36px;
      }
      a{
        display: block;
        width: 100%;
        height: 100%;
        text-decoration: none;
        img{
          margin-top: 56px;
        }
        p{
          font-size: 20px;
          color: #2c285f;
        }
      }
    }
  }
  .tiku-dialog{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 501;
    .dialog-bg{
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: #808080;
      opacity: .5;
    }
    .dialog-body{
      position: absolute;
      top: 50%;
      left: 50%;
      width: 1130px;
      padding: 76px;
      transform: translate(-50%, -50%);
      background: #fff;
    }

    .dialog-content{
      margin-right: -30px;
      position: relative;
      h3{
        font-size: 26px;
        color: #000;
        width: 100%;
        border-bottom: 1px solid #ccc;
        position: absolute;
        top: -46px;
        left: 0;
        padding-bottom: 14px;
        &::before{
          content: "";
          display: block;
          clear: both;
          width: 110px;
          height: 4px;
          background: #000;
          position: absolute;
          bottom: 0;
        }
      }
      .examiner-list{
        padding-top: 40px;
      }
      a{
        display: inline-block;
        width: 256px;
        height: 120px;
        line-height: 120px;
        text-align: center;
        border: 2px #ccc solid;
        margin-right: 30px;
        margin-bottom: 52px;
        font-size: 26px;
        color: #b2b2b2;
        text-decoration: none;
        position: relative;
        &:hover{
          border-color: #f95c54;
          color: #010101;
          // font-size: 28px;
          i{
            width: 30px;
            height: 30px;
            background: url('../assets/images/icon-check.png') -32px 0 no-repeat;
            position: absolute;
            right: -1px;
            bottom: -1px;
            display: block;
          }
        }
        &.active i{
            width: 30px;
            height: 30px;
            position: absolute;
            right: -1px;
            bottom: -1px;
            display: block;
          }
      }
    }
  }
}
</style>
