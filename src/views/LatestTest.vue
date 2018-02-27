<template>
  <div class="latest-box">
    <div class="test-select">考试选择：
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="name"
        label="名称"
        width="224">
        <template slot-scope="scope">
          <i class="icon-list"></i>
          <span>{{ scope.row.name }}</span>
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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini"  @click.native.prevent="deleteRow(scope.$index)">主要按钮</el-button>
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
            
          },{
            name: '宏观经济学概述试卷测试题',
            founder: 'admin',
            startTime: '2018-02-02 15:47',
            endTime: '2018-02-08 15:47',
            date: '1.50分',
            
          },{
            name: '宏观经济学概述试卷测试题',
            founder: 'admin',
            startTime: '2018-02-02 15:47',
            endTime: '2018-02-08 15:47',
            date: '1.50分',
            
          },{
            name: '宏观经济学概述试卷测试题',
            founder: 'admin',
            startTime: '2018-02-02 15:47',
            endTime: '2018-02-08 15:47',
            date: '1.50分',
            
          },{
            name: '概述试卷测试题',
            founder: 'admin',
            startTime: '2018-02-02 15:47',
            endTime: '2018-02-08 15:47',
            date: '1.50分',
            
          }],
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
  methods: {
    deleteRow(index, rows) {
      console.log(index);
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

  .icon-list{
    display: inline-block;
    width: 22px;
    height: 32px;
    background: url(../assets/images/icon-list.png) no-repeat;
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
        width: 170px;
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
