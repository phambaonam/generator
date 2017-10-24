## Iterables và iterators trong ES6
* Iterators là một bộ duyệt dùng để duyệt qua một mảng, một danh sách hoặc một collection mà qua mỗi lần duyệt sẽ ghi lại vị trí đã duyệt để từ đó có thể biết và lấy vị trí tiếp theo.

###  Cần phân biệt Iterable và Iterator protocol

* Iterable: là khả năng cho phép các đối tượng trong Javascript sử dụng các kỹ thuật xử lý dữ liệu như `for of loop`, toán tử ba chấm `...`.
    * Với ES6 thì các đối tượng như `Array`, `Object`, `Map`, `WeakMap`, `Set`, `WeakSet` đều là đối tượng Iterable hay gọi chúng là `Builtin iterables`.
    * Nghĩa là với các loại đối tượng kể trên thì bên trong chúng chưa đựng các phần tử,chúng ta hay `duyệt `các phần tử bằng `for ... of`, `...`, và để ghi lại các vị trí của phần tử đã duyệt trong đối tượng đó thì ta  sử dụng `Iterator` với method đặc biệt của nó. Cái phương thức đó có cái tên dc gọi là `Iterator protocol`

* Iterator protocol: là các method xử lý một đối tượng có `đánh dấu vị trí đã duyệt`, vì vậy với các đối tượng thông thường sẽ không sử dụng được nên ta phải sử dụng `Symbol.iterator` để chuyển đôi.
    * Nghĩa để `đánh dấu vị trí đã duyệt` của 1 đối tượng ta phải sử dụng `Symbol.iterator`

* [Cách tạo ra 1 iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator) 

```javascript
    var myIterable = {}
    myIterable[Symbol.iterator] = function* () {
        yield 1;
        yield 2;
        yield 3;
    }
    [...myIterable] // [1, 2, 3]
```
   
* Trong javascript thì iterator cung cấp method `next()`, phương thức này sẽ return phần tử kế tiếp, đồng thời method này cũng ghi nhận phần tử đã đánh dấu và nó return 1 object với 2 property `value` và `done`.
* Để dùng được method `next()` bạn phải thao tác chuyển đổi thông qua `Symbol.iterator`.
* Ví dụ: 
```javascript
    let arr = [1, 2, 3]
    let iterator = arr[Symbol.iterator]()
    console.log(iterator.next())
    console.log(iterator.next())                                          
    console.log(iterator.next())  
    console.log(iterator.next()) 
```
### ==> `iterable` là 1 object chứa iterator, cụ thể là khi gọi `[Symbol.iterator]()` sẽ trả về iterator của object đó. Iterator là 1 object có thể lấy ra lần lượt các iterator result, khi gọi method `next()` thì sẽ trả về `iterator result` . Giá trị trả về này là 1 object chứa 2 property `value`: `chứa giá trị của vị trí duyệt hiện tại` và `done`: `cho biết đã kết thúc quá trình duyệt hay chưa`
* Cách tự tạo 1 `iterable`:
```javascript
    let input = 'hello' 
    let obj = input
    input = {} // iterable object
    input[Symbol.iterator] = function () {
        let it = {} // iterator
        let count = 0
        it.next = function () {
            let r = (count < obj.length) ? {value: obj[count], done: false} : {value: undefined, done: true} 
            count++
            return r // iterator result
        }
        return it
    }
    console.log(obj[Symbol.iterator]()) // { next: function(){...} }
    // các iterator result
    console.log(iterator.next())
    console.log(iterator.next())
    console.log(iterator.next())
    console.log(iterator.next())
    console.log(iterator.next())
    console.log(iterator.next())
```

## Generator trong Javasccript
* Trong javascript một khi function được thực thi thì nó sẽ được đảm bảo run-to-completion tức là những phần code khác không thể can thiệp, làm gián đoạn quá trình chạy của function đó. Tuy nhiên ES6 đã cho ra mắt 1 loại function mới mà không hành xử theo lẽ thông thường như thế `Generator`

