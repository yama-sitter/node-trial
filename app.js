const express = require('express');

const app = express();

app.set('view engine', 'pug');

app.use(require('./logger.js'));
// app.use('/users', require('./router/user.js'));

app.get('/', (req, res) => {
  res.status(200).render('index', { title: 'Webアプリケーション開発' });
})

app.listen(3000);
