<template>
  <div class="place" :style="{ height: height + 'px' }">
    <div class="navbar" :style="{ height: height + 'px', 'background': bg }">
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
      height: {
        type: Number,
        default: 50
      },
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

<style lang="less" scoped>
  .navbar {
    bottom: 0;display: flex;left: 50%;position: fixed;transform: translateX(-50%);width: 100%;
  }
</style>
