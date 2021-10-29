[![Code transform has never been easier: GoGoCode](https://img.alicdn.com/imgextra/i3/O1CN018G7KFa1Etp6O8BAvs_!!6000000000410-2-tps-1949-552.png)](https://gogocode.io)

## What is GoGoCode?

[中文README](readme-cn)

GoGoCode is a transformer for JavaScript/Typescript/HTML based on AST but providing a more intuitive API:

- A jQuery-like API to navigate and transform the AST.
- A Regex-like syntax to match and modify code.

Learn more at the [GoGoCode.io](https://gogocode.io)


## Intro

Let's show you both select and modify API useage:

### In

```javascript
const a = 1
const b = 2
```

### Transform With GoGoCode

```javascript
const $ = require('gogocode')
const script = $(source)
// use $_$ as a wildcard to match AST element at any position you want
const aAssignment = script.find('const a = $_$')
// get the matched AST element value
const aValue = aAssignment.match?.[0]?.[0]?.value
// replace AST as same as replace a string 
// but ignore the code format (space、indent or linebreak)
script.replace('const b = $_$', `const b = ${aValue}`)
// generate ast to string
const outCode = script.generate()
```

### Out

```javascript
const a = 1
const b = 1
```

Try this demo out at our [Playground](https://play.gogocode.io/#code/N4IglgdgDgrgLgYQPYBMCmIBcIDGSIDOcABAIbEC8xAjADoR6EkBGlxATPSADQgDuSAE4BrZOiwgAZjAZww+YnEGlCkoQFsAFJLAAbNAEkIa7mShhTSKHPwEAlMWD1ixRkWIASNqXMA6AOZIgXjozq62JARIMII4aGw6+kZqvlExcfRhbpE4gmDWbB6aabFodmEA9BXEMATxHgD6XqQEZMR8eig4pIIoikjE6qRwOAAWxACCAMoAKsRo+upoECTDZBAAnsRQSARgNhDEG9HtKnBZEWQTBHv+EEsrbAS5+XC+OhAomgDk2W1UjQ833Kh2IVWI-jQJDgo3iQxGsL60zmCzQDxIADdSLoYGgLkwyAA1bG47zXW73ZZveFjAD8vgA2gAGAC69OZbN8WJxeNB4MEaCgulIcUmszIrQIpCWEuIAqFIvi5CIeQg-mIzHgxDAdyE8Rh8RC8TUgnhxGKUEVgEAGSDoR5CYi6SBoZgC0jCEEuZ55ay+eXCuI-P6sAFNb6mAAGwcKwFIxJ5AF8I56wdVIRA0Mo4Er3HABirIP4wgK4DFDt7XgFlpnhmhNCCE1xeJBYHAADIqfwSOAbKBoCvWHggUYtAAKJbkmawSlxvDw6ktAoA8vBW9PBLiE0A).

## Support

- Ding Group：34266233
- QQ Group：735216094


## License

[MIT](LICENSE)