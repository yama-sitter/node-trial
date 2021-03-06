const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('./index.pug');
});
app.post('/', (req, res) => {
  res.send('OK');
})

app.listen(3000);
