<template>
  <div class="fund-development">
    <headbar>
      <router-link class="icon-back" :to="{path: '/fund/detail?id=' + this.$route.query.id}" slot="left"></router-link>项目进展
      <!-- <router-link class="icon-plus" :to="{path: '/fund/development/add?id=' + this.$route.query.id}" slot="right"></router-link> -->
    </headbar>
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
      this.$http.get('http://www.luokeyun.com/fundadmin/api/fund/development?id=' + this.$route.query.id + '&sid=' + this.$app.sid()).then(res => {
        if (res.status >= 200 && res.status < 300) {
          if (res.data && res.data.error === '0') {
            this.items = res.data.data.development
          }
        }
      }).catch(err => {
        this.$app.error(err)
      })
    }
  }
</script>

<style lang="stylus">
  .fund-development
    .development-list
      background: #fff
</style>
