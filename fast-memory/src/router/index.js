import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '', redirect: '/hello'},
    {path: '/hello', component: require('components/Hello')},
    {path: '/game', component: require('components/Game')}
  ]
})
