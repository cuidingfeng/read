var section = require('../model/section');
var db = require('../lib/db');
module.exports = function(req, res){
    var data = section.addAllSection("00f3c64adeeab438a47ea2f9", '53d0dffc690db9e47ccee4ac');
    res.send('data');
};
