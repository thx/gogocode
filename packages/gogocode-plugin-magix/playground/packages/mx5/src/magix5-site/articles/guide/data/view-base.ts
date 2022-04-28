const data = `
<h2 >View的组成</h2>
<p>和原生的前端开发一样，<code>view</code>通常也是由三个文件构成的：</p>
<ul>
<li><code>html</code>文件：模版文件，结合数据渲染出页面</li>
<li><code>css</code>文件：样式文件，当前页面相关的样式</li>
<li><code>javascript</code>文件：必不可少的文件，承担所有逻辑的执行</li>

</ul>
<p>在编译器的支持下，其中<code>css</code>文件可由<code>less</code>文件替代，同时也支持了<code>typescript</code>。并且针对不同的区块功能差异，<code>html</code>文件与<code>css</code>文件也<strong>并非是必须的</strong>，例如：在当前的<code>view</code>只是提供功能上的拓展时，与模版、样式上的需要时，便允许只有一个<code>js</code>文件</p>
<p>那么这三个文件是通过什么来进行连接的呢？答案是：<code>@:</code>占位符</p>
<p>接下来请看具体示例：</p>
<p>当一个<code>view</code>相关文件的结构为：</p>
<pre><code class='language-javascript' lang='javascript'>- index.ts
- index.html
- index.less
</code></pre>
<p>在<code>index.ts</code>文件中的代码如下：</p>
<pre><code class='language-javascript' lang='javascript'>import Magix from &#39;magix&#39;

// 关联样式文件
magix.applyStyle(&#39;@:./index.less&#39;)

export default Magix.View.extend({
  tmpl:&#39;@:./index.html&#39; // 关联html文件
  assign(extra) {
  	this.set(extra)
	},
  async render() {
    await this.digest()
  }
})
</code></pre>
<p>可见，<code>@:</code>占位符的重要性，但它并非只有连接文件的功能，还有比如：引入<code>css</code>变量等功能，在后面的内容我们也会介绍。</p>
<h2 >View中数据渲染</h2>
<p>我们在前面提到，<code>html</code>文件中会结合<code>js</code>文件中的数据来渲染页面，这又是怎么实现的呢？首先我们需要了解的是每个<code>view</code>都有一个<strong>数据对象</strong>。相信你在前面的代码中已经看到了这两个函数：<code>this.set()</code>、<code>this.digest()</code>。这两个函数便是对数据对象进行操作。</p>
<p>其中<code>set</code>函数的作用是设置<code>view</code>中的数据，当调用该函数时传入一个对象，该对象就会被混入到当前<code>view</code>的数据对象中。</p>
<p>而<code>digest</code>函数的功能为<strong>渲染视图</strong>，将模版转化为真正的<code>dom</code>。它也同时支持接收一个对象作为参数，表示设置数据并同时渲染视图。</p>
<pre><code class='language-javascript' lang='javascript'>this.set({username:123}).digest()
// 等同于
this.digest({username:123})
</code></pre>
<p>当<code>html</code>文件中的模版获取到动态的数据后，接下来只需要使用简单的模版语法就能将其渲染出来：<code>&lt;div&gt;{{= username}}&lt;/div&gt;</code>。最终该节点的渲染结果为<code>&lt;div&gt;123&lt;/div&gt;</code></p>
<h2 >View之间的连接</h2>
<p>我们已经了解了一个<code>view</code>的组成与渲染了。那不同的<code>view</code>之间又是怎么建立起联系的呢？<code>magix</code>是怎么做到区块之间的灵活使用的呢？ </p>
<p>现在我们举个例子：有两个<code>view</code>，分别为a和b，我们想要在<code>a</code>中展示<code>b</code>，也就是我们想要在<code>a</code>中引入<code>b</code>，该怎么做呢？</p>
<p>假设目录结构如下：</p>
<pre><code class='language-javascript' lang='javascript'>- a.ts
- a.html
- a.less
- b.ts
- b.html
- b.less
</code></pre>
<p>在这里我们就要介绍一个属性了<code>mx-view</code>，<code>magix</code>就是通过该属性来将不同的区块进行连接。具体比如在<code>a</code>中引入<code>b</code>，只需在<code>a.html</code>中这样写即可：<code>&lt;div mx-view=&quot;@:./b&quot;&gt;&lt;/div&gt;</code></p>
<p>或者你也可以使用<code>magix</code>自带的标签来实现：<code>&lt;mx-vframe src=&quot;@./b&quot; /&gt;</code>，经过编译器的编译后，也会被编译的与前者相同。同样的，组件库中的组件，在经过编译后，也会变为<code>&lt;div mx-view=&quot; &quot;&gt;&lt;/div&gt;</code>这种形式的节点。</p>

`;
export default data;
