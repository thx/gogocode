---
title: Cookbook
order: 4
---

<a name="f53db5e0605353de89791ad2873fad77"></a>
## Find and modify AST node
<a name="97f42f124aee8fdfe96b1172afd218ef"></a>
### 01.Find variable
 <a target="_blank" href="https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIBuBDAJwAI4C00ARPOPIgXiOAB0IiiI8BbNTIpkALIBPIgBUyafgBoWbAMYALMABsUZCLwDasto3ZcefEArTLlSfkQC+M1ruD7uvfgHdqlmzrbM7ux4f5FFRQiADMkVTQCaS9dINV1LVi-Hz80-2cQeJDwyOiQW3S-bMSiTQcOJyMTMwsQayk9SoCQNzgPAF1k3U9fNIqDTJrzD0KigarXd3reosZuv2bM7LCI9HyxuZK0DTKJluG6hqbBozbOheturr6rHRurAG4WFjkkCABnOCI8KCh6IgANRgaAAdHIyNQ0ABBP4AClSRBQ1DwvFCMAgcjgYHecIAlPM+mQ4DACKxEX5SOQqDReFTKCjYnc7LMiNw4ApUB9eBS2XgANZoABiayiaIxWJxEDhYDgaE4BN5bFl8vBSgSOwBmg6zz6bA5YA+oLwKBQAEk5ZwZZa8bq-Ky2CbzZbxZjsbiVQrCelPWrgupQbAPgoEZclkYIGgXEQvjBQqF+N0rLamTpmcmXhw-uCkJwoO8dnA4fx6QBaT3Sb0keVQZRQ3gAcgAxJ7S5ba1CG2MoAQkFBuVXlS6iAB5ABGACs0Fi02NkbSwhL3dLFbFiaTyd1DSOoDs0XhlB9JLc7Q0dG88-A0CgebFDSK8q7JbjV3qiOuySQlEbfdtWAAyf8v0NUFf3VNQdlBZQdgAcw5U82GZRCxnZTkUAHXk4CQGCYOgp9l3xQddDAUIiDhA0fw+B91lfOYKNAj4d01BgAEJ6O3XcIAQnomU2PlBWosVFzdKVCKVIgSLItjvwYwSCFoop6IAEnlWVixATgBTQUtcnWSt2JtbjKRkjjmJIAgQSMq5bjTFgMwgFhfigUFOCQDEi2bdBXIbPEClaJACH5ZB0CwEB0RE95zLwT5wgIK1QhUNAzQgcJGl+MBGj7ZcPgUt5Pm+JSAXS0EYOwpA3nQc93i+GM3IIOQ0ABBLoOS8JQQ+OqGp0AB6br3zQElPyEOqopigLuBCCrGpMMgqvy-qPhgZRvgYbUdCUuEOtJBq8ViUEEogFA4QbJSAH0lOaHy9rQPBFDha15QJOgAD4iLYMhFuWwMYGDB7OBc6hFE0BtLo6TQAAYOlBfBlBBXbbnh96Bo3BalrgUEJyQSBjqYFgrogZk-MgWA4AAGWimDQrgIRdw+CEwCgOA-IUPAPgABWJbEoiwUIDyPKQQEWsdATAKNRBpjBsHpEArCAA">Try it out at playground>>></a>
```javascript
// find all Identifier nodes
$(code)
  .find('$_$name')
	.each(item => {
  	console.log(item.match)
	})

// find the Identifier node named 'list'
$(code)
  .find('list')
```
<a name="a1524254d79207b38d6bc70760b30a00"></a>
### 02.Modify the variable's name
<a target="_blank" href="https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGSIDOcABAGZpw4AWxAvMQBQCUdAfMcAL4DcxAOhDyESEJAioBDCAHM0dYgHJylKgpAAaEAHckAJwDWydFhCkYguGHzE4uqQVJ6Atg1JgANmgCSER+uISUGD+SFCW+AQswALExEJExAAk8oFgAHTSSJl46DFxESQESDC6OHL0bp4+jmlFJWV5APSNxLoUJRDEAJ7FujZ2hI66Tmgo+ejEVGhtAnltcB1JDHWlaEx5sWluECgMShTUCuudscRpaBLUDAxgcGhOLLTs0SenxLf3aW1Q7pdoAEJdPZtACOMDQRCOG2InGOby+SCQcGY0IyaAg0wkdxREE4Ag04Gg8AAMlJpCY4F0oBCcLowGECZICAAFeaWaZYUgSdwENCaAgwABGADUwGgtAAVKkYbB4JxQCRtECcIA">Try it out at playground>>></a>

