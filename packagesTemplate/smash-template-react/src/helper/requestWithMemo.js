import axios from 'axios';

const MEMO = {};

export default function requestWithMemo(options) {
  if (![undefined, 'get', 'post'].includes(options.method)) {
    return axios(options);
  }

  const data = getMemo(options);
  if (data) {
    return data;
  }

  return axios(options);
}

function getMemo(options) {
  const { method, url, data } = options;
  let key = url;
  switch (method) {
    case 'get':
    case 'post':
      key += sortJsonIntoString(data);
      break;
  }

  return MEMO(key);
}

function sortJsonIntoString(obj) {
  var keys = [];
  for (var idx in obj) {
    if (obj.hasOwnProperty(idx)) {
      keys.push(idx);
    }
  }
  keys.sort();

  var str = '';
  while (keys.length) {
    var k = keys.pop();
    var v = obj[k];
    str += '&' + k + '=' + JSON.stringify(v);
  }

  return str;
}
