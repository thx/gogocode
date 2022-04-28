const data = `
<h2 >数据对象操作</h2>
<p>在<a href='\#/guide?page=view-base'>view基础</a>的数据渲染中提到了<code>set</code>和<code>digest</code>两个方法用于设置数据并渲染视图。接下来在这小节中，我们将对其进行学习。</p>
<p>我们知道每一个<code>view</code>都有一个数据对象，用于保存当前<code>view</code>的数据。其的操作无非就存和取。</p>
<h3 >set</h3>
<p>顾名思义该方法用于设置数据，调用该方法传入的对象就会被<strong>混入</strong>到数据对象中：</p>
<pre><code class='language-javascript' lang='javascript'>/**
* 设置数据
* @param data 数据对象，如{a:20,b:30}
* @param force 是否强制更新
*/
set(data?: { [key: string]: any }, force?: boolean)
</code></pre>
<p>并且<code>set</code>方法还提供了<code>force</code>选项，用于配置是否强制更新</p>
<p>当我们要对数据进行更新覆盖时，只需要传入包含<strong>更新项</strong>的对象即可覆盖</p>
<pre><code class='language-javascript' lang='javascript'>// index.ts
import Magix5 from &#39;magix5&#39;;
Magix5.applyStyle(&#39;@:./index.less&#39;);
import View from &#39;../../../view&#39;;

export default View.extend({
  tmpl: &#39;@:./index.html&#39;,
  assign(extra) {
    this.set(extra);
    this.set({foo:&#39;bar&#39;})
  },
  async render() {
    await this.digest({ a:123, foo:&#39;barbar&#39; }); // 新增并覆盖原来的foo
  },
});
</code></pre>
<h3 >get</h3>
<p><code>get</code>即从数据对象中获取数据，当传入了<code>key</code>时，则返回单个数据，否则返回整个数据对象</p>
<pre><code class='language-javascript' lang='javascript'>/**
* 获取设置的数据，当key未传递时，返回整个数据对象
* @param key 设置时的数据key
*/
get&lt;TReturnType = any&gt;(key?: string): TReturnType
</code></pre>
<h3 >digest</h3>
<p>该方法的功能为<strong>渲染视图</strong>，内部调用了模版编译后得到的函数生成了真实的元素节点。同时也可传入数据，其内部调用了<code>set</code>方法用于设置数据对象。该方法支持<strong>异步</strong>，调用该方法后返回一个<code>promise</code>对象：</p>
<pre><code class='language-javascript' lang='javascript'>/**
* 检测数据变化，更新界面，放入数据后需要显式调用该方法才可以把数据更新到界面
* @param data 数据对象，如{a:20,b:30}
* @param force 是否强制更新
*/
digest(data?: { [key: string]: any }, force?: boolean): Promise&lt;any&gt;
</code></pre>
<h3 >finale</h3>
<p>因为<code>digest</code>是为异步的，当其他方法对于视图的更新顺序有所关系时，就需要<code>finale</code>了。该方法用于保证当前异步更新的视图已经完成，以便于接下来的操作。</p>
<pre><code class='language-javascript' lang='javascript'>export default Magix.View.extend({
    render() {
        this.digest();
    },
    async &#39;someEvent&lt;click&gt;&#39;() {
        await this.finale();
        // your code
    }
})
</code></pre>
<h3 >两种函数定义</h3>
<p>我们知道，在<code>view</code>中<code>js</code>文件中定义的函数主要有两种用途，一种是直接在模版中使用的方法，一种是监听事件时的处理函数。</p>
<p>其中监听事件时的处理函数无需引人数据对象中，只需模版中使用<code>mx-event</code>对其引用自动绑定，而直接在模版中使用的函数则需要手动将其放置到数据对象之中</p>
`;
export default data;
