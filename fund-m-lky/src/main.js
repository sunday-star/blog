// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'lib-flexible'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import util from './util.js'
import FastClick from 'fastclick'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
window.Swiper = Swiper
require('es6-promise').polyfill()

import headbar from 'components/headbar'
Vue.component('headbar', headbar)

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', () => {
    FastClick.attach(document.body)
  }, false)
}

Vue.prototype.$app = util
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
