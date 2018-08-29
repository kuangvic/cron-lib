const {integratedProcess} = require('./common')
const _ = require('lodash')

const _WEEK_DAY = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
const _WEEK_DAY_SHORT = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

const _MIN_VALUE = 0
const _MAX_VALUE = 7

class DayOfWeekExpression {
  
  static process (expression) {
    let _expression = expression

    _expression = _expression.replace(_MAX_VALUE + '', _MIN_VALUE + '')

    for (let i = 0; i < _WEEK_DAY.length; i++) {
      // convert alias and short alias into number
      _expression = _expression.replace(new RegExp(_WEEK_DAY[i], 'gi'), parseInt(i, 10)).replace(new RegExp(_WEEK_DAY_SHORT[i], 'gi'), parseInt(i, 10))
    }

    return integratedProcess(_expression, _MIN_VALUE, _MAX_VALUE)
  }
}

module.exports = DayOfWeekExpression