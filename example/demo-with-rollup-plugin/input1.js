import increaser from './input2'
var num = 1
var str = 'foo'
var boo = false
var fn = () => {
    console.log(boo)
}
var b = window.localStorage.getItem(str)
var num2 = increaser(num)

fn()
console.log(num2, boo)
alert(b)
