/**
 * magix3 namespace
 */
declare namespace Magix3 {
    /**
     * 配置信息接口
     */
    export interface Config {
        /**
         * 默认加载的view
         */
        defaultView?: string
        /**
         * 默认路径
         */
        defaultPath?: string
        /**
         * path与view关系映射对象或方法
         */
        routes?: string | ((this: Config, path: string, loc?: RouterParse) => string)
        /**
         * 在routes里找不到匹配时使用的view，比如显示404
         */
        unmatchView?: string
        /**
         * 根view的id
         */
        rootId?: string
        /**
         * 项目启动时加载的扩展，这些扩展会在项目初始化之前加载进来
         */
        exts?: string[]
        /**
         * 以try catch执行一些用户重写的核心流程，当出错时，允许开发者通过该配置项进行捕获。注意：您不应该在该方法内再次抛出任何错误
         */
        error?: (this: void, exception: Error) => void
        /**
         * 其它配置项
         */
        [key: string]: any
    }
    /**
     * url解析部分对象接口
     */
    export interface RouterParseParts {
        /**
         * 参数对象
         */
        readonly params: {
            readonly [key: string]: string
        }
        /**
         * 路径字符串
         */
        readonly path: string
    }
    /**
     * url解析接口
     */
    export interface RouterParse {
        /**
         * 原始的href
         */
        readonly href: string

        /**
         * 原始的query
         */
        readonly srcQuery: string

        /**
         * 原始的hash
         */
        readonly srcHash: string

        /**
         * srcQuery解析出的对象
         */
        readonly query: RouterParseParts

        /**
         * srcHash解析出的对象
         */
        readonly hash: RouterParseParts
        /**
         * query中的params与hash中的params对象合并出来的新对象
         */
        readonly params: {
            readonly [key: string]: string
        }

        /**
         * 根据hash对象中的path和query对象中的path，再根据要求得出的path
         */
        readonly path: string

        /**
         * 当前url对应的要渲染的根view
         */
        readonly view: string
        /**
         * 从params中获取参数值，当参数不存在时返回空字符串
         * @param key key
         * @param defaultValue 当值不存在时候返回的默认值
         */
        get<TDefaultValueType=any>(key: string, defaultValue?: TDefaultValueType): string

    }
    /**
     * 差异对象接口
     */
    export interface RouterDiffItem {
        /**
         * 旧值
         */
        readonly from: string

        /**
         * 新值
         */
        readonly to: string
    }
    /**
     * url差异对象接口
     */
    export interface RouterDiff {
        /**
         * 是否为应用首次初始化时强制触发的差异比较
         */
        readonly force: boolean
        /**
         * 当路径有变化时，才有path这个对象
         */
        readonly path?: RouterDiffItem

        /**
         * 当渲染的根view有变化时，才有view这个对象
         */
        readonly view?: RouterDiffItem

        /**
         * 都有哪些参数发生变化的对象
         */
        readonly params: {
            readonly [key: string]: RouterDiffItem
        }
    }
    /**
     * view更新器接口
     */
    export interface Updater {

        /**
         * 获取设置的数据，当key未传递时，返回整个数据对象
         * @param key 设置时的数据key
         */
        get<TReturnType=any>(key?: string): TReturnType
        /**
         * 设置数据
         * @param data 数据对象，如{a:20,b:30}
         * @param unchanged 指示哪些数据并没有变化的对象
         */
        set(data?: { [key: string]: any }, unchanged?: { [key: string]: any }, ): this

        /**
         * 通过path获取值，path形如"data.list.2.name"字符串
         * @param path 路径
         */
        //gain<TReturnType>(path: string): TReturnType

        /**
         * 检测数据变化，更新界面，放入数据后需要显式调用该方法才可以把数据更新到界面
         * @param data 数据对象，如{a:20,b:30}
         * @param unchanged 指示哪些数据并没有变化的对象
         * @param resolve 完成更新后的回调
         */
        digest(data?: { [key: string]: any }, unchanged?: { [key: string]: any }, resolve?: Function): void

        /**
         * 获取当前数据状态的快照，配合altered方法可获得数据是否有变化
         */
        snapshot(): this

        /**
         * 检测数据是否有变动
         */
        altered(): boolean
        /**
         * 得到模板中@符号对应的原始数据
         * @param data 数据对象
         */
        translate(data: object): object
        /**
         * 得到模板中@符号对应的原始数据
         * @param origin 源字符串
         */
        parse(origin: string): object
    }
    /**
     * 数据载体接口
     */
    export interface Bag {
        /**
         * bag id
         */
        id: string

