const code = 
`
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>title</title>
    <link rel="stylesheet" href="test.css" />
    <meta name="renderer" content="webkit">
    <script> var a = '1';</script>
    <style type="text/css">
    .test{
        color: #000;
    }
    </style>
</head>

<body>
    <div id="1">
        <span>test</span>
        <img src="test" />
        <span>test</span>
        <span>test1</span>
    </div>
    <form id="myform" class="mt10" style="margin-top:10px;">
    <!-- comment test -->
    <input type="radio" checked />
    </form>
</body>

</html>
`;
module.exports = code;