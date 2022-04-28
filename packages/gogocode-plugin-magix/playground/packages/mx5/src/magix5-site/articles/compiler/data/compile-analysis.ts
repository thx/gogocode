const data = `
<blockquote><p>为了能够对<code>typescript</code>、<code>html</code>及<code>css</code>文件进行统一的打包、编译、处理，magix-composer会对整体打包过程有一个顺序控制。这里进行逐一分析说明</p>
</blockquote>
<h4 >文件识别</h4>
<p>对整个项目中，符合<code>[&#39;js&#39;, &#39;mjs&#39;, &#39;mx&#39;, &#39;mmx&#39;, &#39;ts&#39;, &#39;mts&#39;, &#39;jsx&#39;, &#39;es&#39;, &#39;tsx&#39;, &#39;mtsx&#39;]</code> 后缀的文件处理，因为<code>html</code>和<code>css</code>是依附于<code>javascript</code>文件的，这些文件最终生成的<code>.js</code>文件</p>
<h4 >文件头识别</h4>
<p>可以在<code>javascript</code>文件顶部定义一些供<code>magix-composer</code>使用的头部说明变量或格式，比如什么样的加载器、是否为代码片断、是否排除某些依赖项等信息，供后续阶段使用</p>
<h4 >通知编译开始</h4>
<p>为了方便后期处理一些特殊的情况，在开始编译<code>javascript</code>内容片断前会调用一次<code>compileJSStart</code>钩子函数，让外部有机会在编译前处理一次<code>javascript</code>内容</p>
<h4 >依赖分析</h4>
<p>这一步会自动提取<code>require</code>或<code>import</code>语句，并分析出依赖项，为最终的某些加载器使用，比如<code>requirejs</code>，需要在它的<code>define</code>中写入依赖项，这样打包后，<code>require</code>可以被压缩掉</p>
<h4 >依赖处理</h4>
<p>这一步会结合<code>文件头识别</code>，对一些依赖项进行排除，比如循环加载自身的，或者指定不放在依赖项里面的等，对分析到的依赖做一次过滤处理</p>
<h4 >代码字符串分析</h4>
<p>这一步会对<code>javascript</code>代码中的字符串进行分析，主要识别<code>&#X40;:</code>语法，转换成更可靠的方式供后续使用</p>
<p>对预定义的<code>&#X40;:moduleId</code>等进行替换处理，这样在写代码的时候可以无须关心模块名称等，可随意换目录或文件重命名</p>
<h4 >文件替换</h4>
<p>对预定义的如<code>base64&#X40;:./path/to/file</code>进行内容替换，方便快速在代码中引用某个文件并生成相应格式的内容</p>
<h4 >片断处理</h4>
<p>有些文件是反复出现在多个<code>javascript</code>文件中的，我们可以定义为代码片断，然后被多个文件引用，这一步即是处理该片断</p>
<h4 >样式处理</h4>
<blockquote><p>这一步较复杂</p>
</blockquote>
<p>这一步会对全局样式、当前文件引用到的样式做处理，比如生成样式<code>map</code>，方便在<code>javascript</code>或<code>html</code>使用</p>
<p>样式会被编译转换，比如<code>path/to/style.css</code>中有一个<code>.color</code>的选择器，开发模式会生成<code>.path-to-style-color</code>而在发布模式下可能生成<code>._</code>一个较短的选择器。</p>
<p>这里会保持原有样式及转换后的样式，在处理<code>html</code>阶段时，会自动替换，无须开发者关注</p>
<h4 >模板处理</h4>
<blockquote><p>这一步很复杂</p>
</blockquote>
<p>模板在编译到<code>javascript</code>中会做样式、变量、虚拟dom生成等一系列的事件</p>
<p>模板处理详情可阅读：<a href='#/compiler?page=teamplate-compile-analysis'>模板编译阶段分析</a></p>
<h4 >添加loader</h4>
<p>会根据配置等信息，给当前编译后的<code>javascript</code>加上<code>define</code>等需要的<code>loader</code></p>
<h4 >自引入样式处理</h4>
<p>如果<code>javascript</code>代码中有引用当前环境中的样式，则在这一步进行处理</p>
<h4 >通知编译结束</h4>
<p>会通过调用<code>compileJSEnd</code>通知外部编译结束，外部可以做一些简单的修改等事情</p>
<h4 >加入缓存依赖</h4>
<p>因为整个编译过程非常复杂，因此为了防止未修改的内容二次编译，这里会加入缓存，如果内容未改变且进入编译过程时，会直接返回缓存的编译结果，从而加速编译。</p>

`;

export default data;
