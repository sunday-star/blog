<template>
  <div class="fund-intro">
    <headbar>项目详情</headbar>
    <div v-html="intro"></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        intro: ''
      }
    },
    mounted () {
      this.$http.get('/api/fund/intro?id=' + this.$route.query.id).then(res => {
        if (res.status >= 200 && res.status < 300) {
          if (res.data && res.data.error === '0') {
            this.intro = res.data.data.intro_full
          }
        }
      }).catch(err => {
        this.$app.error(err)
      })
    }
  }
</script>

<style lang="stylus">
  .fund-intro
    background: #fff
    padding: 12px
</style>
