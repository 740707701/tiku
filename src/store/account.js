import api from './../api'

const ACCOUNT_SET = 'ACCOUNT_SET'
const ACCOUNT_LOGIN = 'ACCOUNT_LOGIN'
const ACCOUNT_LOGOUT = 'ACCOUNT_LOGOUT'
const ACCOUNT_FORGET = 'ACCOUNT_FORGET'
const ACCOUNT_UPDATE = 'ACCOUNT_UPDATE'


export default {
  state: {
    userInfo: {},
    isShowPop: false
  },
  mutations: {
    [ACCOUNT_SET](state, data){
      state[data['target']] = data.data
    }
  },
  actions: {
    [ACCOUNT_LOGIN]({commit}, params){
      return api.post('/login', params).then(res => {
        commit('ACCOUNT_SET', {
          target: 'userInfo',
          data: res.data
        })
        return res
      })
    },
    [ACCOUNT_LOGOUT]({commit}, params){
      return api.post('/logout', params).then(res => {
        commit('ACCOUNT_SET', {
          target: 'userInfo',
          data: {}
        })
        return res
      })
    },
    [ACCOUNT_UPDATE]({commit}, params){
      return api.post('/student/change-pwd', params).then(res => {
        return res
      })
    },
    
  }
}
