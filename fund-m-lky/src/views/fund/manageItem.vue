<template>
  <div class="fund-manage">
    <headbar><router-link class="icon-back" to="/fund/manage" slot="left"></router-link>众筹管理</headbar>
    <div>          
      <div class="title">众筹统计</div>
      <div class="content">
        <div class="flex border">
          <div class="item text-center">
            <p class="orange">{{fund.target}}</p>目标金额
          </div>
          <div class="item text-center">
            <p class="orange">{{fund.recent}}</p>已筹集金额
          </div>
        </div>
        <div class="flex">
          <div class="item text-center">
            <p class="orange">{{fund.percent}}%</p>已达
          </div>
          <div class="item text-center">
            <p class="orange">{{Math.ceil(fund.left_time / 86400)}}</p>剩余时间
          </div>
          <div class="item text-center">
            <p class="orange">{{fund.buyer_num}}</p>支持人数
          </div>
          <div class="item text-center">
            <p class="orange">{{fund.collect_num}}</p>收藏人数
          </div>
        </div>
      </div>
      <div class="title">众筹用户</div>
      <div class="content">暂无众筹用户</div>
      <div class="title flex between"><div>众筹进度</div><router-link class="btn" :to="{path: '/fund/development/add?id=' + this.$route.params.id}">添加众筹进度</router-link></div>
      <div class="content">
        <div class="development-list">
          <transition-group name="list">
            <development-item v-for="item in items" :item="item" :key="item"></development-item>
          </transition-group>
        </div>
        <div class="no-data" v-if="items.length === 0" style="padding: 0">暂无项目进展</div>
      </div>
    </div>
  </div>
</template>

<script>
  import developmentItem from '../../components/development-item.vue'
  export default {
    data () {
      return {
        fund: '',
        order: [],
        items: []
      }
    },
    mounted () {
      this.$http.get('http://www.luokeyun.com/fundadmin/api/user/fund_order?id=' + this.$route.params.id + '&sid=' + this.$app.sid()).then(res => {
        if (res.status >= 200 && res.status < 300) {
          if (res.data && res.data.error === '0') {
            this.fund = res.data.data.fund
            this.order = res.data.data.order
          }
        }
      }).catch(err => {
        this.$app.error(err)
      })
      this.$http.get('http://www.luokeyun.com/fundadmin/api/fund/development?id=' + this.$route.query.id + '&sid=' + this.$app.sid()).then(res => {
        if (res.status >= 200 && res.status < 300) {
          if (res.data && res.data.error === '0') {
            this.items = res.data.data.development
          }
        }
      }).catch(err => {
        this.$app.error(err)
      })
    }
  }
</script>

<style lang="stylus" scoped>
  .fund-manage
    .title
      background-color: #fff
      border-bottom: 1px solid #eee
      color: #333
      font-size: 14px
      padding: 10px 12px
      &:not(:first-child)
        margin-top: 12px
      &.flex
        align-items: center
      .btn
        background-color: #ff6503
        border-radius: 2px
        color: #fff
        float: right
        font-size: 12px
        padding: 5px 10px
    .content
      background-color: #fff
      font-size: 14px
      padding: 12px
      .flex
        font-size: 14px
        line-height: 2
        &.border
          .item:not(:first-child):after
            background-color: #eee
            content: ''
            height: 100%
            left: 0
            position: absolute
            top: 0
            width: 1px
</style>
