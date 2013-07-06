var Message = require('../models').Message;

exports.index = function(req, res) {
  Message.find().sort({date: 'desc'}).limit(100).exec(function(err, messages) {
    if (err) { return res.status(500).send(err); }
    var cleanedMessages = messages.map(function(message) {
      return {
        id: message['_id'],
        userName: message.userName,
        content: message.content,
        date: message.date
      };
    });

    res.send({messages: cleanedMessages});
  });
};