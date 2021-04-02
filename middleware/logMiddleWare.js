const appRoot = require('app-root-path');
const winston = require('winston');
const { createLogger, format, transports } = winston;

const log = createLogger({
transports:
    new transports.File({
    filename: `${appRoot}/logs/log-Request.log`,
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    format:format.combine(
        format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
        format.align(),
        format.printf(info => `${info.level}: ${[info.timestamp]}: \n ${info.message}`),
    )}),
});
module.exports = log;
