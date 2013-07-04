(function($) {
  var socket = io.connect();
  var messageList = $('#message-list');
  socket.on('connect', function() {
    socket.on('message', function(data) {
      console.log(data);
      var newMessage = '<li>' + data + '</li>';
      messageList.append(newMessage);
    });
    $('#send-message').click(function(e) {
      var message = $('#message').val();
      socket.emit('message', message);
    });
  });
})(jQuery);

Chat = Ember.Application.create();
