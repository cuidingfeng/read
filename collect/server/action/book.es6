var md_book = require('../model/bookdetails');
module.exports = function(req, res){
  md_book.getdata(req.query.id).then( (data) => {
    console.log(data);
    res.render('collect/page/book.tpl', {
      json: data
    });
  }, (error) => {
    console.log("获取书籍信息失败：" + error);
    res.send("获取书籍信息失败：" + error);
  });
};
