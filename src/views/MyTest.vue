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
          <p v-if="scope.row.pointGet" class="td-score">{{ scope.row.pointGet }}分</p>
          <p class="operation" v-else>正在批卷</p>
          <div class="view-btn" @click="getExamDetail(scope.row.examId)">查看答卷</div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 试卷列表 -->
    <div class="exam-bg" v-if="showExamDetail" @click.self="showExamDetail=false">
      <div class="exam-content">
        <h4>学员试卷</h4>
        <div class="exam-info">
          <div class="exam-name">{{exampapername}}</div>
          <div class="exam-score">
            <div class="total-score">试卷总分： <div class="total-score">{{examAllPoint}}</div> </div>
            <div  class="total-score">考生得分： <div class="total-score student-score">{{studentPointGet}}</div></div>
          </div>
          <div class="exam-tabs">
            <el-tabs v-model="activeName" @tab-click="chooseExam">
              <el-tab-pane :label="`[单选题${danxuan.length}题]`"  name="first" v-if="danxuan.length">
                <div class="exam-list">
                  <div class="exam-box" v-for="(exam, index) in danxuan" :key="exam.questionId">
                      <div class="title">{{index+1}}: [单选题] ({{exam.questionPoint}}分)</div>
                      <div class="question-content">
                        <p class="question">{{exam.questionContent.title}}</p>
                        <div class="choose-list">
                          <div class="choose-tab" v-for="choice in exam.questionContent.choiceList" :key="choice">
                            <input type="radio" disabled="disabled" class="radio">{{choice}}
                          </div>
                        </div>
                        <p class="right">参考答案： {{exam.answer}}</p>
                        <p class="answer">考生答案：{{exam.studentAnswer}}</p>
                        <div class="score">考生得分：<div class="score-value">{{exam.studentPoint}}</div></div>
                        <p class="teacher">教师批注：</p>
                        <div class="notes">{{exam.teacherComment}}</div>
                        <div class="origin-box">
                          <div class="origin-btn origin">来源</div>
                          <div class="origin-text">{{exam.referenceName}}</div>
                        </div>
                        <div class="origin-box">
                          <div class="origin-btn analysis">解析</div>
                          <div class="origin-text">{{exam.analysis}}</div>
                        </div>
                        <div class="origin-box">
                          <div class="origin-btn exam-point">考点</div>
                          <div class="origin-text">{{exam.examingPoint}}</div>
                        </div>

                      </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane :label="`多选题[${duoxuan.length}题]`" name="second" v-if="duoxuan.length">
                <div class="exam-list">
                  <div class="exam-box" v-for="(exam, index) in duoxuan" :key="exam.questionId">
                      <div class="title">{{danxuan.length+index+1}}: [多选题] ({{exam.questionPoint}}分)</div>
                      <div class="question-content">
                        <p class="question">{{exam.questionContent.title}}</p>
                        <div class="choose-list">
                          <div class="choose-tab" v-for="choice in exam.questionContent.choiceList" :key="choice">
                            <input type="radio" disabled="disabled" class="radio">{{choice}}
                          </div>
                        </div>
                        <p class="right">参考答案： {{exam.answer}}</p>
                        <p class="answer">考生答案：{{exam.studentAnswer}}</p>
                        <div class="score">考生得分：<div class="score-value">{{exam.studentPoint}}</div></div>
                        <p class="teacher">教师批注：</p>
                        <div class="notes">{{exam.teacherComment}}</div>
                        <div class="origin-box">
                          <div class="origin-btn origin">来源</div>
                          <div class="origin-text">{{exam.referenceName}}</div>
                        </div>
                        <div class="origin-box">
                          <div class="origin-btn analysis">解析</div>
                          <div class="origin-text">{{exam.analysis}}</div>
                        </div>
                        <div class="origin-box">
                          <div class="origin-btn exam-point">考点</div>
                          <div class="origin-text">{{exam.examingPoint}}</div>
                        </div>

                      </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane :label="`判断题[${panduan.length}题]`" name="third" v-if="panduan.length">
                <div class="exam-list">
                  <div class="exam-box" v-for="(exam, index) in panduan" :key="exam.questionId">
                      <div class="title">{{danxuan.length+duoxuan.length+index+1}}: [判断题] ({{exam.questionPoint}}分)</div>
                      <div class="question-content">
                        <p class="question">{{exam.questionContent.title}}</p>
                        <div class="choose-list">
                          <div class="choose-tab" v-for="choice in exam.questionContent.choiceList" :key="choice">
                            <input type="radio" disabled="disabled" class="radio">{{choice}}
                          </div>
                        </div>
                        <p v-if="exam.answer=='T'">参考答案： 对</p>
                        <p v-if="exam.answer=='F'">参考答案： 错</p>
                        <p class="answer" v-if="exam.studentAnswer=='T'">考生答案：对</p>
                        <p class="answer" v-if="exam.studentAnswer=='F'">考生答案：错</p>
                        <div class="score">考生得分：<div class="score-value">{{exam.studentPoint}}</div></div>
                        <p class="teacher">教师批注：</p>
                        <div class="notes">{{exam.teacherComment}}</div>
                        <div class="origin-box">
                          <div class="origin-btn origin">来源</div>
                          <div class="origin-text">{{exam.referenceName}}</div>
                        </div>
                        <div class="origin-box">
                          <div class="origin-btn analysis">解析</div>
                          <div class="origin-text">{{exam.analysis}}</div>
                        </div>
                        <div class="origin-box">
                          <div class="origin-btn exam-point">考点</div>
                          <div class="origin-text">{{exam.examingPoint}}</div>
                        </div>

                      </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane :label="`填空题[${tiankong.length}题]`" name="fouth" v-if="tiankong.length">
                <div class="exam-list">
                  <div class="exam-box" v-for="(exam, index) in tiankong" :key="exam.questionId">
                      <div class="title">{{danxuan.length+duoxuan.length+panduan.length+index+1}}: [填空题] ({{exam.questionPoint}}分)</div>
                      <div class="question-content">
                        <p class="question">{{exam.questionContent.title}}</p>
                        <div class="choose-list">
                          <div class="choose-tab" v-for="choice in exam.questionContent.choiceList" :key="choice">
                            <input type="radio" disabled="disabled" class="radio">{{choice}}
                          </div>
                        </div>
                        <p v-if="exam.answer=='T'">参考答案： 对</p>
                        <p v-if="exam.answer=='F'">参考答案： 错</p>
                        <p class="answer">考生答案：{{exam.studentAnswer}}</p>
                        <div class="score">考生得分：<div class="score-value">{{exam.studentPoint}}</div></div>
                        <p class="teacher">教师批注：</p>
                        <div class="notes">{{exam.teacherComment}}</div>
                        <div class="origin-box">
                          <div class="origin-btn origin">来源</div>
                          <div class="origin-text">{{exam.referenceName}}</div>
                        </div>
                        <div class="origin-box">
                          <div class="origin-btn analysis">解析</div>
                          <div class="origin-text">{{exam.analysis}}</div>
                        </div>
                        <div class="origin-box">
                          <div class="origin-btn exam-point">考点</div>
                          <div class="origin-text">{{exam.examingPoint}}</div>
                        </div>

                      </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane :label="`简答题[${jianda.length}题]`" name="fifth" v-if="jianda.length">
                <div class="exam-list">
                  <div class="exam-box" v-for="(exam, index) in jianda" :key="exam.questionId">
                      <div class="title">{{danxuan.length+duoxuan.length+panduan.length+tiankong.length+index+1}}: [简答题] ({{exam.questionPoint}}分)</div>
                      <div class="question-content">
                        <p class="question">{{exam.questionContent.title}}</p>
                        <div class="choose-list">
                          <div class="choose-tab" v-for="choice in exam.questionContent.choiceList" :key="choice">
                            <input type="radio" disabled="disabled" class="radio">{{choice}}
                          </div>
                        </div>
                        <p v-if="exam.answer=='T'">参考答案： 对</p>
                        <p v-if="exam.answer=='F'">参考答案： 错</p>
                        <p class="answer">考生答案：{{exam.studentAnswer}}</p>
                        <div class="score">考生得分：<div class="score-value">{{exam.studentPoint}}</div></div>
                        <p class="teacher">教师批注：</p>
                        <div class="notes">{{exam.teacherComment}}</div>
                        <div class="origin-box">
                          <div class="origin-btn origin">来源</div>
                          <div class="origin-text">{{exam.referenceName}}</div>
                        </div>
                        <div class="origin-box">
                          <div class="origin-btn analysis">解析</div>
                          <div class="origin-text">{{exam.analysis}}</div>
                        </div>
                        <div class="origin-box">
                          <div class="origin-btn exam-point">考点</div>
                          <div class="origin-text">{{exam.examingPoint}}</div>
                        </div>

                      </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane :label="`论述题[${lunshu.length}题]`" name="sixth" v-if="lunshu.length">
                <div class="exam-list">
                  <div class="exam-box" v-for="(exam, index) in lunshu" :key="exam.questionId">
                      <div class="title">{{danxuan.length+duoxuan.length+panduan.length+tiankong.length+jianda.length+index+1}}: [论述题] ({{exam.questionPoint}}分)</div>
                      <div class="question-content">
                        <p class="question">{{exam.questionContent.title}}</p>
                        <div class="choose-list">
                          <div class="choose-tab" v-for="choice in exam.questionContent.choiceList" :key="choice">
                            <input type="radio" disabled="disabled" class="radio">{{choice}}
                          </div>
                        </div>
                        <p v-if="exam.answer=='T'">参考答案： 对</p>
                        <p v-if="exam.answer=='F'">参考答案： 错</p>
                        <p class="answer">考生答案：{{exam.studentAnswer}}</p>
                        <div class="score">考生得分：<div class="score-value">{{exam.studentPoint}}</div></div>
                        <p class="teacher">教师批注：</p>
                        <div class="notes">{{exam.teacherComment}}</div>
                        <div class="origin-box">
                          <div class="origin-btn origin">来源</div>
                          <div class="origin-text">{{exam.referenceName}}</div>
                        </div>
                        <div class="origin-box">
                          <div class="origin-btn analysis">解析</div>
                          <div class="origin-text">{{exam.analysis}}</div>
                        </div>
                        <div class="origin-box">
                          <div class="origin-btn exam-point">考点</div>
                          <div class="origin-text">{{exam.examingPoint}}</div>
                        </div>

                      </div>
                  </div>
                </div>
              </el-tab-pane>
               <el-tab-pane :label="`分析题[${fenxi.length}题]`" name="seventh" v-if="fenxi.length">
                <div class="exam-list">
                  <div class="exam-box" v-for="(exam, index) in fenxi" :key="exam.questionId">
                      <div class="title">{{danxuan.length+duoxuan.length+panduan.length+tiankong.length+jianda.length+lunshu.length+index+1}}: [分析题] ({{exam.questionPoint}}分)</div>
                      <div class="question-content">
                        <p class="question">{{exam.questionContent.title}}</p>
                        <div class="choose-list">
                          <div class="choose-tab" v-for="choice in exam.questionContent.choiceList" :key="choice">
                            <input type="radio" disabled="disabled" class="radio">{{choice}}
                          </div>
                        </div>
                        <p v-if="exam.answer=='T'">参考答案： 对</p>
                        <p v-if="exam.answer=='F'">参考答案： 错</p>
                        <p class="answer">考生答案：{{exam.studentAnswer}}</p>
                        <div class="score">考生得分：<div class="score-value">{{exam.studentPoint}}</div></div>
                        <p class="teacher">教师批注：</p>
                        <div class="notes">{{exam.teacherComment}}</div>
                        <div class="origin-box">
                          <div class="origin-btn origin">来源</div>
                          <div class="origin-text">{{exam.referenceName}}</div>
                        </div>
                        <div class="origin-box">
                          <div class="origin-btn analysis">解析</div>
                          <div class="origin-text">{{exam.analysis}}</div>
                        </div>
                        <div class="origin-box">
                          <div class="origin-btn exam-point">考点</div>
                          <div class="origin-text">{{exam.examingPoint}}</div>
                        </div>
                      </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
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
      tableData: [],
      activeName: "first",
      showExamDetail: false,
      examContent: [],
      exampapername: '',
      examAllPoint: '',
      studentPointGet: '',
      danxuan: [],
      duoxuan: [],
      panduan: [],
      tiankong: [],
      jianda: [],
      lunshu: [],
      fenxi: []
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
    },
    chooseExam(tab, event){
      console.log(tab, event)
    },
    getExamDetail(id) {
      this.$store.dispatch('EXAM_PAGE_DETAIL', id).then(res => {
        // console.log(res)
        this.showExamDetail = true;
        this.exampapername = res.object.exampapername;
        this.examAllPoint = res.object.examAllPoint;
        this.studentPointGet = res.object.studentPointGet;
        this.examContent = res.object.examcontent;
        this.danxuan = this.examContent.filter(item => {
          return item.questionTypeId == 1
        })
        this.duoxuan = this.examContent.filter(item => {
          return item.questionTypeId == 2
        })
        this.panduan = this.examContent.filter(item => {
          return item.questionTypeId == 3
        })
        this.tiankong = this.examContent.filter(item => {
          return item.questionTypeId == 4
        })
        this.jianda = this.examContent.filter(item => {
          return item.questionTypeId == 5
        })
        this.lunshu = this.examContent.filter(item => {
          return item.questionTypeId == 6
        })
        this.fenxi = this.examContent.filter(item => {
          return item.questionTypeId == 7
        })
        

      }).catch(err => {
        console.log(err)
        this.$message({
          type: "error",
          message: "获取试卷详情失败，请稍后重试"
        })
      })
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
  .td-score {
    color:red;
    line-height:30px;
    display:inline-block;
  }
  .view-btn {
    float: right;
    width:60px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 4px;
    background-color: #5a9cff;
    color: #fff;
    font-size: 12px;
    cursor: pointer;
    margin-left: 5px;
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
  .exam-bg {
    width:100%;
    height:100%;
    background-color: rgba(0,0,0,0.4);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    .exam-content {
      width: 1200px;
      height: calc(100% - 80px);
      margin: 20px auto;
      padding: 20px 0;
      background-color: #fff;
      border-radius: 8px;
      overflow-y: auto;
      h4 {
        font-size: 20px;
        padding-left: 20px;
      }
      .student-score {
        color: #5cb85c;
      }
      .exam-info {
        width: 100%;
        height: 100%;
        display: inline-block;
        .exam-name {
          line-height: 40px;
          padding-left: 20px;
          border-bottom: 1px solid rgb(234, 234, 234);
        }
        .exam-tabs {
          .el-tabs__header {
            padding-left: 20px;
          }
        }
        .exam-score {
          line-height: 30px;
          padding-left: 20px;
          .total-score {
            margin-right: 20px;
            display: inline-block;
          }
        }
        .exam-list {
          .exam-box {
            .title {
              height: 33px;
              line-height: 33px;
              background: rgb(232,239,241);
              font-size: 14px;
              padding-left: 20px;
              .type {
                display: inline-block;
              }
            }
            .question-content {
              padding-left: 20px;
              p {
                line-height: 30px;
              }
              .question {
                margin: 5px 0;
              }
              .choose-list {
                width: 100%;
                display: inline-block;
                margin-bottom: 10px;
                .choose-tab {
                  line-height: 26px;
                  input[type="radio"] {
                    margin-right: 10px;
                  }
                }
              }
              .score {
                .score-value {
                  width: 200px;
                  height: 30px;
                  line-height: 30px;
                  padding-left: 10px;
                  background-color: #e8eff1;
                  display: inline-block;
                }
              }
              .notes {
                padding: 10px;
                width: calc(100% - 40px );
                min-height: 50px;
                background-color: #e8eff1;
                border: 1px solid #999;
                margin-bottom: 10px;
              }
              .origin-box {
                padding-bottom: 10px;
                .origin-btn {
                  width: 60px;
                  height: 30px;
                  line-height: 30px;
                  text-align: center;
                  color: #fff;
                  display: inline-block;
                }
                .origin {
                  background-color: #5bc0de;
                }
                .analysis {
                  background-color: #f0ad4e;
                }
                .exam-point {
                  background-color: #5cb85c;
                }
                .origin-text {
                  line-height: 30px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
