
var passport = require('passport');

var User = require('../models').User;

var confirmPassword = function(req,res,next) {
  var user = req.body;
  if (user.password === user.password_confirmation) {
    next();
  }
  else { res.send(422, {"errors": ["Password and password confirmation don't match"]}); }
};

var isNewUser = function(req,res,next) {
  var user = req.body.user;
  User.findOne({email: user.email}, function(err, user){
    if (!user) { next(); }
    else { res.send(422, {"errors": ["Email already exists"]}); }
  });
};

exports.register = [
  confirmPassword,
  isNewUser,
  function(req,res){
    new User(req.body.user).save(function(err,user){
      if (err) { return res.send(err); }
      return res.send(201, {email: user.email, authenticationToken: user.authenticationToken});
    });
  }
];

exports.login = function(req, res) {
  User.findOne({email: req.body.user.email}, function(err, user){
    if (err) { return res.status(500).send(err); }
    if (!user) { return res.send(422, {"errors": ["Email not found"]}); }
    if (user.authenticate(req.body.user.password)) {
      return res.status(401).send({"errors": ["Password didn't match"]});
    }
    return res.status(200).send({user: {email: user.email, authenticationToken: user.authenticationToken}});
  });
}

exports.resetPassword = [
  passport.authenticate('basic'),
  confirmPassword,
  function(req,res) {
    var user = req.user;
    user.password = req.body.password;
    user.save(function(err, savedUser) {
      if (err) return res.status(500).send(err);
      return res.status(200).send({user: {email: user.email, authenticationToken: user.authenticationToken}});
    });
  }
];
