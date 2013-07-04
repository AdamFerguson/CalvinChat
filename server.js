var express = require('express')
    , app = express()
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server);

server.listen(9000);

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket) {
  socket.on('message', function(message) {
    socket.get('nickname', function(err, nickname) {
      if (err) {
        console.log(err);
        return;
      }

      var data = {nickname: nickname, message: message};
      socket.broadcast.emit('message', data);
    });
  });

  socket.on('set nickname', function(name) {
    socket.set("nickname",name,function() {});
  });
});
