{
  class Date2 {
    constructor (date = new Date()) {
      this.date = new Date(date - 0)
      console.log(this.date)
    }
    weekday (n) {
      if (n) {
        throw new Error('You can not set weekday')
      }
      return this._proxy('day')
    }
    _proxy (name, n, offset = 0) {
      if (n === undefined) {
      
      }
    }
  }

  window.Date2 = Date2
}