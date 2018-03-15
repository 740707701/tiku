<template>
  <div class="occupation-page">
    <div class="wrapper">
      <p class="title">课程选择： {{ currData  }}<span>更多</span></p>
      <itemList :curriculum="curriculum" :selectedData="currData" @selectEvent="radioItem"></itemList>
      <p class="title">章节选择： {{ chaptData }}<span>更多</span></p>
      <itemList :curriculum="chapter" :selectedData="chaptData" @selectEvent="checkboxItem"></itemList>
      <p class="title">题型： <span>更多</span></p>
      <topic :topicType="topicType"></topic>
      <div class="occupation-button">
        <span  @click="random">随机练习</span><span  @click="intelligence">智能答题</span>
      </div>
    </div>
  </div>
</template>
<script>

import itemList from '../../components/curriculumItemItem.vue'
import topic from '../../components/topicType.vue'

export default {
  name: 'occupation',
  data() {
    return {
      curriculum: [
        {'title': '简历','id': 1},
        {'title': '面试','id': 2},
        {'title': '职业规划','id': 3},
        {'title': '职业心态','id': 4},
        {'title': '工作方法','id': 5},
        {'title': '沟通','id': 6},
        {'title': '职业技能','id': 7},
        {'title': '演讲与口才','id': 8},
      ],
      chapter: [
        { 'title': '经济学', 'id': 1},
        {'title': '面试','id': 2},
        {'title': '职业规划','id': 3},
        {'title': '职业心态','id': 4},
        {'title': '工作方法','id': 5},
        {'title': '沟通','id': 6},
        {'title': '职业技能','id': 7},
      ],
      topicType: [
        { 'title': '单选题', 'id': 1},
        { 'title': '多选题', 'id': 2},
        { 'title': '判断题', 'id': 3},
        { 'title': '案例题', 'id': 4},
        { 'title': '解答题', 'id': 5},
      ],
      currData: [],
      chaptData: []
    }
  },
  methods: {
    random(){
      this.$router.push(`/examiner`) 
    },
    intelligence(){
      this.$router.push(`/examiner`) 

    },
    radioItem(val) {
      if(this.currData.includes(val)){
        this.currData.splice(this.currData.indexOf(val), 1)
      }else{
        this.currData = [val]
      }

      // this.currData = [val]
    },
    checkboxItem (val) {
      if(this.chaptData.includes(val)){

        this.chaptData.splice(this.chaptData.indexOf(val), 1)
      }else{
        // this.chaptData.push(val)
        this.chaptData = [val]
      }
      
      // selectedData.includes(item.id) 
      // this.chaptData = [...new Set(this.chaptData)]   
    },
  },
  components: {
    itemList,
    topic,

  }
}
</script>
<style lang="less">
.occupation-page{
  .title{
    padding: 27px 0;
    font-size: 20px;
    color: #808080;
    span{
      color: #333333;
      float: right;
      margin-right: 46px;
      cursor: pointer;
    }
  }
  .occupation-button{
    margin: 100px auto;
    text-align: center;
    span{
      display: inline-block;
      width: 180px;
      height: 80px;
      text-align: center;
      line-height: 80px;
      color: #fff;
      font-size: 28px;
      border-radius: 6px;
      background: #6200ff;
      cursor: pointer;
      margin: 0 35px;
    }
  }
}
</style>

