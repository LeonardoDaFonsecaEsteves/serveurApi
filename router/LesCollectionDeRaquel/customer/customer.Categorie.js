const { mysqlConnect } = require('../../../mysql/mysql');
const { dbConfigRaquel } = require('../config/dbConfig');
const logger = require('../../../config/winston');
const sql = mysqlConnect(dbConfigRaquel);

class CustomerCategorie {
  constructor(customerCategorie) {
    this.categorie = customerCategorie.categorie;
    this.collection = customerCategorie.collection;
  }
  static create(newCategorie, result) {
    sql.query('INSERT INTO categorie SET ?', newCategorie, (err, res) => {
      if (err) {
        logger.error(JSON.stringify(err));
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...newCategorie });
    });
  }
  static getAll(result) {
    sql.query('SELECT * FROM categorie', (err, res) => {
      if (err) {
        logger.error(JSON.stringify(err));
        result(null, err);
        return;
      }
      result(null, res);
    });
  }
}
module.exports = CustomerCategorie;
