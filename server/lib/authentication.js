var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models').User;

passport.use(new BasicStrategy(
  function(authToken, other, done) {
    User.findOne({authenticationToken: authToken}, function(err,user){
      if(err) { return done(err); }
      if(!user) { return done(null, false); }
      if(user) { return done(null, user); }
    });
  }
));

/*
passport.serializeUser(function(user,done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});*/