<template>
	<div class="myrecord-page">
		<header-nav></header-nav>
		<div class="big-banner">
			<div class="wrapper">
				<img src="../assets/images/title.png" class="title">
			</div>
		</div>
		<div class="container">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane  class="ques-tab" label="出题记录" name="first">
					<el-tabs v-model="subActiveName">
						<el-tab-pane class="ques-tab" :label="`单选题[共${outDanxuan.length}题]`" name="subFirst">
							<div class="item-list">
								<div class="item" v-for="(item, index) in outDanxuan" :key="item.id">
									<div class="type">{{index+1}}:单选题
										<div class="icon-box">
											<i class="iconfont icon-edit" @click="editQuestion(item)"></i>
											<i class="iconfont icon-delete" @click="deleteQuestion(item.id)"></i>
										</div>
									</div>
									<div class="question-content">
										<div class="question">{{item.questionContent.title}}</div>
										<div class="choose-list">
											<div class="choose-tab" v-for="(choice,key) in item.questionContent.choiceList" :key="key">
												<input type="radio" disabled="disabled" class="radio">{{key}}：{{choice}}
											</div>
										</div>
										<p class="answer">参考答案： {{item.answer}}</p>
										<p class="answer">知识点：{{item.pointName}}</p>
										<p class="score">难度平均评分： {{item.avgDifficulty||0}}分</p>
										<p class="score">专业性平均评分： {{item.avgSpeciality||0}}分</p>
										<p class="score">重要性平均评分： {{item.avgImportance||0}}分</p>
										<p class="score">知识相关性平均评分： {{item.avgKnowledgeCorrelation||0}}分</p>
										<p class="score">好差平均评分： {{item.avgLevel||0}}分</p>
									</div>
								</div>
							</div>
						</el-tab-pane>
						<el-tab-pane class="ques-tab" :label="`多选题[共${outDuoxuan.length}题]`" name="subSecond">
							<div class="item-list">
								<div class="item" v-for="(item, index) in outDuoxuan" :key="item.id">
									<div class="type">{{index+1}}:多选题
										<div class="icon-box">
											<i class="iconfont icon-edit" @click="editQuestion(item)"></i>
											<i class="iconfont icon-delete" @click="deleteQuestion(item.id)"></i>
										</div>
									</div>
									<div class="question-content">
										<div class="question">{{item.questionContent.title}}</div>
										<div class="choose-list">
											<div class="choose-tab" v-for="(choice,key) in item.questionContent.choiceList" :key="key">
												<input type="radio" disabled="disabled" class="radio">{{key}}：{{choice}}
											</div>
										</div>
										<p class="answer">参考答案： {{item.answer}}</p>
										<p class="answer">知识点：{{item.pointName}}</p>
										<p class="score">难度平均评分： {{item.avgDifficulty||0}}分</p>
										<p class="score">专业性平均评分： {{item.avgSpeciality||0}}分</p>
										<p class="score">重要性平均评分： {{item.avgImportance||0}}分</p>
										<p class="score">知识相关性平均评分： {{item.avgKnowledgeCorrelation||0}}分</p>
										<p class="score">好差平均评分： {{item.avgLevel||0}}分</p>
									</div>
								</div>
							</div>
						</el-tab-pane>
						<el-tab-pane class="ques-tab" :label="`判断题[共${outPanduan.length}题]`" name="subThird">
							<div class="item-list">
								<div class="item" v-for="(item, index) in outPanduan" :key="item.id">
									<div class="type">{{index+1}}:判断题
										<div class="icon-box">
											<i class="iconfont icon-edit" @click="editQuestion(item)"></i>
											<i class="iconfont icon-delete" @click="deleteQuestion(item.id)"></i>
										</div>
									</div>
									<div class="question-content">
										<div class="question">{{item.questionContent.title}}</div>
										<p class="answer" v-if="item.answer=='T'">参考答案： 正确</p>
										<p class="answer" v-if="item.answer=='F'">参考答案： 错误</p>
										<p class="answer">知识点：{{item.pointName}}</p>
										<p class="score">难度平均评分： {{item.avgDifficulty||0}}分</p>
										<p class="score">专业性平均评分： {{item.avgSpeciality||0}}分</p>
										<p class="score">重要性平均评分： {{item.avgImportance||0}}分</p>
										<p class="score">知识相关性平均评分： {{item.avgKnowledgeCorrelation||0}}分</p>
										<p class="score">好差平均评分： {{item.avgLevel||0}}分</p>
									</div>
								</div>
							</div>
						</el-tab-pane>
						<el-tab-pane class="ques-tab" v-if="outTiankong.length" :label="`填空题[共${outTiankong.length}题]`" name="subFourth">
							<div class="item-list">
								<div class="item" v-for="(item, index) in outTiankong" :key="item.id">
									<div class="type">{{index+1}}:填空题
										<div class="icon-box">
											<i class="iconfont icon-edit" @click="editQuestion(item)"></i>
											<i class="iconfont icon-delete" @click="deleteQuestion(item.id)"></i>
										</div>
									</div>
									<div class="question-content">
										<div class="question">{{item.questionContent.title}}</div>
										<p class="answer">参考答案： {{item.answer}}</p>
										<p class="answer">知识点：{{item.pointName}}</p>
										<p class="score">难度平均评分： {{item.avgDifficulty||0}}分</p>
										<p class="score">专业性平均评分： {{item.avgSpeciality||0}}分</p>
										<p class="score">重要性平均评分： {{item.avgImportance||0}}分</p>
										<p class="score">知识相关性平均评分： {{item.avgKnowledgeCorrelation||0}}分</p>
										<p class="score">好差平均评分： {{item.avgLevel||0}}分</p>
									</div>
								</div>
							</div>
						</el-tab-pane>
						<el-tab-pane class="ques-tab" v-if="outJianda.length" :label="`简答题[共${outJianda.length}题]`" name="subFifth">
							<div class="item-list">
								<div class="item" v-for="(item, index) in outJianda" :key="item.id">
									<div class="type">{{index+1}}:简答题
										<div class="icon-box">
											<i class="iconfont icon-edit" @click="editQuestion(item)"></i>
											<i class="iconfont icon-delete" @click="deleteQuestion(item.id)"></i>
										</div>
									</div>
									<div class="question-content">
										<div class="question">{{item.questionContent.title}}</div>
										<p class="answer">参考答案： {{item.answer}}</p>
										<p class="answer">知识点：{{item.pointName}}</p>
										<p class="score">难度平均评分： {{item.avgSpeciality||0}}分</p>
										<p class="score">重要性平均评分： {{item.avgImportance||0}}分</p>
										<p class="score">知识相关性平均评分： {{item.avgKnowledgeCorrelation||0}}分</p>
										<p class="score">好差平均评分： {{item.avgLevel||0}}分</p>
									</div>
								</div>
							</div>
						</el-tab-pane>
						<el-tab-pane class="ques-tab" v-if="outLunshu.length" :label="`论述题[共${outLunshu.length}题]`" name="subSixth">
							<div class="item-list">
								<div class="item" v-for="(item, index) in outLunshu" :key="item.id">
									<div class="type">{{index+1}}:论述题
										<div class="icon-box">
											<i class="iconfont icon-edit" @click="editQuestion(item)"></i>
											<i class="iconfont icon-delete" @click="deleteQuestion(item.id)"></i>
										</div>
									</div>
									<div class="question-content">
										<div class="question">{{item.questionContent.title}}</div>
										<p class="answer">参考答案： {{item.answer}}</p>
										<p class="answer">知识点：{{item.pointName}}</p>
										<p class="score">难度平均评分： {{item.avgDifficulty||0}}分</p>
										<p class="score">专业性平均评分： {{item.avgSpeciality||0}}分</p>
										<p class="score">重要性平均评分： {{item.avgImportance||0}}分</p>
										<p class="score">知识相关性平均评分： {{item.avgKnowledgeCorrelation||0}}分</p>
										<p class="score">好差平均评分： {{item.avgLevel||0}}分</p>
									</div>
								</div>
							</div>
						</el-tab-pane>
						<el-tab-pane class="ques-tab" v-if="outFenxi.length" :label="`分析题[共${outFenxi.length}题]`" name="subSeventh">
							<div class="item-list">
								<div class="item" v-for="(item, index) in outFenxi" :key="item.id">
									<div class="type">{{index+1}}:分析题
										<div class="icon-box">
											<i class="iconfont icon-edit" @click="editQuestion(item)"></i>
											<i class="iconfont icon-delete" @click="deleteQuestion(item.id)"></i>
										</div>
									</div>
									<div class="question-content">
										<div class="question">{{item.questionContent.title}}</div>
										<p class="answer">参考答案： {{item.answer}}</p>
										<p class="answer">知识点：{{item.pointName}}</p>
										<p class="score">难度平均评分： {{item.avgDifficulty||0}}分</p>
										<p class="score">专业性平均评分： {{item.avgSpeciality||0}}分</p>
										<p class="score">重要性平均评分： {{item.avgImportance||0}}分</p>
										<p class="score">知识相关性平均评分： {{item.avgKnowledgeCorrelation||0}}分</p>
										<p class="score">好差平均评分： {{item.avgLevel||0}}分</p>
									</div>
								</div>
							</div>
						</el-tab-pane>
					</el-tabs>
				</el-tab-pane>
				<el-tab-pane  class="ques-tab" label="审题记录" name="second">
					<el-tabs v-model="subActiveName2">
						<el-tab-pane class="ques-tab" v-if="reviewDanxuan.length" :label="`单选题[共${reviewDanxuan.length}题]`" name="subFirst2">
							<div class="item-list">
								<div class="item" v-for="(item, index) in reviewDanxuan" :key="item.questionId">
									<div class="type">{{index+1}}:单选题 
										<span>[出题人： {{item.questionPerson}}</span>
										<span>出题时间： {{item.questionTime}}]</span>
									</div>
									<div class="question-content">
										<div class="question">{{item.questionContent.title}}</div>
										<div class="choose-list">
											<div class="choose-tab" v-for="(choice,key) in item.questionContent.choiceList" :key="key">
												<input type="radio" disabled="disabled" class="radio">{{key}}：{{choice}}
											</div>
										</div>
										<p class="answer">参考答案： {{item.questionAnswer}}</p>
										<p class="answer">知识点：{{item.pointName}}</p>
										<p class="score">难度评分： {{item.difficulty}}分</p>
										<p class="score">专业性评分： {{item.speciality}}分</p>
										<p class="score">重要性评分： {{item.importance}}分</p>
										<p class="score">知识相关性评分： {{item.knowledgeCorrelation}}分</p>
										<p class="score">好差评分： {{item.level}}分</p>
										<div>
											<p class="score">难度平均评分： {{item.avgDifficulty||0}}分</p>
											<p class="score">专业性平均评分： {{item.avgSpeciality||0}}分</p>
											<p class="score">重要性平均评分： {{item.avgImportance||0}}分</p>
											<p class="score">知识相关性平均评分： {{item.avgKnowledgeCorrelation||0}}分</p>
											<p class="score">好差平均评分： {{item.avgLevel||0}}分</p>
										</div>
									</div>
								</div>
							</div>
						</el-tab-pane>
						<el-tab-pane class="ques-tab" v-if="reviewDuoxuan.length" :label="`多选题[共${reviewDuoxuan.length}题]`" name="subSecond2">
							<div class="item-list">
								<div class="item" v-for="(item, index) in reviewDuoxuan" :key="item.questionId">
									<div class="type">{{index+1}}:多选题
										<span>[出题人： {{item.questionPerson}}</span>
										<span>出题时间： {{item.questionTime}}]</span>
									</div>
									<div class="question-content">
										<div class="question">{{item.questionContent.title}}</div>
										<div class="choose-list">
											<div class="choose-tab" v-for="(choice,key) in item.questionContent.choiceList" :key="key">
												<input type="radio" disabled="disabled" class="radio">{{key}}：{{choice}}
											</div>
										</div>
										<p class="answer">参考答案： {{item.questionAnswer}}</p>
										<p class="score">难度评分： {{item.difficulty}}分</p>
										<p class="score">专业性评分： {{item.speciality}}分</p>
										<p class="score">重要性评分： {{item.importance}}分</p>
										<p class="score">知识相关性评分： {{item.knowledgeCorrelation}}分</p>
										<p class="score">好差评分： {{item.level}}分</p>
										<div>
											<p class="score">难度平均评分： {{item.avgSpeciality||0}}分</p>
											<p class="score">重要性平均评分： {{item.avgImportance||0}}分</p>
											<p class="score">知识相关性平均评分： {{item.avgKnowledgeCorrelation||0}}分</p>
											<p class="score">好差平均评分： {{item.avgLevel||0}}分</p>
										</div>
									</div>
								</div>
							</div>
						</el-tab-pane>
						<el-tab-pane class="ques-tab" v-if="reviewPanduan.length" :label="`判断题[共${reviewPanduan.length}题]`" name="subThird2">
							<div class="item-list">
								<div class="item" v-for="(item, index) in reviewPanduan" :key="item.questionId">
									<div class="type">{{index+1}}:判断题
										<span>[出题人： {{item.questionPerson}}</span>
										<span>出题时间： {{item.questionTime}}]</span>
									</div>
									<div class="question-content">
										<div class="question">{{item.questionContent.title}}</div>
										<p class="answer" v-if="item.questionAnswer=='T'">参考答案： 正确</p>
										<p class="answer" v-if="item.questionAnswer=='F'">参考答案： 错误</p>
										<p class="answer">知识点：{{item.pointName}}</p>
										<p class="score">难度评分： {{item.difficulty}}分</p>
										<p class="score">专业性评分： {{item.speciality}}分</p>
										<p class="score">重要性评分： {{item.importance}}分</p>
										<p class="score">知识相关性评分： {{item.knowledgeCorrelation}}分</p>
										<p class="score">好差评分： {{item.level}}分</p>
										<div>
											<p class="score">难度平均评分： {{item.avgDifficulty||0}}分</p>
											<p class="score">专业性平均评分： {{item.avgSpeciality||0}}分</p>
											<p class="score">重要性平均评分： {{item.avgImportance||0}}分</p>
											<p class="score">知识相关性平均评分： {{item.avgKnowledgeCorrelation||0}}分</p>
											<p class="score">好差平均评分： {{item.avgLevel||0}}分</p>
										</div>
									</div>
								</div>
							</div>
						</el-tab-pane>
						<el-tab-pane class="ques-tab" v-if="reviewTiankong.length" :label="`填空题[共${reviewTiankong.length}题]`" name="subFourth2">
							<div class="item-list">
								<div class="item" v-for="(item, index) in reviewTiankong" :key="item.questionId">
									<div class="type">{{index+1}}:填空题
										<span>[出题人： {{item.questionPerson}}</span>
										<span>出题时间： {{item.questionTime}}]</span>
									</div>
									<div class="question-content">
										<div class="question">{{item.questionContent.title}}</div>
										<p class="answer">参考答案： {{item.questionAnswer}}</p>
										<p class="answer">知识点：{{item.pointName}}</p>
										<p class="score">难度评分： {{item.difficulty}}分</p>
										<p class="score">专业性评分： {{item.speciality}}分</p>
										<p class="score">重要性评分： {{item.importance}}分</p>
										<p class="score">知识相关性评分： {{item.knowledgeCorrelation}}分</p>
										<p class="score">好差评分： {{item.level}}分</p>
										<div>
											<p class="score">难度平均评分： {{item.avgSpeciality||0}}分</p>
											<p class="score">重要性平均评分： {{item.avgImportance||0}}分</p>
											<p class="score">知识相关性平均评分： {{item.avgKnowledgeCorrelation||0}}分</p>
											<p class="score">好差平均评分： {{item.avgLevel||0}}分</p>
										</div>
									</div>
								</div>
							</div>
						</el-tab-pane>
						<el-tab-pane class="ques-tab" v-if="reviewJianda.length" :label="`简答题[共${reviewJianda.length}题]`" name="subFifth2">
							<div class="item-list">
								<div class="item" v-for="(item, index) in reviewJianda" :key="item.questionId">
									<div class="type">{{index+1}}:简答题
										<span>[出题人： {{item.questionPerson}}</span>
										<span>出题时间： {{item.questionTime}}]</span>
									</div>
									<div class="question-content">
										<div class="question">{{item.questionContent.title}}</div>
										<p class="answer">参考答案： {{item.questionAnswer}}</p>
										<p class="answer">知识点：{{item.pointName}}</p>
										<p class="score">难度评分： {{item.difficulty}}分</p>
										<p class="score">专业性评分： {{item.speciality}}分</p>
										<p class="score">重要性评分： {{item.importance}}分</p>
										<p class="score">知识相关性评分： {{item.knowledgeCorrelation}}分</p>
										<p class="score">好差评分： {{item.level}}分</p>
										<div>
											<p class="score">难度平均评分： {{item.avgDifficulty||0}}分</p>
											<p class="score">专业性平均评分： {{item.avgSpeciality||0}}分</p>
											<p class="score">重要性平均评分： {{item.avgImportance||0}}分</p>
											<p class="score">知识相关性平均评分： {{item.avgKnowledgeCorrelation||0}}分</p>
											<p class="score">好差平均评分： {{item.avgLevel||0}}分</p>
										</div>
									</div>
								</div>
							</div>
						</el-tab-pane>
						<el-tab-pane class="ques-tab" v-if="reviewLunshu.length" :label="`论述题[共${reviewLunshu.length}题]`" name="subSixth2">
							<div class="item-list">
								<div class="item" v-for="(item, index) in reviewLunshu" :key="item.questionId">
									<div class="type">{{index+1}}:论述题
										<span>[出题人： {{item.questionPerson}}</span>
										<span>出题时间： {{item.questionTime}}]</span>
									</div>
									<div class="question-content">
										<div class="question">{{item.questionContent.title}}</div>
										<p class="answer">参考答案： {{item.questionAnswer}}</p>
										<p class="answer">知识点：{{item.pointName}}</p>
										<p class="score">难度评分： {{item.difficulty}}分</p>
										<p class="score">专业性评分： {{item.speciality}}分</p>
										<p class="score">重要性评分： {{item.importance}}分</p>
										<p class="score">知识相关性评分： {{item.knowledgeCorrelation}}分</p>
										<p class="score">好差评分： {{item.level}}分</p>
										<div>
											<p class="score">难度平均评分： {{item.avgDifficulty||0}}分</p>
											<p class="score">专业性平均评分： {{item.avgSpeciality||0}}分</p>
											<p class="score">重要性平均评分： {{item.avgImportance||0}}分</p>
											<p class="score">知识相关性平均评分： {{item.avgKnowledgeCorrelation||0}}分</p>
											<p class="score">好差平均评分： {{item.avgLevel||0}}分</p>
										</div>
									</div>
								</div>
							</div>
						</el-tab-pane>
						<el-tab-pane class="ques-tab"  v-if="reviewFenxi.length" :label="`分析题[共${reviewFenxi.length}题]`" name="subSeventh2">
							<div class="item-list">
								<div class="item" v-for="(item, index) in reviewFenxi" :key="item.id">
									<div class="type">{{index+1}}:分析题
										<span>[出题人： {{item.questionPerson}}</span>
										<span>出题时间： {{item.questionTime}}]</span>
									</div>
									<div class="question-content">
										<div class="question">{{item.questionContent.title}}</div>
										<p class="answer">参考答案： {{item.questionAnswer}}</p>
										<p class="answer">知识点：{{item.pointName}}</p>
										<p class="score">难度评分： {{item.difficulty}}分</p>
										<p class="score">专业性评分： {{item.speciality}}分</p>
										<p class="score">重要性评分： {{item.importance}}分</p>
										<p class="score">知识相关性评分： {{item.knowledgeCorrelation}}分</p>
										<p class="score">好差评分： {{item.level}}分</p>
										<div>
											<p class="score">难度平均评分： {{item.avgDifficulty||0}}分</p>
											<p class="score">专业性平均评分： {{item.avgSpeciality||0}}分</p>
											<p class="score">重要性平均评分： {{item.avgImportance||0}}分</p>
											<p class="score">知识相关性平均评分： {{item.avgKnowledgeCorrelation||0}}分</p>
											<p class="score">好差平均评分： {{item.avgLevel||0}}分</p>
										</div>
									</div>
								</div>
							</div>
						</el-tab-pane>
					</el-tabs>
				</el-tab-pane>
			</el-tabs>
		</div>
		<el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>是否确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmDeleteQuestion">确 定</el-button>
      </span>
    </el-dialog>
	</div>
