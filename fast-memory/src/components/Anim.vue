<template>
  <div class="anim">
    <anim-item v-for="(item, index) in arr" :items="arr" :index="index">{{item}}</anim-item>
  <div>
</template>

<script>
  import animItem from './Anim-item.vue'
  export default {
    components: {
      animItem
    },
    props: {
      arr: {
        type: Array,
        default: function () {
          return []
        }
      }
    }
  }
</script>

<style lang="stylus">
  .anim
    background-color: rgba(0,0,0,.5)
    display: flex
    flex-wrap: wrap
    &-item
      color: #fff
      font-size: 30px
      text-align: center
</style>
