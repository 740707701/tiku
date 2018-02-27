<template>
  <ul class="questions-item clearfix">
    <li v-for="item in curriculum" :key="item.id"><a href="javascript:;">{{ item.title }}<i></i></a></li>
  </ul>
</template>

<script>

export default {
  name: 'questions-item',
  props: {
    curriculum:{
      type: Array,
    }
  },
  data() {
    return {

    }
  },
}
</script>
<style lang="less">
.questions-item{
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
</style>
