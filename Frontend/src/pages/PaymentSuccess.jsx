import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom"
import { useGuestCart } from "../context/GuestCartContext";

export default function PaymentSuccess() {
    console.log("Rendered");
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("merchant_order_id");

    const {clearCart} = useGuestCart();
    useEffect(() => {
        if(success==="true")
            clearCart();
    }, [])  

    return <div className="paymentSuccess">
        <div className="card">
            {success==="true"
            ? <>
                <h2>🎉 Payment Successful!</h2>
                <p> Thank you for your purchase. Your order has been placed successfully.</p>
                <p> <strong>Order ID:</strong> #{orderId} </p>
            </>
            : <>
                <h2>❌ Payment Failed</h2>
                <p> Unfortunately, we couldn’t process your payment. Please try again or use a different payment method. </p>
                <p> <strong>Order ID:</strong> #{orderId} </p>
            </>
            }
            <div className="return">
                <Link to="/">Return to homepage</Link>
            </div>
        </div>
    </div>
}