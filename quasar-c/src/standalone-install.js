export default function (Quasar) {
  if (typeof window !== 'undefined' && window.Vue) {
    window.Quasar = Quasar
    window.Vue.use(Quasar)
  }
}
