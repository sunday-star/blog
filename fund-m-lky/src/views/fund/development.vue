<template>
  <div class="fund-development">
    <headbar><router-link class="icon-back" :to="{path: '/fund/detail?id=' + this.$route.query.id}" slot="left"></router-link>项目进展</headbar>
  </div>
</template>

<script>
  export default {
    mounted () {
      this.$http.get('/api/fund/development?id=' + this.$route.query.id + '&sid=' + this.$app.sid()).then(res => {})
    }
  }
</script>
