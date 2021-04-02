// routes pour Mes Apks
const Apks = require('./controller/controller.Apks');

module.exports = (app) => {
  
  const base = '/api/MesApks/';
  // Retrieve all Apks
  app.get(base, Apks.findAll);
  
};
