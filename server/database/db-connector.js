// require env file that host credentials for database login
require('dotenv').config();

// initializes instances of connection to database
const mysql = require("mysql")
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'sql5.freemysqlhosting.net',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

module.exports.pool = pool;