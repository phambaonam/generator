let input = 'hello'
let obj = input
input = {}
input[Symbol.iterator] = function () {
    let it = {}
    let count = 0
    it.next = function () {
        let r = (count < obj.length) ? {value: obj[count], done: false} : {value: undefined, done: true}
        count++
        return r
    }
    return it
}

console.log(obj[Symbol.iterator]()) // { next: function(){...} }

let iterator = input[Symbol.iterator]()
// let iteratorResult
// while(true) {
//     iteratorResult = iterator.next()
//     if(iteratorResult.done) break
//     console.log(iteratorResult)
// }
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())