/*
Trong ES5 không tồn tại dữ liệu dạng cấu trúc tập hợp, vì vậy chúng ta sử dụng mảng để lưu trữ dữ tập hợp các phần tử. 
Tuy nhiên với ES6 thì mọi chuyện đơn giản hơn bởi vì nó có hỗ trợ kiểu dữ liệu tập hợp Set với các giá trị 
truyền vào tùy ý kèm theo tốc độ xử lý nhanh chóng.
*/

/*** Set trong ES6 ***/
// set có cấu trúc dạng value
let arr1 = [1, 1, 2, 3, 4]
// Đối với Set thì các giá trị không được trùng.
// Vì vậy nếu bạn cố tình thêm vào hai giá trị giống nhau thì nó chỉ lưu một lần.
console.log(new Set(arr1)) // Set { 1, 2, 3, 4 }
let numbers1 = new Set(arr1)

console.log('Thêm phần tử:', numbers1.add(5)) // Set { 1, 2, 3, 4, 5 }

console.log('Xóa đi phần tử thứ 2:', numbers1.delete(2)) // true

console.log('Kiểm tra sự tồn tại của số 1:', numbers1.has(1)) // true
console.log('Kiểm tra sự tồn tại của số 5:', numbers1.has(6)) // false

console.log('Tổng số phần tử:', numbers1.size) // 4

console.log('Xóa toàn bộ phần tử:', numbers1.clear())
console.log(numbers1) //Set {}
console.log('Số phần tử còn lại trong numbers1:', numbers1.size) // 0

/*** Sử dụng vòng lặp với Set ***/
let arr2 = [1, 2, 3, 4]
let numbers2 = new Set (arr2)
for (let number of numbers2) {
    console.log(number)
}

/*** Chuyển đổi Set sang Array ***/
let arr3 = [1, 2, 3, 4]
let numbers3 = new Set(arr3)
let arrayConverted = [...numbers3]
console.log('Convert Set sang Array:', arrayConverted)
/**
 * Bài toán nhỏ: cho 1 array [1, 1, 2, 5, 3, 4, 3, 6, 1].
 * Hãy xóa đi tất cả các phần tử giống nhau trong mảng.
 * Hãy xóa đi tất cả các phần tử giống nhau trong mảng
 */
let arr = [1, 1, 2, 5, 3, 4, 3, 6, 1]
let numbers = new Set(arr)
console.log([...numbers])

/*** 
 * Mapping và filtering 
 * map và filter được dùng để chuyển đổi qua Array va xử lý
 ***/

let set = new Set([1, 2, 3])
console.log(set)
// Mapping là một hàm được tích hợp sẵn trong Array với chức năng là thiết lập giá trị cho phần tử trong môi lần lặp
let arr_map = [...set].map(x => {
    return x*2
})
console.log(arr_map)

// Filtering chức năng của hàm này là trả về true thì phần tử được chọn, trả về false thì phần tử không được chọn
let arr_filter = [...set].filter(x => {
    return x%2 == 0
})
console.log(arr_filter)