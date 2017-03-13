<template>
  <div class="fund-item">
    <router-link to="fund/detail"><img :src="item.picture" :alt="item.title"></router-link>
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
    padding: 15px
    &:not(:first-child)
      border-top: 1px solid #eee
    > a
      display: block
      img
        width: 100%
</style>
