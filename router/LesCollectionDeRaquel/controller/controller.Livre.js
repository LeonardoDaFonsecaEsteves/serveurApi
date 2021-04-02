const CustomerLivre = require('../customer/customer.Livres');

// Create and Save a new Livre
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  const {collection, titre, possede} = req.body;
  console.log(req.body);
  let name = titre;
  name = name.replace(/[^A-Z0-9]+/gi, '-') + '.jpg';
  // Create a CustomerLivres
  const customer = new CustomerLivre({
    imagesUrl: `${collection}/${name}`,
    titre: titre,
    possede: possede,
    collection: collection,
  });

  // Save CustomerLivre in the database
  CustomerLivre.create(customer, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
                    err.message ||
                    'Some error occurred while creating the livres.',
      });
    } else res.send(data);
  });
};

// Retrieve all Livre from the database.
exports.findAll = (req, res) => {
  CustomerLivre.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
                    err.message ||
                    'Some error occurred while retrieving livres.',
      });
    } else res.send(data);
  });
};

// Find a single Livre with a LivreId
exports.findOne = (req, res) => {
  CustomerLivre.findById(req.params.livreId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found livres with id ${req.params.livreId}.`,
        });
      } else {
        res.status(500).send({
          message:
                        'Error retrieving livres with id ' + req.params.livreId,
        });
      }
    } else res.send(data);
  });
};

// Update a Livre identified by the LivreId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  CustomerLivre.updateById(
      req.params.livreId,
      new CustomerLivre(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === 'not_found') {
            res.status(404).send({
              message: `Not found livres with id ${req.params.livreId}.`,
            });
          } else {
            res.status(500).send({
              message:
                            'Error updating livres with id ' +
                            req.params.livreId,
            });
          }
        } else res.send(data);
      },
  );
};

// Delete a Livre with the specified LivreId in the request
exports.delete = (req, res) => {
  CustomerLivre.remove(req.params.livreId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found livres with id ${req.params.livreId}.`,
        });
      } else {
        res.status(500).send({
          message:
                        'Could not delete livres with id ' + req.params.livreId,
        });
      }
    } else res.send({message: 'livres was deleted successfully!'});
  });
};

// Delete all Livre from the database.
exports.deleteAll = (req, res) => {
  CustomerLivre.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
                    err.message ||
                    'Some error occurred while removing all livres.',
      });
    } else res.send({message: 'All livres were deleted successfully!'});
  });
};
