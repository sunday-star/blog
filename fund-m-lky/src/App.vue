<template>
  <div id="app">
    <router-view></router-view>
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
        navbarItems: [
          {name: '交易', 'route': { path: 'trade' }, icon: ''},
          {name: '众筹', 'route': { path: 'fund' }, icon: ''},
          {name: '资讯', 'route': { path: 'news'}, icon: ''},
          {name: '我的', 'route': { path: 'mine'}, icon: ''}
        ]
      }
    }
  }
</script>

<style>
@import './assets/css/base.css';
</style>
