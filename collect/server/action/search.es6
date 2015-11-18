var md_search = require('../model/search');
module.exports = function(req, res){
  var page = req.query.page, tpl = 'collect/widget/catlist/catlist.tpl';
  if(!page){
    page = 0;
    tpl = 'collect/page/cat.tpl';
  }
  md_search.getdata(req.query.key, page).then( (data) => {
    res.render(tpl, {
      title: "搜索：" + req.query.key,
      json: data
    });
	}, (error) => {
		console.log("获取书籍列表失败：" + error);
    res.send("获取书籍列表失败：" + error);
	});
};
