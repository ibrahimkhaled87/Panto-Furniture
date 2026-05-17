import db from "../config/db.js";

export const getRevenue = async(req, res) => {
    console.log("GET revenue called");

    const data = await db.query(`SELECT
        DATE(created_at) AS day,
        SUM(total_amount) AS revenue
    FROM orders
    WHERE order_status = 'delivered'
    GROUP BY DATE(created_at)
    ORDER BY day`);
    
    res.json(data.rows);
}

export const getPending = async(req, res) => {
    console.log("GET pending called");

    const data = await db.query("SELECT COUNT(*) AS pending_orders FROM orders WHERE order_status='pending'");
    res.json(data.rows);
}

export const getCategoryPercentages = async(req, res) => {
    console.log("GET category percentages called");

    const data = await db.query(`WITH total_sales AS (
    SELECT 
        -- net from orders only
        (SELECT SUM(total_amount)
         FROM orders
         WHERE order_status = 'delivered') AS total_net,

        -- gross from item totals
        (SELECT SUM(oi.quantity * p.price)
         FROM orders o
         JOIN order_items oi
             ON o.id = oi.order_id
         JOIN products p
             ON oi.product_id = p.id
         WHERE o.order_status = 'delivered') AS total_gross
    )

    SELECT 
        p.type,
        SUM(oi.quantity * p.price) AS cat_gross,
        ts.total_gross,
        ts.total_net,
        (SUM(oi.quantity * p.price) / ts.total_gross * ts.total_net) as cat_net
    FROM orders o
    JOIN order_items oi
        ON o.id = oi.order_id
    JOIN products p
        ON oi.product_id = p.id
    CROSS JOIN total_sales ts
    WHERE o.order_status = 'delivered'
    GROUP BY p.type, ts.total_net, ts.total_gross;
    `)

    console.log(data.rows);
    res.json(data.rows);
}