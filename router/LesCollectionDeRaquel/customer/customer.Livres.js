const { mysqlConnect } = require('../../../mysql/mysql');
const { dbConfigRaquel } = require('../config/dbConfig');
const logger = require('../../../config/winston');
const sql = mysqlConnect(dbConfigRaquel);

class CustomerLivre {
  constructor(customerLivre) {
    this.livreId = customerLivre.livreId;
    this.imagesUrl = customerLivre.imagesUrl;
    this.titre = customerLivre.titre;
    this.possede = customerLivre.possede;
    this.collection = customerLivre.collection;
    this.categorie = customerLivre.categorie;
  }
  static create(newLivre, result) {
    sql.query('INSERT INTO livre SET ?', newLivre, (err, res) => {
      if (err) {
        logger.error(JSON.stringify(err));
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...newLivre });
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
    const { imagesUrl, titre, possede, collection } = customerLivre;
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
          result({ kind: 'not_found' }, null);
          return;
        }
        this.getAll(result)
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
        result({ kind: 'not_found' }, null);
        return;
      }
      result(null, res);
    });
  }
}

module.exports = CustomerLivre;
