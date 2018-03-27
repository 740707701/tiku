<template>
  <div class="topic-type">
    <el-checkbox-group v-model="checkList" @click="topic(list.id)">
      <el-checkbox v-for="list in topicType" :key="list.id" :checked="list.subjective" :label="list.id" >{{list.name}}</el-checkbox>
    </el-checkbox-group>
 
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
  methods: {
    topic(id) {
      this.$emit('topicEvent', id)
    }
  }
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
