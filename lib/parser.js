const _ = require('lodash')
const moment = require('moment-timezone')
const Expression = require('./expression')
const LocaleDate = require('./localeDate')
/**
 * An parser that can calculate the timestamps base on the crontab expression for crontab
 * 
 * The expression defined as follow
 * 
 * # ┌────────────── second [0-59]
 * # │ ┌──────────── minute [0-59]
 * # │ │ ┌────────── hour [0-23]
 * # │ │ │ ┌──────── day of month [1-31]
 * # │ │ │ │ ┌────── month [1-12]
 * # │ │ │ │ │ ┌──── day of week [0-7]
 * # │ │ │ │ │ │
 * # │ │ │ │ │ │
 * # * * * * * *
 * 
 */
class Parser {
  /**
   * cron 
   * @param {String} expression 
   * @param {Object} options 
   */
  constructor (expression, options) {
    if (!expression) throw new Error('The expression can not be null !')

    this._expression = new Expression(expression)
    
    this._options = _.assign({}, options)
    // time zone
    this._timezone = this._options.timezone

    this._startDate = this._options.startDate ? 
      (this._timezone ? moment.tz(this._options.startDate, this._timezone) : moment(this._options.startDate)) 
      : moment()
    
    this._endDate = this._options.endDate ? 
      (this._timezone ? moment.tz(this._options.endDate, this._timezone) : moment(this._options.endDate)) 
      : this._startDate.add(30, 'y')
    
    // define the previous time that matched the expression
    this._preTime = null

    if (this._startDate.valueOf() > this._endDate.valueOf()) {
      throw new Error(`The [ endDate ] must be greater than [ startDate ] !`)
    }
  }

  /** 
   * Indicate the expression whether valid or not
   */
  validate () {
    return this._expression.isValid()
  }

  next () {
    if (!this._expression.isValid()) return null

    while (this._startDate.valueOf() <= this._endDate.valueOf()) {
      let localeDate = new LocaleDate(this._startDate.toDate())
      
      // match the month
      let result = this._expression.match(localeDate, 'M', this._preTime)
      if (!result) {
        this._startDate.add(1, 'months').startOf('month')
        continue
      }
      
      // match the dayOfMonth and dayOfWeek
      result = this._expression.match(localeDate, 'D', this._preTime) && this._expression.match(localeDate, 'd', this._preTime)
      if (!result) {
        this._startDate.add(1, 'days').startOf('day')
        continue
      }

      // match the hour
      result = this._expression.match(localeDate, 'H', this._preTime)
      if (!result) {
        this._startDate.add(1, 'hours').startOf('hour')
        continue
      }

      // match the minute
      result = this._expression.match(localeDate, 'm', this._preTime)
      if (!result) {
        this._startDate.add(1, 'minutes').startOf('minute')
        continue
      }

      // match the second
      result = this._expression.match(localeDate, 's', this._preTime)
      // console.log(`match [ second ]: `, result)
      if (!result) {
        this._startDate.add(1, 'seconds')
        continue
      }

      if (result) {
        const returnValue = this._startDate.clone()
        this._startDate.add(1, 'seconds')
        this._preTime = returnValue
        return returnValue.toDate()
      } else {
        this._startDate.add(1, 'seconds')
      }
    }

    return null
  }

  getExpression () {
    return this._expression
  }
}

module.exports = Parser