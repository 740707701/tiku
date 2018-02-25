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
const Exam = () => import('../views/Exam.vue')
const UserView = () => import('../views/UserView.vue')


// 404
const NotFoundComponent = () => import('../views/NotFound.vue')


export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/', name: 'index', component: Home },
      // { path: '/', component: createListView('home') },
      { path: '/exam', name: 'Exam', component: Exam },
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
