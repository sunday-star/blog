<template>
  <div class="navbar-item" @click="routerPush">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      prop: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    methods: {
      routerPush () {
        if (this.prop) {
          this.$router.push(this.prop.route)
        }
      }
    }
  }
</script>

<style lang="less">
  .navbar-item {
    flex: 1;
  }
</style>
