const appRoot = require('app-root-path');
const winston = require('winston');

// define the custom settings for each transport (file, console)
const options = {
  fileInfo: {
    level: 'info',
    filename: `${appRoot}/logs/log-info.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: true,
    format: winston.format.json(),
  },
  fileWarn: {
    level: 'warn',
    filename: `${appRoot}/logs/log-warn.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: true,
    format: winston.format.json(),
  },
  fileError: {
    level: 'error',
    filename: `${appRoot}/logs/log-error.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: true,
    format: winston.format.json(),
  },
  console: {
    level: 'info',
    handleExceptions: true,
    json: true,
    colorize: true,
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
    ),
  },
};

// instantiate a new Winston Logger with the settings defined above
const logger = new winston.createLogger({
  transports: [
    new winston.transports.File(options.fileError),
    new winston.transports.File(options.fileWarn),
    new winston.transports.File(options.fileInfo),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will
    // be picked up by both transports (file and console)
    logger.info(message);
  },
};

module.exports = logger;
