/**
 * 每次项目各自的通用方法定义
 * 具体页面继承该View
 * 包括挂在在view上的接口管理的fetch，save
 */
import Magix from 'magix5';
import ProjectService from './services/service';
import FormSync from './gallery/mx-form/sync';
import Refs from './gallery/mx-form/refs';

export default Magix.View.extend({
    scroll(id) {
        const targetNode = Magix.node<HTMLDivElement>(id);
        targetNode.scrollIntoView({ behavior: 'smooth' });
    },
}).merge(ProjectService, FormSync, Refs);
