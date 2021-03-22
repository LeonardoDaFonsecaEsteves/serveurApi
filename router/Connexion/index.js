const connexion = require('./controller/controller.connexion');

module.exports = (app) => {
  app.post('/api/connexion', connexion.findOne);
  app.post('/api/connexion/create/users', connexion.create);
};
