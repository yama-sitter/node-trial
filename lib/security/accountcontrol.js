const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { MongoClient } = require('mongodb');
const { CONNECTION_URL, DATABASE, OPTIONS } = require('../../config/mongodb.config.js');

passport.serializeUser((email, done) => {
  done(null, email);
});

passport.deserializeUser((email, done) => {
  MongoClient.connect(CONNECTION_URL, OPTIONS, async (error, client) => {
    const db = client.db(DATABASE);

    try {
      const user = await db.collection('users').findOne({
        email,
      });
      done(null, user);
    } catch (_error) {
      done(_error);
    } finally {
      client.close();
    }
  });
});

passport.use('local-strategy', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true,
}, (req, username, password, done) => {
  MongoClient.connect(CONNECTION_URL, OPTIONS, async (error, client) => {
    const db = client.db(DATABASE);

    try {
      const user = await db.collection('users').findOne({
        email: username,
        password,
      });

      if (user) {
        req.session.regenerate((_error) => {
          if (_error) {
            done(_error);
          } else {
            done(null, user.email);
          }
        });
      } else {
        done(null, false, req.flash('message', 'ユーザー名 または パスワード が間違っています。'));
      }
    } catch (_error) {
      done(_error);
    } finally {
      client.close();
    }
  });
}));

const initialize = () => [
  passport.initialize(),
  passport.session(),
];

const authenticate = () => passport.authenticate(
  'local-strategy', {
    successRedirect: '/account',
    failureRedirect: '/account/login',
  },
);

module.exports = {
  initialize,
  authenticate,
  // authorize,
};
