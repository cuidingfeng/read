var md_cat = require('../model/cat');
module.exports = function(req, res){
  var page = req.query.page, tpl = 'collect/widget/catlist/catlist.tpl';
  if(!page){
    page = 0;
    tpl = 'collect/page/cat.tpl';
  }
  md_cat.getdata(req.query.tag, page).then( (data) => {
    res.render(tpl, {
      title: req.query.tag,
      json: data
    });
	}, (error) => {
		console.log("获取书籍列表失败：" + error);
    res.send("获取书籍列表失败：" + error);
	});
};
