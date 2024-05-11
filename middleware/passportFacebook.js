const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const { User } = require('../models/loginModel');
const bcrypt = require('bcrypt');

const FACEBOOK_CLIENT_ID = 'iiiiiiiiiiiiiii';
const FACEBOOK_CLIENT_SECRET = 'ssssssssssssssssssssssssssssssss';

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: '/login/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'emails'],
    scope: ['email']
  }, function(accessToken, refreshToken, profile, done) {
    
      let userProfile = profile;

      return done(null, userProfile);
}));

passport.serializeUser(function(user, cb) {
cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
cb(null, obj);
});

module.exports = passport