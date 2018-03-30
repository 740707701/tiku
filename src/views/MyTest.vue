<template>
  <div class="my-test">
    <el-table
      :data="noList"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="examName"
        label="名称"
        width="224">
        <template slot-scope="scope">
          <span class="icon-list">{{ scope.row.examName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="creatorId"
        label="创建人"
        width="237">
      </el-table-column>
      <el-table-column
        prop="effTime"
        label="开始时间"
        width="252">
      </el-table-column>
      <el-table-column
        prop="expTime"
        label="结束时间"
        width="252">
      </el-table-column>
      <el-table-column
        prop="totalPoint"
        label="时长"
        width="160">
      </el-table-column>
      <el-table-column label="操作" prop="pointGet">
        <template slot-scope="scope">
          <p v-if="scope.row.pointGet" style="color:red">{{ scope.row.pointGet }}分</p>
          <p class="operation" v-else>正在批卷</p>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>
 <script>
import { mapState } from "vuex";

export default {
  props: {
    value: {
      type: Number
    }
  },
  data() {
    return {
      tableData: []
    };
  },
  computed: {
    ...mapState({
      noList: state => state.exam.noList
    })
  },
  watch: {
    value: function (val) {
      this.getList(val)
    }
  },
  created(){
      this.getList(this.value)
  },
  methods: {
    getList(val){
      this.$store.dispatch('EXAM_NO_LIST', {
        fieldId: val
      }).then( res => {
        if(res.object){
          let mapData = res.object.map((v, i) => {
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
            return v.expTime = `${year}-${month}-${day} ${hour}:${min}`
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
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2) {
        return "warning-row";
      }
      return "";
    },
    handleClick(row) {
      console.log(row);
    }
  }
};
</script>
<style lang="less">
.my-test {
  margin-top: 20px;
  margin-bottom: 200px;
  .el-table td {
    padding: 0;
  }
  .icon-list {
    display: inline-block;
    // width: 22px;
    // height: 32px;
    background: url(../assets/images/icon-list.png) left center no-repeat;
    padding: 20px 0 20px 30px;
    // vertical-align: middle;
  }
  .operation {
    color: #6fe0a7;
  }
  span {
    width: 170px;
    display: inline-block;
    margin-left: 10px;
  }
  .cell {
    color: #010101;
    font-size: 18px;
  }
  .el-table .warning-row {
    background: #f2f2f2;
  }
}
</style>
