const data = `
<h2 >vframe与view</h2>
<p>每个<code>view</code>都有一个控制它的“壳子”<code>vframe</code>，由于<code>view</code>是异步加载的，不可控的，因此<code>magix</code>内部使用<code>vframe</code>来控制渲染的<code>view</code>，一个<code>vframe</code>同一时间只能有一个<code>view</code>，因此可以认为<code>view</code>与<code>vframe</code>是<strong>一一对应</strong>的。</p>
<p>同时把<code>view</code>之间这种父子关系放在<code>vframe</code>上维护，这样<code>view</code>就只专注渲染即可。当需要访问拥有父子关系的<code>view</code>时，只能通过访问<code>vframe</code></p>
<p>我们可以使用<code>owner</code>属性来访问当前<code>view</code>的<code>vframe</code></p>
<pre><code class='language-javascript' lang='javascript'>// index.ts
import Magix5 from &#39;magix5&#39;;
Magix5.applyStyle(&#39;@:./index.less&#39;);
import View from &#39;../../../view&#39;;

export default View.extend({
  tmpl: &#39;@:./index.html&#39;,
  init() {},
  assign(extra) {
    const owner = this.owner;
    console.log(owner);
    this.set(extra);
  },
  async render() {
    await this.digest();
  },
});
</code></pre>
<h2 >view间关系</h2>
<blockquote><p>在<code>magix</code>中，<code>view</code>被设计的比较独立，同时<code>view</code>之间的关系维护在<code>vframe</code>上，因此不能直接访问父<code>view</code>，只能访问当前<code>view</code>的<code>vframe</code>的父<code>vframe</code></p>
</blockquote>
<h3 >获取当前view的节点对象</h3>
<p><code>view</code>和<code>vframe</code>都提供了一个<code>root</code>对象用于指向当前的节点对象（<code>dom</code>节点），<strong>两者指向的是同一个节点</strong>。</p>
<p>需要注意的是<code>vframe</code>和<code>dom</code>节点完全不一样，一个是真实存在<code>dom</code>树上的，一个是在<code>js</code>中的逻辑中的关系。并且此处的<code>root</code>并非与<code>Magix.Vframe.root</code>相同，后者指向根<code>vframe</code></p>
<pre><code class='language-html' lang='html'>&lt;!-- index.html --&gt;
&lt;div&gt;test&lt;/div&gt;
</code></pre>
<pre><code class='language-javascript' lang='javascript'>import Magix from &#39;magix5&#39;;
import View from &#39;../../../view&#39;;

export default View.extend({
  tmpl: &#39;@:./index.html&#39;,
  init() {},
  assign(extra) {
    console.log(this.root); // 打印root
    const vf = this.owner
    console.log(this.root === vf.root)
    this.set(extra);
  },
  async render() {
    await this.digest();
  },
});
</code></pre>
<p>打印的结果为：</p>
<pre><code class='language-html' lang='html'>&lt;div mx5-owner=&quot;app1&quot; mx5-from=&quot;app1&quot; mx5-view=&quot;xxx/xxx/xxx&quot; &gt;
  &lt;div&gt;test&lt;/div&gt;
&lt;/div&gt;

true
</code></pre>
<h3 >获取父view</h3>
<p>当要获取当前<code>view</code>的父<code>view</code>时，首先要获取当前的<code>vframe</code>，再通过<code>vframe</code>之间的关系来获取其父<code>vframe</code></p>
<pre><code class='language-javascript' lang='javascript'>import View from &#39;../../../view&#39;;

export default View.extend({
  tmpl: &#39;@:./child.html&#39;,
  init() {},
  assign(extra) {
    const vf = this.owner; // 获取当前的vframe
    const parent = vf.parent(); // 父vframe
    this.set(extra);
  },
  async render() {
    await this.digest();
  },
});
</code></pre>
<p><code>Vframe.parent()</code>接收一个参数作为向上寻找的层级，当不传参数时，默认为<code>1</code>。当获取到父<code>vframe</code>后，就可以使用其<code>root</code>来获取其<code>dom</code>节点了</p>
<p>并且可以使用<code>invoke</code>来调用其绑定的<code>view</code>的方法：</p>
<pre><code class='language-javascript' lang='javascript'>import View from &#39;../../../view&#39;;

export default View.extend({
  tmpl: &#39;@:./child.html&#39;,
  init() {},
  assign(extra) {
    const vf = this.owner; 
    const parent = vf.parent(); 
    parent.invoke(methodName,{args}) // 使用父vframe.invoke调用其view的方法
    this.set(extra);
  },
  async render() {
    await this.digest();
  },
});
</code></pre>
<h3 >获取子view</h3>
<p>同样的，当我们想要获取子<code>view</code>时，也必须通过<code>vframe</code>。然后再通过调用<code>vframe.children()</code>来获取子<code>view</code>的<code>id</code>集合</p>
<pre><code class='language-javascript' lang='javascript'>import View from &#39;../../../view&#39;;

export default View.extend({
  tmpl: &#39;@:./index.html&#39;,
  init() {},
  assign(extra) {
    const vf = this.owner;
    const children = vf.children(); // 子view的id集合
    this.set(extra);
  },
  async render() {
    await this.digest();
  },
});
</code></pre>
<p>因为<code>children()</code>得到的只是<code>id</code>，如果需要获取实际的<code>vframe</code>，则需要使用<code>Vframe</code>模块中的<code>byNode</code>或<code>byId</code>，进而再使用其<code>root</code>来获取到实际的<code>dom</code>节点</p>
<ul>
<li><code>byNode(node: HTMLElementOrEventTarget): Vframe | null</code>：通过<code>html</code>节点获取<code>vframe</code></li>
<li><code>byId(id: string): Vframe | null</code>：通过<code>vframe</code>的<code>id</code>获取<code>vframe</code></li>

</ul>
<p>&nbsp;</p>
`;
export default data;
