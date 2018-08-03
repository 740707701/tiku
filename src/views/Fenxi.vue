<template>
	<div class="fenxi-page">
		<div class="content-top">
			<header-nav></header-nav>
			<div class="big-banner">
				<div class="wrapper">
					<img src="../assets/images/title.png" class="title">
				</div>
			</div>
		</div>
		<div class="content-question">
			<div class="left-content">
				<div class="line-box">
					<div class="box-line examinee">
						<p class="line-title clearfix">出题信息</p>
						<div class="student-info">
							<p class="info-list"><span>题库选择:</span> <span><i v-for="(item, index) in tikuList" :key="index" v-if="item.questionsId == tikuId">{{ item.questionsName }}</i></span></p>
							<p class="info-list"><span>课程选择:</span> <span><i v-for="(item, index) in curriculumList" :key="index" v-if="item.fieldId == fieldId">{{ item.fieldName}}</i></span></p>
							<p class="info-list"><span>出题时间:</span> <span>{{nowTime}}</span></p>
							<p class="info-list"><span>出题者:</span> <span>{{username}}</span></p>
						</div>
					</div>
					<div class="box-line examinee">
						<p class="line-title clearfix">出题状态</p>
						<div class="student-info">
							<p class="info-list" v-for="(item, index) in QusTypeList" :key="index"><span>{{item.name}}</span></p>
						</div>
					</div>
				</div>
				<div class="img-box">
					<img src="../assets/images/kd-bg.png" alt="">
				</div>
			</div>
			<div class="right-content">
				<el-collapse accordion v-model="activeNames" @change="handleChange" v-for="(item, index) in questionTypeId" :key="index">
					<el-collapse-item title="分析题" v-if="item == 7" :name="(index+1)">
						<div class="raido-list">
							<div class="raido-title">
								<div class="fenxi-count">{{analysisTopics.length+1}}、</div>
								<textarea class="textarea-title" v-model="analysisTitle" placeholder="输入标题"></textarea>
							</div>
							<div class="fenxi-select select-title">请选择知识点：</div>
							<template>
								<el-select v-model="analysisKnowledge" placeholder="请选择" size="small">
									<el-option
										v-for="item in chapterList"
										:key="item.pointId"
										:label="item.pointName"
										:value="item.pointId">
									</el-option>
								</el-select>
							</template>
							<div class="fenxi-tips">请针对该分析题的题目上传所需要的图片(可不传)</div>
							<div class="img-content">
								<div class="img-box">
									<i class="iconfont icon-camera"></i>
									<input type="file" class="input-file" @change="changeImage($event)" name="image" ref="imgInput" accept="image/gif,image/jpeg,image/jpg,image/png">
								</div>
								<div class="img-list">
									<div class="item" v-for="(item,index) in uploadImgList" :key="index">
										<div class="icon-del" @click="deleteUpload(item,index)">×</div>
										<img :src="rootPath+'/'+item.filePath" alt="">
										<div class="name">{{item.name}}</div>
									</div>
								</div>
							</div>
							<div class="fenxi-tips">请针对该分析题出题</div>
							<div class="fenxi-options">
								<div class="topic-type">
									<el-checkbox-group v-model="checkQuesTypeFenxi">
										<el-checkbox v-if="list.id!=7" v-for="list in typeList" :key="list.id"  :label="list.id" >{{list.name}}</el-checkbox>
									</el-checkbox-group>
								</div>
								<el-collapse accordion v-model="subActiveNames" v-for="(item, index) in checkQuesTypeFenxi" :key="index">
									<el-collapse-item title="单选题" v-if="item == 1" :name="(index+1)">
										<div class="raido-list" v-if="q.questionTypeId==1" v-for="(q,index) in allQuesList" :key="index">
											<div class="raido-title">{{index+1}}、<input class="judge-title" v-model="q.title" type="text" placeholder="输入标题"></div>
											<p class="chuti" v-for="(val,k) in q.choiceList" :key="k">
												{{k}}、<input class="judge-option" v-model="q.choiceList[k]" type="text" :placeholder="`输入选项${k}的内容`">
											</p>
											<p class="answer">输入正确答案: <input type="text" v-model="q.answer" class="judge-answer"> </p>
											<div class="save-btn">
												<el-button type="primary" size="small"  @click="fenxiSave(q,'radio',1)">保存修改</el-button>
											</div>
										</div>
									</el-collapse-item>
									<el-collapse-item title="多选题" v-if="item == 2" :name="(index+1)">
										<div class="raido-list" v-if="q.questionTypeId==2" v-for="(q,index) in allQuesList" :key="index">
											<div class="raido-title">{{index+1}}、<input class="judge-title" v-model="q.title" type="text" placeholder="输入标题"></div>
											<p class="chuti" v-for="(val,k) in q.choiceList" :key="k">
												{{k}}、<input class="judge-option" v-model="q.choiceList[k]" type="text" :placeholder="`输入选项${k}的内容`">
											</p>
											<p class="answer">输入正确答案: <input type="text" v-model="q.answer" class="judge-answer checkbox-answer"></p>
											<div class="save-btn">
												<el-button type="primary" size="small" @click="fenxiSave(q,'checkbox',2)">保存修改</el-button>
											</div>
										</div>
									</el-collapse-item>
									<el-collapse-item title="判断题" v-if="item == 3" :name="(index+1)">
										<div class="raido-list" v-if="q.questionTypeId==3" v-for="(q,index) in allQuesList" :key="index">
											<div class="raido-title">{{index+1}}、<input class="judge-title" v-model="q.title" type="text" placeholder="输入标题"></div>
											<p class="chuti">T、正确</p>
											<p class="chuti">F、错误</p>
											<p class="answer">输入正确答案: <input type="text" placeholder="T或F" v-model="q.answer" class="judge-answer"> </p>
											<div class="save-btn">
												<el-button type="primary" size="small" @click="fenxiSave(q,'judge',3)">保存修改</el-button>
											</div>
										</div>
									</el-collapse-item>
									<el-collapse-item title="简答题" v-if="item == 5" :name="(index+1)">
										<div class="raido-list answer-list"  v-if="q.questionTypeId==5" v-for="(q,index) in allQuesList" :key="index">
											<div class="raido-title">{{index+1}}、<input class="judge-title" v-model="q.title" maxlength="100" type="text" placeholder="输入标题，100字以内"></div>
											<p class="answer">输入正确答案: <textarea cols="30" rows="10" maxlength="200" placeholder="请在此输入您的参考答案，200字以内" v-model.trim="q.answer" class="judge-answer"></textarea></p>
											<div class="save-btn">
												<el-button type="primary" size="small" @click="fenxiSave(q,'answer',5)">保存修改</el-button>
											</div>
										</div>
									</el-collapse-item>
									<el-collapse-item title="论述题" v-if="item == 6" :name="(index+1)">
										<div class="raido-list answer-list" v-if="q.questionTypeId==6" v-for="(q,index) in allQuesList" :key="index">
											<div class="raido-title">{{index+1}}、<input class="judge-title" v-model="q.title" type="text" placeholder="输入标题"></div>
											<p class="answer">输入正确答案: <textarea cols="30" rows="10" placeholder="请在此输入您的参考答案" v-model.trim="q.answer" class="judge-answer"></textarea></p>
											<div class="save-btn">
												<el-button type="primary" size="small" @click="fenxiSave(q,'discuss', 6)">保存修改</el-button>
											</div>
										</div>
									</el-collapse-item>
								</el-collapse>
							</div>
							
						</div>
						<div class="save-btn">
							<el-button type="primary" size="small" @click="fenxiSubmit()">提交</el-button>
						</div>
					</el-collapse-item>
				</el-collapse>
			</div>
		</div>
	</div>
