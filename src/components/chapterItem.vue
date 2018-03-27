<template>
  <ul class="questions-item clearfix" v-if="curriculum.length">
    <li v-for="item in curriculum" :key="item.pointId"  :class="{'active': selectedData.includes(item.pointId) }" @click="incrementCounter(item.pointId)">
      <a href="javascript:;">{{ item.pointName }}<i></i></a>
    </li>
  </ul>
</template>

<script>

export default {
  name: 'questions-chapter',
  props: {
    curriculum:{
      type: Array,
    },
    selectedData:{
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
    height: 120px;
    border: 2px #ccc solid;
    margin-right: 80px;
    margin-bottom: 35px;
    display: table;
    transition: all .4s;
    position: relative;
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
  a{
    display: table-cell;
    width: 256px;
    box-sizing: border-box;
    line-height: 40px;
    text-align: center;
    font-size: 26px;
    color: #b2b2b2;
    text-decoration: none;


    vertical-align: middle;


  }
}
</style>
