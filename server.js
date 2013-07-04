var express = require('express'), 
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));
app.use(express.logger());

var port = process.env.PORT || 9000;
server.listen(port, function() {
  console.log('Server listening on ' + port);
});

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
