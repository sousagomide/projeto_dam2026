const { Pool } = require('pg')
require('dotenv').config()

const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASENAME,
    max: 10,
    idleTimeoutMillis: 30000
}

const pool = new Pool(dbConfig)

const query = async (text, params) => {
    return await pool.query(text, params)
}

const close = async () => {
    await pool.end()
}

module.exports = {query, close}