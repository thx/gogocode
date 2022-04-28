const data = `
<h2 >js文件作为代码片断</h2>
<p>在开发阶段，我们可以把文件拆分的很碎，来更好的分配给不同的开发者开发。
拆分的这些个零碎的文件在打包时可以合并成一个文件，减少动态加载时的http请求。</p>
<p>即某几个js文件只是开发时的一些代码片断，打包合并时可以合到别的js文件中。</p>
<h3 ><code>//magix-composer#snippet</code></h3>
<blockquote><p>表明一个js文件是代码片断文件，不需要做为单独文件打包，可以使用<code>//magix-composer#snippet</code>指令，如</p>
</blockquote>
<pre><code>// app/views/menu.js
\\//magix-composer#snippet;
var menus=[&#39;1&#39;,&#39;2&#39;,&#39;3&#39;];
</code></pre>
<p>打包后，最终目录并不会输出<code>app/views/menu</code>这个文件。</p>
<h2 >跳过编译流程中的一些步骤</h2>
<p>我们在打包编译一个js文件时，在整个流程上会有<code>打包开始前-&gt;加入loader(define)-&gt;处理样式-&gt;处理模板-&gt;处理js代码片断-&gt;打包结束</code>。在这个流程上某一步不想参与时，可以使用<code>&#39;#exclude&#39;</code>指令</p>
<h3 ><code>//magix-composer#exclude</code></h3>
<blockquote><p>排除某些打包流程中的项目，如不参与第三方代码的编译及添加define可以这样写</p>
</blockquote>
<pre><code>// app/views/menu.js
\\//magix-composer#snippet;
\\//magix-composer#exclude=loader,before
var menus=[&#39;1&#39;,&#39;2&#39;,&#39;3&#39;];
</code></pre>
<h3 ><code>//magix-composer#loader=none</code></h3>
<blockquote><p>指定加载器类型或不使用加载器</p>
</blockquote>
<p>根据<code>magix-comoser</code>全局配置，会对目录中所有文件添加相应的包装器代码，以方便相应的loader进行加载，使用//magix-composer#loader=none可以跳过给当前文件添加包装器代码。</p>

`;

export default data;