        /**
         * 从bag中获取数据
         * @param key 数据key，如果未传递则返回整个数据对象
         * @param defaultValue 默认值，如果传递了该参数且从bag中获取到的数据类型如果与defaultValue不一致，则使用defaultValue
         */
        get<TReturnAndDefaultValueType=any>(key?: string, defaultValue?: TReturnAndDefaultValueType): TReturnAndDefaultValueType

        /**
         * 设置数据
         * @param key 数据key
         * @param value 数据
         */
        set(key: string, value: any): void

        /**
         * 设置数据
         * @param data 包含数据的对象
         */
        set(data: object): void
    }
    /**
     * Magix.State变化事件接口
     */
    export interface StateChangedEvent extends TriggerEventDescriptor {
        /**
         * 包含哪些数据变化的集合对象
         */
        readonly keys: {
            readonly [key: string]: 1
        }
    }
    /**
     * 事件对象接口
     */
    export interface Event<T=any> {
        /**
         * 绑定事件
         * @param name 事件名称
         * @param fn 事件处理函数
         */
        on(name: string, fn: (this: T, e?: TriggerEventDescriptor) => void): this

        /**
         * 解除事件绑定
         * @param name 事件名称
         * @param fn 事件处理函数
         */
        off(name: string, fn?: Function): this

        /**
         * 派发事件
         * @param name 事件名称
         * @param data 事件参数
         * @param remove 是否移除所有的事件监听
         * @param lastToFirst 是否倒序派发列表中的监听
         */
        fire(name: string, data?: object, remove?: boolean, lastToFirst?: boolean): this
    }
    /**
     * 状态接口
     */
    export interface State extends Event<State> {
        /**
         * 从状态对象中获取数据
         * @param key 数据key，如果未传递则返回整个状态对象
         */
        get<TReturnType=any>(key?: string): TReturnType
        /**
         * 设置数据
         * @param data 数据对象
         * @param unchanged 指示哪些数据并没有变化的对象
         */
        set(data: object, unchanged?: { [key: string]: any }): this
        /**
         * 清理Magix.State中的数据，只能在view的mixins中使用，如 mixins:[Magix.State.clean("a,b")]
         * @param keys 逗号分割的字符串
         */
        clean(keys: string): void
        /**
         * 检测数据变化，派发changed事件，通过set放入数据后需要显式调用该方法才会派发事件
         * @param data 数据对象，如{a:20,b:30}
         * @param unchanged 指示哪些数据并没有变化的对象
         */
        digest(data?: object, unchanged?: { [key: string]: any }): void
        /**
         * State中的数据发生变化时触发
         */
        onchanged: (this: this, e?: StateChangedEvent) => void
    }
    /**
     * api注册信息接口
     */
    export interface ServiceInterfaceMeta {
        /**
         * 缓存时间，以毫秒为单位
         */
        cache?: number
        /**
         * 请求的url地址
         */
        url?: string
        /**
         * 添加的接口元信息名称，需要确保在一个Service中唯一
         */
        name: string
        /**
         * 逗号分割的字符串，用来清除其它接口的缓存，如该接口是一个添加新数据的接口，这个接口调用成功后，应该把所有获取相关数据的缓存接口给清理掉，否则将获取不到新数据
         */
        cleans?: string | string[]
        /**
         * 接口在请求发送前调用，可以在该方法内对数据进行加工处理
         */
        before?: (this: Bag, bag: Bag) => void

        /**
         * 接口在成功请求后，在送到view毅调用该方法，可在该方法对数据进行加工处理
         */
        after?: (this: Bag, bag: Bag) => void

        [key: string]: any
    }

    /**
     * 基础触发事件接口
     */
    export interface TriggerEventDescriptor {
        /**
         * 事件类型
         */
        readonly type: string
    }
    /**
     * 路由变化事件接口
     */
    export interface RouterChangeEvent extends TriggerEventDescriptor {
        /**
         * 拒绝url改变
         */
        reject: () => void

        /**
         * 接受url改变
         */
        resolve: () => void

