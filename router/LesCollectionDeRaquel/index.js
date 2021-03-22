// routes pour les Collection de raquel
const livres = require('./controller/controller.Livre');
const collections = require('./controller/controller.Collection');
const security = require('../../middleware/auth.middleware');

module.exports = (app) => {
  const base = '/api/lcdr/';
  // Require token for all routes in api
  app.all(base, security.checkJWT, (req, res, next) => {
    next();
  });

  // Create a new Livre
  app.post(base + 'livres', livres.create);
  // Retrieve all livre
  app.get(base + 'livres', livres.findAll);
  // Retrieve a single Customer with livreId
  app.get(base + 'livres/:livreId', livres.findOne);
  // Update a Customer with livreId
  app.put(base + 'livres/:livreId', livres.update);
  // Delete a Customer with livreId
  app.delete(base + 'livres/:livreId', livres.delete);
  // Create a new Customer
  app.delete(base + 'livres', livres.deleteAll);

  // Create a new collection
  app.post(base + 'collections', collections.create);
  // Retrieve all collection
  app.get(base + 'collections', collections.findAll);
  // Retrieve a single Customer with collectionId
  app.get(base + 'collections/:collectionId', collections.findOne);
  // Update a Customer with collectionId
  app.put(base + 'collections/:collectionId', collections.update);
  // Delete a Customer with collectionId
  app.delete(base + 'collections/:collectionId', collections.delete);
  // Create a new Customer
  app.delete(base + 'collections', collections.deleteAll);
};
