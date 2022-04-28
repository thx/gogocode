const data = `
<h2 >接口管理</h2>
<p>我们在构建一个庞大的应用时，通常获取数据的接口也会非常多，如何集中的管理它们，统一请求处理，比如当接口要求用户登录时，我们可以弹出一个登录框。再比如接口的更改，我们不用到应用中逐一的找到它们进行修改。如何对返回的数据预处理成应用中想要的格式等，这些问题几乎在所有的应用中都会面临，<code>magix</code>为了解决接口带来的这些问题，提供了<code>Magix.Service</code>模块来方便开发者管理这些接口。</p>
<h3 >创建Service</h3>
<p>创建一个项目中使用的service来管理用到的接口很简单，只需要继承<code>Magix.Service</code>即可。</p>
<pre><code class='language-javascript' lang='javascript'>// app/service.js
import Magix from &#39;magix5&#39;

const Service = Magix.Service.extend((bag,callback) =&gt; {
  
})

export default Service
</code></pre>
<p><code>extend</code>方法接收三个参数，分别为同步数据的方法（通常在该方法内与服务端交换数据）、最大的缓存数、缓存区数量</p>
<pre><code class='language-javascript' lang='javascript'>extend(
  sync: (
  this: void,
  bag: Bag,
  callback: (error?: string | object) =&gt; void
) =&gt; void,
  cacheMax?: number,
    cacheBuffer?: number
): this;
</code></pre>
<p>在<code>sync</code>函数中，<code>bag</code>表示数据载体，接口注册时的数据，及使用接口时，发送的数据都会放在<code>bag</code>这个对象里。接口返回的数据也会放在<code>bag</code>里。如果需要对返回的数据加工处理，最终也都是放在<code>bag</code>对象里。<code>bag</code>上的属性方法有<code>id</code>、<code>get</code>、<code>set</code></p>
<h3 >添加接口</h3>
<p>创建完<code>Service</code>之后，接下来开始添加接口。<code>Service</code>中提供了<code>add</code>方法接受一个数组参数作为添加的接口</p>
<pre><code class='language-javascript' lang='javascript'>Service.add([
  {
    &quot;name&quot;: &quot;api_tag_topic_$id_get&quot;,
    &quot;method&quot;: &quot;GET&quot;,
    &quot;url&quot;: &quot;/api/tag/topic/&quot;
  },
  {
    &quot;name&quot;: &quot;api_tag_topic_$id_get&quot;,
    &quot;method&quot;: &quot;GET&quot;,
    &quot;url&quot;: &quot;/api/tag/topic/&quot;
  },
  {
    &quot;name&quot;: &quot;api_tag_topic_$id_get&quot;,
    &quot;method&quot;: &quot;GET&quot;,
    &quot;url&quot;: &quot;/api/tag/topic/&quot;
  },
])
</code></pre>
<p>当项目中使用了<code>rap2</code>的时候，会自动生成一个<code>models.js</code>文件，包含所有的接口，在添加接口时只需将其全部导入即可</p>
<h3 >使用接口</h3>
<p>假设现在我们要在<code>view</code>中使用<code>user</code>和<code>list</code>接口：</p>
<pre><code class='language-javascript' lang='javascript'>import Magix from &#39;magix&#39;
import Service from &#39;./service.js&#39;

export default Magix.View.extend({
  tmpl:&#39;@:./index.html&#39;,
  assign(extra){
    this.set(extra)
  },
  async render() {
    const r = new Service()
    r.all([
      {
        name:&#39;user&#39;,
        params:{
          userId:&#39;xl&#39;
        }
      },
       {
        name:&#39;list&#39;,
        params:{
          pageSize:10
        }
      },
    ],(err,...bags) =&gt; {
      // do something...
    }
   )
  }
})
</code></pre>
<p>在使用<code>Service</code>实例上的<code>all</code>方法时，只需传入参数的<code>name</code>或者包含<code>name</code>的对象数组，然后当所有接口成功时就会调用回调函数</p>
<p>因为请求接口的操作是异步的，所以应该在<code>render</code>阶段进行该操作。</p>
<h3 >缓存接口</h3>
<p>这里的缓存并<strong>不是浏览器的请求缓存</strong>，而是在内存中把数据保存下来，当再次请求时，如果参数与之前的一致，则这次请求不会被发送，而是直接拿之前缓存的数据。这在很多情况下非常有用，比如用户信息接口，比如报表接口，通常在一段时间内都不会改变</p>
<p>对接口进行缓存只需在请求接口时，在传入的参数对象中加入<code>cache</code>即可缓存，单位毫秒</p>
<pre><code class='language-javascript' lang='javascript'>import Magix from &#39;magix&#39;
import Service from &#39;./service.js&#39;

export default Magix.View.extend({
  tmpl:&#39;@:./index.html&#39;,
  assign(extra){
    this.set(extra)
  },
  async render() {
    const r = new Service()
    r.all([
      {
        name:&#39;user&#39;,
        params:{
          userId:&#39;xl&#39;
        },
        cache:3600 // 缓存时间，单位为毫秒
      },
       {
        name:&#39;list&#39;,
        params:{
          pageSize:10
        }
      },
    ],(err,...bags) =&gt; {
      // do something...
    }
   )
  }
})
</code></pre>
<p>当接口进行缓存后，等下一次请求时，会直接从缓存中获取。但如果是使用<code>Service.save</code>来请求接口，即便当前接口进行了缓存也<strong>不会</strong>从缓存中获取数据</p>
<h3 >单个接口处理</h3>
<p>有时候后端接口给出的数据并不符合我们的要求，比如我们期望是数组，但是后端给出的却是对象，或者我们期望是对象给出的却是数组。很多时候我们可以要求后端修改成我们期望的数据格式，但有时候我们期望同一份数据即是数组又是对象，这些事情都让后端来做未必合适。再比如某个接口进行了升级，一些字段重新命名，这时候我们在整个项目中查找替换这些字段会带来漏修改的风险</p>
<p>这时候我们希望提供对单个接口数据修改的能力，同样的可以在传入的参数对象中使用<code>before</code>与<code>after</code>钩子</p>
<pre><code class='language-javascript' lang='javascript'>import Magix from &#39;magix&#39;
import Service from &#39;./service.js&#39;

export default Magix.View.extend({
  tmpl:&#39;@:./index.html&#39;,
  assign(extra){
    this.set(extra)
  },
  async render() {
    const r = new Service()
    r.all([
      {
        name:&#39;user&#39;,
        before(bag) {
          // handle...
        },
        after(bag) {
          // handle...
        }
      },
    ],(err,...bags) =&gt; {
      // do something...
    }
   )
  }
})
</code></pre>
<p>&nbsp;</p>
`;
export default data;