        /**
         * 阻止url改变
         */
        prevent: () => void
    }
    /**
     * 路由变化后事件接口
     */
    export interface RouterChangedEvent extends RouterDiff, TriggerEventDescriptor {

    }
    /**
     * view监听location接口
     */
    export interface ViewObserveLocation {
        /**
         * 监听path
         */
        path?: boolean
        /**
         * 监听参数
         */
        params?: string | string[]
    }
    /**
     * 路由对象接口
     */
    export interface Router extends Event<Router> {
        /**
         * 解析href的query和hash，默认href为location.href
         * @param url 待解析的url，如果未指定则使用location.href
         */
        parse(url?: string): RouterParse
        /**
         * 当前地址栏中的地址与上一个地址栏中的地址差异对象
         */
        diff(): RouterDiff

        /**
         * 导航到新的地址
         * @param path 路径字符串
         * @param params 参数对象
         * @param replace 是否替换当前的历史记录
         * @param silent 是否是静默更新，不触发change事件
         */
        to(path: string, params?: object, replace?: boolean, silent?: boolean): void

        /**
         * 导航到新的地址
         * @param params 参数对象
         * @param replace 是否替换当前的历史记录
         * @param silent 是否是静默更新，不触发change事件
         */
        to(params: object, empty?: any, replace?: boolean, silent?: boolean): void
        /**
         * url即将改变时发生
         */
        onchange: (this: this, e?: RouterChangeEvent) => void
        /**
         * url改变后发生
         */
        onchanged: (this: this, e?: RouterChangedEvent) => void
    }
    /**
     * 接口服务事件接口
     */
    export interface ServiceEvent extends TriggerEventDescriptor {
        /**
         * 数据对象的载体
         */
        readonly bag: Bag
        /**
         * 错误对象，如果有错误发生的话
         */
        readonly error: object | string | null
    }
    /**
     * 继承对象接口
     */
    export interface ExtendPropertyDescriptor<T> {
        [key: string]: string | number | undefined | boolean | RegExp | symbol | object | null | ((this: T, ...args: any[]) => any)
    }

    /**
     * 继承方法中的this指向
     */
    type TExtendPropertyDescriptor<T> = ExtendPropertyDescriptor<T> & ThisType<T>;
    /**
     * 继承静态属性
     */
    export interface ExtendStaticPropertyDescriptor {
        [key: string]: any
    }

    /**
     * 监控url参数接口
     */
    export interface ViewObserveUrl {
        /**
         * 监听参数。逗号分割的字符串，或字符串数组
         */
        params?: string | string[]

        /**
         * 是否监听地址的改变
         */
        path?: boolean
    }
    /**
     * view事件接口
     */
    export interface ViewEvent extends TriggerEventDescriptor {
        /**
         * 节点id
         */
        readonly id: string
    }
    /**
     * vframe静态事件接口
     */
    export interface VframeStaticEvent extends TriggerEventDescriptor {
        /**
         * vframe对象
         */
        readonly vframe: VframePrototype
    }


    /**
     * 缓存类
     */
    export interface CachePrototype {
        /**
         * 设置缓存的资源
         * @param key 缓存资源时使用的key，唯一的key对应唯一的资源
         * @param resource 缓存的资源
         */
        set<TResourceAndReturnType=any>(key: string, resource: TResourceAndReturnType): TResourceAndReturnType

        /**
         * 获取缓存的资源，如果不存在则返回undefined
         * @param key 缓存资源时使用的key
         */
        get<TReturnType=any>(key: string): TReturnType
        /**
         * 从缓存对象中删除缓存的资源
         * @param key 缓存的资源key
         */
        del<TReturnType=any>(key: string): TReturnType
        /**
         * 判断缓存对象中是否包含给定key的缓存资源
         * @param key 缓存的资源key
         */
        has(key: string): boolean
        /**
         * 遍历缓存对象中的所有资源
         * @param callback 回调
         * @param options 回调时传递的额外对象
         */
        each<TResourceType=any, TOptionsType=any>(callback: (resource: TResourceType, options: TOptionsType, cache: this) => void, options?: TOptionsType): void
    }
    /**
     * 缓存类
     */
    export interface Cache {
        /**
         * 缓存类
         * @param max 最大缓存个数
         * @param buffer 缓存区个数，默认5
         * @param removedCallback 当缓存的资源被删除时调用
         */
        new(max?: number, buffer?: number, removedCallback?: (this: void, resource: any) => void): CachePrototype
        readonly prototype: CachePrototype
    }


