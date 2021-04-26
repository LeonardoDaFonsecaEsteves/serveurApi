const { mysqlConnect } = require('../../../mysql/mysql');
const { dbConfigRaquel } = require('../config/dbConfig');
const logger = require('../../../config/winston');
const sql = mysqlConnect(dbConfigRaquel);

class CustomerCollection {
  constructor(customerCollection) {
    this.collectionId = customerCollection.collectionId;
    this.collectionName = customerCollection.collectionName;
  }
  static create(newcollection, result) {
    sql.query(
      'INSERT IGNORE INTO collection SET ?',
      newcollection,
      (err, res) => {
        if (err) {
          logger.error(JSON.stringify(err));
          result(err, null);
          return;
        }
        result(null, { id: res.insertId, ...newcollection });
      },
    );
  }
  static getAll(result) {
    sql.query('SELECT * FROM collection', (err, res) => {
      if (err) {
        logger.error(JSON.stringify(err));
        result(null, err);
        return;
      }
      result(null, res);
    });
  }
}

module.exports = CustomerCollection;
