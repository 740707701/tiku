import api from './../api'

const ACCOUNT_SET = 'ACCOUNT_SET'
const ACCOUNT_LOGIN = 'ACCOUNT_LOGIN'
const ACCOUNT_LOGOUT = 'ACCOUNT_LOGOUT'
const ACCOUNT_FORGET = 'ACCOUNT_FORGET'

export default {
  state: {
    userInfo: {}
  },
  mutations: {
    [ACCOUNT_SET](state, data){
      state[data['target']] = data.data
    }
  },
  actions: {
    [ACCOUNT_LOGIN]({commit}, params){
      return api.post('/j_spring_security_check', params).then(res => {
        commit('ACCOUNT_SET', {
          target: 'userInfo',
          data: res.data
        })
      }) 
    }
  }
}
