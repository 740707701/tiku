import Vue from 'vue'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'
import titleMixin from './util/title'
import * as filters from './util/filters'



import { Tabs, TabPane, Select, Table, TableColumn, Button, Option, Checkbox, Row, Col, Dialog, CheckboxGroup,Dropdown, DropdownMenu, Progress, Slider, Cascader, Collapse, CollapseItem, Message, MessageBox} from 'element-ui'
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Select)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)
Vue.use(Option)
Vue.use(Checkbox)
Vue.use(Row)
Vue.use(Col)
Vue.use(Dialog)
Vue.use(CheckboxGroup)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(Progress)
Vue.use(Slider)
Vue.use(Cascader)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.prototype.$message = Message
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm

import './assets/icomoon/style.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css'


// mixin for handling title
Vue.mixin(titleMixin)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export function createApp () {
  // create store and router instances
  const store = createStore()
  const router = createRouter()

  // sync the router with the vuex store.
  // this registers `store.state.route`
  sync(store, router)

  // create the app instance.
  // here we inject the router, store and ssr context to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return { app, router, store }
}
