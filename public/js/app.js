
Ember.Handlebars.registerBoundHelper('formattedDate', function(date) {
  return moment(date).calendar();
});

Chat = Ember.Application.create({
  rootElement: '#chat-app',
  LOG_TRANSITIONS: true
});

Chat.Message = Ember.Model.extend({
  userName: Ember.attr(),
  content:  Ember.attr(),
  date:     Ember.attr(Date)
});

Chat.Message.adapter = Ember.RESTAdapter.create();
Chat.Message.url = "messages";
Chat.Message.collectionKey = "messages";

//Chat.Message.adapter = Ember.FixtureAdapter.create();
/*Chat.Message.FIXTURES = [
  {id: '1', userName: 'Adam', content: 'Hey there!'},
  {id: '2', userName: 'Cari', content: 'Hey right back!'}
];*/

Chat.Router.map(function() {
  this.route('messages');
});

Chat.ApplicationRoute = Ember.Route.extend({
  setupController: function(controller) {
    var socket = io.connect();
    controller.set('socket', socket);
    var messages = this.controllerFor('messages');

    socket.on('message', function(data) {
      var message = Chat.Message.create(data.message);
      messages.pushObject(message);
    });
  }
});

Chat.MessagesRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    model = Chat.Message.find()
    controller.set('content', model);
  },
  events: {
    error: function(error,transition) {
      debugger;
    }
  }
});

Chat.ApplicationController = Ember.Controller.extend({
  needs: ['messages'],

  sendMessage: function() {
    var message = this.get('message');
    var socket = this.get('socket');
    socket.emit('message', message);

    this.set('message', null);
  },

  createUsername: function() {
    var username = this.get("username");
    this.set('yourName', username);
    
    var socket = this.get('socket');
    socket.emit('set nickname', username);
    this.transitionToRoute('messages');
  } 
});

Chat.MessagesController = Ember.ArrayController.extend({
  sortProperties: ['date'],
  sortAscending: false
});
