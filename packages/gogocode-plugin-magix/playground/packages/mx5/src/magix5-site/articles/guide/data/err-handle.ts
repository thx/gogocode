const data = `
<h2 >错误监控</h2>
<p><code>magix</code>在设计时，把<code>view</code>之间尽可能设计的比较独立，就像<code>iframe</code>标签一样，同一个页面里面，不同<code>iframe</code>里面的内容互不影响。在<code>magix</code>项目中，因为<code>view</code>之间是尽可能的独立设计，并不是完全隔离，所以同一个页面上不同<code>view</code>之间还是会有影响，因为不可能像<code>iframe</code>那样完全隔离，尤其是多人协作开发时，当某几个<code>view</code>质量不高出问题时，通常会导致其它<code>view</code>也渲染不出来</p>
<p><code>magix</code>采用这样的方案来解决这个问题：<code>magix</code>内部在调用开发者提供的<code>view</code>时，对上面的大部分方法的执行都是采用<code>try catch</code>的方式，所以当某些方法出错时，并不会影响<code>magix</code>内部的流程，所以也就不会影响到其它<code>view</code>的执行与渲染</p>
<p>当有错误发生时，我们应该捕获到错误，并记录下来，及时改正出问题的地方。我们可以用下面的方式捕获到<code>magix</code>项目中错误的发生</p>
<pre><code class='language-javascript' lang='javascript'>import Magix from &#39;magix&#39;

Magix.config({
  error(e) {
    // handle...
  }
})

// 等同于
Magix.boot({
   error(e) {
    // handle...
  }
})
</code></pre>
<p>&nbsp;</p>
`;
export default data;
