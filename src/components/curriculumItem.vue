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
  // margin-right: -80px;
  li{
    float: left;
    // height: 80px;
    border: 2px #ccc solid;
    margin-right: 10px;
    margin-bottom: 10px;
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
      width: 20px;
      height: 15px;
      background: url('../assets/images/icon-check.png') -16px 0 no-repeat;
      background-size: cover;
      position: absolute;
      right: -6px;
      bottom: -1px;
      display: block;
    }
      a{
        font-size: 14px;
      }
  }
  a{
    display: table-cell;
    min-width: 150px;
    box-sizing: border-box;
    padding: 10px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    color: #b2b2b2;
    text-decoration: none;


    vertical-align: middle;

    }

  }
}
</style>
