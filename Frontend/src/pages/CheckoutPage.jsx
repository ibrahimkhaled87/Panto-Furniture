import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CheckoutItem from "../components/CheckoutItem";
import api from "../utils/axios";
import useFetchGuestCart from "../hooks/useFetchGuestCart";
import useTokenDecode from "../hooks/useTokenDecode";

function CheckoutPage() {
    // Navigation object
    const navigate = useNavigate();

    // Fetch guest cart items from backend
    const {guestCart, clearCart, uploads_path, backendData} = useFetchGuestCart();

    // Calculate subtotal
    const calculateSubtotal = () => {
        if(!backendData) return;

        const subtotal = guestCart.reduce((acc, item, i) => {
            return acc + item.count * backendData.find(el => el.id === item.id).price;
        }, 0)
        return subtotal;
    }    
    
    // Selected payment method
    const [checkedPayment, setCheckedPayment] = useState("online");
    
    //Logged in user?
    const {payload} = useTokenDecode();

    // Get entered values
    const [orderInfo, setOrderInfo] = useState({email:"", name:"", phone:"", address:"", payment_method: checkedPayment});
    const handleChange = (e) => {
        const {name, value} = e.target;
        setOrderInfo(prev => ({
            ...prev,
            [name]: value
        }))
    }
    // Send to backend
    const handleConfirm = async () => {
        if(orderInfo.email==="" || orderInfo.name==="" || orderInfo.address==="" || orderInfo.phone==="") {
            alert("Missing fields");
            return;
        }

        try {
            const response = await api.post("/orders", {...orderInfo, username: payload?.username||"", items: guestCart});
            if(checkedPayment==="online") {
                window.location.href =response.data;
            }

            else {
                alert(response.data);
                clearCart();
                navigate("/");
            }
        } catch (error) {
            alert(error);
        }
    }
    

    return <div className="checkoutPage">
        <div className="minimal-header">
            <Link className="minimal-logo" to="/">
                <h1>Panto</h1>
            </Link>
            <Link className="minimal-bag" to="/cart">
                <img src="images/checkout-bag.svg" alt="" />
            </Link>
        </div>

        <div className="content">
            <div className="left">
                <div className="contact">
                    <h4>Contact</h4>
                    <input type="text" name="email" placeholder="Email" required onChange={(e) => handleChange(e)}/>
                </div>
                <div className="shipping-info">
                    <h4>Shipping Info</h4>
                    <input type="text" name="name" placeholder="Name" required onChange={(e) => handleChange(e)}/>
                    <input type="text" name="address" placeholder="Address" required onChange={(e) => handleChange(e)}/>
                    <input type="text" name="phone" placeholder="Phone number" required onChange={(e) => handleChange(e)}/>
                </div>
                <div className="payment-method">
                    <h4>Payment Method</h4>
                    <div className="options">
                        <label className="option selected">
                            <input type="radio" name="PM" id="COD" value="COD" checked={checkedPayment === "COD"} onChange={() => setCheckedPayment("COD")}/>
                            Cash on Delivery
                        </label>
                        <label className="option">
                            <input type="radio" name="PM" id="online" value="online" checked={checkedPayment === "online"} onChange={() => setCheckedPayment("online")}/>
                            Online Payment
                        </label>
                        <label className={`option info ${checkedPayment === "online" ? "show" : ""}`}>
                            You'll be redirected to Pay via (Debit/Credit cards) to complete your purchase.
                        </label>
                    </div>
                </div>
                <button type="submit" onClick={() => handleConfirm()}>Place Order</button>
            </div>

            <div className="order-summary">
                <h4>Order Summary</h4>
                {guestCart.length === 0 ? <p>Your cart is empty</p>
                    : !backendData ? <p>Loading...</p> 
                    : backendData.map(item => 
                        <CheckoutItem key={item.id} id={item.id} name={item.name} img={uploads_path+item.type+"/"+item.img} price={item.price} /> 
                    )
                }
                <div className="subtotal">
                    <p>Subtotal</p>
                    <p className="price">${calculateSubtotal()}</p>

                    <p>Discount (20%)</p>
                    <p className="price">-${calculateSubtotal()*20/100}</p>

                    <p>Shipping</p>
                    <p className="price">$15</p>

                    <h3>Total</h3>
                    <h3 className="price">${(calculateSubtotal()*80/100+15).toFixed(2)}</h3>
                </div>
            </div>
        </div>
    </div>
}

export default CheckoutPage;