* Ví dụ đơn giản
```javascript
    var x = 1;
    function foo() {
    x++;
    bar();
    console.log( "x:", x );
    }

    function bar() {
    x++;
    }

    foo();
```
* Chúng ta có thể thấy function `bar` được gọi bên trong function `foo` và giá trị của x sau khi gọi foo() là 3. Trong trường hợp không có lời gọi `bar()` bên trong `foo` giá trị của `x` sẽ là 2. Hãy tưởng tượng bằng 1 cách nào đó mặc dù chúng ta không gọi `bar()` ở bên trong foo mà kết quả trả về vẫn là `3` ??? Đó chính là lúc mà chúng ta sử dụng `generator`

* Hãy thay đổi đoạn code 1 chút
```javascript
    var x = 1;

    function *foo() {
        x++;
        yield;
        console.log( "x:", x );
    }

    function bar() {
        x++;
    }
```
* Bạn có để ý thấy sự khác biệt ?
* Chúng ta đã có 1` generator declaration` với khai báo `function *foo()` - chú ý dấu `*` trong phần khai báo.
* Và sử dụng `generator` như sau:
```javascript
    var it = foo();
    it.next();
    x;                      // 2
    bar();
    x;                      // 3
    it.next();
```
* Xem xét từng bước một của quá trình trên:
1. Phép toán `it = foo()` không thực thi `*foo()` ngay lập tức mà tạo ra 1 `iterator` để kiểm soát quá trình thực thi này.
2. Dòng `it.next()` đầu tiên bắt đầu chạy `genertor` và thực hiện phép toán `x++`.
3. `generator` dừng lại ở lệnh `yield` sau khi lời gọi `it.next()` đầu tiên hoàn thành. Tại thời điểm này `generator` vẫn còn hoạt động nhưng chuyển sang trạng thái dừng.
4. Chúng ta kiểm tra giá trị của x và kết quả trả về là `2`.
5. Chúng ta gọi function `bar()` để tăng giá trị của x.
6. Chúng ta kiểm tra giá trị của x lần nữa và lần này kết quả là `3`.
7. Lời gọi `it.next()` cuối cùng khiến generator hoạt động trở lại, thực hiện lệnh `console.log` in ra giá trị của `x`

* Như vậy chúng ta có thể gọi `bar` bên ngoài `foo` và kết quả cuối cùng của `x` vẫn là 3. Chúng ta có thể coi điều này như là 1 sự phá vỡ rule `run-to-completion` của function

* Bạn có thể tìm hiểu về `run-to-completion` tại đây:
    * https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop
    * https://stackoverflow.com/questions/38518826/javascript-run-to-completion-working-mechanism

## Pass value to generator trong javascript

* Iteration Messaging.
    * Với lệnh yield đứng độc lập, ta có thể coi đó như 1 điểm dừng để thực hiện những xử lí chen vào giữa quá trình thực thi của function (có vẻ giống debugger mà mình vẫn hay dùng) nhưng thực thế là cách sử dụng của nó còn linh hoạt hơn thế.
```javascript
    function *foo(x) {
        let y = x * (yield);
        return y;
    }
    
    let it = foo( 6 );

    console.log(it.next()) // { value: undefined, done: false }
    console.log(it.next(7)) // { value: 42, done: true }
```
* Ở đây ta có thể sử dụng `yield` như 1 nơi để truyền tham số vào, đọc thêm [tại đây](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/next) và [đây](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield).
* Chuôĩ câu lệnh trên truyền 6 là giá trị đầu vào cho `x` và truyền 7 như là gía trị cho `yield` và gía trị sau khi tính toán là 6*7=42.
* Câu chuyện ở đây là gì?
    * Câu lệnh `next` đầu tiên bắt đầu `generator` và chạy cho đến khi gặp `yield`.
    * Khi gặp lệnh `yield`, `yield` đặt ra câu hỏi giá trị truyền vào ở đây là gì.
    * Câu lệnh `next` đầu tiên đã hoàn thành xong nhiệm vụ của mình vậy nên trách nhiệm trả lời này sẽ nằm trong câu lệnh `next` tiếp theo. Khi lệnh `next` tiếp theo được thực hiện, nó trả lời cho câu hỏi mà `yield` đặt ra mà thực thi nốt phần còn lại.

