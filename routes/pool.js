mysql = require('mysql')
var pool = mysql.createPool({
        host: 'localhost',
        port: 3306,
        user: 'root',
        database: 'books',
        password: '1234',
        connectionLimit: 100,


    })
module.exports = pool
