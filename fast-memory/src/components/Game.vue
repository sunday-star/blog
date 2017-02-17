<template>
  <div class="game">
    <v-anim :minShort="10"></v-anim>
    <v-key></v-key>
  </div>
</template>

<script>
  import anim from './Anim.vue'
  import key from './Keyboard.vue'
  export default {
    components: {
      'v-anim': anim,
      'v-key': key
    },
    data () {
      return {
      }
    },
    mounted () {
      this.initView()
    },
    methods: {
      initView () {
      }
    }
  }
</script>

<style lang="less" scoped >
  .game {position: relative;height: 100%;width: 100%;}
</style>
