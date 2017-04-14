<template>
  <div class="fund-repay">
    <headbar><router-link class="icon-back" to="/fund/manage" slot="left"></router-link>众筹权益</headbar>
    <div class="tips">暂无众筹权益</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        items: []
      }
    },
    mounted () {
      this.$http.get('/api/user/my_repay?sid=' + this.$app.sid()).then(res => {
        if (res.status >= 200 && res.status < 300) {
          if (res.data && res.data.error === '0') {
            this.items = res.data.data
          }
        }
      }).catch(err => {
        this.$app.error(err)
      })
    }
  }
</script>

<style lang="stylus">
  .tips
    background: #fff
    padding: 12px
    font-size: 14px
</style>
