// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'lib-flexible'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import util from './util.js'
import FastClick from 'fastclick'
import promise from 'es6-promise'
import qs from 'qs'
import Swiper from 'swiper'
import Velocity from 'velocity-animate'
import 'swiper/dist/css/swiper.min.css'
import 'animate.css'
import install from './components/install.js'
import scroll from './components/scroll.js'
window.Swiper = Swiper
window.Velocity = Velocity
promise.polyfill()

Vue.use(scroll)
Vue.use(install)
import headbar from 'components/headbar'
Vue.component('headbar', headbar)

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', () => {
    FastClick.attach(document.body)
  }, false)
}
// 处理post参数的formdata格式化
axios.defaults.transformRequest = [function (data) {
  return qs.stringify(data)
}]

Vue.prototype.$app = util
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
