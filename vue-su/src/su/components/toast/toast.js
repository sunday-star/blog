import Vue from 'vue'
let ToastVue = Vue.extend(require('./toast.vue'))

let instance
// let instances = []
// let seed = 1

var toast = function (options) {
  options = options || {}
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  instance = new ToastVue({ data: options })
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  return instance.vm
}

export default toast
