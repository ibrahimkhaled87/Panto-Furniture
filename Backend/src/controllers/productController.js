import db from "../config/db.js";
import path from "path";
import fs from "fs";

async function deleteImage(productId) {
    // Get image filename
    const data = await db.query("SELECT * FROM products WHERE id = $1", [productId]);
    const img = data.rows[0].img;
    const type = data.rows[0].type;

    // Delete image
    if (img) {
        const filePath = path.join("uploads", type, img);
        fs.unlink(filePath);
    }
}


export const getProducts = async(req, res) => {
    console.log("GET products called");
    console.log(req.query);
    const { id = "", search = "", type = "", rating = 0,    page="1", limit="5",    ids:rawIds } = req.query;
    const ids = rawIds ? JSON.parse(rawIds) : undefined; //Parse back

    //Search + pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const values = [
        `%${search}%`,
        `%${type}%`,
        parseFloat(rating) || 0,
        id? parseInt(id) : null,
        skip,
        parseInt(limit)
    ];
    if(ids === undefined) {
        const data = await db.query(
            `SELECT *, COUNT(*) OVER() AS total_count FROM products
            WHERE name ILIKE $1
            AND type ILIKE $2
            AND (rating >= $3)
            AND ($4::int IS NULL OR id = $4)
            ORDER BY id
            OFFSET $5
            LIMIT $6`,
            values
        );
        res.json(data.rows);
    }

    //Cart ids
    else {
        const data = await db.query(`SELECT * FROM products WHERE id = ANY($1)`, [ids])
        console.log(data.rows);
        res.json(data.rows);
    }
}

export const getTopProducts = async(req, res) => {
    console.log("GET top products called");
    console.log(req.query);
    const {type} = req.query;

    const data = await db.query(`SELECT 
        p.id,
        p.name,
        p.price,
        p.img,
        p.type,
        p.rating,
        SUM(oi.quantity) AS count 
    FROM order_items oi 
    JOIN products p 
    ON oi.product_id=p.id
    WHERE p.type=$1
    GROUP BY p.id, p.name, p.price, p.img, p.type, p.rating
    ORDER BY SUM(oi.quantity) DESC`, [type]);
    res.json(data.rows);
}

export const createProduct = async(req, res) => {
    console.log("POST products called");
    console.log(req.body);
    const {name, type, price, quantity} = req.body;

    await db.query('INSERT INTO products(img, name, type, price) VALUES ($1, $2, $3, $4)', [req.file.filename, name, type, price]);
    res.json("Data inserted successfully");
}

export const patchProduct = async(req, res) => {
    console.log("PATCH products called");
    const { id, ...fields } = req.body;

    // If image, push img to fields, delete previous image
    if (req.file) {
        fields.img = req.file.filename;

        deleteImage(req.body.id);
    }
    console.log(fields);
    
    // No fields to update
    if (Object.keys(fields).length === 0) {
        return res.status(400).json({
            error: "No fields provided to update"
        });
    }

    // Build SET clause and values dynamically (ex key = $2)
    const setClause = Object.keys(fields)
        .map((key, index) => `${key} = $${index + 1}`)
        .join(", ");

    const values = Object.values(fields);
    values.push(id); //id goes last

    // Send query
    const result = await db.query(`UPDATE products SET ${setClause} WHERE id = $${values.length} RETURNING *`, values); // array of objects
    console.log(result.rows[0]);
    res.json(result.rows[0]);
}

export const deleteProduct = async(req, res) => {
    console.log("DELETE product called");

    //1- delete image
    deleteImage(req.body.id);

    //2- delete product
    await db.query("DELETE FROM products WHERE id = $1", [req.body.id]);

    res.json("Deleted successfully");
}