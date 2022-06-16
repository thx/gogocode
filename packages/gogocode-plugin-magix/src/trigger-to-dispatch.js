/** 
  -------- from ---------
  node.trigger({
      type: 'change'
      selected: selectedItem.value,
      text: selectedItem.text,
  })
  --------  to  ---------
  Magix5.dispatch(node, 'change', {
      selected: selectedItem.value,
      text: selectedItem.text,
  });
*/