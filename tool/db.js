var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '116.62.197.58',
    user: 'root',
    password: 'Bk1770!Dev@',
    database: 'MakingFriends'
});

//var connection = mysql.createConnection({
//    host: '127.0.0.1',
//    user: 'root',
//    password: '123456',
//    database: 'MakingFriends'
//});
module.exports = connection;