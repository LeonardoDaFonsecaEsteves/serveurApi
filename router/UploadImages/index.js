const multer = require('multer');
const appRoot = require('app-root-path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${appRoot}/public/images`);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({storage: storage, fileFilter: fileFilter});

module.exports = (app) => {
  // route pour la gestion des images
  app.post('/api/upload_images', upload.single('file'), (req, res, next) => {
    try {
      return res.sendStatus(201);
    } catch (error) {
      winston.error(error);
    }
  });
};
