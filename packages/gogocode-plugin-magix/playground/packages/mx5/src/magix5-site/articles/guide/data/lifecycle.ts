const data = `
<h2 >生命周期</h2>
<p>在<code>view</code>中显式的生命周期的顺序为<code>ctor -&gt; init -&gt; assign -&gt; render</code></p>
<pre><code class='language-javascript' lang='javascript'>// index.ts
import Magix5 from &#39;magix5&#39;;
Magix5.applyStyle(&#39;@:./index.less&#39;);
import View from &#39;../../../view&#39;;

export default View.extend({
  tmpl: &#39;@:./index.html&#39;,
  ctor() {},
  init() {},
  assign() {},
  render() {
  	this.digest();
  },
});
</code></pre>
<h3 >ctor</h3>
<p>该阶段只在<code>view</code>被创建实例化的时候被调用<strong>一次</strong>，该阶段的特点为当<strong>子类对父类</strong>的<code>ctor</code>进行覆盖重写时，依旧<strong>无法阻止父类的<code>ctor</code>的执行。</strong>可在该方法内绑定事件及在销毁时做一些清理工作，比如：对路由进行监听、定时器设置销毁等。</p>
<p>在普通<code>view</code>中比较少用，一般用于插件父类的编写</p>
<h3 >init</h3>
<p>该阶段和<code>ctor</code>高度相似，也只会在被创建实例化的时候被调用一次，区别在于当子类进行覆盖重写时，父类的<code>init</code>将不会再执行，除非手动去触发。</p>
<h3 >assign</h3>
<p>接收父<code>view</code>传入的参数，在生命周期中可能会被调用多次。在该阶段适合处理外部传入的参数以及业务逻辑的实现，需要注意的是该阶段<strong>不支持异步</strong>，如若需要使用异步，请在<code>render</code>阶段进行</p>
<p>并且在所有<code>view</code>中<strong>强制必须实现</strong>该方法，同时只有在该方法返回<code>false</code>时阻止更新当前<code>view</code>，其它值则更新该方法的第2个参数升级为当前节点的<code>innerHTML</code>字符串。</p>
<h3 >render</h3>
<p>在该阶段进行视图的渲染，同时支持异步和同步。在该阶段中适合做有关异步的操作，比如数据的请求等等，在处理完数据后进行视图的渲染</p>
<h2 >生命周期事件</h2>
<p>除了显式的生命周期之外，<code>magix</code>还提供了一些生命周期事件，这些事件一般在<code>ctor</code>和<code>init</code>阶段使用事件监听</p>
<h3 >domready</h3>
<p>该事件顾名思义，即<code>dom</code>节点准备完成，在此阶段就可对<code>dom</code>节点进行操作</p>
<pre><code class='language-javascript' lang='javascript'>// index.ts
import Magix5 from &#39;magix5&#39;;
Magix5.applyStyle(&#39;@:./index.less&#39;);
import View from &#39;../../../view&#39;;

export default View.extend({
  tmpl: &#39;@:./index.html&#39;,
  ctor() {
    this.on(&#39;domready&#39;, (e) =&gt; {
      const list = document.querySelectorAll(&#39;.foo&#39;,&#39;#bar&#39;)
    });
  },
  assign(extra) {
    this.set(extra);
  },
  async render() {
    await this.digest();
  },
});
</code></pre>
<h3 >dompatch</h3>
<p>当对<code>dom</code>节点发生<strong>改变</strong>的时候，即当视图发生了改变时，就会触发<code>dompatch</code>事件</p>
<pre><code class='language-javascript' lang='javascript'>// index.ts
import Magix5 from &#39;magix5&#39;;
Magix5.applyStyle(&#39;@:./index.less&#39;);
import View from &#39;../../../view&#39;;

export default View.extend({
  tmpl: &#39;@:./index.html&#39;,
  init() {
    this.on(&#39;dompatch&#39;, (e) =&gt; {
     
    });
  },
  assign(extra) {
    this.set(extra);
  },
  async render() {
    await this.digest();
  },
});
</code></pre>
<h3 >destory</h3>
<p>当<code>view</code>销毁时会触发该事件，可以在此阶段进行一些销毁，变量回收等工作</p>
<pre><code class='language-javascript' lang='javascript'>// index.ts
import Magix5 from &#39;magix5&#39;;
Magix5.applyStyle(&#39;@:./index.less&#39;);
import View from &#39;../../../view&#39;;

export default View.extend({
  tmpl: &#39;@:./index.html&#39;,
  init() {
    this.on(&#39;destory&#39;, (e) =&gt; {
     
    });
  },
  assign(extra) {
    this.set(extra);
  },
  async render() {
    await this.digest();
  },
});
</code></pre>
<p>&nbsp;</p>
`;
export default data;
