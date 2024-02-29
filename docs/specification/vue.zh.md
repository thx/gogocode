---
title: 对 Vue 的支持
order: 5
---

如果vue项目中，template和script是分开的，那么使用$.loadFile分别按照html和js处理即可

如果是sfc文件，处理会稍稍有些不同

### 1.构造AST实例
```javascript
const sfcAst = $(input, {
  parseOptions: {
    language: 'vue'
  }
})
```

### 2.对template内容处理
#### 2.1 获取template标签内部的AST
```javascript
templateAst = sfcAst
  .find('<template></template>')
```
#### 2.2 对其应用转换逻辑（完全同html）
```javascript
templateAst
  .replace(`<el-popover open-delay="$_$" $$$1>$$$2</el-popover>`, `<el-popover show-after="$_$" $$$1>$$$2</el-popover>`)
  .find('<$_$><$_$>')
  ......
```
#### 2.3 find之后，想拿到template根节点
```javascript
templateAst
  .find('<$_$><$_$>')
  ......
  .root('template')
  ......  // 在进行其他转换
```

#### 2.4 获取script标签内部的AST
```javascript
sfcAst
  .find('<script></script>')
```

同理，进行js相关转换

### 3 完成转换输出完整sfc
```javascript
sfcAst
.generate()
```
如果完全链式操作的话：
```javascript
$(input, {
  parseOptions: {
    language: 'vue'
  }
})
.find('<template></template>')
......
.root()
.find('<script></script>')
.root()
.generate()
```
