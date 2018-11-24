let delWhiteSpace = (v) => {
  v = typeof(v) === 'string' ? v : v + '';
  return v.replace(/(^\s+)|(\s+$)/g, '');
}


export {
  delWhiteSpace
}
