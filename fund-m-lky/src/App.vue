<template>
  <div class="app" style="height: 100%;">
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
    <nav-bar :items="navbarItems" v-show="navbarShow"></nav-bar>
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
        navbarShow: true,
        transitionName: 'slide-left',
        navbarItems: [
          {name: '交易', 'route': { path: '/trade' }, icon: ''},
          {name: '众筹', 'route': { path: '/fund' }, icon: ''},
          {name: '资讯', 'route': { path: '/news'}, icon: ''},
          {name: '我的', 'route': { path: '/mine'}, icon: ''}
        ]
      }
    },
    mounted () {
      this.$app.init(this)
    },
    watch: {
      '$route' (to, from) {
        if (to.meta.navbarHide) {
          this.navbarShow = false
        } else {
          this.navbarShow = true
        }
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
    transition: all 0.3s ease
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
  .fade-enter-active,.fade-leave-active
    transition: opacity 1s ease
  .fade-enter,.fade-leave-active
    opacity: 0
  .img
    display: block
    width: 100%
  .flex
    display: flex
    &.between
      justify-content: space-between
    .item
      flex: 1
  .text-center
    text-align: center
  .orange
    color: #ff6503
  .a-back
    left: 20px
    height: 15px
    position: absolute
    top: 10px
    width: 15px
    border-width: 3px
    border-color: #fff transparent transparent #fff
    border-style: solid
    transform: rotate(-45deg)
</style>
