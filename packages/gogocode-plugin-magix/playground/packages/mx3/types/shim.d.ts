/// <reference path="../node_modules/@ali/zs-gallery/types/gallery.d.ts" />
/// <reference path="../node_modules/@types/jquery/index.d.ts" />

//shim 文件

declare module "$" {
    export =jQuery
}


declare function define(id: string, f: Function);
declare var DEBUG;
declare var seajs;

