const router = require('express').Router();
const { MongoClient } = require('mongodb');
const { CONNECTION_URL, DATABASE, OPTIONS } = require('../config/mongodb.config.js');
const { MAX_ITEM_PER_PAGE } = require('../config/app.config.js').search;

router.get('/*', (req, res) => {
  const page = req.query.page ? parseInt(req.query.page, 10) : 1;
  const keyword = req.query.keyword || '';
  const regex = new RegExp(`.*${keyword}.*`);
  const query = { $or: [{ title: regex }, { content: regex }] };

  MongoClient.connect(CONNECTION_URL, OPTIONS, async (error, client) => {
    const db = client.db(DATABASE);

    try {
      const [count, list] = await Promise.all([
        db.collection('posts').find(query).sort({ published: -1 }).count(),
        db.collection('posts').find(query).sort({ published: -1 }).skip((page - 1) * MAX_ITEM_PER_PAGE)
          .limit(MAX_ITEM_PER_PAGE)
          .toArray(),
      ]);
      const pagination = {
        max: Math.ceil(count / MAX_ITEM_PER_PAGE),
        current: page,
      };
      res.render('./search/index.ejs', {
        keyword, count, list, pagination,
      });
    } finally {
      client.close();
    }
  });
});

module.exports = router;
