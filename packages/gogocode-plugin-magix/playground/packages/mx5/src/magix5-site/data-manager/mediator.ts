import Magix, { has } from 'magix5';
let { Event, mix } = Magix;

let isPrimitive = (args) => !args || typeof args != 'object';
/**
 * 数据中价
 * @param data 初始化数据
 */
function DataMediator(data) {
    this['@:{data}'] = data;
    this['@:{async.count}'] = 0;
    this['@:{suspened}'] = 0;
    this['@:{changed}'] = {};
}

mix(DataMediator.prototype, Event, {
    /**
     * 获取指定的数据
     * @param key 指定获取的key
     * @returns 数据
     */
    get(key?: string) {
        let src = this['@:{data}'];
        if (key) {
            src = src[key];
        }
        return src;
    },
    /**
     * 设置数据
     * @param key 数据key
     * @param value 数据
     * @param lazy 懒更新
     */
    set(key: string, newValue: any, lazy?: boolean) {
        let data = this['@:{data}'];
        let oldValue = data[key];
        if (!isPrimitive(newValue) || oldValue != newValue) {
            data[key] = newValue;
            let changed = {
                oldValue,
                newValue,
            };
            this['@:{changed}'][key] = changed;
            if (!this['@:{suspened}']) {
                let refChanged = this['@:{changed}'];
                this['@:{changed}'] = {};
                this['@:{latest.changed}'] = refChanged;
                (lazy === false || !lazy) &&
                    this.fire('update', {
                        from: 'single',
                        changed: refChanged,
                    });
            }
        }
    },
    /**
     * 获取当前变化的keys集合
     */
    queryChanged() {
        return this['@:{latest.changed}'] || {};
    },
    /**
     * 获取当前是否在同步数据的状态
     * @returns 状态
     */
    queryAsyncState() {
        return this['@:{async.count}'];
    },
    /**
     * 增加异步数量
     */
    asyncIncrease() {
        this['@:{async.count}']++;
        this.fire('state');
    },
    /**
     * 减少异步数量
     */
    asyncDecrease() {
        if (this['@:{async.count}']) {
            this['@:{async.count}']--;
            this.fire('state');
        }
    },
    /**
     * 挂起，不派发事件
     */
    suspend() {
        this['@:{suspened}']++;
    },
    /**
     * 继续
     */
    resume() {
        if (this['@:{suspened}']) {
            this['@:{suspened}']--;
            if (!this['@:{suspened}']) {
                let refChanged = this['@:{changed}'];
                this['@:{changed}'] = {};
                this['@:{latest.changed}'] = refChanged;
                this.fire('update', {
                    from: 'batch',
                    changed: refChanged,
                });
            }
        }
    },
});

let DataMediators = Object.create(null);
export default {
    /**
     * 获取数据对象
     * @param key 数据中介key，相同的key返回相同的数据中介
     * @param initialData 初始化数据
     * @returns
     */
    get(key: string, initialData?: Object) {
        let mediator = DataMediators[key];
        if (!mediator) {
            mediator = new DataMediator(initialData || {});
            DataMediators[key] = mediator;
        }
        return mediator;
    },
    set(key, data) {
        let mediator = DataMediators[key];
        if (!mediator) {
            mediator = new DataMediator(data || {});
            DataMediators[key] = mediator;
        } else {
            Object.keys(data).forEach((k) => {
                mediator.set(k, data[k]);
            });
        }
        return mediator;
    },
    /**
     * 判断是否已经存在某个数据对象
     * @param key 数据中介key
     * @returns
     */
    has(key: string) {
        return DataMediators[key];
    },
    /**
     * 删除数据对象
     * @param key 数据中介key
     */
    remove(key: string) {
        delete DataMediators[key];
    },
};
