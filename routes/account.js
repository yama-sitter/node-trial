const router = require('express').Router();

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

router.get('/', (req, res) => {
  res.render('./account/index.ejs');
});

router.get('/posts/register', (req, res) => {
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
      res.render('./account/posts/register-complete.ejs');
    } catch (_error) {
      console.log(error);
    } finally {
      client.close();
    }
  });
});

module.exports = router;
