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

      const privilege = await db.collection('privileges').findOne({
        role: user.role,
      });
      user.permissions = privilege.permissions;

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
  (req, res, next) => {
    if (req.user) {
      res.locals.user = req.user;
    }
    next();
  },
];

const authenticate = () => passport.authenticate(
  'local-strategy', {
    successRedirect: '/account',
    failureRedirect: '/account/login',
  },
);

const authorize = (privilege) => (req, res, next) => {
  if (req.isAuthenticated() && (req.user.permissions || []).indexOf(privilege) >= 0) {
    next();
  } else {
    res.redirect('/account/login');
  }
};

module.exports = {
  initialize,
  authenticate,
  authorize,
};
