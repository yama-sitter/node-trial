/* eslint-disable no-underscore-dangle */
const log4js = require('log4js');

const { levels } = require('log4js/lib/levels');
const config = require('../../config/log4js.config');

log4js.configure(config);

class ApplicationLogger {
  constructor() {
    this.logger = log4js.getLogger('application');

    levels.forEach((level) => {
      const _level = level.levelStr.toLowerCase();
      this[_level] = ((l) => (key, message) => {
        this.logger.addContext('key', key);
        this.logger[l](message);
      }
      )(_level);
    });
  }
}

module.exports = {
  console: log4js.getLogger('console'),
  system: log4js.getLogger('system'),
  application: new ApplicationLogger(),
};
