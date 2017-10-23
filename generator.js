/*** Input và output ***/
function *foo(x,y) {
    return x * y;
}

let it = foo(6, 7)

console.log(it.next())

/***  pause with yield, resume with next() ***/
let x = 1

function *foo() {
    x++
    yield
    console.log( "x:", x )
}

function bar() {
    x++
}

var it = foo()
console.log(it)
it.next()
x                  // 2
bar()
x                  // 3
it.next()

/*** Pass value to generator ***/
function *foo(x) {
    let y = x * (yield)
    return y
}
  
let it = foo(6)

console.log(it.next())
console.log(it.next(7))

function* crossBridge() {
    const reply = yield 'What is your favorite color?';
    console.log(reply);
    if (reply !== 'yellow') return 'Wrong!'
    return 'You may pass.';
}

const iter = crossBridge()
console.log(iter.next())
console.log(iter.next('blue'))

/*** Muliple iterators ***/
let z = 1

function *foo() {
    let x = yield 2
    z++
    let y = yield (x * z)
    console.log( x, y, z )
}
  
// Tạo ra instance
let it1 = foo()
let it2 = foo()

// Qúa trình chạy
/**
 * next() đầu tiên chạy,
 *  Bắt đầu chạy generator.
 *  gặp yield dừng lại và gán x = 2
 */
let val1 = it1.next().value // 2 <-- yield 2
console.log(val1) // 2
let val2 = it2.next().value // 2 <-- yield 2

/**
 * next() tiếp theo chạy,
 * pass value = 20 vào generator, lúc này x sẽ dc gán lại là 20,
 * chạy tới z++ và tăng lên z = 2,
 * chạy tiếp tới y, gặp yield dừng lại và gán giá trị cho y là 600
 */
val1 = it1.next(val2 * 10).value // x = 20, z = 2, y = 40
console.log(val1) // 40
val2 = it2.next(val1 * 5).value // x = 200, z = 3, y = 600
console.log(val2) // 600

/**
 * next() tiếp theo chạy,
 * pass value = 300 vào generator, lúc này y sẽ dc gán lại là 300,
 * chạy tiếp tới console.log( x, y, z )
 */
it1.next(val2 / 2)
it2.next(val1 / 4)