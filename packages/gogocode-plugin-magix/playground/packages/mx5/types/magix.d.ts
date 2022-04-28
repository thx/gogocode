/*!5.0.0-beta Licensed MIT*/
/*
author:kooboy_li@163.com
loader:umd
enables:mxevent,richVframe,xml,async,service,wait,lang,router,routerHash,routerTip,richView,innerView,recast,require,xview,taskComplete,taskIdle,spreadMxViewParams,removeStyle,taskCancel,eventVframe,richVframeInvokeCancel,waitSelector,remold,rewrite,rebuild,load,state,batchDOMEvent

optionals:routerState,routerTipLockUrl,routerForceState,customTags,checkAttr,webc,lockSubWhenBusy
*/
declare namespace Magix5 {
    /**
     * 鼠标事件
     */
    interface MagixMouseEvent extends MouseEvent {
        params: {
            [key: string]: any;
        };
        eventTarget: HTMLElement;
    }
    /**
     * 键盘事件
     */
    interface MagixKeyboardEvent extends KeyboardEvent {
        params: {
            [key: string]: any;
        };
        eventTarget: HTMLElement;
    }
    /**
     * 混合鼠标及键盘的事件对象
     */
    interface MagixMixedEvent extends MouseEvent, KeyboardEvent {
        params: {
            [key: string]: any;
        };
        eventTarget: HTMLElement;
    }
    /**
     * html元素或事件对象
     */
    type HTMLElementOrEventTarget = HTMLElement | EventTarget;
    /**
     * 路由配置对象
     */
    interface RoutesConfig {
        [key: string]:
            | string
            | {
                  /**
                   * 浏览器标题
                   */
                  title: string;
                  /**
                   * 加载的view
                   */
                  view: string;
              };
    }
    /**
     * 配置信息接口
     */
    interface Config {
        /**
         * 默认加载的view
         */
        defaultView?: string;
        /**
         * 默认路径
         */
        defaultPath?: string;
        /**
         * path与view关系映射对象或方法
         */
        routes?: RoutesConfig;
        /**
         * 在routes里找不到匹配时使用的view，比如显示404
         */
        unmatchView?: string;
        /**
         * 默认的浏览器title
         */
        title?: string;
        /**
         * 根view的id
         */
        rootId?: string;
        /**
         * 以try catch执行一些用户重写的核心流程，当出错时，允许开发者通过该配置项进行捕获。注意：您不应该在该方法内再次抛出任何错误
         */
        error?: (this: void, exception: Error) => void;

        /**
         * 重写地址栏解析后的对象
         * @param pathname 路径信息
         * @param params 参数对象
         * @param routes 路由信息
         * @param loc 解析后的地址栏对象
         */
        rewrite?: (
            pathname: string,
            params: { [key: string]: string },
            routes: RoutesConfig,
            loc: RouterParse
        ) => string;
        /**
         * 重写把路径和参数转换成url的逻辑
         * @param pathname 路径信息
         * @param params 参数对象
         * @param lastQuery hash前的参数对象
         * @param loc 解析后的地址栏对象
         */
        rebuild?: (
            pathname: string,
            params: { [key: string]: any },
            lastQuery: { [key: string]: string },
            loc: RouterParse
        ) => string;

        /**
         * 路径变化渲染前拦截
         * @param e 变化对象
         */
        recast?: (e: RouterDiff) => void;

        /**
         * 拦截事件处理方法，返回false时中止事件的处理
         * @param taget 当前事件dom对象
         * @param type 事件类型
         * @param e 事件对象
         */
        remold?: (target: HTMLElement, type: string, e: Event) => boolean;

        /**
         * 在异步加载模块前执行的方法
         * @param modules 模块列表
         * @param params 其它参数
         */
        require?: (modules: string[], params?: any) => Promise<void>;

        /**
         * 是否有等待中的任务
         * @param flag 1有0没有
         */
        retard?: (flag: number) => void;

        /**
         * 是否有网络请求
         * @param falg 1有0没有
         */
        request?: (flag: number) => void;

        /**
         * 其它配置项
         */
        [key: string]: any;
    }
    /**
     * url解析部分对象接口
     */
    interface RouterParseParts {
        /**
         * 参数对象
         */
        readonly params: {
            readonly [key: string]: string;
        };
        /**
         * 路径字符串
         */
        readonly path: string;
    }
    /**
     * url解析接口
     */
    interface RouterParse {
        /**
         * 原始的href
         */
        readonly href: string;

