<template>
  <div>login</div>
</template>

<script>
  export default {
    mounted () {
      let query = this.$route.query
      if (query.sid !== undefined) {
        this.$app.setSid(query.sid)
        if (window.localStorage.getItem('FUND_URL') !== undefined) {
          window.location.href = window.localStorage.getItem('FUND_URL')
          window.localStorage.removeItem('FUND_URL')
        }
      }
    }
  }
</script>