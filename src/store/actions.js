import Vue from 'vue'
import Vuex from 'vuex'
import api from './../api'

const INDEX_SET = 'INDEX_SET'
const CITY_LIST_FETCH = 'CITY_LIST_FETCH'
const LINK_FETCH = 'LINK_FETCH'
const REGION_LIST_FETCH = 'REGION_LIST_FETCH'

import home from './home'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      activeType: null,
      showCityChange: false,
      curCity: {},
      listCity: [],
      wLink: [],
      showToTop: true,
      regionList: [],
    },
    mutations: {
      [INDEX_SET](state, data){
        state[data['target']] = data.data 
      }
    },
    actions: {
      [CITY_LIST_FETCH]({commit}, params){
        let cookies
        if (params.cookies) {
            cookies = params.cookies
            delete params.cookies
        }
        return api.post('/home/listcity', params, cookies).then(res => {
          commit('INDEX_SET', {
            target: 'listCity',
            data: res.data.list
          })
        })
      },

    },
    modules: {
      home
    }
  })
}
