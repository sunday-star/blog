import { install as toastInstall } from './components/toast/toast'

function registerDirectives () {}

function registerComponents () {}

export default function (Vue) {
  if (this.installed) {
    console.warn('Quasar already installed in Vue.')
    return
  } else {
    console.warn('Quasar is installing in Vue.')
  }

  registerDirectives(Vue)
  registerComponents(Vue)
  toastInstall(Vue)
}
