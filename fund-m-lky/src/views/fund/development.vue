<template>
  <div class="fund-development">
    <headbar><router-link class="icon-back" :to="{path: '/fund/detail?id=' + this.$route.query.id}" slot="left"></router-link>项目进展</headbar>
    <div class="development-list">
      <transition-group name="list">
        <development-item v-for="item in items" :item="item" :key="item"></development-item>
      </transition-group>
    </div>
    <div class="no-data" v-if="items.length === 0">暂无项目进展</div>
  </div>
</template>

<script>
  import developmentItem from '../../components/development-item.vue'
  export default {
    components: {
      developmentItem
    },
    data () {
      return {
        items: []
      }
    },
    mounted () {
      this.$http.get('/api/fund/development?id=' + this.$route.query.id + '&sid=' + this.$app.sid()).then(res => {
        if (res.status >= 200 && res.status < 300) {
          if (res.data && res.data.error === '0') {
            this.items = res.data.data.development
          }
        }
      })
    }
  }
</script>

<style lang="stylus">
  .development-list
    background: #fff
</style>