        /**
         * 原始的query
         */
        readonly srcQuery: string;

        /**
         * 原始的hash
         */
        readonly srcHash: string;

        /**
         * srcQuery解析出的对象
         */
        readonly query: RouterParseParts;

        /**
         * srcHash解析出的对象
         */
        readonly hash: RouterParseParts;
        /**
         * query中的params与hash中的params对象合并出来的新对象
         */
        readonly params: {
            readonly [key: string]: string;
        };

        /**
         * 根据hash对象中的path和query对象中的path，再根据要求得出的path
         */
        readonly path: string;

        /**
         * 当前url对应的要渲染的根view
         */
        readonly view: string;
        /**
         * 从params中获取参数值，当参数不存在时返回空字符串
         * @param key key
         * @param defaultValue 当值不存在时候返回的默认值
         */
        get<TDefaultValueType = string>(
            key: string,
            defaultValue?: TDefaultValueType
        ): TDefaultValueType;
    }
    /**
     * 差异对象接口
     */
    interface RouterDiffItem {
        /**
         * 旧值
         */
        readonly from: string;

        /**
         * 新值
         */
        readonly to: string;
    }
    /**
     * url差异对象接口
     */
    interface RouterDiff {
        /**
         * 是否为应用首次初始化时强制触发的差异比较
         */
        readonly force: boolean;
        /**
         * 当路径有变化时，才有path这个对象
         */
        readonly path?: RouterDiffItem;

        /**
         * 当渲染的根view有变化时，才有view这个对象
         */
        readonly view?: RouterDiffItem;

        /**
         * 都有哪些参数发生变化的对象
         */
        readonly params: {
            readonly [key: string]: RouterDiffItem;
        };
    }
    /**
     * 数据载体接口
     */
    interface Bag {
        /**
         * bag id
         */
        id: string;

        /**
         * 从bag中获取数据
         * @param key 数据key，如果未传递则返回整个数据对象
         * @param defaultValue 默认值，如果传递了该参数且从bag中获取到的数据类型如果与defaultValue不一致，则使用defaultValue
         */
        get<TReturnAndDefaultValueType = any>(
            key?: string,
            defaultValue?: TReturnAndDefaultValueType
        ): TReturnAndDefaultValueType;

        /**
         * 设置数据
         * @param data 包含数据的对象
         */
        set(data: object): void;
    }

    /**
     * 事件对象接口
     */
    interface Event<T = any, E = any> {
        /**
         * 绑定事件
         * @param name 事件名称
         * @param fn 事件处理函数
         * @param priority 优先级
         */
        on(
            name: string,
            fn: (this: T, e?: TriggerEventDescriptor & E) => void,
            priority?: number
        ): this;

        /**
         * 解除事件绑定
         * @param name 事件名称
         * @param fn 事件处理函数
         */
        off(
            name: string,
            fn?: (this: T, e?: TriggerEventDescriptor & E) => void
        ): this;

        /**
         * 派发事件
         * @param name 事件名称
         * @param data 事件参数
         */
        fire(name: string, data?: object): this;
    }

    /**
     * 状态接口
     */
    interface State extends Event<State> {
        /**
         * 从状态对象中获取数据
         * @param key 数据key，如果未传递则返回整个状态对象
         */
        get<TReturnType = any>(key?: string): TReturnType;
        /**
         * 设置数据
         * @param data 数据对象
         */
        set(data: object): this;
    }
    /**
     * api注册信息接口
     */
    interface ServiceInterfaceMeta {
        /**
         * 缓存时间，以毫秒为单位
         */
        cache?: number;
        /**
         * 请求的url地址
         */
        url?: string;
        /**
         * 添加的接口元信息名称，需要确保在一个Service中唯一
         */
        name: string;
        /**
         * 接口在请求发送前调用，可以在该方法内对数据进行加工处理
         */
        before?: (this: Bag, bag: Bag) => void;

        /**
         * 接口在成功请求后，在送到view毅调用该方法，可在该方法对数据进行加工处理
         */
        after?: (this: Bag, bag: Bag) => void;

        [key: string]: any;
    }

