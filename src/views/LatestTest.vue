<template>
  <div class="latest-box">
    <el-table
      :data="yesList"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="name"
        label="名称"
        width="254">
        <template slot-scope="scope">
          <span class="icon-list">{{ scope.row.examName }}</span>
          <!-- creatorId  是创建人  creator 是创建人id totalpoint 是总时长 examName 是考试名称
examId  是考试id   efftime  是开始时间   exptime  是结束时间 exametype是考试类型 -->
        </template>
      </el-table-column>

      <el-table-column
        prop="creatorId"
        label="创建人"
        width="200">
      </el-table-column>
      <el-table-column
        prop="effTime"
        label="开始时间"
        width="225">
      </el-table-column>
      <el-table-column
        prop="expTime"
        label="结束时间"
        width="225">
      </el-table-column>
      <el-table-column
        prop="totalPoint"
        label="总分"
        width="120">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope" prop=examId>
          <el-button v-if="!scope.row.begin" disabled type="primary" size="mini">未开始</el-button>
          <el-button v-if="scope.row.end" disabled type="primary" size="mini">已结束</el-button>
          <el-button v-if="scope.row.begin&&!scope.row.end"  type="primary" size="mini"  @click.native.prevent="deleteRow(scope.row)">参加考试</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>
 <script>
 import { mapState } from "vuex";
export default {
  props: {
    value: ""
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      yesList: state => state.exam.yesList,

    }),
  },
  watch: {
    value: function (val) {
      this.getList(val)
    }
  },
  created() {
    this.getList(this.value)

  },
  methods: {
    deleteRow(index, rows) {
      this.$router.push(`/examination/${encodeURIComponent(index.examId)}/${encodeURIComponent(index.examPaperId)}`)
    },
    getList(val){
      let timestamp = new Date().getTime()
      // 最新考试
      let data = {}
      if(val){
        data.fieldId = val
      }
      this.$store.dispatch('EXAM_YES_LIST', data).then( res => {
        if(res.object){
          //effTime: 开始时间 expTime:结束时间
          let mapData = res.object.map((v, i) => {
            if(timestamp - v.effTime > 0 || timestamp - v.effTime == 0){
              v.begin = true
            }else {
              v.begin = false
            }
            if(timestamp - v.expTime > 0 || timestamp - v.expTime == 0){
              v.end = true
            }
            // console.log(res.object)
            let expTime = new Date(v.expTime),
              year = expTime.getFullYear(),
              month = expTime.getMonth() + 1,
              day = expTime.getDate(),
              hour = expTime.getHours(),
              min = expTime.getMinutes();
            month = month < 10 ? '0'+ month : month;
            day = day < 10 ? '0'+ day : day;
            hour = hour < 10 ? '0'+ hour : hour;
            min = min < 10 ? '0'+ min : min;
            v.expTime = `${year}-${month}-${day} ${hour}:${min}`
            
          })
          this.tableData = res.object.map((v, i) => {
            let effTime = new Date(v.effTime),
              year = effTime.getFullYear(),
              month = effTime.getMonth() + 1,
              day = effTime.getDate(),
              hour = effTime.getHours(),
              min = effTime.getMinutes();
            month = month < 10 ? '0'+ month : month;
            day = day < 10 ? '0'+ day : day;
            hour = hour < 10 ? '0'+ hour : hour;
            min = min < 10 ? '0'+ min : min;
            return v.effTime = `${year}-${month}-${day} ${hour}:${min}`
          })
        }
      })
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex % 2) {
        return 'warning-row';
      }
      return '';
    },
    handleClick(row) {
      console.log(row);
    }
  }
};
</script>
<style lang="less">
.latest-box{
  margin-bottom: 30px;
  .el-table td{
    padding: 0;
  }
  .icon-list{
    display: inline-block;
    // width: 22px;
    // height: 32px;
    background: url(../assets/images/icon-list.png) left center no-repeat;
    padding: 20px 0 20px 30px;
    // vertical-align: middle;
  }
  .operation{
    color: #6fe0a7;
  }
  table{
    .cell{
      color: #010101;
      font-size: 14px;
      > span{
        // width: 170px;
        display: inline-block;
        margin-left: 10px;
      }
    }
    tr.warning-row {
      background: #f2f2f2;
    }
  }
}

</style>