    /**
     * 拥有事件on,off,fire的基类原型
     */
    export interface BasePrototype extends Event<BasePrototype> {

    }
    /**
     * 拥有事件on,off,fire的基类
     */
    export interface Base {
        /**
         * 初始化
         */
        new(...args: any[]): BasePrototype
        /**
         * 继承Magix.Base
         * @param props 原型方法或属性的对象
         * @param statics 静态方法或属性的对象
         */
        extend<TProps=object, TStatics =object>(props?: TExtendPropertyDescriptor<TProps & BasePrototype>, statics?: TStatics): this & TStatics
        /**
         * 原型
         */
        readonly prototype: BasePrototype
    }

    /**
     * Vframe类原型
     */
    export interface VframePrototype extends Event<VframePrototype> {
        /**
         * vframe所在的节点id
         */
        readonly id: string

        /**
         * 渲染的view模块路径，如app/views/default
         */
        readonly path: string

        /**
         * 父vframe id，如果没有则为undefined
         */
        readonly pId: string
        /**
         * 渲染view
         * @param viewPath view模块路径，如app/views/default
         * @param viewInitParams 初始化view时传递的参数，可以在view的init方法中接收
         */
        mountView(viewPath: string, viewInitParams?: object): void
        /**
         * 销毁view
         */
        unmountView(): void

        /**
         * 在某个dom节点上渲染vframe
         * @param id 要渲染的节点id
         * @param viewPath view路径
         * @param viewInitParams 初始化view时传递的参数，可以在view的init方法中接收
         */
        mountVframe(id: string, viewPath: string, viewInitParams?: object): this

        /**
         * 销毁dom节点上渲染的vframe
         * @param id 节点id，默认当前view
         */
        unmountVframe(id?: string): void

        /**
         * 渲染某个节点下的所有子view
         * @param id 节点id，默认当前view
         * @param viewInitParams 初始化view时传递的参数，可以在view的init方法中接收
         */
        mountZone(id?: string, viewInitParams?: object): void

        /**
         * 销毁某个节点下的所有子view
         * @param id 节点id，默认当前view
         */
        unmountZone(id?: string): void

        /**
         * 获取祖先vframe
         * @param level 向上查找层级，默认1级，即父vframe
         */
        parent(level?: number): this | null

        /**
         * 获取当前vframe的所有子vframe的id。返回数组中，id在数组中的位置并不固定
         */
        children(): string[]

        /**
         * 调用vframe的view中的方法
         * @param name 方法名
         * @param args 传递的参数
         */
        invoke<TReturnType>(name: string, args?: any[]): TReturnType
        /**
         * 子孙view创建完成时触发
         */
        oncreated: (this: this, e?: TriggerEventDescriptor) => void

        /**
         * 子孙view修改时触发
         */
        onalter: (this: this, e?: TriggerEventDescriptor) => void
    }
    /**
     * Vframe类，开发者绝对不需要继承、实例化该类！
     */
    export interface Vframe extends Event<Vframe> {
        /**
         * 获取当前页面上所有的vframe
         */
        all(): {
            [key: string]: VframePrototype
        }
        /**
         * 根据id获取vframe
         * @param id id
         */
        get(id: string): VframePrototype

        /**
         * 当vframe创建并添加到管理对象上时触发
         */
        onadd: (this: this, e?: VframeStaticEvent) => void

        /**
         * 当vframe销毁并从管理对象上删除时触发
         */
        onremove: (this: this, e?: VframeStaticEvent) => void
        /**
         * 原型
         */
        readonly prototype: VframePrototype
    }
    export interface IncrementDiff {
        node: HTMLElement,
        deep: boolean
        data: boolean
        html: boolean
        keys: object
    }
    /**
     * view类原型
     */
    export interface ViewPrototype extends Event<ViewPrototype> {
        /**
         * 当前view所在的节点id
         */
        readonly id: string
        /**
         * 模板
         */
        readonly tmpl: string | {
            html: string
            subs: object[]
        }
        /**
         * 持有当前view的vframe
         */
        readonly owner: VframePrototype
        /**
         * 更新界面对象
         */
        readonly updater: Updater
        /**
         * 混入的当前View类原型链上的其它对象
         */
        mixins?: ExtendStaticPropertyDescriptor[]

        /**
         * 初始化View时调用
         * @param extra 初始化时传递的额外参数
         */
        init(extra?: object): void
        /**
         * 渲染界面，开发者在该方法内完成界面渲染的流程
         */
        render(...args: any[]): void
        /**
         * 更新某个节点的html，该方法内部会自动处理相关的子view
         * @param id 设置html的节点id
         * @param html 待设置的html
         */
        assign(data: object, options?: IncrementDiff): boolean

