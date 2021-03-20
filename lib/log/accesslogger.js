const log4js = require('log4js');
const logger = require('./logger').access;

module.exports = (options = {}) => log4js.connectLogger(logger, { ...options, level: options.level || 'auto' });
