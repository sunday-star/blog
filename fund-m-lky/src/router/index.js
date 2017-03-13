import Vue from 'vue'
import Router from 'vue-router'
import Nofound from 'views/Nofound'

const tradeIndex = r => require.ensure([], () => r(require('../views/trade/index.vue')))
const newsIndex = r => require.ensure([], () => r(require('../views/news/index.vue')))
const mineIndex = r => require.ensure([], () => r(require('../views/mine/index.vue')))
// fund
const fundIndex = r => require.ensure([], () => r(require('../views/fund/index.vue')), 'g-fund')
const fundDetail = r => require.ensure([], () => r(require('../views/fund/detail.vue')), 'g-fund')

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/error', component: Nofound },
    { path: '', redirect: '/trade' },
    { path: '/trade', component: tradeIndex },
    { path: '/news', component: newsIndex },
    { path: '/mine', component: mineIndex },
    { path: '/fund', component: fundIndex },
    { path: '/fund/detail', component: fundDetail }
  ]
})
