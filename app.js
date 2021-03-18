const express = require('express');
const systemlogger = require('./lib/log/systemlogger');

const app = express();
app.set('view engine', 'ejs');
app.disable('x-powered-by');

const staticFilePath = process.env.NODE_ENV === 'devlopment' ? 'development' : 'production';

app.use('/public', express.static(`${__dirname}/public/${staticFilePath}}`));
app.use('/', require('./routes/index'));

app.use(systemlogger());

app.listen(3000);
