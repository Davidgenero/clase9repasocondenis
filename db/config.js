const mysql = require("mysql")
const util = require("util")

const pool = mysql.createPool({
    host: process.env.db_host,
    database: process.env.db_name,
    user: process.env.db_user,
    password: process.env.db_pass,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0

});
pool.getConnection((err, conn) => {
    err ? console.warn("No conectado", { "error": err.message }) : console.log("Conexión establecida...")
    pool.releaseConnection(conn)
})
pool.query = util.promisify(pool.query)

module.exports = pool