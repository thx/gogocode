/** 
  -------- from ---------
  node.trigger({
      type: 'change'
      selected: selectedItem.value,
      text: selectedItem.text,
  })
  --------  to  ---------
  Magix5.dispatch(node[0], 'change', {
      selected: selectedItem.value,
      text: selectedItem.text,
  });

  -------- from ---------
  node.trigger(event)
  --------  to  ---------
  Magix5.dispatch(node[0], event.type, event);


  -------- from ---------
  $.Event('change', x)
  --------  to  ---------
  Object.assign({ type: 'change' }, x);
*/

module.exports = function ({ script, template }) {
    if (!script) {
        return { script, template };
    }

    script.replace(`$.Event($_$1, $_$2)`, `Object.assign({ type: $_$1 }, $_$2)`);
    script.replace(`$.Event($_$1)`, `$_$1`);


    script.replace(`$_$1.trigger({ type: $_$2, $$$1 })`, `Magix5.dispatch($_$1[0], $_$2, { $$$1 })`);
    script.replace(`$_$1.trigger($_$2)`, (match) => {
        const isStringType = match?.[2]?.[0]?.node?.type === 'StringLiteral';
        return isStringType ? `Magix5.dispatch($_$1[0], $_$2)` : `Magix5.dispatch($_$1[0], $_$2.type , $_$2)`;
    });

    return { script, template };
};
