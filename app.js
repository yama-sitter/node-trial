const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.set('view engine', 'pug');
app.use(cookieParser());

app.get('/', (req, res) => {
  const count = parseInt(req.cookies.count || 0);
  res.cookie('count', count + 1);
  res.render('./index.pug', { count });
});

app.listen(3000);
