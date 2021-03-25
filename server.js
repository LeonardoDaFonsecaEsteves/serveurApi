require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const https = require('https');
const PORT = process.env.PORT_API;
const compression = require('compression');
const routes = require('./router/router');
const winston = require('./config/winston');
const morgan = require('morgan');
const fs = require('fs');
const cors = require('cors');

const key = fs.readFileSync(path.join(__dirname, 'certificate', 'server.key'));
const cert = fs.readFileSync(path.join(__dirname, 'certificate', 'server.cert'));

app.use(cors());
app.use(morgan('combined', {stream: winston.stream}));
app.use(compression());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, _, next) => {
  if (!req.originalUrl.includes('images')) {
    winston.info(`${req.ip} - ${req.method}  -  ${req.originalUrl}`);
  }
  next();
});

// error handler
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

routes(app);

https
    .createServer(
        {
          key: key,
          cert: cert,
        },
        app,
    )
    .listen(PORT, '0.0.0.0', () => {
      winston.info(`Server is running on PORT ${PORT}`);
    });
