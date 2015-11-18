var util = require("../lib/util");

/*按分类获取书籍列表*/
var getJson = (type) =>{
	return util.getJson(`http://api.zhuishushenqi.com/tag?gender=${type}`);
};
/*更新书籍所有信息*/
module.exports.getcats = () => {
	var female = getJson('female'), male = getJson('male'), all = Promise.all([male, female]);
	return all;
};
