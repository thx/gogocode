/*md5:b45f16b6c32c467229e98beaf7e74a59*/
//#gallery-config
let DirectionMap = {
  'row': 'row',
  'col': 'column'
}
let JustifyMap = {
  'left': 'flex-start',
  'right': 'flex-end',
  'center': 'center',
  'space-between': 'space-between',
  'space-around': 'space-around'
}
let AlignMap = {
  'top': 'flex-start',
  'bottom': 'flex-end',
  'center': 'center',
  'stretch': 'stretch'
}

let ProcessAttr = (attrs, style, ignores, className) => {
  let attrStr = '',
      classAdded = false,
      styleAdded = false;
  for (let p in attrs) {
      if (ignores[p] !== 1) {
          let v = attrs[p];
          if ((p == 'class') && className) {
              attrStr += ` class="${className} ${v}"`;
              classAdded = true;
          } else if ((p == 'style') && style) {
              attrStr += ` style="${style};${v}"`;
              styleAdded = true;
          } else {
              if (v === true) v = '';
              else v = '="' + v + '"';
              attrStr += ' ' + p + v;
          }
      }
  }
  if (!classAdded && className) {
      attrStr += ` class="${className}"`;
  }
  if (!styleAdded && style) {
      attrStr += ` style="${style}"`;
  }
  return attrStr;
};
module.exports = {
  'mx-grid.row'(i) {
      let { content, attrsKV } = i;

      let styles = [
          'display: flex'
      ]
      if (attrsKV.width) {
          styles.push(`width: ${attrsKV.width}`);
      }
      if (attrsKV.height) {
          styles.push(`height: ${attrsKV.height}`);
      }

      let direction = DirectionMap[attrsKV.direction || 'row'] || 'row';
      styles.push(`flex-direction: ${direction}`);

      let justify = JustifyMap[attrsKV.justify || 'left'] || 'flex-start';
      styles.push(`justify-content: ${justify}`);

      let align = AlignMap[attrsKV.align || 'stretch'] || 'stretch';
      styles.push(`align-items: ${align}`);

      let gutter = attrsKV.gutter || 0;
      styles.push(`--mx-grid-gutter: ${gutter}`);
      if (direction == 'row') {
          styles.push(`margin-left: calc(0px - var(--mx-grid-gutter) / 2)`);
          styles.push(`margin-right: calc(0px - var(--mx-grid-gutter) / 2)`);
      } else {
          styles.push(`margin-top: calc(0px - var(--mx-grid-gutter) / 2)`);
          styles.push(`margin-bottom: calc(0px - var(--mx-grid-gutter) / 2)`);
      }

      return `<div ${ProcessAttr(attrsKV, styles.join(';'), {
          width: 1,
          height: 1,
          direction: 1,
          justify: 1,
          align: 1,
          gutter: 1,
          content: 1
      })}>${content}</div>`;
  },
  'mx-grid.col'(i) {
      let { content, attrsKV, nodesMap, pId } = i;
      let styles = [];
      let pNode = nodesMap[pId];

      // width > flex
      if (attrsKV.width) {
          styles.push(`flex: 0 0 ${attrsKV.width}`);
      } else {
          let flex = attrsKV.flex || 1;
          styles.push(`flex: ${flex}`);
      }

      if (attrsKV.height) {
          styles.push(`height: ${attrsKV.height}`);
      }

      //检查父标签是mx-grid.row且有gutter属性
      // if (!i.lastElement &&
      //     pNode.tag == 'mx-grid.row' &&
      //     pNode.attrsKV.gutter) {
      //     let dir = `right`;
      //     if (pNode.attrsKV.direction == 'col') {
      //         dir = 'bottom';
      //     }
      //     styles.push(`margin-${dir}:${pNode.attrsKV.gutter}`);
      // }
      if (pNode.tag == 'mx-grid.row' &&
          pNode.attrsKV.gutter) {
          if (pNode.attrsKV.direction == 'col') {
              styles.push(`margin-top: calc(var(--mx-grid-gutter) / 2)`);
              styles.push(`margin-bottom: calc(var(--mx-grid-gutter) / 2)`);
          } else {
              styles.push(`margin-left: calc(var(--mx-grid-gutter) / 2)`);
              styles.push(`margin-right: calc(var(--mx-grid-gutter) / 2)`);
          }
      }

      return `<div ${ProcessAttr(attrsKV, styles.join(';'), {
          width: 1,
          height: 1,
          content: 1
      })}>${content}</div>`;
  },
  'mx-grid'(i) {
      return `<div ${ProcessAttr(i.attrsKV, null, {
          content: 1
      }, 'grid')}>${i.content}</div>`;
  },
  'mx-grid.title'(i) {
      let { content, attrsKV } = i;

      let styles = [
          'padding: 10px 24px'
      ];
      if ((attrsKV.border + '') !== 'none') {
          styles.push('border-bottom: 1px solid var(--color-border)');
      }

      let tmpl = `<div ${ProcessAttr(attrsKV, styles.join(';'), {
          icon: 1,
          tip: 1,
          'icon-tip': 1,
          border: 1,
          content: 1
      }, 'clearfix')}>`;

      // 标题，提示，icon
      tmpl += '<div style="float:left; height: 32px; line-height: 32px; overflow: hidden;">';
      if (attrsKV.icon) {
          tmpl += `<span style="margin-right: 4px; color: #ccc;">${attrsKV.icon}</span>`;
      }
      tmpl += `<span class="grid-title" style="margin-right: 16px;">${attrsKV.content}${attrsKV['icon-tip'] ? `<mx-popover style="margin-left: 3px; color: #ccc;" class="mc-iconfont" tag="i" width="220" content="${attrsKV['icon-tip']}">&#xe7aa;</mx-popover>` : ''}</span>`;
      if (attrsKV.tip) {
          tmpl += `<span style="margin-right: 16px; color: #999;">${attrsKV.tip}</span>`;
      }
      tmpl += '</div>';

      // 筛选项
      if (content) {
          tmpl += `${content}`;
      }

      tmpl += '</div>';
      return tmpl;
  },
  'mx-grid.body'(i) {
      let { content, attrsKV } = i;
      return `<div ${ProcessAttr(attrsKV, 'padding: 16px 24px;', {
          content: 1
      }, 'clearfix')}>${content}</div>`;
  }
};
