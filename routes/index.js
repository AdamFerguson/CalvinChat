
var messages = require('./messages');
var auth     = require('./authentication');

var index = function (req, res) {
  res.sendfile(process.cwd() + '/index.html');
};

module.exports = function(app) {
  app.get('/', index);
  app.post('/register.json', auth.register);
  app.post('/login.json', auth.login);
  app.post('/reset_password.json', auth.resetPassword);
  app.get('/messages.json', messages.index);
};