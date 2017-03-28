<template>
  <span class="anim-item"><slot></slot></span>
</template>

<script>
  export default {
    props: {
      items: {
        type: Array,
        default: function () {
          return []
        }
      },
      index: { // 索引
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        duration: 500, // 动画时间
        delay: 1000 // 时间间隔
      }
    },
    mounted () {
      this.animate(this.$el, this.index)
    },
    methods: {
      animate (el, i) {
        el.style.opacity = 0
        window.Velocity(el, {opacity: 1}, {
          duration: this.duration,
          delay: i * this.delay,
          complete: () => {
            window.Velocity(el, {opacity: 0}, {
              duration: this.duration,
              complete: () => {
              }
            })
          }
        })
      }
    },
    watch: {
      items (val) {
        if (val) {
          this.animate(this.$el, this.index)
        }
      }
    }
  }
</script>
