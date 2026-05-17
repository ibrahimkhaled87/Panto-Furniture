import db from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export const login = async(req, res) => {
    console.log("POST login called");
    console.log(req.body);
    const {user, pass} = req.body;

    //Does user exist in db?
    const data = await db.query("SELECT * FROM users WHERE username = $1", [user]);
    if(data.rows.length === 0)
        return res.status(400).json({error: "User not found"})

    //Is password correct?
    const validPassword = await bcrypt.compare(pass, data.rows[0].password);
    if(!validPassword)
        return res.status(400).json({error: "Invalid password"});

    const token = jwt.sign(
        { username: data.rows[0].username,
            f_name: data.rows[0].f_name,
            l_name: data.rows[0].l_name,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
    res.json({token});
}

export const signup = async(req, res) => {
    console.log("POST signup called");
    console.log(req.body);
    const {f_name, l_name, user, pass, confirm_pass} = req.body;

    //Are psswords same?
    if(pass != confirm_pass)
        return res.status(400).json({error: "Passwords do not match"});

    //Does user exist?
    const data = await db.query(`SELECT * FROM users WHERE username = $1`, [user]);
    if(data.rows.length === 1)
        return res.status(400).json({error: "Username already exists"});

    const hashedPass = await bcrypt.hash(pass, 10); //hash pass
    await db.query('INSERT INTO users(f_name, l_name, username, password) VALUES ($1, $2, $3, $4)', [f_name, l_name, user, hashedPass]);
    res.json("Registered successfully");
}