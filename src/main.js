import Vue from 'vue'
import App from './App.vue'

import router from '@/router'

import TypeNav from '@/components/TypeNav'

import store from './store'

import '@/mock/mockServe'

import 'swiper/css/swiper.css'

import Pagination from '@/components/Pagination'
// 统一引入api
import * as API from '@/api'
import { MessageBox } from 'element-ui'

import '@/plugins/validate'
import v from '@/assets/logo.png'
// 引入图片懒加载插件
import VueLazyload from 'vue-lazyload'

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.use(VueLazyload,{
  loading:v
})

Vue.component(TypeNav.name, TypeNav)

Vue.component(Pagination.name, Pagination)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  router,
  store
}).$mount('#app')
