import { useState, useEffect } from "react";
import ProductAdd from "./ProductAdd";
import { useGuestCart } from "../context/GuestCartContext";

function CartItem(params) {
    //Check existing count? (initialization)
    const {guestCart, updateItem} = useGuestCart();
    const existingItem = guestCart.find(item => item.id === params.id);
    const [count, setCount] = useState(existingItem?.count || 0);

    useEffect(() => {
        updateItem(params.id, count)
    }, [count, params.id])


    if (count === 0) return null;

    return <div className="cartItem">
        <div className="img">
            <img src={params.img} alt="" />
        </div>
        <div className="info">
            <h4>{params.name}</h4>
            {/* <p><span>Size:</span> Large</p>
            <p><span>Color:</span> White</p> */}
            <p className="price">{"$"+params.price*count}</p>
        </div>
        <div className="controls">
            <img src="images/delete.svg" alt="" onClick={() => setCount(0)}/>
            <ProductAdd count={count} setCount={setCount} />
        </div>
    </div>
}

export default CartItem;