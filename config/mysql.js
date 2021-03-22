const mysql = require('mysql');
const fs = require('fs');
const mysqlConnect = (config) => {
    const connection = mysql.createConnection({
        ...config,
        host: process.env.HOST_MYSQL,
        port: parseInt(process.env.PORT_MYSQL),
        connectionLimit: parseInt(process.env.CON_MYSL),
        compress: process.env.COMP_MYSQL,
        connectTimeout: parseInt(process.env.CON_TO_MYSQL),
        socketTimeout: parseInt(process.env.SOCK_TO_MYSQL),
        rowsAsArray: process.env.ROW_ARR_MYSQL,
    });;
    connection.connect((error) => {
        if (error) {
            throw error;
        }
    });
    return connection;
};

exports.mysqlConnect = mysqlConnect
