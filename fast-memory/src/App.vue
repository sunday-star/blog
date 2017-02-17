<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
@import './assets/css/base.css';
html, body {background-color: #f44040;height: 100%;}
#app {height: 100%;}
</style>
