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
        style="width: 100%">
        <el-table-column
          prop="date"
          label="名称"
          width="224">
          <i class="el-icon-time"></i>
        </el-table-column>
        <el-table-column
          prop="name"
          label="创建人"
          width="237">
        </el-table-column>
        <el-table-column
          prop="date"
          label="开始时间"
          width="252">
        </el-table-column>
        <el-table-column
          prop="date"
          label="结束时间"
          width="252">
        </el-table-column>
        <el-table-column
          prop="address"
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
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: ""
    };
  },
  methods: {
    deleteRow(index, rows) {
      console.log(index);
      
    }
  }
};
</script>
<style lang="less">
.latest-box{
  .test-select{
    margin: 30px 0;
    font-size: 18px;
    color: #808080;
    
  }
}

</style>