```javascript

// replace the Identifier 'fetch' with 'request'
const res = $(`const fetch = () => {}; const noChange = 'fetch'`)
  .find('fetch')
  .each((item) => {
    item.replaceBy('request')
  })
  .root()
  .generate()
```
<a name="D7P79"></a>
### 03.Find string
<a target="_blank" href="https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIBuBDAJwAI4C00ARPOPIgXiOAB0IiiI8BbNTIpkALIBPIgBUyafgBoWbAMYALMABsUZCLwDasto3ZcefEArTLlSfkQC+M1ruD7uvfgHdqlmzrbM7ux4f5FFRQiADMkVTQCaS9dINV1LVi-Hz80-2cQeJDwyOiQW3S-bMSiTQcOJyMTMwsQayk9SoCQNzgPAF1k3U9fNIqDTJrzD0KigarXd3reosZuv2bM7LCI9HyxuZK0DTKJluG6hqbBozbOheturr6rHRurAG4WFjkkCABnOCI8KCh6IgANRgaAAdHIyNQ0ABBP4AClSRBQ1DwvFCMAgcjgYHecIAlPM+mQ4DACKxEX5SOQqDReFTKCjYnc7LMiNw4ApUB9eBS2XgANZoABiayiaIxWJxEDhYDgaE4BN5bFl8vBSgSOwBmg6zz6bA5YA+oLwKBQAEk5ZwZZa8bq-Ky2CbzZbxZjsbiVQrCelPWrgupQbAPgoEZclkYIGgXEQvjBQqF+N0rLamTpmcmXhw-uCkJwoO8dnA4fx6QBaT3Sb0keVQZRQ3gAcgAxJ7S5ba1CG2MoAQkFBuVXlS6iAB5ABGACs0Fi02NkbSwhL3dLFbFiaTyd1DSOoDs0XhlB9JLc7Q0dG88-A0CgebFDSK8q7JbjV3qiOuySQlEbfdtWAAyf8v0NUFf3VNQdlBZQdgAcw5U82GZRCxnZTkUAHXk4CQGCYOgp9l3xQddDAUIiDhA0fw+B91lfOYKNAj4d01BgAEJ6O3XcIAQnomU2PlBWosVFzdKVCKVIgSLItjvwYwSCFoop6IAEnlWVixATgBTQUtcnWSt2JtbjKRkjjmJIAgQSMq5bjTFgMwgFhfigUFOCQDEi2bdBXIbPEClaJACH5ZB0CwEB0RE95zLwT5wgIK1QhUNAzQgcJGl+MBGj7ZcPgUt5Pm+JSAXS0EYOwpA3nQc93i+GM3IIOQ0ABBLoOS8JQQ+OqGp0AB6br3zQElPyEOqopigLuBCCrGpMMgqvy-qPhgZRvgYbUdCUuEOtJBq8ViUEEogFA4QAAwbJSAH0lK+AgG2O3a+lBNA8EUOFrXlAk6AAPiItgyEW5bAxgYM3s4FzqEUTQG2uhsOk0AAGDpQXwZQQXu+00d0UFeyQIsMbYfbICO07hDECRbrxohHuekNPXob7xL+pa4FBDFgxIotfWoUg4QbZGQR8in7J0D9WEZgGJyQSAeaYFgfLslg-MgWA4AAGWimDQrgIRdw+CEwCgOA-IUPAPgABWJbEoiwUIDyPKQQEWsdATAKNRG1jBsHpEArCAA">Try it out at playground>>></a>
```javascript
// find all StringLiteral nodes
$(code)
  .find(`'$_$str'`)
	.each(item => {
		console.log(item.match)	
	})

// find the StringLiteral node that named 'My Tree'
$(code)
  .find(`'My Tree'`)
	.each(item => {
		console.log(item.node)	
	})
```
<a name="fb629b8d74dbd85e706f0ded2585fbe4"></a>
### 04.Find assignment
<a target="_blank" href="https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGSIDOcABDgIYBOxAvMcAL4A6E5FAdHgDZJW0DkFNCj7NWbAmABeaGsT4EAtmU6cREUfiLEAFkhgEZtBs1360HJN15yA7trBw0a0wfFTDczpQDmT5hsISMigoWQA1GHMcQTJHAEEQgApgZmJiFFiyTGIAMxgWODB8RIBKOlS04kE4GAoIcvrKtLhBNAARTOyWtHbMirSmRvoAGgqFNDhdFAJslMa0pQBrNAAxS3QKbLyCoohEhzQFMrmmtIOFDntOFEF62gBtAEZh4gAmAF0Abn7KybACNhkFAoACSjgU+3BJW+82IIx+QNB4K2+RwhWK52OPzO4MuYGutzYsAI2mS2MqEDI42yjBAEDQNmIRBgORytPJ9GhP0GA2YnP8lJCFgUUHwaAgcEStO6aAAtOdaS8TsRwVAvI5snwAMTnWWq9VOUaNKAUJBQGYNJrnbIAeQARgArNBoirwxoZOBZXKo9F7LGw6q1erKq0EG1QcVbZQGbkwgZGtJ4EXwISzH7-NbXNCbb07Yr+05VCZBlX2AHnPEE8XEABkNdL-zYFZwVxu4rYnHF3kmccqPLhCeI40mqAtIZVSG83k7KLzfstpzAOWIiT+5YImY2BcLDfX4ertAAhGum2GIxBe01+-GfktVuts7O0btSgurcvEsey6fN9nt4WTwAEkOBwpRAO9ZRyB8KEVXcmyhS9ThPf59zuFUKEiRDeVhftBn5dRBSgNgFD0CVEm1dASL4EoQGGEAbB4RZkHQLAQG2Z98HQshCCgigIRyfE0BBCAoJeYIwBeM1fQIbc8ECYhANkcS2G8SckDwdAKjkrQCD0CgcA8ATO2EqDxD0gyKgAeksosajqYgAE89K4nieHGFBSFQGRtGzNAtM0EhBAIGBOBIB53gqQDEl02oDJKH42AEiAUESAADQCAH1AMeWRMsA15Uvi2E2DQMgW0SSFDjKagAD430qIKQrgIl9FJCslDgFsnnee4AAZ3jYAA3ZRIiKwtGtClqSUqi4Oq6j4+oGigyEZAAfVbiHa2J5p6-qhpGtAxr7I60jYU0kElE7iESyAUr4ZCzwPBSsteaiEtK8rzhoOrxzSCbmuJUk+BqkGapQqBfWIYbOEiN7YT+tBgsmwGZuI7btHuBa9uh0buSus6kAu0oEqSu6xC4HhcpeuGmhKsq2vBb76oRpGAda8jQZq8nLEpnGnCulmmqmhnDjRzqMaxga+au-DafOy7-BIa7SfIvLHgsKwqfymnKjpz7Gdq5mi1Z4WOdBjXeYOnWmn+02tvFzHdqlg6Zfx+XieKlW+DV2QnheD5reuj6RYUJnfuNoWUeB0HnjeYhlgcwPBeR9n7a6x4nf2mHDrxgUEbs+pbYdJBIHIxhmDhwZaPAaB4AAGW47xWLgByIwIaIwAh6vtDIAgAAVqkKbMsByaM0Do4K7TCMAGQAFVbjBsCTKBKAweggA">Try it out at playground>>></a>
```javascript
// Assignment and Declaration need to be treated differently
// find all Assignment nodes
$(code)                  
  .find(`$_$1 = $_$2`)
	.each(item => {
		console.log(item.match[1])
	  console.log(item.match[2])
	})

// find the Assignment node that assign a value to 'this.isOpen'
$(code)
  .find('this.isOpen = $_$2')
  .each(item => {
    console.log(item.match[2])
   })

// find the Assignment node that assign a value to the property 'color' in the object 'car'
$(code)
  .find('car.color = $_$2')

// find the Assignment node that assign a value to the property 'color' in any object
$(code)
	.find('$_$1.color = $_$2')

// find the variable assigned by [1, 2]
$(code)
  .find('$_$1 = [1, 2]')
```
<a name="1f456fd96e0f2131d34c8657ae03889c"></a>
### 05.Find variable definition
<a target="_blank" href="https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGSIDOcABDgIYBOxAvMcAL4A6E5FAdHgDZJW0DkFNCj7NWbAmABeaGsT4EAtmU6cREUfiLEAFkhgEZtYMSYRd+tByTdecgO7awcNGvMHxUw3M6UA5i+YNQhIyKChZADUYSxxBMmcAQTCACmBmYmIUeLJMYgAzGBY4MHxkgEo6dIziQTgYCghKxuqMuEE0ABFs3La0TuyqjNMhgBoqhTQ4XRQCXLTmjKUAazQAMWt0ClyCopKIZKc0BQr5lozDhQ5HThRBRtoAbQBGEeIAJgBdAG5B6qmwAhsMgoFAASWcCgOELKPwW1V+9DGcOBYIh20KOGKpQuJ1+5whVzANzubFgBG0qTx1QgZAmuUYIAgaDsxCIMDyeQZVPoMIRSJa-jgAAVKGgIHAADIAuDJKDxbS4uEZPDBYicaWyB7fKkOIkyWXy4gAMiNxDlU1JovFIqmirOZ3VRFJ+gp5u0lruwvlvKVZzdsjdHrFXqmsPtwzOtXqjUdcDD1URvzIBAAnixiIKAEpHJDOKVEcpNe2cSZqjW0Mh2MhOfKTHDafMysp8qqmHmBGlhKwKKD4YPJBm9NAAWguDNep2IEKgPmcuT4AGILsPp7OXPyzRQkFBZkXqhdcgB5ABGACs0JjWxusnAcvkMVj9nbqlGGnuWgDD1AxdtlAYEfGibNHgPbwEIcy-AC6w3GgWz3rspTPi0r6NP8gIXISxJisappoWwGH1kStximwJYQL4oYIle4yTNMu6Tq0SC+L4JboghT7vvueTEMkeFQRssFIWcfEEF+2G0AAhCJYkQPGLQRqMvzLGsAlwTsmJ7IWDFcTxUmOOhBDQZsQktHhAAkRxOAOIDKcOeSqeOU76fh0JycJzmft+9xThQ0RuUMVHNG2zbqJ2UBsAoejiski7oJFfBlCAIwgHYPBLMg6BYCA6mPj5ZCEPZFCQnkeqghA9mvKEYCvNuj4EM+KpaGZshVWwvhMUgeDoFUjUkAQegUDgXglSWZX2eIA1DVUAD0001JM0bECmA15QVPATCgpCoDI2iwWgPWaCQggEDAnAkI8HxVGZyT9fUQ0hS0bAlRAKDJAABr1xBmQA+mZTyyD9ZlvG9D3VGwaBkPWyRQkcFTUAAfJxGTHadcDOuSMXw1jiOfYD-20IDbwJVSKNnejFIYUocD1s8HwPAADB8bAAG7KNEoPIWgJ1k2SFMElTNOfAzTMUJWxAAD7i8QlPxILdOMyzbNoBzJgq2wW65uUvxPZAr0PG9rNULGAO-U8b2vG9JYkMbBOm+bxAfYdZZaLbf1vR8asQ1DMPHDQiPacjXOo+TmPY-DxvoDgPii4+xO+qTaO8z7EWy9otPC+rYuS9L-Op+nCus5w7MIiFVQofN3No6eSCQDFjDMHHphJeA0DwBK+W+FlcApt+BCxGAUBwM32jJkKtTFLBWB5H+aDJSdx4RGAzIACo9xg2AgXKgggPQQA">Try it out at playground>>></a>
```javascript
// find all Declaration nodes
$(code)
	.find(`var $_$1 = $_$2`)

// find the Declaration for list
$(code)
	.find([`var list = $_$1`, `let list = $_$1`, `const list = $_$1`])
```
<a name="43508371a9b5aaada6017838f43b863d"></a>
### 06.Find definition in a scope
<a target="_blank" href="https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIBmMIDGcYSEABAQE5oCGcaAFAJTAA65ZANmnGUgEYArMgF4ywAL4BudmS48KpAM5xKMIkkqiyAbQC6AOiUALMDjgGCNTpwY1KAcxgBbNBDhKmMjgMEGA+v5QlEhwSIHaBMqq6mGUBsGhoQCeUGjecty8cKlokdFqGvE0UFCcyQy+ADRk9k6u7p4ZZNRwMJTkOWlIOGRdeSKDZADkvmhEw2QA-H25ZJh8Qt4S7OxZs2nawzQAKrnDIFUgAO6aANbI6Fi4+EQknZQ0EEo4ms4MOGDcAJIQrzUlMA1JBQYjKJjiWSKZ68AAk2kBBgcSGRUXQUKiMLISiQ7QIAzInx+fyQRlxlHxUIA9FSWjx2uRkuS+o9nq9KK4UIp0GRjGhqBjonSlDBOLwxPoobCGDi8WgmFC5AZPhAUAxhnhCGDyFRaPRmOIJMMFRwlbQCMYGGB6M5RAA+SGmuTC0UWWAmdV2r0OzV3UgUah0PKY+juEYm53O6gisUJGAe61oZxItz8oPMCPOiQm1i8MjKyBq4brfraWH+WHGxX582WxO2kQOthOuTR11xj3Db0O0uQAN6vJVlsu2Puus2lMQNP6piZuTZ6sGEKhZiLlVFktzMTlytzms0C1Wm32x2R1toGNu+OWrvejaDvfny8d8dJyfTxiz6sLiBQ1oMkcLEEJBIHVVh2CHFYIEOcBoHgAAZJ4HGufolCoMBQRg4waCUAAFVpiH5LAcGsJQ0COEV+AANTANBjj2NJriiZwoHsDAJCAA">Try it out at playground>>></a>
```javascript
// find the Identifier 'type' in the function create() {} 在其内部获取type变量定义

$(code)
	.find('function() create() {}')
	.find('let type = $_$1')

// find function create() {} and Identifier 'type' by chaining operation
$(code)
	.find('function() create() {}')
	.each(item => {})
	.root()							
	.find('let type = $_$1')
```
<a name="0d4c62c976b215f8a9302988fc152e16"></a>
### 07.Find the class definition
<a target="_blank" href="https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGAbAQwGciACBAgJ1LQA840IUyA1NACzHzVOAB0IpUjiQQicSjBxwklABS0ANKQCeASl4ChQuJyIA6WqQC8pWgG4t23WAMqTqy4NIBfKyLyyHAckpoU3lZEYABePKbeRAC2BHh4gRBuEAL4xGQAspBgNPSMzORUms4iYhJSMvJKqsoeshr8zkJEMFBolcrqTtqkNga11Kb9Xa4CLiCKIADusgDWyOhYIABmMBDSYKI9lARiS7JRcktgeGgAkhB7ygRQYMpIUHAbYvXuouKkACQO12D6AOZIAEidCvUqkIhIGCUHDhUhHE7nPb6CFQmFWAD06NIfjgUMEKkh1AkOyIe0oUX8wlQPHYbTQoPefmaeDgDgA2gBdKwfOQo6FoNRWIT6I5MORC7QAA1SJAK1Aa3W6-QcHwA+h8cBLusEwir1UQta5JRLBY1SPo0AQcOw5HIwAwohpjAA+IqK7FoZlwfSwIg2+1oKL6GJwa1s7w4bwctkABg5+gAbrEYALDUyYCyfTA-XaHcGCKH2OGiFHY-Gk3gU6bui5TVYcXiPV79AArJCQOSBATeU1JcbgaDwAAyOz+izgKlaRBwlDAD377GIAAUcY82lglrEiGgJs0AEYsMBoSYAFUnGGwIiiUCoGBcQA">Try it out at playground>>></a>
```javascript
// find all ClassDeclaration nodes
$(code)
  .find(`class $_$1 {}`)

// find ClassDeclaration for 'Car'
$(code)
  .find(`class Car {}`)

// find the ClassDeclaration for 'Car' which has 'color' and 'size'
$(code)
  .find(`class Car {
    color = $_$c
    size = $_$s
  }`)
	.each(item => {
	  item.match['c']
  	item.match['s']
	})
```
<a name="dec690955d27e6517cb2ba983bfb5fca"></a>
### 08.find definition with typescript
<a target="_blank" href="https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcI4E8poAECAFmgMYDWAQkgB4AKATklAM6EC8hwh5ZVNCkyEARkiQAbNAEMIAGkIB3MCjgkREGAFtRaJoQC+AbgA6EaXD6ioI0hRr1mrDt2DnCfAZSEi4TGDR5D2VVdREARgAGKPNDc3IkCDYrfjkAcyJuAAooFnY7b1pGfLYASi4APh4QtjQ4Z3Zc0rKzCEMQeRAlJCZKZHQsEAAzGAhyODAkwn85NmHe7WzhsGkASQgFxRkoMEVWSaTymohPROSrABIuQh2wADp0pCfE9BDzlMI2JBgmcizCCt1pskPdvr9-iEAPRQwhMeq-U64H4GWbJBZMbRCPioIhkeHvI5WeFsGCSKzcADaAF0QpdsuC-mgyiFPPcVhAUNkAOT2KjFRpsbkVGGEQB+RoAGJUAIW6ASHNAPfKgF+AwD0ZoAN5UA84mAWBVADD-gH05eXKwDePoBo9UAWdqASTlWYR7rJ+NlsmA4GhtBVONV3KdPJ6wMNCPbHdp7lAZPCIHBsmV7hBcfc8AQuNxuQAVADKifwaAASmhhvo0OM0MKTp7i4RRYASJUAtaaAN0VAGxOgCCgwCdDkrjeaU2mCFmcyH-lrAIw6ksAYXKW4skslwQMwNgkHmVWfVNvp4XDz2j8kTqd+p2B4N5sMAJgjmQg+hkjvDIthgGT4wBfilKlQ6nVLADTee8AVHL1hvL+IezyGFk-q0WCQMN-2LdlIC5blLEIS4AH1LgiTA+UcEoXBuODLj3JcAOtGRbU3Z0qiLEtV3HWAN25OdqjWFBCGwks4TQUk13I6cHwDbRT34SkImpSkompe4ADcZEkQIL0IdUNWXUj12nSi50IDYHTo0CSKYsc5II+5OLgbi9z4gThNE8TS1hdVAB4FS0-0te4gJA2yOUg7IMMQ4giicFoiOAQx6M9XDbXY7yZI0ljJ3kqjCCDJgZG0QgIFiog-JHUKyPC7TdO43j+MEkSxOZELmLSijIuDFglEBMYJimU5kpXVKtPYyNcTU4tRXQUQYHSTImGs-8QnhOBEUYor7gAKyQSAeVMcxsO-TpwGgeAABkMiGWMmPIJgwCgOAFpIGQ2GYepJn0LBhlEuoulJUQADUwDQJR2wwbB-DQDBDCAA">Try it out at playground>>></a>
```javascript
// find the TSTypeAliasDeclaration
$(code)
  .find('CheckBoxProps')		// find the Identifier named CheckBoxProps
  .each(item => {
      if (item.parent().node.type == 'TSTypeReference') {
      }
  })

// find the TSTypeReference named CheckBoxProps
$(code)
	.find('let $_$1:CheckBoxProps = $_$2')
	.each(item => {
		item.match[1]
  	item.match[2]
	})

// find the arrow function with a parameter which type is CheckBoxProps
$(code)
	.find('($_$1: CheckBoxProps) => {}')
	.each(item => {
		item.match
  	item.node
	})
```
<a name="68b4924f98c9d4612beb1f01dd2d3966"></a>
### 09.Find if statement
<a target="_blank" href="https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBc4BmACACgEM8AyUvARjwB8a8AGASj2DwB0I88AjTgXzxoANgGc0rDlzwBjANx4USUXAAWBFgM6cw+AmFEBlVUgDuLYJ25qDAOmFgA5qrh4AvHjgAnGGgEgAGhBTJC8Aa2R0LBAcGAgZODAkLm8iCFEcUIBbAhwwYTQASQhMgLwiKDAypChE5NELK1l61wASd3LK20ckHplUP2l+9NdRJBgvGQkPPILizNsxiammgHpVvC80OAmuAE9xr08vNIzstBRm9DxVNC2m4ZVNtFEYYVcPAG0AXSbWgiWkzQTCa3FseQgKAIAANdIRWgB9VqUCx4VrogBMeEEInEknRrQAzNjoSDpGC0EQZOp9HA0FkWG4AHysUHcZ6vd62WCidRgOlZbpoCB3Ih0jRk9nsracuDcmC82n02wQAaSqUct5ynl8gW2LJi6mfSjfT4Mb62ABuRGEvnVUplWvliv+-OVBrgRoA5ASMV7TeamEKRSdxUx7dKXk6dUrBR7vQTCf6zd8I9x1pquTG3XHDapPoSAxbrbbgWz+BHbF4kEg4Bo2eDIFCvXD9EYTOZWPwvZXKdTY+4WZZyZHZc7dcrqflm480ABHXwQOU8VB7WwMHvB0VhiMV7TSLY7LxcR1cgBWSEgBC97E4Pa0EEC4Gg8AAMmlHNE4HsoC8ZF4wFqJ9VCIUQAAVD0SO4sBwG1xCCV4eAANTANBTAAFR-DBsG8NAMH4IA">Try it out at playground>>></a>
```javascript
// find all ifStatements
$(`if (a && 1 || 0) { b } else { c; dosth() }`)
  .find(`if ($_$1) { $$$2 } else { $$$3 }`)
	.each(item => {
		item.node	// the full ast node
  	item.match	
  	/** 
      a && 1 || 0 
      b
      c; dosth()
    **/
	})

// find the ifStatement which condition is 'isShow'
$(code)
  .find('if (isShow) {}')
  .each(item => {
    result.push(item.child('consequent.body.0').generate())
  })
```
<a name="fd2f9876d064a79f27aed77435adf7b2"></a>
## Find and modify function
<a name="8144dd249b410c379fadc69214cc5b50"></a>
### 10.Find function
<a target="_blank" href="https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIBuBDAJwAI8iBeIgRgG4AdCfYlco4IgY0yoBoiBnLgCZeAWy5t2RLgHJ20gL7z69dkgh84JAgSQB3AIIsAFFEq8oggJTkAfK2UQlEemABmRIwBVBlQUQBk-h5gzGRhVEQAPpEengDMAAwArAFBIeThACyWOfYQRAUcMASeeABGLNIQaLrSdPmFjCQslPTyRA6uMBDscGBqJF09HngivAAevGVjrHwt8tbA9IVETXh8pBStjh3OPWoaWjq6nsZwAJ5QaNZkdkt78iDcILpIBADWyOhYIEO9-fk4AQ8OpXG8REZXGAADZoACSEDBvDwUDAvCQUD6B0Wyw4B00ABIWCiwAA6ADmSEpqnQuNU6k0fCQxXYaBYUNhCLBpKZLLQuIA9AKiAQ0HBivlzsziECQXwwQQRGhmDS2QALNCiun4kVoPgwaGaCgAbQAuriCUZeQRWZZcQVSVCICgjAADP5Y-IEgD6BMoRkW8lddoaDrQeHYaqMRjAcDQIhud3thVF+sNpNgfCjsfjFLQ1WBcYDIZWBVTBrgGZgWZjcZEpJEeDgkeNlFNxoSptJ+GhMGuyYWydJOiQcADQ6dLtdAdsrCDJcKpPDkejOYTs-upd1acrmaj0hsh7sM9uc+kC5W5fTe9rufJ+c1TbQxYHF6Iw6Qo-Hoffk7dRguK5EznYMh2XKNb3XU9N1LK9d2rfcj2PQDrg3eRz2TMs9QrKsazXPMCyfF8f0HBpRXFAh8jg0kACskEgIxpFoegMMcegnnAaB4AAGRBckfhQvh2AIMBMQ4tV1gABXIvpNSwVw8GhPg0GefUygANTAGpPEuDBsCBNAMHkIA">Try it out at playground>>></a>
```javascript
$(code)
  .find(`function $_$1() {}`)
	.each(item => {
		item.match[1]	// name of the function
  	item.node			// the ast node
	})

// find arrow function
$(code)
  .find(`() => {}`)

// find arrow function with parameter type
$(code)
  .find(`(type) => {}`)
```
<a name="efe49fdfd75b02efb18902640c226b6e"></a>
### 11.Find the function afunc
<a target="_blank" href="https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIA6EDGSEAznAAQCGATlUgO4CCZAvGQBRQCMANGVAEwBKFgD4ywPHgC+kiGABm7ACr9O-MgDIN7MChbNWnMgB9jygMwAGAKybtu-awAsg1+LxlPZfDCpKKAEYsZADkEGh0IQDcHl4AbtSUwZzSZLLyMARwYESUGQTsFAC2vAAevAEl4sTJUsISEF5kCVSUxBTJsZ4tSYYxjfGJeqzA3phkPGTE4-y8ReOj+GTjIfghUjIDnvhsgqmyhCTk1LR0SsFscACeUGjCzGIN0iDcIHRIVADWyOhYIPn4bK5OBUCgkeQfIpseRgAA2aAAkhAIbwKFAwLwkFAgSR6rFDqQyAASYJosAAOgA5khqYR0PiiITiEhfPg0MEYfCkRDyczWWhYgB6QVkKhoOC+RpXFmtEFg4gQqhFNB6OnsgAWaDFDKOorQxBgsPIrAA2gBdWJEth8qhsvZbMjkmEQFBsAAGAJxeUyO3qxKJRKMUjd9qa5LQFHw6rYbDAcDQRXujy6XjFBqN5NgxGjcYTVLQ4VB8d2oaaevTcEzMGzsfjRXJRQocCjJpCAcDITNpaawrI6ACMEplK1aQdnjThsrWejVtz9abILYIQCqCu5JXKDX-BCrnzhabaBLKbqsTFEqojQnGYAVkhIEucHgd9I8C9wNB4AAZMGUv7XW7EPgVBgNib7qhQxAAApntkWpYPIFCwsQaCvAaAQAGpgBESg3Bg2AgmgGBSEAA">Try it out at playground>>></a>
```javascript
// example 1 
$(code)
  .find(`function afunc() { $$$1 }`)
  .each(item => {
    item.match[1][0].value
  	item.match[1][0].node	
  })

// example 2
$(code)
  .find(`function afunc() {}`)
  .each(item => {
    $(item.attr('body')).generate()
  	item.attr('body')	
  })
```
<a name="d9b464af435642a517b8cce31b0b21cb"></a>
### 12.Find the function contains an exact statement
<a target="_blank" href="https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIBmMIDGcYSEABDmnAQBYAiAhnAwBQCUZwAOuWQaQGc4ZKAwBODALYCyAXk5kIUtJjIByAIxqyAXwDcPMmTg0wAgHRi0ARxhohaMS1ETpbQ2QA2VL2eHyrARhPOHNRAHM0Tz8yAB9YsgBtAF0Pb2E4JGZPOTJA4NDM7LiEgAYPBm8xOBZuXiM4AE8oFXVHMSQxNQAaDyN+CDg0QdU0c0l7AQZIjx02AwgdEG6QAHdOgGtkdCxcfCIScjgJCAEcTskWHDBvAEkIc+6yBigwJ6QoYkEOOv7BYQAJLkXmBzOEkOD+OgPAMhGQBEgYGICGhctc7g8kOYEUiUR4APT4vJUJHkRqIsTGE5nC5oFB8VComiONAw-7EoIhXIpDwAlg45Fodz1Mjma4QFAsPpGMgAAzwhC+5ABAH0ARp2JxpTKZSYzJYbHYHE5hTqjDpZdLTTLzGgGLQWCwwENJBxZAA+LUioz5EJhGACGgsNTu0OehUHUiKZRqa0632hWCBp0u8ZMWiJDTJRKlZLmABulTscd0JcsSCy7GlYsgkvl+yVZFVfJ+5tlZbtDudaEkck9vzNYBwZBTPfMNAYAmDeosVls9iGXTYP21MoT-uTIbDnonMgASoaF45Y6udNK5jwPFY4KSOQVzAArJCQYNcHgnxY8ZbgaDwAAyDAQOEuxNC0AgEGIYCfN+u4AArXsQjhYDglQCGgKxBAARgAamAaCrAAKs0GDYMcaAYDoQA">Try it out at playground>>></a>
```javascript
// example 1
$(code)
  .find(`function $_$1() {
    this.requester()
  }`)


// example 2
$(code)
  .find(`function $_$() {  }`)
  .each(item => {
    if (item.has('this.requester')) {
      // 判断节点内部是否包含this.requester
    }
  })

```
<a name="19d6096800c4458fedd16138cd47c601"></a>
### 13.Find call expression
<a target="_blank" href="">Try it out at playground>>></a>
```javascript
// find all CallExpression nodes
$(code)
	.find('$_$1()')
	.each(item => {
		item.match		// the function name
  	    item.node			// the ast node
  	    item.attr('arguments')		// parameters of the function
	})

// find the CallExpression called by this
$(code)
	.find('this.$_$1()')

// find the CallExpression for function create
$(code)
	.find('create()')
```
<a name="fd910ef0e5be737fe6e0bef0df310138"></a>
### 14.Modify the function parameters
<a target="_blank" href="https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcICGAbNAJzgApgAdCcuOATyjUwAIByIwpQlgGkqaYDGSCHDQjmLQO-Rgaw1AmYqBR-WmBPDJ58mKYYyYkAlEwC8APibAAvpVM6Q3EAHdOAa2TosIAGYwIAuGGFM4hDgQAM5unAC2JG5gBACSEGHcTDhQYElIUD7CwXoUEPxCIXBMACQGyakAdADmSLVC6GqFwcXBSDCEAmjl0XEJSJVtHV1qAPSjTIRocB35tO2E-oEhYYThaCiCqN0AFkRoTdnFU8EweMX6pSRDnWg6avyVU1B4OF0kAAb4RKTA-vRaEoAfRKAEYkhoIICQQBmJKFUTiUoggBMlg+SQe-Gx2K+BGIJGRYKSwJKKJJsKYOg+93y2JqYiIOFEukoaimM0I+ROZzgFko1nA0HgABkgtVXHQGMEBIQwJlBTscMEAAocnxELBufDBNA2U4AIwAamA0LYACoAyVTDCmIA">Try it out at playground>>></a>
```javascript
alert({
	type: 'error',
    content: 'Error input!',
    done: () => {}
})

$(code)
	.replace(`alert({ type: $_$1, done: $_$3, content: $_$2})`, 
           `alert( $_$1, $_$2, $_$3 )`)

$(code).replace(`alert($$$1)`, `alert(this, $$$1)`)
```
<a name="05e0d3622df1858e4996de2c9ea325f0"></a>
### 15.Modify a node structure
<a target="_blank" href="https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcICGAbNAJzgApgAdCcuOATyjUwAIByIwpQlgGkqaYDGSCHDQjmLQO-Rgaw1AmYqBR-WmBPDJ58mKYYyYkAlEwC8APibAAvpVM6Q3EAHdOAa2TosIAGYwIAuGGFM4hDgQAM5unAC2JG5gBACSEGHcTDhQYElIUD7CwXoUEPxCIXBMACQGyakAdADmSLVC6GqFwcXBSDCEAmjl0XEJSJVtHV1qAPSjTIRocB35tO2E-oEhYYThaCiCqN0AFkRoTdnFU8EweMX6pSRDnWg6avyV0RAoJAAG+ESkwP70WiUAfRKAEYkoVROJSkCAExJDQQf5AgDMTEsb3u+X4TEqaBwAh2JDAonCBmMeSxWOaxToDAAavgYN1LkS0OFKuEcHB8QBtYEAXW5AAY+ZUAG4MtC8TEUmVbERiOD0vCM8ostkcrk7bnQgXCyqBWxMAA+RqYavZnJ5OqFIvFyslD1lWPhaCVKuZxItmu5SN1toljv45qmUDweLQACFaCQSu9A1jPsQSKVgDTXRLTEkSsBwQq3WhMymXfnTEwMbL0eWsZZHTUxEROWhdJQ1FMZoR8icznALJRrOBoPAADJBaquNPBASEMCZfs7HDBAAKbZ8RCwbnwwUlIFOACNaWA0LYACp-cdTDCmIA">Try it out at playground>>></a>
```javascript
alert({
	type: 'error',
    content: 'Error Input!',
    done: () => {}
})

$(code)
	.find(`alert({ type: $_$1, content: $_$2, done: $_$3 })`)
	.each(item => {
		const typeValue = item.match[1][0].value,
          contentValue = item.match[2][0].raw || item.match[2][0].value,,
          doneValue = item.match[3][0].value
    item.replaceBy($(`
			alert( ${typeValue}, ${contentValue}, ${doneValue} )
		`))
	})
```
<a name="afaec048fb60b2d0c5abf3537befef93"></a>
## Find and modify Object
<a name="84e5c7bee0560baa66b607313cad0493"></a>
### 16.Find Property in Object
<a target="_blank" href="https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGSIDOcABEgEYBWxAvMcADoTHEDmATmmnABQCUdjZszyEkAGzQA6MUhbcA5AQCGAT2IALMPN6DiAXwA0jXWRVpMxPjQB8ApkJEFxUmXMWriptNt17GekAMQAHckNgBrZHQsEAAzGAgcODB8Yjg2JUJYsIBbbliwCQBJCGyDYiUoMHKkKGT8An4Ge0cSABIaCqrJFlkkPHRdVuInGDYcNE6C4tKkSVHxtF0AemXiDjgxphUkMbSMrNy0FGIByfU0DiGGkg4CGDESWgBtAF1dNu4FiZ17ZkkChAUNwAAbsTg8Jp6EG-ITESRoJQ4dTcbhgOBoHL8ai2Zpw5jozGSCCoSarVgcLiATtNAKs2ujhdwecEksAIKMJORZSg4EB4AEZeD00BBLkoMXx+OTwdSaYA0TUAQjqAT+1AIYx9P0sKEkjYSCQkLVAMgwJBXgsbQA+m0+TD9YjkaiOdjcWrmIzHiyYGyFNZvT7fT4-kJXczWeyMZycmLkc8+a9ngAGV6SABuSjEMDQkrW0rgtIVKrVel+ug2W3WaHubooSEgCnojH9fgggXA0HgABlMiwYnAVFByzg2GA6s31EoCAAFDbJS5YWKpghoIL3MgANTAaGCABVexhsOlOCA9EA">Try it out at playground>>></a>
```javascript
// find the method greet in object
$(code).find(`greet() {}`)
  .each(item => {
	item.node		
  	item.parent(1).node	
  })

// find the property bye in object
$(code)
  .find(`bye: $_$1`)
```
<a name="510415023afddf226daf66f52c17efc9"></a>
### 17.Find Object
<a target="_blank" href="https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGSIDOcABDgIYBOAjMQLzHAA6ExxBYAXmpsQOQEBbMgBthvADTNWeYUgo9eFNCglTikMHAAUZccQBGASgZrWagL7NLEZnkIlyFAEx0TLNp259hlAOZpVdxk5BV8lNAheKxBxEAB3OQBrZHQsEAAzGAgcODB8YjgKMkJ0uQEtdLBhNABJCFK9MigwPSQoXPwCYyYgzpIAElcmsAA6XyRxvHQ1OyI2JBgKHDRXSuq60pGCBaW0NQB6feIlOEWWAE8dgqKSsuVSVBWACzQlGb7jtAIYYRJ6AG0ALpqfpabaLZaGUzEEaVCAoLQAA2AD1k8mI-QA+v0aOZEVD3KwRmgyDgnlotJo0AJjLQAHxuVhMz7fX4jWAEclUgQjIRwMn-KiA-4ABkBIwAbiIYGgCczzHKmSMKEgkNpFUS4QjkaiQnwwmgIrxiHiNTCSWSKdzaQyeszWEpWXB2TBOVpeHTPV6vcQDUazQ6vj9nRyuXBqWMIq8yOGtIYzQrocrVeqk1qtNDWMjM0yNOqGNZ7SbEdCzcTSeTKeGaXRbTnHcGXW6Pd7veoIJo47wAyzG6GqxH-BBo7H49DE4SYSq1XG05BtbMHJQaPQsTj8UmLWHqbXGfbDupq7yY2TAPRmgGqIwBYCYBZRMAZN6ATmVr4AGJUAIW6AIKDAJ0O9aDbP7LdbnqkMu3Y5mA6TEAOPJ8gKQqiuKECPCMcDnFAKy0PQvAAPL6AAVmgOQAKIAB5QI67D4N2e5FgegB+Rk+jjnoA0rGADwK74foAMP+ACRKgC1pqegCwcqegCf2oAhjGAN4+gDR6jmgZOk225QSeTyCsKYqStKso5oWTITmoJxnL2bI4UgkDuowzAgRA1gxOA0DwAAMsUvhpMhqEEDgFBgO0VlPGQBAAAonLkrxYOkIgEGgsTfPoABqYBoHEAAqKEYNghSGiA5hAA">Try it out at playground>>></a>
```javascript
// find the object contains property color
$(code).find(`{ color: $_$1 }`)
	.each(item => {
      item.node	    // the ast node
      item.match		// value of the color
    })

// find the object contains property color: 'green'
$(code)
  .find(`{ color: 'green' }`)

// find the object contains method init
$(code)
  .find(`{ init() {} }`)

// find the object named car1
$(code)
  .find(`const car1 = $_$1`)
  .each(item => {
  	if (item.match[1][0].node.type == 'ObjectExpression') {
    }
  })
```
<a name="be8c69517e4a8eea8ea8a3b7f4705b73"></a>
### 18.Modify the property in object
<a target="_blank" href="https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGSIDOcABHusQLzEAKAhgOZoAUwAOhMcfgMoAWSAdyYBKYsGIBfADTtOKWnFqYxk9hOEgpIAUgBOAa2TosIAGYwIOOGHzE4u2oVN6Atk1NgANmgCSEZ1LEtFBggUhQ1vgEomwcpFEkACSUQSEAdPRImWRosvGEJARIMLo4aCke3n7OaUUlZXkA9I3EumhwJRwAnsW6dg5Ormgo8eS8aG15eAWtaAQwniRUiUx1pWjCeZxpbVCetGVMAAZ0jCxbnFwQfIIiYheXxInPAIyscA+SMnGPz4kATBd1EdAicGMxYo9OG0IOhdHdIVDOH83j9LtJPn9AWjgZsIHk2h1dBw2vNFhk0BAJgpmHiJOxNOBoPAADKOegmOBdKBzHC6MARRm8WgEaiE6wTLCmWieAhoLTzABGADUwGgBAAVbkYbD2NAYCRAA">Try it out at playground>>></a>
<a target="_blank" href="https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGSIDOcABHusQLzEAKAhgOZoAUwAOhMcfgMoAWSAdyYBKYsGIBfADTtOKWnFqYxk9hOEgpIAUgBOAa2TosIAGYwIOOGHzE4u2oVN6Atk1NgANmgCSEZ1LEtFBggUhQ1vgEomwcpFEkACSUQSEAdPRImWRosvGEJARIMLo4aCke3n7OaUUlZXkA9I3EumhwJRwAnsW6dg5Ormgo8eS8aG15eAWtaAQwniRUiUx1pWjCaR4QKEwABnSMLMSJAPorMapw6nvCeZxpaLQ4vExgcGgulAB8YvfEYFMxDeHxcaRcCheAG0AAwAXVhcLSADdaJ4YOUKFQAOQ8fgCbExf6cd6fcGQ3iIxFpCCoNA02guTHEbFtHYTbH-CR5dTsPJtDq6DhteaLDJoCATBTMO4QbkQTTgaDwAAyjnoJjgXSgcxwujAEUVvFoBGoAusEywpjRBDQWnmACMAGpgNACAAq2ow2HsaAwEiAA">Try it out at playground>>></a>
```javascript
const code = Page({
  onShow() { },
  data: { }
})
// Modify the method name

    // example 1
    $(code)
      .replace(`Page({
        onShow() {
          $$$1	
        },
        $$$2
      })`, `Page({
        render() {
          $$$1
        },
        $$$2
      })`)

    // example 2
    $(code).find(`Page({ $_$1() { }	})`)
      .each(item => {
        if (item.match[1][0].value == 'onShow') {
          item.match[1][0].node.name = 'render'
        }
      })
```
<a name="44d10efec5838d6bfda19ca709f05229"></a>
### 19.Modify the property in object with exact rule
<a target="_blank" href="https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGSIDOcABHgLZT5oRwAyYRxAvMQNrAA6Exxk6AHpmIBGADRce5ShGpwhAckiw48rgF9RxTt14QBQgEzidUqjQUAnAIYowSVRA1aJu-cQDMxyUgpm5xeRwACzQcAGsAIyR+BzUAXRBREAB3JAsw5HQsEAAzGAgcODtuOGtCHLSyAAocsAAbNABJCArNKygwTSQoIvwCAEpnEz6SABJmYnawADoAcyR5vHQXPEISAiQYCxw0CdqG5orpja2dlwB6c+ILNDgt7gBPTYtiUqtyyrQUUlRdkJuViNiGR2hNgLplAo4Gh+HArDcrPJiGpiJdiIAKdRBUEAtHKASHNAARmgBAdQAhboBZI0A2-GAGQjAHfygE5TQFra5oAgwOokFijKonbZofouHjTG5QOpWHZVQI+aSyISjAD6o2E8k0VRBcGCgyYAD4hjweGAcsQVe1WKrgqxhHFWAAGOLTABuVjqMDQcUG2l1upudws3AABqYZOYAqNgFiTVY1UFzZabfbHc64mp5L7+cjiGg6gRdu6PUzvdwJb5A-45QqHB61C41HyIC4vfcmSy2XNqGhrNCqjXKxBEuBoPBaO9Ztk4A8oMycBYwD1e0ErAQAApeoptrA5R1ZpIsiIANTAaGSABUxxhsKU0Bg1EA">Try it out at playground>>></a>
```javascript
const map = { input: 'textarea' }	

const res = $(`
    const componentList = [{
    index: 1,
    component: 'input'
  }, {
    index: 2,
    component: 'radio'
  }, {
    index: 3,
    component: 'checkbox'
  }]`)
.replace('component: $_$1', (match => {
  if (map[match[1][0].value]) {
    return `component: ${map[match[1][0].value]}`
  } else {
    return 'component: $_$1'
  }
}))
.generate()
```
<a name="d4c6edfe571542b4442b4ffc4e3a5024"></a>
### 20.Insert a property into object
<a target="_blank" href="https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIAKBDAczQApgAdCAAkqQgGUALJAd2IEpLhKBfAGguoo8cPJk6UB1SgGcmzMQDM8AG2loKk7hW5sQvEMyQAnANbJ0WEApgQAxnDC1KcI3gjSFxgLbEFYZWgAkhCevJR4UGBhSFAOtNIc5FSUtvFwlAAklAC84ZEAdARIRanokqnu6dJIMEa2aDmUfgHBnvnVtfWSAPTdlEZocLVUAJ41Rs6u7p5GXmgoKagNDGgD5WmUXhGNXJCwcGIA5HBoAB4iA3iHPJS9lIAU6ltQgLRygJDmgARmgCA6gCFugLJGgNvxgBkIwB38oBOU3WlX6aGkMGU6VyGWIHTqaDYkmo+QGUGUeHqxAABvgiKR0VIMuSAEyknT4sKkwmEEhJaiQMBwdjiUlwBhgaTtOSNFwwdTJPiSckZKkQGloiCSAZDIxUAYwuGFNAQVbCEiyrQQPTgaDwAAybgIljgIyg0NsRjAsQNDDw0hwCocqywSlUaH0MIARgA1MBoZgAFStGGwLjQGG4QA">Try it out at playground>>></a>
<a target="_blank" href="https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIAKBDAczQApgAdCAAkqQgGUALJAd2IEpLhKBfAGguoo8cPJk6UB1SgGcmzMQDM8AG2loKk7hW5sQvEMyQAnANbJ0WEApgQAxnDC1KcI3gjSFxgLbEFYZWgAkhCevJR4UGBhSFAOtNIc5FSUtvFwlAAklAC84ZEAdARIRanokqnu6dJIMEa2aDmUfgHBnvnVtfWSAPTdlEZocLVUAJ41Rs6u7p5GXmgoKagNDGgD5WmUXhGNXJCwcGIA5HBoAB4iA3iHPJS9lIAU6ltQgLRygJDmgARmgCA6gCFugLJGgNvxgBkIwB38oBOU3WlX6aGkMGU6VyGWIHTqaDYkmo+T8EBQxAABvgiKQdLi0ckMWg8LYGMQwCcvDkAHycdFSRG0tBefLCFzEQ54IwEGBzCBwaT5AAMhzYbC5UCgaGxvKgRhiqwc0MOYVxkFp7HEcAYYDFshYjSUqga3BJLOodyghDQ335guFooA2uKALqAejNADTegAA5QBUcoBTRUAQ8qAT+1AIYxgBh-wBYCYBx+O5RkA7cGANeVAAxKgE34wOAIKDAJ0OgGk5QBwKoAKV0RbEANvGALjkAIJ0AAqgDztQDR8tGbbc+oBGHUA98qAU7lAH8pgHh9QDAMSWgUXALd+gFmTQA68tGIvLsQHA6HAA6mfsAMXIr1eAcGNAFnagCXjYPfQCy8oA7fxZOhZ+RVSDg7A0yQGQyMVAGMLhhQVq2EJFJWggPRwGgeAABk3AISw4BGeVpFsIwwFiICGDwaQcGfdUjCwc01H0GEACMADUwDQZh6xgjBsBcNAMG4IA">Try it out at playground>>></a>
```javascript
Page({
  onShow() { },
  data: { }
})

// insert the method init

// example 1 by replace
    $(code)
      .replace(`Page({
        $$$2
      })`, `Page({
        init() { 
					this.show = false
				},
        $$$2
      })`)

// example 2 by append
$(code).find(`Page({})`)
  .each(item => {
		$(item.attr('arguments.0')).append('properties', `init() {}`)
  })
	.root()
	.generate()
```
<a name="a7edab6fadf163916e3a8ffdc038f06d"></a>
## Find and modify import\export statement
<a name="2ec07c5391fac7f018e931476838e2ff"></a>
### 21.Find import\export statement
<a target="_blank" href="https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBc4C2UkBOcABAOQACAhgDZgD0AziqQDoRh6EmXEBmBSHGSq1GzNh3xFiAKmKUGxAGpg0Adz4ChpOGgZw6AN1VrSAbgmciACgo16TUgEoAdHAAWaCNaeWpJYGIYBjRkCF0ADzgAGmICPRIAX01BYQU6HBQ1AFp3AGtzPy5ifNjAmABjWPjiZP5UuwYMrNyCiwg2NjQI-1kU7XIoSg9GD1YIbt7gSliAIzqtMiGR-XdxyeKAXnkAJi6e4oqkCH15AGZibeBE-d70XkoYahJ8kGiQNUI85HQsEF4YBAKnAwMdiHACJQTrxCDhrLwwNQ0ABJCAw2KUKBgWJIKAg44MJzEYBsYjEI4nEgAEku8ixLgA5kgmUd0KTyQSSAwkDACBU0LSEUjUTCXNzefz2XQ6HE0HBeRBiABPHkEcGQ6GwtAoDnoEpoeLsimneIMJ4kbYAbQAuuyqdZxXy0L5FcQXAiIChrAADSTFKkAfSpAEZ+mRA1SdqRvS6yS40JQKu5rGBdEJNgA+Ynssmm80uWAMZOkDOlsvEYPOHOys3PAvBZOptA4RleA3DNA+WO1bsuARIOA+dnuyBe31WQcR4NOGPDhNJlNpy5Zkmu3N6fOF4tl8tR7vr2twetFxfN1sTSG6LvsxK9-uD3sesd+6RyBTEKdh0gRqOz13xxNGyXTNszXGtNwbWwd1LYgzirMC8zrLdTxbBk20vTsnG7W9h3vId-yfH0XwCD8qRDWovx-aNe3nIDm2XUCyQPCCTxLaDiAAFngpjwKQyCm1Q9CO2vV0cP-PCXTtB1VX5R9Rx9DZX0ooNKz-ONaJQhjVx4xCj2Qtid2IABWbimN0486MEi9hKwm87yQAd8LjQjvUUkiyPIhYGinai50AzSQO0syNz41joKzAA2UzmNCyzz3bK9bNE+zHLkz0FIOaRtinNS3Q0gStOrcz9PC4gAHZot4vT+LTeKMJEskxLjCThxctyOUpD8VNpH9coAhcCsCoqQuqsL2IADkq4qarPNDrMS7CUofVr5NczKSHuR5ni6kM+vy4CV2Gw8LKg9iAE4ppGk6BLqmzFs6V14nlAhFXMgArJBIFsFg2Hgm4IDecBoHgAAZKEGT+OAlSgPQKgIMA8UB9wFAABSekEDSwB5qBCd4zVmFR1AAFWhjBsAhNAMESIA">Try it out at playground>>></a>
```javascript
// find all import statements
//		import x from 'xx' ;  import { x } from 'xx' ; import 'xx'
$(code)
	.find(`import $_$1 from '$_$2'`)
	// Quotes for $_$2 cannot be omitted

// find import()
$(code)
	.find(`import($_$1)`)

// find ExportNameDeclaration statement
$(code)
	.find(`export $_$1 from '@path/sth'`)


// find ExportAllDeclaration statement
$(code)
	.find(`export * from '@path/sth'`)

```
<a name="3fce4365602bac76ab8a6aa2b8a2711a"></a>
### 22.Modify source of import statement
<a target="_blank" href="https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBc4C2UkBOcABAIbEBmBSOxA5AEYMD0TAtFADYwDmkdAHQhg8hEgCsANMWDEYAZzTIIcNAA840hWgIAZJDx47iAX0rVajFuPkdufCHRCSQAd0IBrZOiwgKMCABjODAkCGI4AlIIeQpCHAAKCjBONABJCDjpUigwaSQoELD5AEoZIWJiQOKSABJiAF4yXIA6HgMkavQKqprieSQYAkC0RsoU9MykFoGhkZ7mZmICNDgh8IBPQYIIqJi4ghw0FF70YgALHTQe6piSFfkYThIm2oTZ4bQSnsqWla5SCMEj9KsQAAYifBEYi1AD6tQAjOYaPQmKwGHZePwwZIQZUIaJoXDEcjLO12l00HQwSDvuFQX8kEg4Ak6aDiC1khAUAkCVCSLJakKkWYqCi6MSAEzUtkMtCA84JBJgVQ4MoNAB85Xp7Nu8hIHxGYxVaBwLRwpDggXOAG1JQBdG0ABntLQAbqRuNcdaCTWaLVbbQ7na6IKg0O7PTBRk1DRH-pxAWhgT72VZmHRcanQenyZ1wxm8cRZZUTCWOdRmayQX80ACgUW+WIYfCEdJZNplKoNNIhSTRRZ6FLqVn2fjIc3iW2ZHJFAAxLvqTQw4WmUlD+HSmk+uk9FZrAjhB5POBtNAQHSW5N0kxCZzgaDwXTRHi+OAbKBoeSBAhgQr385SHkAAFfcQh0LAKE9RQXEeBgADUwDQVwABUPwwbBIjQDATCAA">Try it out at playground>>></a>
```javascript
// modify the source from 'bb/bb-plugin' to 'gogocode'

$(code)
	.replace(`import $_$1 from 'bb/bb-plugin'`, `import $_$1 from 'gogocode'`)

// modify the source from 'bb/...' to 'bb/gogocode/...'
$(code)
	.find(`import { $$$1 } from '$_$2'`)
	.each(item => {
		const source = item.match[2][0].value;
		item.match[2][0].node.value = source.replace('bb/', 'bb/gogocode/');
	})

// import { useContext, userLogger } from '@as/mdw-hk'
// modify the specifier useContext to useFContext
$(code).replace(`import { useContext, $$$1 } from '@as/mdw-hk'`, `import { useFContext, $$$1 } from '@as/mdw-hk'`)

```
<a name="dd6800cb37b52b3c652f34b1616ff621"></a>
## Find and modify jsx tag
<a name="c3e4319bf022fd54ec95ea45d35bbd21"></a>
### 23.Modify the tagName of jsx tag
<a target="_blank" href="https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIA8A1MNAdwD4AdCAAkv0KMogEMBbNAXjJAEZPKBjADaMAzsI4hGfOGABuaXgHpyVGgWIMW7TgCZOy6tRzCojCCRwLjp-TQVrSFC-ZIgANCCJIATgGtk6LBAAMxgIKTAkKjgvU2Eg72YACiCwATQASQh410pGKDAcpChpSOEASkpgCmo+UrhKABJKNlz8gDoAcyQu2vRq-jrKYSQYLz40ZsoUtMz4tuHR8f6FBUovNDhRqgBPEa9KaNj4r1YUAfRKAAs0df7aiGF69eEYAXqWhsSFsbQy-uo2usoEJxokAAa0dQNaFcEjQhraJx0Ehg1wQlCyRowuHQxEKDEyFF-FTrTZeKjPV5wTpoCA3RhwNCJYCUMDCAAKpLg20wBy8MAmAF9iYKKG5wNB4AAZUwdQLcqBoYR8LxgYriy4iTkbaQ3LBBRgCYRodwvABG9gAKttFYFaswTOsQIKgA">Try it out at playground>>></a>
```javascript
<View>
  <View name="1" class="active" />
  <View></View>
</View>

// modify the tag name from 'View' to 'div'

$(code)
	.replace(`<View $$$1>$$$2</View>`,`<div $$$1>$$$2</div>`)
```
<a name="12f96663fce01786d5c4c342e5ebd3f0"></a>
### 24.Modify attributes of jsx tag
<a target="_blank" href="https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIA8A1MNAdwD4AdCAAkv0KMogEMBbNAXjJAEZPKBjADaMAzsI4hGfOGABuaXgHpyVGgWIMW7TjxCUwKcQGs0AT04k4aAB5wcCtaQp2HJEABoQRJACdDydFggAGYwEFJgSFRw3owQwkE+zAAUQWACaACSEAlulIxQYLlIUNKRwgCUlMAU1HxlcJQAJJRseQUAdADmSN116DX89ZTCSDDefGgtlKnpWQntI2MTAwoKlN5ocGNUJqPelNGx8YloKIPolAAWaBsDdXENG8IwAg2tjUmL42jlA9RkcHaGygQgmSQABrR1ExWOIdE1Go0uCREY0AEzOOgkcFuSEOA4mKBacDQeC8VHI1EY+xY8G-FQbLbeKhPF6AzpoCA3RiWJL0gC+FHcJNgcAAMrFOoE4IS0MI+N4wCVhZcRAAFRnSG5YIKMATCNAeZ4AIwcABVZYE6swoIwNiB+UA">Try it out at playground>>></a>
```javascript
<View>
  <View name="1" class="active" />
  <View name="1" id="key">text</View>
</View>

// modify the attribute name="1" of View tag

$(code)
	.replace(`<View name="1" $$$1>$$$2</View>`,`<View type="input" $$$1>$$$2</View>`)
```
<a name="9bb77fa0804ee124087698762e7de65e"></a>
## Simple case
<a name="0aa300d7d8ef20bbfc3c9cff485df5cb"></a>
### 25.Transform all .js file in a folder

