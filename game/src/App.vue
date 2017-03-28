<template>
  <div id="app">
    <img src="./assets/logo.png">
    <transition :css="false"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
      v-on:enter-cancelled="enterCancelled"
      v-on:before-leave="beforeLeave"
      v-on:leave="leave"
      v-on:after-leave="afterLeave"
      v-on:leave-cancelled="leaveCancelled"
    >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    beforeEnter (el) {
      el.style.opacity = 0
    },
    enter (el, done) {
      window.Velocity(el, {opacity: 1}, 300)
      done()
    },
    afterEnter (el) {
      console.log('after enter')
    },
    enterCancelled (el) {
      console.log('enter cancelled')
    },
    beforeLeave (el) {
      console.log('before leave')
    },
    leave (el, done) {
      done()
    },
    afterLeave (el) {
      console.log('after leave')
    },
    leaveCancelled (el) {
      console.log('leave cancelled')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
