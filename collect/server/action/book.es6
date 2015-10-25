var book = require('../model/book');
var db = require('../lib/db');
module.exports = function(req, res){
    db.getBooksBynotok().then((rs) => {

      res.send({
        list: rs,
        size: rs.length
      });
    }, (sql) => {
      res.send('获取未更新完成书籍列表失败，Sql:' + sql);
    });
};

module.exports.get = function(req, res, next){
    if(req.params.id === "updateAllBook"){
      book.updateAllBook();
      res.send("正在更新所有书籍的基本信息……");
    }else if(req.params.id === "recommendBookAll"){
      book.recommendBookAll();
      res.send("正在获取所有书籍的相关书籍……");
    }else{
      res.send("没有接收到命令");
    }
};

module.exports.post = function(req, res, next){
    next(new Error('not implemented'));
};

module.exports.put = function(req, res, next){
    res.send('put book');
};

module.exports.delete = function(req, res, next){
    res.send('delete book ' + req.params.id);
};
