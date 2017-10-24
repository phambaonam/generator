const Promise = require('bluebird')
const fs = Promise.promisifyAll(require("fs"))
const file = './data.txt'
fs.readFileAsync(file, "utf8")
    .then(function(contents) {
        console.log(contents)
    }).catch(function(e) {
        console.error(e.stack)
    })