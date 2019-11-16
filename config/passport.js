const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


// Load User model
const User = require('../model/user');
const Doctor = require('../model/doctor');

module.exports = function(passport) {
  passport.use('user',
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      if(User){
      User.findOne({ email: email}).then(user => 
        {
        if (!user) {
          return done(null, false, { message: 'Email Id is not registered' });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
        //   if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Email Id or Password incorrect' });
          }
        });
      })
    }else{
      Doctor.findOne({ email: email}).then(user => 
        {
        if (!user) {
          return done(null, false, { message: 'Email Id is not registered' });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
        //   if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Email Id or Password incorrect' });
          }
        });
      })
    }
    })    
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    if(User){
      User.findById(id, function(err, user) {
      done(err, user);
    })}
    else{
      Doctor.findById(id, function(err, user) {
      done(err, user);
      })
    }
    
  });
  
};
