/**
 * 组件
 */
declare namespace MagixGallery {
    /**
     * 对话框选项
     */
    interface DialogOptions {
        /**
         * 宽度
         */
        width: number
        /**
         * 是否有遮盖
         */
        mask: boolean
        /**
         * 是否有关闭按钮
         */
        closable: boolean
        /**
         * left
         */
        left: number
        /**
         * top
         */
        top: number
    }
    /**
     * 对话框返回值
     */
    interface DialogReturned {
        /**
         * 关闭前动作
         * @param fn 关闭前回调
         */
        beforeClose(fn: Function): void
        /**
         * 关闭弹出框
         */
        close(): void
        /**
         * 关闭后动作
         * @param fn 关闭后回调
         */
        afterClose(fn: Function): void
    }
}
/**
 * 根据项目中的情况，扩展挂到magix中view上的方法
 */
declare namespace Magix3 {
    export interface ViewPrototype {
        /**
         * 通知父view数据变化,该方法来自app/gallery/mx-form/index
         * @param values 变化的数据对象
         */
        triggerParent(values: Object): void
        /**
         * 从某个对话上根据keys获取子对象,该方法来自app/gallery/mx-form/index
         * @param data 源对象
         * @param keys 要复制的keys
         */
        fromKeys(data: Object, keys: string | string[]): Object
        /**
         * 验证当前view输入是否合法,该方法来自app/gallery/mx-form/index
         * @param ref 不合法的节点id数组
         */
        isValid(ref?: string[]): boolean
        //--------------以下加入"services/service.js"中的方法
        /**
         * 获取当前项目中的Service对象
         */
        getService(): Magix3.Service
        /**
         * 实例化请求对象,该方法来自app/services/service
         * @param  key 请求的key，相同key值的会自动取消上一次的请求
         */
        request(key?: string): Magix3.ServicePrototype
        /**
         * 获取数据,该方法来自app/services/service
         * @param models 接口名称或对象数组
         * @param callback 全部接口成功时回调
         */
        fetch(models: String | String[] | Object | Object[], callback: (this: Magix3.ServicePrototype, error: Object | string | null, ...args: Magix3.Bag[]) => void): void

        fetch(models: String | String[] | Object | Object[]): Promise<Magix3.Bag[]>
        /**
         * 保存数据,该方法来自app/services/service
         * @param models 接口名称或对象数组
         * @param callback 全部接口成功时回调
         */
        save(models: String | String[] | Object | Object[], callback: (this: Magix3.ServicePrototype, error: Object | string | null, ...args: Magix3.Bag[]) => void): void

        save(models: String | String[] | Object | Object[]): Promise<Magix3.Bag[]>
        /**
         * 锁定，当相同key未解锁时，后续的fn不再被调用,该方法来自app/services/service
         * @param key 锁定使用的key
         * @param fn 待执行的方法
         */
        lock(key: string, fn: Function): void
        /**
         * 解锁,该方法来自app/services/service
         * @param key 锁定使用的key
         */
        unlock(key: string): void

        //----------以下加入gallery/mx-dialog/index.js中的方法
        /**
         * alert框
         * @param title 标题
         * @param content 内容
         * @param enterCallback 确定时的回调
         * @param dialogOptions 对话框其它选项
         */
        alert(title: String, content?: string, enterCallback?: () => void, dialogOptions?: MagixGallery.DialogOptions): MagixGallery.DialogReturned


        /**
         * confirm
         * @param viewOtpions view配置
         * @param dialogOptions 对话框其它选项
         */
        confirm(viewOtpions: object, dialogOptions?: MagixGallery.DialogOptions): MagixGallery.DialogReturned

        /**
         * 弹出自定义view对话框,该方法来自app/gallery/mx-dialog/index
         * @param viewPath 形如app/dialogs/user路径
         * @param viewOptions view配置
         * @param dialogOptions 对话框配置项
         */
        mxDialog(viewPath: string, viewOptions?: object, dialogOptions?: MagixGallery.Dialog.DialogOptions): MagixGallery.Dialog.DialogReturned
    }
}