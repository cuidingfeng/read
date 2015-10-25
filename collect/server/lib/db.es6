var db = require("../lib/mysql");
var util = require("../lib/util");
var insert = (table, post) => {
  var select = new Promise((resolve,reject) => {
    var query = db.query(`select id from ${table} where id="${post.id}"`, (err, rows, fields) => {
      if (err) throw err;
      if(rows.length === 0){
        resolve();
      }else{
        reject(rows);
      }
    });
    //console.log(query.sql);
  });
  select.then(() => {
    var query = db.query(`INSERT INTO ${table} SET ?`, post, (err, rows, fields) => {
      //if (err) throw err;
    });
    //console.log(query.sql);
  }, (rs) => {
    //console.log(rs[0]);
  });
};
module.exports = {
  addBook: (post) => {
    insert("book", post);
  },
  addCat: (title) => {
    insert("cat", {
      id: util.createId(title),
      title: title
    });
  },
  addTag: (title) => {
    insert("tag", {
      id: util.createId(title),
      title: title
    });
  },
  addBookTag: (post) => {
    insert("booktag",post);
  },
  recommendBookOk: (fromId) => {
    return new Promise((resolve,reject) => {
      var query = db.query(`update book set recmdLast = now() where fromId='${fromId}'`, (err, rows, fields) => {
        if(!err){
          resolve(rows);
        }else{
          reject(query.sql);
        }
      });
    });
  },
  getBooksBynotok: () => {
    return new Promise((resolve,reject) => {
      var query = db.query(`select id, fromId from book where ok!=1`, (err, rows, fields) => {
        if(!err){
          resolve(rows);
        }else{
          reject(query.sql);
        }
      });
    });
  },
  getBooksBynotrecmd: () => {
    return new Promise((resolve,reject) => {
      var query = db.query(`select id, fromId from book where TIMESTAMPDIFF(DAY, book.recmdLast, NOW()) > 0 or book.recmdLast is null`, (err, rows, fields) => {
        if(!err){
          resolve(rows);
        }else{
          reject(query.sql);
        }
      });
    });
  },
  updateBook: (post) => {
    return new Promise((resolve,reject) => {
      var query = db.query(`update book set ? where fromId='${post.fromId}'`, post, (err, rows, fields) => {
        if(!err){
          resolve(rows);
        }else{
          reject(query.sql);
        }
      });
    });
  }
};

//db.end();
