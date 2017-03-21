<template>
  <div class="comment-item">
    <div class="flex">
      <img class="img" :src="authorAvatar" alt="123">
      <div class="text">
        <p>{{authorName}}</p>
        <p style="color: #999">{{item.addtime}}</p>
      </div>
      <a @click="repayBack" v-if="item.repayShow">{{item.repayBack ? '回复' : '取消'}}</a>
    </div>
    <div class="text">{{item.text}}</div>
    <div class="repay" v-if="item.refer">
      <span style="color: #ff6503">{{item.refer.author.name}}:</span><span v-html="item.refer.content"></span>
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
    },
    computed: {
      authorAvatar () {
        if (this.item && this.item.author) {
          return this.item.author.avatar
        }
      },
      authorName () {
        if (this.item && this.item.author) {
          return this.item.author.name
        }
      }
    },
    methods: {
      repayBack () {
        this.$emit('repay')
      }
    }
  }
</script>

<style lang="stylus">
  .comment-item
    background: #fff
    padding: 12px
    &:not(:first-child)
      border-top: 1px solid #ddd
    .flex
      align-items: center
      position: relative
      a
        color: blue
        position: absolute
        right: 0px
        top: 10px
      .img
        border-radius: 50%
        height: 40px
        width: 40px
      .text
        font-size: 14px
        padding-left: 12px
    .text
      font-size: 14px
      padding: 5px 0
      position: relative
    .repay
      background: #f2f2f2
      font-size: 14px
      padding: 5px 15px
</style>
