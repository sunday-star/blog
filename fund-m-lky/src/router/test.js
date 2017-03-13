export default [
  { path: '/error', component: require('../views/Nofound.vue')},
  { path: '', redirect: '/trade' },
  { path: '/trade', component: require('../views/trade/index')}
]
