const { MongoClient } = require('mongodb');
const { CONNECTION_URL, DATABASE, OPTIONS } = require('../../config/mongodb.config.js');

const insertPosts = (db) => Promise.all([
  db.collection('posts').insertMany([
    {
      url: '/2021/03/hello-nodejs.html',
      published: new Date(2021, 3, 24),
      updated: new Date(2021, 3, 24),
      title: 'ようこそ Node.js の世界へ',
      content: 'Node.js は おもしろい！',
      keywords: ['Node.js'],
      authors: ['dadayama'],
    },
    {
      url: '/2021/03/nodejs-basic.html',
      published: new Date(2021, 3, 24),
      updated: new Date(2021, 3, 24),
      title: 'Node.js の 基本',
      content: 'ちょっと難しくなってきた？！',
      keywords: ['Node.js'],
      authors: ['dadayama'],
    },
    {
      url: '/2021/03/advanced-nodejs.html',
      published: new Date(2021, 3, 24),
      updated: new Date(2021, 3, 24),
      title: 'Node.js 応用',
      content: 'Node.js で Excel ファイルが触れるなんて！！',
      keywords: ['Node.js'],
      authors: ['dadayama'],
    },
  ]),
  db.collection('posts').createIndex(
    {
      url: 1,
    },
    {
      unique: true,
      background: true,
    },
  ),
]);

const insertUsers = (db) => Promise.all([
  db.collection('users').insertOne({
    email: 'dadayamism@gmail.com',
    name: 'dadayama',
    password: '09951df3bb1807d6ce73f134a804503e9198ccfb867e1b530065c77bd774a447',
    role: 'owner',
  }),
  db.collection('users').createIndex(
    {
      email: 1,
    },
    {
      unique: true,
      background: true,
    },
  ),
]);

const insertPrivileges = (db) => Promise.all([
  db.collection('privileges').insertMany([
    {
      role: 'default',
      permissions: ['read'],
    },
    {
      role: 'owner',
      permissions: ['readWrite'],
    },
  ]),
  db.collection('privileges').createIndex(
    {
      role: 1,
    },
    {
      unique: true,
      background: true,
    },
  ),
]);

MongoClient.connect(CONNECTION_URL, OPTIONS, async (error, client) => {
  const db = client.db(DATABASE);

  try {
    await Promise.all([
      insertPosts(db),
      insertUsers(db),
      insertPrivileges(db),
    ]);
  } catch (_error) {
    console.log(_error);
  } finally {
    client.close();
  }
});
