<template>
  <transition name="slide-left">
    <div class="toast" v-show="visible" >{{message}}</div>
  </transition>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        message: '',
        onClose: null,
        duration: 3000,
        closed: false,
        timer: null
      }
    },
    watch: {
      closed (val) {
        if (val) {
          this.visible = false
          this.$el.addEventListener('transitionend', this.destroyElement)
        }
      }
    },

    methods: {
      destroyElement () {
        this.$el.removeEventListener('transitionend', this.destroyElement)
        this.$destroy(true)
        this.$el.parentNode.removeChild(this.$el)
      },
      close () {
        this.closed = true
        if (typeof this.onClose === 'function') {
          this.onClose(this)
        }
      },

      clearTimer () {
        clearTimeout(this.timer)
      },

      startTimer () {
        if (this.duration > 0) {
          this.timer = setTimeout(() => {
            if (!this.closed) {
              this.close()
            }
          }, this.duration)
        }
      }
    },
    mounted () {
      this.startTimer()
    }
  }
</script>

<style lang="stylus" scoped>
  .toast
    background: rgba(0,0,0,.8)
    border-radius: 20px
    color: #fff
    padding: 10px 20px
    left: 50%
    position: fixed
    top: 50%
    transform: translate(-50%, -50%)
</style>
