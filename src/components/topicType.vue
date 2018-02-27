<template>
  <div class="topic-type">
    <el-checkbox-group v-model="checkList">
      <el-checkbox :label="list.title" v-for="list in topicType" :key="list.id"></el-checkbox>
    </el-checkbox-group>
   <!-- {{ checkList }} -->
  </div>

</template>

<script>

export default {
  name: 'questions-item',
  props: {
    topicType:{
      type: Array,
    }
  },
  data() {
    return {
      checkList: []
    }
  },
}
</script>
<style lang="less">
.topic-type{
  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background-color: #ef4343;
    border-color: #ef4343;
  }
  .el-checkbox__input.is-checked+.el-checkbox__label{
    color: #323233;
  }
  .el-checkbox__label{
    font-size: 16px;
    line-height: 33px;
  }
}

</style>
