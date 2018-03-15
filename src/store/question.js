import api from './../api'

const QUESTION_SET = 'QUESTION_SET'
const QUESTION_ACOUNT_SET = 'QUESTION_ACOUNT_SET' // 未审核题目类型分组
const QUESTION_UNAUDITED_SET = 'QUESTION_UNAUDITED_SET' // 未审核题目清单
const QUESTION_TYPE_SET = 'QUESTION_TYPE_SET' // 题型选择
const QUESTION_RANDOM_SET = 'QUESTION_RANDOM_SET' // 题型提交
const QUESTION_INTELLIGENT_SET = 'QUESTION_INTELLIGENT_SET' // 智能题库


// 未审核题目清单
// subject/question-unaudited/{fieldId}/{questionTypeId}
// 随机 
// subject/practice_random_list
// 智能题库
// intelligent_exercise_list 
export default {
  state: {
    acountList: {},
    unauditedList: {},
    typeList: {},
    randomList: {},
    intelligentList: []
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
      return api.get('/subject/question-type', params).then(res => {
        commit('QUESTION_SET', {
          target: 'typeList',
          data: res.object
        })
      }) 
    },
    [QUESTION_RANDOM_SET]({commit}, params){
      return api.post('/subject/practice_random_list', params).then(res => {
        commit('QUESTION_SET', {
          target: 'randomList',
          data: res.object
        })
        return res
      }) 
    },
    [QUESTION_INTELLIGENT_SET]({commit}, params){
      return api.post('/subject/intelligent_exercise_list', params).then(res => {
        commit('QUESTION_SET', {
          target: 'intelligentList',
          data: res.object
        })
        return res
      }) 
    },

    
  }
}
