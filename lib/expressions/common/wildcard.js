class WildCardExpression {

  /**
   * Processing the expression contains charactor '*'
   * 
   * @param {*} expression 
   * @param {Number} scopeMin 
   * @param {Number} scopeMax 
   */
  static process (expression, scopeMin, scopeMax) {
    let _expression = expression
    scopeMin = scopeMin || 0
    scopeMax = scopeMax || 0

    // convert the expression like '*' into range expression. for example: '0-59'
    if (/^\*$/.test(_expression)) return `${scopeMin}-${scopeMax}`
    
    // convert the expression like '*/12' into step expression. for example: '0/12'
    if (/^\*\/\d+$/.test(_expression)) return _expression.replace(/\*/gi, scopeMin)

    return _expression
  }
}

module.exports = WildCardExpression