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
const Judge = () => import('../views/Judge.vue') // 当判官
const Examiner = () => import('../views/Examiner.vue') // 当考官
const itemList = () => import('../views/itemList.vue') // 智能题库
const Examination = () => import('../views/Examination.vue') // 考试题目
const Trial = () => import('../views/Trial.vue') // 审题





const Questions = () => import('../views/Questions/Index.vue') // 所有题库
// const Occupation = () => import('../views/Questions/Occupation.vue') // 职业
// const Economics = () => import('../views/Questions/Economics.vue') // 经济
// const Finance = () => import('../views/Questions/Finance.vue') // 金融
// const Certificate = () => import('../views/Questions/Certificate.vue') // 证书





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
      // 题库
      { path: '/questions/:id', name: 'questions', component: Questions },
      
      // { path: '/questions/:id', component: Questions,
      //   children: [{
      //     path: '/',  name: 'occupation', component: Questions
      //   },{
      //     path: ':id',  component: Questions,
      //   }]
      //   // {
      //   //   path: 'occupation',  component: Occupation
      //   // },{
      //   //   path: 'economics',  name: 'economics', component: Economics
      //   // },{
      //   //   path: 'finance',  name: 'finance', component: Finance
      //   // },{
      //   //   path: 'certificate',  name: 'certificate', component: Certificate
      //   // }
      // },
      
      // 考试题 
      { path: '/examination', name: 'examination', component: Examination },
      // 审题
      { path: '/trial', component: Trial,
        children: [{
          path: ':id', name: 'trial', component: Trial,
        }]
    },
      
      
      
      { path: '/myerror', name: 'myerror', component: MyError },
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
      

      

      // { path: '/search', component: Search },


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
