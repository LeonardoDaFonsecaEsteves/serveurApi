const CustomerConnexion = require('../customer/customer.connexion');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');
const SECRET_KEY = process.env.SECRET_KEY;

// Create and Save a new Livre
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  const {email, mdp} = req.body;
  // Create a CustomerUsers
  const customer = new CustomerConnexion({
    email,
    mdp: bcrypt.hashSync(mdp, 10),
  });

  // Save CustomerUsers in the database
  CustomerConnexion.create(customer, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
                    err.message ||
                    'Some error occurred while creating the users.',
      });
    } else res.send(data);
  });
};

// Find a single users with a email
exports.findOne = (req, res) => {
  CustomerConnexion.findByEmail(req.body, (err, data) => {
    const {email, mdp} = req.body;
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found users with ${email}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving users with ' + req.body.email,
        });
      }
    } else {
      bcrypt.compare(mdp, data.mdp).then((response) => {
        if (response) {
          const expireIn = 24 * 60 * 60;
          const token = jwt.sign(
              {
                user: data,
              },
              SECRET_KEY,
              {
                expiresIn: expireIn,
              },
          );
          res.setHeader('Authorization', 'Bearer ' + token);
          return res.status(200).json('auth_ok');
        } else {
          return res.status(403).json('wrong_credentials');
        }
      });
    }
  });
};
