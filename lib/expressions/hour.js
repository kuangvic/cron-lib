const {integratedProcess} = require('./common')

const _MIN_VALUE = 0
const _MAX_VALUE = 23

class HourExpression {
  
  static process (expression) {
    return integratedProcess(expression, _MIN_VALUE, _MAX_VALUE)
  }
}

module.exports = HourExpression