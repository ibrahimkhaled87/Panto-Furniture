import db from "../config/db.js";

export const getUsers = async(req, res) => {
    console.log("GET users called");
    console.log(req.query);
    const {search} = req.query;
    const values = [
        `%${search}%`
    ]

    const data = await db.query(`SELECT * FROM users
    WHERE f_name ILIKE $1
    OR l_name ILIKE $1
    OR username ILIKE $1    
    `, values);
    res.json(data.rows);
}

export const deleteUser = async(req, res) => {
    console.log("DELETE user called");
    console.log(req.body);
    const {user} = req.body;

    //Does user exist?
    const data = await db.query(`SELECT * FROM users WHERE username = $1`, [user]);
    if(data.rows.length != 1)
        return res.status(400).json({error: "Username doesn't exist"});

    await db.query('DELETE FROM users WHERE username = $1', [user]);
    res.json("Deleted successfully");
}