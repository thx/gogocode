### 启动命令


```
npm start
```

将 input 文件夹内的 html 和 js 转换并写入 output 文件夹

### 开发注意

在 rules 文件夹中编写转换规则，格式为

```
module.exports = function (ast) {
    return ast
        <!--      对 ast 进行操作    -->
        .find()
        .each()
        .replace()
        .root()
};
```

> 基础教程：https://gogocode.io/zh/docs/specification/basic

> api：https://gogocode.io/zh/docs/specification/category/get
