var util = require("../lib/util");
var db = require("../lib/db");

/*获取章节来源列表*/
var _fromList = module.exports.fromList = (fromId = '') =>{
	return util.getJson(`http://api.zhuishushenqi.com/toc?view=summary&book=${fromId}`);
};

/*获取章节列表*/
var _sectionList = module.exports.sectionList = (fromId = '') =>{
	return util.getJson(`http://api.zhuishushenqi.com/toc/${fromId}?view=chapters`);
};

/*获取章节详情*/
var _section = module.exports.section = (url = '') =>{
  url = encodeURIComponent(url);
	return util.getJson(`http://chapter.zhuishushenqi.com/chapter/${url}`);
};

/*保存章节*/
var _addSection = module.exports.addSection = (json) =>{
  db.addSection(json);
};

/*保存书籍全部章节*/
var _addAllSection = module.exports.addAllSection = (bid, fromId) =>{
  var froms = _fromList(fromId);
  if(!froms || froms.length === 0){
    console.log("章节来源列表为空",fromId);
    return false;
  }
  var sort = Math.round(Math.random()*(froms.length-1));
  console.log("sort:"+sort,froms.length);
  console.log(froms);
  var sections = _sectionList(froms[sort]['_id']);
  var secList = sections.chapters, len = secList.length;
  if(len === 0){
    console.log("章节列表为空");
    return false;
  }
  console.log("一共" + len + '个章节');
  secList.forEach(function(o, i){
    var ct = _section(o.link), ok = 1;
    if(!ct){
      ct = {
        chapter:{
          body: '',
          title: ''
        }
      };
      ok = 0;
    }
    console.log(ct);
    _addSection({
      bid: bid,
      url: o.link,
      content: ct.chapter.body,
      title: ct.chapter.title,
      sequence: i,
      updateTime: new Date,
      ok: ok
    });
  });
  return secList;
};
