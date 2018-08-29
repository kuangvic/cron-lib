const _ = require('lodash')

const replaceWithRange = (expression, text, begin, end) => {
  let values = []

  let last = Math.max(parseInt(end, 10), parseInt(begin, 10))
  let first = Math.min(parseInt(end, 10), parseInt(begin, 10))

  for (let i = first; i <= last; i++) {
    values.push(i);
  }

  return expression.replace(new RegExp(text, 'gi'), values.join());
}

/**
 * The conversion of range based on regular expression /^(\d+)\-(\d+)$/
 */
class RangeExpression {
  /**
   * convert the range expression like '0-12' to '0, 1, 2, ..., 12)
   * 
   * @param {String} expression 
   * @param {Number} scopeMin The min of valid value
   * @param {Number} scopeMax The max of valid value
   */
  static process (expression, scopeMin, scopeMax) {
    let _expression = expression
    scopeMin = scopeMin || 0
    scopeMax = scopeMax || 0

    const rangeRegEx = /^(\d+)\-(\d+)$/
    const match = rangeRegEx.exec(_expression)
    if (match !== null && match.length > 0) {
      _expression = replaceWithRange(_expression, match[0], match[1], match[2]);
    }
    
    return _expression
  }
}

module.exports = RangeExpression