        /**
         * 监听地址栏的改变，如"/app/path?page=1&size=20"，其中"/app/path"为path,"page,size"为参数
         * @param parameters 监听地址栏中的参数，如"page,size"或["page","size"]表示监听page或size的改变
         * @param observePath 是否监听path的改变
         */
        observeLocation(parameters: string | string[], observePath?: boolean): void

        /**
         * 监听地址栏的改变
         * @param observeObject 参数对象
         */
        observeLocation(observeObject: ViewObserveLocation): void
        /**
         * 监听Magix.State中的数据变化
         * @param keys 逗号分割的字符串
         */
        observeState(keys: string): void
        /**
         * 通知当前view某个节点即将开始进行html的更新，在该方法内部会派发prerender事件
         * @param id 哪块区域需要更新，默认当前view
         */
        beginUpdate(id?: string): void
        /**
         * 通知当前view某个节点结束html的更新，在该方法内部会派发rendered事件
         * @param id 哪块区域需要更新，默认当前view
         */
        endUpdate(id?: string): void
        /**
         * 包装异步回调
         * 为什么要包装？
         * 在单页应用的情况下，一些异步(如setTimeout,ajax等)回调执行时，当前view已经被销毁。如果你的回调中去操作了DOM，
         * 则会出错，为了避免这种情况的出现，可以调用该方法包装一次，magix会确保你的回调在view未销毁的情况下被调用
         * @param callback 回调方法
         * @param context 回调方法执行时的this指向
         */
        wrapAsync<TThisType>(callback: (this: TThisType, ...args: any[]) => void, context?: TThisType): Function
        /**
         * 把资源交给当前view托管，当view销毁或重新渲染时自动对托管的资源做处理，即在合适的时候调用资源的destroy方法。返回托管的资源
         * @param key 托管资源的key，当要托管的key已经存在时且要托管的资源与之前的不相同时，会自动销毁之前托管的资源
         * @param resource 托管的资源
         * @param destroyWhenCallRender 当render方法再次调用时，是否自动销毁该资源，通常Magix.Service实例需要在render时自动销毁
         */
        capture<TResourceAndReturnType extends { destroy: () => void }>(key: string, resource?: TResourceAndReturnType, destroyWhenCallRender?: boolean): TResourceAndReturnType
        /**
         * 释放管理的资源。返回托管的资源，无论是否销毁
         * @param key 托管资源的key
         * @param destroy 是否销毁资源，即自动调用资源的destroy方法
         */
        release<TResourceType extends { destroy: () => void }>(key: string, destroy?: boolean): TResourceType
        /**
         * 离开确认方法，需要开发者实现离开的界面和逻辑
         * @param resolve 确定离开时调用该方法，通知magix离开
         * @param reject 留在当前界面时调用的方法，通知magix不要离开
         * @param msg 调用leaveTip时传递的离开消息
         */
        leaveConfirm(resolve: Function, reject: Function, msg: string): void
        /**
         * 离开提醒，比如表单有变化且未保存，我们可以提示用户是直接离开，还是保存后再离开
         * @param msg 离开提示消息
         * @param hasChanged 是否显示提示消息的方法，返回true表示需要提示用户
         */
        leaveTip(msg: string, hasChanged: () => boolean): void

        /**
         * view销毁时触发
         */
        ondestroy: (this: this, e?: TriggerEventDescriptor) => void;

        /**
         * 当render方法被调用时触发
         */
        onrendercall: (this: this, e?: TriggerEventDescriptor) => void;
    }
    /**
     * View类
     */
    export interface View {
        /**
         * 继承Magix.View
         * @param props 包含可选的init和render方法的对象
         * @param statics 静态方法或属性的对象
         */
        extend<TProps=object, TStatics =object>(props?: TExtendPropertyDescriptor<TProps & ViewPrototype>, statics?: TStatics): this & TStatics
        /**
         * 扩展到Magix.View原型上的对象
         * @param props 包含可选的ctor方法的对象
         */
        merge(...args: TExtendPropertyDescriptor<ViewPrototype>[]): void
        /**
         * 原型
         */
        readonly prototype: ViewPrototype
    }

