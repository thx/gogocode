const data = `
<blockquote><p>为说明<code>view</code>与<code>view</code>之间的通信，我们将在一个<code>view</code>中嵌套另一个<code>view</code>在此处称为父<code>view</code>与子<code>view</code>，但<code>magix</code>的设计理念为每一个<code>view</code>都是相互独立的</p>
</blockquote>
<h2 >父view向子view传递参数</h2>
<p>当在父<code>view</code>中要对子<code>view</code>传递参数时，使用<code>*</code>修饰符：</p>
<pre><code class='language-html' lang='html'>&lt;!-- parent.html --&gt;
&lt;div mx-view=&quot;path&quot; *foo=&quot;bar&quot; *data=&quot;{{= abc}})&quot;&gt;&lt;/div&gt; 
</code></pre>
<pre><code class='language-javascript' lang='javascript'>// parent.ts
import View from &#39;../../../view&#39;;

export default View.extend({
  tmpl: &#39;@:./parent.html&#39;,
  init() {},
  assign(extra) {
    this.set(extra);
  },
  async render() {
    await this.digest({abc:123});
  },
});
</code></pre>
<p>在子<code>view</code>中的<code>assign</code>中就能得到接收到的参数</p>
<pre><code class='language-javascript' lang='javascript'>import View from &#39;../../../view&#39;;

export default View.extend({
  tmpl: &#39;@:./child.html&#39;,
  init() {},
  assign(extra) {
    const { foo, data } = extra
    this.set(extra);
  },
  async render() {
    await this.digest();
  },
});
</code></pre>
<h3 >传递引用对象</h3>
<p>当我们想要在传递参数的时候传入引用数据类型的对象时，同样也需要使用<code>*</code>修饰符，如果数据来源于数据对象时，需要将输出语句改为<code>{{# variable}}</code></p>
<pre><code class='language-html' lang='html'>&lt;!-- parent.html --&gt;
&lt;div mx-view=&quot;path&quot; *list=&quot;{{# list}}&quot;&gt;&lt;/div&gt; 
</code></pre>
<h2 >子view向父view传递参数</h2>
<h3 >dispatch+[mx-event]/attach</h3>
<p>我们可以使用事件监听与触发的形式来进行传递参数</p>
<p>在父<code>view</code>中的模版中我们引入子<code>view</code>，并对其进行事件监听</p>
<pre><code class='language-html' lang='html'>&lt;!-- parent.html --&gt;
&lt;h1&gt;parent&lt;/h1&gt;
&lt;div mx-view=&quot;./child&quot; mx-test=&quot;handleTest()&quot;&gt;&lt;/div&gt;
</code></pre>
<pre><code class='language-javascript' lang='javascript'>// parent.ts
import Magix5 from &#39;magix5&#39;;
import View from &#39;../../../view&#39;;

export default View.extend({
  tmpl: &#39;@:./parent.html&#39;,
  assign(extra) {
    this.set(extra);
  },
  async render() {
    await this.digest();
  },
  &#39;handleTest&lt;test&gt;&#39;(e) {
    console.log(e)
  }
});
</code></pre>
<p>而在子<code>view</code>中我们可以使用<code>dispatch</code>来进行事件的触发，例如我们可以在子<code>view</code>内部监听的<code>click</code>事件中进行事件的触发</p>
<pre><code class='language-javascript' lang='javascript'>// child.ts
import View from &#39;../../../view&#39;;
import Magix from &#39;magix5&#39;;

export default View.extend({
  tmpl: &#39;@:./child.html&#39;,
  assign(extra) {
    this.set(extra);
  },
  async render() {
    await this.digest();
  },
 &#39;handleClick&lt;click&gt;&#39;() {
   const owner = this.owner;
   const node = owner.root;
   Magix.dispatch(node, &#39;test&#39;,{
     foo:&#39;bar&#39;
   }); // 触发test事件
 	},
});
</code></pre>
<pre><code class='language-html' lang='html'>&lt;!-- child.html --&gt;
&lt;mx-btn mx-click=&quot;handleClick()&quot;&gt;&lt;/mx-btn&gt;
</code></pre>
<p>日常使用中我们推荐使用上述的方案，但<code>magix</code>也提供了<code>dispatch</code>配合<code>attach</code>用于在一些<strong>特殊情况</strong>下来进行事件的监听与触发</p>
<p>在父<code>view</code>中使用<code>attach</code>方法对事件进行监听</p>
<pre><code class='language-javascript' lang='javascript'>// parent.ts
import Magix5 from &#39;magix5&#39;;
import View from &#39;../../../view&#39;;

export default View.extend({
  tmpl: &#39;@:./parent.html&#39;,
  init() {
    // 监听test事件
    const handleTest = (e) =&gt; {
      console.log(e); // 在e中就可以获取到数据了
    }
    Magix5.attach(this.root, &#39;test&#39;, handleTest);
    magix5.detach(this.root, &#39;test&#39;, handleTest) // 解绑
  },
  assign(extra) {
    this.set(extra);
  },
  async render() {
    await this.digest();
  },
});
</code></pre>
<p>然后在子<code>view</code>中使用<code>dispatch</code>触发<code>test</code>事件</p>
<pre><code class='language-javascript' lang='javascript'>import View from &#39;../../../view&#39;;
import Magix from &#39;magix5&#39;;

export default View.extend({
  tmpl: &#39;@:./child.html&#39;,
  init() {},
  assign(extra) {
    const vf = this.owner; // 获取当前的vframe
    const parent = vf.parent(); // 获取父vframe
    Magix.dispatch(parent.root, &#39;test&#39;, {
      data: 123,
    });
    this.set(extra);
  },
  async render() {
    await this.digest();
  },
});
</code></pre>
<p>而且因为<code>dispatch</code>和<code>attach</code>都是对节点进行监听的，所以也能够实现<strong>跨层级的通信</strong></p>
<h3 >invoke</h3>
<blockquote><p>该方法在非必要时尽量不使用</p>
</blockquote>
<p>在<code>view</code>间关系中，我们提到了子<code>view</code>可以通过<code>vframe</code>的<code>invoke</code>方法来调用父<code>view</code>的方法，这意味着，我们可以在调用方法的<strong>同时向父<code>view</code>传递参数</strong></p>
<p>首先在父<code>view</code>中定义方法：</p>
<pre><code class='language-javascript' lang='javascript'>// parent.ts
import Magix5 from &#39;magix5&#39;;
import View from &#39;../../../view&#39;;

export default View.extend({
  tmpl: &#39;@:./parent.html&#39;,
  assign(extra) {
    this.set(extra);
  },
  async render() {
    await this.digest();
  },
  addData(...data) {
    console.log(data); // 打印传入的数据
  },
});
</code></pre>
<p>然后直接在子<code>view</code>中获取自身的<code>vframe</code>，然后再获取父<code>vframe</code>，再调用方法：</p>
<pre><code class='language-javascript' lang='javascript'>import View from &#39;../../../view&#39;;

export default View.extend({
  tmpl: &#39;@:./child.html&#39;,
  init() {},
  assign(extra) {
    const vf = this.owner; // 获取当前的vframe
    const parent = vf.parent(); // 父vframe
    parent.invoke(&#39;addData&#39;, [&#39;foo&#39;, &#39;bar&#39;, { foo: &#39;bar&#39; }]);
    this.set(extra);
  },
  async render() {
    await this.digest();
  },
});
</code></pre>
<p>打印结果：<code>[&quot;foo&quot;, &quot;bar&quot;, {&quot;foo&quot;: &quot;bar&quot;}]</code></p>
<p>&nbsp;</p>
<p>&nbsp;</p>

`;
export default data;
