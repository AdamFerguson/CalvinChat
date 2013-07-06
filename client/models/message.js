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
