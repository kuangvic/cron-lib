const Parser = require('../lib/parser')
const moment = require('moment-timezone')

// 每隔3天的12:00执行
const parser = new Parser(`0 0 12 *|3 * *`, {
  startDate: moment().format('YYYY-MM-DD HH:mm:ss'),
  endDate: moment().add(5, 'years').format('YYYY-MM-DD HH:mm:ss')
})

console.log(parser.getExpression())

// get all scheduled time
while (true) {
  const matched = parser.next()
  if (!matched) break
  console.log(moment(matched).format('YYYY-MM-DD HH:mm:ss'))
}