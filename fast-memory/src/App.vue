<template>
  <div id="app">
    <router-view :css="false"
      v-on:before-enter="beforeEnter"
    ></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    methods: {
      beforeEnter (el) {
        console.log('el')
      }
    }
  }
</script>

<style>
  @import './assets/css/base.css';
  html, body {background-color: #f44040;height: 100%;}
  #app {height: 100%;}
</style>
