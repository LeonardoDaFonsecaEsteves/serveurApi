const requestIp = require('request-ip');
const useragent = require('express-useragent');
const log = require('./logMiddleWare')
const blackList = require('../blackList.json')

Object.filter = (obj, predicate) => (Object.assign(...Object.keys(obj).filter(key => predicate(obj[key])).map(key => ({ [key]: obj[key] }))));

exports.inspectRequest = (req, res, next) => {
    const { method, url } = req;
    if (!url.includes('/images/') && !url.includes('/static/') && !url.includes('/favicon.ico') && !url.includes('/undefined')) {
        const filtered = Object.filter(useragent.parse(req.headers['user-agent']), value => value === true || typeof value === 'string' && value !== '');
   
        log.info(
            `${requestIp.getClientIp(req)} - ${method}  -  ${req.originalUrl} \n `
            + JSON.stringify(filtered)
        )
        // bloque acces if ip blacklist
        if (blackList.indexOf(requestIp.getClientIp(req)) > -1) {
            res.end('FUCK YOU')
        }

    }
    next()
};