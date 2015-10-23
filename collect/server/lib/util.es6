var request = require('urllib-sync').request;
module.exports = {
  get: function(url){
    var res = request(url);
    return res.data.toString();
  },
  getJson: function(url){
    var res = request(url);
    return JSON.parse(res.data.toString());
  }
};