    /**
     * 基础触发事件接口
     */
    interface TriggerEventDescriptor {
        /**
         * 事件类型
         */
        readonly type: string;
    }
    /**
     * 路由变化事件接口
     */
    interface RouterChangeEvent extends TriggerEventDescriptor {
        /**
         * 拒绝url改变
         */
        reject: () => void;

        /**
         * 接受url改变
         */
        resolve: () => void;

        /**
         * 阻止url改变
         */
        stop: () => void;
    }
    /**
     * view监听location接口
     */
    interface ViewObserveLocation {
        /**
         * 监听path
         */
        path?: boolean;
        /**
         * 监听参数
         */
        params?: string | string[];
    }
    /**
     * 路由对象接口
     */
    interface Router extends Event<Router> {
        /**
         * 解析href的query和hash，默认href为location.href
         * @param url 待解析的url，如果未指定则使用location.href
         */
        parse(url?: string): RouterParse;
        /**
         * 当前地址栏中的地址与上一个地址栏中的地址差异对象
         */
        diff(): RouterDiff;

        /**
         * 导航到新的地址
         * @param path 路径字符串
         * @param params 参数对象
         * @param replace 是否替换当前的历史记录
         * @param silent 是否是静默更新，不触发change事件
         */
        to(
            path: string,
            params?: object,
            replace?: boolean,
            silent?: boolean
        ): void;

        /**
         * 导航到新的地址
         * @param params 参数对象
         * @param replace 是否替换当前的历史记录
         * @param silent 是否是静默更新，不触发change事件
         */
        to(
            params: object,
            empty?: any,
            replace?: boolean,
            silent?: boolean
        ): void;
        /**
         * url即将改变时发生
         */
        onchange: (this: this, e?: RouterChangeEvent) => void;
        /**
         * url改变后发生
         */
        onchanged: (
            this: this,
            e?: RouterDiff & TriggerEventDescriptor
        ) => void;
    }
    /**
     * 接口服务事件接口
     */
    interface ServiceEvent extends TriggerEventDescriptor {
        /**
         * 数据对象的载体
         */
        readonly bag: Bag;
        /**
         * 错误对象，如果有错误发生的话
         */
        readonly error: object | string | null;
    }
    /**
     * 继承对象接口
     */
    interface ExtendPropertyDescriptor<T> {
        [key: string]: ((this: T, ...args: any[]) => any) | any;
    }

    /**
     * 继承方法中的this指向
     */
    type TExtendPropertyDescriptor<T> = ExtendPropertyDescriptor<T> &
        ThisType<T>;
    /**
     * 继承静态属性
     */
    interface ExtendStaticPropertyDescriptor {
        [key: string]: any;
    }
    /**
     * vframe静态事件接口
     */
    interface VframeStaticEvent extends TriggerEventDescriptor {
        /**
         * vframe对象
         */
        readonly vframe: Vframe;
    }

    /**
     * 缓存类
     */
    interface Cache {
        /**
         * 设置缓存的资源
         * @param key 缓存资源时使用的key，唯一的key对应唯一的资源
         * @param resource 缓存的资源
         */
        set<TResourceAndReturnType = any>(
            key: string,
            resource: TResourceAndReturnType
        ): TResourceAndReturnType;

        /**
         * 获取缓存的资源，如果不存在则返回undefined
         * @param key 缓存资源时使用的key
         */
        get<TReturnType = any>(key: string): TReturnType;
        /**
         * 从缓存对象中删除缓存的资源
         * @param key 缓存的资源key
         */
        del<TReturnType = any>(key: string): TReturnType;
        /**
         * 判断缓存对象中是否包含给定key的缓存资源
         * @param key 缓存的资源key
         */
        has(key: string): boolean;
    }
    /**
     * 缓存类
     */
    interface CacheConstructor {
        /**
         * 缓存类
         * @param max 最大缓存个数
         * @param buffer 缓存区个数，默认5
         * @param removedCallback 当缓存的资源被删除时调用
         */
        new (max?: number, buffer?: number): Cache;
        readonly prototype: Cache;
    }

    /**
     * Vframe类原型
     */
    interface Vframe {
        /**
         * 当前vframe的唯一id
         */
        readonly id: string;
        /**
         * vframe所在的节点
         */
        readonly root: HTMLElement;
        /**
         * 渲染的view模块路径，如app/views/default
         */
        readonly path: string;

