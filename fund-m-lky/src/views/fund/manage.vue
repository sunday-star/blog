<template>
  <div class="fund-manage">
    <headbar><router-link class="icon-back" to="/fund" slot="left"></router-link>众筹管理</headbar>
    <div class="user flex">
      <img :src="user.avatar">
      <div>{{user.name}}<span>(ID:{{user.id}})</span></div>
    </div>
    <router-link to="/fund/m/repay" class="route-btn"><img src="../../assets/img/manage-btn-2.png">众筹权益 <span class="icon-right"></span></router-link>
    <div class="tab">
      <div class="tab-item" v-for="(item, i) in tab" :class="{'current': i === tabCurrent}" @click="tabHandler(i)">{{item}}</div>
    </div>
    <div class="tab-content" v-scroll="onScroll">
      <transition-group name="list" tag="div">            
        <manage-item v-for="(item, index) in items" :item="item" :key="item">
          <span slot="head" v-if="tabCurrent === 0">距离结束还有：20天</span>
          <span class="btn" slot="head" v-if="tabCurrent === 1" @click="delCollect(index, item.fund.id)">取消收藏</span>
          <router-link class="btn" slot="head" v-if="tabCurrent === 2" :to="{path: '/fund/manage/' + item.id}">管理</router-link>
          <div slot="body" class="body flex">
            <router-link :to="{path: '/fund/detail?id=' + item.fund.id}" v-if="tabCurrent === 0">
              <v-circle :percent="item.fund.percent"><img :src="item.fund.picture"></v-circle>              
            </router-link>
            <router-link :to="{path: '/fund/detail?id=' + item.fund.id}" v-if="tabCurrent === 1">
              <v-circle :percent="item.fund.percent"><img :src="item.fund.picture"></v-circle>
            </router-link>
            <router-link :to="{path: '/fund/detail?id=' + item.id}" v-if="tabCurrent === 2">
              <v-circle :percent="item.percent"><img :src="item.picture"></v-circle>
            </router-link>
            <div class="item" v-if="tabCurrent === 0">
              <div class="flex">
                <div>
                  <p>购买份额：{{item.fund.target}}</p>
                  <p>总计金额：{{item.fund.recent}}</p>
                  <p class="color3 ellipsis">订单号：{{item.order_sn}}</p>
                </div>
              </div>
            </div>
            <div class="item" v-if="tabCurrent === 1">
              <div class="flex between">
                <div>已筹资：{{item.fund.recent}}</div>
                <div>目标：{{item.fund.target}}</div>
              </div>
              <div class="flex between">
                <div class="text-center">
                  <p class="orange">{{Math.ceil(item.fund.left_time / 86400)}}</p>剩余天数
                </div>
                <div class="text-center">
                  <p class="orange">{{item.fund.price}}</p>权益单价
                </div>
                <div class="text-center">
                  <p class="orange">{{item.fund.percent}}</p>已达
                </div>
              </div>
            </div>
            <div class="item" v-if="tabCurrent === 2">
              <div class="flex between">
                <div>已筹资：{{item.recent}}</div>
                <div>目标：{{item.target}}</div>
              </div>
              <div class="flex between">
                <div class="text-center">
                  <p class="orange">{{Math.ceil(item.left_time / 86400)}}</p>剩余天数
                </div>
                <div class="text-center">
                  <p class="orange">{{item.price}}</p>权益单价
                </div>
                <div class="text-center">
                  <p class="orange">{{item.percent}}</p>已达
                </div>
              </div>
            </div>
          </div>
        </manage-item>
      </transition-group>
    </div>
  </div>
</template>

