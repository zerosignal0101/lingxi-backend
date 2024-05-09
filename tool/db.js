var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '116.62.197.58',
    user: 'root',
    password: 'Bk1770!Dev@',
    database: 'MakingFriends'
});

module.exports = connection;