<template>
  <div class="fund-detail">
    <headbar>
      <router-link class="icon-back" to="/fund" slot="left"></router-link>
      {{title}}
    </headbar>
    <img :src="data.picture" :alt="title" class="img">
    <div class="btn-groups">
      <a href="#" class="btn-l">我要支持</a>
      <a href="#" class="btn-r">收藏</a>
    </div>
    <div class="title">{{title}}</div>
    <div class="content">
      <div class="flex between">
        <div class="text-center">
          <div class="circle">{{data.price}}<span v-if="data.show_coin">{{data.show_coin.code}}</span></div>权益单价
        </div>
        <div class="text-center">
          <div class="circle">{{(data.recent / data.target * 100).toFixed(2)}}%</div>已达
        </div>
        <div class="text-center">
          <div class="circle">{{data.buyer_num}}</div>支持人数
        </div>
      </div>
      <div class="flex">
        <div class="item text-center"><p class="orange">{{data.target}}</p>目标金额</div>
        <div class="item text-center"><p class="orange">{{data.recent}}</p>已筹集金额</div>
      </div>
    </div>
    <div class="title">项目简介</div>
    <div class="content">
      <p v-html="data.intro"></p>
      <router-link class="btn" :to="{path: '/fund/intro', query: {id: data.id}}">项目详情</router-link>
    </div>
    <div class="title">项目发起人</div>
    <div class="content"></div>
    <div class="title">项目进展<router-link class="pull-right" :to="{path: '/fund/development', query: {id: data.id}}">查看全部</router-link></div>
    <div class="content"></div>
    <div class="title">热门评论<router-link class="pull-right" :to="{path: '/fund/comment', query: {id: data.id}}">更多评论</router-link></div>
    <div class="content">
      <comment-item :item="data.comment"></comment-item>
    </div>
    <div class="title">权益说明</div>
    <div class="content" v-html="data.repay"></div>
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
        title: '',
        data: ''
      }
    },
    mounted () {
      this.$toast.close()
      this.$http.get('/api/fund/detail?id=' + this.$route.query.id).then(res => {
        if (res.status >= 200 && res.status < 300) {
          if (res.data && res.data.error === '0') {
            this.title = res.data.data.title
            this.data = res.data.data
          }
        }
      }).catch(err => {
        this.$app.error(err)
      })
    }
  }
</script>

<style lang="stylus" scoped>
  .fund-detail
    padding-bottom: 34px
    .title
      background: #fff
      border-bottom: 1px solid #eee
      color: #333
      font-size: 16px
      padding: 10px 12px
      .pull-right
        color: #999
        float: right
        font-size: 14px
    .content
      background: #fff
      margin-bottom: 12px
      padding: 12px
      .comment-item
        padding: 0
      .btn
        background: #ff6503
        border-radius: 5px
        color: #fff
        display: block
        margin: 5px auto 0
        padding: 10px 0
        text-align: center
        width: 70%
      .circle
        border: 1px solid #ff6503
        border-radius: 50%
        color: #ff6503
        height: 60px
        line-height: 60px
        margin-bottom: 5px
        width: 60px
      .flex
        font-size: 14px
        line-height: 2
        .item
          position: relative
          &:not(:first-child):after
            background: #eee
            content: ''
            height: 80%
            left: 0
            position: absolute
            top: 10%
            width: 1px
    .btn-groups
      bottom: 0
      left: 0
      height: 46px
      overflow: hidden
      position: fixed
      width: 100%
      .btn-l
        background: #ff6503
        color: #fff
        display: block
        float: left
        font-size: 16px
        height: 100%
        line-height: 46px
        text-align: center
        width: 70%
      .btn-r
        background: #f8f8f8
        display: block
        float: right
        height: 100%
        position: relative
        width: 30%
        &:after
          border-color: transparent #f8f8f8 #f8f8f8 transparent
          border-style: solid
          border-width: 24px
          content: ''
          left: -46px
          position: absolute
          top: 0
</style>
