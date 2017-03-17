<template>
  <div class="fund">
    <headbar>
      众筹大厅
      <router-link slot="right" :to="{path: '/fund/manage'}"><i class="icon-manage"></i></router-link>
    </headbar>
    <slider :slideItems="fundBanners"></slider>
    <div class="flex">
      <div class="text-center">
        <p class="orange">{{total}}</p>项目总计
      </div>
      <div class="text-center">
        <p class="orange">{{fund.buyer_num}}</p>支持人数
      </div>
      <div class="text-center">
        <p class="orange">{{fund.fund_money}}</p>共筹集资金
      </div>
    </div>
    <div class="fund-list" v-scroll="onScroll">
      <fund-item v-for="item in fundItems" :item="item"></fund-item>
    </div>
  </div>
</template>

<script>
  import slider from '../../components/slider.vue'
  import fundItem from '../../components/fund-item.vue'
  export default {
    components: {
      slider,
      fundItem
    },
    data () {
      return {
        fund: '',
        total: '',
        fundBanners: [],
        fundItems: []
      }
    },
    methods: {
      onScroll () {
        console.log('123')
      }
    },
    mounted () {
      this.$http.get('/api/index').then(res => {
        if (res.status >= 200 && res.status < 300) {
          if (res.data && res.data.error === '0') {
            this.fund = res.data.data
            this.total = res.data.total
            this.fundBanners = res.data.data.banner
            this.fundItems = res.data.data.fund
          }
        }
      }).catch(err => {
        this.$app.error(err)
      })
    }
  }
</script>

<style lang="stylus">
  .fund
    .orange
      color: #ff6053
    > .flex
      background: #fff
      font-size: 14px
      line-height: 1.8
      margin-bottom: 12px
      padding: 12px
      .text-center
        flex: 1 1 auto
        position: relative
        &:not(:first-child):after
          background: #eee
          content: ''
          height: 100%
          left: 0
          position: absolute
          top: 0
          width: 1px
</style>
