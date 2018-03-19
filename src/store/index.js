import Vue from 'vue'
import Vuex from 'vuex'
import api from './../api'

import axios from 'axios'
import home from './home'
import account from './account'
import question from './question'
import exam from './exam'

Vue.prototype.$http = axios
Vue.use(Vuex)

const INDEX_SET = 'INDEX_SET'
const TIKU_LIST_FETCH = 'TIKU_LIST_FETCH' // 题库tabs 题库查询接口
const FIELD_LIST_FETCH = 'FIELD_LIST_FETCH' // 我的题库列表 题库课程接口
const KONWLED_LIST_FETCH = 'KONWLED_LIST_FETCH' // 题库课程章节
const PRACTICE_LIST_FETCH = 'PRACTICE_LIST_FETCH' // 随机练习
const IGENCE_LIST_FETCH = 'IGENCE_LIST_FETCH' // 智能练习
const ERROR_LIST_FETCH = 'ERROR_LIST_FETCH' // 错题分类
const CURRICULUM_LIST_FETCH = 'CURRICULUM_LIST_FETCH' // 查询所有课程

const CHAPTER_LIST_FETCH = 'CHAPTER_LIST_FETCH' // 查询课程下的所有章节
const EXAM_ERROR_STATISTICAL = 'EXAM_ERROR_STATISTICAL' // 我的错题

// 题库课程章节


// 题库查询接口： subject/subject-list  （没有参数）
// 题库课程接口：	/subject/field-list/{questionsId}
// 题库课程章节接口：/subject/konwled-list/{fieldId}
// 随机练习：/subject/practice-test/{fieldId}
// 智能练习：subject/igence/{fieldId}
// 错题分类：/subject/error-count/{questionsId}

/**
     * 查询课程下的所有章节
     * */

    // subject/chapter-list
    // 参数：fieldId  值1
    
    /**
         * 查询所有课程
         * */
    // subject/curriculum-list
    // 参数：questionsId 值 1
    /**
         *题型清单
         * */
    // subject/question-type
    // 参数：  无
    
     /**
         * 未审核题目清单
         *
         * */
      // subject/question-unaudited
      // 参数1： fieldId  值1
      // 参数2：questionTypeId   1

export function createStore () {
  return new Vuex.Store({
    state: {
      isLogin: false,
      userInfo: false,
      tikuList: {}, // 题库tabs
      fieldList: {}, // 题库列表
      konwledList: {},
      practiceList: {},
      igenceList: {},
      errorList: {},
      chapterList: [],
      curriculumList: [],
      myErrorList: [],
    },
    mutations: {
      [INDEX_SET](state, data){
        state[data['target']] = data.data 
      }
    },
    actions: {
      [TIKU_LIST_FETCH]({commit}, params){
        return api.get('/subject/subject-list', params).then(res => {
          commit('INDEX_SET', {
            target: 'tikuList',
            data: res.object
          })
        })
      },
      [FIELD_LIST_FETCH]({commit}, params){
        return api.post('/subject/field-list', params).then(res => {
          commit('INDEX_SET', {
            target: 'fieldList',
            data: res.object
          })
        })
      },
      [KONWLED_LIST_FETCH]({commit}, params){
        return api.post('/subject/konwled-list', params).then(res => {
          commit('INDEX_SET', {
            target: 'konwledList',
            data: res.object
          })
        })
      },
      [PRACTICE_LIST_FETCH]({commit}, params){
        return api.post('/subject/practice-test', params).then(res => {
          commit('INDEX_SET', {
            target: 'practiceList',
            data: res.object
          })
        })
      },
      [IGENCE_LIST_FETCH]({commit}, params){
        return api.post('/subject/igence', params).then(res => {
          commit('INDEX_SET', {
            target: 'igenceList',
            data: res.object
          })
        })
      },
      [ERROR_LIST_FETCH]({commit}, params){
        return api.post('/subject/error-count', params).then(res => {
          commit('INDEX_SET', {
            target: 'errorList',
            data: res.object
          })
        })
      },
      [CURRICULUM_LIST_FETCH]({commit}, params){
        return api.post('/subject/curriculum-list', params).then(res => {
          commit('INDEX_SET', {
            target: 'curriculumList',
            data: res.object
          })
          return res.object
        })
      },
      [CHAPTER_LIST_FETCH]({commit}, params){
        return api.post('/subject/chapter-list', params).then(res => {
          commit('INDEX_SET', {
            target: 'chapterList',
            data: res.object
          })
          return res
        })
      },
      [EXAM_ERROR_STATISTICAL]({commit}, params){
        return api.post('/subject/error-Statistical', params).then(res => {
          commit('INDEX_SET', {
            target: 'myErrorList',
            data: res.object
          })
        }) 
      },
      
    },
    modules: {
      home, account, question, exam
    }
  })
}
