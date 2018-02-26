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

        <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="最新考试" name="first">
            <div>
      <select name="" id="">
              <option value="a">sdfdsfds</option>
            </select>
            </div>
      
          123123213213213
          </el-tab-pane>
          <el-tab-pane label="我的考试" name="second">222222222222222</el-tab-pane>
        </el-tabs> -->



        <ul class="exam-tabs">
          <li><router-link to="/foo">最新考试</router-link></li>
          <li><router-link to="/bar">我的考试</router-link></li>
        </ul>

        <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
      </el-table-column>
    </el-table>

        <router-view></router-view>
      </div>
    </div>


    <!-- <div class="dialog" v-show="isShow">
      <div class="dialog-bg" @click="isShow = !isShow"></div>
      <div class="dialog-body">
        <div class="dialog-content">
          <h3>选择课程</h3>
          <a href="" class="active">职业题库<i></i></a>
          <a href="" class="">经济金融基础题库<i></i></a>
          <a href="">金融业务题库<i></i></a>
          <a href="">工作方法<i></i></a>
          <a href="">工作方法<i></i></a>
        </div>
      </div>
      <div class="dialog-sign">
        登录 / 注册
      </div>
    </div> -->

  </div>
</template>

<script>

import headerNav from '../components/Header.vue'

import { mapState } from "vuex";

export default {
  name: "exam",
  data() {
    return {
      activeName: 'second',
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
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
    background: url("../assets/images/list-bg.jpg") center top no-repeat;
    .title{
      margin-top: 20px;
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
  .dialog{
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
      padding: 0 76px 76px;
      transform: translate(-50%, -50%);
      background: #fff;
    }
    .dialog-sign{
      position: absolute;
      top: 50%;
      left: 50%;
      width: 600px;
      transform: translate(-50%, -50%);
      background: #fff;
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
