const data = `
<blockquote><p>编译转换是一个大工程，把夹杂着<code>逻辑控制</code>语法的<code>html</code>片断翻译成需要的虚拟<code>dom</code>，不但要识别出模板中使用了哪些<code>根变量</code>(用于数据生成)，还要识别哪些<code>html</code>片断可共用同一个虚拟<code>dom</code>对象，以及绑定事件优化，<code>html</code>静态、动态节点优化等一系列的问题。</p>
</blockquote>
<p>html转换成最终使用的js对象，经历了以下阶段。</p>
<h4 >文件识别</h4>
<ol>
<li>识别出是单文件(.mx)还是普通的文件(.html)</li>
<li>不同的文件采用不同的方式读取到具体的文件内容</li>

</ol>
<h4 >内容检查</h4>
<p>为了确保生成的代码无问题，会对<code>html</code>内容片断做一次字符检查，确保不包含某些特殊字符，通常<code>html</code>内容片断也不应包含一些不可见的特殊字符，此举是为了防止万一出现好排查问题</p>
<h4 >通知编译开始</h4>
<p>为了方便后期处理一些特殊的情况，在开始编译<code>html</code>内容片断前会调用一次<code>compileTmplStart</code>钩子函数，让外部有机会在编译前处理一次<code>html</code>内容片断</p>
<h4 >命令语法检查</h4>
<p>该过程会检查用户书写的如<code>{{if</code>、<code>{{each</code>等是否正确嵌套、闭合，因为不正确的嵌套和闭合是无法生成正确的<code>js</code>代码的，因此该过程必不可少。在检查的过程中，当不合法时，会提示在哪个文件，哪一行的哪一条语句有什么样的问题。</p>
<h4 >命令预处理</h4>
<p>考虑这样的代码片断</p>
<pre><code>&lt;div&gt;
    {{if expr}}
        &lt;span&gt;&lt;/span&gt;
    {{/if}}
&lt;/div&gt;
</code></pre>
<p>对于<code>html</code>来讲<code>{{if expr}}</code>就是普通的文本节点，如果我们最终生成虚拟dom时，<code>{{if expr}}</code>其实是一个语句块，我们需要对这样的命令做处理，把文本变成节点，这样在虚拟dom结构生成时会方便些。</p>
<p>转换后伪代码</p>
<pre><code>&lt;div&gt;
    &lt;qk:cmd qk:expr=&quot;expr&quot;&gt;
        &lt;span&gt;&lt;/span&gt;
    &lt;/qk:cmd&gt;
&lt;/div&gt;
</code></pre>
<blockquote><p>该过程还会处理其它一些后续需要的信息，比如某些命令的参数，在源文件哪一行等。</p>
</blockquote>
<h4 >翻译命令</h4>
<p>该阶段会对剩余的<code>{{if expr}}</code>翻译成<code>&lt;% if(expr){ %&gt;</code> (这里有一个历史原因：早期使用<code>&lt;% %&gt;</code>格式的模板，所以为了尽可能的复用之前的代码，会翻译成早期的格式)</p>
<p>这时会对<code>{{each list as item}}</code>这种补齐开发者省略的参数。</p>
<h4 >html检查</h4>
<p>经以上处理后，<code>html</code>内容片断需要翻译的命令语句块等都变成了合法的<code>html</code>标签。在<code>html检查</code>这个过程中，会对<code>html</code>的标签嵌套结构做检查，避免错误闭合等问题。</p>
<blockquote><p>该过程同样是确保前面的<code>{{if expr}}</code>翻译成的占位节点结构是正确的，如果某些情况翻译错误，可以在该过程中被检查出来。该过程仅在开发阶段存在。</p>
</blockquote>
<h4 >处理自定义标签</h4>
<p>该过程会处理<code>&lt;mx-frame *params=&quot;&quot;&gt;</code>及<code>&lt;mx-gallery&gt;</code>中定义的组件，翻译成相应的如<code>&lt;div mx-view=&quot;path/to/view&quot; *params=&quot;&quot;&gt;</code>这样的节点。</p>
<p>此举是方便开发者使用更语义化的标签来进行结构组织，背后由该阶段进行翻译成统一格式的节点</p>
<blockquote><p>该过程需要对接外挂的组件体系，需要考虑的情形非常多，技术难度不高，但费心力。</p>
</blockquote>
<h4 >命令预处理</h4>
<p>前一个阶段<code>处理自定义标签</code>有可能再次引入<code>{{if</code>这样的命令语句，需要再处理一次</p>
<h4 >翻译命令</h4>
<p>同样，也需要再翻译一次，不过这2次的处理会检查内容是否变化，只有变化后才进入</p>
<h4 >html检查</h4>
<p>在处理自定义标签时，会引入新的<code>html</code>片断和翻译后的新标签，这里会再检查一次，确保整个过程无任何问题</p>
<h4 >命令编译</h4>
<p>该阶段会对事件中的内容做处理，以及移除一些空命令，减少后续的分析工作量</p>
<h4 >变量处理</h4>
<blockquote><p>该阶段是重中之重
之前曾写过一个详细的过程：<a href='https://github.com/thx/magix-combine/issues/18'>thx/magix-combine#18</a></p>
</blockquote>
<p>该阶段会识别出模板中使用了哪些变量，局部变量如何与全局变量对应。会识别出view刷新需要哪些数据，双向绑定如何追踪到根变量等一系列问题，从2015年至今一直在努力该阶段。</p>
<h4 >通知编译结束</h4>
<p>通过钩子函数<code>compileTmplEnd</code>通知外部编译结束，此时外部可进行简易加工，不能再进行复杂的结构变动。</p>
<h4 >属性处理</h4>
<p>该过程会对参数属性、事件属性做处理，参数合并到相应的属性里，事件属性会添加相应的前缀等一系列最后运行时需要的信息</p>
<h4 >静态化识别</h4>
<p>该过程会对模板中哪些节点是静态的，哪些是局部静态，哪些可以与其它共享同一个虚拟dom对象等节点，并添加上相应的信息，以供下一步的识别处理</p>
<h4 >生成虚拟dom</h4>
<blockquote><p>开发中非常耗时的地方</p>
</blockquote>
<p>该过程会对前面处理后的<code>html</code>片段进行转换成相应的虚拟dom，详情可参考：
[虚拟dom](</p>
`;

export default data;
