var book = require('../model/book');
module.exports = (req, res) => {
    var cat = req.query.cat,
        search = req.query.search,
        start = req.query.start,
        next = req.query.next,
        data;
    if(!cat && !search){
      res.send("缺少cat or search！");
      return;
    }
    if(cat){
      data = book.getBookByCat(cat, start || 0);
    }else{
      data = book.getBookBySearch(search, start || 0);
    }
    book.saveDB(data);
    //res.send(data);
    res.render('collect/page/catbook.tpl', {
      body: data,
      next: next || 'no',
      cat: cat,
      search: search,
      start: start || 0
    });
};
