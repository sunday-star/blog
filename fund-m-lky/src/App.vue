<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
    <nav-bar :items="navbarItems"></nav-bar>
  </div>
</template>

<script>
  import navbar from 'components/navbar'
  export default {
    components: {
      'nav-bar': navbar
    },
    data () {
      return {
        transitionName: 'slide-left',
        navbarItems: [
          {name: '交易', 'route': { path: '/trade' }, icon: ''},
          {name: '众筹', 'route': { path: '/fund' }, icon: ''},
          {name: '资讯', 'route': { path: '/news'}, icon: ''},
          {name: '我的', 'route': { path: '/mine'}, icon: ''}
        ]
      }
    },
    watch: {
      '$route' (to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './assets/css/base.css'
  html,body
    height: 100%
  body
    background-color: #fbf9fe
  .slide-left-enter-active,.slide-right-enter-active
    transition: all .3s ease
  .slide-left-leave-active,.slide-right-leave-active
    transition: all 0.5 cubic-bezier(1.0, 0.5, 0.8, 1.0)
  .slide-left-enter
    transform: translateX(-100%)
    opacity: 0
  .slide-right-enter
    transform: translateX(0%)
    opacity: 0
  .slide-right-leave
    transform: translateX(-100%)
    opacity: 0
</style>
