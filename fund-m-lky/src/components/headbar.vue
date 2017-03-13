<template>
  <div class="place" :style="{ height: height + 'px' }">
    <div class="headbar" :style="{ height: height + 'px', 'line-height': height + 'px' }">
      <slot name="left"></slot>
      <slot></slot>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      height: {
        type: Number,
        default: 46
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .headbar
    background-color: #ff6502
    color: #fff
    left: 50%
    position: fixed
    text-align: center
    top: 0
    transform: translateX(-50%)
    width: 100%
</style>