    /**
     * 接口管理类原型
     */
    export interface ServicePrototype {
        /**
         * 所有请求完成回调done
         * @param metas 接口名称或对象数组
         * @param done 全部接口成功时回调
         */
        all(metas: object[] | string[] | string, done: (this: this, err: any, ...bags: Bag[]) => void): this

        /**
         * 所有请求完成回调done，与all不同的是：如果接口指定了缓存，all会走缓存，而save则不会
         * @param metas 接口名称或对象数组
         * @param done 全部接口成功时回调
         */
        save(metas: object[] | string[] | string, done: (this: this, err: any, ...bags: Bag[]) => void): this

        /**
         * 任意一个成功均立即回调，回调会被调用多次
         * @param metas 接口名称或对象数组
         * @param done 全部接口成功时回调
         */
        one(metas: object[] | string[] | string, done: (this: this, err: any, ...bags: Bag[]) => void): this
        /**
         * 排队，前一个all,one或save任务做完后的下一个任务，类似promise
         * @param callback 当前面的任务完成后调用该回调
         */
        enqueue(callback: (this: this, ...args: any[]) => void): this
        /**
         * 开始处理队列中的下一个任务
         */
        dequeue(...args: any[]): void
        /**
         * 销毁当前请求，不可以继续发起新请求，而且不再调用相应的回调
         */
        destroy(): void
    }
    /**
     * 接口管理类
     */
    export interface Service extends Event<Service> {
        /**
         * 继承产生新的Service类
         * @param sync 同步数据的方法，通常在该方法内与服务端交换数据
         * @param cacheMax 最大缓存数
         * @param cacheBuffer 缓存区数量
         */
        extend(sync: (this: void, bag: Bag, callback: (error?: string | object) => void) => void, cacheMax?: number, cacheBuffer?: number): this
        /**
         * 添加接口元信息
         * @param metas 接口元信息数组
         */
        add(metas: ServiceInterfaceMeta[]): void

        /**
         * 根据接口元信息创建bag对象
         * @param meta 接口元信息对象或名称字符串
         */
        create(meta: ServiceInterfaceMeta | string): Bag

        /**
         * 获取元信息对象
         * @param meta 接口元信息对象或名称字符串
         */
        meta(meta: ServiceInterfaceMeta | string): ServiceInterfaceMeta

        /**
         * 从缓存中获取或创意bag对象
         * @param meta 接口元信息对象或名称字符串
         * @param create 是否是创建新的Bag对象，如果否，则尝试从缓存中获取
         */
        get(meta: ServiceInterfaceMeta | string, create: boolean): Bag

        /**
         * 从缓存中清除指定接口的数据
         * @param names 逗号分割的接口名称字符串或数组
         */
        clear(names: string | string[]): void

        /**
         * 从缓存中获取bag对象
         * @param meta 接口元信息对象或名称字符串
         */
        cached(meta: ServiceInterfaceMeta | string): Bag | null

        /**
         * 接口发送请求前触发
         */
        onbegin: (this: this, e?: ServiceEvent) => void;

        /**
         * 接口发送结束时触发，不管请求成功或失败
         */
        onend: (this: this, e?: ServiceEvent) => void;
        /**
         * 初始化
         */
        new(): ServicePrototype
        /**
         * 原型
         */
        readonly prototype: ServicePrototype
    }
    export interface Magix {
        /**
         * 设置或获取配置信息
         * @param cfg 配置信息参数对象
         */
        config<T extends object>(cfg: Magix3.Config & T): Magix3.Config & T

        /**
         * 获取配置信息
         * @param key 配置key
         */
        config(key: string): any

        /**
         * 获取配置信息对象
         */
        config<T extends object>(): Magix3.Config & T

        /**
         * 应用初始化入口
         * @param cfg 配置信息参数对象
         */
        boot(cfg: Magix3.Config): void
        /**
         * 把列表转化成hash对象。Magix.toMap([1,2,3,5,6]) => {1:1,2:1,3:1,4:1,5:1,6:1}。Magix.toMap([{id:20},{id:30},{id:40}],'id') => {20:{id:20},30:{id:30},40:{id:40}}
         * @param list 源数组
         * @param key 以数组中对象的哪个key的value做为hash的key
         */
        toMap<T extends object>(list: any[], key?: string): T
        /**
         * 以try catch方式执行方法，忽略掉任何异常。返回成功执行的最后一个方法的返回值
         * @param fns 函数数组
         * @param args 参数数组
         * @param context 在待执行的方法内部，this的指向
         */
        toTry<TReturnType, TContextType>(fns: ((this: TContextType, ...args: any[]) => void) | ((this: TContextType, ...args: any[]) => void)[], args?: any[], context?: TContextType): TReturnType

