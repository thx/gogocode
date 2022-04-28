const data = `
<blockquote><p>在magix中的模版语法的设计方向始终为遵循HTML标准，而非创造与规范相背离的新语法</p>
</blockquote>
<h2 >输出语句</h2>
<p><code>magix</code>中提供了三种输出语句，用于输出动态数据：</p>
<ul>
<li><code>{{= variable}}</code>：该表达式主要是用于输出数据对象中<strong>基本数据类型</strong>的数据，如：<code>Number</code>、<code>String</code>等。且具有自动转义的效果，当变量中包含<code>&lt;&gt;&amp;</code>时就会被自动转义。</li>
<li><code>{{# variable}}</code>：该表达式主要用于传输<strong>引用对象</strong>，主要使用场景为调用函数时传入对象参数或组件传参时传入对象参数</li>
<li><code>{{: variable}}</code>：双向绑定表达式，需要配合额外的插件（功能）来实现双向绑定的功能。在使用该表达式时会自动向节点添加<code>mx5-host</code>、<code>mx5-ctrl</code>属性。双向绑定具体实现见：...</li>

</ul>
<h2 >条件语句</h2>
<h3 >if语句</h3>
<p><code>if</code>语句用于根据条件的成立与否来渲染节点，当<code>condition</code>为<code>true</code>时，被语句包裹的所有节点都会被渲染</p>
<pre><code class='language-html' lang='html'>{{if user.age &gt; 20}}
    &lt;span&gt;{{= user.name }}&lt;/span&gt; // 当user.age大于20时，渲染该节点
	  &lt;p&gt;foo&lt;/p&gt;
{{/if}}
</code></pre>
<h3 >else语句</h3>
<p>当<code>condition</code>为<code>false</code>时，渲染<code>else</code>语句后的节点内容。注意，该语句必须包含在<code>if</code>语句中。</p>
<pre><code class='language-html' lang='html'>{{if user.age &gt; 20}}
	&lt;span&gt;{{= user.name }}&lt;/span&gt;
{{else}}
	&lt;span&gt;user.age小于等于20&lt;/span&gt;
{{/if}}
</code></pre>
<h3 >else if语句</h3>
<p>用法同<code>if</code>语句相同，都需要根据条件的成立与否来渲染节点。该语句同样必须包含在<code>if</code>语句中</p>
<pre><code class='language-html' lang='html'>{{if user.age &gt; 20}}
    &lt;span&gt;{{= user.name }}&lt;/span&gt;
{{else if user.age &lt; 10}}
    &lt;strong&gt;{{= user.name }}&lt;/strong&gt;
{{/if}}
</code></pre>
<h2 >循环语句</h2>
<h3 >循环数组</h3>
<p>在模版中我们可以用<code>{{each (list) as (item)}} {{/each}}</code>的语法来进行对数组对象的遍历，其中<code>list</code>为要遍历的数组，而<code>item</code>为数组中每一项元素的别名，并且可选用<code>index</code>来标识每一项的索引</p>
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
    await this.digest({
      list: [&#39;a&#39;,&#39;b&#39;,&#39;c&#39;,&#39;d&#39;,&#39;e&#39;],
    });
  },
});

</code></pre>
<pre><code class='language-html' lang='html'>&lt;!-- index.html --&gt;

{{each list as ele index}}
	&lt;div&gt;{{= ele }}:{{= index}}&lt;/div&gt;
{{/each}}
&lt;!-- index可选 --&gt;
</code></pre>
<p>渲染出的节点内容为：</p>
<pre><code class='language-html' lang='html'>&lt;div&gt;a:0&lt;/div&gt;
&lt;div&gt;b:1&lt;/div&gt;
&lt;div&gt;c:2&lt;/div&gt;
&lt;div&gt;d:3&lt;/div&gt;
&lt;div&gt;e:4&lt;/div&gt;
</code></pre>
<h4 >解构对象赋值</h4>
<p>当数组中的元素为<strong>对象</strong>时，支持对对象进行解构赋值</p>
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
    await this.digest({
      list: [
        { name: &#39;a&#39;, age: 1 },
        { name: &#39;b&#39;, age: 2 },
      ],
    });
  },
});

</code></pre>
<pre><code class='language-html' lang='html'>&lt;!-- index.html --&gt;

{{each list as {name,age} index}}
	&lt;div&gt;{{= name }}-{{= age}}:{{= index}}&lt;/div&gt;
{{/each}}
&lt;!-- index可选 --&gt;
</code></pre>
<p>渲染出的节点内容为：</p>
<pre><code class='language-html' lang='html'>&lt;div&gt;a-1:0&lt;/div&gt;
&lt;div&gt;b-2:1&lt;/div&gt;
</code></pre>
<h4 >解构数组赋值</h4>
<p>同样的，也可以对数组中的每一项进行数组解构赋值。并且不只是一维数组，当数组为多维数组时也同样可用</p>
<pre><code class='language-javascript' lang='javascript'>import Magix5 from &#39;magix5&#39;;

Magix5.applyStyle(&#39;@:./index.less&#39;);

import View from &#39;../../../view&#39;;

export default View.extend({
  tmpl: &#39;@:./index.html&#39;,
  assign(extra) {
    this.set(extra);
  },
  async render() {
    await this.digest({
      list: [&#39;foo&#39;, &#39;bar&#39;, &#39;test&#39;], // 当list为多维数组时同样适用
    });
  },
});
</code></pre>
<pre><code class='language-html' lang='html'>&lt;!-- index.html --&gt;

{{each list as [a,b,...c] index}}
	&lt;div&gt;{{= a }}-{{= b}}-{{= c}}:{{= index}}&lt;/div&gt;
{{/each}}
&lt;!-- index可选 --&gt;
</code></pre>
<p>渲染出的节点内容为：</p>
<pre><code class='language-html' lang='html'>&lt;div&gt;f-o-o:0&lt;/div&gt;
&lt;div&gt;b-a-r:1&lt;/div&gt;
&lt;div&gt;t-e-s,t:2&lt;/div&gt;
</code></pre>
<h4 >首尾标识</h4>
<p>模版中除了提供<code>index</code>来标识每一项的索引以外，还提供<code>first</code>和<code>last</code>来标识<strong>首元素</strong>和<strong>末元素</strong></p>
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
    await this.digest({
      list: [
        {
          name: &#39;first&#39;,
          age: 18,
        },
        {
          name: &#39;foo&#39;,
          age: 19,
        },
        {
          name: &#39;bar&#39;,
          age: 20,
        },
        {
          name: &#39;last&#39;,
          age: 88,
        },
      ],
    });
  },
});

</code></pre>
<pre><code class='language-html' lang='html'>&lt;!-- index.html --&gt;

{{each list as {name,age} index first last}}
  {{if first}}
    &lt;div&gt;first: {{= name}}-{{= age}}&lt;/div&gt;
  {{else if last}}
    &lt;div&gt;last: {{= name}}-{{= age}}&lt;/div&gt;
  {{else}}
    &lt;div&gt;{{= name}}-{{= age}}&lt;/div&gt;
  {{/if}}
{{/each}}
&lt;!-- index可选 --&gt;
</code></pre>
<p>渲染出的节点内容为：</p>
<pre><code class='language-html' lang='html'>&lt;div&gt;first: first-18&lt;/div&gt;
&lt;div&gt;foo:19&lt;/div&gt;
&lt;div&gt;bar:20&lt;/div&gt;
&lt;div&gt;last: last-88&lt;/div&gt;
</code></pre>
<h4 >倒序遍历</h4>
<p>默认情况下，遍历的顺序为正序，即<code>by asc</code>。同时也支持了倒序遍历：<code>by desc</code>。</p>
<p>在上面的代码基础上加入<code>by desc</code>：</p>
<pre><code class='language-html' lang='html'>&lt;!-- index.html --&gt;

{{each list as {name,age} index first last by desc}}
  {{if first}}
    &lt;div&gt;first: {{= name}}-{{= age}}&lt;/div&gt;
  {{else if last}}
    &lt;div&gt;last: {{= name}}-{{= age}}&lt;/div&gt;
  {{else}}
    &lt;div&gt;{{= name}}-{{= age}}&lt;/div&gt;
  {{/if}}
{{/each}}
&lt;!-- index可选 --&gt;
</code></pre>
<p>渲染出的节点内容与正序时完全相反：</p>
<pre><code class='language-html' lang='html'>&lt;div&gt;last: last-88&lt;/div&gt;
&lt;div&gt;bar:20&lt;/div&gt;
&lt;div&gt;foo:19&lt;/div&gt;
&lt;div&gt;first: first-18&lt;/div&gt;
</code></pre>
<p>当倒序遍历时，<code>first</code>和<code>last</code>依旧指向数组中的首个元素和最后一个元素，可以理解成倒序遍历只是将渲染节点的顺序进行了倒序处理。并且模版中的<code>index</code>、<code>first</code>、<code>last</code>也一样是<strong>可选</strong>的。</p>
<h3 >循环对象</h3>
<p>除了对数组进行循环以外，模版也支持了对对象的遍历。使用<code>{{forin (obj) as (value) (key)}}</code>的语法即可对对象进行遍历，其中<code>obj</code>为要遍历的对象，而<code>value</code>和<code>key</code>则为对象属性的值和键的<strong>别名</strong>，并且<code>key</code>是可选的</p>
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
    await this.digest({
      obj: {
        name: &#39;obj&#39;,
        age: 20,
      },
    });
  },
});
</code></pre>
<pre><code class='language-html' lang='html'>&lt;!-- index.html --&gt;

{{forin obj as  value key}}
  &lt;div&gt;{{= key}}:{{= value}}&lt;/div&gt;
{{/forin}}

&lt;!-- key可选 --&gt;
</code></pre>
<p>渲染结果为：</p>
<pre><code class='language-html' lang='html'>&lt;div&gt;name:obj&lt;/div&gt;
&lt;div&gt;age:20&lt;/div&gt;
</code></pre>
<h3 >普通循环</h3>
<p>模版也支持原生的普通循环，如：</p>
<pre><code class='language-html' lang='html'>{{for(let i=0;i&lt;100;i+=2)}}
    {{= i }}
{{/for}}
</code></pre>
<h2 >方法调用与变量声明</h2>
<h3 >方法调用</h3>
<p>当在<code>js</code>文件中定义了方法之后，将函数方法设置到数据对象中，便支持在模版中直接使用</p>
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
    await this.digest({
      test: this.test,
    });
  },
  test(a, b) {
    return a + b;
  },
});
</code></pre>
<pre><code class='language-html' lang='html'>&lt;!-- index.html --&gt;
&lt;div&gt;{{= test(1,2)}}&lt;/div&gt;
</code></pre>
<p>渲染结果为<code>&lt;div&gt;3&lt;/div&gt;</code></p>
<h3 >变量声明</h3>
<p>除了当前<code>view</code>的数据对象可以被模版使用之外，还支持直接在模版中直接进行变量的声明，但所声明的变量并<strong>不属于数据对象</strong></p>
<p>使用<code>{{let}}</code>或<code>{{set}}</code>的语法即可进行变量的声明</p>
<pre><code class='language-html' lang='html'>&lt;div&gt;{{set a=123}}&lt;/div&gt;
&lt;div&gt;{{let b=&#39;foo&#39;,c={name:123}}}&lt;/div&gt;
&lt;div&gt;{{= a}}--{{= b}}--{{= c.name}}&lt;/div&gt;
</code></pre>
<p>需要注意的是，模版中<strong>不应该进行函数声</strong>明，函数应该在<code>js</code>文件中声明，在模版中使用</p>
<h2 >动态属性</h2>
<h3 >布尔输出</h3>
<p>当我们想根据<strong>某个条件的成立与否</strong>来<strong>动态添加/删除属性</strong>时，只需要使用<code>(property)=&quot;{{= (condition)}}?&quot;</code>的语法，<code>property</code>为要添加或删除的属性，<code>condition</code>为判断的条件。当<code>condition</code>的值为<code>true</code>时，该节点便会添加该属性，当为<code>false</code>则相反。</p>
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
    await this.digest({
      disabled: false,
    });
  },
});
</code></pre>
<pre><code class='language-html' lang='html'>&lt;!-- index.html --&gt;
&lt;input disabled=&quot;{{= disabled}}?&quot; /&gt;
</code></pre>
<p>同时也支持<strong>自定义属性的值</strong>：<code>(property)=&quot;{{= (condition)}}? value&quot;</code></p>
<pre><code class='language-html' lang='html'>&lt;div mx-click=&quot;{{= !clicked}}?handleClick()&quot;&gt;click&lt;/div&gt;
</code></pre>
<h3 >有值输出</h3>
<p>当我们想根据一个<strong>变量是否存在值</strong>来动态添加/删除属性时，便可以使用<code>(property)=&quot;{{= (value)}??}”</code>，当<code>value</code>存在值时（不为<code>null</code>或<code>undefined</code>）节点中便添加<code>property</code>，并且该属性的值也为<code>value</code></p>
<pre><code class='language-java' lang='java'>// index.ts
import Magix5 from &#39;magix5&#39;;

Magix5.applyStyle(&#39;@:./index.less&#39;);

import View from &#39;../../../view&#39;;

export default View.extend({
  tmpl: &#39;@:./index.html&#39;,
  assign(extra) {
    this.set(extra);
  },
  async render() {
    await this.digest({
      foo: &#39;bar&#39;,
    });
  },
});
</code></pre>
<pre><code class='language-html' lang='html'>&lt;!-- index.html --&gt;
&lt;div data-test=&quot;{{= foo}}??&quot;&gt;test&lt;/div&gt;

&lt;!-- 当foo为&#39;bar&#39;(有值)时，渲染结果为 --&gt;
&lt;div data-test=&quot;bar&quot;&gt;test&lt;/div&gt;

&lt;!-- 当foo没有值时，渲染结果为 --&gt;
&lt;div&gt;test&lt;/div&gt;
</code></pre>
<p>同时有值输出也支持在向子<code>view</code>传递参数时使用，如<code>&lt;mx-vframe *test=&quot;{{= data}}??&quot; /&gt;</code></p>
<h3 >转义</h3>
<p>在使用动态属性时，模版语法其实就是在普通的输出语句后加上一个或两个问号，那当我们需要真的在输出变量后加上问号时需要怎么做？</p>
<p>正确的做法是在输出语句内部直接<strong>使用字符串的拼接</strong></p>
<p>比如当我们想要在<code>user.age</code>后加入一个问号：<code>&lt;div data-test=&quot;{{= test}}?&quot;&gt;&lt;/div&gt;</code>，需要以这样的写法：<code>&lt;div data-test=&quot;{{= test+&#39;?&#39; }}&quot;&gt;&lt;/div&gt;</code></p>
<p>因为在html属性中，会自动转义<code>?</code>为<code>html</code>实体<code>&amp;#x3f</code></p>
<h2 >内置属性与内置标签</h2>
<p>除了在之前我们提到<code>magix</code>中模版内置的<code>mx-view</code>属性和<code>&lt;mx-vframe/&gt;</code>标签之外，还内置了一些属性和标签提供使用</p>

<h3 >输出html</h3>
<p>模版中内置了<code>tag</code>标签与<code>x-html</code>/<code>inner-html</code>属性配合使用来输出<code>html</code>片段，并且其内容不会被自动转义</p>
<ul>
<li><code>&lt;tag x-html=&quot;{{= html}}&quot;&gt;&lt;/tag&gt;</code></li>
</ul>
<ul>
<li><code>&lt;tag inner-html=&quot;{{= html}}&quot;&gt;&lt;/tag&gt;</code></li>
</ul>
<h4 >输出源码</h4>
<p>模版中提供了<code>mx-source</code>用于以文本的形式输出<code>html</code>。主要用于展示源码，辅助文档的编写。</p>
<p>并且该标签支持两个参数，分别为：<code>whole</code>和<code>tag</code>。</p>
<ul>
<li><code>whole</code>接收的值为布尔值，表示是否也对模版进行渲染展示：当为<code>true</code>时，表示对<code>{{ expr }}</code>模板控制语句也转义输出，为<code>false</code>时，表示仅对<code>html</code>转义输出。默认为<code>false</code></li>
<li><code>tag</code>用于指定输出内容的标签，默认为<code>pre</code>标签</li>

</ul>
<pre><code class='language-html' lang='html'>&lt;mx-source tag=&quot;div&quot; whole=&quot;false&quot;&gt;
    &lt;div&gt;{{=user.name}}&lt;/div&gt;
    &lt;button mx-click=&quot;log()&quot; mx-ref=&quot;{{= $viewId}}_btn&quot;&gt;查看数据&lt;/button&gt;
&lt;/mx-source&gt;
</code></pre>
<p>并且模版中还提供了<code>mx-source-whole</code>标签用于辅助<code>mx-source</code>。具体用于当在<code>mx-source</code>标签内，部分<code>{{ expr }}</code>需要输出展示，而部分不需要</p>
<pre><code class='language-html' lang='html'>&lt;mx-source&gt;
    each语句：
    &lt;mx-source-whole&gt;
        {{each source as dest}}
            {{=dest.id}}
        {{/each}}
    &lt;/mx-source-whole&gt;
    &lt;div&gt;{{=user.name}}&lt;/div&gt;
    &lt;button mx-click=&quot;log()&quot; mx-ref=&quot;{{= $viewId}}_btn&quot;&gt;查看数据&lt;/button&gt;
&lt;/mx-source&gt;
</code></pre>
<p>上述示例中，<code>mx-source-whole</code>中间的内容原样输出，其它<code>{{ epxr }}</code>计算后输出</p>

<h3 >插槽</h3>
<p>假设同样一段<code>html</code>在不同的场景下放在不同的节点里，比如在场景<code>a</code>放在<code>div</code>标签，场景<code>b</code>放在<code>span</code>标签，我们可以使用内置的<code>mx-slot</code>标签来实现。但需要注意的是：<code>mx-slot</code>必须<strong>先定义后使用</strong>。具体的见：<a href='\#/guide?page=slot'>插槽</a></p>
<pre><code class='language-html' lang='html'>&lt;div&gt;
    top div
&lt;/div&gt;
&lt;mx-slot name=&quot;content&quot;&gt;
    content {{=name}} here
    &lt;div&gt;
        &lt;span&gt;inner&lt;/span&gt;
    &lt;/div&gt;
&lt;/mx-slot&gt;

{{if from==&#39;a&#39;}}
    &lt;div&gt;
        &lt;mx-slot use=&quot;content&quot;/&gt;
    &lt;div&gt;
{{else}}
    &lt;span&gt;
        &lt;mx-slot use=&quot;content&quot;/&gt;
    &lt;/span&gt;
{{/if}}
</code></pre>
<h3 >链接导航</h3>
<p>当我们使用<code>&lt;a/&gt;</code>标签进行页面跳转时，当参数过多时可读性较差，因此模版提供了<code>&lt;mx-link&gt;</code>，在传递参数时会自动对其进行<code>encodeURIComponent</code>编码</p>
<pre><code class='language-html' lang='html'>&lt;mx-link to=&quot;https://list.tmall.com/search_product.htm&quot; *q=&quot;{{=searchKeyword}}&quot;&gt;天猫搜索&lt;/mx-link&gt;
&lt;!-- 等价于 --&gt;
&lt;a href=&quot;https://list.tmall.com/search_product.htm?q={{=encodeURIComponent(searchKeyword)}}&quot;&gt;天猫搜索&lt;/a&gt;
</code></pre>
<h3 >$viewId</h3>
<p>模版中提供了<code>$viewId</code>用于标识当前的<code>view</code>。与当前<code>view</code>的<code>id</code>对应，即与<code>js</code>文件中<code>this.id</code>相同</p>

`;

export default data;
