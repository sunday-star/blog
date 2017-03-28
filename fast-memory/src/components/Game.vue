<template>
  <div class="game">
    <v-head></v-head>
    <v-anim :level="level" :is-replay="isReplay" :arr="currentArr"></v-anim>
    <v-key @click="keyboardHandler"></v-key>
  </div>
</template>

<script>
  import head from './Head.vue'
  import anim from './Anim.vue'
  import key from './Keyboard.vue'
  export default {
    components: {
      'v-head': head,
      'v-anim': anim,
      'v-key': key
    },
    data () {
      return {
        numArr: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        currentNum: '',
        currentArr: [],
        level: 7,
        isReplay: 0
      }
    },
    mounted () {
      this.randomNum()
    },
    methods: {
      keyboardHandler (key) {
        if (typeof key === 'number') {
          console.log(key)
        } else {
          switch (key) {
            case 'R':
              this.keyboardReplay()
              break
            case 'C':
              this.keyboardContrast()
              break
          }
        }
      },
      keyboardReplay () {
        this.reStart()
      },
      keyboardContrast () {
        console.log('constrast')
      },
      randomNum () {
        for (let i = 0; i < this.level; i++) {
          let id = Math.ceil(Math.random() * (this.numArr.length - 1))
          this.currentArr.push(this.numArr[id])
          this.currentNum += this.numArr[id]
        }
      },
      reStart () {
        this.currentArr = []
        this.currentNum = ''
        this.level++
        this.randomNum()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .game {position: relative;height: 100%;width: 100%;}
</style>
