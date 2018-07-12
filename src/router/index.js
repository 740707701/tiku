import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// route-level code splitting
const Home = () => import(
  /* webpackChunkName: "home" */
  /* webpackModel: "modelName" */
  '../views/Index.vue'
)

// const createListView = id => () => import('../views/CreateListView').then(m => m.default(id))
const Exam = () => import('../views/Exam.vue')     // 考试页面
const LatestTest = () => import('../views/LatestTest.vue') // 最新考试
const MyTest = () => import('../views/MyTest.vue')  // 我的考试
const MyError = () => import('../views/MyError.vue') // 我的错题
const ErrorList = () => import('../views/ErrorList.vue') // 我的错题列表
const MyRecord = () => import('../views/MyRecord.vue') //我的记录

const Judge = () => import('../views/Judge.vue') // 当判官
const Examiner = () => import('../views/Examiner.vue') // 当考官
const itemList = () => import('../views/ItemList.vue') // 智能题库
const Examination = () => import('../views/Examination.vue') // 考试题目
const Trial = () => import('../views/Trial.vue') // 审题
const TrialList = () => import('../views/TrialList.vue') // 审题列表
const JudgeList = () => import('../views/JudgeList.vue') // 考官出题
const Questions = () => import('../views/Questions/Index.vue') // 所有题库

// 404
const NotFoundComponent = () => import('../views/NotFound.vue')


export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/', name: 'index', component: Home },

      { path: '/exam', component: Exam,
        children: [{
          path: '/',  name: 'latest', component: LatestTest
        },{
          path: 'latest', component: LatestTest
        },{
          path: 'mytest',  name: 'mytest', component: MyTest
        }]
      },
      //我的记录
      {
        path: '/myRecord',
        name: 'myRecord',
        component: MyRecord
      },
      // 题库
      { path: '/questions/:id', name: 'questions', component: Questions },
      { path: '/judgelist/:id', name: 'judgelist', component: JudgeList },

      // 考试题
      { path: '/examination', component: Examination ,
        children: [{
          path: ':examId/:examPaperId', name: 'examination', component: Examination,
        }]
      },
      // 审题
      { path: '/triallist/:id', name: 'triallist', component: TrialList },

      { path: '/trial', component: Trial,
        children: [{
          path: ':fieldId', name: 'trial', component: Trial,
        }]
      },
      { path: '/myerror/:id', name: 'myerror', component: MyError },
      { path: '/errorlist', component: ErrorList,
        children: [{
          path: ':fieldId/:questionTypeId', name: 'errorlist', component: ErrorList
        }]
      },
      { path: '/judge', name: 'judge', component: Judge },
      { path: '/examiner', component: Examiner,
        children: [{
          path: ':fieldId/:pointId/:questionTypeId', name: 'examiner', component: Examiner
        }]
      },
      { path: '/itemlist', component: itemList,
        children: [{
          path: ':fieldId/:pointId/:questionTypeId', name: 'itemlist', component: itemList
        }]
      },
      // 404页面，确保在路由最后
      { path: '*', name:'404', component: NotFoundComponent }
    ]
    // routes: [
    //   { path: '/top/:page(\\d+)?', component: createListView('top') },
    //   { path: '/new/:page(\\d+)?', component: createListView('new') },
    //   { path: '/show/:page(\\d+)?', component: createListView('show') },
    //   { path: '/ask/:page(\\d+)?', component: createListView('ask') },
    //   { path: '/job/:page(\\d+)?', component: createListView('job') },
    //   { path: '/item/:id(\\d+)', component: ItemView },
    //   { path: '/user/:id', component: UserView },
    //   { path: '/', redirect: '/top' }
    // ]
  })
}
