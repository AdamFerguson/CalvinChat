Chat = Ember.Application.create({
  rootElement: '#chat-app',
  LOG_TRANSITIONS: true
});

Chat.Router.map(function() {
  this.route('messages');
});

require('./helpers');
require('./models');
require('./controllers');
require('./views');
require('./routes');