const data = `
<blockquote><p>magix的使用目前依赖脚手架工具<a href='https://github.com/thx/thx-cli'><code>thx-cli</code></a>，因此<code>magix</code>项目的开发、环境运行、打包编译等功能都需要在<code>thx-cli</code>的基础之上。</p>
</blockquote>
<h2 >安装脚手架</h2>
<p>首先我们需要在<strong>全局</strong>先安装<code>thx-cli</code></p>
<pre><code class='language-javascript' lang='javascript'>// npm
npm install -g thx-cli

// yarn
yarn global add thx-cli
</code></pre>
<p><code>thx-cli</code>在安装完成后会注册<code>thx</code>作为全局命令，我们可以直接使用<code>thx &lt;command&gt;[options]</code>来进行使用</p>
<p>因此我们可以使用<code>thx -v</code>命令来验证是否安装成功，如果显示了版本号则表示安装成功</p>
<h2 >应用初始化</h2>
<p>在安装完成<code>thx-cli</code>之后，我们就可以开始应用的初始化了。</p>
<p>我们可以使用<code>thx init</code>这个命令来进行应用的初始化。如果我们是第一次进行应用的初始化，<code>thx-cli</code>会提示安装<code>magix</code>相关的套件（<code>thx-kit-magix</code>），如下：</p>
<p><img src="https://img.alicdn.com/imgextra/i2/O1CN01vxQYLr1y1kgSxmvAC_!!6000000006519-2-tps-834-120.png" referrerpolicy="no-referrer"></p>
<p>在安装好套件之后，选择我们初始化的模版</p>
<p><img src="https://img.alicdn.com/imgextra/i1/O1CN014x23IQ1yK4WZpTB71_!!6000000006559-2-tps-1290-162.png" referrerpolicy="no-referrer"></p>
<p>最后输入应用名称</p>
<p><img src="https://img.alicdn.com/imgextra/i1/O1CN01DAHL5r1sInjVPH5Xf_!!6000000005744-2-tps-990-478.png" referrerpolicy="no-referrer"></p>
<p>根据命令行输出的内容我们已经初始化应用成功了</p>
<h2 >应用的运行与打包构建</h2>
<h3 >本地运行开发</h3>
<p><code>thx-cli</code>提供了<code>dev</code>命令用于应用的本地运行开发，在成功启动应用后会自动打开浏览器</p>
<p><img src="https://img.alicdn.com/imgextra/i4/O1CN01kLZ2xO1NfvdlA8DKA_!!6000000001598-2-tps-1204-340.png" referrerpolicy="no-referrer"></p>
<h3 >打包构建</h3>
<p><code>thx-cli</code>同样也提供了<code>build</code>命令用来对应用进行打包构建，构建后的文件输出在<code>build</code>目录下</p>
<p><img src="https://img.alicdn.com/imgextra/i3/O1CN01oFOErD1PeDOUR8QIz_!!6000000001865-2-tps-1238-246.png" referrerpolicy="no-referrer"></p>
<p><img style="max-height:600px;" src="https://img.alicdn.com/imgextra/i3/O1CN013e4oVx1ZivcpHGY70_!!6000000003229-2-tps-584-1142.png" referrerpolicy="no-referrer"></p>
<h2 >常用命令总结</h2>
<ul>
<li>init：应用初始化，选择套件</li>

</ul>
<ul>
<li>dev：在开发环境运行应用</li>
<li>build：打包构建应用</li>
<li>install：安装/更新套件</li>

</ul>
<p>具体的脚手架相关的使用请看：<a href='https://thx.github.io/magix-cli-book/#/'>thx-cli</a></p>
`;
export default data;
