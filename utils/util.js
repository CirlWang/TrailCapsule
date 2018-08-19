const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function json2Fom(json){
  var str = [];
  for(var p in json){
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
}

//检测session是否过期
function sessionDataOut(code) {
  if(code == "1000"){
    getApp().Login();
    return true;
  }

  return false;
}

module.exports = {
  formatTime: formatTime,
  json2Form:json2Fom,
  sessionDataOut: sessionDataOut,
}

