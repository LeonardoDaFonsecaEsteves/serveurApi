require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT_API;
const app = express();
const path = require("path");

const winston = require('./config/winston');
const routes = require('./router/router');
const errorHandler = require('./errorHandler/errorHandler');
const compression = require('compression');
const morgan = require('morgan');
const { inspectRequest } = require('./middleware/inspect.middleware');
const { bruteForce } = require('./middleware/bruteForce.middleware');


//Définition des CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(inspectRequest)
// app.use(bruteForce);
app.use(express.static('public'));
app.disable('x-powered-by');
app.use(morgan('combined', { stream: winston.stream }));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

/**
 * WebApp Les Collections de Raquel
 */
app.use(express.static(path.join(__dirname, "/client/les-collections-de-raquel/build")));
app.get('/LesCollectionsDeRaquel', (req, res) => {
    res.sendFile(path.join(__dirname, './client/les-collections-de-raquel/build', 'index.html'));
})
/**
 * WebAppp Mes Apks
 */
// app.use(express.static(path.join(__dirname, "/client/mes-apks/build")));
// app.get('/MesApks', (req, res) => {
//     res.sendFile(path.join(__dirname, './client/mes-apks/build', 'index.html'));
// })

errorHandler(app);
routes(app);

app.listen(PORT, '0.0.0.0', (req, res) => {
    winston.info(`Server is running on PORT ${PORT}`); 
})
