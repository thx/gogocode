/*md5:d226cba198574e2d2171d373959e04ab*/
/**
 * document.execCommand("copy")
 * select() 方法只对 <input> 和 <textarea> 有效，对于其他标签不好使（只能操作可编辑区域）
 * 解决方案：在页面中添加一个 <textarea>，然后把它隐藏掉，点击按钮的时候，先把 <textarea> 的 value 改为 要复制的内容，然后复制 <textarea> 中的内容
 */
import Magix from 'magix';

export =  {
    copy(text) {
        return new Promise((resolve, reject) => {
            // 创建节点
            let input = document.createElement('input');
            document.body.appendChild(input);
            input.id = this.id + Magix.guid('_copy');
            input.style.position = 'absolute';
            input.style.opacity = '0';
            input.setAttribute('value', text);
            input.select();

            // 复制
            try {
                document.execCommand('copy');
                resolve();
            } catch (e) {
                reject();
            }

            // 移除节点
            document.body.removeChild(input);
        })
    }
}
