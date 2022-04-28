
/**
 * 扩展magix
 */
declare namespace Magix5 {
    /**
     * view原型链
     */
    interface View {
        $refs: {
            [key: string]: HTMLElement
        }
        /**
         * 弹出确认对话框,该方法来自app/gallery/mx-dialog/index
         * @param content 内容
         * @param enterCallback 确定按钮被点击时的回调
         * @param title 对话框标题
         */
        alert(content: string, enterCallback?: Function, title?: string): void
        /**
         * 弹出询问对话框,该方法来自app/gallery/mx-dialog/index
         * @param content 内容
         * @param enterCallback 确定按钮被点击时的回调
         * @param cancelCallback 确定按钮被点击时的回调
         * @param title 对话框标题
         */
        confirm(content: string, enterCallback?: Function, cancelCallback?: Function, title?: string): void

        /**
         * 弹出自定义对话框
         * @param view magix view 路径
         * @param options 配置对象
         */
        mxDialog(view: string, options: {
            width?: number
            closable?: boolean
            left?: number
            top?: number | string
            [key: string]: any
        }): { close: () => void, whenClose: (callback: () => void) => void }

        fetch(models: Object | Object[], callback?: (this: Magix5.Service, error: Object | string | null, ...args: Magix5.Bag[]) => void): Promise<Magix5.Bag[]>
        /**
         * 保存数据,该方法来自app/services/service
         * @param models 接口名称或对象数组
         * @param callback 全部接口成功时回调
         */
        save(models: Object | Object[], callback?: (this: Magix5.Service, error: Object | string | null, ...args: Magix5.Bag[]) => void): Promise<Magix5.Bag[]>
    }
}