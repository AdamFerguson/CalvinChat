var express = require('express'), 
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

// connect to mongo
require('./lib/db');
require('./lib/authentication');

app.use(express.static(__dirname + '/public'));
app.use(express.logger());

var port = process.env.PORT || 9000;
server.listen(port, function() {
  console.log('Server listening on ' + port);
});

// Heroku doesn't support websockets unfortunately
io.configure(function () { 
 io.set("transports", ["xhr-polling"]);
 io.set("polling duration", 10); 
});

require('./routes')(app);
require('./sockets')(io);
