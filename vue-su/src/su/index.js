import { version } from '../../package.json'
import toast from './components/toast/toast.js'

const components = [toast]

const install = function (Vue, opts = {}) {
  if (install.installed) {
    console.warn('already installed in Vue.')
    return
  } else {
    console.warn('installing in Vue.')
  }

  components.map(component => {
    Vue.component(component.name, component)
  })

  Vue.prototype.$toast = toast
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version,
  install,
  toast
}
