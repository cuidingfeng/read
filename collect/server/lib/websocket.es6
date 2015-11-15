var ws = require("nodejs-websocket");
console.log("开始建立连接...");
var all_conn, callback = [];
var server = ws.createServer(function(conn){
    all_conn = conn;
    conn.on("text", function (str) {
        console.log("收到的信息为:"+str);
        //conn.sendText("success");
        for (var o of callback) {
          console.log(o);
          o.fn(str);
        }
    });
    conn.on("close", function (code, reason) {
        //all_conn = null;
        console.log("关闭连接");
    });
    conn.on("error", function (code, reason) {
        //all_conn = null;
        console.log("异常关闭");
    });
}).listen(8086);
module.exports.send = (str) => {
  //console.log(str);
  if (all_conn) {
    all_conn.sendText(str);
  }else{
    //console.log("WebSocket无效！");
  }
};
module.exports.on = (str, fn) => {
  callback.push({
    "id": str,
    "fn": fn
  });
};
