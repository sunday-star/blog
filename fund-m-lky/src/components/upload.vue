<template>
  <div class="upload">
    <input type="file" class="input-file" @change.prevent="changeFile">
    <div class="upload-percent" :style="{width: percent + '%'}"></div>
  </div>
</template>

<script>
  const imageType = /^image\//
  export default {
    props: {
      url: ''
    },
    data () {
      return {
        fileList: [],
        res: [],
        percent: 0
      }
    },
    mounted () {
      this.file = document.querySelector('.input-file')
    },
    methods: {
      changeFile (e) {
        let url = ''
        let item = {}
        if (window.File && window.FileReader && window.FormData) {
          for (var i = 0; i < this.file.files.length; i++) {
            if (imageType.test(this.file.files[i].type)) {
              url = window.URL.createObjectURL(this.file.files[i])
              this.readFile(this.file.files[i])
            } else {
              this.$toast('Not a valid image!')
            }
          }
        } else {
          this.$toast('File upload is not supported!')
        }
        item = {
          url: url,
          file: this.file.files[i]
        }
        this.fileList.push(item)
        this.$emit('add', this.fileList, this.res)
      },
      readFile (file) {
        let reader = new window.FileReader()
        let _this = this
        reader.onload = function () {
          _this.sendFile(file)
        }
        reader.readAsDataURL(file)
      },
      sendFile (file) {
        let loop = null
        let _this = this
        let xhr = new window.XMLHttpRequest()
        let formdata = new window.FormData()
        formdata.append('file', file)
        xhr.open('post', this.url)
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            let data = JSON.parse(xhr.response)
            _this.res.push(data.url)
            _this.$emit('add', _this.fileList, _this.res)
          }
        }
        xhr.upload.addEventListener('progress', function (e) {
          if (loop) return
          _this.percent = ~~(100 * e.loaded / e.total)
          if (_this.percent === 100) {
            window.setTimeout(() => {
              _this.percent = 0
            }, 250)
            _this.$toast('upload successed!')
          }
        }, false)
        xhr.send(formdata)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .upload
    background: url('../assets/img/img.png') no-repeat center center
    height: 100%
    position: relative
    width: 100%
    .input-file
      height: 100%
      opacity: 0
      width: 100%
    &-percent
      background: green
      bottom: 0
      left: 0
      height: 5px
      position: absolute
</style>