* Ví dụ:
```javascript
    function* crossBridge() {
        const reply = yield 'What is your favorite color?'
        console.log(reply)
        if (reply !== 'yellow') return 'Wrong!'
        return 'You may pass.'
    }
```
```javascript
    const iter = crossBridge()
    console.log(iter.next())
    console.log(iter.next('blue'))
```
```javascript
    const iter = crossBridge()
    console.log(iter.next())
    console.log(iter.next('yellow'))
```
* Phân tích ví dụ trên:
    * Câu lệnh `next` đầu tiên bắt đầu `generator` và chạy cho đến khi gặp `yield`.
    * Lúc này trong `yield` sẽ gán `value` : `What is your favorite color?` vào biến `reply` sau đó tạm thời dừng lại(yield vẫn chưa chạy xong đâu).
    * Câu lệnh `next` tiếp theo `iter.next('blue')` sẽ truyền vào `generator` 1 `value` là `blue`, lúc này `yield` sẽ gán `value` là `blue` mà ta truyền vào generator cho biến `reply` và chạy cho đến xong `yield`, sau đó sẽ chạy đến `console.log(reply)`. Sau đó chạy tới `if` để so sánh. Cuối cùng sẽ chạy đến `return`.
    * Bản chất khi dùng `next() - [yield - next()]` thực chất là `run - [pause - resume - run next]`.
    
* Muliple iterators
    * Mỗi khi chúng ta tạo một iterator thì chúng ta cũng đã tạo 1 generator instance.(Giống như bạn tạo class và sau đó bạn tạo ra nhiều instance với class đó).
    * Khi có nhiều instance của cùng 1 generator thì chúng có thể tương tác với nhau.
```javascript
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
    it1.next(val2 / 2) // 20 300 3
    it2.next(val1 / 4) // 200 10 3
```    
* Trong đoạn code trên thì khi khởi tạo `it1` và `it2` chúng ta có 2 generator instance của generator `foo`.
* Trong ví dụ trên giá trị của `it1` và `it2` có thể nhận iterator còn lại làm tham số trong quá trình tính toán của mình.
* Đối với trường hợp 2 `iterator` của 2 `generator` khác nhau tùy theo cách thực hiện các step trong function của các generator mà kết quả trả về rất khác nhau. Hiện tượng `race condition` xảy ra và nó tương tự như việc xung đột tài nguyên giữa các thread trong các ngôn ngữ hỗ trợ multi-thread vậy.

* Ví dụ với 2 generator sau:
```javascript
    let a = 1
    let b = 2

    function *foo() {
        a++
        yield
        b = b * a
        a = (yield b) + 3
    }

    function *bar() {
        b--
        yield;
        a = (yield 8) + b
        b = a * (yield 2)
    }
```
* Nếu `foo` và `bar` là 2 function thông thường thì kết quả khi thực thiện foo, bar sẽ chỉ có 2 case:
    * thực hiện `foo` trước, `bar` sau.
    * thực hiện `bar` trước, `foo` sau
* Nó chính là các case có thể xảy ra khi xử lí không đồng bộ `foo` và `bar`.
* Nhưng với `generator` - thứ phá vỡ luật `run-to-completion`, việc xen kẽ các step của `foo` và `bar` là điều có thể.    
* Số lượng cách sắp xếp các step trộn lẫn với nhau cũng như số lượng kết quả trả về là khá nhiều và phức tạp.

## Generator Iterator.
* General iterator có thể sử dụng khi cần tính toán 1 chuỗi giá trị mà giá trị sau phụ thuộc vào giá trị trước.
* Mỗi lần gọi `next` chúng ta lại có thể nhận được 1 gía trị mới. Công việc này cũng có thể thực hiện bằng `closure`.
```javascript
    var foo = (function(){
        var nextVal;

        return function(){
            if (nextVal === undefined) {
            nextVal = 1;
            }
            else {
            nextVal = (3 * nextVal) + 6;
            }

            return nextVal;
        };
    })();
    foo();       // 1
    foo();       // 9
    foo();       // 33
    foo();       // 105
```
* Mỗi lần gọi `foo` chúng ta nhận được 1 giá trị mới của chuỗi số.
* Với phong cách của `generator` chúng ta có thể định nghĩa 1 `generator` và cho chạy loop qua `generator` đó:
```javascript
    function *foo() {
        let nextVal
        while (true) {
            nextVal = (nextVal === undefined) ? 1 :  (3 * nextVal) + 6
            yield nextVal
        }
    }
    for (let v of foo()) {
        console.log( v )
        if (v > 500)  break
    }
    // 1 9 33 105 321 969
```
* Cách viết này sử dụng vòng lặp `while (true)` - bình thường sẽ gây `infinite loop` tuy nhiên với lệnh `yield` đặt bên trong loop `generator` sẽ dừng lại tại mỗi lần lặp, lệnh `yield` cũng giữ lại gía trị của function foo mà không cần đến closure để lưu lại biến trạng thái. Khi thực hiện lệnh `for ... of` chúng ta vẫn có thể ngắt vòng lặp bằng cách check điều kiện và break.

