const { SSL_OP_LEGACY_SERVER_CONNECT } = require('constants');
const logzio = require('logzio-nodejs');

const logger = logzio.createLogger({
    token: 'HGpVAPtWKHzenSBJzCmDAuRGtcaodcOj',
    protocol: 'https',
    host: 'listener.logz.io',
    port: '8071',
    type: 'nodejs'
});

// Save the original function
_log = logger.log;

// Override the function so that it also logs to the console
logger.log = (...args) => {
    console.log(...args);
    _log.apply(logger, args);
};


module.exports = logger;
