var message = "Hello world"
console.log(message)

let arr1 = [10,20]
let arr2 = [30,40]
let arr3 = [...arr1, ...arr2]
console.log(arr3)

function retStr(){
    return "Hello World!!"

}
var val = retStr()
console.log(val)

function add(a,b){
    var sum = a + b
    console.log("The sum is: "+ sum)
}
add(1,2)