/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const { MongoClient } = require('mongodb');
const Csrf = require('csrf');
const { authenticate } = require('../lib/security/accountcontrol.js');
const { CONNECTION_URL, DATABASE, OPTIONS } = require('../config/mongodb.config.js');

const tokens = new Csrf();

const validateRegisterData = (body) => {
  const errors = {};

  if (!body.url) {
    errors.url = 'URLが未入力です。\'/\'から始まるURLを入力してください。';
  }
  if (body.url && !/^\//.test(body.url)) {
    errors.url = '\'/\'から始まるURLを入力してください。';
  }
  if (!body.title) {
    errors.title = 'タイトルが未入力です。任意のタイトルを入力してください。';
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

const createRegisterData = (body) => {
  const dateTime = new Date();
  return {
    ...body,
    published: dateTime,
    updated: dateTime,
    keywords: (body.keywords || '').split(','),
    authors: (body.authors || '').split(','),
  };
};

router.get('/', (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/account/login');
  }
}, (req, res) => {
  res.render('./account/index.ejs');
});

router.get('/login', (req, res) => {
  res.render('./account/login.ejs', { message: req.flash('message') });
});

router.post('/login', authenticate());

router.get('/posts/register', (req, res) => {
  const secret = tokens.secretSync();
  const token = tokens.create(secret);
  req.session._csrf = secret;
  res.cookie('_csrf', token);
  res.render('./account/posts/register-form.ejs');
});

router.post('/posts/register/input', (req, res) => {
  const origin = createRegisterData(req.body);
  res.render('./account/posts/register-form.ejs', { origin });
});

router.post('/posts/register/confirm', (req, res) => {
  const origin = createRegisterData(req.body);
  const errors = validateRegisterData(req.body);

  if (errors) {
    res.render('./account/posts/register-form.ejs', { errors, origin });
    return;
  }
  res.render('./account/posts/register-confirm.ejs', { origin });
});

router.post('/posts/register/execute', (req, res) => {
  const secret = req.session._csrf;
  const token = req.cookies._csrf;

  if (!tokens.verify(secret, token)) {
    throw new Error('Invalid Token');
  }

  const origin = createRegisterData(req.body);
  const errors = validateRegisterData(req.body);

  if (errors) {
    res.render('./account/posts/register-form.ejs', { errors, origin });
    return;
  }

  MongoClient.connect(CONNECTION_URL, OPTIONS, async (error, client) => {
    const db = client.db(DATABASE);

    try {
      await db.collection('posts').insertOne(origin);

      delete req.session._csrf;
      res.clearCookie('_csrf');

      res.redirect('/account/posts/register/complete');
    } catch (_error) {
      console.log(_error);
    } finally {
      client.close();
    }
  });
});

router.get('/posts/register/complete', (req, res) => {
  res.render('./account/posts/register-complete.ejs');
});

module.exports = router;
