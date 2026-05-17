import axios from "axios";
import { useState, useEffect } from "react";
import InfoOverlay from "../../components/InfoOverlay"; 
import { useNewStatus } from "../../context/NewOrderStatus";

export default function AdminOrders() {
    // Get search values
    const [search, setSearch] = useState({search: "", order_status: "", page: 1});
    function handleChange(e) {
        const {name, value} = e.target;
        setSearch(prev => ({
            ...prev,
            [name]: value
        }))
    }
    useEffect(() => {
        console.log(search);
    }, [search])

    const {newStatus} = useNewStatus();

    //Fetch orders
    const [backendData, setBackendData] = useState();
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get("/orders", {
                    params: {
                        ...search.search && {search: search.search},
                        ...search.order_status && {order_status: search.order_status},
                        ...search.page && {page: search.page},
                        limit: 12
                    }
                });
                setBackendData(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchOrders();
    }, [search, newStatus]);

    // Get number of pages
    const limit = 12;
    const numberOfPages = Math.ceil( (backendData?.[0]?.total_count ?? 0) / limit );

    const [overlayId, setOverlayId] = useState(null);


    return <div className="adminOrders">
        <div className="searchArea">
            <input type="text" name="search" placeholder="Search order by id" onChange={(e) => handleChange(e)}/>
            <div className="filter order_status">
                <label htmlFor="type">Order Status</label>
                <select name="order_status" id="order_status" onChange={(e) => handleChange(e)}>
                    <option value="">All</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                </select>
            </div>
        </div>
        <table className="orders">
            <thead>
                <th>Order ID</th>
                <th>Username</th>
                <th>Customer</th>
                <th>Total Amount</th>
                <th>Created at</th>
                <th>Order Status</th>
            </thead>
            <tbody>
                {!backendData? <p>Loading...</p> : backendData.map((item, i) => (
                    <tr className={(i+1)%2 === 0? "even" : ""} onClick={() => setOverlayId(item.id)}>
                        <td>{item.id}</td>
                        <td>{item.username}</td>
                        <td>{item.name}</td>
                        <td>{item.total_amount}</td>
                        <td>{new Date(item.created_at).toLocaleString()}</td>
                        <td>
                            <div className={`status ${
                                item.order_status==="pending" ? "pending" :
                                item.order_status==="processing" ? "processing" :
                                item.order_status==="shipped" ? "shipped" :
                                item.order_status==="delivered" ? "delivered" :
                                item.order_status==="cancelled" ? "cancelled" :
                                ""
                            }`}>
                                {item.order_status}
                            </div>
                        </td>
                    </tr>
                )) } 
            </tbody>
        </table>
        <div className="buttons">
            {numberOfPages>1? Array.from({ length: numberOfPages }, (_, i) => (
                <button name="page" value={i + 1} onClick={handleChange}>{i + 1}</button>
            )) : null}
        </div>

        <InfoOverlay id={overlayId} onClose={() => setOverlayId(null)} />
    </div>
}