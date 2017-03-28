<template>
  <transition appear v-on:before-appear="beforeAppear" v-on:appear="appear">
    <div class="key">
      <div class="key-item" v-for="item in items" @click="itemHandler(item)">{{item}}</div>
    </div>
  </transition>
</template>

<script>
  export default {
    data () {
      return {
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 'R', 0, 'C']
      }
    },
    methods: {
      itemHandler (key) {
        this.$emit('click', key)
      },
      beforeAppear (el) {
        el.style.opacity = 0
      },
      appear (el) {
        window.Velocity(el, {opacity: 1}, 1000)
      }
    }
  }
</script>

<style lang="stylus">
  .key
    background-color: rgba(255, 255, 255, .5)
    box-sizing: border-box
    bottom: 0
    display: flex
    flex-wrap: wrap
    left: 0%
    position: fixed
    width: 100%
    z-index: 1000
    &-item
      background-color: rgba(0, 0, 0, 0.5)
      box-sizing: border-box
      color: #ddd
      cursor: pointer
      font-size: 16px
      font-weight: bold
      height: 42px
      line-height: 42px
      text-align: center
      width: 33.3333%
</style>
