const {mysqlConnect} = require('../../../mysql/mysql');
const {dbConfigRaquel} = require('../config/dbConfig');
const logger = require('../../../config/winston');
const sql = mysqlConnect(dbConfigRaquel);

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
        logger.error(JSON.stringify(err));
        result(err, null);
        return;
      }
      result(null, {id: res.insertId, ...newLivre});
    });
  }
  static findById(livreId, result) {
    sql.query(`SELECT * FROM livre WHERE id = ${livreId}`, (err, res) => {
      if (err) {
        logger.error(JSON.stringify(err));
        result(err, null);
        return;
      }

      if (res.length) {
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
        logger.error(JSON.stringify(err));
        result(null, err);
        return;
      }
      result(null, res);
    });
  }
  static updateById(id, customerLivre, result) {
    const {imagesUrl, titre, possede, collection} = customerLivre;
    const possedeToBdd = possede ? 1 : 0;
    sql.query(
        `UPDATE livre SET imagesUrl = "${imagesUrl}", titre = "${titre}", possede = ${possedeToBdd}, collection = "${collection}" WHERE livreId = ${id}`,
        (err, res) => {
          if (err) {
            logger.error(JSON.stringify(err));
            result(null, err);
            return;
          }

          if (res.affectedRows == 0) {
            // not found CustomerLivre with the id
            result({kind: 'not_found'}, null);
            return;
          }
          result(null, {id: id, ...customerLivre});
        },
    );
  }
  static remove(id, result) {
    sql.query('DELETE FROM livre WHERE id = ?', id, (err, res) => {
      if (err) {
        logger.error(JSON.stringify(err));
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found CustomerLivre with the id
        result({kind: 'not_found'}, null);
        return;
      }
      result(null, res);
    });
  }
  static removeAll(result) {
    sql.query('DELETE FROM livre', (err, res) => {
      if (err) {
        logger.error(JSON.stringify(err));
        result(null, err);
        return;
      }
      result(null, res);
    });
  }
}

module.exports = CustomerLivre;
