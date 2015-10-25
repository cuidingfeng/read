var request = require('urllib-sync').request;
var md5 = require('MD5');
//var logger = require('yog-log').getLogger();//默认通过domain获取，单独使用请传递config

var getUrl = (url) => {
  try {
    var res = request(url);
  } catch (e) {
    console.log('同步获取url数据失败：' + url);
    //logger.log('warning','同步获取url数据失败：' + url); //or logger.warning('msg');
    res = request(url);
  } finally {

  }

  return res.data.toString();
};

module.exports = {
  get: (url) => getUrl(url),

  getJson: (url) => JSON.parse(getUrl(url)),

  createId: (...str) => {
    str.forEach( (o, i) => str[i] = md5(o) );
    var id = str.join("");
    id = md5(id).substr(0,24);
    return id;
  },

  cleanObj: (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === undefined) {
        delete obj[key];
      }
    }
  }
};
