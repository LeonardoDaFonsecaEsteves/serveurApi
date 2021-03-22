require('dotenv').config();
const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')
const app = express();
const https = require('https')
const PORT = process.env.PORT_API
const cors = require('cors');
const compression = require('compression')
const routes = require('./router/router')
const winston = require('./config/winston');
const morgan = require('morgan');
const fs = require('fs');

const key = fs.readFileSync(path.join(__dirname, 'certificate', 'server.key'));
const cert = fs.readFileSync(path.join(__dirname, 'certificate', 'server.cert'));

const optionCors = {
    "origin": "*",
    "methods": "GET,PUT,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}
app.use(morgan('combined', { stream: winston.stream }));
app.use(compression())
app.use(cors(optionCors))
app.use(express.static('public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, _, next) => {
    if (!req.originalUrl.includes('images') || req.originalUrl.includes('static')) {
        winston.info(`${req.ip} - ${req.method}  -  ${req.originalUrl}`);
    }
    next();
});

routes(app)
// error handler
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(err.status || 500);
    res.render('error');
});


https.createServer({
    key: key,
    cert: cert
}, app).listen(PORT, "0.0.0.0", () => {
    winston.info(`Server is running on PORT ${PORT}`)
});