const { Pool } = require("pg")

module.exports = new Pool ({
    user: 'postgre',
    password: "Lu1505941",
    host: 'localhost',
    port: 5432,
    database: gymmanager
}) 