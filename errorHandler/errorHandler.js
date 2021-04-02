const winston = require('../config/winston');

module.exports = (app) => {
  app.use((req, _, next) => {
    if (!req.originalUrl.includes('images')) {
      winston.info(`${req.ip} - ${req.method}  -  ${req.originalUrl}`);
    }
    next();
  });
  app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    winston.error(
        `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
          req.method
        } - ${req.ip}`,
    );
    res.status(err.status || 500);
    res.render('error');
  });
};
