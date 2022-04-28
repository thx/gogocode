const data = `
<p>&nbsp;</p>
<blockquote><p>我们在<a href='\#/compiler?page=introduction'>介绍</a>中提到<code>magix</code>的运行时和编译是相互分离的，在应用的运行时是无法使用编译的能力的，所以分清运行时和编译的界限更有助于我们实际的代码编写</p>
</blockquote>
<h2 >运行时与编译的界限</h2>
<p>在之前我们提到过：<code>magix</code>应用在运行启动前都会先进行全面的一次编译，然后再开始正式的应用启动、资源加载等流程，所以在浏览器中实际运行的代码都早已经过编译器的处理。</p>
<p>因此我们在运行时中使用到需要经过编译器处理的功能时就可能会出现不生效的情况，例如，当某个节点的样式<strong>依赖</strong>接口返回的数据，这时候因为样式的生效需要经过编译器的处理，所以通过接口动态接收的样式是无法生效的。</p>
<p>为避免这种情况的发生，因此我们需要分清运行时与编译能力的界限，最重要的原则是：<strong>清楚哪些代码会经过编译器的处理后才会正常生效，然后在运行时中进行规避</strong></p>
<h2 >具体实例场景</h2>
<h3 >动态类名</h3>
<p>当我们某个元素节点的类名是通过接口返回的，并且该类名是和我们样式文件中定义的类名相对应。我们期望元素节点的样式能够根据接口返回的类型进行正常的动态切换。代码如下：</p>
<pre><code class='language-less' lang='less'>// index.less
.color-blue {
  color:blue;
}

.color-red {
  color:red;
}
</code></pre>
<pre><code class='language-javascript' lang='javascript'>// index.js
import Magix from &#39;magix5&#39;;
const { View, applyStyle, Router } = Magix;
applyStyle(&#39;@:./index.less&#39;);

export default View.extend({
    tmpl: &#39;@:./index.html&#39;,
    async render() {
        const color = await this.getColor();
        this.digest({ color });
    },
    getColor() {
        return new Promise((resolve) =&gt; {
          	// ...
          	// 模拟接口返回
            resolve(&#39;color-blue&#39;);
        });
    },
});
</code></pre>
<pre><code class='language-html' lang='html'>&lt;!-- index.html --&gt;
&lt;div class=&quot;{{= color}}&quot;&gt;
  ele
&lt;/div&gt;
</code></pre>
<p>此时的元素节点的渲染结果是<code>&lt;div class=&quot;color-blue&quot;&gt;ele&lt;/div&gt;</code>。看起来好像没问题，但是样式却没有生效。这是因为当使用<code>applyStyle(&#39;@:./index.less&#39;);</code>进行关联的样式文件会经过编译器的处理，所有的类名都会加上前缀来实现样式隔离（此时样式文件中的<code>color-blue</code>已经被编译为和<code>hqrqrA-_magix5-scaffold_views_examples_index_less_-color-blue</code>相类似），所以此时<code>color-blue</code>其实是没有对应的样式声明的。</p>
<p>要想解决这个问题，我们可以将类名进行拆分，将一部分放置在本地，一部分通过接口返回，然后<strong>用<code>--</code>进行拼接</strong></p>
<p>我们可以将模版定义为：</p>
<pre><code class='language-html' lang='html'>&lt;!-- index.html --&gt;
&lt;div class=&quot;color--{{= color}}&quot;&gt; 
  ele
&lt;/div&gt;
</code></pre>
<p>然后接口返回的类名的一部分：</p>
<pre><code class='language-javascript' lang='javascript'>// index.js
import Magix from &#39;magix5&#39;;
const { View, applyStyle, Router } = Magix;
applyStyle(&#39;@:./index.less&#39;);

export default View.extend({
    tmpl: &#39;@:./index.html&#39;,
    async render() {
        const color = await this.getColor();
        this.digest({ color });
    },
    getColor() {
        return new Promise((resolve) =&gt; {
          	// ...
          	// 模拟接口返回
            resolve(&#39;blue&#39;); // 此时变为类名的一部分	
        });
    },
});
</code></pre>
<p>然后在样式文件中修改<code>color</code>，注意：此时的类名包含双横线</p>
<pre><code class='language-less' lang='less'>// index.less
.color--blue {
  color:blue;
}

.color--red {
  color:red;
}
</code></pre>
<p>总结：</p>
<ul>
<li>当需要根据接口返回的类名来决定样式时，因为样式文件会经过编译，所以类名在实际上不对应</li>
<li>使用<strong>类名的分隔</strong>，一部分放置在本地来经过编译，一部分通过接口返回，如：本地使用<code>color--</code>，通过接口返回具体颜色的，如<code>blue</code>，然后在模版进行拼接生成<code>color--blue</code></li>

</ul>
<h3 >动态元素</h3>
<p>同样，当我们的<code>html</code>片段是通过来接口返回的，例如在动态表单等一些场景。我们的期望是即使片段中包含例如<code>mx-</code>/<code>lg-</code>前缀的元素也是可以被正常渲染的。</p>
<pre><code class='language-javascript' lang='javascript'>// index.js
import Magix from &#39;magix5&#39;;
const { View } = Magix;

export default View.extend({
    tmpl: &#39;@:./index.html&#39;,
    async render() {
        const fragment = this.getHTMLFragment();
        this.digest({ fragment });
    },
		getHTMLFragment() {
      return new Promise(resolve =&gt; {
        // 模拟请求接口...
        resolve('&lt;mx-vframe src=&quot;./example&quot;&gt;&lt;/mx-vframe&gt;')
      })
    }
});
</code></pre>
<pre><code class='language-html' lang='html'>&lt;tag x-html=&quot;{{= fragment}}&quot;&gt;&lt;/tag&gt;
</code></pre>
<p>我们知道平常我们在本地的<code>mx-vframe</code>标签是会经过编译，最后变为带有<code>mx5-view</code>、<code>mx5-owner</code>等属性的标签。</p>
<p>比如<code>&lt;mx-vframe src=&quot;./example&quot;&gt;&lt;/mx-vframe&gt;</code>会被编译为<code>&lt;div mx5-owner=&quot;app2&quot; mx5-from=&quot;app2&quot; mx5-view=&quot;magix5-scaffold/views/examples/test&quot;&gt;&lt;/div&gt;</code></p>
<p>但显然在运行时是做不到的，因此我们要想实现动态渲染元素，只能借助<code>magix</code>提供的<code>Api</code></p>
<p>我们可以在<code>html</code>模版中设置一个容器，用来存放动态元素</p>
<pre><code class='language-html' lang='html'>&lt;div id=&quot;ele-container&quot;&gt;&lt;/div&gt;
</code></pre>
<p>然后在接口中获取组件或页面的<code>path</code>，依赖<code>Magix.mount</code>来进行元素的挂载</p>
<pre><code class='language-javascript' lang='javascript'>// index.js
import Magix from &#39;magix5&#39;;
const { View } = Magix;

export default View.extend({
    tmpl: &#39;@:./index.html&#39;,
    async render() {
      	const viewconfig = this.getHTMLFragment();
        await this.digest();
        this.mount(viewconfig);
    },
		getHTMLFragment() {
      	// 模拟接口返回的配置... 
        return {
            viewPath: &#39;magix5-scaffold/views/examples/test&#39;,
            payload: {
                foo: &#39;bar&#39;,
            },
        };
    },
    mount({ path, params }) {
        const node = Magix.node(&#39;ele-container&#39;);
        const vframe = this.owner;
        vframe.mount(node, path, params); // 挂载
    },
});
</code></pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>

`;

export default data;
