var md_bookshop = require('../model/bookshop');
module.exports = function(req, res){
  md_bookshop.getcats().then( (datas) => {
    res.render('collect/page/bookshop.tpl', {
      male: datas[0],
      female: datas[1]
    });
	}, (error) => {
		console.log("获取分类信息失败：" + error.message);
    res.send("获取分类信息失败：" + error.message);
	});
};
