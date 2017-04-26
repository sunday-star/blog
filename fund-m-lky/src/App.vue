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
          {name: '交易', 'route': { href: 'http://www.luokeyun.com/m/trade/index.html' }, icon: 'icon-deal'},
          {name: '众筹', 'route': { path: '/fund' }, icon: 'icon-fund'},
          {name: '资讯', 'route': { href: 'http://www.luokeyun.com/m/news/index.html?id=2'}, icon: 'icon-news'},
          {name: '我的', 'route': { href: 'http://www.luokeyun.com/m/user/index.html'}, icon: 'icon-user'}
        ]
      }
    },
    mounted () {
      this.$app.init(this)
    },
    methods: {
      beforeEnter (el) {
        console.log('before enter')
      },
      enter (el, done) {
        console.log('enter')
        done()
      }
    },
    watch: {
      '$route' (to, from) {
        document.body.scrollTop = 0
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
  .icon-save
    background: url('./assets/img/icon-save.png') no-repeat left top
    background-size: 100% 100%
    display: inline-block
    height: 20px
    margin-right: 5px
    vertical-align: middle
    width: 23px
  .icon-save-no
    background: url('./assets/img/icon-save-no.png') no-repeat left top
    background-size: 100% 100%
    display: inline-block
    height: 20px
    margin-right: 5px
    vertical-align: middle
    width: 23px
  .icon-back
    background: url('./assets/img/left.png') no-repeat center center
    background-size: 100% 100%
    display: inline-block
    height: 24px
    margin-left: -3px
    margin-top: 9px
    width: 24px
  .icon-right
    background: url('./assets/img/right.png') no-repeat center center
    background-size: 100% 100%
    display: inline-block
    height: 24px
    width: 24px
  .icon-plus
    background: url('./assets/img/plus.png') no-repeat center center
    background-size: 100% 100%
    display: inline-block
    height: 24px
    width: 24px
  .icon-deal
    background: url('./assets/img/icon-deal.png') no-repeat center center
    background-size: 100% 100%
  .icon-fund
    background: url('./assets/img/icon-fund.png') no-repeat center center
    background-size: 100% 100%
  .icon-news
    background: url('./assets/img/icon-news.png') no-repeat center center
    background-size: 100% 100%
  .icon-user
    background: url('./assets/img/icon-user.png') no-repeat center center
    background-size: 100% 100%
  .active
    .icon-deal
      background: url('./assets/img/icon-deal-active.png') no-repeat center center
      background-size: 100% 100%
    .icon-fund
      background: url('./assets/img/icon-fund-active.png') no-repeat center center
      background-size: 100% 100%
    .icon-news
      background: url('./assets/img/icon-news-active.png') no-repeat center center
      background-size: 100% 100%
    .icon-user
      background: url('./assets/img/icon-user-active.png') no-repeat center center
      background-size: 100% 100%
  .icon-manage
    background: url('./assets/img/icon-manage.png') no-repeat center center
    background-size: 100% 100%
    display: inline-block
    height: 24px
    margin-top: 8px
    width: 24px
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
      position: relative
  .text-center
    text-align: center
  .orange
    color: #ff6503
  .no-data
    background: #fff
    font-size: 14px
    padding: 12px
</style>
