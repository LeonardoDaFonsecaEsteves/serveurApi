const multer = require('multer')
var appRoot = require('app-root-path');
const security = require('../../middleware/auth.middleware')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${appRoot}/public/${req.params.destination}/images`);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = (app) => {
    // route pour la gestion des images 
    // Require token for all routes in api
    app.all("/api/upload_images/*", security.checkJWT, (req, res, next) => {
        next();
    });
    app.post('/api/upload_images/:destination', upload.single('file'), (req, res, next) => {
        try {
            return res.sendStatus(201);
        } catch (error) {
            winston.error(error);
        }
    });
}