const data = `
<h2 >引用文件</h2>
<blockquote><p>告知magix-composer在哪个位置把哪个文件的内容输出出来。</p>
</blockquote>
<p><strong>以下介绍的所有&#X40;:占位符后面的文件，均可以用如&#39;&#X40;:../../x.html&#39;相对路径</strong></p>
<h3 >&#X40;:filename.html</h3>
<blockquote><p>在当前位置经magix-composer编译后，输出<code>filename.html</code>的文件内容，常用于Magix.View的tmpl属性</p>
</blockquote>
<pre><code>var Magix=require(&#39;magix&#39;);
module.exports=Magix.View.extend({
    tmpl:&#39;&#X40;:./index.html&#39;
});
</code></pre>
<h3 >&#X40;:filename.[css,less]</h3>
<blockquote><p>在当前位置输出<code>filename.[css,less,scss]</code>的内容，目前工具支持<code>.css</code>，<code>.less</code>样式文件。以字符串的形式输出，该占位符只能配合<code>Magix.applyStyle</code>方法使用！输出文件内容字符串时，会修改<code>css</code>中的类名，确保在当前项目唯一。</p>
</blockquote>
<p>假设目录结构如下</p>
<pre><code>|____index.html
|____index.css
|____index.js
</code></pre>
<p><code>index.css</code>内容如下</p>
<pre><code>.conent{
    color:red
}
</code></pre>
<p><code>index.js</code>内容如下</p>
<pre><code>var Magix=require(&#39;magix&#39;);
Magix.applyStyle(&#39;&#X40;:./index.css&#39;);
</code></pre>
<p>最终生成的<code>index.js</code>内容如下</p>
<pre><code>var Magix=require(&#39;magix&#39;);
Magix.applyStyle(&#39;mp-ec5&#39;,&#39;.mp-et5-content{color:red}&#39;);
</code></pre>
<h3 >&#X40;:./filename.[css,less]:className</h3>
<blockquote><p>把<code>filename.[css,less]</code>文件经工具编译后的<code>className</code>输出在当前位置，以字符串的形式输出。</p>
</blockquote>
<p>假设目录结构如下</p>
<pre><code>|____index.html
|____index.css
|____index.js
</code></pre>
<p><code>index.css</code>内容如下</p>
<pre><code>.conent{
    color:red
}
.title{
    color:green
}
</code></pre>
<p><code>index.js</code>内容如下</p>
<pre><code>var Magix=require(&#39;magix&#39;);
Magix.applyStyle(&#39;&#X40;:./index.css&#39;);
var title=&#39;&#X40;:./index.css:title&#39;;
console.log(title);
</code></pre>
<p>最终生成的<code>index.js</code>内容如下</p>
<pre><code>var Magix=require(&#39;magix&#39;);
Magix.applyStyle(&#39;mp-ec5&#39;,&#39;.mp-et5-content{color:red}.mp-et5-title{color:green}&#39;);
var title=&#39;mp-et5-title&#39;;

console.log(title);
</code></pre>
<h2 >ref&#X40;filename.[css,less]</h2>
<blockquote><p>引用<code>filename.[css,less,scss]</code>文件经工具编译后的类名，来修改当前<code>js</code>文件中使用的模板<code>html</code>中的<code>class</code>。</p>
</blockquote>
<p>假设目录结构如下</p>
<pre><code>|____index.html
|____index.css
|____index.js
|____index-inner.html
|____index-inner.js
</code></pre>
<p>如果<code>index-inner</code>肯定是渲染在<code>index</code>中，我们让在<code>index</code>范围内生效的<code>class</code>也能影响到<code>index-inner</code>，需要在子<code>view</code>中显式指定引用到的样式(受哪个样式的影响)</p>
<p><code>index.css</code>内容如下</p>
<pre><code>.conent{
    color:red;
}
.title{
    color:green;
}
</code></pre>
<p><code>index.js</code>中的内容如下</p>
<pre><code>var Magix=require(&#39;magix&#39;);
Magix.applyStyle(&#39;&#X40;:./index.css&#39;);
</code></pre>
<p><code>index-inner.html</code>中的内容如下</p>
<pre><code>&lt;div class=&quot;title&quot;&gt;title&lt;/div&gt;
</code></pre>
<p><code>index-inner.js</code>中的内容如下</p>
<pre><code>&#39;ref&#X40;:./index.css&#39;;//开头写上引用index.css
Magix.View.extend({
   tmpl:&#39;&#X40;:./index-inner.html&#39;
});
</code></pre>
<blockquote><p>因为<code>index-inner</code>肯定是渲染在<code>index</code>中，所以我们可以把样式统一在<code>index</code>中加载，子页面只需要引用父页面的样式，修改掉模板中的类名即可。
应用场景：某个复杂的<code>view</code>内部拆分，比如一个创意提交表单，内部根据创意类型拆分了<code>n</code>个子<code>view</code>，但是它们的样式可以统一写在最外部的<code>view</code>上，不必要每个子<code>view</code>写一份</p>
</blockquote>
<h3 >&#X40;:moduleId</h3>
<blockquote><p>当前文件的模块id，如app/views/default</p>
</blockquote>
<p>假如某个文件的位置为<code>app/views/default</code></p>
<pre><code>var Magix=require(&#39;magix&#39;);
module.exports=Magix.View.extend({
    render:fucntion(){
        console.log(&#39;&#X40;:moduleId&#39;);
    }
});
</code></pre>
<p>最后生成的文件内容如下</p>
<pre><code>define(&#39;app/views/default&#39;,[&#39;magix&#39;],function(require,module){
    var Magix=require(&#39;magix&#39;);
    module.exports=Magix.View.extend({
        render:fucntion(){
            console.log(&#39;app/views/default&#39;);
        }
    });
});
</code></pre>
<h3 >&#X40;:{revisable string}</h3>
<blockquote><p>可被magix-combine压缩的字符串，只能出现在字符串中</p>
</blockquote>
<pre><code>&lt;div name=&quot;&#X40;:{user.name}&quot;&gt;&lt;/div&gt;
let Magix = require(&#39;magix&#39;);
module.exports = Magix.View.extend({
    tmpl:&#39;&#X40;:./index.html&#39;,
    render(){
        let name=&#39;&#X40;:{local.login.user}&#39;;
        console.log(name);
    }
});
</code></pre>
<p>最后生成的文件内容可能如下</p>
<pre><code>let Magix = require(&#39;magix&#39;);
module.exports = Magix.View.extend({
    tmpl:&#39;&lt;div name=&quot;__&quot;&gt;&lt;/div&gt;&#39;,
    render(){
        let name=&#39;_a&#39;;
        console.log(name);
    }
});
</code></pre>
<blockquote><p>该功能的作用主要是把互相无规则的字符串变成有规则的字符串，提升如gzip的压缩率</p>
</blockquote>

`;

export default data;
