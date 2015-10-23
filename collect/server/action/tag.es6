var util = require('../lib/util.js');
var tagmd = require('../model/tag.js');
module.exports = function(req, res){
    var tagName = req.query.tag, data;
    if(!tagName){
      res.send("缺少tag！");
      return;
    }
    data = tagmd.getData(tagName);
    tagmd.saveDB(data);
    res.send(data);
};
