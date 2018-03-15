<template>
  <div class="set-topic-page">
    <header-nav></header-nav>
    <div class="big-banner">
      <div class="wrapper">
        <img src="../assets/images/title.png" class="title">
      </div>
    </div>
    <div class="set-topic-list">
      <div class="wrapper">
       
        <div class="list-main clearfix">
          <div class="main-left">
            <div class="line-box">
              <div class="box-line examinee">
                <p class="line-title clearfix">出题信息</p>
                <div class="student-info">
                  <p class="info-list"><span>课程选择:</span> <span>职业技能</span></p>
                  <p class="info-list"><span>章节选择:</span> <span>宏观经济学概述</span></p>
                  <p class="info-list"><span>题型选择:</span> <span > <a v-for="(data, index) in typeList" :key="index">{{ data.name }}</a></span></p>
                  <p class="info-list"><span>出题时间:</span> <span>2018-03-01</span></p>
                  <p class="info-list"><span>出题者:</span> <span>在线题库</span></p>
                </div>
              </div>
              <div class="box-line examinee">
                <p class="line-title clearfix">出题状态</p>
                <div class="student-info">
                  <p class="info-list"><span>单选题</span></p>
                  <p class="info-list"><span>多选题</span></p>
                  <p class="info-list"><span>判断题</span></p>
                  <p class="info-list"><span>案例题</span></p>
                </div>
              </div>

            </div>
          </div>
          <div class="box-line main-right">

            <el-collapse v-model="activeNames" @change="handleChange" accordion>
              <el-collapse-item title="单选题" name="1">
                          <div class="raido-list" v-for="(item, index) in dataList" :key="index">
                          <div class="raido-title">{{ index+1 }}、{{ item.name }}</div>
                          <p class="chuti" v-for="(num, i) in item.sle" :key="i"><input type="radio" :id="'radio'+(index+1)+'-'+(i+1)"  :value="letter[i]" v-model="radioNames[index]">
                          <label :for="'radio'+(index+1)+'-'+(i+1)">{{ letter[i]}}、{{ num }}</label></p>
                          <p>输入正确答案: <input type="text"> <span class="next-ti">下一题</span></p>
                          <div class="raido-title">请选择知识点：</div>
                          <el-cascader
                            :options="options"
                            :show-all-levels="false"
                            @change="elEvent"
                          ></el-cascader>
                          <el-cascader
                            :options="options"
                            :show-all-levels="false"
                            @change="elEvent"
                          ></el-cascader>
                          <el-cascader
                            :options="options"
                            :show-all-levels="false"
                            @change="elEvent"
                          ></el-cascader>
                          <el-cascader
                            :options="options"
                            :show-all-levels="false"
                            @change="elEvent"
                          ></el-cascader>
                        </div>
              </el-collapse-item>
              <el-collapse-item title="多选题" name="2">
                <div class="raido-list" v-for="(item, index) in dataList2" :key="index">
                          <div class="raido-title">{{ index+1 }}、{{ item.name }}</div>
                          <p class="chuti" v-for="(num, i) in item.sle" :key="i"><input type="radio" :id="'radio'+(index+1)+'-'+(i+1)"  :value="letter[i]" v-model="radioNames[index]">
                          <label :for="'radio'+(index+1)+'-'+(i+1)">{{ letter[i]}}、{{ num }}</label></p>
                          <p>输入正确答案: <input type="text"> <span class="next-ti">下一题</span></p>
                          <div class="raido-title">请选择知识点：</div>
                          <el-cascader
                            :options="options"
                            :show-all-levels="false"
                            @change="elEvent"
                          ></el-cascader>
                          
                        </div>
              </el-collapse-item>
              <el-collapse-item title="判断题" name="3">
                <div>简化流程：设计简洁直观的操作流程；</div>
                <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
              </el-collapse-item>
              <el-collapse-item title="论述题" name="4">
                <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
              </el-collapse-item>
            </el-collapse>


            <!-- <p class="line-title">出题名称: <span>单选题 <i></i> </span></p>
            <div class="raido-list" v-for="(item, index) in dataList" :key="index">
              <div class="raido-title">{{ index+1 }}、{{ item.name }}</div>
              <p class="chuti" v-for="(num, i) in item.sle" :key="i"><input type="radio" :id="'radio'+(index+1)+'-'+(i+1)"  :value="letter[i]" v-model="radioNames[index]">
              <label :for="'radio'+(index+1)+'-'+(i+1)">{{ letter[i]}}、{{ num }}</label></p>
              <p>输入正确答案: <input type="text"> <span class="next-ti">下一题</span></p>
              <div class="raido-title">请选择知识点：</div>
              <el-cascader
                :options="options"
                :show-all-levels="false"
                @change="elEvent"
              ></el-cascader>

              <p v-for="(num, i) in item.sle" :key="i"><input type="radio" :id="'radio'+(index+1)+'-'+(i+1)"  :value="letter[i]" v-model="radioNames[index]">
              <label :for="'radio'+(index+1)+'-'+(i+1)">{{ letter[i]}}、{{ num }}</label></p>
            </div> -->
            {{ radioNames }}
            {{ dataList2 }}
            <!-- <p class="line-title"><span>多选题 <i></i> </span></p>
            <div class="raido-list" v-for="(item, index) in dataList2" :key="index">
              <div class="raido-title">{{ index+1 }}、{{ item.name }}</div>
              <p v-for="(num, i) in item.sle" :key="i"><input type="checkbox" :id="'check'+(index+1)+'-'+(i+1)"  :value="letter[i]" v-model="item.aaa">
              <label :for="'check'+(index+1)+'-'+(i+1)">{{ letter[i]}}、{{ num }}</label></p>
              <p>输入正确答案: <input type="text"> <span class="next-ti">下一题</span></p>
              <div class="raido-title">请选择知识点：</div>
              <el-cascader
                :options="options"
                :show-all-levels="false"
                @change="elEvent"
              ></el-cascader>
              <p v-for="(num, i) in item.sle" :key="i"><input type="radio" :id="'radio'+(index+1)+'-'+(i+1)"  :value="letter[i]" v-model="radioNames[index]">
              <label :for="'radio'+(index+1)+'-'+(i+1)">{{ letter[i]}}、{{ num }}</label></p>
            </div> -->
            <!-- {{ dataList2 }} -->
            <div class="footer-button">
              <span>提交</span> <span>取消</span>
            </div>
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
  name: "set-topic-page",
  data() {
    return {
      activeNames: ['1'],
      progressing: 60,
      radioNames: [],
      checkboxNames:[],
      letter: ['A','B','C','D','E','F','G','H'],
      dataList:[{
        name: '机动车驾驶证遗失的，机动车驾驶人应当向哪里的车辆管理所申请补发？',
        sle:['正确', '错误', '对的', '不对']
      }],
      dataList2: [],
      options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '组件交互文档',
          // children: [{
          //   value: 'axure',
          //   label: 'Axure Components'
          // }, {
          //   value: 'sketch',
          //   label: 'Sketch Templates'
          // }, {
          //   value: 'jiaohu',
          //   label: '组件交互文档'
          // }]
        }]
    };
  },
    computed: {
    ...mapState({
      typeList: state => state.question.typeList
    }),
  },
  created() {
    this.$store.dispatch('QUESTION_TYPE_SET'),
    this.getPath()
  },
  methods: {
    handleChange(val){
      console.log(val);
    },
    elEvent(v) {
      console.log(v)
    },
    getPath() {
      this.path = this.$route.path
      let that = this;

      // 异步数据
      setTimeout(function(){
        var a = [{
          name: '机动车驾驶证遗失的，机动车驾驶人应当向哪里的车辆管理所申请补发？',
          sle:['正确', '错误', '对的', '不对'],
        }]
        
        a.map((v, i, arr) => {
          return v.aaa = []
        })
        return that.dataList2 = a
      },2000)
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
@import "../assets/css/style.less";
.set-topic-page {
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
  }
  .set-topic-list{
    .list-title{
      font-size: 18px;
      color: #333;
      padding-left: 14px;
      border-left: 6px solid #6404ff;
      margin-top: 20px;
      margin-bottom: 26px; 
      span{
        color: #b2b2b2;
        float: right;
        font-size: 16px;
      }
    }
    .list-main{
      border: 1px solid #fafafa;
      box-shadow:0px 6px 6px #E9E7EA;
      margin-bottom: 30px;
      overflow: hidden; 
      background: linear-gradient(to top, #60a8fe, #357df2);
      position: relative;
      &::before{
        width: 358px;
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        background: url('../assets/images/kd-bg.png') left bottom no-repeat;
      }
      .main-left {
        width: 358px;
        float: left;
        color: #fff;
        position: relative;
        .line-box{
          position: relative;
        }
        .examinee{
          width: 358px;
          font-size: 15px;
          .student-info{
            padding: 0 38px;
            margin-bottom: 86px;
            font-size: 16px;
            color: #fff;
            .info-list{
              margin-top: 20px;
              span{
                display: inline-block;
              }
              span:first-child{
                width: 80px;
                vertical-align: top;
              }
              span:last-child{
                width: 180px;
                line-height: 1.3;
                margin-left: 6px;
                a{
                  margin-right: 10px;
                  font-size: 16px;
                  color: #fff;
                }
              }
            }
          }
        }
        .line-title{
          margin-top: 28px;
          padding-left: 16px;
          font-size: 20px;
          border-left: 5px solid #ea8661;
        }
      }
      .main-right{
        width: 922px;
        min-height: 630px;
        background: #fff;
        float: left;
        .el-collapse{
          padding: 0 24px; 
        }
        .line-title{
          line-height: 60px;
          // background: url(../assets/images/icon-list.png) 10px center no-repeat;
          padding-left: 50px; 
          font-size: 15px;
          color: #999999;
          border-bottom: 1px solid #ccc;
          span{
            font-size: 18px;
            color: #000;
            position: relative;
            padding-left: 10px;
            cursor: pointer;
            i{
              display: block;
              width: 10px;
              height: 10px;
              position: absolute;
              top: 4px;
              right: -20px;
              border-width: 1px;
              border-style: solid;
              border: 1px solid #000;
              border-top: none;
              border-right: none;
              transform: rotate(-45deg);
              &.active{
                transform: rotate(135deg);
                top: 10px;
                
              }
            }
          }
        }
        .border-bottom{
          border-bottom: 5px solid #f7f7f7;
        }
        .raido-list{
          padding-left: 30px; 
          
          .raido-title{
            padding: 20px 0 20px;
          }
          p{
            margin-bottom: 14px;
            input[type=radio]{
              vertical-align:middle;
              cursor: pointer;
            }
            label{
              padding-left: 16px;
              vertical-align:middle;display:inline-block;
              cursor: pointer;
            }
            input[type=text]{
              width: 50px;
              line-height: 28px;
              border: 1px solid #cfcfcf;
              font-size: 20px;
            }
            .next-ti{
              display: block;
              width: 80px;height: 30px;
              text-align: center;
              line-height: 30px;
              color: #fff;
              font-size: 18px;
              border-radius: 4px;
              background: #5a9cff;
              float: right;
              margin-right: 64px;
              cursor: pointer;
            }
          }
        }
        .footer-button{
            padding: 50px 0;
            float: right;
            margin-right: 64px;
            span{
              display: block;
              width: 80px;
              height: 30px;
              float: left;
              margin-left: 40px;
              text-align: center;
              line-height: 30px;
              color: #fff;
              font-size: 18px;
              border-radius: 4px;
              background: #5a9cff;
              cursor: pointer;
            }
          }
      }

      // .box-line{
      //   box-sizing: border-box;
        
      //   float: left;
      // }
      

    }
  }

}
</style>
