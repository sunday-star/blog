<template>
  <div class="fund-manage">
    <headbar><router-link class="icon-back" to="/fund" slot="left"></router-link>众筹管理</headbar>
    <div class="user flex">
      <img :src="user.avatar">
      <div>{{user.name}}<span>(ID:{{user.id}})</span></div>
    </div>
    <router-link to="/fund/m/repay" class="route-btn"><img src="../../assets/img/manage-btn-2.png">众筹权益</router-link>
    <div class="tab">
      <div class="tab-item" v-for="(item, i) in tab" :class="{'current': i === tabCurrent}" @click="tabHandler(i)">{{item}}</div>
    </div>
    <div class="tab-content">
      <transition-group name="list">            
        <manage-item v-for="(item, index) in items" :item="item" :key="item">
          <span class="btn" slot="head" v-if="tabCurrent === 1" @click="delCollect(index, item.fund.id)">取消收藏</span>
          <span class="btn" slot="head" v-if="tabCurrent === 2">管理</span>
        </manage-item>
      </transition-group>
    </div>
  </div>
</template>

<script>
  import manageItem from '../../components/manage-item.vue'
  export default {
    components: {
      manageItem
    },
    data () {
      return {
        user: {},
        tab: ['我的支持', '我的收藏', '我的发起'],
        tabCurrent: 0,
        items: [],
        timer: ''
      }
    },
    mounted () {
      this.$http.get('/api/user/index?sid=' + this.$app.sid()).then(res => {
        if (res.status >= 200 && res.status < 300) {
          if (res.data && res.data.error === '0') {
            this.user = res.data.data
          }
        }
      })
      this.tabHandler(0)
    },
    methods: {
      tabHandler (i) {
        this.tabCurrent = i
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
          this.$http.get(url + '?sid=' + this.$app.sid()).then(res => {
            if (res.status >= 200 && res.status < 300) {
              if (res.data && res.data.error === '0') {
                this.items = res.data.data[i]
              }
            }
          })
        }, 250)
      },
      delCollect (index, id) {
        this.$http.get('/api/user/del_collect?fund_id=' + id + '&sid=' + this.$app.sid()).then(res => {
          if (res.status >= 200 && res.status < 300) {
            if (res.data && res.data.error === '0') {
              this.$toast(res.data.tips)
              this.items.splice(index, 1)
            }
          }
        })
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
      img
        height: 20px
        margin-right: 12px
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
</style>
