<template>
  <div class="place">
    <div class="navbar" :style="{'background': bg }">
      <navbar-item v-for="(item, i) in items" :prop="item">{{item.name}}</navbar-item>
    </div>
  </div>
</template>

<script>
  import navbarItem from './navbar-item'
  export default {
    components: {
      navbarItem
    },
    props: {
      bg: {
        type: String,
        default: '#ececec'
      },
      param: {},
      items: {
        type: Array,
        default: function () {
          return []
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .place
    height: 50px
  .navbar
    bottom: 0
    display: flex
    height: 50px
    left: 50%
    position: fixed
    transform: translateX(-50%)
    width: 100%
</style>