<script>
  import manageItem from '../../components/manage-item.vue'
  import circle from '../../components/circle.vue'
  export default {
    components: {
      manageItem,
      'v-circle': circle
    },
    data () {
      return {
        user: {},
        tab: ['我的支持', '我的收藏', '我的发起'],
        tabCurrent: 0,
        items: [],
        timer: '',
        percent: '',
        page: 1,
        total: 0
      }
    },
    mounted () {
      this.$http.get('http://www.luokeyun.com/fundadmin/api/user/index?sid=' + this.$app.sid()).then(res => {
        if (res.status >= 200 && res.status < 300) {
          if (res.data && res.data.error === '0') {
            this.user = res.data.data
          }
        }
      }).catch(err => {
        this.$app.error(err)
      })
      this.tabHandler(0)
    },
    methods: {
      tabHandler (i) {
        this.tabCurrent = i
        this.page = 1
        switch (i) {
          case 0:
            this.getItems('/api/user/order', 'order')
            break
          case 1:
            this.getItems('/api/user/my_collect', 'collect')
            break
          case 2:
            this.getItems('/api/user/my_fund', 'fund')
            break
        }
      },
      getItems (url, i) {
        this.items = []
        this.timer = setTimeout(() => {
          this.$http.get('http://www.luokeyun.com/fundadmin' + url + '?sid=' + this.$app.sid() + '&page=' + this.page+ '&page_size=10').then(res => {
            if (res.status >= 200 && res.status < 300) {
              if (res.data && res.data.error === '0') {
                this.total = Number(res.data.total)
                this.items = res.data.data[i]
                // if (this.tabCurrent === 0) {
                //   this.items = [{fund: {percent: 20, target: 2000, recent: 1000}, order_sn: '2345676544'}]
                // }
              }
            }
          }).catch(err => {
            this.$app.error(err)
          })
        }, 250)
      },
      delCollect (index, id) {
        this.$http.get('http://www.luokeyun.com/fundadmin/api/user/del_collect?fund_id=' + id + '&sid=' + this.$app.sid()).then(res => {
          if (res.status >= 200 && res.status < 300) {
            if (res.data && res.data.error === '0') {
              this.$toast(res.data.tips)
              this.items.splice(index, 1)
            }
          }
        }).catch(err => {
          this.$app.error(err)
        })
      },
      onScroll () {
        var url = ''
        var i = ''
        if (this.tabCurrent === 0) {
          url = '/api/user/order'
          i = 'order'
        } else if (this.tabCurrent === 1) {
          url = '/api/user/my_collect'
          i = 'collect'
        } else if (this.tabCurrent === 2) {
          url = '/api/user/my_fund'
          i = 'fund'
        }
        if (this.items.length !== this.total) {
          this.page++
          this.$http.get('http://www.luokeyun.com/fundadmin' + url + '?sid=' + this.$app.sid() + '&page=' + this.page+ '&page_size=10').then(res => {
            if (res.status >= 200 && res.status < 300) {
              if (res.data && res.data.error === '0') {
                this.items = this.items.concat(res.data.data[i])
              }
            }
          }).catch(err => {
            this.$app.error(err)
          })
        }
      }
    },
    beforeDestroy () {
      if (this.timer !== '') {
        window.clearTimeout(this.timer)
      }
    }
  }
</script>

<style lang="stylus">
  .fund-manage
    .user
      align-items: center
      background: #fff
      font-size: 16px
      padding: 12px
      img
        border-radius: 50%
        height: 50px
        margin-right: 12px
        width: 50px
      span
        color: #999
    .route-btn
      align-items: center
      background: #fff
      border-top: 1px solid #eee
      display: flex
      font-size: 14px
      padding: 12px
      position: relative
      img
        height: 20px
        margin-right: 12px
      .icon-right
        position: absolute
        right: 12px
        top: 14px
        height: 16px
        width: 16px
    .tab
      background: #fff
      display: flex
      margin-top: 12px
      padding: 0 12px
      &-item
        flex: 1
        font-size: 14px
        padding: 12px 0
        text-align: center
        &.current
          border-bottom: 1px solid #ff6503
          color: #ff6503
      &-content
        .circle
          height: 90px
          margin-right: 12px
          width: 90px
        .body
          font-size: 14px
          line-height: 2
        .btn
          background: #ff6503
          border-radius: 2px
          color: #fff
          padding: 5px 10px
</style>