        /**
         * 父vframe id，如果没有则为undefined
         */
        readonly pId: string;
        /**
         * 渲染view
         * @param viewPath view模块路径，如app/views/default
         * @param viewInitParams 初始化view时传递的参数，可以在view的init方法中接收
         */
        //mountView(viewPath: string, viewInitParams?: object): void
        /**
         * 销毁view
         */
        //unmountView(): void

        /**
         * 在某个dom节点上渲染vframe
         * @param node 要渲染的节点
         * @param viewPath view路径
         * @param viewInitParams 初始化view时传递的参数，可以在view的init方法中接收
         * @param deepDestroy 是否深度销毁子view，默认对于恢复后的内容会进行view渲染
         */
        mount(
            node: HTMLElementOrEventTarget,
            viewPath: string,
            viewInitParams?: object,
            deepDestroy?: boolean
        ): this;

        /**
         * 销毁dom节点上渲染的vframe
         * @param node 节点对象或vframe id，默认当前view
         * @param isVframeId 指示node是否为vframe id
         * @param deepDestroy 是否深度销毁子view，默认对于恢复后的内容会进行view渲染
         */
        unmount(
            node?: HTMLElementOrEventTarget | string,
            isVframeId?: boolean,
            deepDestroy?: boolean
        ): void;

        // /**
        //  * 渲染某个节点下的所有子view
        //  * @param node 节点对象，默认当前view
        //  * @param viewInitParams 初始化view时传递的参数，可以在view的init方法中接收
        //  */
        // mountZone(node?: HTMLElement, viewInitParams?: object): void

        // /**
        //  * 销毁某个节点下的所有子view
        //  * @param node 节点对象，默认当前view
        //  */
        // unmountZone(node?: HTMLElement): void

        /**
         * 获取祖先vframe
         * @param level 向上查找层级，默认1级，即父vframe
         */
        parent(level?: number): this | null;

        /**
         * 获取当前vframe的所有子vframe的id。返回数组中，id在数组中的位置并不固定
         */
        children(): string[];

        /**
         * 调用vframe的view中的方法
         * @param name 方法名
         * @param args 传递的参数
         */
        invoke<TReturnType>(name: string, ...args: any): Promise<TReturnType>;

        /**
         * 取消invoke中未执行的方法
         * @param name 方法名称
         */
        invokeCancel(name?: string): void;

        /**
         * 软退出当前vframe，如果子或孙view有调用observeExit且条件成立，则会触发相应的退出
         * @param stop 通知外部应停止后续的代码调用
         * @param resolve 子view确认退出时执行的回调
         * @param reject 子view拒绝退出时执行的回调
         */
        exit(
            stop: () => void,
            resolve: () => void,
            reject: () => void
        ): Promise<void>;
    }
    /**
     * Vframe类，开发者绝对不需要继承、实例化该类！
     */
    interface VframeConstructor
        extends Event<
            Vframe,
            {
                /**
                 * vframe对象
                 */
                vframe: Vframe;
            }
        > {
        /**
         * 获取根vframe
         */
        root(): Vframe | null;
        /**
         * 获取当前页面上所有的vframe
         */
        all(): {
            [key: string]: Vframe;
        };
        /**
         * 根据id获取vframe
         * @param id
         */
        byId(id: string): Vframe | null;
        /**
         * 根据节点获取vframe
         * @param node 节点对象
         */
        byNode(node: HTMLElementOrEventTarget): Vframe | null;

        /**
         * 当vframe创建并添加到管理对象上时触发
         */
        onadd: (this: this, e?: VframeStaticEvent) => void;

        /**
         * 当vframe销毁并从管理对象上删除时触发
         */
        onremove: (this: this, e?: VframeStaticEvent) => void;
        /**
         * 原型
         */
        readonly prototype: Vframe;
    }
    /**
     * view类原型
     */
    interface View extends Event<View> {
        /**
         * 当前view的唯一id
         */
        readonly id: string;
        /**
         * 当前view所在的节点对象
         */
        readonly root: HTMLElement;
        /**
         * 模板
         */
        readonly tmpl: Function;
        /**
         * 持有当前view的vframe
         */
        readonly owner: Vframe;
        /**
         * 更新界面对象
         */