</template>
<script>
	import headerNav from '../components/Header.vue'
	import { mapState } from "vuex";
	export default {
		name: 'fenxi',
		data(){
			return {
				activeNames: 1,subActiveNames: 1,
				questionTypeId: [],typeList: [],QusTypeList: [],curriculumList: [],nowTime: '',tikuId: 1,username: '',
				questionInfo: {},questionId: '',showSubmitBtn: false,
				fenxiQuestionId: '',
				checkQuesTypeFenxi: [], //分析题下选择的出题类型
				titleImgFenxi: [], //分析题目的图片
				//分析题 二级选项数据
				analysisTopics: [],analysisTitle: '', analysisKnowledge:[],
				radioTopicsFenxi: [],radioTitleFenxi: '',radioOptionsFenxi: [],radioAnswerFenxi: '',radioKnowledgeFenxi: '',
				checkboxTopicsFenxi: [],checkboxTitleFenxi: '',checkboxOptionsFenxi: [],checkboxAnswerFenxi: '',checkboxKnowledgeFenxi: '',
				judgeTopicsFenxi: [],judgeTitleFenxi: '',judgeOptionsFenxi: [],judgeAnswerFenxi: '',judgeKnowledgeFenxi: '',
				answerTopicsFenxi: [],answerTitleFenxi: '',answerOptionsFenxi: [],answerAnswerFenxi: '',answerKnowledgeFenxi: '',
				discussTopicsFenxi: [],discussTitleFenxi: '',discussOptionsFenxi: [],discussAnswerFenxi: '',discussKnowledgeFenxi: '',
				//上传图片相关参数
				uploadImgList: [], questionImage: '', file: '', rootPath: '',
				//分析题下所有小题
				allQuesList: [],
				//出题信息
				tikuList: [],chapterList: []
			}
		},
		computed: {
			...mapState({
				// tikuList: state => state.tikuList,
				// chapterList: state => state.chapterList
			})
		},
		mounted(){
			this.username = sessionStorage.getItem('username')
		},
		created(){
			this.tikuId = this.$route.query.question 
			this.fieldId = this.$route.query.fieldId;
			if(this.$route.query.questionTypeId){
				this.questionTypeId = this.$route.query.questionTypeId.split(',')
			}
			this.questionId = this.$route.query.questionId //题目id
			if(this.questionId){
				this.showSubmitBtn = true;
				this.getQuestionDetail();
			}
			//出题信息
			let nowTime = new Date()
			let nowYear = nowTime.getFullYear()
			let nowMonth = nowTime.getMonth()+1
			let nowDay = nowTime.getDate()
			this.nowTime = `${nowYear}-${nowMonth}-${nowDay}`

			this.$store.dispatch("CURRICULUM_LIST_FETCH", {
				questionsId: this.tikuId
			}).then( res => {
				this.curriculumList = res.object
			});
			this.$store.dispatch('TIKU_LIST_FETCH', {}).then(res => {
				this.tikuList = res.object
			});
			//出题状态
			this.$store.dispatch("QUESTION_TYPE_SET", {}).then(res => {
				if(res.result == 'success' && res.object){
					this.typeList = res.object
					this.typeList.forEach((val, index) => {
						this.questionTypeId.forEach((qusVal, qusIndex) => {
							if(val.id == qusVal){
								this.QusTypeList.push(val)
							}
						})
					})
				}
			});
			//知识点列表
			this.$store.dispatch('CHAPTER_LIST_FETCH',{ fieldId: this.fieldId}).then(res => {
				this.chapterList = res.object;
			})
		},
		methods: {
			getQuestionDetail(){
				this.$store.dispatch('QUESTION_DETAIL', this.questionId).then(res => {
					let detail = res.object.question;
					this.rootPath = res.object.rootPath;
					let content = JSON.parse(detail.content)
					let questionTypeId = detail.question_type_id;
					let itemType = ''
					this.uploadImgList = content.titleImgList;
					console.log(this.uploadImgList)
					this.analysisTitle = content.title;
					this.analysisKnowledge = detail.knowledgePoint[0].pointId;
					let subtitleList = content.subtitleList
					subtitleList.map(item => {
						if(this.checkQuesTypeFenxi.indexOf(item.questionTypeId) == -1){
							this.checkQuesTypeFenxi.push(item.questionTypeId)
						}
						if(item.questionTypeId == 1){
							itemType = 'radio'
						}else if(item.questionTypeId == 2){
							itemType = 'checkbox'
						}else if(item.questionTypeId == 3){
							itemType = 'judge'
						}else if(item.questionTypeId == 4){
							itemType = ''
						}else if(item.questionTypeId == 5){
							itemType = 'answer'
						}else if(item.questionTypeId == 6){
							itemType = 'discuss'
						}
						let choiceList = []
						for(var k in item.choiceList){
							if(k == 'A'){
								choiceList[0] = item.choiceList[k]
							}else if(k == 'B'){
								choiceList[1] = item.choiceList[k]
							}else if(k == 'C'){
								choiceList[2] = item.choiceList[k]
							}else if(k == 'D'){
								choiceList[3] = item.choiceList[k]
							}else if(k == 'E'){
								choiceList[4] = item.choiceList[k]
							}else if(k == 'F'){
								choiceList[5] = item.choiceList[k]
							}
						}
						this[itemType+'TitleFenxi'] = item.title
						this[itemType+'OptionsFenxi'] = choiceList
						this[itemType+'AnswerFenxi'] = item.answer
						this.allQuesList.push(item)
					})
				})
			},
			changeImage: function(e){
				let file = e.target.files[0];
				this.file = file
				// console.log(this.file)
				let reader = new FileReader()
				let that = this
				reader.readAsDataURL(file)
				reader.onload= function(e){
					that.questionImage = this.result
				}
				this.upload()
			},
			upload: function(){
				if(this.$refs.imgInput[0].files.length !== 0){
					let data = new FormData()
					data.append('multfile', this.$refs.imgInput[0].files[0])
					this.$store.dispatch('UPLOAD', data)
					.then(res => {
						console.log(res)
						if(res.result == "success"){
							this.file = '';
							this.rootPath = res.object.rootPath;
							this.uploadImgList.push({name: res.object.fileName, filePath: res.object.filePath})
							this.$message({
								type: "success",
								message: "上传成功！"
							})
						}
						if(res.result == "error"){
							this.$message({
								type: "error",
								message: res.messageInfo
							})
						}
					})
				}
			},
			deleteUpload(item, index){
				this.uploadImgList.splice(index,1)
			},
			fenxiSave(question, itemType, questionTypeId){
				if(question.title == ''){
					this.$message({
						message: "标题不能为空",
						type: "warning"
					});
					return false;
				}else if(JSON.stringify(question.choiceList) == '{}'&&itemType == 'radio'
				||JSON.stringify(question.choiceList) == '{}'&&itemType == 'checkbox'){
					this.$message({
						message: "选项不能为空",
						type: "warning"
					});
					return false;
				}else if(question.answer == ''){
					this.$message({
						message: "答案不能为空",
						type: "warning"
					});
					return false;
				}
				let answer = question.answer;
				if(itemType == 'radio'){
					answer = answer.toUpperCase()
				}else if(itemType == 'checkbox'){
				//字符串转大写转数组排序
				let arr = answer.toLocaleUpperCase().split('').sort()
				let dup = [...new Set(arr)] //去重
					answer = dup.join('') //转字符串
				}
				if(itemType == 'judge'){
					answer = answer.toLocaleUpperCase()
					if(answer == 'A' || answer == 'T' ){
						answer = 'T'
					}else{
						answer = 'F'
					}
				}
				if(this.analysisTitle == ''){
					this.$message({
						message: "分析题标题不能为空",
						type: "warning"
					});
					return false;
				}else if(!this.analysisKnowledge){
					this.$message({
						message: "分析题知识点不能为空",
						type: "warning"
					});
					return false;
				}
				console.log('ques', question)
				this.$store
				.dispatch("QUESTION_FENXI_ADD", {
            "id": this.questionId || 0,
            "analysis": "", //题目解析
            "answer":  answer,
            "content": "", //试题内容
            "create_time": new Date(),//添加时间
            "creator": this.username,//添加人呢
            "examingPoint": "", //考点
            "is_visible": true,//是否可见
            "keyword": "",//关键字
            "name": this.analysisTitle,//题目名称
            "pointList": [this.analysisKnowledge],//章节知识点
            "pointName": "",
            "points": 0,//分数
            "questionContent": {
              "title": this.analysisTitle,//题目名称
              "titleImgList": this.uploadImgList,//题目图片
              "subtitleList": [question], //分析题下的题目列表
            },
            "questionTypeName": this.QusTypeList[this.activeNames-1].name,//题目类型名称
            "question_type_id": this.QusTypeList[this.activeNames-1].id,//题目类型ID
            "referenceName": "",//来源
            "status": 0,
          }).then(res => {
						if(res.result == "success"){
							this.$message({
								message: "修改成功！",
								type: "success"
							});
						}
					})
			},
			fenxiSubmit(){
				if(this.analysisTitle == ''){
					this.$message({
						message: "分析题标题不能为空",
						type: "warning"
					});
					return false;
				}else if(!this.analysisKnowledge){
					this.$message({
						message: "分析题知识点不能为空",
						type: "warning"
					});
					return false;
				}
				this.$store.dispatch('FENXI_SUBMIT', {
					"id": this.questionId || 0,
            "analysis": "", //题目解析
            "answer":  "",
            "content": "", //试题内容
            "create_time": new Date(),//添加时间
            "creator": this.username,//添加人呢
            "examingPoint": "", //考点
            "is_visible": true,//是否可见
            "keyword": "",//关键字
            "name": this.analysisTitle,//题目名称
            "pointList": [this.analysisKnowledge],//章节知识点
            "pointName": "",
            "points": 0,//分数
            "questionContent": {
							"title": this.analysisTitle,
							"titleImgList": this.uploadImgList,//题目图片
						},
            "questionTypeName": this.QusTypeList[this.activeNames-1].name,//题目类型名称
            "question_type_id": this.QusTypeList[this.activeNames-1].id,//题目类型ID
            "referenceName": "",//来源
            "status": 0,
				}).then(res => {
					if(res.result == 'success'){
						this.$message({
							message: "提交成功！",
							type: "success"
						})
						this.$router.push({
							name: "myRecord"
						})
					}else {
						this.$message({
							message: "提交失败，请稍后重试！",
							type: "error"
						})
					}
				})
			},
			handleChange(val) {
				console.log(val);
			},
		},
		components: {
			headerNav
		}
	}
