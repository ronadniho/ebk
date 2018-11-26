let delWhiteSpace = (v) => {
  v = typeof(v) === 'string' ? v : v + '';
  return v.replace(/(^\s+)|(\s+$)/g, '');
}

let getDateFormat = (dateFormat)=>{
  let yyyy = dateFormat.getFullYear();
  let mm = dateFormat.getMonth()+1<10?'0'+(dateFormat.getMonth()+1):dateFormat.getMonth()+1;
  let dd = dateFormat.getDate()<10?'0'+dateFormat.getDate():dateFormat.getDate();
  return `${yyyy}-${mm}-${dd}`
}

let deepClone=(data)=>{
  var type = check(data);
  var obj;
  if(type === 'array'){
    obj = [];
  } else if(type === 'object'){
    obj = {};
  } else {
    //不再具有下一层次
    return data;
  }
  if(type === 'array'){
    for(var i = 0, len = data.length; i < len; i++){
      // obj.push(deepClone(data[i]));
    }
  } else if(type === 'object'){
    for(var key in data){
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
}

export {
  delWhiteSpace,
  getDateFormat,
  deepClone,
}
