<template>
  <div class="fund-item">
    <router-link :to="{path: '/fund/detail', query: {id: item.id}}"><img :src="item.picture" :alt="item.title"></router-link>
    <div class="flex between">
      <span>目标金额</span>
      <span class="orange">{{item.target}}{{item.show_coin.code}}</span>
    </div>
    <!-- loading -->
    <div class="loading">
      <div class="loading-percent" :style="{width: item.recent / item.target * 100 + '%'}"></div>
    </div>
    <div class="flex between">
      <div class="text-center">
        <p>已达</p>
        {{(item.recent / item.target * 100).toFixed(2)}}%
      </div>
      <div class="text-center">
        <p>筹集金额</p>
        {{item.recent}}
      </div>
      <div class="text-center">
        <p>剩余天数</p>
        {{Math.ceil(item.left_time / 86400)}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      item: {}
    }
  }
</script>

<style lang="stylus">
  .fund-item
    background-color: #fff
    font-size: 14px
    line-height: 1.8
    padding: 12px
    &:not(:first-child)
      border-top: 1px solid #eee
    > a
      display: block
      margin-bottom: 5px
      img
        display: block
        width: 100%
    .orange
      color: #ff6503
    .loading
      background-color: #eee
      border-radius: 10px
      height: 15px
      margin: 5px 0
      overflow: hidden
      width: 100%
      &-percent
        background-color: #ff6503
        height: 100%
</style>
