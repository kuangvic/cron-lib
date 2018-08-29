
const RangeExpression = require('./range')
const StepExpression = require('./step')
const WildCardExpression = require('./wildcard')
const _ = require('lodash')

const process = (expression, scopeMin, scopeMax) => {
  scopeMin = scopeMin || 0
  scopeMax = scopeMax || 0

  let result = expression.split(',').map(item => {
    let temp = item
    temp = WildCardExpression.process(temp, scopeMin, scopeMax)
    temp = RangeExpression.process(temp, scopeMin, scopeMax)
    temp = StepExpression.process(temp, scopeMin, scopeMax)
    return temp
  })

  // unsupported expresssion like 2/13-31 will be converted into 2
  result = result.join(',').split(',').map(item => {
    return parseInt(item, 10)
  })

  // filter valid value
  result = _.filter(result, item => {return scopeMin <= item && item <= scopeMax})

  // unique and sort
  result = _.uniq(result).sort((a, b) => {return a - b})

  return result.join(',')
}

module.exports = {
  RangeExpression,
  StepExpression,
  WildCardExpression,
  integratedProcess: process
}