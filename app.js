const express = require('express')

const app = express()

app.use(require('./logger.js'));
app.use('/users', require('./router/user.js'));

app.listen(3000)
