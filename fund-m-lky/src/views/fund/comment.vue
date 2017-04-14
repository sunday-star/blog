<template>
  <div class="fund-comment" :class="{'repayBack': repay}">
    <headbar><router-link class="icon-back" :to="{path: '/fund/detail?id=' + this.$route.query.id}" slot="left"></router-link>更多评论</headbar>
    <div class="comment-list">
      <transition-group name="list">
        <comment-item v-for="(item, index) in commentItems" :item="item" :key="item" @repay="repayBack(index, item.author.name)"></comment-item>
      </transition-group>
    </div>
    <div class="no-data" v-if="commentItems.length === 0">暂无项目评论</div>
    <div class="comment-repay">
      <div class="repay-back" v-if="repay"><span style="color: #ff6503">@{{authorName}}</span></div>
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
        comment: '',
        repay: false,
        authorName: ''
      }
    },
    mounted () {
      this.getComments()
    },
    methods: {
      getComments () {
        this.$http.get('http://www.luokeyun.com/fundadmin/api/fund/comment?id=' + this.$route.query.id + '&sid=' + this.$app.sid()).then(res => {
          if (res.status >= 200 && res.status < 300) {
            if (res.data && res.data.error === '0') {
              this.commentItems = res.data.data.comment
              this.$http.get('http://www.luokeyun.com/fundadmin/api/user/index?sid=' + this.$app.sid()).then(res => {
                if (res.status >= 200 && res.status < 300) { // 判断状态码
                  if (res.data && res.data.error === '0') { // 判断后台
                    if (res.data.fund_uid === this.$route.query.creatorId) { // 对比用户id与创建者id是否相同
                      this.commentItems.forEach((item) => { // 添加新属性
                        if (typeof item.repay === 'undefined') {
                          this.$set(item, 'repayShow', true)
                          this.$set(item, 'repayBack', true)
                        }
                      })
                    }
                  }
                }
              }).catch(err => {
                this.$app.error(err)
              })
            }
          }
        }).catch(err => {
          this.$app.error(err)
        })
      },
      postComment () {
        let data = {
          fund_id: this.$route.query.id,
          sid: this.$app.sid(),
          content: this.comment
        }
        if (!this.repay) {
          this.$http.post('http://www.luokeyun.com/fundadmin/api/user/comment', data).then(res => {
            if (res.status >= 200 && res.status < 300) {
              this.$toast(res.data.tips)
              if (res.data && res.data.error === '0') {
                setTimeout(() => {
                  this.comment = ''
                  this.getComments()
                }, 250)
              }
            }
          }).catch(err => {
            this.$app.error(err)
          })
        } else {
          this.$app.post('http://www.luokeyun.com/fundadmin/api/user/refer_comment', )
        }
      },
      repayBack (index, authorName) {
        this.commentItems.forEach((item, i) => {
          if (index === i) {
            this.repay = item.repayBack
            item.repayBack = !item.repayBack
          } else {
            item.repayBack = true
          }
        })
        this.authorName = authorName
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
    &.repayBack
      padding-bottom: 62px
    .comment-repay
      background: #f2f2f2
      bottom: 0
      left: 0
      padding-top: 10px
      position: fixed
      width: 100%
      .repay-back
        padding: 0px 12px
      .flex
        height: 30px
        line-height: 30px
        padding: 0px 12px 10px
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