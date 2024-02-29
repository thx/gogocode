---
title: 把 iview 组件库升级到 Vue3 的实践
order: 3
---

前一段时间，我们团队发布了工具：[阿里妈妈又做了新工具，帮你把 Vue2 代码改成 Vue3 的](https://juejin.cn/post/6977259197566517284)


这个工具使用 [GoGoCode](https://github.com/thx/gogocode) 来做代码转换的方式帮助 Vue2 的项目迁移到 Vue3，发出后我们收到了很多社区朋友的反馈，修正了很多的问题，但听到最多的反馈就是：「我的组件库还不支持 Vue3，我业务代码升级了没用啊！」


实际上我们也遇到了这个问题……下面是我们内部用的项目排期管理平台 LaLaLine（看这一脉相承的命名），它使用的是 Vue2 + iView 的技术栈

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fbfe863f9421479b97ed7641c0aacb77~tplv-k3u1fbpfcp-zoom-1.image)
当我们把它升级到 Vue3 时，就受到了 iView 的掣肘，这是一个很好用的组件库，但看起来迟迟没有升级 Vue3 的计划，组件库是强依赖，它不升级，我们的项目是跑不起来的。


其实组件库也是基于 Vue2 构建的项目，我们不禁想，能不能试一试把 [GoGoCode](https://github.com/thx/gogocode) 的转换直接应用到 iView 组件库上，组件库对 Vue 功能的使用会更加的深度和灵活，这样也能检验我们转换工具的质量。


## 兵马未动，构建先行


Vue2 和 Vue3 的构建方式有所差异，想让转换后的 Vue3 的代码能顺利跑起来，我们首先要修改构建流程。


按照官网的提示，我们除了要改运行时 Vue 的版本号从 2 到 3，在编译时还要使用 @vue/compiler-sfc 替换原有的 vue-template-compiler，替换后发现跑不起来，原来 @vue/compiler-sfc 要求 Webpack4 以上才行。


那我们就把 Webpack3 升级到 Webpack 4，对应的 Webpack 插件依赖和配置文件都需要随着版本变化进行调整，在调整之后，要记得把 VueLoaderPlugin 加到 plugin 里面，再针对 Vue3 调整一些环境变量的替换：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/74a66a6cf703461d80315ec97d19a2cd~tplv-k3u1fbpfcp-zoom-1.image)


## 利用转换工具粗略跑一遍


观察一下 iView 的项目结构：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a9ebadc20b474da8b05e86a8577c850b~tplv-k3u1fbpfcp-zoom-1.image)

其中 `src` 目录是组件库源码，`examples` 则是调试开发组件库时的示例仓库，都是 Vue2 的代码。


我们把它们各自用 [GoGoCode](https://github.com/thx/gogocode) 的 Vue 转换插件跑上一遍：


`gogocode -t gogocode-plugin-vue -s ./examples -o ./examples`

`gogocode -t gogocode-plugin-vue -s ./src -o ./src`


结果非常的壮观，光是 src 目录下就有 140 Diff


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23e0ab3b626b4f01841029cfd353e203~tplv-k3u1fbpfcp-zoom-1.image)


可以看到很多 Vue2 和 Vue3 的差异点已经被转换好了


比如 slot:

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5e3d5fd91cf444d98cf5d0b63ec57a22~tplv-k3u1fbpfcp-zoom-1.image)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1bf8aa6582274ac98fc822e8b43657fd~tplv-k3u1fbpfcp-zoom-1.image)


事件的 .native 后缀去掉了：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ffe30d92b9a74dabaeb590fd23e9ceea~tplv-k3u1fbpfcp-zoom-1.image)

被去掉的 \$on \ \$children 等属性以外挂函数的形式的到了支持：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fa9efcf0f0d2418d82ac237bd386460e~tplv-k3u1fbpfcp-zoom-1.image)

生命周期也被自动给改了名：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/963f5420969c47baae2af10747b03d40~tplv-k3u1fbpfcp-zoom-1.image)

函数式组件得到了「面目全非」式地修改：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ebbbef8a655144d38f3322a8756f89fb~tplv-k3u1fbpfcp-zoom-1.image)

指令的生命周期也被改好了：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fb2d3483ebee492fa7f1ad610fa37157~tplv-k3u1fbpfcp-zoom-1.image)……


看到工具帮我们改了这么多，自然是十分欣喜的，然后就直接跑起来看看！


果然跑不起来。


## 手动做出调整


这么大的一个组件库，肯定有工具覆盖不到的地方，我们对它的要求也只是帮我们做好重复的 90% 的工作，剩下一些技术活还是要人来调整一下！


比如组件注入的入口文件：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b670b24cd7a4437da6f47839effd0345~tplv-k3u1fbpfcp-zoom-1.image)


比如看起来暂时用不上的 isServer：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee43975f451c471ea96dade95ca4fe50~tplv-k3u1fbpfcp-zoom-1.image)


比如在 props 的 default 函数里面无法访问 this，得想个办法 hack 掉：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5a207a5e82894e74bcbb704d6837bab1~tplv-k3u1fbpfcp-zoom-1.image)
……


过程中发现的转换规则的 bug 已经随手修改掉了，重跑之后，发现手改的地方是很少的，相比于这接近二百个文件，可能也就十处，而且很少有重复工作。


然后我们试一下 `npm run dev`


竟然跑起来了：


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3aabacb19c324f41b5b98972fff9e6e3~tplv-k3u1fbpfcp-zoom-1.image)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ea94b1394ef49c8ae83511539fd6efc~tplv-k3u1fbpfcp-zoom-1.image)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/26ecbe7cf0de476ab5265b627fd1ec3e~tplv-k3u1fbpfcp-zoom-1.image)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b05d2bc3106549d29b377cd73bcec337~tplv-k3u1fbpfcp-zoom-1.image)


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/227595c1be9b4e9f9da2b9e9ab70278a~tplv-k3u1fbpfcp-zoom-1.image)
点东点西，修复了一些发现的问题，就可以让老项目升级后直接用上啦！
## 后记

在此之后，我们的 LaLaLine 项目管理工具也能轻装上阵 Vue3 啦，替 LaLaLine 感谢 [GoGoCode](https://github.com/thx/gogocode) 


当然，本次实践是以测试、完善 GoGoCode 能力和内部项目升级为主，后续还是希望能用上 iView 官方的 Vue3 版本，不过我们什么时候能用上官方发布的 Vue3 的组件库呢？


当我们去看 iView 的 issue 列表时，发现有很多朋友也都表达了殷切的期望，iView 小组也已经有对应的计划：   ([[Feature Request]missing vue3.0 support](https://github.com/view-design/ViewUI/issues/516)、[咨询下：Vue3.0已经发布，view-design是否有对Vue3支持的计划？](https://github.com/view-design/ViewUI/issues/714)、[什么时候支持vue3](https://github.com/iview/iview/issues/6570))


刚开始冒出自己动手升级组件库的想法时，都不由得为这个想法感到可怕，想想就是一个巨大的坑，但后来发现，在大部分重复工作被工具做了之后，这件事情也不是那么难！这次实验证明，GoGoCode 可以加速大型 Vue 应用/组件库升级 Vue3 的进程，相关团队若有 GoGoCode 能帮到的地方请尽快联系我们！


issues: [github.com/thx/gogocod…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fthx%2Fgogocode%2Fissues)

钉钉群：34266233


最后：求 star 支持！

Github：[github.com/thx/gogocod…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fthx%2Fgogocode)（本次演示转换的 iview 项目也在里面）

官网：[gogocode.io](https://link.juejin.cn?target=https%3A%2F%2Fgogocode.io)

