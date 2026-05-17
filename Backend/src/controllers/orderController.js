import db from "../config/db.js";
import createPaymentSession from "../services/paymobService.js";

async function getSubtotal(items) {
    const ids = [];
    items.map(item => ids.push(item.id));
    
    const quantities = [];
    items.map(item => quantities.push(item.count));
    
    const prices = [];
    const data = await db.query('SELECT price FROM products WHERE id = ANY($1)', [ids]);
    data.rows.map(el => prices.push(el.price));

    const subtotal = quantities.reduce((sum, qty, i) => {
        return sum + qty * prices[i];
    }, 0)

    return subtotal;
}


export const getOrders = async(req, res) => {
    console.log("GET orders called");
    console.log(req.query);
    const {search, order_status, page=1, limit, username} = req.query;

    // Dynamic query
    let query = "SELECT *, COUNT(*) OVER() AS total_count FROM orders";
    let values = [];
    if(search || order_status) {
        query += " WHERE";
        if(search) {
            values.push(parseInt(search));
            query += ` id=$${values.length}`
        }
        if(order_status) {
            if(values.length >= 1) query += " AND";
            values.push(order_status);
            query += ` order_status=$${values.length}`
        }
    }
    if(username) {
        values.push(username);
        query += ` WHERE username=$${values.length}`;
    }
    query += " ORDER BY id";
    if(limit) {
        values.push((page-1)*limit);
        query += ` OFFSET $${values.length}`;
        values.push(limit);
        query += ` LIMIT $${values.length}`;
    }

    const data = await db.query(query, values);
    res.json(data.rows);
}

export const getOrderInfo = async(req, res) => {
    console.log("GET order items called");
    console.log(req.params);
    const {id} = req.params;

    const data = await db.query("SELECT * FROM order_items JOIN orders ON order_items.order_id=orders.id WHERE order_id = $1", [id]);
    console.log(data.rows)
    res.json(data.rows);
}

export const postOrder = async(req, res) => {
    console.log("POST order called");
    console.log(req.body);
    const {username="", email, name, phone, address, payment_method, items} = req.body;

    //1- insert order
    const total = (await getSubtotal(items) * 80 / 100) + 15;
    const order_id = await db.query('INSERT INTO orders(username, email, name, phone, address, total_amount) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id', [username, email, name, phone, address, total]);

    //2- insert order items
    for(const item of items) {
        await db.query('INSERT INTO order_items(order_id, product_id, quantity) VALUES ($1, $2, $3)', [order_id.rows[0].id, item.id, item.count]);
    }

    if(payment_method === "online") {
        const iframeUrl = await createPaymentSession({user:{email, name, phone}, items: items, amount: total, order_id: order_id.rows[0].id});
        return res.json(iframeUrl);
    }

    res.json("Inserted order");
}

export const webhook = async(req, res) => {
    console.log("Post webhook called");
    const data = req.body.obj;

    const success = data.success;
    const order_id = data.order.merchant_order_id;
    const transactionId = data.id;

    if(success) {
        console.log("Payment successfull");
        console.log("order id: "+order_id);
        await db.query("UPDATE orders SET payment_status='paid' WHERE id=$1", [order_id]);
    }
    else 
        console.log("Payment failed");

    res.sendStatus(200);
}

export const patchOrder = async(req, res) => {
    console.log("PATCH order called");
    console.log(req.body);
    const {order_status, order_id} = req.body;

    await db.query('UPDATE orders SET order_status = $1 WHERE id = $2', [order_status, order_id]);
    res.json("Recieved");
}