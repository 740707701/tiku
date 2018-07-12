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
					<div class="item-list">
						<div class="item" v-for="(item, index) in outDanxuan" :key="item.questionId">
							<div class="type">{{index+1}}:单选题</div>
							<div class="question-content">
								<div class="question">{{item.questionContent.title}}</div>
								<div class="choose-list">
									<div class="choose-tab" v-for="(choice,key) in item.questionContent.choiceList" :key="choice">
										<input type="radio" disabled="disabled" class="radio">{{key}}：{{choice}}
									</div>
								</div>
								<p class="answer">参考答案： {{item.answer}}</p>
								<p class="answer">知识点：{{item.pointName}}</p>
							</div>
						</div>
						<div class="item">
							<div class="type">单选题</div>
							<div class="question-content">
								<div class="question">微观经济学的中心理论是( )。</div>
								<div class="choose-list">
									<div class="choose-tab">
										<input type="radio" disabled="disabled" class="radio">资金投向
									</div>
									<div class="choose-tab">
										<input type="radio" disabled="disabled" class="radio">资金投向
									</div>
									<div class="choose-tab">
										<input type="radio" disabled="disabled" class="radio">资金投向
									</div>
									<div class="choose-tab">
										<input type="radio" disabled="disabled" class="radio">资金投向
									</div>
								</div>
								<p class="answer">参考答案： A</p>
								<p class="answer">知识点： 微观经济学</p>
							</div>
						</div>
					</div>
					<div class="item-list">
						<div class="item" v-for="(item, index) in outDuoxuan" :key="item.questionId">
							<div class="type">{{outDanxuan.length+index+1}}:多选题</div>
							<div class="question-content">
								<div class="question">{{item.questionContent.title}}</div>
								<div class="choose-list">
									<div class="choose-tab" v-for="(choice,key) in item.questionContent.choiceList" :key="choice">
										<input type="radio" disabled="disabled" class="radio">{{key}}：{{choice}}
									</div>
								</div>
								<p class="answer">参考答案： {{item.answer}}</p>
								<p class="answer">知识点：{{item.pointName}}</p>
							</div>
						</div>
						<div class="item">
							<div class="type">多选题</div>
							<div class="question-content">
								<div class="question">微观经济学的中心理论是( )。</div>
								<div class="choose-list">
									<div class="choose-tab">
										<input type="radio" disabled="disabled" class="radio">资金投向
									</div>
									<div class="choose-tab">
										<input type="radio" disabled="disabled" class="radio">资金投向
									</div>
									<div class="choose-tab">
										<input type="radio" disabled="disabled" class="radio">资金投向
									</div>
									<div class="choose-tab">
										<input type="radio" disabled="disabled" class="radio">资金投向
									</div>
									<div class="choose-tab">
										<input type="radio" disabled="disabled" class="radio">资金投向
									</div>
								</div>
								<p class="answer">参考答案： A,B,C,D</p>
								<p class="answer">知识点： 微观经济学</p>
							</div>
						</div>
					</div>
					<div class="item-list">
						<div class="item" v-for="(item, index) in outPanduan" :key="item.questionId">
							<div class="type">{{outDanxuan.length+outDuoxuan.length+index+1}}:判断题</div>
							<div class="question-content">
								<div class="question">{{item.questionContent.title}}</div>
								<p class="answer">参考答案： {{item.answer}}</p>
								<p class="answer">知识点：{{item.pointName}}</p>
							</div>
						</div>
						<div class="item">
							<div class="type">判断题</div>
							<div class="question-content">
								<div class="question">生命周期消费假说与凯恩斯消费函数理论的区别在于：凯恩斯消费函数理论强调当前消费支出与当前收入的相互联系，而生命周期假说则强调当前消费支出与家庭整个一生的全部预期收入的相互关系。</div>
								<p class="answer">参考答案： 对</p>
								<p class="answer">知识点： 微观经济学</p>
							</div>
						</div>
					</div>
					<div class="item-list">
						<div class="item" v-for="(item, index) in outJianda" :key="item.questionId">
							<div class="type">{{outDanxuan.length+outDuoxuan.length+outPanduan.length+index+1}}:简答题</div>
							<div class="question-content">
								<div class="question">{{item.questionContent.title}}</div>
								<p class="answer">参考答案： {{item.answer}}</p>
								<p class="answer">知识点：{{item.pointName}}</p>
							</div>
						</div>
						<div class="item">
							<div class="type">简答题</div>
							<div class="question-content">
								<div class="question">简答题问题叭叭叭叭叭啦啦啦点击开始广泛的</div>
								<p class="answer">参考答案：简答题答案安安大拿大家都是否收到回复v是代表v地方v不</p>
								<p class="answer">知识点： 微观经济学</p>
							</div>
						</div>
					</div>
					<div class="item-list">
						<div class="item" v-for="(item, index) in outLunshu" :key="item.questionId">
							<div class="type">{{outDanxuan.length+outDuoxuan.length+outPanduan.length+outJianda.length+index+1}}:论述题</div>
							<div class="question-content">
								<div class="question">{{item.questionContent.title}}</div>
								<p class="answer">参考答案： {{item.answer}}</p>
								<p class="answer">知识点：{{item.pointName}}</p>
							</div>
						</div>
						<div class="item">
							<div class="type">论述题</div>
							<div class="question-content">
								<div class="question">论述题问题叭叭叭叭叭啦啦啦点击开始广泛的论述题问题论述题问题论述题问题论述题问题论述题问题论述题问题论述题问题论述题问题</div>
								<p class="answer">参考答案：论述题答案安安大拿大家都是否收到回复论述论述题答案安安大拿大家都是否收到回复论述论述题答案安安大拿大家都是否收到回复论述</p>
								<p class="answer">知识点： 微观经济学</p>
							</div>
						</div>
					</div>
					<div class="item-list">
						<div class="item" v-for="(item, index) in outFenxi" :key="item.questionId">
							<div class="type">{{outDanxuan.length+outDuoxuan.length+outPanduan.length+outJianda.length+outLunshu.length+index+1}}:论述题</div>
							<div class="question-content">
								<div class="question">{{item.questionContent.title}}</div>
								<p class="answer">参考答案： {{item.answer}}</p>
								<p class="answer">知识点：{{item.pointName}}</p>
							</div>
						</div>
						<div class="item">
							<div class="type">分析题</div>
							<div class="question-content">
								<div class="question">如何理解P2P网贷的作用和意义？</div>
								<p class="answer">参考答案： （1）缓解小微企业融资难的问题 （2）改善低收入者的生活水平 （3）增加投资者的收入 （4）促进普惠金融
									（1）缓解小微企业融资难的问题 （2）改善低收入者的生活水平 （3）增加投资者的收入 （4）促进普惠金融
									生命周期消费假说与凯恩斯消费函数理论的区别在于：凯恩斯消费函数理论强调当前消费支出与当前收入的相互联系，而生命周期假说则强调当前消费支出与家庭整个一生的全部预期收入的相互关系。</p>
								<p class="answer">知识点： 微观经济学</p>
							</div>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane  class="ques-tab" label="审题记录" name="second">
					<div class="item-list">
						<div class="item" v-for="(item, index) in reviewDanxuan" :key="item.questionId">
							<div class="type">{{index+1}}:单选题</div>
							<div class="question-content">
								<div class="question">{{item.questionContent.title}}</div>
								<div class="choose-list">
									<div class="choose-tab" v-for="(choice,key) in item.questionContent.choiceList" :key="choice">
										<input type="radio" disabled="disabled" class="radio">{{key}}：{{choice}}
									</div>
								</div>
								<p class="answer">参考答案： {{item.answer}}</p>
								<p class="answer">知识点：{{item.pointName}}</p>
								<p class="score">难度评分： {{item.difficultynew}}分</p>
								<p class="score">专业性评分： {{item.speciality}}分</p>
								<p class="score">重要性评分： {{item.importance}}分</p>
								<p class="score">知识相关性评分： {{item.knowledgeCorrelation}}分</p>
								<p class="score">好差评分： {{item.level}}分</p>
							</div>
						</div>
						<div class="item">
							<div class="type">单选题</div>
							<div class="question-content">
								<div class="question">微观经济学的中心理论是( )。</div>
								<div class="choose-list">
									<div class="choose-tab">
										<input type="radio" disabled="disabled" class="radio">资金投向
									</div>
									<div class="choose-tab">
										<input type="radio" disabled="disabled" class="radio">资金投向
									</div>
									<div class="choose-tab">
										<input type="radio" disabled="disabled" class="radio">资金投向
									</div>
									<div class="choose-tab">
										<input type="radio" disabled="disabled" class="radio">资金投向
									</div>
								</div>
								<p class="answer">参考答案： A</p>
								<p class="answer">知识点： 微观经济学</p>
								<p class="score">难度评分： 80分</p>
								<p class="score">专业性评分： 45分</p>
								<p class="score">重要性评分： 76分</p>
								<p class="score">知识相关性评分： 43分</p>
								<p class="score">好差评分： 85分</p>
							</div>
						</div>
					</div>
					<div class="item-list">
						<div class="item" v-for="(item, index) in reviewDuoxuan" :key="item.questionId">
							<div class="type">{{reviewDanxuan.length+index+1}}:多选题</div>
							<div class="question-content">
								<div class="question">{{item.questionContent.title}}</div>
								<div class="choose-list">
									<div class="choose-tab" v-for="(choice,key) in item.questionContent.choiceList" :key="choice">
										<input type="radio" disabled="disabled" class="radio">{{key}}：{{choice}}
									</div>
								</div>
								<p class="answer">参考答案： {{item.answer}}</p>
							</div>
						</div>
						<div class="item">
							<div class="type">多选题</div>
							<div class="question-content">
								<div class="question">微观经济学的中心理论是( )。</div>
								<div class="choose-list">
									<div class="choose-tab">
										<input type="radio" disabled="disabled" class="radio">资金投向
									</div>
									<div class="choose-tab">
										<input type="radio" disabled="disabled" class="radio">资金投向
									</div>
									<div class="choose-tab">
										<input type="radio" disabled="disabled" class="radio">资金投向
									</div>
									<div class="choose-tab">
										<input type="radio" disabled="disabled" class="radio">资金投向
									</div>
									<div class="choose-tab">
										<input type="radio" disabled="disabled" class="radio">资金投向
									</div>
								</div>
								<p class="answer">参考答案： A,B,C,D</p>
								<p class="answer">知识点： 微观经济学</p>
								<p class="score">难度评分： 80分</p>
								<p class="score">专业性评分： 45分</p>
								<p class="score">重要性评分： 76分</p>
								<p class="score">知识相关性评分： 43分</p>
								<p class="score">好差评分： 85分</p>
							</div>
						</div>
					</div>
					<div class="item-list">
						<div class="item" v-for="(item, index) in reviewPanduan" :key="item.questionId">
							<div class="type">{{reviewDanxuan.length+reviewDuoxuan.length+index+1}}:判断题</div>
							<div class="question-content">
								<div class="question">{{item.questionContent.title}}</div>
								<p class="answer">参考答案： {{item.answer}}</p>
								<p class="answer">知识点：{{item.pointName}}</p>
								<p class="score">难度评分： {{item.difficultynew}}分</p>
								<p class="score">专业性评分： {{item.speciality}}分</p>
								<p class="score">重要性评分： {{item.importance}}分</p>
								<p class="score">知识相关性评分： {{item.knowledgeCorrelation}}分</p>
								<p class="score">好差评分： {{item.level}}分</p>
							</div>
						</div>
						<div class="item">
							<div class="type">判断题</div>
							<div class="question-content">
								<div class="question">生命周期消费假说与凯恩斯消费函数理论的区别在于：凯恩斯消费函数理论强调当前消费支出与当前收入的相互联系，而生命周期假说则强调当前消费支出与家庭整个一生的全部预期收入的相互关系。</div>
								<p class="answer">参考答案： 对</p>
								<p class="answer">知识点： 微观经济学</p>
								<p class="score">难度评分： 80分</p>
								<p class="score">专业性评分： 45分</p>
								<p class="score">重要性评分： 76分</p>
								<p class="score">知识相关性评分： 43分</p>
								<p class="score">好差评分： 85分</p>
							</div>
						</div>
					</div>
					<div class="item-list">
						<div class="item" v-for="(item, index) in reviewJianda" :key="item.questionId">
							<div class="type">{{reviewDanxuan.length+reviewDuoxuan.length+reviewPanduan.length+index+1}}:简答题</div>
							<div class="question-content">
								<div class="question">{{item.questionContent.title}}</div>
								<p class="answer">参考答案： {{item.answer}}</p>
								<p class="answer">知识点：{{item.pointName}}</p>
								<p class="score">难度评分： {{item.difficultynew}}分</p>
								<p class="score">专业性评分： {{item.speciality}}分</p>
								<p class="score">重要性评分： {{item.importance}}分</p>
								<p class="score">知识相关性评分： {{item.knowledgeCorrelation}}分</p>
								<p class="score">好差评分： {{item.level}}分</p>
							</div>
						</div>
						<div class="item">
							<div class="type">简答题</div>
							<div class="question-content">
								<div class="question">简答题问题叭叭叭叭叭啦啦啦点击开始广泛的</div>
								<p class="answer">参考答案：简答题答案安安大拿大家都是否收到回复v是代表v地方v不</p>
								<p class="answer">知识点： 微观经济学</p>
								<p class="score">难度评分： 80分</p>
								<p class="score">专业性评分： 45分</p>
								<p class="score">重要性评分： 76分</p>
								<p class="score">知识相关性评分： 43分</p>
								<p class="score">好差评分： 85分</p>
							</div>
						</div>
					</div>
					<div class="item-list">
						<div class="item" v-for="(item, index) in reviewLunshu" :key="item.questionId">
							<div class="type">{{reviewDanxuan.length+reviewDuoxuan.length+reviewPanduan.length+reviewJianda.length+index+1}}:论述题</div>
							<div class="question-content">
								<div class="question">{{item.questionContent.title}}</div>
								<p class="answer">参考答案： {{item.answer}}</p>
								<p class="answer">知识点：{{item.pointName}}</p>
								<p class="score">难度评分： {{item.difficultynew}}分</p>
								<p class="score">专业性评分： {{item.speciality}}分</p>
								<p class="score">重要性评分： {{item.importance}}分</p>
								<p class="score">知识相关性评分： {{item.knowledgeCorrelation}}分</p>
								<p class="score">好差评分： {{item.level}}分</p>
							</div>
						</div>
						<div class="item">
							<div class="type">论述题</div>
							<div class="question-content">
								<div class="question">论述题问题叭叭叭叭叭啦啦啦点击开始广泛的论述题问题论述题问题论述题问题论述题问题论述题问题论述题问题论述题问题论述题问题</div>
								<p class="answer">参考答案：论述题答案安安大拿大家都是否收到回复论述论述题答案安安大拿大家都是否收到回复论述论述题答案安安大拿大家都是否收到回复论述</p>
								<p class="answer">知识点： 微观经济学</p>
								<p class="score">难度评分： 80分</p>
								<p class="score">专业性评分： 45分</p>
								<p class="score">重要性评分： 76分</p>
								<p class="score">知识相关性评分： 43分</p>
								<p class="score">好差评分： 85分</p>
							</div>
						</div>
					</div>
					<div class="item-list">
						<div class="item" v-for="(item, index) in reviewFenxi" :key="item.questionId">
							<div class="type">{{reviewDanxuan.length+reviewDuoxuan.length+reviewPanduan.length+reviewJianda.length+reviewLunshu.length+index+1}}:论述题</div>
							<div class="question-content">
								<div class="question">{{item.questionContent.title}}</div>
								<p class="answer">参考答案： {{item.answer}}</p>
								<p class="answer">知识点：{{item.pointName}}</p>
								<p class="score">难度评分： {{item.difficultynew}}分</p>
								<p class="score">专业性评分： {{item.speciality}}分</p>
								<p class="score">重要性评分： {{item.importance}}分</p>
								<p class="score">知识相关性评分： {{item.knowledgeCorrelation}}分</p>
								<p class="score">好差评分： {{item.level}}分</p>
							</div>
						</div>
						<div class="item">
							<div class="type">分析题</div>
							<div class="question-content">
								<div class="question">如何理解P2P网贷的作用和意义？</div>
								<p class="answer">参考答案： （1）缓解小微企业融资难的问题 （2）改善低收入者的生活水平 （3）增加投资者的收入 （4）促进普惠金融
									（1）缓解小微企业融资难的问题 （2）改善低收入者的生活水平 （3）增加投资者的收入 （4）促进普惠金融
									生命周期消费假说与凯恩斯消费函数理论的区别在于：凯恩斯消费函数理论强调当前消费支出与当前收入的相互联系，而生命周期假说则强调当前消费支出与家庭整个一生的全部预期收入的相互关系。</p>
								<p class="answer">知识点： 微观经济学</p>
								<p class="score">难度评分： 80分</p>
								<p class="score">专业性评分： 45分</p>
								<p class="score">重要性评分： 76分</p>
								<p class="score">知识相关性评分： 43分</p>
								<p class="score">好差评分： 85分</p>
							</div>
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>
<script>
import headerNav from '../components/Header.vue';
export default {
	name: 'myrecord',
	data(){
		return{
			activeName: "first",
			outQuestionList: [],
			reviewQuestionList: [],
			examContent: [],
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
	created(){},
	methods: {
		//出题记录
		getOutQuestion(){
			this.$store.dispatch('OUTQUESTION').then(res => {
				this.outQuestionList = res.object;
				this.examContent = res.object.examcontent;
				this.outDanxuan = this.examContent.filter(item => {
          return item.questionTypeId == 1
        })
				this.outDuoxuan = this.examContent.filter(item => {
          return item.questionTypeId == 2
        })
        this.outPanduan = this.examContent.filter(item => {
          return item.questionTypeId == 3
        })
        this.outTiankong = this.examContent.filter(item => {
          return item.questionTypeId == 4
        })
        this.outJianda = this.examContent.filter(item => {
          return item.questionTypeId == 5
        })
        this.outLunshu = this.examContent.filter(item => {
          return item.questionTypeId == 6
        })
        this.outFenxi = this.examContent.filter(item => {
          return item.questionTypeId == 7
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
				this.examContent = res.object.examcontent
				this.reviewDanxuan = this.examContent.filter(item => {
          return item.questionTypeId == 1
        })
				this.reviewDuoxuan = this.examContent.filter(item => {
          return item.questionTypeId == 2
        })
        this.reviewPanduan = this.examContent.filter(item => {
          return item.questionTypeId == 3
        })
        this.reviewTiankong = this.examContent.filter(item => {
          return item.questionTypeId == 4
        })
        this.reviewJianda = this.examContent.filter(item => {
          return item.questionTypeId == 5
        })
        this.reviewLunshu = this.examContent.filter(item => {
          return item.questionTypeId == 6
        })
        this.reviewFenxi = this.examContent.filter(item => {
          return item.questionTypeId == 7
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
				// this.getOutQuestion()
			}else if(index ==1){
				// this.getReviewQuestion()
			}
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


