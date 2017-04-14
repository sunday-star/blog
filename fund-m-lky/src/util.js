var _this = null
var _sid = 'fund_sid'
export default {
  init (t) {
    _this = t
  },
  sid () {
    return this.getCookie(_sid)
  },
  setSid (val) {
    this.setCookie(_sid, val, 30)
  },
  setCookie (cname, cvalue, exdays) {
    var d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    var expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
  },
  getCookie (cname) {
    var name = cname + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1)
      if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
    }
    return ''
  },
  error (err) {
    console.log(err)
    window.localStorage.setItem('FUND_URL', window.location.href)
    // let target = encodeURIComponent('http://' + window.location.host + '/#/session')
    let target = encodeURIComponent('http://' + window.location.host + '/#/session')
    window.location.href = window.appConfig.apiHost + 'login/index?target=' + target
  }
}