var request = require('urllib-sync').request;
var md5 = require('MD5');
var http = require('http');
//var logger = require('yog-log').getLogger();//默认通过domain获取，单独使用请传递config

var getUrl = (url, json) => {
  var promise = new Promise(function(resolve, reject){
    var res;
    //res = request(url);
    var req = http.get(url, function(res) {
        var size = 0;
        var chunks = [];
      res.on('data', function(chunk){
          size += chunk.length;
          chunks.push(chunk);
      });
      res.on('end', function(){
          var data = Buffer.concat(chunks, size), jsondata;
          if(json){
            try {
              jsondata = JSON.parse(data.toString());
              resolve(jsondata);
            } catch (e) {
              reject(e.message);
            } finally {

            }
          }else{
            resolve(data.toString());
          }
          //console.log(data.toString())
      });
      req.end();
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
      reject(e.message);
    });
  });
  return promise;
};
var getUrlJson = (url) => {
  console.log(url);
  return getUrl(url, true)
};

module.exports = {
  get: getUrl,

  getJson: getUrlJson,

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
