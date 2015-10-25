var util = require("../lib/util");
var db = require("../lib/db");
/*按分类获取书籍列表*/
var _getBookByCat = module.exports.getBookByCat = (cat, start = 0) =>{
	cat = encodeURI(cat);
	return util.getJson(`http://api.zhuishushenqi.com/book/by-tag?tag=${cat}&start=${start}&limit=100`);
};

/*按搜索书名或作者获取书籍列表*/
var _getBookBySearch = module.exports.getBookBySearch = (query, start = 0) =>{
	query = encodeURI(query);
	return util.getJson(`http://api.zhuishushenqi.com/book/fuzzy-search?query=${query}&start=${start}&limit=100`);
};

/*保存书籍*/
var _saveDB = module.exports.saveDB = (json, sqlType = 'insert') => {
	var now = new Date();
	if(json.ok === false){
		json.books = [];
	}
	json.books.forEach((o, i) => {
		var bid = util.createId(o.title, o.author);
		var post = {
			id: bid,
			tags: o.tags ? o.tags.join(",") : undefined,
			title: o.title,
			author: o.author,
			site: o.site,
			chaptersCount: o.chaptersCount,
			isSerial: o.isSerial === undefined ? undefined : o.isSerial === true? 1: 0,
			lastDate: now,
			pic: o.cover ? o.cover.replace(/^.*?http\:\/\//ig,"http://") : undefined,
			intro: o.longIntro || o.shortIntro,
			cat: o.cat,
			latelyFollower: o.latelyFollower,
			retentionRatio: o.retentionRatio,
			lastChapter: o.lastChapter,
			wordCount: o.wordCount,
			gender: o.gender ? ((gender)=>{
													/*默认男和女都适合（2），只适合男1，只适合女3*/
													var nan = false, nv = false, all = 2;
													for (var gen of gender) {
														if(gen === "male") nan = true;
														if(gen === "female") nv = true;
													}
													if(!nan) all = 3;
													if(!nv) all = 1;
													return all;
												})(o.gender)
											: undefined,
			fromId: o._id,
			ok: 0
		};

		util.cleanObj(post);//过滤值为undefined的属性

		if(sqlType == 'update'){
			post.ok = 1;
			db.updateBook(post);
		}else{
			db.addBook(post); //保存书籍
		}

		//console.log('----------------------------------------------------------------------------\n', post);

		/*保存相关tag关系*/
		o.tags && o.tags.forEach((tag) => {
			db.addTag(tag);
			db.addBookTag({
				id: util.createId(tag, bid),
				tag: tag,
				bid: bid
			});
		});
	});
};

/*获取相关书籍*/
var recommendBook = module.exports.recommendBook = (fromId) => {
	var json = util.getJson(`http://api.zhuishushenqi.com/book/${fromId}/recommend`);
	_saveDB(json);
	db.recommendBookOk(fromId).then( (rs) => {
		console.log("-------------------更新recmdLast:", rs);
	});//更新book表中获取相关书籍时间
	return json;
};


/*获取近期未更新的相关书籍*/
module.exports.recommendBookAll = () => {
	db.getBooksBynotrecmd().then((rs) => {
		rs.forEach((mrs) => recommendBook(mrs.fromId));
	}, (sql) => {
		console.log('获取近期未更新的相关书籍列表失败，Sql:' + sql);
	});
};


/*更新书籍所有信息*/
var updateBook = module.exports.updateBook = (fromId) => {
	var json = util.getJson(`http://api.zhuishushenqi.com/book/${fromId}`);
	_saveDB({
		ok: true,
		books: [json]
	}, 'update');
	return json;
};

/*更新书籍所有信息*/
module.exports.updateAllBook = () => {
	db.getBooksBynotok().then((rs) => {
		rs.forEach((mrs) => updateBook(mrs.fromId));
	}, (sql) => {
		console.log('获取未更新完成书籍列表失败，Sql:' + sql);
	});
};
