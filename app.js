const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

app.set('view engine', 'pug');
app.use(session({
  secret: 'qwerty',
  resave: false,
  saveUninitialized: true,
  name: 'sid',
}));

app.get('/', (req, res) => {
  const count = req.session.count || 0;
  req.session.count = count + 1;
  res.render('./index.pug', { count });
});

app.listen(3000);
