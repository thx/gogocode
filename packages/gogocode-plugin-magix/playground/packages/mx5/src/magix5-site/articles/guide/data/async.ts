const data = `
<h2 >分片操作</h2>
<p><code>Magix</code>中针对任务的控制，提供了一些<code>api</code>用于分片操作</p>
<ul>
<li><code>task(fn: (this: TContext, ...args: TArgs[]) =&gt; void,args?: TArgs[],context?: TContext,id?: string)</code>：安排、优化待执行的函数</li>
<li><code>lowTask(fn: (this: TContext, ...args: TArgs[]) =&gt; void,args?: TArgs[],context?: TContext,id?: string)</code>：<strong>最后</strong>安排、优化待执行的函数</li>
<li><code>taskFinale()</code>：等待任务完成</li>
<li><code>lowtaskFinale()</code>：等待最后的任务完成</li>

</ul>
<pre><code class='language-javascript' lang='javascript'>import {task,lowTaskFinale} from &#39;magix&#39;
let collectRects = (nodes) =&gt; {
    //process nodes client rectangle
};
let walk = nodes =&gt; {
    for (let e of nodes) {
        if (e.nodeType == 3) {
            task(collectRects, [e]);
        } else if (e.nodeType == 1) {
            if (e.childNodes.length) {
                task(walk, e.childNodes);
            } else if (e.tagName.toUpperCase() != &#39;TD&#39;) {
                task(collectRects, [e]);
            }
        }
    }
};
walk(nodes);
await lowTaskFinale();
</code></pre>
<h2 >Mark</h2>
<p>在<code>js</code>中异步无处不在，异步任务完成的时间并非是可控的，并且当异步任务被重复调用时，很容易出现结果与预想情况不一致的问题</p>
<p>假设当前有一个函数方法用于请求页面的数据</p>
<pre><code class='language-javascript' lang='javascript'>let displayListByPage=(page: number)=&gt;{
    let response = await fetch(&#39;remote/url?page=\${page}&#39;);
    let json = await response.json();
    let displayNode = document.getElementById(&#39;main&#39;);
    displayNode.innerHTML = JSON.stringify(json);
};
</code></pre>
<p>我们现在想要请求<code>50</code>页之后立即请求<code>100</code>页，然后最后展示的数据是请求<code>100</code>页时返回的数据。因为请求是按照我们的需求按照前后顺序发起，得到的结果应该也是按照预想的。但因为这是异步任务，我们并不能保证在<code>displayListByPage(100)</code>得到结果时是在<code>displayListByPage(50)</code>得到结果之后，也就是说即使顺序按照发起请求，但是第一个请求的响应时间可能比第二个请求响应的还要完，这就导致我们最后得到的结果为第一次发起请求得到的结果</p>
<p>那么该怎么解决这个问题呢？</p>
<p><code>magix</code>中为我们提供了一个<code>mark</code>方法，用于创建标识</p>
<pre><code class='language-javascript' lang='javascript'>/**
* 获取异步标识
* @param host 宿主对象
* @param key 标识key
*/
mark(host: object, key: string): () =&gt; boolean;
</code></pre>
<p>我们先来看看使用方法再讲解其内部的细节</p>
<pre><code class='language-javascript' lang='javascript'>import Magix from &#39;magix&#39;

const markObj = {}
const testMark.= Magix.mark(markObj,&#39;test&#39;) // 返回一个函数
if(testMark()) { // 调用函数用来判断是否为第一次监听
  // do something...
} 
</code></pre>
<p>从下面的代码中可以看到：判断是是否成立的条件取决于<code>sign</code>和<code>temp[key]</code>值是否相同。<code>sign</code>的值是在调用<code>Mark</code>时创建的，用闭包进行了保存，而<code>temp[key]</code>的值是<strong>保存在宿主对象上</strong>的。因此当重复对<code>Mark</code>进行调用时（传入的标识符相同）），<code>temp[key]</code>的值会不断改变。</p>
<p>因此在调用返回的函数时，如果<code>sign</code>和<code>temp[key]</code>的值不同，就代表着已经对<code>Mark</code>进行了重复的调用（传入的标识符相同），就代表此时的任务已经过期。</p>
<pre><code class='language-javascript' lang='javascript'>let Mark = (host, key) =&gt; {
    let deletedKey = &#39;#mark.object.deleted&#39;; // 删除标识
    let markObjectKey = &#39;#mark.object&#39;;  // mark对象key
    let sign; // 调用标识
    if (!host[deletedKey]) {
        let markHost = host[markObjectKey] || (host[markObjectKey] = {}); // mark收集对象，保存在宿主对象上
        if (!markHost.hasOwnProperty(key)) {
            markHost[key] = 0;
        }
        sign = ++markHost[key];
    }
    return () =&gt; {
        let temp = host[markObjectKey];
        return temp &amp;&amp; sign === temp[key];
    }
};
</code></pre>
<h3 >改进</h3>
<p>现在对我们一开始的<code>displayListByPage</code>函数进行改造</p>
<pre><code class='language-javascript' lang='javascript'>let markObject={};
let displayListByPage=(page: number)=&gt;{
    let markChecker=Mark(markObject,&#39;displayListByPage&#39;);
    let response = await fetch(&#39;remote/url?page=\${page}&#39;);
    let json = await response.json();
    if(markChecker()){
        let displayNode = document.getElementById(&#39;main&#39;);
        displayNode.innerHTML = JSON.stringify(json);
    }
};
</code></pre>
<p>当<code>displayListByPage</code>被重复调用时，除了最后一次调用，其他的调用都不会更新视图，这保证了最后视图上更新的是最后获得的数据</p>
<h3 >实现原理</h3>
<p>使用了闭包来对单次调用的状态进行了保存，然后将全部的调用次数的状态保存在对象上。当重复调用时，对象上的数据改变，如果本次调用的状态对不上，说明后续又进行了调用，本次调用则作废。</p>
<p>类似于<code>debounce</code>的思路，当重复调用时，因为对象上的数据不断增加，因此只有最后一个生效</p>

`;
export default data;