```javascript
const glob = require('glob');
const $ = require('gogocode');

glob('./code/**/*.js', function (err, files) {
    files.forEach(function (file) {
        rewrite(file);
    })
})
function rewrite(filePath) {
    const newCode = $.loadFile(filePath)
    	.replace(`let $_$1 = console.log()`, `let $_$1 = void 0`)
    	.generate()
 		$.writeFile(newCode, filePath);
}
```
<a name="7de214970d0301e86d2e844dfade3731"></a>
### 26.Insert a blank line
<a target="_blank" href="https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIBmMIDGcYSEABAIYAUAlGcADoRMC+TTehxpZARrfXYQ2zQqQDOcMgTIBeMpyIkIAxqJFMCEqSjlkBsgHyDyZM6xAAaEAHckAJwDWydFlz4lPOPYoRxOBwBbKhwwABs0AEkIAMtKKDA4pChuPzo1My0-KQASPQoEgDoAcyRSrXQmTO0ycSQYewI0PVCI6IDCuoamqrIAej6yezQ4BvIAT3r7Mm9ffyC0XQrmgAs0Yd6syTIoMIomlaQw9Gn5AANd-bRD4-Wc4ABqCDQbMgARCjg0WhYzgG5NjVhuIYGEpPIclQuo00DRCqEICgqAByRSpMg5AD6OQAjKoWMiaL0zIU0PsVlQwF9AnJjBkzAyqWhAoUKDgvvYqJcDkcTkTTGYWPyGWRCvYkEg4LRiaLimhnj4vtKBaLhtzvs9XgAlNDFACiAA8oFy9jzbvY4sjioTLYSAaZhqN7ORgaC4KwmFZwNB4AAZXzFNxwcZQNDiAj2MApL0rCjiAAKjuI6ywOAoYXEaGsIN4ADUwC8ACohjDYLSBKAUYYgFhAA">Try it out at playground>>></a>
```javascript

const placeholder = `placeholder${+new Date()}`;
$(code)
	.find('function $_$1() {}')
	.after(placeholder)
    .root()
    .generate()
    .replace(new RegExp(placeholder, 'g'), '');
```
<a name="ed14752c9f37a2b8b23436eb7abde1f2"></a>
### 27.Remove a node
<a target="_blank" href="https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIA6EAE+YAtlEgE5z4CG+AZuUsfgOTUsDcehAxkhAGckAGzQA6YUgDmAChZS0VAIIsAlFwL4AbtXL4ARvgC8+PoJHjJs9d1P8hoidLH7IKGTc069PY3fOOVhq89hZOUn50MBA8HCAANCAA7hQA1sjoWCBRMXBg-Phw5NSCdBTEMnRgogCSEGXxNFBgjUhQefaq+MC2ZgJUACR+1M1iUtJIfOi99lRCMOQ8aJHVaHVlYvOLaLYA9Lv45IoLBACeSAuFxaXlaCh26PgAFmhHM4JURwIwwlQmAzItktVLYcHAxFUIO4WH0wlYPGo8GDCGIjsQkFo0B5bEc4CdDmhvr8xmgIK9qHAsSCIABfPAJcDQeAAGRKUiycFOUEJPHIYHaDKe1AEAAVcXlXlg6NRhAI0IlvvoAGpgNBJAAqXIw2D4pF0GBpQA">Try it out at playground>>></a>
```javascript
// example 1
$(code)
	.find('console.log()')
	.remove()

// example 2
$(code).replace('console.log()', '')
```
<a name="c63b2da7a53678dbc545c45b63fa84de"></a>
### 28.Transform the destructuring assignment to ES5
<a target="_blank" href="https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGSIDOcABMAIYA0ARsQLylUCMAvhTncQMzMcogUgA7kgBOAa2TosIAGYwIOOGHzE4IsoRmiAtgAoZYADZoAkhC0ViZKGEtIoS-AQCUpADoRixPIRIASDmswADoAcyRwvHQPLx8iYgIkGBEcNA4DYzMtYMTk1JjiAHpC4hE0OGTPAE8kkVV1TR00FG9UNIALNDKCuJIyghhDEno-XVyUtGcCr2CDCBRdAHJe0mI-AH0-Rg4NvwAmYh4Rzc5Fqc8vYmC0Mhx23V0wODRtV1oAPncLy9bfYjE0FUADJgeL0J4vYLaMhwO4AbUYAF1ZkZniIHhDtJYwG9PmBiABSYgHWj0AAM5x+sScJCQVAAVhxMVCYfDOIi4WTkQA3MiGGBoaaXFYQNCCAHA0HDf6AkFEFlQB4S7G4r5Uy7GEjodj0AAGfmAEuCvP5aCOa2AdPpzGCBqNJoFzF1Qp+YBkxEez20LNh7Thew5YB5fIFxAAhPR7SHJmr1ZdtcQANT0RYAH1TiyTxGZ0N9-sDwdNLsuzGLXjKFREnm1xeYlKpzLKUEMtzQACEqrpdSsDaLxbKpcF6UhIEtLGcnfWvHWhcEREgkHBdOcChXKqU0AMhmE0KL1M9lx5SxB+OBoPAgRpQtI4FUoJucCIwA5T+0yAQAAoVpRdLAyPkEGgAgDFQABqYBigAKneGDYHg2hQGQZQgMwQA">Try it out at playground>>></a>

