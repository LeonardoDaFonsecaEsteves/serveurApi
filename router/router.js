const lesCollectionsDeRaquelRoutes = require('./LesCollectionDeRaquel/index');
const uploadImagesRoute = require('./UploadImages/index');
const connexionRoute = require('./Connexion/index');
const MesApks = require('./MesApks');

module.exports = (app) => {
  connexionRoute(app);
  MesApks(app)
  lesCollectionsDeRaquelRoutes(app);
  uploadImagesRoute(app);
};
