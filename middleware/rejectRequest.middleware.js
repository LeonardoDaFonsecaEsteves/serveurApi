const whiteList = require('../whiteRequest.json')


exports.RejectRequeste = (req, res, next) => {
    const { url } = req;
    if (!url.includes('/images/') && !url.includes('/static/') && !url.includes('/favicon.ico')) {
        if (!whiteList.includes(url)) {
            res.end("SORRY YOUR ARE DENIED")
        }
    }
    next()
};