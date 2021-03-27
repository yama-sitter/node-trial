const crypto = require('crypto');
const { PASSWORD_SALT, PASSWORD_STRETCH } = require('../../config/app.config.js').security;

const digest = (text) => [...Array(PASSWORD_STRETCH).keys()].reduce(
  (acc) => crypto.createHash('sha256').update(acc).digest('hex'),
  `${text}${PASSWORD_SALT}`,
);

module.exports = {
  digest,
};