        /**
         * 初始化View时调用
         * @param extra 初始化时传递的额外参数
         */
        init(extra?: object): void;
        /**
         * 渲染界面，开发者在该方法内完成界面渲染的流程
         */
        render(...args: any[]): void;
        /**
         * 更新当前view的数据
         * @param data 赋值数据
         */
        assign(data: object): boolean;

        /**
         * 监听地址栏的改变，如"/app/path?page=1&size=20"，其中"/app/path"为path,"page,size"为参数
         * @param parameters 监听地址栏中的参数，如"page,size"或["page","size"]表示监听page或size的改变
         * @param observePath 是否监听path的改变
         */
        observeLocation(
            parameters: string | string[],
            observePath?: boolean
        ): void;

        /**
         * 监听地址栏的改变
         * @param observeObject 参数对象
         */
        observeLocation(observeObject: ViewObserveLocation): void;

        /**
         * 离开确认方法，需要开发者重写该方法以实现相关离开的界面和逻辑
         * @param msg 调用observeExit时传递的离开消息
         * @param resolve 确定离开时调用该方法，通知magix离开
         * @param reject 留在当前界面时调用的方法，通知magix不要离开
         */
        exitConfirm(msg: string, resolve: () => void, reject: () => void): void;
        /**
         * 关注当前view的离开(销毁)动作，允许用户拦截取消。比如表单有变化且未保存，我们可以提示用户是直接离开，还是保存后再离开
         * @param msg 离开提示消息
         * @param hasChanged 是否显示提示信息，返回true表示需要提示用户
         */
        observeExit(msg: string, hasChanged: () => boolean): void;

        /**
         * 获取设置的数据，当key未传递时，返回整个数据对象
         * @param key 设置时的数据key
         */
        get<TReturnType = any>(key?: string): TReturnType;
        /**
         * 设置数据
         * @param data 数据对象，如{a:20,b:30}
         */
        set(data?: { [key: string]: any }): this;
        /**
         * 获取设置数据后，是否发生了改变
         */
        changed(): boolean;
        /**
         * 检测数据变化，更新界面，放入数据后需要显式调用该方法才可以把数据更新到界面
         * @param data 数据对象，如{a:20,b:30}
         */
        digest(data?: { [key: string]: any }): Promise<any>;
        /**
         * 等待界面异步渲染结束
         */
        finale(): Promise<void>;
        /**
         * 得到模板中@符号对应的原始数据
         * @param data 数据对象
         */
        translate<T extends object>(data: object): T;
        /**
         * 得到模板中@符号对应的原始数据
         * @param origin 源字符串
         */
        parse<T extends object>(origin: string): T;
        /**
         * view销毁时触发
         */
        ondestroy: (this: this, e?: TriggerEventDescriptor) => void;
    }
    /**
     * View类
     */
    interface ViewConstructor {
        /**
         * 继承Magix.View
         * @param props 包含可选的init和render方法的对象
         * @param statics 静态方法或属性的对象
         */
        extend<TProps extends object>(
            props?: TExtendPropertyDescriptor<TProps & View>
        ): this;
        /**
         * 扩展到Magix.View原型上的对象
         * @param props 包含可选的ctor方法的对象
         */
        merge<TProps extends object>(
            ...args: TExtendPropertyDescriptor<TProps>[]
        ): this;
        /**
         * 静态方法
         * @param args 静态方法对象
         */
        static<TStatics = Object>(...args: TStatics[]): this & TStatics;
        /**
         * 原型
         */
        readonly prototype: View;
    }
    /**
     * 接口管理类原型
     */
    interface Service {
        /**
         * 所有请求完成回调done
         * @param metas 接口名称或对象数组
         * @param done 全部接口成功时回调
         */
        all(
            metas:
                | ServiceInterfaceMeta
                | ServiceInterfaceMeta[]
                | string[]
                | string,
            done: (this: this, err: any, ...bags: Bag[]) => void
        ): this;

        /**
         * 所有请求完成回调done，与all不同的是：如果接口指定了缓存，all会走缓存，而save则不会
         * @param metas 接口名称或对象数组
         * @param done 全部接口成功时回调
         */
        save(
            metas:
                | ServiceInterfaceMeta
                | ServiceInterfaceMeta[]
                | string[]
                | string,
            done: (this: this, err: any, ...bags: Bag[]) => void
        ): this;

