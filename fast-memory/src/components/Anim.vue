<template>
  <div class="anim">
    <div class="anim-item" v-for="(item, index) in currentArr" :style="{'transform': 'translate3d(0px, 0px, ' + index * 50 + 'px)'}">{{item}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      minShort: {
        type: Number,
        default: 7
      }
    },
    data () {
      return {
        numArr: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        currentNum: '',
        duration: 1,
        currentArr: []
      }
    },
    mounted () {
      this.initView()
    },
    methods: {
      initView () {
        this.createNum()
        this.animNum()
      },
      createNum () {
        for (let i = 0; i < this.minShort; i++) {
          let id = Math.ceil(Math.random() * (this.numArr.length - 1))
          this.currentArr.push(this.numArr[id])
          this.currentNum += this.numArr[id]
          // setTimeout(() => {
          //   this.currentArr.push(this.numArr[id])
          //   this.currentNum += this.numArr[id]
          // }, this.duration * 1000 * i)
        }
      },
      animNum () {
        let count = 0
        let anim = null
        console.log(this.currentArr)
        anim = setInterval(() => {
          let id = this.currentArr[0]
          if (count < this.minShort) {
            count++
            this.currentArr.splice(0, 1)
            this.currentArr.push(id)
          } else {
            clearInterval(anim)
          }
        }, this.duration * 1000)
      }
    }
  }
</script>

<style lang="less">
  .anim {
    background-color: rgba(0,0,0,.5);
    // perspective: 500px;perspective-origin: 50% -50%;
    height: 50%;left: 0;overflow: hidden;position: absolute;top: 25%;width: 100%;
    &-item {
      background-color: rgba(255, 255, 0, 1);color: #fff;font-size: 30px;text-align: center;
      // position: absolute;
      // padding: 50px 0;width: 100%;
    }
  }
</style>
