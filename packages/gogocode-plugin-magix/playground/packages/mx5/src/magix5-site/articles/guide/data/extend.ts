const data = `
<h2 >拓展View原型</h2>
<p><code>Magix</code>中是<code>View</code>有着继承关系，正常情况下我们对<code>Magix.View</code>进行继承来创建实例。既然存在继承关系，也就意味着我们可以对<code>View</code>类进行拓展，来增强<code>View</code>的功能</p>
<p><code>Magix.View</code>中提供了<code>merge</code>方法就是用于拓展<code>View</code>的原型对象，拓展后的每个继承于它的对象都会拥有拓展的方法</p>
<pre><code class='language-javascript' lang='javascript'>// view.ts
import Magix from &#39;magix&#39;

const extendObj1 = {
  foo() {
    console.log(&#39;foo&#39;)
  }
}

const extendObj2 = {
  bar() {
    console.log(&#39;bar&#39;)
  }
}

export default Magix.View.extend({}).merge(extendObj1,extendObj2) // 使用merge拓展原型
</code></pre>
<p>然后此时就可以通过继承该<code>View</code>来使用拓展的方法</p>
<pre><code class='language-javascript' lang='javascript'>// instance.ts
import View from &#39;./view.ts&#39;

export default View.extend({
  tmpl:&#39;@:./instance.html&#39;,
  assign(extra){
    this.set(extra)
    this.foo() // 拓展的方法存在原型对象中，使用this即可访问到
    this.bar() 
  },
  render() { this.digest() }
})
</code></pre>
<h3 >插件</h3>
<p><code>merge</code>中传入的对象就被称为插件，我们可以使用插件来实现许多功能，如双向绑定、<code>ref</code>甚至<code>Service</code>也是依靠它实现的</p>
<p>我们之前在<code>view</code>的生命周期（TODO）中提到了<code>ctor</code>阶段，即使子类对其进行了重写也无法阻止父类的<code>ctor</code>的调用，同样的我们也可以借助该生命周期钩子进行拓展</p>
<p>现在我们实现一个<code>refs</code>，用来获取<code>dom</code>节点。只要节点上包含<code>mx-ref=&quot;&quot;</code>的属性即可将添加到当前<code>view</code>的<code>$refs</code>中</p>
<pre><code class='language-javascript' lang='javascript'>// refs.ts

export default {
    ctor() {
        this.on(&#39;dompatch&#39;, () =&gt; {
            this.$refs = {};
        });
        this.on(&#39;domready&#39;, () =&gt; {
            let refs = this.root.querySelectorAll(&#39;[mx5-host=&quot;\${this.id}&quot;][mx5-ref]&#39;);
            for (let i = refs.length; i--;) {
                let ref = refs[i];
                this.$refs[ref.getAttribute(&#39;mx5-ref&#39;)] = ref;
            }
        });
        this.on(&#39;destroy&#39;, () =&gt; {
            delete this.$refs;
        });
    }
};
</code></pre>
<pre><code class='language-javascript' lang='javascript'>// view.ts
import refs from &#39;./refs.ts&#39;

export default Magix.View.extend({}).merge(refs) // 使用merge拓展原型
</code></pre>
<p>现在我们在实例中使用</p>
<pre><code class='language-html' lang='html'>&lt;button mx-click=&quot;log()&quot; mx-ref=&quot;{{= $viewId}}_btn&quot;&gt;查看数据&lt;/button&gt;
</code></pre>
<pre><code class='language-javascript' lang='javascript'>// instance.ts
import View from &#39;./view.ts&#39;

export default View.extend({
  tmpl:&#39;@:./instance.html&#39;,
  assign(extra){
    this.set(extra)
  },
  async render() { 
    await this.digest() 
  },
  &#39;log&lt;click&gt;&#39;() {
    console.log(this.$refs);
  }
})
</code></pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>

`;

export default data;
