const pool = require ("../db/db_config")
const uuid = require("uuid")

let user = {
    GET: async(req,res) => {
        let response = await pool.query("SELECT * FROM users ORDER BY user_id ASC")
        res.status(200).json(response.rows)
    }
}

module.exports = user