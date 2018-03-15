<template>
  <ul class="questions-item clearfix">
    <li v-for="item in curriculum" :key="item.fieldId">
      <a href="javascript:;"  :class="{'active': selectedData.includes(item.fieldId) }" @click="incrementCounter(item.fieldId)">{{ item.fieldName }}<i></i></a>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'questions-curriculum',
  props: {
    curriculum: {
      type: Array,
    },
    selectedData: {
      type: Array,
    }
  },
  data() {
    return {

    }
  },
  methods: {
    incrementCounter(id) {
      this.$emit('selectEvent', id)
    }
  }
}
</script>
<style lang="less">
.questions-item{
  // overflow: hidden;
  // height: 300px;
  transition: height .2s;
  &::after{
    content: "";

  }
  margin-right: -80px;
  li{
    float: left;
  }
  a{
    display: inline-block;
    width: 256px;
    height: 120px;
    line-height: 120px;
    text-align: center;
    border: 2px #ccc solid;
    margin-right: 80px;
    margin-bottom: 35px;
    font-size: 26px;
    color: #b2b2b2;
    text-decoration: none;
    position: relative;
    transition: all .4s;
    &:hover{
      color: #010101; 
      transform: translateY(-10px);
      box-shadow: 10px 10px 10px #ccc;
      // i{
      //   width: 30px;
      //   height: 30px;
      //   background: url('../assets/images/icon-check.png') -32px 0 no-repeat;
      //   position: absolute;
      //   right: -1px;
      //   bottom: -1px;
      //   display: block;
      // }
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
  }
}
</style>
