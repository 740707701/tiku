import api from './../api'

const QUESTION_SET = 'QUESTION_SET'
const QUESTION_ACOUNT_SET = 'QUESTION_ACOUNT_SET' // 未审核题目类型分组
const QUESTION_UNAUDITED_SET = 'QUESTION_UNAUDITED_SET' // 未审核题目清单
const QUESTION_TYPE_SET = 'QUESTION_TYPE_SET' // 题型选择


// 未审核题目清单
// subject/question-unaudited/{fieldId}/{questionTypeId}

export default {
  state: {
    acountList: {},
    unauditedList: {},
    typeList: {},
  },
  mutations: {
    [QUESTION_SET](state, data){
      state[data['target']] = data.data
    }
  },
  actions: {
    [QUESTION_ACOUNT_SET]({commit}, params){
      return api.post('/subject/questiontype-acount', params).then(res => {
        commit('QUESTION_SET', {
          target: 'acountList',
          data: res.data
        })
      }) 
    },
    [QUESTION_UNAUDITED_SET]({commit}, params){
      return api.post('/subject/questiontype-unaudited', params).then(res => {
        commit('QUESTION_SET', {
          target: 'unauditedList',
          data: res.data
        })
      }) 
    },
    [QUESTION_TYPE_SET]({commit}, params){
      return api.post('/subject/question-type', params).then(res => {
        commit('QUESTION_SET', {
          target: 'typeList',
          data: res.data
        })
      }) 
    }
  }
}
