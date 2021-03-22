const {mysqlConnect} = require('../../../config/mysql');
const {dbConfigRaquel} = require('../config/dbConfig');
const winston = require('../../../config/winston');
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
            winston.error(err);
            result(err, null);
            return;
          }

          winston.info('created collection: ', {
            id: res.insertId,
            ...newcollection,
          });
          result(null, {id: res.insertId, ...newcollection});
        },
    );
  }
  static findById(collectionId, result) {
    sql.query(
        `SELECT * FROM collection WHERE id = ${collectionId}`,
        (err, res) => {
          if (err) {
            winston.error(err);
            result(err, null);
            return;
          }

          if (res.length) {
            winston.info('found collection: ', res[0]);
            result(null, res[0]);
            return;
          }

          // not found CustomerCollection with the id
          result({kind: 'not_found'}, null);
        },
    );
  }
  static getAll(result) {
    sql.query('SELECT * FROM collection', (err, res) => {
      if (err) {
        winston.error(err);
        result(null, err);
        return;
      }

      winston.info('collection: ', res);
      result(null, res);
    });
  }
  static updateById(id, customerCollection, result) {
    sql.query(
        'UPDATE collection SET collectionName = ?, WHERE collectionId = ?',
        [customerCollection.collectionName, collectionId],
        (err, res) => {
          if (err) {
            winston.error(err);
            result(null, err);
            return;
          }

          if (res.affectedRows == 0) {
            // not found CustomerCollection with the id
            result({kind: 'not_found'}, null);
            return;
          }

          winston.info('updated customerCollection: ', {
            id: id,
            ...customerCollection,
          });
          result(null, {id: id, ...customerCollection});
        },
    );
  }
  static remove(id, result) {
    sql.query('DELETE FROM collection WHERE id = ?', id, (err, res) => {
      if (err) {
        winston.error(err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found CustomerCollection with the id
        result({kind: 'not_found'}, null);
        return;
      }

      winston.info('deleted customerCollection with id: ', id);
      result(null, res);
    });
  }
  static removeAll(result) {
    sql.query('DELETE FROM collection', (err, res) => {
      if (err) {
        winston.error(err);
        result(null, err);
        return;
      }

      winston.info(`deleted ${res.affectedRows} collection`);
      result(null, res);
    });
  }
}

module.exports = CustomerCollection;
