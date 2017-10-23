var Promise = require('bluebird')
var request = Promise.promisifyAll(require('request'))
var url1='http://httpbin.org/', url2=url1, url3=url1, url4=url1

function* foo() {
  var res1 = yield request.getAsync(url1)
  var res2 = yield request.postAsync(url2)
  var res3 = yield request.putAsync(url3)
  var res4 = yield request.delAsync(url4)
  return "whew all done"
}

foo = Promise.coroutine(foo)

// use that function somewhere
foo()
    .then(function(message) {
    console.log("success!", message)
    }).catch(function(err) {
    console.log("error!", err)
    })