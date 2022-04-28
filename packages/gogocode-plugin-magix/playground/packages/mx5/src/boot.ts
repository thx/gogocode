// magix-composer#loader=none;

'src@:./lib/sea.js';
'compiled@:./lib/magix.js';
(() => {
    const node = document.getElementById('boot') as HTMLScriptElement;
    const src = node.src.replace('/boot.js', '');
    const projectName = 'magix5-site';
    let seajs = window.seajs;
    seajs.config({
        paths: {
            [projectName]: src + '/' + projectName,
        },
        alias: {
            highlight: projectName + '/web_modules/highlight.js',
        },
    });

    seajs.use(['magix5'], (Magix: Magix5.Magix) => {
        Magix.attach(window, 'loginout', () => {
            const loc = Magix.Router.parse();
            if (loc.hash.path != '/login/index') {
                location.href =
                    'index.html?mxredirectUrl=' +
                    encodeURIComponent(location.href) +
                    '#!/login/index';
            }
        });
        Magix.applyStyle('as@:./magix5-site/gallery/mx-style/group.less');
        Magix.applyStyle('as@:./magix5-site/gallery/mx-style/normalize.less');
        Magix.applyStyle('as@:./magix5-site/gallery/mx-style/icons.less');
        Magix.applyStyle('as@:./magix5-site/gallery/mx-style/util.less');
        Magix.applyStyle('as@:./magix5-site/gallery/mx-style/btn.less');
        Magix.applyStyle('as@:./magix5-site/gallery/mx-style/effect.less');
        Magix.applyStyle('as@:./magix5-site/gallery/mx-style/form.less');

        // medusa：国际版配置
        //      组件里面会优先读取magix.config配置的语言环境
        //      如果需要国际化，则在此处理好配置即可
        //      如不需要国际化，则固定传入zh-cn即可
        Magix.config({
            medusa: 'zh-cn',
            projectName,
            [`${projectName}.resource`]: src,
        });
        const usePrepare = () => {
            return new Promise((resolve) => {
                seajs.use([`${projectName}/prepare`], (Prepare) => {
                    Promise.all([Prepare.default()])
                        .then(resolve)
                        .catch(resolve);
                });
            });
        };

        usePrepare().then(() => {
            const deps = [];
            ['/menu'].forEach((dep) => {
                deps.push(projectName + dep);
            });

            seajs.use(deps, (Menu) => {
                const routes = Menu.default.getRoutes(projectName);

                Magix.View.merge({
                    ctor() {
                        this.set({
                            pkgName: projectName,
                            galleryName: 'gallery',
                        });
                    },
                });

                Magix.boot({
                    defaultPath: '/home',
                    defaultView: '/default',
                    unmatchView: projectName + '/views/pages/home',
                    routes,
                    rootId: 'app',
                    error(e) {
                        console.error(e);
                        // tracker.logError(e, {
                        //   code: 11 // 自定义的错误类型
                        // })
                    },
                });
            });
        });
    });
    // })
})();
