const appRoot = require('app-root-path');
const winston = require('winston');
const { createLogger, format, transports } = winston;

const options = {
  fileInfo: {
    level: 'info',
    filename: `${appRoot}/logs/log-info.log`,
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    format: format.combine(
      format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
      format.align(),
      format.printf(info => `${info.level}: ${[info.timestamp]}: \n ${info.message}`),
    ),
  },
  fileWarn: {
    level: 'warn',
    filename: `${appRoot}/logs/log-warn.log`,
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    format: format.combine(
      format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
      format.align(),
      format.printf(info => `${info.level}: ${[info.timestamp]}: \n ${info.message}`),
    ),
  },
  fileError: {
    level: 'error',
    filename: `${appRoot}/logs/log-error.log`,
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    format: format.combine(
      format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
      format.align(),
      format.printf(info => `${info.level}: ${[info.timestamp]}: \n ${info.message}`),
    ),
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

const logger = new winston.createLogger({
  transports: [
    new winston.transports.File(options.fileError),
    new winston.transports.File(options.fileWarn),
    new winston.transports.File(options.fileInfo),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false, 
});

logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  },
};

module.exports = logger;
