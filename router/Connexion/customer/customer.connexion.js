const {mysqlConnect} = require('../../../mysql/mysql');
const winston = require('../../../config/winston');
const {dbConfigConnexion} = require('../config/dbConfig');

const sql = mysqlConnect(dbConfigConnexion);

class CustomerConnexion {
  constructor(customerConnexion) {
    this.email = customerConnexion.email;
    this.mdp = customerConnexion.mdp;
  }
  static create(newUsers, result) {
    sql.query('INSERT INTO users SET ?', newUsers, (err, res) => {
      if (err) {
        winston.error(err);
        result(err, null);
        return;
      }

      winston.info('created newUsers: ', {
        id: res.insertId,
        ...newUsers,
      });
      result(null, {id: res.insertId, ...newUsers});
    });
  }
  static findByEmail(values, result) {
    const {email} = values;
    sql.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (err, res) => {
          if (err) {
            winston.error(err);
            result(err, null);
            return;
          }
          if (res.length) {
            winston.info('found users: ', res[0]);
            result(null, res[0]);
            return;
          }

          // not found CustomerConnexion with the id
          result({kind: 'not_found'}, null);
        },
    );
  }
}

module.exports = CustomerConnexion;
