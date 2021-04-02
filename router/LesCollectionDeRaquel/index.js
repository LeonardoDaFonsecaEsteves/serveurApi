// routes pour les Collection de raquel
const livres = require('./controller/controller.Livre');
const collections = require('./controller/controller.Collection');
const security = require('../../middleware/auth.middleware');
const path = require("path");

module.exports = (app) => {
  
  const base = '/api/lcdr/';
  // Create a new Livre
  app.post(base + 'livres', security.checkJWT, livres.create);
  // Retrieve all livre
  app.get(base + 'livres', livres.findAll);
  // Retrieve a single Customer with livreId
  app.get(base + 'livres/:livreId', livres.findOne);
  // Update a Customer with livreId
  app.put(base + 'livres/:livreId', security.checkJWT, livres.update);
  // Delete a Customer with livreId
  app.delete(base + 'livres/:livreId', security.checkJWT, livres.delete);

  // Create a new collection
  app.post(base + 'collections', security.checkJWT, collections.create);
  // Retrieve all collection
  app.get(base + 'collections', collections.findAll);
  // Retrieve a single Customer with collectionId
  app.get(base + 'collections/:collectionId', collections.findOne);
  // Update a Customer with collectionId
  app.put(
    base + 'collections/:collectionId',
    security.checkJWT,
    collections.update,
  );
  // Delete a Customer with collectionId
  app.delete(
    base + 'collections/:collectionId',
    security.checkJWT,
    collections.delete,
  );
};
