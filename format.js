
var through = require('through2')

module.exports = function () {
  return through.obj(function (data, enc, cb) {
    var responses = data.responses || []
    delete data.responses
    data.responses = {}
    responses.forEach(function (res) {
      var answer = res.answeredOptions || res.tokens || Number(res.numericResponse)
      if(res.locationResponse) answer = res.locationResponse.text
      data[res.questionPrompt] = answer
    })
    cb(null, data)
  })
}