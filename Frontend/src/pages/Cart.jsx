import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartItem from "../components/CartItem";
import useFetchGuestCart from "../hooks/useFetchGuestCart";

function Cart() {
    // Fetch guest cart items from backend
    const {guestCart, uploads_path, backendData} = useFetchGuestCart();

    // Calculate subtotal
    const calculateSubtotal = () => {
        if(!backendData) return;

        const subtotal = guestCart.reduce((acc, item, i) => {
            return acc + item.count * backendData.find(el => el.id === item.id).price;
        }, 0)
        return subtotal;
    }    

    return <div className="cart">
        <Header />

        {guestCart.length ===0 
            ? <div className="empty">
                <img src="images/empty-cart.svg" alt="" />
                <p>Your cart is currently empty</p>
                <Link to="/shop" className="no-link"> <p>Explore</p> </Link>
            </div>
            : <div className="content">
                <h1>Your Cart</h1>

                <div className="left">
                    {!backendData ? <p>Loading...</p> : backendData.map(item => 
                        <CartItem key={item.id} id={item.id} img={uploads_path+item.type+"/"+item.img} name={item.name} price={item.price} />
                    )}
                </div>
                <div className="right">
                    <h2>Order Summary</h2>
                    <div className="detail">
                        <p>Subtotal</p>
                        <p className="price sub">${calculateSubtotal()}</p>
                        <p>Discount (-20%)</p>
                        <p className="price discount">-${calculateSubtotal()*20/100}</p>
                        <p>Delivery Fee</p>
                        <p className="price delivery">$15</p>
                        <div className="line"></div>
                        <p className="total-headline">Total</p>
                        <p className="price total">${(calculateSubtotal()*0.8+15).toFixed(2)}</p>
                        <div className="promo">
                            <img src="images/promo-tag.svg" alt="" />
                            <input type="text" placeholder="Add promo code" />
                            <div className="apply">Apply</div>
                        </div>
                        <Link to="/checkout">
                            <div className="checkout">
                                <h4>Go to Checkout</h4>
                                <img src="images/right.svg" alt="" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        }

        <Footer />
    </div>
}

export default Cart;