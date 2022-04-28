const data = `
<h2 >插槽</h2>
<p>当我们对<code>view</code>中的模版具有灵活性和拓展性的要求时，这时候插槽的作用就十分显著了。同时，使用插槽可以在一些场景下提高<code>html</code>结构的复用。</p>
<pre><code class='language-html' lang='html'>&lt;mx-slot name=&quot;user&quot;&gt;
    &lt;div&gt;user&lt;/div&gt;
&lt;/mx-slot&gt;

{{if vipUser}}
    &lt;div class=&quot;vip&quot;&gt;
        &lt;mx-slot use=&quot;user&quot;/&gt;
    &lt;/div&gt;
{{else}}
       &lt;mx-slot use=&quot;user&quot;/&gt;
{{/if}}
</code></pre>
<p>插槽的使用必须遵从<strong>先定义后使用</strong>的规范，同时不能声明嵌套的规则，如：</p>
<pre><code class='language-html' lang='html'>&lt;mx-slot name=&quot;outer&quot;&gt;
    &lt;mx-slot name=&quot;inner&quot;&gt;
        content
    &lt;/mx-slot&gt;
&lt;/mx-slot&gt;
</code></pre>
<h3 >内嵌vframe</h3>
<p>当我们将插槽节点内嵌在<code>vframe</code>中时，插槽的内容会作为<strong>普通的参数</strong>传入到子<code>view</code>之中。在设计组件时，可以根据此功能来提高组件的拓展性。</p>
<pre><code class='language-html' lang='html'>&lt;!-- parent.html --&gt;

&lt;div mx-view=&quot;./child&quot; *data=&quot;123&quot;&gt;
  
  &lt;mx-slot name=&quot;header&quot;&gt;
    &lt;div class=&quot;header&quot;&gt;
      &lt;h1&gt;header&lt;/h1&gt;
    &lt;/div&gt;
  &lt;/mx-slot&gt;&gt;
  
  &lt;mx-slot name=&quot;content&quot;&gt;
    &lt;div class=&quot;content&quot;&gt;
      &lt;h1&gt;title&lt;/h1&gt;
      &lt;div&gt;定义插槽&lt;/div&gt;
    &lt;/div&gt;
  &lt;/mx-slot&gt;
  
&lt;/div&gt;
</code></pre>
<p>而我们只需在子<code>view</code>的模版里使用即可</p>
<pre><code class='language-html' lang='html'>&lt;!-- child.html --&gt;

&lt;div class=&quot;child&quot;&gt;
  &lt;mx-slot use=&quot;header&quot;&gt;default-使用插槽&lt;/mx-slot&gt;
  &lt;h1&gt;child&lt;/h1&gt;
  &lt;mx-slot use=&quot;content&quot;&gt;default-使用插槽&lt;/mx-slot&gt;
&lt;/div&gt;
</code></pre>
<h3 >插槽内引用</h3>
<p>插槽中也可以引用插槽</p>
<pre><code class='language-html' lang='html'>&lt;mx-slot name=&quot;a1&quot;&gt;
    a1 content
&lt;/mx-slot&gt;


&lt;mx-slot name=&quot;a2&quot;&gt;
  a2 content
  &lt;mx-slot use=&quot;a1&quot;/&gt;
  a2 content
&lt;/mx-slot&gt;
</code></pre>
<h3 >获取当前view的所有插槽</h3>
<p>除了<code>$viewId</code>以外，模版中还内置了<code>$slots</code>属性用于获取当前<code>view</code>下的所有<strong>插槽对象</strong></p>
<pre><code class='language-html' lang='html'>&lt;!-- index.html --&gt;

&lt;div mx-view=&quot;./child&quot; *data=&quot;123&quot; *ref=&quot;{{# $slots }}&quot;&gt;
  &lt;mx-slot name=&quot;header&quot;&gt;
    &lt;div class=&quot;header&quot;&gt;
      &lt;h1&gt;header&lt;/h1&gt;
    &lt;/div&gt;
  &lt;/mx-slot&gt;&gt;
  &lt;mx-slot name=&quot;content&quot;&gt;
    &lt;div class=&quot;content&quot;&gt;
      &lt;h1&gt;title&lt;/h1&gt;
    &lt;div&gt;content&lt;/div&gt;
    &lt;/div&gt;
  &lt;/mx-slot&gt;&gt;
&lt;/div&gt;
</code></pre>
<h3 >fn属性</h3>
<p>普通的插槽只会被编译为普通的变量，当插槽中添加了<code>fn</code>属性后就会被编译成一个<strong>函数</strong>，并且允许传递参数，但必须在使用出添加<code>params</code>属性</p>
<pre><code class='language-html' lang='html'>&lt;!-- index.html --&gt;

&lt;div mx-view=&quot;./child&quot; *data=&quot;123&quot;&gt;
  &lt;mx-slot name=&quot;content&quot; fn=&quot;num,content=&#39;默认内容&#39;,obj={}&quot;&gt;
    &lt;div class=&quot;content&quot;&gt;
      &lt;h1&gt;title&lt;/h1&gt;
      &lt;h2&gt;{{= num}}&lt;/h2&gt;
    	&lt;div&gt;{{= content}}&lt;/div&gt;
      &lt;forin obj as value&gt;
        {{= value}}
      &lt;/forin&gt;
    &lt;/div&gt;
  &lt;/mx-slot&gt;&gt;
&lt;/div&gt;
</code></pre>
<p><strong>在子<code>view</code>中使用必须添加<code>params</code>，不管传参数与否</strong>。在传递参数时，用逗号隔开</p>
<pre><code class='language-html' lang='html'>&lt;!-- child.html --&gt;

&lt;div class=&quot;child&quot;&gt;
  &lt;mx-slot use=&quot;content&quot; params=&quot;123,&#39;test&#39;,{foo:&#39;bar&#39;}&quot;&gt;default-使用插槽&lt;/mx-slot&gt;
  &lt;h1&gt;child&lt;/h1&gt;
&lt;/div&gt;
</code></pre>
<p>&nbsp;</p>
<p>&nbsp;</p>

`;

export default data;
