import Utils from '../../utils'
import Toast from './toast.vue'

let toast
let defaults
let toastStack = []

function create (opts, defaults) {
  if (!opts) {
    throw new Error('Missing toast options.')
  }

  if (defaults) {
    opts = Utils.extend(
      true,
      typeof opts === 'string' ? {html: opts} : opts,
      defaults
    )
  }

  if (!toast) {
    toastStack.push(opts)
    return
  }

  toast.create(opts)
}

export function install (Vue) {
  Utils.dom.ready(() => {
    let node = document.createElement('div')
    document.body.appendChild(node)
    toast = new Vue(Toast).$mount(node)
    if (defaults) {
      toast.setDefaults(defaults)
    }
    if (toastStack.length) {
      toastStack.forEach(opts => {
        toast.create(opts)
      })
    }
  })
}

export default {
  create,
  setDefaults (opts) {
    if (toast) {
      toast.setDefaults(opts)
    } else {
      defaults = opts
    }
  },
  install
}
