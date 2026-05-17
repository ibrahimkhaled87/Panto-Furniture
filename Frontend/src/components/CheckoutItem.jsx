import { useGuestCart } from "../context/GuestCartContext"

export default function CheckoutItem(params) {
    const {guestCart} = useGuestCart();
    const count = guestCart.find(item => item.id === params.id).count;    
    
    return <div className="checkoutItem">
        <div className="img">
            <img src={params.img} alt="" />
            <p>{count}</p>
        </div>
        <div className="name">
            <h4>{params.name}</h4>
        </div>
        <div className="price">
            <p>{"$"+params.price*count}</p>
        </div>
    </div>
}