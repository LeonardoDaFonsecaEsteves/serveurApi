const CustomerCategorie = require('../customer/customer.Categorie');

// Create and Save a new Categorie
exports.create = (req, res, next) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  const { collection, categorie } = req.body;
  // Create a CustomerCategorie
  const customer = new CustomerCategorie({
    categorie: categorie,
    collection: collection,
  });

  // Save CustomerCategorie in the database
  CustomerCategorie.create(customer, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message ||
          'Some error occurred while creating the categorie.',
      });
    } else res.send(data);
  });
};

// Retrieve all categories from the database.
exports.findAll = (req, res) => {
  CustomerCategorie.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message ||
          'Some error occurred while retrieving categories.',
      });
    } else res.send(data);
  });
};

