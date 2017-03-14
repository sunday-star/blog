<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in slideItems">
        <div class="swiper-slide-img"><img :src="item.picture"></div>
        <div class="swiper-slide-title">{{item.title}}</div>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
  /*eslint-disable no-new*/
  export default {
    props: {
      slideItems: Array,
      default: function () {
        return []
      }
    },
    watch: {
      slideItems (val) {
        if (val && val.length > 0) {
          this.$nextTick(() => {
            this.swiper = new window.Swiper('.swiper-container', {
              direction: 'horizontal',
              autoHeight: true,
              loop: true,
              autoplay: 3000,
              pagination: '.swiper-pagination'
            })
          })
        }
      }
    },
    beforeDestroy () {
      this.swiper && this.swiper.destroy()
    }
  }
</script>

<style lang="stylus">
  .swiper-slide-img
    img
      display: block
      width: 100%
  .swiper-slide-title
    background: rgba(0,0,0,.5)
    bottom: 20px
    color: #fff
    font-size: 14px
    left: 0
    padding: 10px
    position: absolute
    width: 100%
</style>
