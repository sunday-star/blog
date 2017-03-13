<template>
  <div class="place">
    <div class="headbar">
      <div class="headbar-left">
        <slot name="left"></slot>
      </div>
      <slot></slot>
      <div class="headbar-right">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .place
    height: 46px
  .headbar
    background-color: #ff6502
    color: #fff
    height: 46px
    left: 50%
    line-height: 46px
    position: fixed
    text-align: center
    top: 0
    transform: translateX(-50%)
    width: 100%
    &-left
      height: 100%
      left: 15px
      position: absolute
      top: 0
    &-right
      position: absolute
      right: 15px
      top: 0
</style>