</script>
<style lang="less" scoped>
.fenxi-page {
	width: 100%;
	height: calc(100vh - 300px);
	.content-question {
		width: 1200px;
		margin: 0 auto;
		// height: 100%;
		border: 1px solid #eeeeee;
		box-shadow:0px 6px 6px #E9E7EA;
		margin-bottom: 30px;
		margin-top: 10px;
		background: linear-gradient(to top, #60a8fe, #357df2);
		position: relative;
		.left-content {
			float: left;
			width: 298px;
			height: 100%;
			color: #fff;
			
			.line-box{
				position: relative;
			}
			.img-box {
				width: 298px;
				position: absolute;
				bottom: -4px;
				left: 0;
				img {
					width: 100%;
				}
			}
			.examinee{
				width: 298px;
				font-size: 14px;
				.student-info{
					padding-left: 30px;
					margin-bottom: 30px;
					font-size: 16px;
					color: #fff;
					.info-list{
						line-height: 32px;
						span{
							line-height: 32px;
							display: inline-block;
						}
						span:first-child{
							width: 80px;
						}
						span:last-child{
							i{
								font-style: normal;
							}
							a{
								margin-right: 10px;
								font-size: 16px;
								color: #fff;
							}
						}
					}
				}
			}
			.line-title{
				margin: 15px 0;
				padding-left: 16px;
				font-size: 20px;
				border-left: 5px solid #ea8661;
			}
		}
		.right-content {
			min-height: 100%;
			height: 100%;
			margin-left: 298px;
			background-color: #fff;
			.img-content {
				width: 100%;
				display: inline-block;
				.img-box {
					float: left;
					width: 100px;
					height: 50px;
					border: 1px solid #ccc;
					border-radius: 4px;
					cursor: pointer;
					position: relative;
					.icon-camera {
						font-size: 30px;
						position: absolute;
						top: 0;
						left: 50%;
						margin-left: -15px;
						margin-top: -2px;
						color: #ccc;
					}
					input[type="file"] {
						width: 100px;
						height: 50px;
						display: inline-block;
						cursor: pointer;
						opacity: 0;
						position: absolute;
						top: 0;
						left: 0;
					}
					.input-img {
						width: 100%;
						position: absolute;
						top: 0;
						left: 0
					}
				}
				.img-list {
					padding-left: 110px;
					.item {
						margin-right: 10px;
						margin-bottom: 10px;
						display: inline-block;
						position: relative;
					}
					img {
						width: 100px;
						height: 50px;
					}
					.name {
						text-align: center;
					}
					.icon-del {
						width: 20px;
						height: 20px;
						line-height: 22px;
						border-radius: 11px;
						text-align: center;
						font-size: 16px;
						font-weight: bold;
						border: 1px solid #ccc;
						background-color: #fff;
						cursor: pointer;
						position: absolute;
						top: -10px;
						right: -10px;
					}
				}
			}
			.fenxi-tips {
				line-height: 30px;
			}
			.fenxi-options {
				padding-top: 5px;
				.el-collapse {
					border: none;
				}
			}
			.fenxi-select {
				padding-top: 0!important;
			}
			.el-collapse{
				padding: 0 24px;
				background-color: #fff;
			}
			.el-collapse-item__content{
				border-bottom: 1px #ccc solid;
			}
			.line-title{
				line-height: 60px;
				// background: url(../assets/images/icon-list.png) 10px center no-repeat;
				padding-left: 50px;
				font-size: 15px;
				color: #999999;
				border-bottom: 1px solid #ccc;
				span{
					font-size: 18px;
					color: #000;
					position: relative;
					padding-left: 10px;
					cursor: pointer;
					i{
						display: block;
						width: 10px;
						height: 10px;
						position: absolute;
						top: 4px;
						right: -20px;
						border-width: 1px;
						border-style: solid;
						border: 1px solid #000;
						border-top: none;
						border-right: none;
						transform: rotate(-45deg);
						&.active{
							transform: rotate(135deg);
							top: 10px;

						}
					}
				}
			}
			.border-bottom{
				border-bottom: 5px solid #f7f7f7;
			}
			.raido-list{
				padding-left: 30px;
				margin-bottom: 10px;
				.fenxi-title {
					height: 50px;
				}
				.raido-title{
					padding: 0px 0 10px 0;
					.judge-title{
						border: 1px solid #ccc;
						width: 90%;
						font-size: 15px;
						line-height: 25px;
						padding: 5px 10px;
						border-radius: 5px;
					}
					.fenxi-count {
						float: left;
					}
					.textarea-title {
						width: 90%;
						min-height: 50px;
						border: 1px solid #ccc;
						border-radius: 8px;
						padding: 5px 10px;
					}
				}
				p{
					margin-bottom: 14px;
					.judge-option{
						border: 1px solid #cfcfcf;
						font-size: 15px;
						line-height: 25px;
						padding: 5px 10px;
						border-radius: 5px;
						width: 70%;
					}
					.judge-answer{
						width: 100px;
						line-height: 28px;
						border: 1px solid #cfcfcf;
						font-size: 14px;
					}
					.checkbox-answer{
						width: 150px;
					}
					.next-ti{
						display: block;
						width: 80px;
						height: 35px;
						text-align: center;
						line-height: 35px;
						color: #fff;
						font-size: 15px;
						border-radius: 4px;
						background: #5a9cff;
						float: right;
						margin-right: 64px;
						cursor: pointer;
					}
				}
				.answer {
					margin-bottom: 5px!important;
				}
				.select-title{
					padding: 15px 0 5px;
				}
			}
			.answer-list{
				.answer{
					.judge-answer{
						width: 89.5%;
						font-size: 15px;
						line-height: 20px;
						height: 100px;
						border-radius: 5px;
						padding: 5px 10px;
					}
				}

			}
			.save-btn {
				text-align: center;
			}
			.footer-button{
				padding: 10px 0;
				float: right;
				margin-right: 64px;
				span{
					display: block;
					width: 80px;
					height: 35px;
					float: left;
					margin-left: 40px;
					text-align: center;
					line-height: 35px;
					color: #fff;
					font-size: 18px;
					border-radius: 4px;
					background: #5a9cff;
					cursor: pointer;
				}
			}
		}
	}
}
</style>


