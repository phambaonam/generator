
/*** Iterable và Iterator ***/

let arr = [1, 2, 3]
let iterator = arr[Symbol.iterator]()
console.log(arr)
console.log(...arr)
console.log(iterator.next())
console.log(iterator.next())                                          
console.log(iterator.next())  
console.log(iterator.next()) 

let str = 'hello'
let iterator = str[Symbol.iterator]()
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

let map = new Map().set('a', 1).set('b', 2)
console.log(map)
let iterator = map[Symbol.iterator]()
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

let set = new Set().add('a').add('b');
console.log(set)
const iterator = set[Symbol.iterator]()
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

function printArgs () {
    let iterator = arguments[Symbol.iterator]()
    console.log(iterator.next())
    console.log(iterator.next())
    console.log(iterator.next())
}

printArgs('a', 'b')


/***  Toán tử ...  ***/

let arr = ['a', 'b', 'c']
console.log('Liệt kê array:', ...arr) // Liệt kê
let new_arr = [...arr, 'c', 'd']
console.log('Bổ sung new array:', ...new_arr) // 'Bổ sung'


let map = new Map().set('a', 1).set('b', 2)
console.log('Liệt kê map:', ...map) 
let new_map = new Map([...map]).set('c', 3).set('d', 4)
console.log('Bổ sung new map:', ...new_map)


let set = new Set().add('a').add('b')
console.log('Liệt kê set:',...set)
let new_set = new Set([...set]).add('c').add('d')
console.log('Bổ sung new set:', ...new_set)