var util = require("../lib/util");
module.exports.getData = function(tagName){
	tagName = encodeURI(tagName);
	return util.getJson(`http://api.zhuishushenqi.com/book/by-tag?tag=${tagName}&start=0&limit=50`);
};
module.exports.saveDB = function(json){
	var db = require("../lib/mysql"), now = new Date();
	if(json.ok === false){
		json.books = [];
	}
	console.log(json);
	json.books.forEach(function(o, i){
		var post = {
			tags: o.tags.join(","),
			title: o.title,
			author: o.author,
			site: o.site,
			lastDate: now,
			pic: o.cover,
			intro: o.shortIntro
		};
		var query = db.query('INSERT INTO book SET ?', post, function(err, rows, fields) {
		  if (err) throw err;
		});
		//console.log(query.sql);
	});
	//db.end();
};
