<template>
  <div class="fund">
    <headbar>
      众筹大厅
      <router-link slot="right" :to="{path: '/fund/manage'}">管理</router-link>
    </headbar>
    <div class="fund-list">
      <fund-item v-for="item in fundItems" :item="item"></fund-item>
    </div>
  </div>
</template>

<script>
  import fundItem from '../../components/fund-item.vue'
  export default {
    components: {
      fundItem
    },
    data () {
      return {
        fundBanners: [],
        fundItems: []
      }
    },
    mounted () {
      this.$http.get('/api/index').then(res => {
        if (res.data && res.data.error === '0') {
          this.fundBanners = res.data.data.banner
          this.fundItems = res.data.data.fund
        }
      })
    }
  }
</script>
