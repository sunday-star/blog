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

<style lang="stylus" scoped>
  .place
    height: 42px
  .headbar
    background-color: #ff6502
    color: #fff
    font-size: 16px
    height: 42px
    left: 50%
    line-height: 42px
    position: fixed
    text-align: center
    top: 0
    transform: translateX(-50%)
    width: 100%
    z-index: 1000
    &-left
      height: 100%
      left: 15px
      position: absolute
      top: 0
    &-right
      height: 100%
      position: absolute
      right: 15px
      top: 0
      a,span
        margin-top: 9px
</style>
