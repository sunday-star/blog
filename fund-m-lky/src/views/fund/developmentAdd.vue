<template>
  <div class="fund-development">
    <headbar>
      <router-link class="icon-back" :to="{path: '/fund/development?id=' + this.$route.query.id}" slot="left"></router-link>添加项目进展
    </headbar>
    <div class="content">
      <textarea placeholder="项目进度描述" v-model="text"></textarea>
      <div class="flex">
        <div class="pic" v-for="(item, index) in list"><img :src="item.url"><div class="del" @click="del(index)"></div></div>
        <div class="pic"><upload @add="add" :url="'/api/user/simple_upload?sid=' + this.$app.sid()"></upload></div>
      </div>
      
    </div>
    <a class="btn-true" @click="addDevelopment">添加</a>
  </div>
</template>

<script>
  import upload from '../../components/upload.vue'
  export default {
    components: {
      upload
    },
    data () {
      return {
        url: '',
        list: [],
        text: ''
      }
    },
    methods: {
      add (fileList) {
        this.list = fileList
      },
      addDevelopment () {
        let data = {
          fund_id: this.$route.query.id,
          sid: this.$app.sid(),
          text: this.text,
          picture: this.list
        }
        this.$http.post('/api/user/add_development', data).then(res => {
          if (res.status >= 200 && res.status < 300) {
            if (res.data && res.data.error === '0') {
              this.$toast(res.data.tips)
              this.text = ''
              this.list = []
            } else {
              this.$toast(res.data.tips)
            }
          }
        }).catch(err => {
          this.$app.error(err)
        })
      },
      del (i) {
        this.list.splice(i, 1)
      }
    }
  }
</script>

<style lang="stylus">
  .fund-development
    .content
      background: #fff
      padding: 12px
      textarea
        background: rgba(0,0,0,.05)
        box-sizing: border-box
        font-size: 14px
        height: 100px
        padding: 5px
        width: 100%
      .flex
        margin-top: 10px
        .pic
          background: #eee
          height: 50px
          position: relative
          text-align: center
          width: 31%
          &:not(:first-child)
            margin-left: 3.5%
          img
            display: inline-block
            height: 100%
          .del
            background: url('../../assets/img/del.png') no-repeat center center rgba(0,0,0,.35)
            height: 100%
            left: 0
            position: absolute
            top: 0
            width: 100%
    .btn-true
      background: #ff6503
      border-radius: 5px
      color: #fff
      display: block
      font-size: 14px
      line-height: 40px
      text-align: center
      margin: 20px 10%
      width: 80%
</style>