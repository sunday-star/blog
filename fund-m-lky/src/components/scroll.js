let scrollCallback = function (callback) {
  if (document.body.scrollHeight <= document.body.clientHeight) {
    return
  }
  if (document.body.scrollHeight - window.scrollY<= document.body.clientHeight) {
    callback()
  }
}
let callBackWarpped
var vueScroll = (Vue) => {
  Vue.directive('scroll', {
    inserted (el, binding, vnode) {
      callBackWarpped = scrollCallback.bind({}, binding.value)
      window.addEventListener('scroll', callBackWarpped)
    },
    unbind () {
      window.removeEventListener('scroll', callBackWarpped)
    }
  })
}

export default vueScroll
