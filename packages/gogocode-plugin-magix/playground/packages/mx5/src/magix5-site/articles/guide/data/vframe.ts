const data = `
<h2 >vframe实例</h2>
<p>我们在<code>view</code>间关系中提到了，每一个<code>view</code>都有一个控制它的<code>vframe</code>，主要负责<code>view</code>之间关系处理。但其实<code>vframe</code>不只有我们在之前介绍的那些功能，接下来进行对其他功能的介绍</p>
<h3 >动态渲染</h3>
<p>在路由中，我们介绍了如何根据<code>location</code>的变化来动态的渲染不同的<code>view</code>。其实在<code>vframe</code>上也提供了两个方法用于动态渲染的操作</p>
<ul>
<li><code>mount(node: HTMLElementOrEventTarget, viewPath: string, viewInitParams?: object)</code>：在某个节点渲染<code>vframe</code></li>
<li><code>unmount(node?: HTMLElementOrEventTarget | string, isVframeId?: boolean)</code>：根据节点卸载对应的<code>vframe</code></li>

</ul>
<h3 >阻止卸载</h3>
<p><code>vframe</code>实例中还提供了<code>unloadTest</code>方法，允许<code>view</code>阻止卸载，用于实现高级场景的功能，如页面切换时，内容未保存提示</p>
<h3 >Vframe模块</h3>
<p>在<code>Magix.Vframe</code>模块中，提供了许多方法用于对<code>vframe</code>实例进行操作：</p>
<ul>
<li><code>root()</code>：在<code>vframe</code>实例中也存在一个<code>root</code>对象，指向当前的<code>dom</code>节点（等同于当前的<code>view.root</code>。模块中的<code>root</code>指向的是<strong>全局的根<code>vframe</code>实例</strong></li>
<li><code>all()</code>：用于获取全局中所有的<code>vframe</code>，调用方法后返回一个对象包含所有的<code>vframe</code><strong>实例</strong></li>
<li><code>byId(id)</code>：根据传入的<code>id</code>获取<code>vframe</code>实例</li>
<li><code>byNode(node)</code>：根据<code>dom</code>节点获取<code>vframe</code>实例</li>

</ul>
<p>&nbsp;</p>
`;
export default data;
