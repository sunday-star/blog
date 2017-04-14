<template>
  <div class="circle">
    <svg viewBox="0 0 100 100">
      <path :d="pathString" :stroke="trailColor" :stroke-width="trailWidth" :fill-opacity="0"></path>
      <path :d="pathString" stroke-linecap="round" :stroke="strokeColor" :stroke-width="strokeWidth" fill-opacity="0" :style="pathStyle"></path>
    </svg>
    <div class="circle-content"><slot></slot></div>
  </div>
</template>

<script>
  export default {
    props: {
      strokeWidth: {
        type: Number,
        default: 5
      },
      strokeColor: {
        type: String,
        default: '#2d9'
      },
      trailWidth: {
        type: Number,
        default: 5
      },
      trailColor: {
        type: String,
        default: '#d9d9d9'
      },
      percent: {
        type: [Number, String],
        default: 0
      }
    },
    computed: {
      radius () {
        return 50 - this.strokeWidth / 2
      },
      pathString () {
        return `M 50,50 m 0,-${this.radius}
        a ${this.radius},${this.radius} 0 1 1 0,${2 * this.radius}
        a ${this.radius},${this.radius} 0 1 1 0,-${2 * this.radius}`
      },
      len () {
        return Math.PI * 2 * this.radius
      },
      pathStyle () {
        return {
          'stroke-dasharray': `${this.len}px ${this.len}px`,
          'stroke-dashoffset': `${((100 - this.percent) / 100 * this.len)}px`,
          'transition': 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .circle
    height: 100%
    position: relative
    width: 100%
    &-content
      align-items: center
      display: flex
      justify-content: center
      position: absolute
      left: 0
      top: 0
      height: 100%
      width: 100%
      img
        border-radius: 50%
        height: 85%
        width: 85%
</style>
