import toast from './toast/index.js'

const components = [toast]

const install = (Vue, opts = {}) => {
  if (install.installed) return
  components.map(component => {
    console.log(component.name)
    Vue.component(component.name, component)
  })
  Vue.prototype.$toast = toast
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default {
  version: '0.1',
  install,
  toast
}
