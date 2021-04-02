const CustomerApks = require("../customer/customer.Apks");

// Retrieve all apks from the database.
exports.findAll = (req, res) => {
  CustomerApks.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message ||
          'Some error occurred while retrieving livres.',
      });
    } else res.send(data);
  });
};
