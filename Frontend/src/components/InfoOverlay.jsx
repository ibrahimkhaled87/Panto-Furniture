import axios from "axios";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import OrderItem from "./OrderItem";
import { useNewStatus } from "../context/NewOrderStatus";

export default function InfoOverlay({id, onClose}) {
  //New status context
  const {newStatus, setNewStatus} = useNewStatus();

  //fetch order items for order id
  const [backendData, setBackendData] = useState();
  useEffect(() => {
    if(!id) return;

    const getData = async() => {
        try {
            const response = await axios.get(`/orders/${id}`)
            setBackendData(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    getData();
  }, [id, newStatus])

  const handleNewStatus = async (e, orderId) => {
    setNewStatus(true);
    const {value} = e.target;
    try {
        const response = await axios.patch("/orders", {order_status: value, order_id: orderId})
        alert(response.data);
        setNewStatus(false);
    } catch (error) {
        console.log(error);
    }
  }

  if (!id) return null;

  return createPortal(
    <div className="overlay info_overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h1>Order #{id}</h1>
        {!backendData? <p>Loading...</p> : 
          <>        
            <div className="info">
              <p>Placed on: {new Date(backendData[0].created_at).toLocaleString()}</p>
              <p>Customer: {backendData[0].name}</p>
              <p>Email: {backendData[0].email}</p>
              <p>Phone: {backendData[0].phone}</p>
              <p>Address: {backendData[0].address}</p>
              <p>Payment Status: {backendData[0].payment_status}</p>
            </div>
            <div className="items">
              {backendData.map(item => (
                <OrderItem product_id={item.product_id} quantity={item.quantity} />
              )) }
            </div>
            <div className="status">
              <div className="view">
                <div className={`point ${["pending","processing","shipped","delivered"].includes(backendData[0].order_status)? "checked" : ""}`}><p>Pending</p></div>
                <div className={`point ${["processing","shipped","delivered"].includes(backendData[0].order_status)? "checked" : ""}`}><p>Processing</p></div>
                <div className={`point ${["shipped","delivered"].includes(backendData[0].order_status)? "checked" : ""}`}><p>Shipped</p></div>
                <div className={`point ${["delivered"].includes(backendData[0].order_status)? "checked" : ""}`}><p>Delivered</p></div>
              </div>
              <div className="actions">
                {backendData[0].order_status==="pending"? <button value="processing" onClick={(e) => handleNewStatus(e, id)}>Process</button> :
                backendData[0].order_status==="processing"? <button value="shipped" onClick={(e) => handleNewStatus(e, id)}>Ship</button> :
                backendData[0].order_status==="shipped"? <button value="delivered" onClick={(e) => handleNewStatus(e, id)}>Deliver</button> :
                null
                }
              </div>
            </div>
          </>
        }
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
}