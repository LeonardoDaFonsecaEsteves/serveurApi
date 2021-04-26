const requestIp = require('request-ip');
const useragent = require('express-useragent');
const blackList = require('../blackList.json')
const whiteList = require('../whiteRequest.json');
const logger = require('../config/winston');
const path = require("path");
var fs = require('fs');

Object.filter = (obj, predicate) => (
    Object.assign(
        ...Object.keys(obj)
            .filter(key => predicate(obj[key])).map(key => ({ [key]: obj[key] }))
    )
);

exports.inspectRequest = (req, res, next) => {
     const { method, url } = req;
    // // bloque acces if ip blacklist
    // const filtered = Object.filter(
    //     useragent.parse(req.headers['user-agent']), value =>
    //     value === true || typeof value === 'string' && value !== ''
    // );
    // if (blackList.includes(requestIp.getClientIp(req))) {
    //     logger.warn(
    //         `${requestIp.getClientIp(req)} - ${method}  -  ${req.originalUrl} \n `
    //         + JSON.stringify(filtered)
    //     )
    //     res.sendFile(path.join(__dirname, '', 'fck.html'));
    // }

    const urlSplit = url.split('/')[1]
    if (whiteList.find((el) => el === urlSplit)) {
        next()
    }
    // else {
    //     const ipBlocked = blackList
    //     ipBlocked.push(requestIp.getClientIp(req))
    //     fs.writeFile('./blackList.json', JSON.stringify(ipBlocked), (err) => {
    //         if (err) throw err;
    //     }
    //     );
    // }
};