```javascript
// input: const {a,b = {b1},c = 3} = d; 
// output: const a = d.a, b = d.b || {b1}, c = d.c || 3;

const res = $(`const {a,b = {b1},c = 3} = d`)
  .find('const { $_$1 = $_$2 } = $_$3')
  .each(item => {
    const keyList = item.match[1].filter((item, i) => i%2 == 0)
    const obj = item.match[3][0].value
    const newkeyList = keyList.map((key, i) => {
      let dec = `${key.value} = ${obj}.${key.value}`
      if (item.match[2][i].value != key.value) {
        dec += ('||' + item.match[2][i].value)
      }
      return dec
    })
    item.replaceBy(`const ${newkeyList.join(', ')}`)
  })
	.root()
  .generate()

```
<a name="d28b08f61b8f8bb779ebc18cff0a6ad1"></a>
### 29.Insert more than one line of code
<a target="_blank" href="https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIBmMIDGcYSEABAQE5oCGcaAFAJRnAC+IANCAO5KUBrZOiy58REuTiUaEAM45+AWwY4wAGzQBJCIs5kaUMPqRRipOS2AAdchQtwyAEjIBeA0YB0AcyS+CqGi2ZPbyjnJIMJQEaG5kapo6ip4RUTHBZAD0mWTUcFHkAJ6RlGTSsgrKaCj26GQAFmjUGQFhuWhyMOqO7k4MqdFoTBkhnmoQKAwABniE5uRUtPTMrGxTwxDWjmSetAT1DGD0Sm4AfKy2W1dwfUdoSp500gwA5ABGqIUvTEyPUFBoCavD4oL76KaXODXa6aRxwQoAuIvToEGJyOQvSHQqFwVoRTSedR+V4otEYjbY9YjMhsDajShIJBwZiXOx5ArtTrdHyApp0RgbNi2LjgaDwAAysm8onhALkVDAZhF9RocgACnliE0sDgaOo5GhuJ03gA1MBoHgAFQRGGwASUUBo1BAbCAA">Try it out at playground>>></a>
```javascript
$(code)
	.find(`function create() {}`)
	.each(item => {
			$(item.attr('body')).append('body', `
					let type = 'success'
					console.log('success')
			`)
  .root()
  .generate()
})
```
<a name="ceb376d5162f7cd760bd846dba6a8617"></a>
### 30.Find variables in complex expression
<a target="_blank" href="https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIAUBDAOgCMCBjAAgDJLyiBKcgH0fJwuvJTpABoQB3JACcA1snRYQAMxgRScMEgjk4QvBADOU4QFscUsABs0ASQjae5PFDCWkUBUo0NgAHWXlSTuOQAk5AF4rGwIAcyRwr3R3ck9vcg0kGCFSNEDyA2MzbQJE5NSY8gB6IvIhNDhk5QBPJKEVNU1tIR00FDj0cgALNHLCr00fco0YQx8ggG0AXULfHDyUtDpC2IIDCBQcAHJfAH1fLeWPVbQ8Ui6cHDA4NB0GAIA+cjdj2PIwKVYVt9jr24IoHhyhA4Dg6AQIKg0AQ4NUoGkAkEtgBZW5EXoAUQAHlBhhpFBAtlRKN8fn8dACgWgQTgAIzgyHoGFwtIAQiRqJ06KE2NxaA0+KUW1J5BcItiJXIgGT4wBfioQSKRAC6mgGV5ciAGADALBygHozPDkVyuWh6g2kcVlfmjOAAmAaC7kynA0Hg0LU3p4G5go4-WIAX3IaEMGjSH1YdsBDrBEKhzPh5HZ5BRaMxOLxBMOz1NktlgBunQDTXoAQt0AG8qAecTTcMLVabVcbhTnRBXe66J6vd7vt6joVypUhMoy2MCAArJCQbb6wlHFsQXjgaDwAAy6lCklh8I0pCEYAcU66eA0AAVOwpelgpHgA2g+CMiAA1MBofgAFRZki8OjDGG9QA">Try it out at playground>>></a>
```javascript
$(`(a.b.c && b) || (c && d)`)
.find('$_$1')
.each(item => {
  if (item.parent().node.type == 'MemberExpression' && item.parent(1).node.type != 'MemberExpression') {
    // output is 'a.b.c' instead of 'a \ b \ c'
    console.log(item.parent().generate())
  } else if (item.parent().node.type != 'MemberExpression') {
    console.log(item.generate())
    // output is b \ c \ d
  }
})
```
If you have any questions about the above cases, please submit them at <a href="https://github.com/thx/gogocode" target="blank">github</a> issue, we will reply soon~