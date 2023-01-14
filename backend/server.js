var express = require('express');
var app = express();
const pty = require("node-pty");
require('express-ws')(app);
const os = require("os");
const platform = os.platform();
const shell = platform === "win32" ? "powershell.exe" : "bash";
const args = platform === "win32" ? "" : "--login";

//解决跨域问题
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.ws("/socket", (ws, req) => {
  console.log('websocket连接成功了')
  // 每次连接的时候都要生成一次term。否则在客服端刷新页面时，服务端的term就会失去连接
  // 虚拟终端（接收和转换输入）
  const term = pty.spawn(shell, [args], {
    name: "xterm",
    cols: 100,
    rows: 100,
    cwd: process.env.HOME,
    env: process.env,
  });
  ws.on("open", (data) => {
    console.log('open data===', data)
  });
  term.on("data", function (data) {
    console.log('发送给客服端的数据===', data)
    ws.send(data);
  });
  ws.on("message", (data) => {
    console.log('接收客服端的数据===', data)
    term.write(data);
  });
  ws.on("close", function () {
    term.kill();
  });
});
app.listen(8020);