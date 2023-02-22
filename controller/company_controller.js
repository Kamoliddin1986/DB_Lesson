const pool = require ("../db/db_config")
const uuid = require("uuid");


let user = {
    GET: async(req,res) => {
        let response = await pool.query("SELECT * FROM users_tb ORDER BY user_id ASC")
        console.log(response);
        res.status(200).json(response.rows)
    },
    CREATE_USER:  async(req,res) => {
        console.log(req.body);
        const { first_name, last_name,role, email, age, password } = req.body
        const response = await pool.query(
            "INSERT INTO email_tb (email_id,email_title) VALUES ($1, $2) returning email_id",
            [uuid.v4().slice(0,29), email]
        );
        respons = await pool.query(
            "INSERT INTO users_tb (user_id, first_name, last_name,role, password, email_id, age) VALUES ($1,$2, $3, $4, $5, $6, $7)",
            [uuid.v4().slice(0,29), first_name, last_name, role, password, response.rows[0].email_id, age]
        );
        res.send('OK')
    },
    UPDATE_USER: async(req,res) => {
        const { user_id } = req.params
        let {first_name, last_name, role, password, email, age } = req.body
        const foundedUser = await pool.query("SELECT * FROM users_tb WHERE user_id = $1", 
        [user_id.trim()])

        if(!foundedUser.rows[0]){
            return res,send({
                msg: 'user not founded!'
            })
        }
        first_name = first_name ? first_name : foundedUser.rows[0].first_name
        last_name = last_name ? last_name : foundedUser.rows[0].last_name
        role = role ? role : foundedUser.rows[0].role
        password = password ? password : foundedUser.rows[0].password
        age = age ? age : foundedUser.rows[0].age

        email && await pool.query(
            "UPDATE email_tb SET email_title = $1 WHERE email_id =$2",
            [email, foundedUser.rows[0].email_id]
        );
        const response = await pool.query("UPDATE users_tb SET first_name = $1, last_name = $2, role = $3, password = $4, email_id = $5, age = $6 WHERE user_id = $7",
        [first_name, last_name, role, password,foundedUser.rows[0].email_id, age, user_id])
        res.send("Update")
    },
    DELETE_USER: async(req,res) => {
        const { user_id } = req.params

       let result = await pool.query("DELETE FROM users where user_id = $1 returning user_id", [user_id.trim()])

       if(!result.rows[0]) return res.send({ msg: "User not found!" })
        res.send({
            msg: 'Deleted user!',
            result: result.rows[0]
        })

    }

}

module.exports = user