function makeIterator(array) {
    let nextIndex = 0
    
    return {
       next () {
           return (nextIndex < array.length) ? {value: array[nextIndex++], done: false} : {done: true};
       }
    }
}

var it = makeIterator(['yo', 'ya'])
console.log(it.next()) // 'yo'
console.log(it.next()) // 'ya'
console.log(it.next())  // true