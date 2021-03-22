const {mysqlConnect} = require('../../../config/mysql');
const {dbConfigRaquel} = require('../config/dbConfig');
const winston = require('../../../config/winston');
const sql = mysqlConnect(dbConfigRaquel);

/**
 *
 */

class CustomerLivre {
  constructor(customerLivre) {
    this.livreId = customerLivre.livreId;
    this.imagesUrl = customerLivre.imagesUrl;
    this.titre = customerLivre.titre;
    this.possede = customerLivre.possede;
    this.collection = customerLivre.collection;
  }
  static create(newLivre, result) {
    sql.query('INSERT INTO livre SET ?', newLivre, (err, res) => {
      if (err) {
        winston.error(err);
        result(err, null);
        return;
      }

      winston.info('created livre: ', {id: res.insertId, ...newLivre});
      result(null, {id: res.insertId, ...newLivre});
    });
  }
  static findById(livreId, result) {
    sql.query(`SELECT * FROM livre WHERE id = ${livreId}`, (err, res) => {
      if (err) {
        winston.error(err);
        result(err, null);
        return;
      }

      if (res.length) {
        winston.info('found livre: ', res[0]);
        result(null, res[0]);
        return;
      }

      // not found CustomerLivre with the id
      result({kind: 'not_found'}, null);
    });
  }
  static getAll(result) {
    sql.query('SELECT * FROM livre', (err, res) => {
      if (err) {
        winston.error(err);
        result(null, err);
        return;
      }

      winston.info('livre: ', res);
      result(null, res);
    });
  }
  static updateById(id, customerLivre, result) {
    sql.query(
        'UPDATE livre SET \
        imagesUrl = ?, \
        titre = ?, \
        possede = ? \
        collection = ?, \
        WHERE livreId = ?',
        [
          customerLivre.imagesUrl,
          customerLivre.titre,
          customerLivre.possede,
          customerLivre.collection,
          customerLivre.livreId,
        ],
        (err, res) => {
          if (err) {
            winston.error(err);
            result(null, err);
            return;
          }

          if (res.affectedRows == 0) {
            // not found CustomerLivre with the id
            result({kind: 'not_found'}, null);
            return;
          }

          winston.info('updated customerLivre: ', {
            id: id,
            ...customerLivre,
          });
          result(null, {id: id, ...customerLivre});
        },
    );
  }
  static remove(id, result) {
    sql.query('DELETE FROM livre WHERE id = ?', id, (err, res) => {
      if (err) {
        winston.error(err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found CustomerLivre with the id
        result({kind: 'not_found'}, null);
        return;
      }

      winston.info('deleted customerLivre with id: ', id);
      result(null, res);
    });
  }
  static removeAll(result) {
    sql.query('DELETE FROM livre', (err, res) => {
      if (err) {
        winston.error(err);
        result(null, err);
        return;
      }

      winston.info(`deleted ${res.affectedRows} livre`);
      result(null, res);
    });
  }
}

module.exports = CustomerLivre;
