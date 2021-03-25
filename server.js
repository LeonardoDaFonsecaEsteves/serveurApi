require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT_API;
const https = require('https');
const app = express();
const path = require('path');
const fs = require('fs');

const winston = require('./config/winston');
const routes = require('./router/router');
const errorHandler = require('./errorHandler/errorHandler');
const bodyParser = require('body-parser');
const compression = require('compression');

const morgan = require('morgan');
const cors = require('cors');

const key = fs.readFileSync(path.join(__dirname, 'certificate', 'server.key'));
const cert = fs.readFileSync(path.join(__dirname, 'certificate', 'server.cert'));

app.use(cors());
app.use(morgan('combined', {stream: winston.stream}));
app.use(compression());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
errorHandler(app);
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
