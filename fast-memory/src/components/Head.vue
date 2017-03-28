<template>
  <div class="head">
    <a href=""></a>
    <div class="time"></div>
    <a href=""></a>
  </div>
</template>

<script>
  export default {
    props: {
      time: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        timeCopy: ''
      }
    },
    compouted: {
      timeFormat () {
      }
    },
    methods: {
      timeTick () {}
    }
  }
</script>

<style lang="stylus">
  .head
    height: 50px
</style>