        /**
         * 任意一个成功均立即回调，回调会被调用多次
         * @param metas 接口名称或对象数组
         * @param done 全部接口成功时回调
         */
        one(
            metas:
                | ServiceInterfaceMeta
                | ServiceInterfaceMeta[]
                | string[]
                | string,
            done: (this: this, err: any, ...bags: Bag[]) => void
        ): this;
        /**
         * 排队，前一个all,one或save任务做完后的下一个任务，类似promise
         * @param callback 当前面的任务完成后调用该回调
         */
        enqueue(callback: (this: this, ...args: any[]) => void): this;
        /**
         * 开始处理队列中的下一个任务
         */
        dequeue(...args: any[]): void;
        /**
         * 销毁当前请求，不可以继续发起新请求，而且不再调用相应的回调
         */
        destroy(): void;
    }
    /**
     * 接口管理类
     */
    interface ServiceConstructor
        extends Event<ServiceConstructor, ServiceEvent> {
        /**
         * 继承产生新的Service类
         * @param sync 同步数据的方法，通常在该方法内与服务端交换数据
         * @param cacheMax 最大缓存数
         * @param cacheBuffer 缓存区数量
         */
        extend(
            sync: (
                this: void,
                bag: Bag,
                callback: (error?: string | object) => void
            ) => void,
            cacheMax?: number,
            cacheBuffer?: number
        ): this;
        /**
         * 添加接口元信息
         * @param metas 接口元信息数组
         */
        add(metas: ServiceInterfaceMeta[]): void;

        /**
         * 根据接口元信息创建bag对象
         * @param meta 接口元信息对象或名称字符串
         */
        create(meta: ServiceInterfaceMeta | string): Bag;

        /**
         * 获取元信息对象
         * @param meta 接口元信息对象或名称字符串
         */
        meta(meta: ServiceInterfaceMeta | string): ServiceInterfaceMeta;

        /**
         * 从缓存中获取或创意bag对象
         * @param meta 接口元信息对象或名称字符串
         * @param create 是否是创建新的Bag对象，如果否，则尝试从缓存中获取
         */
        get(meta: ServiceInterfaceMeta | string, create: boolean): Bag;

        /**
         * 从缓存中清除指定接口的数据
         * @param names 逗号分割的接口名称字符串或数组
         */
        clear(names: string | string[]): void;

        /**
         * 从缓存中获取bag对象
         * @param meta 接口元信息对象或名称字符串
         */
        cached(meta: ServiceInterfaceMeta | string): Bag | null;

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
        new (): Service;
        /**
         * 原型
         */
        readonly prototype: Service;
    }
    interface Magix {
        /**
         * 设置或获取配置信息
         * @param cfg 配置信息参数对象
         */
        config<T extends object>(cfg: Config & T): Config & T;

        /**
         * 获取配置信息
         * @param key 配置key
         */
        config<T>(key: string): T;

        /**
         * 获取配置信息对象
         */
        config<T extends object>(): Config & T;
        /**
         * 设置配置信息
         * @param sources 配置信息参数对象
         */
        config(...sources: any[]): any & Config;

        /**
         * 应用初始化入口
         * @param cfg 配置信息参数对象
         */
        boot(cfg?: Config): void;
        /**
         * 取消安装
         */
        unboot(): void;
        /**
         * 把列表转化成hash对象。Magix.toMap([1,2,3,5,6]) => {1:1,2:1,3:1,4:1,5:1,6:1}。Magix.toMap([{id:20},{id:30},{id:40}],'id') => {20:{id:20},30:{id:30},40:{id:40}}
         * @param list 源数组
         * @param key 以数组中对象的哪个key的value做为hash的key
         */
        toMap<T extends object>(list: any[], key?: string): T;
        /**
         * 以try catch方式执行方法，忽略掉任何异常。返回成功执行的最后一个方法的返回值
         * @param fn 函数
         * @param args 参数数组
         * @param context 在待执行的方法内部，this的指向
         */
        toTry<TReturnType, TContextType>(
            fn: (this: TContextType, ...args: any[]) => void,
            args?: any[],
            context?: TContextType
        ): TReturnType;

        /**
         * 以try catch方式执行方法，忽略掉任何异常。返回成功执行的最后一个方法的返回值
         * @param fn 函数数组
         * @param args 参数数组
         * @param context 在待执行的方法内部，this的指向
         */
        toTry<TReturnType>(
            fn: Function,
            args?: any[],
            context?: any
        ): TReturnType;

