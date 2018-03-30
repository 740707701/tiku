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

  },
  mutations: {
    [EXAM_SET](state, data){
      state[data['target']] = data.data
    }
  },
  actions: {
    [EXAM_YES_LIST]({commit}, params){
      return api.post('/subject/exam-uncommitted-list', params).then(res => {
        commit('EXAM_SET', {
          target: 'yesList',
          data: res.object
        })
        return res;
      })
    },
    [EXAM_NO_LIST]({commit}, params){
      return api.post('/subject/exam-participate-list', params).then(res => {
        commit('EXAM_SET', {
          target: 'noList',
          data: res.object
        })
        return res;
      })
    },
    [EXAM_PAGE]({commit}, params){
      return api.post('/subject/exam-page/', params).then(res => {
        commit('EXAM_SET', {
          target: 'pageList',
          data: res.object
        })
      })
    },
    [EXAM_ANSWERS_PAGE]({commit}, params){
      return api.post('/subject/comment-list', params).then(res => {
        commit('EXAM_SET', {
          target: 'answersList',
          data: res.object
        })
      })
    },
    [SBUMIT_ANSWERS_PAGE]({commit}, params){
      return api.post('/subject/comment-submit', params).then(res => {
        commit('EXAM_SET', {
          target: 'commentList',
          data: res.object
        })
        return res;
      })
    },
    [EXAM_CONTENT]({commit}, params){
      return api.post('/subject/exam-content', params).then(res => {
        commit('EXAM_SET', {
          target: 'storeExamContent',
          data: res.object
        })
        return res;
      })
    },
    [EXAM_SUBMIT]({commit}, params){
      return api.post('/student/exam-submit', params).then(res => {
        commit('EXAM_SET', {
          target: 'examSubmit',
          data: res.object
        })
        return res;
      })
    },

  }
}
