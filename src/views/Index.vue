<template>
  <div class="index-page">
    <header-nav></header-nav>
    <div class="big-banner">
      <div class="wrapper">
        <img src="../assets/images/title.png" class="title">
        <a href="javascript:;" class="system-button" @click="aboutTiku"><i></i></a>
      </div>
    </div>
    <span class="icon-sousuo1"></span>
    <span class="icon-bofang"></span>

    <div class="item-list">
      <div class="wrapper">
        <div class="list-box list-small">
          <a @click="changLogin(0)" href="javascript:;"><img src="../assets/images/icon-book.png" alt=""><p>我的题库</p></a>
        </div>
        <div class="list-box list-small list-margin">
          <a @click="changLogin(1)" href="javascript:;"><img src="../assets/images/icon-book.png" alt=""><p>我的考试</p></a>
        </div>
        <div class="list-box list-small">
          <a @click="changLogin(2)" href="javascript:;"><img src="../assets/images/icon-book.png" alt=""><p>我的错题</p></a>
        </div>
        <div class="list-box list-middle list-margin-right">
          <a @click="changLogin(3)" href="javascript:;"><img src="../assets/images/icon-book.png" alt=""><p>我要当考官</p></a>
        </div>
        <div class="list-box list-middle">
          <a @click="changLogin(4)" href="javascript:;"><img src="../assets/images/icon-book.png" alt=""><p>我要当判官</p></a>
          <!-- judge -->
        </div>
      </div>
    </div>
    <div class="tiku-dialog" v-if="showTiku">
      <div class="dialog-bg" @click="showTiku = !showTiku"></div>
        <div class="dialog-body">
          <div class="dialog-content">
            <router-link :to="'/questions/'+ val.questionsId" v-for="(val, index) in tikuList" :key="index">{{ val.questionsName }}<i></i></router-link>
          </div>
        </div>
    </div>
    <div class="tiku-dialog" v-if="showPanguan">
      <div class="dialog-bg" @click="showPanguan = !showPanguan"></div>
        <div class="dialog-body">
          <div class="dialog-content">
            <router-link :to="'/question/'+ val.questionsId" v-for="(val, index) in tikuList" :key="index">{{ val.questionsName }}<i></i></router-link>
          </div>
        </div>
    </div>
    <div class="tiku-dialog" v-if="showExaminer">
      <div class="dialog-bg" @click="showExaminer = !showExaminer"></div>
        <div class="dialog-body">
          <div class="dialog-content">
            <h3>选择课程</h3>
            <div class="examiner-list">
              <router-link to="/trial">宏观经济学<i></i></router-link>
              <router-link to="/trial">简历<i></i></router-link>
              <router-link to="/trial">工作方法<i></i></router-link>
              <router-link to="/trial">工作态度<i></i></router-link>
              <router-link to="/trial">职业规划<i></i></router-link>
            </div>
          </div>
        </div>
    </div>
    <!-- （学生端）
 -->
   <div class="dialog" v-show="isShowTiku">
    <div class="dialog-bg" @click="isShowTiku = !isShowTiku"></div>
      <div class="dialog-banner dialog-info">
        <div class="sign-right">
          <p>题库功能介绍</p>
          <p>本题库系统是一个可以内生发展，多用户共建的智能推送题库，本题库的功能包括：</p>
          <p>1、可以进行职业类、专业类、金融业务类和金融证书类的专题题库练习；</p>
          <p>2、可以根据每道题目的标签，搜索自己需要的题目，同时可以对每道题目打标签，建立自己的专属题库；</p>  
          <p>3、可以智能化推送错题以及错题所属知识点的题目，进行薄弱知识点的强化训练；</p> 
          <p>4、可以参与题库共建，自行出题；</p>
          <p>5、可以参与审题，对每道题目进行多维度评分，以及点评；</p>
          <p>6、可以参加老师组织的考试，也可以自行组卷，发布给自己或者朋友来考试；</p>  
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
      isShowTiku: false,
      showPanguan: false,
    };
  },
  computed: {
    ...mapState({ 
      tikuList: state => state.tikuList,
    }),
  },
  mounted() {
    // let data = "j_username=student&j_password=123456";
  },
  created() {
    // 我的题库
    this.$store.dispatch('TIKU_LIST_FETCH', {}),

    // 设置弹窗
    this.$store.commit('INDEX_SET', {
      target: 'isLogin',
      data: false
    })
  },
  methods: {
    aboutTiku(){
      this.isShowTiku = true
    },
    changLogin(id) {
      console.log('---', id )
      let username = sessionStorage.getItem('username')

      if(username){
        this.$store.commit('ACCOUNT_SET', {
          target: 'isShowPop',
          data: true
        })

        if(id == 1){
          this.$router.push(`/exam/latest`) 
        }else if(id ==2){
          this.$router.push(`/myerror`) 
        }else if(id == 3){
          this.showPanguan = true
        }else if(id == 4){
          this.showExaminer = true
        }else{
          this.showTiku = true
        }
        
      }else{
        this.$store.commit('INDEX_SET', {
          target: 'isLogin',
          data: true
        })
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
  },
  components: {
    headerNav,
  }
};
</script>
<style lang="less">
@import "../assets/css/style.less";
.index-page {
  header{
    padding-top: 48px;
    nav{
      height: 132px;
    }
  }
  .big-banner{
    height: 520px;
    background: #7b27fb url("../assets/images/home-bg.jpg") center top no-repeat;
    .title{
      margin-top: 30px;
      margin-bottom: 100px;
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
    height: 540px;
    margin-top: -42px;
    font-size: 0;
    letter-spacing: -4px;
    text-align: center;
    .list-box{
      font-size: 20px;
      letter-spacing: 0;
      display: inline-block;
      height: 250px;
      background-color: #fff;
      box-shadow: 0 0 40px 20px rgba(102,0,255,.04);
      border-radius: 14px;
      margin-bottom: 50px;
      border: 1px solid #ccc;
      box-sizing: border-box;
      &.list-small{
        width: 406px;
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
        transition: all .4s;
        &:hover{
          color: #010101; 
          transform: translateY(-10px);
          box-shadow: 10px 10px 10px #ccc;
        }
        &.active{
          font-size: 28px;
          border-color: #f95c54;
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
        // &:hover{
        //   border-color: #f95c54;
        //   color: #010101;
        //   // font-size: 28px;
        //   i{
        //     width: 30px;
        //     height: 30px;
        //     background: url('../assets/images/icon-check.png') -32px 0 no-repeat;
        //     position: absolute;
        //     right: -1px;
        //     bottom: -1px;
        //     display: block;
        //   }
        // }
        // &.active i{
        //     width: 30px;
        //     height: 30px;
        //     position: absolute;
        //     right: -1px;
        //     bottom: -1px;
        //     display: block;
        //   }
      }
    }
  }
  .dialog{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1002;
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
      padding: 0 76px 76px;
      transform: translate(-50%, -50%);
      background: #fff;
    }
    .dialog-info{
      height: 390px;
      padding: 55px;
      background: #fff url('../assets/images/banner-bg.png') 50px 50px no-repeat;
      background-size: 499px 384px;
      .sign-right{
        width: 610px;
        float: right;
        p{
          font-size: 16px;
          color: #333;
          line-height: 40px;
        }
        p:first-child{
          color: #720fb1;
          border-left: 6px solid #720fb1;
          padding-left: 20px;
          line-height: normal;
        }
        p:nth-child(2){
          margin-bottom: 10px;
        }        
      }
    }
    .dialog-banner{
      position: absolute;
      top: 50%;
      left: 50%;
      width: 1120px;
      transform: translate(-50%, -50%);
      
      border-radius: 14px;
    }
    .dialog-sign{
      height: 476px;
      padding: 130px 80px;
      background: #fff url('../assets/images/banner-bg.png') 80px 130px no-repeat;
      .sign-right{
        width: 474px;
        float: right;
        p{
          font-size: 36px;
          color: #4e00cc;
          text-align: center;
          margin: 42px 0;
        }
        .form-box{
          height: 40px;
          padding: 20px 0;
          border-bottom: 1px solid #ccc;
          i{
            display: inline-block;
            width: 18px;
            height: 20px;
            margin: 0 16px;
            vertical-align: sub;
            &.icon-user{
              background: url('../assets/images/icon-user.png') no-repeat;
            }
            &.icon-lock{
              background: url('../assets/images/icon-lock.png')  no-repeat;
            }
          }
          input{
            width: 424px;
            height: 40px;
            line-height: 40px;
            font-size: 18px;
            color: #ccc;
          }
        }
        .el-checkbox{
          margin-top: 26px;
          margin-left: 16px;
          .el-checkbox__label{
            font-size: 16px;
          }

          .el-checkbox__input.is-checked+.el-checkbox__label{
            color: #606266;
          }
          
        }
        .reset-pwd{
          margin-top: 26px;
          line-height: 19px;
          font-size: 16px;
          float: right;
          color: #a36bfd;
          cursor: pointer;
        }
        .sign-button{
          display: block;
          width: 200px;
          height: 50px;
          margin: 70px auto 0;
          text-align: center;
          line-height: 50px;
          color: #fff;
          font-size: 18px;
          background: #4e00cc;
          border-radius: 25px;
          box-shadow: 0 0 #4d11ad;
        }
      }
      .back-button{
        position: absolute;
        bottom: 30px;
        left: 80px;
        color: #4e00cc;
        cursor: pointer;
        .icon-back{
          display: inline-block;
          width: 20px;
          height: 21px;
          background: url('../assets/images/icon-back.png') no-repeat;
          vertical-align: sub;
          padding-right: 8px;
        }
      }
    }
    .dialog-content{
      margin-right: -30px;
      h3{
        height: 66px;
        line-height: 66px;
        border-bottom: 1px solid #dadada;
        font-size: 28px;
        color: #000;
        position: relative;
        &::after{
          content: "";
          display: block;
          clear: both;
          width: 112px;
          height: 4px;
          background-color: #000;
          position: absolute;
          left: 0;
          bottom: 0;
        }
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
          font-size: 28px;
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
