<template>
  <router-link :to="prop.route" class="navbar-item" active-class="active">
    <slot></slot>
  </router-link>
</template>

<script>
  export default {
    name: 'navbar-item',
    props: {
      prop: {
        type: Object,
        default: function () {
          return {}
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .navbar-item
    flex: 1
    line-height: 50px
    text-align: center
    &.active
      background: rgba(0,0,0,.1)
</style>
