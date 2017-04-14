<template>
  <div class="fund-pay">
    <headbar><router-link class="icon-back" :to="{path: '/fund/detail', query: {id: this.$route.query.id}}" slot="left"></router-link>我要支持</headbar>
    <div class="title">购买份额</div>
    <div class="coin-list">
      <div class="coin-item" v-for="(item, index) in coin" @click="coinHandler(item.id, index)" :class="{'current' : coinId === item.id}">{{item.name}} <span class="pull-right"><i class="icon-radio"></i></span></div>
    </div>
    <div>
      <div class="coin-input">
        <span>{{price}}{{code}}/份</span>
        <input type="text" placeholder="请输入份额" @focus.once="onFocus" v-model="num">
      </div>
    </div>
    <div class="btn-box"><a class="btn" @click="showMask">提交</a></div>
    <div class="mask animated" :class="maskAnimate" v-show="visible">
      <div class="action">
        <div class="title">购买信息</div>
        <div class="coin-list">
          <div class="coin-item">项目名称：<span class="pull-right">{{data.title}}</span></div>
          <div class="coin-item">购买份额：<span class="pull-right">{{num}}</span></div>
          <div class="coin-item">货品权益：<span class="pull-right">{{price}}{{code}}/份</span></div>
          <div class="coin-item">交易金额：<span class="pull-right">{{price * num}}{{code}}</span></div>
        </div>
        <div>
          <div class="coin-input">
            <input type="password" placeholder="输入交易密码">
          </div>
          <div class="coin-input">
            <a class="coin-input-btn" @click="getCode">{{codeText}}</a>
            <input type="text" placeholder="输入手机验证码">
          </div>
        </div>
        <div class="btn-groups">
          <a class="true">确定购买</a>
          <a class="cancel" @click="hideMask">取消</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        coin: [],
        coinId: '', // 默认币种id
        price: '', // 价格
        code: '', // 默认单位
        showCoin: '',
        data: '',
        visible: false,
        maskAnimate: '',
        num: '',
        codeText: '获取验证码'
      }
    },
    mounted () {
      this.$http.get('/api/fund/detail?id=' + this.$route.query.id).then(res => {
        if (res.status >= 200 && res.status < 300) {
          if (res.data && res.data.error === '0') {
            this.coin = res.data.data.coin
            this.showCoin = res.data.data.show_coin
            this.data = res.data.data
            this.coinId = this.showCoin.id
            this.code = this.showCoin.code
            this.price = (Number(this.showCoin.rate) * Number(this.data.price) / Number(this.showCoin.rate)).toFixed(6)
          }
        }
      }).catch(err => {
        this.$app.error(err)
      })
    },
    methods: {
      coinHandler (id, i) {
        if (this.coin.length > 1) {
          this.coinId = id
          this.code = this.coin[i].code
          this.price = (Number(this.showCoin.rate) * Number(this.data.price) / Number(this.coin[i].rate)).toFixed(6)
        }
      },
      onFocus () {
        const text = '最低购买份额:' + this.data.buy_min + ',最高购买份额:' + this.data.buy_max
        this.$toast(text)
      },
      showMask () {
        if (this.num) {
          this.visible = true
          this.maskAnimate = 'fadeInUp'
          this.$el.removeEventListener('animationend', this.hideVisible)
        } else {
          this.$toast('请输入份额')
        }
      },
      hideMask () {
        this.maskAnimate = 'fadeOutDown'
        this.$el.addEventListener('animationend', this.hideVisible)
        window.clearInterval(this.timer)
      },
      hideVisible () {
        this.visible = false
      },
      getCode () {
        this.codeText = '60'
        this.timer = window.setInterval(() => {
          const code = parseInt(this.codeText)
          if (code > 0) {
            this.codeText = code - 1
          } else {
            this.codeText = '获取验证码'
            window.clearInterval(this.timer)
          }
        }, 1000)
      }
    }
  }
</script>

<style lang="stylus">
  .icon-radio
    background: url('../../assets/img/yellow.png') no-repeat 100% center
    background-size: auto 100%
    display: block
    height: 20px
    width: 20px
  .fund-pay
    .title,.btn-box
      // background: #fff
      font-size: 14px
      padding: 12px
    .coin-list
      margin-bottom: 12px
      .coin-item
        background: #fff
        font-size: 14px
        padding: 12px
        &:not(:first-child)
          border-top: 1px solid #eee
        &.current
          .icon-radio
            background-position: 78% center
        .pull-right
          float: right
    .coin-input
      background: #fff
      display: flex
      font-size: 14px
      position: relative
      &:not(:first-child)
        border-top: 1px solid #eee
      input
        flex: 1
        padding: 12px
      span
        color: #999
        position: absolute
        right: 12px
        top: 12px
      &-btn
        background: #ff6503
        border-radius: 5px
        color: #fff
        // padding: 4px 12px 5px
        line-height: 28px
        position: absolute
        right: 12px
        text-align: center
        top: 6px
        width: 100px
    .btn
      background: #ff6503
      border-radius: 5px
      color: #fff
      display: block
      font-size: 14px
      margin: 0 auto
      padding: 10px 0
      text-align: center
      width: 70%
    .mask
      background: rgba(0,0,0,.5)
      height: 100%
      left: 0
      position: fixed
      top: 0
      width: 100%
      z-index: 1010
      .action
        bottom: 0
        left: 0
        position: absolute
        width: 100%
        .title
          background: #eee
        .btn-groups
          font-size: 14px
          margin-top: 12px
          text-align: center
          .true
            background: #fff
            border-bottom: 1px solid #eee
            display: block
            padding: 12px 0
          .cancel
            background: #fff
            color: #999
            display: block
            padding: 12px 0
</style>
