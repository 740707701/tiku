import api from './../api'

// 用户考试试卷

const EXAM_SET = 'EXAM_SET'
const EXAM_YES_LIST = 'EXAM_YES_LIST' // 按照课程查出已考试清单
const EXAM_NO_LIST = 'EXAM_NO_LIST' // 按照课程未参加考试清单
const EXAM_PAGE = 'EXAM_PAGE' // 按照课程未参加考试清单


// 
export default {
  state: {
    yesList: {},
    noList: {},
    pageList: {},
  },
  mutations: {
    [EXAM_SET](state, data){
      state[data['target']] = data.data
    }
  },
  actions: {
    [EXAM_YES_LIST]({commit}, params){
      return api.post('/subject/exam-yes-list/', params).then(res => {
        commit('EXAM_SET', {
          target: 'yesList',
          data: res.data
        })
      }) 
    },
    [EXAM_NO_LIST]({commit}, params){
      return api.post('/subject/exam-no-list/', params).then(res => {
        commit('EXAM_SET', {
          target: 'noList',
          data: res.data
        })
      }) 
    },
    [EXAM_PAGE]({commit}, params){
      return api.post('/subject/exam-page/', params).then(res => {
        commit('EXAM_SET', {
          target: 'pageList',
          data: res.data
        })
      }) 
    },
  }
}
