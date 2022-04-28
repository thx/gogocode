/*md5:b4f169dff913d8e6d8578d7438a6315a*/
import Magix from 'magix';
const BizCodeMap = {
    'rapid': 'rapid',
    'display': 'display',
    'subway': 'subway',
    'subway-plus': 'subway',
}

let Processed = {};
let ProjectsMap = null;
let XSite = (view, bizCode) => {
    let psed = Magix.config('preparePromises') || Processed;
    let currentName = Magix.config('projectName');
    bizCode = bizCode || BizCodeMap[currentName] || '';

    let index = view.indexOf('/');
    let pkg = index > -1 ? view.substring(0, index) : view;
    if (pkg != currentName) {
        if (!psed[pkg]) {
            if (window.crossConfigs) {
                if (!ProjectsMap) {
                    ProjectsMap = Magix.toMap(window.crossConfigs || [], 'projectName');
                }
                let info = ProjectsMap[pkg];
                if (!info) {
                    throw new Error(`can not find ${pkg} from crossConfigs`);
                }
                if (info.source.endsWith('/')) {
                    info.source = info.source.slice(0, -1);
                }
                let paths = seajs.data && seajs.data.paths;
                if (!paths ||
                    !paths[pkg]) {
                    seajs.config({
                        paths: {
                            [pkg]: info.source
                        }
                    });
                }
                let host = Magix.config(`${pkg}.api.host`);
                if (!host) {
                    Magix.config({
                        [`${pkg}.api.host`]: info.apiHost
                    });
                }
            };

            // 按照bizcode区分
            psed[pkg] = new Promise((resolve, reject) => {
                seajs.use(`${pkg}/prepare`, P => {
                    try {
                        if (P.__esModule) {
                            P = P.default;
                        };
                        // 通用库common-site和common-onebp，bizCode为必传参数
                        P({ bizCode }).then(resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                });
            });
        }
        return psed[pkg];
    }
    return Promise.resolve();
};
export default Magix.View.extend({
    tmpl: '@xsite.html',
    init(data) {
        this.$sign = 0;
        this.on('destroy', () => {
            this.$sign = -1;
        });
        this.assign(data);
    },
    assign(data) {
        let { ...allData } = data;
        this.$view = allData.xview;

        Object.assign(allData, data.params);
        this.$params = allData;
        this.updater.set({
            skeleton: allData.skeleton,
            skeletonParams: allData.skeletonParams || {},
            bizCode: allData.bizCode,
        });

        if (this.$sign > 0) {
            this.updateView();
        }
        return false;
    },
    async updateView() {
        let { bizCode } = this.updater.get();
        let sign = ++this.$sign;
        try {
            await XSite(this.$view, bizCode);
        } catch (ex) {
            let node = Magix.node('xp_' + this.id);
            if (node) {
                node.innerHTML = ex.message || ex;
            }
        }
        if (sign == this.$sign) {
            let vf = Magix.Vframe.get('xp_' + this.id);
            let newPath = Magix.parseUrl(this.$view).path;
            let oldPath = vf && vf.path;
            if (oldPath) {
                oldPath = Magix.parseUrl(oldPath).path;
            }
            let updateByAssign = false;
            let view = vf && vf.$v;
            let hasAssign = view && view.assign;
            updateByAssign = (newPath === oldPath) && hasAssign;
            if (updateByAssign) {
                if (Magix.toTry(view.assign, [this.$params], view)) {
                    view.render();
                }
            } else {
                this.owner.mountVframe('xp_' + this.id, this.$view, this.$params);
            }
        }
    },
    async render() {
        let params = this.$params;
        this.updater.digest({
            skeleton: params.skeleton
        });
        this.updateView();
    },
    /**
     * vf.invoke('callView', name, ...args)
     */
    callView(name, ...args) {
        let vf = Magix.Vframe.get('xp_' + this.id);
        if (vf) {
            return vf.invoke(name, args);
        }
        return null;
    },
    /**
     * 常用方法check包装，方便统一
     */
    check(...args) {
        let vf = Magix.Vframe.get('xp_' + this.id);
        if (vf) {
            return vf.invoke('check', args);
        }
        return null;
    },
    /**
     * 常用方法autoShow包装，方便统一
     */
    autoShow(...args) {
        let vf = Magix.Vframe.get('xp_' + this.id);
        if (vf) {
            return vf.invoke('autoShow', args);
        }
        return null;
    },
    /**
     * 常用方法update包装，方便统一
     */
    update(...args) {
        let vf = Magix.Vframe.get('xp_' + this.id);
        if (vf) {
            return vf.invoke('update', args);
        }
        return null;
    },
});