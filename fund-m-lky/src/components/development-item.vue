<template>
  <div class="development-item">
    <div class="time">{{item.addtime}}</div>
    <div class="text">{{item.text}}</div>
    <div class="flex">
      <div class="pic" v-for="i in item.picture"><img :src="i.url" v-if="typeof i === 'object'"><img :src="i" v-else></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        default: function () {
          return {}
        }
      }
    }
  }
</script>

<style lang="stylus">
  .development-item
    padding: 12px
    &:not(:first-child)
      border-top: 1px solid #eee
    .time
      font-size: 16px
    .text
      font-size: 14px
      line-height: 1.5
    .pic
      background: #eee
      min-height: 40px
      margin-top: 5px
      // text-align: center
      width: 31%
      &:not(:first-child)
        margin-left: 3.5%
      img
        display: block
        vertical-align: middle
        width: 100%
</style>
