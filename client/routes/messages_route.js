Chat.MessagesRoute = Ember.Route.extend({
  model: function() {
    return Chat.Message.find()
  },
  events: {
    error: function(error,transition) {
      debugger;
    }
  }
});