        /**
         * 转换成字符串路径。Magix.toUrl('/xxx/',{a:'b',c:'d'}) => /xxx/?a=b&c=d
         * @param path 路径
         * @param params 参数对象
         * @param keo 保留空白值的对象
         */
        toUrl(path: string, params?: object, keo?: object): string;
        /**
         * 把路径字符串转换成对象。Magix.parseUrl('/xxx/?a=b&c=d') => {path:'/xxx/',params:{a:'b',c:'d'}}
         * @param url 路径字符串
         */
        parseUrl(url: string): RouterParseParts;
        /**
         * 检测某个对象是否拥有某个属性。
         * @param owner 检测对象
         * @param prop 属性
         */
        has(owner: object, prop: string | number): boolean;

        /**
         * 判断一个节点是否在另外一个节点内，如果比较的2个节点是同一个节点，也返回true
         * @param node 节点或节点id
         * @param container 容器节点或节点id
         * @param ignoreSelf 是否忽略自身的判断
         */
        inside<
            TNode extends HTMLElementOrEventTarget,
            TContainer extends HTMLElementOrEventTarget
        >(
            node: TNode,
            container: TContainer,
            ignoreSelf?: boolean
        ): boolean;

        /**
         * document.getElementById的简写
         * @param id 节点id
         */
        node<T extends HTMLElementOrEventTarget>(id: string): T | null;

        /**
         * 使用加载器的加载模块功能
         * @param deps 模块id
         * @param params 当有require拦截时，传递的参数
         */
        use<T extends object>(
            deps: string | string[],
            params?: any
        ): Promise<T>;

        /**
         * 保护对象不被修改
         * @param o 保护对象
         */
        guard<T extends object>(o: T): T;

        /**
         * 触发事件
         * @param node dom节点
         * @param type 事件类型
         * @param data 数据
         */
        dispatch(
            node: HTMLElementOrEventTarget | Window,
            type: string,
            data?: any
        ): void;
        /**
         * 获取对象类型
         * @param aim 目标对象
         */
        type(aim: any): string;
        /**
         * 向页面追加样式
         * @param key 样式对应的唯一key，该key主要防止向页面反复添加同样的样式
         * @param cssText 样式字符串
         */
        applyStyle(key: string, cssText: string): void;
        /**
         * 向页面追加样式
         * @param atFile 以@:开头的文件路径
         */
        applyStyle(atFile: string): void;
        /**
         * 生成唯一的guid
         * @param prefix guid的前缀，默认mx-
         */
        guid(prefix?: string): string;
        /**
         * 获取异步标识
         * @param host 宿主对象
         * @param key 标识key
         */
        mark(host: object, key: string): () => boolean;
        /**
         * 销毁所有异步标识
         * @param host 宿主对象
         */
        unmark(host: object): void;

        /**
         * 任务队列空闲至多少毫秒
         * @param time 至少等多久
         */
        taskIdle(time: number): Promise<void>;

        /**
         * 安排、优化待执行的函数
         * @param fn 执行函数
         * @param args 参数
         * @param context this指向
         * @param id 任务id,当指定id且同样id有多个时,会取消前面的执行
         */
        task<TArgs, TContext>(
            fn: (this: TContext, ...args: TArgs[]) => void,
            args?: TArgs[],
            context?: TContext,
            id?: string
        ): void;

        /**
         * 最后安排、优化待执行的函数
         * @param fn 执行函数
         * @param args 参数
         * @param context this指向
         * @param id 任务id,当指定id且同样id有多个时,会取消前面的执行
         */
        lowTask<TArgs, TContext>(
            fn: (this: TContext, ...args: TArgs[]) => void,
            args?: TArgs[],
            context?: TContext,
            id?: string
        ): void;

        /**
         * 等待任务完成
         */
        taskFinale<TContext>(): Promise<TContext>;

        /**
         * 等待最后的任务完成
         */
        lowTaskFinale<TContext>(): Promise<TContext>;

        /**
         * 取消任务
         * @param id 任务id
         */
        taskCancel(id: string): void;

