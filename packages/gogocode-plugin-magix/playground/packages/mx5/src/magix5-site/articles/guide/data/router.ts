const data = `
<h2 >路由模块</h2>
<p><code>magix</code>中提供了<code>Router</code>模块，来进行路由相关的操作</p>
<pre><code class='language-javascript' lang='javascript'>import Magix from &#39;magix5&#39;
const Router = Magix.Router
</code></pre>
<h3 >解析url地址</h3>
<p><code>Router</code>中提供了<code>parse()</code> 的方法来解析<code>href</code>的<code>query</code>和<code>hash</code>，默认<code>href</code>为<code>location.href</code></p>
<p>假设当前的<code>href</code>为：<code>https://localhost/index.html?a=1&amp;b=2#/docs?page=introduction</code>。</p>
<p>我们需要知道的是除了协议、域名之外，<code>hash</code>的部分与前面的<code>query</code>十分类似：</p>
<ul>
<li><code>query</code>：<code>/index.html?a=1&amp;b=2</code></li>
<li><code>hash</code>：<code>/docs?page=introduction</code></li>

</ul>
<p>并且，我们对<code>query</code>和<code>hash</code>中问号的前后内容分别称为<code>path</code>和<code>params</code></p>
<p>在调用<code>Router.parse()</code>之后，得到的对象为：</p>
<pre><code class='language-javascript' lang='javascript'>{
    &quot;href&quot;: &quot;https://localhost/index.html?a=1&amp;b=2#/docs?page=introduction&quot;,
    &quot;srcQuery&quot;: &quot;/index.html?a=1&amp;b=2&quot;,
    &quot;srcHash&quot;: &quot;/docs?page=introduction&quot;,
    &quot;query&quot;: {
        &quot;path&quot;: &quot;/index.html&quot;,
        &quot;params&quot;: {
            &quot;a&quot;: &quot;1&quot;,
            &quot;b&quot;: &quot;2&quot;
        }
    },
    &quot;hash&quot;: {
        &quot;path&quot;: &quot;/docs&quot;,
        &quot;params&quot;: {
            &quot;page&quot;: &quot;introduction&quot;
        }
    },
    &quot;params&quot;: {
        &quot;a&quot;: &quot;1&quot;,
        &quot;b&quot;: &quot;2&quot;,
        &quot;page&quot;: &quot;introduction&quot;
    },
    &quot;path&quot;: &quot;/docs&quot;,
    &quot;view&quot;: &quot;magix5-scaffold/views/default&quot;
}
</code></pre>
<p>从获取到的对象我们可以知道，<code>query</code>和<code>hash</code>中的<code>params</code>都会被包含在<code>params</code>对象中，需要注意的是，当<code>query</code>和<code>hash</code>都有一个<strong>相同<code>key</code>的参数</strong>时，最终的结果<strong>以<code>hash</code>中的值为准</strong>。同样<code>path</code>也是以<code>hash</code>中的值为准</p>
<p>为什么会是<code>hash</code>中的同名<code>params</code>覆盖掉<code>query</code>中的<code>params</code>?</p>
<p>主要是路由模块支持<code>history.pushState</code>的方式，从而去掉丑陋的<code>#!</code>，所以如果在浏览器支持的情况下，会<strong>优先使用</strong><code>pushState</code>，当浏览器不支持时，会<code>fallback</code>到<code>hash</code>的形式，因此当从支持<code>pushState</code>的浏览器上<code>copy</code>链接到不支持<code>pushState</code>上的浏览器时，后续的改变是改变的<code>hash</code>，因此对于参数的值，要以<code>hash</code>中的为准。同时从不支持<code>pushState</code>的浏览器上<code>copy</code>链接到支持<code>pushState</code>的浏览器上，对于首次渲染，也要以<code>hash</code>中的值为准。</p>
<p><code>magix</code>项目默<strong>认并不会使用<code>pushState</code></strong>，而是<code>hash</code>，如果想用<code>pushState</code>需要服务器进行支持，同时再定制下<code>magix</code>即可。</p>
<h3 >导航新地址</h3>
<p><code>Router</code>中提供了一个<code>to</code>方法进行导航到新地址：<code>Router.to(path: string, params?: object, replace?: boolean, silent?: boolean)</code></p>
<ul>
<li><code>path</code>：路径字符串</li>
<li><code>params</code>：参数对象</li>
<li><code>replace</code>：是否替换当前的历史记录</li>
<li><code>silent</code>：是否是静默更新，不触发<code>change</code>事件</li>

</ul>
<h3 >地址比较</h3>
<p><code>Router</code>提供<code>diff()</code>方法来对当前地址栏中的地址与上一个地址栏中的地址进行比较，并返回一个<code>proxy</code>对象来展示差异</p>
<pre><code class='language-javascript' lang='javascript'>{
  	&quot;path&quot;: {
            &quot;from&quot;: &quot;xxx&quot;,
            &quot;to&quot;: &quot;xxx&quot;
    }
    &quot;params&quot;: {
        &quot;xxx&quot;: {
            &quot;from&quot;: &quot;xxx&quot;,
            &quot;to&quot;: &quot;xxx&quot;
        }
    },
    &quot;force&quot;: false,
    &quot;type&quot;: &quot;changed&quot;
}
</code></pre>
<h2 >配置路由</h2>
<p>在<code>magix</code>中是通过配置路由的方式来将<strong>路径与<code>view</code>来进行绑定</strong>。</p>
<p>配置路由的方式有两种，分别为<code>Magix.config</code>或调用<code>Magix.boot</code>方法进行间接配置，而并非使用<code>Router</code>模块进行配置</p>
<pre><code class='language-javascript' lang='javascript'>import Magix from &#39;magix5&#39;

Magix.boot({
  defaultPath: &#39;/home&#39;, // 默认路径
  defaultView: &#39;/default&#39;, // 默认加载的view
  unmatchView: projectName + &#39;/views/pages/err&#39;, // 在routes里找不到匹配时使用的view，比如显示404
  routes: { // path与view关系映射对象或方法
    &#39;/home&#39;: projectName + &#39;/views/default&#39;,
    &#39;/foo&#39;: projectName + &#39;/views/default&#39;,
    &#39;test&#39;:projectName + &#39;views/test&#39;
  },
});
</code></pre>
<p>通过Magix.config或Magix.boot进行全局配置项目信息，便于对项目统筹把握，因此所有的配置集中管理，然后再交给各个模块消费。所以路由配置并不在路由模块中。</p>
<h2 >路由监听</h2>
<p><code>Magix</code>中提供了对路由进行监听的方法：<code>this.observeLocation()</code></p>
<p>该方法不是由路由模块提供，而是在每一个<code>view</code>中都有该方法，当监听到路由发生了变化时，就会<strong>主动调用</strong>当前<code>view</code>的<code>render</code>方法</p>
<p>该函数应该在<code>view</code>的<code>init</code>方法中使用，接收的参数分为两种：</p>
<ul>
<li><code>observeLocation(parameters: string | string[], observePath?: boolean)</code>：接收两个参数，分别为监听的参数和是否监听路径</li>
<li><code>observeLocation(observeObject: ViewObserveLocation)</code>：接收一个参数对象，对象中包含两个属性，分别为<code>path</code>和<code>params</code>，表示是否监听路径以及监听的参数</li>

</ul>
<pre><code class='language-javascript' lang='javascript'>import Magix5 from &#39;magix5&#39;;

Magix5.applyStyle(&#39;@:./index.less&#39;);
const Router = Magix5.Router;
import View from &#39;../../../view&#39;;

export default View.extend({
  tmpl: &#39;@:./index.html&#39;,
  init() {
    this.observeLocation({ path: false, params: &#39;page&#39; });
		// 等同于this.observeLocation(&#39;page&#39;,false)
  },
  async render() {
    await this.digest();
  },
});
</code></pre>
<p>需要注意的是，路由的变化将会派发一个<code>change</code>事件从上自下的进行传播，所以，当不同的<code>view</code>对路径或某个相同的参数进行监听时，当路由发生变化时，监听路由了的所有<code>view</code>都会导致<code>render</code>函数的调用。也就是说，当有些<code>view</code>存在层级关系，并都监听了路由后，就会导致<code>render</code>的<strong>重复触发</strong></p>
<h2 >动态渲染View</h2>
<p>在<a href='\#/docs?page=view-base'>view基础</a>中我们提到了使用<code>&lt;div mx-view=&quot;&quot;&gt;&lt;/div&gt;</code>来进行<code>view</code>之间的联系。现在我们有个需求，就是根据路由的变化来动态渲染<code>view</code>，该如何做呢？</p>
<ul>
<li>首先我们想要根据路由的变化来渲染不同的<code>view</code>，那首先必须对路由进行监听，也就是上面提到的<code>observeLocation</code>方法</li>
<li>其次我们需要得知当前路由的相关信息，才能根据信息来获取所要的<code>view</code>，因此需要调用<code>Router.parse()</code>来获取信息</li>
<li>在有了信息之后，我们就可以根据信息来获取对应的<code>view</code>，使用<code>&lt;div mx-view=&quot;path&quot;&gt;&lt;/div&gt;</code>来进行挂载</li>

</ul>
<pre><code class='language-javascript' lang='javascript'>import Magix5 from &#39;magix5&#39;;

Magix5.applyStyle(&#39;@:./index.less&#39;);
const Router = Magix5.Router;
import View from &#39;../../../view&#39;;

export default ProjectView.extend({
  tmpl: &#39;@:./index.html&#39;,
  init: function () {
    this.observeLocation({ path: true }); // 监听路由
  },
  async render() {
    const { path } = Router.parse(); // 获取当前信息，可以是路径/参数
    await this.digest({
      path,
    });
  },
});
</code></pre>
<pre><code class='language-html' lang='html'>&lt;div mx-view=&quot;magix5-scaffold/views/pages{{=path}}/index&quot;&gt;&lt;/div&gt;
</code></pre>
<p>&nbsp;</p>
<p>&nbsp;</p>

`;

export default data;
