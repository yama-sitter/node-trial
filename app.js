const express = require('express');
const app = express();

app.set('view engine', 'pug')

const nodeModuleDir = `${__dirname}/node_modules`;
app.use('/assets', express.static(`${nodeModuleDir}/bootstrap/dist`));
app.use('/', require('./routes/index'));

app.listen(3000);
