Chat.ApplicationRoute = Ember.Route.extend({
  setupController: function(controller) {
    var socket = io.connect();
    controller.set('socket', socket);
    var messages = this.controllerFor('messages');

    socket.on('message', function(data) {
      var message = Chat.Message.create(data.message);
      message.set('date', new Date(data.message.date));
      messages.pushObject(message);
    });
  }
});