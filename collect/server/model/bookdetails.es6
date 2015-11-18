var util = require("../lib/util");

/*按分类获取书籍列表*/
var getJson = (id) =>{
	return util.getJson(`http://api.zhuishushenqi.com/book/${id}`);
};

module.exports.getdata = (id) => {
	return getJson(id);
};
