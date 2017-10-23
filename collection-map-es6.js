/**
 * Map là một kiểu dữ liệu tương tự như Set,
 * tuy nhiên với Map thì có cấu trúc dạng key => value còn với Set thì chỉ có value
 * Đối với Map thì các key không được trùng, vì vậy nếu bạn truyền vào 2 key giống nhau thì nó chỉ lưu đè vào một key duy nhất.
 */

/***  
 * Khởi tạo
 * Lúc khởi tạo sẽ có một tham số truyền vào và giá trị của tham số này là một mảng chứa nhiều mảng con.
 * Mỗi mảng con sẽ có hai phần tử đại diện cho key và value.
 ***/

 let map = new Map([
     ['name', 'phambaonam'],
     ['age', 23]
 ])
 console.log('Khởi tạo map:', map) // Map { 'name' => 'phambaonam', 'age' => 23 }

/**
 * Thêm phần tử
 */
let map = new Map()
map.set('name', 'phambaonam')
console.log('Thêm phần tử vào map:', map)

/**
 * Xóa phần tử
 */
let map = new Map([
    ['name', 'phambaonam']
])
map.delete('name')
console.log('Xóa phần tử trong map:', map) // Map {}

/**
 * Kiểm tra phần tử tồn tại
 */

 let map = new Map([
     ['name', 'phambaonam'],
     ['age', 23]
 ])
 console.log('Kiểm tra sự tồn tại của key name:', map.has('name')) // true
 console.log('Kiểm tra sự tồn tại của key money:', map.has('money')) // false

/**
 * Đếm tổng số phần tử
 */

let map = new Map([
     ['name', 'phambaonam'],
     ['age', 23]
])
console.log('Tổng số phần tử là:', map.size)
 
/**
 * Xóa toàn bộ phần tử
 */

let map = new Map([
     ['name', 'phambaonam'],
     ['age', 23]
])
map.clear()
console.log('Số phần tử còn lại trong map:', map.size) //0

/**
 *  Mỗi phần tử trong Map luôn ở dạng key => value, vậy có câu hỏi đặt ra là định dạng của key như thế nào?
 *  key có thể là một string, number, const hay thậm chí là một NaN.
 */
let map = new Map([
    ['name', 'ND'],
    [1, 'phambaonam'],
    [NaN, 'value of map']
])
console.log(map)

/**
 * Các hàm bỗ trợ trong Map:
 * Hàm keys() - lấy danh sách keys.
 * Hàm values() - lấy danh sách values
 * Hàm entries() - lấy danh sách keys + values
 */

let map = new Map([
    ['name', 'phambaonam'],
    ['age', 23]
])

for(let key of map.keys()) {
    console.log('Trong map có key:', key)
}

for(let value of map.values()) {
    console.log('Trong map có value:', value)
}

for(entry of map.entries()) {
    console.log('Cặp key - Value trong map:', `${entry[0]} - ${entry[1]}`)
}

/**
 * Lặp qua các phần tử trong Map.
 * Dùng vòng lặp for.
 * Dùng vòng lặp forEach
 */
let map = new Map([
    ['name', 'phambaonam'],
    ['age', 23]
])

for(let [key, value] of map) {
    console.log(`${key} - ${value}`)
}

map.forEach((value, key) => { // cẩn thận nhầm vị trí của key - value
    console.log(`${key} - ${value}`)
})

/**
 * Mapping và Filtering
 * Tương tự như Set thì chúng ta có thể chuyển đổi sang Array vaf kết hợp với hai hàm map và filter.
 */

//  Nối giá trị của key vào value

let map1 = new Map() // Giá trị ban đầu
            .set(1, 'a')
            .set(2, 'b')
            .set(3, 'c')
            .set(4, 'd')
            .set(5, 'e')

let map2 = new Map([ // Chuyển đổi
    [...map1].map(
        ([key, value]) => [key, key + '-' + value]
    )
])
console.log('Kết quả:', map1)

// Giá trị ban đầu
let map1 = new Map()
            .set(1, 'a')
            .set(2, 'b')
            .set(3, 'c')
            .set(4, 'd')
            .set(5, 'e')
 
// Chuyển đổi
let map2 = new Map(
    [...map1].filter(
        ([key, value]) => key % 2 == 0
    )
)

console.log('Kết quả:', map1);