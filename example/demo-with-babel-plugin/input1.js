
import { foo1 } from './module'
import $ from 'gogocode'

var bad = 'module1'

var times = 99

var fo1 = foo1()

var fo3 = function (){
    var code = $('var code = 1').replace('var $_$1 = $_$2', 'let $_$1 = $_$2').generate()
    console.log(code)
    return code
}

console.log(start, fo1, times,fo3)