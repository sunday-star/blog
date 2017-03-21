<template>
  <div class="fund-repay">
    <headbar><router-link class="icon-back" to="/fund/manage" slot="left"></router-link>众筹权益</headbar>
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
      })
    }
  }
</script>
