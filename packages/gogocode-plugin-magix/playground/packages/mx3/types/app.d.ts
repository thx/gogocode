/// <reference path="../node_modules/@ali/zs-gallery/types/gallery.d.ts" />
/**
 * 项目中的接口定义
 */
declare namespace App {
    /**
     * 列表对象
     */
    type PageList = {
        headers: string[]
        total: number
        page: string
        size: string
        list: Object[]
    }
}