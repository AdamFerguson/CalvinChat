
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
    this.get('controllers.messages').pushObject(message);
    this.set('message', null);
   }
});

Chat.MessagesController = Ember.ArrayController.extend({});

Chat.ApplicationView = Ember.View.extend({
  didInsertElement: function() {
  }
});
