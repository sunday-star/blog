<template>
  <div class="place" :style="{ height: height + 'px' }">
    <div class="headbar" :style="{ height: height + 'px', 'line-height': height + 'px' }">
      <slot></slot>
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

<style lang="less" scoped>
  .headbar {
    background-color: #ff6502;
    color: #fff;
    text-align: center;
  }
</style>
