
const {integratedProcess} = require('./common')

const _MIN_VALUE = 0
const _MAX_VALUE = 59

class MinuteExpression {
  
  static process (expression) {
    return integratedProcess(expression, _MIN_VALUE, _MAX_VALUE)
  }
}

module.exports = MinuteExpression