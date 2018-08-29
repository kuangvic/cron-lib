const {integratedProcess} = require('./common')

const _MIN_VALUE = 1
const _MAX_VALUE = 31

class DayOfMonthExpression {

  /**
   * Proccessing the day of month expression.
   * 
   * Only support / * - charactor
   * 
   * @param {*} expression 
   */
  static process (expression) {
    return integratedProcess(expression, _MIN_VALUE, _MAX_VALUE)
  }
}

module.exports = DayOfMonthExpression