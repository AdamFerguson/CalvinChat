Ember.Handlebars.registerBoundHelper('formattedDate', function(date) {
  return moment(date).calendar();
});
