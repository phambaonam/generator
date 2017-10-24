/**
 * Using library bluebird
 */
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require("fs"))
const file = './data.txt'

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
    
/**
 * Using library Co
 */
const fs = require('fs')
const co = require('co')
const fileName = './data.tx'
const readFile = function (file) {
    return function (cb) {
        fs.readFile(file, 'utf8', cb)
    }
}

co(function* () {
    return yield readFile(fileName)
})
    .then(data => {
        console.log(data)
    })
    .catch(err => {
        throw err.stack
    })