</template>
<script>
import headerNav from '../components/Header.vue';
export default {
	name: 'myrecord',
	data(){
		return{
			activeName: "first",
			subActiveName: "subFirst",
			subActiveName2: "subFirst2",
			dialogVisible: false,
			currentQuestionId: '',
			outQuestionList: [],
			reviewQuestionList: [],
			//出题题型
			outDanxuan: [],
			outDuoxuan: [],
			outPanduan: [],
			outTiankong: [],
			outJianda: [],
			outLunshu: [],
			outFenxi: [],
			//审题题型
			reviewDanxuan: [],
			reviewDuoxuan: [],
			reviewPanduan: [],
			reviewTiankong: [],
			reviewJianda: [],
			reviewLunshu: [],
			reviewFenxi: []
		}
	},
	created(){
		this.getOutQuestion()
	},
	methods: {
		//出题记录
		getOutQuestion(){
			this.$store.dispatch('OUTQUESTION').then(res => {
				this.outQuestionList = res.object;
				this.outDanxuan = this.outQuestionList.filter(item => {
					item.questionContent = JSON.parse(item.content)
          return item.question_type_id == 1
        })
				this.outDuoxuan = this.outQuestionList.filter(item => {
					item.questionContent = JSON.parse(item.content)
          return item.question_type_id == 2
        })
        this.outPanduan = this.outQuestionList.filter(item => {
					item.questionContent = JSON.parse(item.content)
          return item.question_type_id == 3
        })
        this.outTiankong = this.outQuestionList.filter(item => {
					item.questionContent = JSON.parse(item.content)
          return item.question_type_id == 4
        })
        this.outJianda = this.outQuestionList.filter(item => {
					item.questionContent = JSON.parse(item.content)
          return item.question_type_id == 5
        })
        this.outLunshu = this.outQuestionList.filter(item => {
					item.questionContent = JSON.parse(item.content)
          return item.question_type_id == 6
        })
        this.outFenxi = this.outQuestionList.filter(item => {
					item.questionContent = JSON.parse(item.content)
          return item.question_type_id == 7
        })
				if(res.result == "err"){
					this.$message({
						type: "error",
						message: res.messageInfo
					})
				}
			})
		},
		//审题记录
		getReviewQuestion(){
			this.$store.dispatch('REVIEWQUESTION').then(res => {
				this.reviewQuestionList = res.object;
				this.reviewDanxuan = this.reviewQuestionList.filter(item => {
					item.questionContent = JSON.parse(item.questionContent)
          return item.question_type_id == 1
        })
				this.reviewDuoxuan = this.reviewQuestionList.filter(item => {
					if(typeof(item.questionContent) == String){
						item.questionContent = JSON.parse(item.questionContent)
					}
          return item.question_type_id == 2
        })
        this.reviewPanduan = this.reviewQuestionList.filter(item => {
					if(typeof(item.questionContent) == String){
						item.questionContent = JSON.parse(item.questionContent)
					}
          return item.question_type_id == 3
        })
        this.reviewTiankong = this.reviewQuestionList.filter(item => {
					if(typeof(item.questionContent) == String){
						item.questionContent = JSON.parse(item.questionContent)
					}
          return item.question_type_id == 4
        })
        this.reviewJianda = this.reviewQuestionList.filter(item => {
					if(typeof(item.questionContent) == String){
						item.questionContent = JSON.parse(item.questionContent)
					}
          return item.question_type_id == 5
        })
        this.reviewLunshu = this.reviewQuestionList.filter(item => {
					if(typeof(item.questionContent) == String){
						item.questionContent = JSON.parse(item.questionContent)
					}
          return item.question_type_id == 6
        })
        this.reviewFenxi = this.reviewQuestionList.filter(item => {
					if(typeof(item.questionContent) == String){
						item.questionContent = JSON.parse(item.questionContent)
					}
          return item.question_type_id == 7
        })
				if(res.result == "err"){
					this.$message({
						type: "error",
						message: res.messageInfo
					})
				}
			})
		},
		handleClick(tab, event){
			let index = tab.index;
			if(index == 0){
				this.getOutQuestion()
			}else if(index ==1){
				this.getReviewQuestion()
			}
		},
		editQuestion(question){
			let questionsId = question.questionsId;
			let fieldId = question.fieldId;
			let questionTypeId = question.question_type_id;
			let questionId = question.id
			this.$router.push(`/judge?question=${questionsId}&fieldId=${fieldId}&questionTypeId=${questionTypeId}&questionId=${questionId}`)
		},
		deleteQuestion(id){
			this.dialogVisible = true;
			this.currentQuestionId = id;
		},
		confirmDeleteQuestion(id){
			this.$store.dispatch('DELETE_OUTQUESTION', this.currentQuestionId).then(res => {
				this.dialogVisible = false;
				this.getOutQuestion();
				this.$message({
					type: "success",
					message: "删除成功！"
				})
			})
		},
		handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
	},
	components: {
		headerNav
	}
}
</script>
<style lang="less" scoped>
	.myrecord-page {
		width: 100%;
		.container {
			width: 1200px;
			margin: 0 auto;
			.count {
				line-height: 30px;
				padding-bottom: 10px;
				span {
					margin-right: 20px;
				}
			}
			.item-list {
				width: 100%;
				display: inline-block;
				.item {
					width: 100%;
					font-size: 14px;
					display: inline-block;
					margin-bottom: 15px;
					.type {
						height: 33px;
						line-height: 33px;
						background-color: #e8eff1;
						padding-left: 20px;
						span {
							margin-left: 20px;
						}
						.icon-box {
							float: right;
							color: #409EFF;
							i {
								margin-right: 20px;
								cursor: pointer;
							}
						}
					}
					.question {
						line-height: 22px;
						margin: 5px 0;
					}
					.question-content {
						padding-left: 20px;
						.choose-list {
							width: 100%;
							display: inline-block;
							.choose-tab {
								line-height: 26px;
								.radio {
									margin-right: 10px;
								}
							}
						}
					}
					.answer {
						line-height: 22px;
					}
					.score {
						line-height: 22px;
						display: inline-block;
						margin-right: 30px;
					}
				}
			}
		}
	}
</style>


