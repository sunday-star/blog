<template>
  <div class="fund-detail">
    <headbar>
      <router-link class="icon-back" to="/fund" slot="left"></router-link>
      {{title}}
    </headbar>
    <img :src="data.picture" :alt="title" class="img">
    <div class="btn-groups">
      <router-link class="btn-l" :to="{path: '/fund/d/pay', query: {id: data.id}}">我要支持</router-link>
      <a class="btn-r" @click="collectHandler"><i :class="[isSaved ? 'icon-save' : 'icon-save-no'] "></i>收藏</a>
    </div>
    <div class="title">{{title}}</div>
    <div class="content">
      <div class="flex between">
        <div class="text-center">
          <div class="circle">{{data.price}}<span v-if="data.show_coin"></span></div>权益单价
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
    <div class="content">
      <div class="flex creator" v-if="data.creator">
        <img :src="data.creator.avatar">
        <div class="text">
          {{data.creator.name}} <span>发起时间:{{data.addtime}}</span><br>
          <i class="icon-company"></i>{{data.creator.company}}
        </div>
      </div>
    </div>
    <div class="title">项目进展<router-link class="pull-right" :to="{path: '/fund/development', query: {id: data.id}}">查看全部</router-link></div>
    <div class="content" v-if="data.development && data.development.id">
      <development-item :item="data.development"></development-item>
    </div>
    <div class="content" v-else>暂无项目进度</div>
    <div class="title">热门评论<router-link class="pull-right" :to="{path: '/fund/comment', query: {id: data.id, creatorId: creator.id}}">更多评论</router-link></div>
    <div class="content" v-if="data.comment">
      <comment-item :item="data.comment"></comment-item>
    </div>
    <div class="content" v-else>暂无项目评论</div>
    <div class="title">权益说明</div>
    <div class="content" v-html="data.repay"></div>
  </div>
</template>

<script>
  import developmentItem from '../../components/development-item.vue'
  import commentItem from '../../components/comment-item.vue'
  export default {
    components: {
      developmentItem,
      commentItem
    },
    data () {
      return {
        title: '',
        data: '',
        creator: '',
        isSaved: false
      }
    },
    methods: {
      collectHandler () {
        const id = this.$route.query.id
        const sid = this.$app.sid()
        if (this.isSaved) {
          this.$http.get('http://www.luokeyun.com/fundadmin/api/user/del_collect?fund_id=' + id + '&sid=' + sid).then(res => {
            if (res.status >= 200 && res.status < 300) {
              if (res.data && res.data.error === '0') {
                this.$toast(res.data.tips)
                this.isSaved = false
              }
            }
          }).catch(err => {
            this.$app.error(err)
          })
        } else {
          this.$http.get('http://www.luokeyun.com/fundadmin/api/user/collect?fund_id=' + id + '&sid=' + sid).then(res => {
            if (res.status >= 200 && res.status < 300) {
              if (res.data && res.data.error === '0') {
                this.$toast(res.data.tips)
                this.isSaved = true
              }
            }
          }).catch(err => {
            this.$app.error(err)
          })
        }
      }
    },
    mounted () {
      this.$toast.close()
      this.$http.get('http://www.luokeyun.com/fundadmin/api/fund/detail?id=' + this.$route.query.id).then(res => {
        if (res.status >= 200 && res.status < 300) {
          if (res.data && res.data.error === '0') {
            this.title = res.data.data.title
            this.data = res.data.data
            this.creator = res.data.data.creator
            this.isSaved = res.data.data.collect === '1'
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
      font-size: 14px
      margin-bottom: 12px
      overflow: hidden
      padding: 12px
      .creator
        img
          border-radius: 50%
          height: 40px
          margin-right: 12px
          width: 40px
        .text
          font-size: 14px
          line-height: 1.2
          span
            color: #999
            font-size: 12px
        .icon-company
          background: url('../../assets/img/icon-company.png') no-repeat center center
          background-size: 100% 100%
          display: inline-block
          height: 20px
          margin-right: 5px
          vertical-align: middle
          width: 20px
      .development-item,.comment-item
        padding: 0
      .btn
        background: #ff6503
        border-radius: 5px
        color: #fff
        display: block
        font-size: 14px
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
      z-index: 1000
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
        font-size: 16px
        height: 100%
        line-height: 46px
        position: relative
        text-align: center
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
