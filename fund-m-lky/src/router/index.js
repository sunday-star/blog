import Vue from 'vue'
import Router from 'vue-router'
import Nofound from 'views/Nofound'
// fund
const fundIndex = r => require.ensure([], () => r(require('../views/fund/index.vue')))
const tradeIndex = r => require.ensure([], () => r(require('../views/fund/index.vue')))

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/no', component: Nofound },
    { path: '', redirect: '/trade' },
    { path: '/trade', component: tradeIndex },
    { path: '/fund', component: fundIndex }
  ]
})
