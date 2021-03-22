const CustomerCollection = require("../customer/customer.Collection");

// Create and Save a new Livre
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const { collectionName } = livre
    // Create a CustomerCollections
    const customer = new CustomerCollection({
        collectionName: collectionName,
    });

    // Save CustomerCollection in the database
    CustomerCollection.create(customer, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the collections."
            });
        else res.send(data);
    });
};

// Retrieve all Livre from the database.
exports.findAll = (req, res) => {
    CustomerCollection.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving collections."
            });
        else res.send(data);
    });
};

// Find a single Livre with a collectionId
exports.findOne = (req, res) => {
    CustomerCollection.findById(req.params.collectionId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found collections with id ${req.params.collectionId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving collections with id " + req.params.collectionId
                });
            }
        } else res.send(data);
    });
};

// Update a Livre identified by the collectionId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    CustomerCollection.updateById(
        req.params.collectionId,
        new CustomerCollection(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found collections with id ${req.params.collectionId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating collections with id " + req.params.collectionId
                    });
                }
            } else res.send(data);
        }
    );
};


// Delete a Livre with the specified collectionId in the request
exports.delete = (req, res) => {
    CustomerCollection.remove(req.params.collectionId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Collections with id ${req.params.collectionId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Collections with id " + req.params.collectionId
                });
            }
        } else res.send({ message: `Collections was deleted successfully!` });
    });
};

// Delete all Livre from the database.
exports.deleteAll = (req, res) => {
    CustomerCollection.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all collections."
            });
        else res.send({ message: `All collections were deleted successfully!` });
    });
};