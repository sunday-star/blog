<template>
  <div class="manage-item">
    <div class="head flex between">
      <div>{{itemTitle}}</div>
      <div><slot name="head"></slot></div>
    </div>
    <slot name="body"></slot>
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
    },
    computed: {
      itemTitle () {
        if (typeof this.item.fund === 'undefined') {
          return this.item.title
        } else if (this.item.fund && this.item.fund.title) {
          return this.item.fund.title
        }
      }
    }
  }
</script>

<style lang="stylus">
  .manage-item
    margin-top: 12px
    .head
      background: #fff
      border-bottom: 1px solid #eee
      font-size: 14px
      padding: 12px
    .body
      background: #fff
      padding: 12px
</style>
