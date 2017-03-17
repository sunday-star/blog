<template>
  <div class="fund-comment">
    <headbar><router-link class="icon-back" :to="{path: '/fund/detail?id=' + this.$route.query.id}" slot="left"></router-link>更多评论</headbar>
    <div class="comment-list">
      <transition-group name="list">
        <comment-item v-for="item in commentItems" :item="item" :key="item"></comment-item>
      </transition-group>
    </div>
    <div class="comment-repay">
      <div class="flex">
        <input type="text" class="input" v-model="comment">
        <a class="btn" @click="postComment">发布</a>
      </div>
    </div>
  </div>
</template>

<script>
  import commentItem from '../../components/comment-item.vue'
  export default {
    components: {
      commentItem
    },
    data () {
      return {
        commentItems: [],
        comment: ''
      }
    },
    mounted () {
      this.getComments()
    },
    methods: {
      getComments () {
        this.$http.get('/api/fund/comment?id=' + this.$route.query.id + '&sid=' + this.$app.sid()).then(res => {
          if (res.status >= 200 && res.status < 300) {
            if (res.data && res.data.error === '0') {
              this.commentItems = res.data.data.comment
            }
          }
        })
      },
      postComment () {
        let data = {
          fund_id: this.$route.query.id,
          sid: this.$app.sid(),
          content: this.comment
        }
        this.$http.post('/api/user/comment', data).then(res => {
          if (res.status >= 200 && res.status < 300) {
            this.$toast(res.data.tips)
            if (res.data && res.data.error === '0') {
              this.getComments()
            }
          }
        })
      }
    }
  }
</script>

<style lang="stylus">
  .list-enter-active,.list-leave-active
    transition: all 1s
  .list-enter,.list-leave-active
    opacity: 0
    transform: translateY(-30px)
  .list-leave-active
    position: absolute
  .fund-comment
    padding-bottom: 50px
    .comment-repay
      background: #f2f2f2
      bottom: 0
      height: 50px
      left: 0
      position: fixed
      width: 100%
      .flex
        height: 30px
        line-height: 30px
        margin: 10px 12px
      .input
        background: none
        border-bottom: 1px solid #ff6053
        flex: 1
        font-size: 14px
      .btn
        background: #ff6053
        border-radius: 5px
        color: #fff
        font-size: 14px
        text-align: center
        width: 60px
</style>