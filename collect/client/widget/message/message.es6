if(window.WebSocket){
    var ws = new WebSocket(`ws://${location.hostname}:8086`);
    var socketbox = document.querySelector('#socketbox');
    ws.onopen = function(e){
        console.log("连接服务器成功");
        ws.send("game1");
    }
    ws.onclose = function(e){
        console.log("服务器关闭");
    }
    ws.onerror = function(){
        console.log("连接出错");
    }

    ws.onmessage = function(e){
        mess.innerHTML += "<br>" + e;
    }
    document.querySelector("h1").onclick = function(e){
        var time = new Date();
        ws.send(time + e.target.innerHTML);
    }
}
