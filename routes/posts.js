const router = require('express').Router();
const { MongoClient } = require('mongodb');
const { CONNECTION_URL, DATABASE, OPTIONS } = require('../config/mongodb.config.js');

router.get('/*', (req, res) => {
  MongoClient.connect(CONNECTION_URL, OPTIONS, async (error, client) => {
    const db = client.db(DATABASE);
    try {
      const doc = await db.collection('posts').findOne({
        url: req.url,
      });
      res.render('./posts/index.ejs', doc);
    } finally {
      client.close();
    }
  });
});

module.exports = router;
