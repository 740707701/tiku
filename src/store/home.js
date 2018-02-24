
import api from './../api'

const HOME_SET = 'HOME_SET'
const HOME_FILTERS_FETCH = 'HOME_FILTERS_FETCH'

export default {
  state: {
    getMovie: {},
  },
  mutations: {
    [HOME_SET](state, data){
      state[data['target']] = data.data 
    },
  },
  actions: {
    [HOME_FILTERS_FETCH]({commit}, params){
      return api.post('/in_theaters', params).then(res => {
        commit('HOME_SET', {
          target: 'getMovie',
          data: res.subjects
        })

      })
    },
  }
}