const express = require('express');
const systemlogger = require('./lib/log/systemlogger');
const accesslogger = require('./lib/log/accesslogger');

const app = express();
app.set('view engine', 'ejs');
app.disable('x-powered-by');

const staticFilePath = process.env.NODE_ENV === 'development' ? 'development' : 'production';
app.use('/public', express.static(`./public/${staticFilePath}`));

app.use(accesslogger());

app.use('/', require('./routes/index'));

app.use(systemlogger());

app.listen(3000);
