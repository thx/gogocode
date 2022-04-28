const data = `
<h2 >全局样式</h2>
<p><code>magix</code>中设置样式，都是使用<code>Magix.applyStyle</code>这个方法</p>
<pre><code class='language-javascript' lang='javascript'>import Magix from &#39;magix&#39;

Magix.applyStyle(&#39;@:./index.less&#39;) // 设置当前view的样式文件

export default Magix.View.extend({
  tmpl:&#39;@:./index.html&#39;,
  assign(extra) { this.set(extra) },
  async render() { await this.digest() }
})
</code></pre>
<p>设置全局样式也是使用<code>applyStyle</code>，但是传入的参数不同：<code>Magix.applyStyle(key: string, cssText: string)</code></p>
<p>其中<code>key</code>是样式对应的唯一标识，该<code>key</code>主要是防止向页面反复添加同样的样式</p>
<pre><code class='language-javascript' lang='javascript'>import Magix from &#39;magix&#39;

Magix.applyStyle(
  &#39;@:{mx-style.group}&#39;, // key
  &#39;style@:./magix5-scaffold/gallery/mx-style/group.less&#39; // cssText
);
</code></pre>
<p>通过这样设置的全局样式，编译器不会对它进行编译，而是直接放置到<code>head</code>中。而传入<code>@:</code>开头的路径，则会经过编译处理，比如加前缀</p>
<h2 >样式引用</h2>
<ul>
<li> <code>js</code>中引用样式<code>@:./path.css:name</code></li>
<li> <code>js</code>中引用<code>css3</code>中的变量<code>@:./path.css:--name</code>;</li>
<li> <code>js</code>或样式中引用<code>@</code>规则 <code>@:./path.css:@font-face(name) @:./path.css:@keyframes(name)</code></li>
<li><code>css</code>中引用样式:<code>[&quot;ref@:./path.css:name&quot;]{}</code></li>
<li> <code>css</code>中引用其它<code>css</code>文件中的变量<code>color:var(&quot;ref@:./path.css:--name&quot;)</code>;</li>
<li> <code>css</code>中引用其它<code>css</code>文件中的<code>@</code>规则<code>font-family:(&quot;ref@:./path.css:@font-face(name)&quot;)</code>,<code>animation-name:(&quot;ref@:./path.css:@keyframes(name)&quot;)</code>;</li>
<li> <code>html</code>中引用样式:<code>@:(name)</code>。只能引用当前文件有关联的样式，不能引用其它样式</li>
<li><code>html</code>中引用变量:<code>@:(--name)</code>。只能引用当前文件有关联的样式，不能引用其它样式</li>
<li> <code>html</code>中引用@规则:<code>@:@keyframes(scale)</code>，<code>@:@font-face(scale)</code>。只能引用当前文件有关联的样式，不能引用其它样式</li>
<li> 变量名称用<code>--</code>两个字符开头识别，普通选择器不要使用<code>--</code>开头</li>
<li> 全局样式<code>:gloal(.selector)</code>，全局编译变量<code>var(--scoped-var-name)</code>,全局不编译变量<code>var(--mx-var-name)</code></li>
<li> 引用其它可能变化的字符串<code>counter(&quot;ref@:./path.css#counter-name&quot;)</code></li>
<li> 一半编译<code>.user--name</code> <code>@keyframe anim--1</code></li>

</ul>
<h2 >使用脚手架时的样式</h2>
<p>当在使用脚手架创建项目时，项目中依赖了<code>gallery</code>组件库，而<code>gallery</code>之中提供了对全局样式的定义。</p>
<p>当完全不同的项目都使用脚手架进行开发时，项目与项目之间的全局样式是通过<strong>组件库</strong>来控制的，并且组件库是独立的。这样做的好处是，当全局的样式需要更新时，只需对组件库进行修改，所有的项目都会随之更新。并且不同项目所依赖的组件库是一致的也就是说，当涉及到需要微前端的场景下，子项目只需要使用宿主项目的组件库就可以了，这极大的节省了资源</p>
<p>而在日常开发中，因为全局的样式是由组件库提供的，因此我们不会去对它进行修改（要改只能从组件库仓库根源修改，所有项目都生效）。那当我们需要对项目进行一些全局样式上的修改时，该怎么做呢？这时候我们就可以在<code>assets</code>目录下进行定义样式文件，再经过配置（详见<a href='https://thx.github.io/magix-cli-book/#/'>Magix-cli-book</a>）后，即可覆盖</p>

`;

export default data;
