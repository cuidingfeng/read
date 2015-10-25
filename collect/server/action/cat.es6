var db = require('../lib/db');
module.exports = (req, res) => {
    var cats = req.query.cat, data;
    if(!cats){
      res.send("缺少cat！");
      return;
    }
    cats.split(",").forEach((o) => {
      db.addCat(o);
    });
    res.send("添加栏目" + cats);
};
