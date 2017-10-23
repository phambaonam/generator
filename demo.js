const Promise = require('bluebird')
const fs = Promise.promisifyAll(require("fs"))
const file = './data.txt'
// fs.readFileAsync(file, "utf8")
// .then(function(contents) {
//     console.log(contents)
// }).catch(function(e) {
//     console.error(e.stack)
// })

function* foo () {
    return yield fs.readFileAsync(file, "utf8")
}
foo = Promise.coroutine(foo)

// use that function somewhere
foo()
    .then(function(contents) {
    console.log("contents:", contents)
    })
    .catch(function(err) {
    console.log("error!", err)
    })