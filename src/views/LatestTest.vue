<template>
  <div class="latest-box">
    <div class="test-select">考试选择：
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in curriculumList"
          :key="item.questionsId"
          :label="item.fieldName"
          :value="item.fieldId">
        </el-option>
      </el-select>
    </div>
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
        prop="totalpoint"
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
  data() {
    return {
      //  tableData: [{
      //       name: '概述试卷测试题',
      //       founder: 'admin',
      //       startTime: '2018-02-02 15:47',
      //       endTime: '2018-02-08 15:47',
      //       date: '1.50分',
            
      //     },{
      //       name: '宏观经济学概述试卷测试题',
      //       founder: 'admin',
      //       startTime: '2018-02-02 15:47',
      //       endTime: '2018-02-08 15:47',
      //       date: '1.50分',
            
      //     },{
      //       name: '宏观经济学概述试卷测试题',
      //       founder: 'admin',
      //       startTime: '2018-02-02 15:47',
      //       endTime: '2018-02-08 15:47',
      //       date: '1.50分',
            
      //     },{
      //       name: '宏观经济学概述试卷测试题',
      //       founder: 'admin',
      //       startTime: '2018-02-02 15:47',
      //       endTime: '2018-02-08 15:47',
      //       date: '1.50分',
            
      //     },{
      //       name: '概述试卷测试题',
      //       founder: 'admin',
      //       startTime: '2018-02-02 15:47',
      //       endTime: '2018-02-08 15:47',
      //       date: '1.50分',
            
      //     }],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      value: ""
    };
  },
  computed: {
    ...mapState({ 
      yesList: state => state.exam.yesList,
      curriculumList: state => state.curriculumList
    }),
  },
  created() {
    // 下拉框
    this.$store.dispatch('CURRICULUM_LIST_FETCH', {
      questionsId: 1
    }),
    // 最新考试
    this.$store.dispatch('EXAM_YES_LIST', {
      fieldId: 1
    }).then( res => {
      let mapData = res.object.map((v, i) => {
        return v.expTime = new Date(v.expTime).toISOString().replace('T', ' ').slice(0, -8)
      })
      this.tableData = res.object.map((v, i) => {
        return v.effTime = new Date(v.effTime).toISOString().replace('T', ' ').slice(0, -8)
      })
    })
  },
  methods: {
    deleteRow(index, rows) {
      this.$router.push(`/Examination/${encodeURIComponent(index.examId)}/${encodeURIComponent(index.examPaperId)}`) 
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
  .test-select{
    margin: 30px 0;
    font-size: 18px;
    color: #808080;
  }
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
