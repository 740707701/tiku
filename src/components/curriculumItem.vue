<template>
  <ul class="questions-item clearfix">
    <li v-for="item in curriculum" :key="item.fieldId" :class="{'active': selectedData.includes(item.fieldId) }" @click="incrementCounter(item.fieldId)">
      <a href="javascript:;"  >{{ item.fieldName }}<i></i></a>
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
    height: 120px;
    border: 2px #ccc solid;
    margin-right: 80px;
    margin-bottom: 35px;
    display: table;
    position: relative;
    transition: all .4s;
    &:hover{
      color: #010101;
      transform: translateY(-2px);
      // box-shadow: 0 4px 4px #ccc;
     box-shadow: 0 2px 10px #b2b2b2;
  }
  &.active{
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
          a{
        font-size: 20px;
      }
  }
  a{
    display: table-cell;
    width: 256px;
    box-sizing: border-box;
    line-height: 40px;
    text-align: center;
    font-size: 18px;
    color: #b2b2b2;
    text-decoration: none;


    vertical-align: middle;

    }

  }
}
</style>
