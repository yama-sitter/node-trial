const express = require('express')

const app = express()

app.use(require('./logger.js'));

app.get('/', (req, res) => {
  res.status(200).send('Hello World.')
})
app.listen(3000)
