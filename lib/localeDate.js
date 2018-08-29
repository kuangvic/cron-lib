
const moment = require('moment-timezone')
const _ = require('lodash')
/**
 * The date utils base on moment-timezone
 * 
 * About moment-timezon: 
 * @see http://momentjs.com/timezone/
 */
class LocaleDate {
  
  constructor (date, options = {}) {
    if (date instanceof LocaleDate) {
      this._date = date.getLocaleDate()
    } else {
      this._options = _.assign({}, options)
      this._date = this._options.timezone ? moment.tz(date, this._options.timezone) : moment(date)
    }
  }

  getLocaleDate () {
    return this._date
  }
}

module.exports = LocaleDate