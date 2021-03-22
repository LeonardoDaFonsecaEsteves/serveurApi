const lesCollectionsDeRaquelRoutes = require('./LesCollectionDeRaquel/index');
const uploadImagesRoute = require('./UploadImages/index');
const connexionRoute = require('./Connexion/index');

module.exports = (app) => {
  connexionRoute(app);
  lesCollectionsDeRaquelRoutes(app);
  uploadImagesRoute(app);
};
