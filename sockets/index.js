var Message = require('../models').Message;

module.exports = function(io) {
  io.sockets.on('connection', function(socket) {
    socket.on('message', function(message) {
      socket.get('nickname', function(err, nickname) {
        if (err) {
          console.log(err);
          return;
        }

        var data = {userName: nickname, content: message};

        new Message(data).save(function(err, message) {
          io.sockets.emit('message', {message: message});
        });
      });
    });

    socket.on('set nickname', function(name) {
      socket.set("nickname",name,function() {});
    });
  });
}