        /**
         * 检测某个任务是否完成
         * @param fn 完成后执行的函数
         */
        //taskComplete<TArgs>(fn: (...args: TArgs[]) => void): (...args: TArgs[]) => void
        /**
         * 复制一个或多个对象属性到目标对象上，并返回该对象。
         * @param target 目标对象.
         * @param source 复制对象.
         */
        mix<T, U>(target: T, source: U): T & U;

        /**
         * 复制一个或多个对象属性到目标对象上，并返回该对象。
         * @param target 目标对象.
         * @param source1 第一个复制对象.
         * @param source2 第二个复制对象.
         */
        mix<T, U, V>(target: T, source1: U, source2: V): T & U & V;

        /**
         * 复制一个或多个对象属性到目标对象上，并返回该对象。
         * @param target 目标对象.
         * @param source1 第一个复制对象.
         * @param source2 第二个复制对象.
         * @param source3 第三个复制对象.
         */
        mix<T, U, V, W>(
            target: T,
            source1: U,
            source2: V,
            source3: W
        ): T & U & V & W;

        /**
         * 复制一个或多个对象属性到目标对象上，并返回该对象。
         * @param target 目标对象.
         * @param sources 一个或多个复制对象
         */
        mix(target: object, ...sources: any[]): any;

        /**
         * 监听事件
         * @param target 监听对象
         * @param type 监听类型
         * @param listener 监听回调
         * @param options 监听选项
         */
        attach(
            target: Window | EventTarget,
            type: string,
            listener: EventListenerOrEventListenerObject | null,
            options?: AddEventListenerOptions | boolean
        ): void;
        /**
         * 解除监听事件
         * @param target 监听对象
         * @param type 监听类型
         * @param listener 监听回调
         * @param options 监听选项
         */
        detach(
            target: Window | EventTarget,
            type: string,
            listener: EventListenerOrEventListenerObject | null,
            options?: EventListenerOptions | boolean
        ): void;

        /**
         * 批量监听事件
         * @param targets 监听对象列表
         * @param type 监听类型
         * @param listener 监听回调
         * @param options 监听选项
         */
        attachAll(
            targets: (Window | EventTarget)[],
            type: string,
            listener: EventListenerOrEventListenerObject | null,
            options?: AddEventListenerOptions | boolean
        ): void;
        /**
         * 解除监听事件
         * @param targets 监听对象列表
         * @param type 监听类型
         * @param listener 监听回调
         * @param options 监听选项
         */
        detachAll(
            target: (Window | EventTarget)[],
            type: string,
            listener: EventListenerOrEventListenerObject | null,
            options?: EventListenerOptions | boolean
        ): void;

        /**
         * 推迟多少毫秒
         * @param time 以ms为单位的时间
         */
        delay(time: number): Promise<void>;
        /**
         * 事件最高优先级
         */
        HIGH: number;
        /**
         * 事件最低优先级
         */
        LOW: number;

        /**
         * 接管管理类
         */
        Service: ServiceConstructor;

        /**
         * 是否为对象
         * @param o 测试对象
         */
        isObject(o): boolean;
        /**
         * 是否为数组
         * @param o 检测对象
         */
        isArray(o): boolean;
        /**
         * 是否为函数
         * @param o 检测对象
         */
        isFunction(o): boolean;
        /**
         * 是否为字符串
         * @param o 检测对象
         */
        isString(o): boolean;
        /**
         * 是否为数字
         * @param o 检测对象
         */
        isNumber(o): boolean;
        /**
         * 等待相应的选择器就绪
         * @param selector 选择器
         * @param timeout 超时时间，默认30s
         * @param context 上下文，默认document
         */
        waitSelector(
            selector: string,
            timeout?: number,
            context?: Element
        ): Promise<Element>;
        /**
         * 是否为原始值
         * @param o 检测对象
         */
        isPrimitive(o): boolean;

        /**
         * view类
         */
        View: ViewConstructor;
        /**
         * 缓存类
         */
        Cache: CacheConstructor;

        /**
         * 状态对象
         */
        State: State;

        /**
         * 事件对象
         */
        Event: Event;

        /**
         * 路由对象
         */
        Router: Router;
        /**
         * Vframe类
         */
        Vframe: VframeConstructor;
    }
}
declare namespace Magix5 {
    interface Magix {
        default: this;
    }
}
declare module 'magix5' {
    const Magix: Magix5.Magix;
    export = Magix;
}
