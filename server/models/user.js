
var mongoose = require('mongoose');
var crypto   = require('crypto');

var userSchema = mongoose.Schema({
  email: { type: String, required: true, index: {unique: true}},
  hashedPassword: String,
  salt: String,
  authenticationToken: { type: String, index: {unique: true} },
  resetToken: String
});

userSchema.plugin(require('mongoose-lifecycle'));

userSchema.virtual('password').set(function(password){
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  }).get(function(){ return this._password; });

userSchema.virtual('passwordConfirmation').set(function(passwordConfirmation){
    this._passwordConfirmation = passwordConfirmation;
  }).get(function(){ return this._passwordConfirmation; });

userSchema.methods.authenticate = function(plainText) {
  return this.encryptPassword(plainText) === this.hashedPassword;
};

userSchema.methods.makeSalt = function() {
  return Math.round((new Date().valueOf() * Math.random())) + '';
};

userSchema.methods.encryptPassword = function(password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

userSchema.methods.generateResetToken = function(done) {
  var shasum = require('crypto').createHash('sha512');
  shasum.update(this.password + ":" + this.salt);
  this.resetToken = shasum.digest('base64');
  this.save(function(err,user){
    if(err) return done(err,null);
    return done(null,user);
  });
};

var User = mongoose.model('User', userSchema);

User.on('beforeInsert', function(user){
  var shasum = require('crypto').createHash('sha512');
  // Not the most secure, could possibly be improved
  shasum.update(user.email + ":" + user.salt);
  user.authenticationToken = shasum.digest('base64');
});

module.exports = User;