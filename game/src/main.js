// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'lib-flexible'
import Vue from 'vue'
import App from './App'
import router from './router'
import Velocity from 'velocity-animate'
import promise from 'es6-promise'
import axios from 'axios'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import qs from 'qs'
window.Swiper = Swiper
window.Velocity = Velocity
promise.polyfill()
// 处理post参数的formdata格式化
axios.defaults.transformRequest = [function (data) {
  return qs.stringify(data)
}]

Vue.config.productionTip = false
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
