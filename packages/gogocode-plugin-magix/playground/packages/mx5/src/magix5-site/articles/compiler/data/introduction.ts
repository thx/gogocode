const data = `
<h2 >Magix与编译器</h2>
<p>我们在<code>magix</code>中书写代码时，可以在<code>html</code>文件中使用模版语法来编写<code>html</code>，也可以在<code>js</code>文件中进行样式的引用、事件处理方法的定义以及其他操作。在日常使用中我们会认为这都是<code>magix</code>直接提供的能力，但其实，<strong>所有与编译相关的能力都是由<code>magix</code>的编译器<code>magix-composer</code>提供的</strong>。</p>
<p>也就是说：<code>magix</code>的运行时与编译是相互分离的，<code>magix</code>不会在运行时阶段进行编译相关的工作，这也是为什么我们不能在运行时阶段进行事件处理方法的定义（例如在运行时阶段对<code>view</code>使用<code>merge</code>来混入事件绑定方法时，不能在模版和事件中进行直接的关联）</p>
<p>以下是编译器对<code>magix</code>的支持：</p>
<ul>
<li><p>模版语法：我们在<code>tmpl</code>引用的<code>html</code>文件，都会被编译为虚拟<code>dom</code>，作为<code>tmpl</code>函数的函数体</p>
</li>
<li><p>事件处理方法：在<code>js</code>文件中定义的例如<code>test&lt;click&gt;</code>的事件处理方法，在经过编译后能够与模版中元素监听的方法直接绑定对应：<code>&lt;div mx-click=&quot;test()&quot;&gt;&lt;/div&gt;</code></p>
</li>
<li><p>代码混淆：我们在保护源码时经常需要进行代码混淆，而经过编译器的处理后，我们的代码就会被自动混淆，例如：</p>
<pre><code class='language-javascript' lang='javascript'>const bizCode = 123

// 编译后
const _a = 123
</code></pre>
</li>

</ul>
<ul>
<li>样式编译：我们在使用<code>Magix.applyStyle(&#39;@:./index.less&#39;);</code>引用样式文件时，也会对样式文件进行编译优化处理</li>
<li>文件总和打包：我们在日常会将一个<code>view</code>分为<code>html</code>、<code>css</code>、<code>js</code>三个文件，而经过编译后则会被合并为一个<code>js</code>文件，并使用<code>sea.js</code>进行模块的定义</li>

</ul>
<h2 >使用编译器的好处</h2>
<h3 >提升运行时性能</h3>
<p>编译相关的任务其实是十分耗费性能的，因为需要进行代码遍历、处理转化、重新生成目标代码等相当复杂的操作。试想如果编译相关的工作（例如模版编译）在运行时进行的话，那么当页面初始化时就会耗费相当多的时间用于编译上，尽管可以使用懒加载懒编译等方案优化，但当页面过于庞大时，终究还是会影响性能。</p>
<p>因此使用编译器能够很好的提升运行时的性能，且当代码出错时也能够直接在编译阶段就得到反馈</p>
<h3 >为开发提效</h3>
<p>在编译器的帮助下，我们能够用模版语法来书写<code>html</code>，也能在<code>js</code>文件中进行事件处理函数的自动绑定，进行代码混淆等等。这无疑是提升了开发效率。以一个例子来进行说明：</p>
<p>当我们在进行组件的传值时是这样写的：</p>
<pre><code class='language-html' lang='html'>&lt;mx-vframe src=&quot;@:./btn&quot; *content=&quot;Navigate&quot; *color=&quot;red&quot; /&gt;
</code></pre>
<p>经过编译后它是这样的：</p>
<pre><code class='language-html' lang='html'>&lt;div mx-view=&quot;./btn?content=Navigate&amp;color=red&quot;&gt;&lt;/div&gt;
</code></pre>
<p>因为<code>magix</code>在创建<code>view</code>时，参数的接收是从路由中获取到的，因此我们用<code>*key=&quot;$value&quot;</code>的形式传递的参数都会被编译为完整的路由上的<code>query</code>。如果没有了编译器，我们就需要手动进行参数的拼接，当参数特别多时十分影响体验</p>
<h3 >面向未来</h3>
<p>编译器的单独抽离，也是为了面向未来不断变化的需求。</p>
<p>在如今各类小程序遍布的情况下，社区中为了实现能够<strong>一套代码适配多个平台</strong>的需求，常见的方案就是在基础的<code>DSL</code>上进行编译层面的适配，例如：<code>taro2.x</code>、<code>uniapp</code>等。所以编译器的单独抽离也是为了在面对跨端需求时能够有较大的拓展空间</p>
`;

export default data;
