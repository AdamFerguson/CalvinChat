
Chat = Ember.Application.create();

Chat.ApplicationRoute = Ember.Route.extend({
  setupController: function(controller) {
    var socket = io.connect();
    controller.set('socket', socket);
    var messages = this.controllerFor('messages');

    socket.on('message', function(data) {
      console.log(data);
      messages.pushObject(data);
    });
  }
});

Chat.ApplicationController = Ember.Controller.extend({
  needs: ['messages'],

  sendMessage: function() {
    var message = this.get('message');
    var socket = this.get('socket');
    socket.emit('message', message);

    var data = {nickname: this.get('yourName'), message: message};

    this.get('controllers.messages').pushObject(data);
    this.set('message', null);
  },

  createUsername: function() {
    var username = this.get("username");
    this.set('yourName', username);
    
    var socket = this.get('socket');
    socket.emit('set nickname', username);
  } 
});

Chat.MessagesController = Ember.ArrayController.extend({});

Chat.ApplicationView = Ember.View.extend({
  didInsertElement: function() {
  }
});
