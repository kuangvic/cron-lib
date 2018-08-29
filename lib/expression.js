
const {SecondExpression, MinuteExpression, HourExpression, DayOfMonthExpression, MonthExpression, DayOfWeekExpression} = require('./expressions')
const LocaleDate = require('./localeDate')
const _ = require('lodash')

const matchPart = (s, t) => {
  return _.find(s.split(','), item => item === t) ? true : false
}

/**
 * Provide the validate and convert operations for cron expression
 */
 class Expression {

  constructor(expression) {
    if (!expression) throw new Error('[expression] can not be empty!')

    if (typeof expression !== 'string'){
      throw new Error('[expression] must be a string!')
    }

    this._expression = expression

    // whether the expression is valid or not
    this._valid = false

    this._process()
    
  }

  /**
   * Indicate whether the expression is valid or not
   */
  isValid () {
    return this._valid
  }

  _process () {
    try {
      let splitArr = (this._expression).trim().split(/\s+/);

      if (splitArr.length === 5) {
        splitArr = ['*'].concat(splitArr)
      }
      if (splitArr.length !== 6) throw new Error('[expression] is not correct, pls check!')
  
      this._second = SecondExpression.process(splitArr[0])
      this._minute = MinuteExpression.process(splitArr[1])
      this._hour = HourExpression.process(splitArr[2])
      this._dayOfMonth = DayOfMonthExpression.process(splitArr[3])
      this._month = MonthExpression.process(splitArr[4])
      this._dayOfWeek = DayOfWeekExpression.process(splitArr[5])
      
      this._valid = this._second !== '' && this._minute !== '' && this._hour !== '' && this._dayOfMonth !== '' && this._month !== '' && this._dayOfWeek !== ''

    } catch (e) {
      console.log(e)
      this._valid = false
    }
  }

  /**
   * Indicate whether the specified date does match the expression or not
   * 
   * Return true if specified date matches the expression, or return false
   * 
   * @param {LocaleDate} localDate specified date.
   * 
   * @param {String} part the option value. 
   *    M - month
   *    D - day of month
   *    d - day of week
   *    H - hour
   *    m - minute
   *    s - second
   */
  match (localDate, part = '') {
    // return false if expression is invalid or check param [date] failed
    if (!this._valid || !localDate || !(localDate instanceof LocaleDate)) return false

    const timer = localDate.getLocaleDate()
    
    const month = timer.format('M')
    const dayOfMonth = timer.format('D')
    const dayOfWeek = timer.format('d')
    const hour = timer.format('H')
    const minute = timer.format('m')
    const second = timer.format('s')
    
    // console.log(`${this._month} - ${month} | ${this._dayOfMonth} - ${dayOfMonth} | ${this._dayOfWeek} - ${dayOfWeek} | ${this._hour} - ${hour} | ${this._minute} - ${minute} | ${this._second} - ${second}`)

    
    if (!part || part === '') {
      return matchPart(this._month, month) && matchPart(this._dayOfMonth, dayOfMonth) && matchPart(this._dayOfWeek, dayOfWeek)
        && matchPart(this._hour, hour) && matchPart(this._minute, minute) && matchPart(this._second, second)
    }
    switch (part) {
      case 'M': 
        return matchPart(this._month, month)
      case 'D':
        return matchPart(this._dayOfMonth, dayOfMonth)
      case 'd': 
        return matchPart(this._dayOfWeek, dayOfWeek)
      case 'H':
        // console.log(`${this._hour} - ${hour}`)
        return matchPart(this._hour, hour)
      case 'm':
        return matchPart(this._minute, minute)
      case 's':
        return matchPart(this._second, second)
      default:
        throw new Error(`unsupported value [type]: '${part}'`)
    }
  }

  /**
   * return the input expression
   */
  getExpression () {
    return this._expression
  }
}

module.exports = Expression