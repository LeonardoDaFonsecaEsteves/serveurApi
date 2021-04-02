const {mysqlConnect} = require('../../../mysql/mysql');
const winston = require('../../../config/winston');
const { dbConfigMesApks } = require('../config/dbConfig');
const sql = mysqlConnect(dbConfigMesApks);


class CustomerApks {
  static getAll(result) {
    sql.query('SELECT * FROM apks', (err, res) => {
      if (err) {
        winston.error(err);
        result(null, err);
        return;
      }
      result(null, res);
    });
  }
}

module.exports = CustomerApks;
