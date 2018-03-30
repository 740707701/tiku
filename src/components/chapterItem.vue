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