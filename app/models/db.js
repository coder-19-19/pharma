const mysql = require("mysql");
const dbConfig = require("../config/db.config.js")

//* Database ilə əlaqə qururuq...
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
})

//* MySql əlaqəsini açırıq
connection.connect(error => {
    if(error) {
        console.log('Xəta :' + error)
      }
      else{
        console.log('Database-ə uğurla qoşuldu...')
      }
})

module.exports = connection