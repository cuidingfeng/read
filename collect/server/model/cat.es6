var util = require("../lib/util");

/*按分类获取书籍列表*/
var getJson = (tag, page) =>{
	var num = 50, start = page * num;
	return util.getJson(`http://api.zhuishushenqi.com/book/by-tag?tag=${tag}&start=${start}&limit=${num}`);
};

module.exports.getdata = (tag, page = 0) => {
	tag = encodeURI(tag);
	return getJson(tag, page);
};
