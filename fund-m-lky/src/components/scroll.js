let scrollCallback = function (callback) {
  if (document.body.scrollHeight < 1000) {
    return
  }
  if (document.body.scrollHeight - window.scrollY - 100 <= document.body.clientHeight) {
    callback()
  }
}
let callBackWarpped
var vueScroll = (Vue) => {
  console.log('vueScroll')
  Vue.directive('scroll', {
    bind (el, binding, vnode) {
      console.log(binding.value)
      callBackWarpped = scrollCallback.bind({}, binding.value)
      window.addEventListener('scroll', callBackWarpped)
    },
    unbind () {
      window.removeEventListener('scroll', callBackWarpped)
    }
  })
}

export default vueScroll
