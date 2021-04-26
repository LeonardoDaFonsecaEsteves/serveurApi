// routes pour les Collection de raquel
const livres = require('./controller/controller.Livre');
const collections = require('./controller/controller.Collection');
const categorie = require('./controller/controller.Categorie')
const security = require('../../middleware/auth.middleware');


module.exports = (app) => {

  const base = '/api/lcdr/';
  // Retrieve all livre
  app.get(base + 'livres', livres.findAll);
  // Create a new Livre
  app.post(base + 'livres', livres.create);
  // Update a Customer with livreId
  app.put(base + 'livres/:livreId', livres.update);
  // Delete a Customer with livreId
  app.delete(base + 'livres/:livreId', security.checkJWT, livres.delete);

  // Create a new collection
  app.post(base + 'collections', collections.create);
  // Retrieve all collection
  app.get(base + 'collections', collections.findAll);
  // Create a new collection
  app.post(base + 'categories', categorie.create);
  // Retrieve all collection
  app.get(base + 'categories', categorie.findAll);
};
