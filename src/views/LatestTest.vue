<template>
  <div class="latest-box">
    <el-table
      :data="yesList"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="name"
        label="名称"
        width="224">
        <template slot-scope="scope">
          <span class="icon-list">{{ scope.row.examName }}</span>
          <!-- creatorId  是创建人  creator 是创建人id totalpoint 是总时长 examName 是考试名称
examId  是考试id   efftime  是开始时间   exptime  是结束时间 exametype是考试类型 -->
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

      <!-- <el-table-column
        prop="creatorId"
        label="创建人"
        width="237">
      </el-table-column>
      <el-table-column
        prop="efftime"
        label="开始时间"
        width="252">
      </el-table-column>
      <el-table-column
        prop="exptime"
        label="结束时间"
        width="252">
      </el-table-column> -->

      <el-table-column label="操作">
        <template slot-scope="scope" prop=examId>
          <el-button type="primary" size="mini"  @click.native.prevent="deleteRow(scope.row)">参加考试</el-button>
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
        
    
    };
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
      // 最新考试
      this.$store.dispatch('EXAM_YES_LIST', {
        fieldId: val
      }).then( res => {
        if(res.object){
          let mapData = res.object.map((v, i) => {          
            return v.expTime = new Date(v.expTime).toISOString().replace('T', ' ').slice(0, -8)
          })
          this.tableData = res.object.map((v, i) => {
            return v.effTime = new Date(v.effTime).toISOString().replace('T', ' ').slice(0, -8)
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
  margin-bottom: 200px;
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
      font-size: 18px;
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
