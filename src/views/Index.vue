<template>
  <div class="index-page">
    <header-nav></header-nav>
    <div class="big-banner">
      <div class="wrapper">
        <img src="../assets/images/title.png" class="title">
        <a href="#" class="system-button"><i></i></a>
      </div>
    </div>
    <div class="item-list">
      <div class="wrapper">
        <div class="list-box list-small">
          <a @click="tiku" href="javascript:;">
            <img src="../assets/images/icon-book.png" alt="">
            <p>我的题库</p>
          </a>
        </div>
        <div class="list-box list-small list-margin">
          <a @click="tiku" href="javascript:;">
            <img src="../assets/images/icon-book.png" alt="">
            <p>我的考试</p>
          </a>
        </div>
        <div class="list-box list-small">
          <a @click="tiku" href="javascript:;">
            <img src="../assets/images/icon-book.png" alt="">
            <p>我的错题</p>
          </a>
        </div>
        <div class="list-box list-middle list-margin-right">
          <a @click="tiku" href="javascript:;">
            <img src="../assets/images/icon-book.png" alt="">
            <p>我要当考官</p>
          </a>
        </div>
        <div class="list-box list-middle">
          <a @click="tiku" href="javascript:;">
            <img src="../assets/images/icon-book.png" alt="">
            <p>我要当判官</p>
          </a>
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
      isShow: false,
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
    tiku() {
      this.isShow = true;
    }
    // getMovie: function () {
    // console.log('================');
    //   // this.$store.dispatch('HOME_FILTERS_FETCH', {})
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
    background: url("../assets/images/home-bg.jpg") center top no-repeat;
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
      &.list-small{
        width: 406px;
      }
      &.list-middle{
        width: 622px;
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

}
</style>
