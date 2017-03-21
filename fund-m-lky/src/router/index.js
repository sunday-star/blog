import Vue from 'vue'
import Router from 'vue-router'
import Nofound from 'views/Nofound'

const tradeIndex = r => require.ensure([], () => r(require('../views/trade/index.vue')))
const newsIndex = r => require.ensure([], () => r(require('../views/news/index.vue')))
const mineIndex = r => require.ensure([], () => r(require('../views/mine/index.vue')))
// fund
const fundIndex = r => require.ensure([], () => r(require('../views/fund/index.vue')), 'g-fund')
const fundManage = r => require.ensure([], () => r(require('../views/fund/manage.vue')), 'g-fund')
const fundRepay = r => require.ensure([], () => r(require('../views/fund/repay.vue')), 'g-fund')
const fundDetail = r => require.ensure([], () => r(require('../views/fund/detail.vue')), 'g-fund')
const fundIntro = r => require.ensure([], () => r(require('../views/fund/intro.vue')), 'g-fund')
const fundDevelopment = r => require.ensure([], () => r(require('../views/fund/development.vue')), 'g-fund')
const fundComment = r => require.ensure([], () => r(require('../views/fund/comment.vue')), 'g-fund')

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/error', component: Nofound },
    { path: '', redirect: '/trade' },
    { path: '/trade', component: tradeIndex },
    { path: '/news', component: newsIndex },
    { path: '/mine', component: mineIndex },
    { path: '/fund', component: fundIndex },
    { path: '/fund/manage', component: fundManage },
    { path: '/fund/repay', component: fundRepay },
    { path: '/fund/detail', component: fundDetail, meta: { requireAuth: true, navbarHide: true }},
    { path: '/fund/intro', component: fundIntro},
    { path: '/fund/development', component: fundDevelopment},
    { path: '/fund/comment', component: fundComment, meta: { requireAuth: true, navbarHide: true}}
  ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requireAuth)) {
        router.app.$toast('需要验证')
        next()
    } else {
        next()
    }
})

export default router
