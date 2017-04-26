<template>
  <router-link :to="prop.route" class="navbar-item" active-class="active" v-if="prop.route.path">
    <slot></slot>
  </router-link>
  <a :href="prop.route.href" class="navbar-item" v-else><slot></slot></a>
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
    text-align: center
    &.active
      background: rgba(0,0,0,.1)
      color: #ff6503
    span
      display: block
      height: 22px
      margin: 6px auto 2px
      width: 27px
</style>