        /**
         * 以try catch方式执行方法，忽略掉任何异常。返回成功执行的最后一个方法的返回值
         * @param fns 函数数组
         * @param args 参数数组
         * @param context 在待执行的方法内部，this的指向
         */
        toTry<TReturnType>(fns: Function | Function[], args?: any[], context?: any): TReturnType

        /**
         * 转换成字符串路径。Magix.toUrl('/xxx/',{a:'b',c:'d'}) => /xxx/?a=b&c=d
         * @param path 路径
         * @param params 参数对象
         * @param keo 保留空白值的对象
         */
        toUrl(path: string, params?: object, keo?: object): string
        /**
         * 把路径字符串转换成对象。Magix.parseUrl('/xxx/?a=b&c=d') => {path:'/xxx/',params:{a:'b',c:'d'}}
         * @param url 路径字符串
         */
        parseUrl(url: string): Magix3.RouterParseParts

        /**
         * 把source对象的值添加到target对象上
         * @param target 要mix的目标对象
         * @param source mix的来源对象
         */
        mix<T, U>(target: T, source: U): T & U;

        /**
         * 把source对象的值添加到target对象上
         * @param target 要mix的目标对象
         * @param source1 第一个mix的来源对象
         * @param source2 第二个mix的来源对象
         */
        mix<T, U, V>(target: T, source1: U, source2: V): T & U & V;

        /**
         * 把source对象的值添加到target对象上
         * @param target 要mix的目标对象
         * @param source1 第一个mix的来源对象
         * @param source2 第二个mix的来源对象
         * @param source3 第三个mix的来源对象
         */
        mix<T, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;

        /**
         * 把source对象的值添加到target对象上
         * @param target 要mix的目标对象
         * @param sources 一个或多个mix的来源对象
         */
        mix(target: object, ...sources: any[]): any;

        /**
         * 检测某个对象是否拥有某个属性。
         * @param owner 检测对象
         * @param prop 属性
         */
        has(owner: object, prop: string | number): boolean

        /**
         * 获取对象的keys
         * @param src 源对象
         */
        keys(src: object): string[]

        /**
         * 判断一个节点是否在另外一个节点内，如果比较的2个节点是同一个节点，也返回true
         * @param node 节点或节点id
         * @param container 容器节点或节点id
         */
        inside(node: HTMLElement | string, container: HTMLElement | string): boolean

        /**
         * document.getElementById的简写
         * @param id 节点id
         */
        node(id: string | HTMLElement): HTMLElement | null

        /**
         * 给节点添加id
         * @param node 节点对象
         */
        nodeId(node: HTMLElement): string

        /**
         * 使用加载器的加载模块功能
         * @param deps 模块id
         * @param callback 回调
         */
        use(deps: string[], callback: (...args: object[]) => any): void

        /**
         * 保护对象不被修改
         * @param o 保护对象
         */
        guard<T extends object>(o: T): T

        /**
         * 向页面追加样式
         * @param key 样式对应的唯一key，该key主要防止向页面反复添加同样的样式
         * @param cssText 样式字符串
         */
        applyStyle(key: string, cssText: string): void
        /**
         * 向页面追加样式
         * @param atFile 以@开头的文件路径
         */
        applyStyle(atFile: string): void
        /**
         * 生成唯一的guid
         * @param prefix guid的前缀，默认mx-
         */
        guid(prefix?: string): string
        /**
         * 接管管理类
         */
        Service: Magix3.Service

        /**
         * view类
         */
        View: Magix3.View
        /**
         * 缓存类
         */
        Cache: Magix3.Cache
        /**
         * 状态对象
         */
        State: Magix3.State
        /**
         * 事件对象
         */
        Event: Magix3.Event
        /**
         * 路由对象
         */
        Router: Magix3.Router
        /**
         * Vframe类，开发者绝对不需要继承、实例化该类！
         */
        Vframe: Magix3.Vframe

        /**
         * 拥有事件on,off,fire的基类
         */
        Base: Magix3.Base
        default: Magix
    }
}
/**
 * export module
 */
declare module "magix" {
    const Magix: Magix3.Magix
    export = Magix;
}