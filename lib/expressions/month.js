const {integratedProcess} = require('./common')

const _MIN_VALUE = 1
const _MAX_VALUE = 12

// define alias 
const _MONTH = ['january','february','march','april','may','june','july', 'august','september','october','november','december'];
// define short alias
const _MONTH_SHORT = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

class MonthExpression {

  static process (expression) {
    let _expression = expression

    for (let i = 0; i < _MONTH.length; i++) {
      // convert alias and short alias to number
      _expression = _expression.replace(new RegExp(_MONTH[i], 'gi'), parseInt(i, 10)).replace(new RegExp(_MONTH_SHORT[i], 'gi'), parseInt(i, 10))
    }

    return integratedProcess(_expression, _MIN_VALUE, _MAX_VALUE)
  }
}

module.exports = MonthExpression