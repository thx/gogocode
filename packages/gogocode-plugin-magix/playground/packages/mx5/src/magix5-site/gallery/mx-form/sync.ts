import Magix from 'magix5';
let { has, mark, toMap, applyStyle, task, isObject, isArray } = Magix;
applyStyle('@:./sync.less');
let emptyObject = {};
let errorSelector = '@:./sync.less:error-input';
let noneSelector = '@:scoped.style:none';
let showOrHideTip = (classList, viewId, expr, hide, msg?: string) => {
  if (hide) {
    classList.remove(errorSelector);
  } else {
    classList.add(errorSelector);
  }
  let tipNodes = document.querySelectorAll(
    `[mx5-host="${viewId}"][vd-msg-for="${expr}"]`
  );
  for (let i = tipNodes.length; i--; ) {
    let tipNode = tipNodes[i];
    if (tipNode) {
      let tipNodeClassList = tipNode.classList;
      if (hide) {
        tipNodeClassList.add(noneSelector);
      } else {
        tipNodeClassList.remove(noneSelector);
        tipNode.innerHTML = msg;
      }
    }
  }
};
let rules = {
  required(value, rule) {
    // {{: expr & {required:true} }} 或 {{: expr & {required:[true,'custom message']} }}
    let test, msg;
    if (isArray(rule)) {
      [test, msg] = rule;
    } else {
      test = rule;
      msg = '请输入内容';
    }
    if (test && !value.trim()) {
      return msg;
    }
  },
};
let isInvalid = (value, actions) => {
  for (let p in actions) {
    if (has(actions, p)) {
      let rule = rules[p];
      if (rule) {
        let r = rule(value, actions[p]);
        if (r) {
          return r;
        }
      }
    }
  }
  return false;
};
let syncUIFromData = (view, rootData, e, check) => {
  if (check()) {
    let ctrls = e.getAttribute('mx5-ctrl');
    let exprs = view.parse(ctrls);
    for (let expr of exprs) {
      let ps = expr[0].split('.');
      let data = rootData;
      while (data && ps.length) {
        let temp = ps.shift();
        data = data[temp];
      }
      if (!ps.length) {
        if (data != null) {
          if (e.type == 'checkbox' || e.type == 'radio') {
            if (data === true) {
              e.checked = true;
            } else if (data == false) {
              e.checked = false;
            } else {
              let value = e.value;
              if (isArray(data)) {
                let findIndex = -1;
                for (let i = data.length; i--; ) {
                  if (value == data[i]) {
                    findIndex = i;
                    break;
                  }
                }
                e.checked = findIndex != -1;
              } else if (isObject(data)) {
                e.checked = has(data, value);
              } else {
                e.checked = value == data;
              }
            }
          } else if (e.tagName == 'SELECT') {
            let options = (e as any).options as HTMLOptionsCollection;
            if (e.multiple) {
              let map;
              if (isArray(data)) {
                map = toMap(data);
              } else if (isObject(data)) {
                map = data;
              } else {
                map = {
                  [data]: 1,
                };
              }
              for (let i = 0; i < options.length; i++) {
                let option = options[i];
                if (has(map, option.value)) {
                  option.selected = true;
                }
              }
            } else {
              for (let i = 0; i < options.length; i++) {
                let option = options[i];
                if (option.value == data) {
                  option.selected = true;
                  break;
                }
              }
            }
          } else {
            e.value = data;
          }
        }
      }
    }
  }
};
export default {
  ctor() {
    this.on('domready', () => {
      let list = document.querySelectorAll<HTMLInputElement>(
        `input[mx5-ctrl][mx5-host="${this.id}"],select[mx5-ctrl][mx5-host="${this.id}"],textarea[mx5-ctrl][mx5-host="${this.id}"]`
      );
      let rootData = this.get(); // rootData
      let readyMark = mark(this, '@:{dom.ready.mark}');
      // 将每一项都添加task中
      for (let i = list.length; i--; ) {
        let e = list[i];
        task(syncUIFromData, [this, rootData, e, readyMark]);
      }
      let indets = document.querySelectorAll<HTMLInputElement>(
        `input[type="checkbox"][mx5-host="${this.id}"]`
      );
      for (let i = indets.length; i--; ) {
        let e = indets[i];
        e.indeterminate = e.hasAttribute('indeterminate');
      }
    });
  },
  isValid() {
    debugger;
  },
  '$[mx5-ctrl]<change,input,focusout>'(e: Magix5.MagixMixedEvent) {
    let { eventTarget, type } = e; // target：使用该组件的view，'target':事件的类型
    let ownerId = eventTarget.getAttribute('mx5-host');
    if (ownerId != this.id || e['@:{halt}']) return;
    e['@:{halt}'] = 1;
    let ctrls = eventTarget.getAttribute('mx5-ctrl'); // 获取mx5-ctrl属性，大概是这个样的[['username',{refresh:true},'value']]
    let exprs = this.parse(ctrls); // 获得一个proxy对象
    let dataRoot = this.get(); // 该view的state对象
    let refresh = false;

    for (let ctrl of exprs) {
      let [p, f, a] = ctrl; // ['username',{refresh:true},'value']
      // 绑定节点
      let ps = p.split('.');
      // 校验规则
      let actions = f || emptyObject; // {refresh:true}
      let key = ps.pop(), // 'username'
        temp,
        value,
        rootKey = ps[0] || key; // 'username'
      let object = dataRoot;
      let dataOfRootKey = dataRoot[rootKey], // 此时输入框的值
        topLevel = true;
      while (object && ps.length) {
        temp = ps.shift();
        object = object[temp];
        topLevel = false;
      }
      let targetAsSelect = eventTarget as HTMLSelectElement;
      let targetAsInput = eventTarget as HTMLInputElement;
      let src = object[key]; // 当前输入框的值
      if (targetAsSelect.tagName == 'SELECT') {
        if (targetAsSelect.multiple) {
          let map = {};
          let options = targetAsSelect.options;
          for (let i = 0; i < options.length; i++) {
            let option = options[i];
            if (option.selected) {
              map[option.value] = 1;
            }
          }
          if (isObject(src)) {
            value = map;
          } else {
            value = Object.keys(map);
          }
        } else {
          value = targetAsSelect.value;
        }
      } else if (targetAsInput.type == 'checkbox') {
        let checked = targetAsInput.checked;
        if (src === true || src === false) {
          value = checked;
        } else {
          value = targetAsInput.value.trim();
          if (isArray(src)) {
            let checkboxName = targetAsInput.name;
            if (checkboxName) {
              src = [];
              let checkboxes = document.querySelectorAll<HTMLInputElement>(
                `input[name="${checkboxName}"]:checked`
              );
              for (let i = 0; i < checkboxes.length; i++) {
                let box = checkboxes[i];
                let value: string | number;
                value = box.value;
                if (actions.number) {
                  value = parseFloat(value);
                }
                let idx = src.indexOf(value);
                if (idx == -1) {
                  src.push(value);
                }
              }
            } else {
              let findIndex = -1;
              for (let i = src.length; i--; ) {
                if (src[i] == value) {
                  findIndex = i;
                  break;
                }
              }
              if (checked) {
                if (findIndex === -1) {
                  src.push(value);
                }
              } else {
                if (findIndex > -1) {
                  src.splice(findIndex, 1);
                }
              }
            }
            value = src;
          } else if (isObject(src)) {
            if (checked) {
              src[value] = true;
            } else {
              delete src[value];
            }
            value = src;
          } else {
            value = checked ? value : '';
          }
        }
      } else if (targetAsInput.type == 'radio') {
        let radioName = targetAsInput.name;
        value = document.querySelector<HTMLInputElement>(
          `input[name="${radioName}"]:checked`
        ).value;
      } else if ('value' in targetAsSelect) {
        value = targetAsInput.value; // 默认情况
      }
      //处理多绑定时，值从event对象上读取
      if (has(e, a)) {
        value = e[a];
      }
      if (has(e, actions.read)) {
        value = e[actions.read];
      }
      let classList = targetAsInput.classList; // 类名
      let syncData = type == 'input' || type == 'change';
      // if (type == 'focusin') {//聚焦时隐藏当前错误框及提示
      //     showOrHideTip(classList, this.id, p, true);
      // } else
      // 验证输入
      if (type == 'focusout' || type == 'input') {
        let invalid = isInvalid(value, actions);
        if (invalid) {
          showOrHideTip(classList, this.id, p, false, invalid);
        } else {
          showOrHideTip(classList, this.id, p, true);
        }
      }
      //   debugger;
      // 设置值
      if (syncData) {
        if (topLevel) {
          this.set({
            [rootKey]: value,
          });
        } else {
          if (object) {
            object[key] = value;
          } else {
            console.warn('can not set by path:', p);
          }
          this.set({
            [rootKey]: dataOfRootKey,
          });
        }
        if (actions.refresh) {
          refresh = true;
        }
      }
    }
    if (refresh) {
      clearTimeout(this['@:{delay.timer}']);
      let delayMark = mark(this, '@:{delay.mark}');
      this['@:{delay.timer}'] = setTimeout(() => {
        if (delayMark()) {
          this.digest(); // 更新视图
        }
      }, 100);
    }
  },
};
