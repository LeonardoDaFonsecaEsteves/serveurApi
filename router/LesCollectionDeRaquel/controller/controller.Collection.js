const CustomerCollection = require('../customer/customer.Collection');

// Create and Save a new Collection
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  const { collectionName, collectionId } = req.body;
  // Create a CustomerCollections
  const customer = new CustomerCollection({
    collectionId: collectionId,
    collectionName: collectionName,
  });

  // Save CustomerCollection in the database
  CustomerCollection.create(customer, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message ||
          'Some error occurred while creating the collections.',
      });
    } else res.send(data);
  });
};

// Retrieve all Livre from the database.
exports.findAll = (req, res) => {
  CustomerCollection.getAll((err, data) => {
    if (err) {
      return res.status(500).send({
        message:
          err.message ||
          'Some error occurred while retrieving collections.',
      });
    } else {
      return res.send(data);
    }
  });
};
