import api from './../api'

// 用户考试试卷

const EXAM_SET = 'EXAM_SET'
const EXAM_YES_LIST = 'EXAM_YES_LIST' // 按照课程查出已考试清单
const EXAM_NO_LIST = 'EXAM_NO_LIST' // 按照课程未参加考试清单
const EXAM_PAGE = 'EXAM_PAGE' // 按照课程未参加考试清单
const EXAM_ANSWERS_PAGE = 'EXAM_ANSWERS_PAGE' // 其它答案
const SBUMIT_ANSWERS_PAGE = 'SBUMIT_ANSWERS_PAGE' // 评论添加
const EXAM_CONTENT = 'EXAM_CONTENT' // 我的测试题
const EXAM_SUBMIT = 'EXAM_SUBMIT' //我的答案提交
const EXAM_PAGE_DETAIL = 'EXAM_PAGE_DETAIL' //考试记录 --试卷详情
const OUTQUESTION = 'OUTQUESTION' //出题记录
const REVIEWQUESTION = 'REVIEWQUESTION' //审题记录
const EDIT_OUTQUESTION = 'EDIT_OUTQUESTION' //修改出题题目
const DELETE_OUTQUESTION = 'DELETE_OUTQUESTION' //删除出题题目
const QUESTION_DETAIL = 'QUESTION_DETAIL' //题目详情

// subject/exam-content 我的测试题

// （）URL：subject/comment-submit  （post请求）
// 参数：


// subject/curriculum-list
// subject/error-Statistical
export default {
  state: {
    yesList: [],
    noList: [],
    pageList: {},
    answersList: [],
    commentList: [],
    storeExamContent: [],
    examPageDetail: {},
    outQuestion: [],
    reviewQuestion: [],
    questionInfo: {}
  },
  mutations: {
    [EXAM_SET](state, data) {
      state[data['target']] = data.data
    }
  },
  actions: {
    //出题记录
    [OUTQUESTION]({commit}, params){
      return api.get('/subject/getMySetQuestion').then(res => {
        commit('EXAM_SET', {
          target: 'outQuestion',
          data: res.object
        })
        return res
      })
    },
    //修改出题题目
    [EDIT_OUTQUESTION]({commit}, params){
      return api.post('/subject/question-add').then(res => {
        commit('EXAM_SET', {
          target: 'outQuestion',
          data: res.object
        })
        return res
      })
    },
    //获取题目详情
    [QUESTION_DETAIL]({commit}, params){
      return api.get('/secure/question/question-detail/' + params).then(res => {
        commit('EXAM_SET', {
          target: 'questionInfo',
          data: res.object
        })
        return res
      })
    },
    //删除出题题目
    [DELETE_OUTQUESTION]({commit}, params){
      return api.delete('/subject/delete-question/' + params).then(res => {
        commit('EXAM_SET', {
          target: 'outQuestion',
          data: res.object
        })
        return res
      })
    },
    //审题记录
    [REVIEWQUESTION]({commit}, params){
      return api.get('/subject/getMyExaminingTheTopic').then(res => {
        commit('EXAM_SET', {
          target: 'reviewQuestion',
          data: res.object
        })
        return res
      })
    },
    [EXAM_YES_LIST]({ commit }, params) {
      return api.post('/subject/exam-uncommitted-list', params).then(res => {
        commit('EXAM_SET', {
          target: 'yesList',
          data: res.object
        })
        return res;
      })
    },
    [EXAM_NO_LIST]({ commit }, params) {
      return api.post('/subject/exam-participate-list', params).then(res => {
        commit('EXAM_SET', {
          target: 'noList',
          data: res.object
        })
        return res;
      })
    },
    [EXAM_PAGE]({ commit }, params) {
      return api.post('/subject/exam-page/', params).then(res => {
        commit('EXAM_SET', {
          target: 'pageList',
          data: res.object
        })
      })
    },
    [EXAM_ANSWERS_PAGE]({ commit }, params) {
      return api.post('/subject/comment-list', params).then(res => {
        commit('EXAM_SET', {
          target: 'answersList',
          data: res.object
        })
      })
    },
    //我要当判官 审题 "下一题"按钮调用
    [SBUMIT_ANSWERS_PAGE]({ commit }, params) {
      return api.post('/subject/comment-submit', params).then(res => {
        commit('EXAM_SET', {
          target: 'commentList',
          data: res.object
        })
        return res;
      })
    },
    [EXAM_CONTENT]({ commit }, params) {
      return api.post('/subject/exam-content', params).then(res => {
        commit('EXAM_SET', {
          target: 'storeExamContent',
          data: res.object
        })
        return res;
      })
    },
    [EXAM_SUBMIT]({ commit }, params) {
      return api.post('/student/exam-submit', params).then(res => {
        commit('EXAM_SET', {
          target: 'examSubmit',
          data: res.object
        })
        return res;
      })
    },
    [EXAM_PAGE_DETAIL]({ commit }, params) { //id
      return api.get('/subject/exam-answer/' + params, ).then(res => {
        commit('EXAM_SET', {
          target: 'examPageDetail',
          data: res.object
        })
        return res
      })
    }

  }
}