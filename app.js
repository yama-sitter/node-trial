const express = require('express');

const app = express();

// ***** ルーティング *****
// app.use(require('./logger.js'));
// app.use('/users', require('./router/user.js'));

// ***** テンプレートエンジン ****
// app.set('view engine', 'pug');
// app.get('/', (req, res) => {
//   res.status(200).render('index', { title: 'Webアプリケーション開発' });
// })

// ***** 静的ファイルの配信 *****
app.use('/public', express.static(`${__dirname}/public`))

app.listen(3000);
