import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '', redirect: '/home'},
    {path: '/home', component: require('../views/home.vue')},
    {path: '/about', component: require('../views/about.vue')},
    {path: '/user', component: require('../views/user.vue')}
  ]
})
