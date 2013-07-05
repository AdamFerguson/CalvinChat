
var messages = require('./messages');

var index = function (req, res) {
  res.sendfile(process.cwd() + '/index.html');
};

module.exports = function(app) {
  app.get('/', index);
  app.get('/messages.json', messages.index);
};