// #loader=none;
'@./zs_scaffold/public/sea.js';
'@./zs_scaffold/public/jquery.js';
'@./zs_scaffold/public/mx.js';
'@./zs_scaffold/public/tracker.js';
define('$', () => {
    // 兼容 CJS、ESM 模块
    jQuery.__esModule = true
    jQuery.default = jQuery;
    return jQuery;
});

(() => {
    const { seajs, location } = window
    const node = document.getElementById('boot')
    const src = node.src.replace('/boot.js', '')
    const projectName = 'zs_scaffold'

    // let paths = {};
    // (window.crossConfigs || []).forEach(info => {
    //     if (info.source.endsWith('/')) {
    //         info.source = info.source.slice(0, -1);
    //     }
    //     paths[info.projectName] = info.source;
    // });

    seajs.config({
        paths: {
            //...paths,
            [projectName]: `${src}/${projectName}` // 当前项目的
        },
        //alias: {}
    })

    seajs.use(['magix'], (Magix) => {
        const setupEnv = (pkg, cdn, api) => {
            const seajs = window.seajs
            if (!cdn.endsWith('/')) {
                cdn += '/'
            }
            if (cdn.endsWith(pkg + '/')) {
                cdn = cdn.substring(0, cdn.length - pkg.length - 1)
            }
            const paths = seajs.data && seajs.data.paths
            if (!paths ||
                !paths[pkg]) {
                seajs.config({
                    paths: {
                        [pkg]: cdn + pkg
                    }
                })
            }
            const source = Magix.config(`${pkg}.resource`)
            if (!source) {
                Magix.config({
                    [`${pkg}.api.host`]: api,
                    [`${pkg}.resource`]: cdn
                })
            }
        }
        if (window.crossConfigs) {
            for (const e of window.crossConfigs) {
                setupEnv(e.projectName, e.source, e.apiHost)
            }
        }

        // 统一处理错误跳转等操作
        window.addEventListener('mxserviceerror', (e) => {
            //根据errCode实现宿主的逻辑处理
            switch (e.errorCode) {
                case 'LOGINOUT':
                    const loc = Magix.Router.parse();
                    if (loc.hash.path != '/login/index') {
                        location.href = 'index.html?mxredirectUrl=' + encodeURIComponent(location.href) + '#!/login/index'
                    }
                    break;
                case 'NOT_FOUND':
                    // 实体未找到，跳转到错误页面
                    location.href = 'index.html#!/common/error'
                    break;
            }
        })

        Magix.applyStyle('@global.style')

        // medusa：国际版配置
        //      组件里面会优先读取magix.config配置的语言环境
        //      如果需要国际化，则在此处理好配置即可
        //      如不需要国际化，则固定传入zh-cn即可
        let preparePromises = {};
        Magix.config({
            medusa: 'zh-cn',
            projectName,
            preparePromises,
            [`${projectName}.resource`]: src
        })

        let loadCrossPrepare = (module, params) => {
            let index = module.indexOf('/');
            let pkg = index > -1 ? module.substring(0, index) : module;
            if (!preparePromises[pkg]) {
                preparePromises[pkg] = new Promise<void>((resolve, reject) => {
                    if (pkg == projectName) {
                        resolve();
                    } else {
                        let bizCode = params.bizCode || '';
                        seajs.use(`${pkg}/prepare`, P => {
                            try {
                                if (P.__esModule) {
                                    P = P.default;
                                }
                                P({
                                    bizCode
                                }).then(resolve, reject);
                            } catch (error) {
                                reject(error);
                            }
                        });
                    }
                });
            }
            return preparePromises[pkg];
        };
        const usePrepare = () => {
            return new Promise(resolve => {
                seajs.use(`${projectName}/prepare`, (Prepare) => {
                    Prepare.default()
                        .then(resolve)
                        .catch(resolve);
                })
            })
        }
        seajs.use([projectName + '/dataplus/dataplus/analysis', projectName + '/dataplus/dataplus/index'], () => {
            usePrepare().then(() => {
                const deps = [
                    '/gallery/mx-form/index',
                    '/gallery/mx-form/validator',
                    '/gallery/mx-dialog/index'
                ].map(p => projectName + p);

                seajs.use(deps, (Form, Validator, Dialog) => {
                    Magix.View.merge(Form, Validator, Dialog, {
                        ctor() {
                            this.updater.set({
                                viewId: this.id,
                                pkgName: projectName,
                            })
                        }
                    })

                    let { defaultPath, defaultView, routes } = Magix.config(projectName + '.menu');
                    const tracker = new Tracker({
                        pid: projectName,
                        uidResolver: () => {
                            const user = Magix.config(projectName + '.user')
                            return user.userId
                        }
                    })
                    Magix.boot({
                        defaultPath,
                        defaultView,
                        unmatchView: projectName + '/views/pages/common/error',
                        routes,
                        rootId: 'app',
                        async require(modules, params) {
                            let promises = [];
                            for (let m of modules) {
                                promises.push(loadCrossPrepare(m, params));
                            }
                            await Promise.all(promises);
                        },
                        error(e) {
                            console.error(e)
                            tracker.logError(e, {
                                code: 11 // 自定义的错误类型
                            })
                        }
                    })

                    // 预加载静态资源
                    seajs.use([`${projectName}/preloadModule`], (preload) => {
                        preload.default.start()
                    })

                    // 对原生异步promise等进行捕获
                    tracker.install()
                })
            })
        });
    })
})()
