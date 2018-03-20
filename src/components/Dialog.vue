<template>
  <div class="dialog" v-show="isLogin">
    <div class="dialog-bg" @click="closeLogin"></div>
    <!-- <div class="dialog-body">
      <div class="dialog-content">
        <h3>选择课程</h3>
        <a href="" class="active">职业题库<i></i></a>
        <a href="" class="">经济金融基础题库<i></i></a>
        <a href="">金融业务题库<i></i></a>
        <a href="">工作方法<i></i></a>
        <a href="">工作方法<i></i></a>
      </div>
    </div> -->
    <div class="dialog-banner dialog-sign">
      <div class="sign-right">
        <div class="user-login">
          <p>欢迎登录</p>
          <div class="form-box"><i class="icon-user"></i><input type="text" placeholder="请输入学号" v-model="username"></div>
          <div class="form-box"><i class="icon-lock"></i><input type="password" placeholder="请输入密码" v-model="password"></div>
          <el-checkbox v-model="checked" true>记住密码</el-checkbox><span class="reset-pwd">修改密码</span>
          <a href="#" class="sign-button" @click="login">登录</a>
        </div>
        <div class="user-reset-pwd" style="display: none">
          <p>修改密码</p>
          <div class="form-box"><i class="icon-lock"></i><input type="password" placeholder="请输入初始密码"></div>
          <div class="form-box"><i class="icon-lock"></i><input type="password" placeholder="请输入新密码"></div>
          <a href="#" class="sign-button">提交</a>
        </div>
      </div>
      <span class="back-button" @click="closeLogin"><i class="icon-back"></i>返回首页</span>

    </div>
  </div>
</template>
<style lang="less">
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
</style>

<script>
import { mapState } from "vuex";
export default {
  name: 'dialog',
  data() {
    return {
      checked: true,
      username: '',
      password: '',
      
    } 
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin,
      userInfo: state => state.account.userInfo,
      isShowPop: state => state.account.isShowPop
    })
  },
  created() {
    // 设置弹窗
    // this.$store.commit('INDEX_SET', {
    //   target: 'isLogin',
    //   data: true
    // })
  },
  methods: {
    login(){
 console.log(1)
      this.$store.dispatch('ACCOUNT_LOGIN', {
         username: this.username , 
         password: this.password
      }).then( res =>{

        if( res.success ){

          console.log(1)
          sessionStorage.setItem('username', this.username)
          sessionStorage.setItem('password', this.password)
          
          this.$message({
            message: '恭喜你，登录成功！',
            type: 'success'
          });
          this.$store.commit('INDEX_SET', {
            target: 'isLogin',
            data: false
          })
          this.$store.commit('ACCOUNT_SET', {
            target: 'isShowPop',
            data: true
          })
        }else{
          this.$message({
            message: res.message ,
            type: 'error'
          });
        }

        // 
        // sessionStorage.removeItem('userinfo');

      })
    },
    closeLogin(){
      this.$store.commit('INDEX_SET', {
        target: 'isLogin',
        data: false
      })
    }
  }
}
</script>
