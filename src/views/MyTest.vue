<template>
  <div class="my-test">
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="name"
        label="名称"
        width="224">
        <template slot-scope="scope">
          <span class="icon-list">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="founder"
        label="创建人"
        width="237">
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="开始时间"
        width="252">
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="结束时间"
        width="252">
      </el-table-column>
      <el-table-column
        prop="date"
        label="时长"
        width="160">
      </el-table-column>
      <el-table-column label="操作" prop="number">
        <template slot-scope="scope">
          <p v-if="scope.row.number">{{ scope.row.number }}</p>
          <p class="operation" v-else>正在审核</p>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>
 <script>
    export default {
      data() {
        return {
          tableData: [{
            name: '概述试卷测试题',
            founder: 'admin',
            startTime: '2018-02-02 15:47',
            endTime: '2018-02-08 15:47',
            date: '1.50分',
            number: 80
          },{
            name: '宏观经济学概述试卷测试题',
            founder: 'admin',
            startTime: '2018-02-02 15:47',
            endTime: '2018-02-08 15:47',
            date: '1.50分',
            number: 60
          },{
            name: '宏观经济学概述试卷测试题',
            founder: 'admin',
            startTime: '2018-02-02 15:47',
            endTime: '2018-02-08 15:47',
            date: '1.50分',
            number: ''
          },{
            name: '宏观经济学概述试卷测试题',
            founder: 'admin',
            startTime: '2018-02-02 15:47',
            endTime: '2018-02-08 15:47',
            date: '1.50分',
            number: 40
          },{
            name: '概述试卷测试题',
            founder: 'admin',
            startTime: '2018-02-02 15:47',
            endTime: '2018-02-08 15:47',
            date: '1.50分',
            number: 99
          }]
        }
      },
      methods: {
        tableRowClassName({row, rowIndex}) {
          if (rowIndex % 2) {
            return 'warning-row';
          }
          return '';
        },
        handleClick(row) {
          console.log(row);
        }
      },
    }
  </script>
  <style lang="less">
  .my-test{
    margin-top: 20px;
    margin-bottom: 200px;
     .el-table td {
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
    span{
      width: 170px;
      display: inline-block;
      margin-left: 10px;
    }
    .cell{
      color: #010101;
      font-size: 18px;
    }
    .el-table .warning-row {
      background: #f2f2f2;
    }
  }
  </style>
  