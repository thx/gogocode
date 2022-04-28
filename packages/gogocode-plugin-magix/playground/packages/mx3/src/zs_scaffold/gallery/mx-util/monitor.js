/*md5:9b83c22a1ca6423facb39ce503084867*/
let $ = require('$');
let ICounter = 0;
let Instances = [];
let Doc = $(document);
let Win = $(window);
let Watcher = (e) => {
    for (let i = Instances.length; i--;) {
        let info = Instances[i];
        if (info['@{destroyed}']) {
            Instances.splice(i, 1);
        } else {
            let view = info['@{view}'];
            if (e.type == 'resize' || !view['@{inside}'](e.target)) {
                view['@{hide}']();
            }
        }
    }
};
let Remove = view => {
    let info = Instances[view.id];
    if (info) {
        info['@{destroyed}'] = true;
    }
    delete Instances[view.id];
};
module.exports = {
    '@{add}'(view) {
        Remove(view);
        let info = {
            '@{view}': view
        };
        Instances.push(info);
        Instances[view.id] = info;
    },
    '@{remove}': Remove,
    '@{setup}'() {
        if (!ICounter) {
            Doc.on('mousedown keyup', Watcher);
            Win.on('resize', Watcher);
        }
        ICounter++;
    },
    '@{teardown}'() {
        if (ICounter > 0) {
            ICounter--;
            if (!ICounter) {
                Doc.off('mousedown keyup', Watcher);
                Win.off('resize', Watcher);
            }
        }
    }
};