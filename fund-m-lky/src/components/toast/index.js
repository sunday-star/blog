import Vue from 'vue'
let Toast = Vue.extend(require('./toast.vue'))

let _toast
let toasts = []
let seed = 1

var toast = function (options) {
  if (Vue.prototype.$isServer) return
  options = options || {}
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  let userOnClose = options.onClose
  let id = 'toast_' + seed++

  options.onClose = function () {
    toast.close(id, userOnClose)
  }
  _toast = new Toast({ data: options })
  _toast.id = id
  _toast.vm = _toast.$mount()
  document.body.appendChild(_toast.vm.$el)
  _toast.vm.visible = true
  _toast.dom = _toast.vm.$el
  toasts.push(_toast)
  return _toast.vm
}

toast.close = function (id, userOnClose) {
  toasts.forEach((item, i) => {
    if (id === item.id) {
      if (typeof userOnClose === 'function') {
        userOnClose(item)
      }
      toasts.splice(i, 1)
    }
  })
}

export default toast
