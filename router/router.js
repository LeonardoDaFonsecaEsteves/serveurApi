const LesCollectionsDeRaquelRoutes = require('./LesCollectionDeRaquel/index')
const UploadImagesRoute = require('./UploadImages/index')
const ConnexionRoute = require('./Connexion/index')

module.exports = (app) => {
  ConnexionRoute(app)
  LesCollectionsDeRaquelRoutes(app)
  UploadImagesRoute(app)
}
