class StepExpression {
  /**
   * Processing expression like '2/12' which described by /^\d+\/\d+$/
   * 
   * seed num -> the first num before charactor '/' 
   * step num -> the second num after charactor '/'
   * 
   * @param {String} expression expression to process
   * 
   * @param {Number} scopeMin The min valid value of the item in expression
   * 
   * @param {Number} scopeMax The max valid value of the item in expression
   */
  static process (expression, scopeMin, scopeMax) {
    let _expression = expression
    scopeMin = scopeMin || 0
    scopeMax = scopeMax || 0

    // proccessing the normal step expression like '2.12'. if matched, get the seed num and step num.
    const reg = /^(\d+)\/(\d+)$/
    let match = reg.exec(_expression)
    if (match !== null && match.length > 0) {
      const returnValues = []
      let seedNum = parseInt(match[1], 10)
      let stepNum = parseInt(match[2], 10)

      while (scopeMin <= seedNum && seedNum <= scopeMax) {
        returnValues.push(seedNum)
        seedNum = seedNum + stepNum
      }

      _expression = returnValues.join(',')
    }

    // proccesing the special step expression combined with range expression. 
    // ie. '1-12/2' means 1,3,5,7,9,11
    // if matched, get the min and max value of the seed num , step num 
    match = /^(\d+)\-(\d+)\/(\d+)$/.exec(_expression)
    if (match !== null && match.length > 0) {
      const returnValues = []
      
      let seedNum = parseInt(match[1], 10)
      let seedNumMax = parseInt(match[2], 10)
      let stepNum = parseInt(match[3], 10)

      while (scopeMin <= seedNum && seedNum <= scopeMax) {
        returnValues.push(seedNum)
        seedNum = seedNum + stepNum
        if (seedNum > seedNumMax) break
      }

      _expression = returnValues.join(',')
    }
    return _expression
  }
}

module.exports = StepExpression