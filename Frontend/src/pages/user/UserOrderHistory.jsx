import api from "../../utils/axios";
import { useEffect, useState } from "react"
import useTokenDecode from "../../hooks/useTokenDecode";

export default function UserOrderHistory() {
    //Decode
    const {payload} = useTokenDecode();

    //Get my orders
    const [userOrders, setUserOrders] = useState();
    useEffect(() => {
        if(!payload) return;

        async function getData() {
            try {
                const response = await api.get("/orders", {params: {username: payload.username}});
                setUserOrders(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, [payload])

    return <div className="userOrderHistory">
        {!userOrders? <p>Loading...</p> : userOrders.map(order => (
            <div className="orderCard">
                <p>{"Order ID: "+order.id}</p>
                <p>{"Created at: "+new Date(order.created_at).toLocaleString()}</p>
                <p>{"Total: "+order.total_amount}</p>
                <p>{"Payment Status: "+order.payment_status}</p>
                <p>Order Status: <span className={order.order_status}>{order.order_status}</span></p>
            </div>
        )) }
    </div>
}