const express = require('express');
const systemlogger = require('./lib/log/systemlogger.js');
const accesslogger = require('./lib/log/accesslogger.js');

const app = express();
app.set('view engine', 'ejs');
app.disable('x-powered-by');

const staticFilePath = process.env.NODE_ENV === 'development' ? 'development' : 'production';
app.use('/public', express.static(`./public/${staticFilePath}`));

app.use(accesslogger());

app.use('/', require('./routes/index.js'));
app.use('/posts', require('./routes/posts.js'));
app.use('/search', require('./routes/search.js'));
app.use('/account', require('./routes/account.js'));

app.use(systemlogger());

app.listen(3000);
