var util = require("../lib/util");

/*按分类获取书籍列表*/
var getJson = (key, page) =>{
	var num = 50, start = page * num;
	return util.getJson(`http://api.zhuishushenqi.com/book/fuzzy-search?query=${key}&start=${start}&limit=${num}`);
};

module.exports.getdata = (key, page) => {
	key = encodeURI(key);
	return getJson(key, page);
};
