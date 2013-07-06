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
