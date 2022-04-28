const data = `
<h2 >事件绑定</h2>
<h3 >普通事件</h3>
<h4 >事件绑定</h4>
<p><code>magix</code>中要进行事件绑定，我们只需要在模版中的<code>html</code>节点写上<code>mx-</code>开头的事件以及对应的处理函数</p>
<pre><code class='language-html' lang='html'>&lt;!-- index.html --&gt;
&lt;button mx-click=&quot;handle()&quot;&gt;btn&lt;/button&gt;
</code></pre>
<p>然后在<code>js</code>文件中定义处理函数，当定义函数时需要在<strong>函数名称后加上<code>&lt;事件类型&gt;</code></strong>。这样做的原因是：这有利于后期的代码<code>review</code>，阅读<code>html</code>时，我们可以很方便的知道某个节点上绑定了什么事件，及它的处理函数，阅读<code>js</code>代码时，我们也可以很快的知道某个函数是服务什么事件的。</p>
<pre><code class='language-javascript' lang='javascript'>// index.ts
import Magix5 from &#39;magix5&#39;;
Magix5.applyStyle(&#39;@:./index.less&#39;);
import View from &#39;../../../view&#39;;

export default View.extend({
  tmpl: &#39;@:./index.html&#39;,
  assign(extra) {
    this.set(extra);
  },
  async render() {
    await this.digest();
  },
  &#39;handle&lt;click&gt;&#39;() {}
});
</code></pre>
<h5 >同一处理函数服务不同事件</h5>
<p>并且同一个函数也可以服务于不同的事件，只需在<code>&lt;&gt;</code>中将事件用<strong>逗号隔开即可</strong></p>
<pre><code class='language-html' lang='html'>&lt;!-- index.html --&gt;
&lt;button mx-click=&quot;handle()&quot; mx-keyup=&quot;handle()&quot;&gt;btn&lt;/button&gt;
</code></pre>
<pre><code class='language-javascript' lang='javascript'>// index.ts
import Magix5 from &#39;magix5&#39;;
Magix5.applyStyle(&#39;@:./index.less&#39;);
import View from &#39;../../../view&#39;;

export default View.extend({
  tmpl: &#39;@:./index.html&#39;,
  assign(extra) {
    this.set(extra);
  },
  async render() {
    await this.digest();
  },
  &#39;handle&lt;click,keyup&gt;&#39;() {}, // 用逗号隔开
});
</code></pre>
<h4 >参数传递</h4>
<p>当我们想在模版中对方法传入参数的时候，我们只需将所有参数放置在一个<strong>对象</strong>中，然后传入这个对象：</p>
<p>需要注意的是：传参时只支持<strong>对象传参</strong>，<code>mx-click=&quot;handle(1,2,3)”</code>这种形式是不支持的</p>
<pre><code class='language-html' lang='html'>&lt;!-- index.html --&gt;
&lt;button mx-click=&quot;handle({foo:&#39;bar&#39;, a:&#39;b&#39;})&quot;&gt;btn&lt;/button&gt;
</code></pre>
<p>传入的参数对象可以在<code>event</code>的<code>parmas</code>中获得：</p>
<pre><code class='language-javascript' lang='javascript'>// index.ts
import Magix5 from &#39;magix5&#39;;
Magix5.applyStyle(&#39;@:./index.less&#39;);
import View from &#39;../../../view&#39;;

export default View.extend({
  tmpl: &#39;@:./index.html&#39;,
  assign(extra) {
    this.set(extra);
  },
  async render() {
    await this.digest();
  },
  &#39;handle&lt;click&gt;&#39;(e) {
    const params = e.params
    const {foo, bar} = params // bar, b
  }
});
</code></pre>
<h4 >支持所有事件类型</h4>
<p><code>magix5</code>在实现时，因为是全局统一绑定的事件，所以把所有事件都绑定在了<strong>捕获阶段</strong>。但之前所有版本都使用<strong>冒泡阶段</strong>，因此为了减少修改为捕获阶段带来的风险，目前仍采用冒泡方案，而对于需要捕获处理的，可参考以下代码：</p>
<pre><code class='language-javascript' lang='javascript'>&#39;div&lt;scroll&gt;&amp;{capture:true}&#39;(){

}
</code></pre>
<p>增加事件指示器：<code>&amp;{capture:true}</code>，目前支持<code>capture</code>为<code>true</code>，把该事件升级为捕获阶段，及<code>&amp;{passive:flase}</code>，允许在事件内部使用<code>preventDefault</code>。注意：浏览器并不是把所有事件的<code>passive</code>都默认为<code>true</code>，只有影响性能的如<code>mousewheel</code>等默认为<code>true</code>，如果遇到调用<code>preventDefault</code>调试工具有提示时，才需要写上<code>&amp;{passive:flase}</code></p>
<p>可合写为<code>&amp;{capture:true,passive:false}</code></p>
<h3 >document/window/root事件绑定</h3>
<p>当我们想对<code>document</code>、<code>window</code>以及<code>root</code>（当前<code>view</code>的<code>dom</code>节点）进行事件的监听时，因为没有地方去书写<code>mx-</code>事件，因此<code>magix</code>中提供了三个选择器用于对这三个特殊的对象上的事件进行监听：</p>
<pre><code class='language-javascript' lang='javascript'>// index.ts
import Magix5 from &#39;magix5&#39;;
Magix5.applyStyle(&#39;@:./index.less&#39;);
import View from &#39;../../../view&#39;;

export default View.extend({
  tmpl: &#39;@:./index.html&#39;,
  assign(extra) {
    this.set(extra);
  },
  async render() {
    await this.digest();
  },
  &#39;$doc&lt;click&gt;&#39;(e) { // document对象
    console.log(e);
  },
  &#39;$win&lt;resize&gt;&#39;(e) { // window对象
    console.log(e);
  },
  &#39;$root&lt;click&gt;&#39;(e) { // root对象
     console.log(e);
  }
});
</code></pre>
<h3 >选择器事件绑定</h3>
<p>除了<code>document</code>和<code>window</code>这种特殊的对象没有地方来书写<code>mx-event</code>之外。有时候当<code>html</code>中的节点存在动态性或其他情况导致不方便在标签上添加<code>mx-event</code>时，这时候就可以使用选择器事件绑定。</p>
<p>在语法上与普通的事件绑定无异，只需在<code>$</code>后跟上<code>css</code>选择器即可。并且在当前<code>view</code>下进行选择器绑定，就只会在当前<code>view</code>下生效，即使当前<code>view</code>中嵌套了包含符合该结构节点的子<code>view</code></p>
<pre><code class='language-javascript' lang='javascript'>// index.ts
import Magix5 from &#39;magix5&#39;;
Magix5.applyStyle(&#39;@:./index.less&#39;);
import View from &#39;../../../view&#39;;

export default View.extend({
  tmpl: &#39;@:./index.html&#39;,
  assign(extra) {
    this.set(extra);
  },
  async render() {
    await this.digest();
  },
  &#39;$.test-btn&lt;click&gt;&#39;(e) { // 绑定当前view下class为test-btn的html节点
    console.log(e);
  },
});
</code></pre>
<h4 >双向绑定实现</h4>
<p>在模版语法中我们提到了<code>{{: variable}}</code>，这是<code>magix</code>中用于实现双向绑定的语法，但是需要插件的配合才能实现最终效果。</p>
<p>当节点上使用了<code>{{: variable}}</code>表达式时，编译器会自动在其节点上添加<code>mx5-ctrl</code>和<code>mx5-host</code>两个属性</p>
<p>那么要怎么选中那些含有这两个属性的元素节点呢？答案就是使用选择器事件绑定：<code>$[mx5-ctrl]&lt;change,input,focusout&gt;</code>。在进行监听之后，当表单节点中发生<code>change</code>、<code>input</code>之类的事件之后就可以<strong>手动去触发选择器事件</strong>（因为当封装表单组件之后，选择器事件绑定的是当前<code>view</code>的<code>root</code>：<code>html</code>父节点）</p>
<p>在开发时，若当前<code>view</code>主要是为了加强功能时，并不依靠<code>html</code>模版时，就可使用此思路</p>

`;
export default data;