* Chú ý:
    * Nếu thử dùng` yield` với một giá trị trong` callback` thì cho dù đã `declared` trong generator thì nó vẫn sẽ bị lỗi:
```javascript
    function* generator() {
        ['foo','bar'].forEach(e => yield e) // SyntaxError
        // We can't use 'yield' inside a non-generator function.
    }
```
## yield*
* `yield*` được tạo ra nhằm có khả năng gọi một generato `nằm trong` một generator `khác`:
```javascript
    function* foo() {
        yield 'foo'
    }

    // How would we call 'foo' generator inside the 'bar' generator?
    function* bar() {
        yield 'bar'
        foo()
        yield 'bar again'
    }

    const b = bar();

    b.next() // { value: 'bar', done: false }
    b.next() // { value: 'bar again', done: false }
    b.next() // { value: undefined, done: true }
```
* Bạn có thể thấy `b` iterator, thuộc bar generator, không hề chạy như đúng ý ta khi call foo.
* Đó là mặc dù `foo` execution cho ra một iterator, nhưng ta sẽ không có lặp lại (iterate) nó được.
* Vì thế mà ES6 cần có operator  yield*
```javascript
    function* bar() {
        yield 'bar'
        yield* foo()
        yield 'bar again'
    }
    const b = bar();
    b.next() // { value: 'bar', done: false }
    b.next() // { value: 'foo', done: false }
    b.next() // { value: 'bar again', done: false }
    b.next() // { value: undefined, done: true }
```
* Đồng thời nó cũng hoàn toàn có thể áp dụng với data consumers 
```javascript
    for (let e of bar()) {
        console.log(e)
        // bar
        // foo
        // bar again
    }
    console.log([...bar()]) // [ 'bar', 'foo', 'bar again' ]
```
* `yield*` có khả năng kiểm tra và chạy qua hết tất cả ngõ ngách trong generator để `yield` ra phần nó cần:
```javascript
    function* bar() {
        yield 'bar'
        for (let e of foo()) {
            yield e
        }
        yield 'bar again'
    }
```

## ==> Generators cũng chính là Iterators
![funny](./images/funny.gif)

## Một số thư viện có thể dùng với generator:
* [co](https://github.com/tj/co)
* [Promise.coroutine của thư viện bluebird](http://bluebirdjs.com/docs/api/promise.coroutine.html)
* [db.task() của thư viện pg-promise](http://vitaly-t.github.io/pg-promise/Database.html#task)
* [Tham khảo thêm bài này](http://tobyho.com/2015/12/27/promise-based-coroutines-nodejs/)

### Tài liệu tham khảo
* https://strongloop.com/strongblog/how-to-generators-node-js-yield-use-cases/
* https://kipalog.com/posts/function--va-yield-trong-Javascript-generator-function
* https://nodejs.vn/topic/386/work-flow-c%E1%BB%A7a-function-generator-trong-es6
* https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Statements/function
* https://pusher.com/sessions/meetup/london-node-user-group/promises-and-generators-in-nodejs
* https://www.sitepoint.com/6-nodejs-static-site-generators/
* https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Global_Objects/Generator
* https://davidwalsh.name/es6-generators
* https://davidwalsh.name/async-generators
* https://medium.com/javascript-scene/the-hidden-power-of-es6-generators-observable-async-flow-control-cfa4c7f31435

* https://viblo.asia/p/generator-trong-javasccript-WEMGBjjVGQK
* https://viblo.asia/p/iterator-in-javascript-XQZGxAdLewA
* https://blog.topdev.vn/cung-kham-pha-suc-manh-cua-es6-generators/
* https://gist.github.com/ericelliott/890c20d18bcc4362048dba2dca8e67ac

* https://medium.com/@rdsubhas/es6-from-callbacks-to-promises-to-generators-87f1c0cd8f2e
* https://www.sitepoint.com/javascript-generators-preventing-callback-hell/
