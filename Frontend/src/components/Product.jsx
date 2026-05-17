import React, { useEffect, useState, useRef } from "react";
import ProductAdd from "./ProductAdd";
import { useNavigate } from "react-router-dom";
import { useGuestCart } from "../context/GuestCartContext";

function Product({id, img="", type="NaN", name="NaN", rating="NaN", price="$0"}) {
    //Navigator
    const navigate = useNavigate();

    //Ref for this component render (THIS addBtn and productAdd)
    const productRef = useRef();

    //Check existing count? (initialization)
    const {guestCart, updateItem} = useGuestCart();
    const existingItem = guestCart.find(item => item.id === id);
    const [count, setCount] = useState(existingItem?.count || 0);

    //First add to cart (move count)
    function addToCart(e) {
        e.stopPropagation(); // prevents triggering parent onClick
        setCount(prev => prev + 1);
    }

    useEffect(() => {
        /* Change look based on count */
        const addButton = productRef.current.querySelector(".add")
        const productAdd = productRef.current.querySelector(".productAdd");
        if (!addButton || !productAdd) return;
        if(count > 0) {
            addButton.style.display = "none";
            productAdd.style.display = "flex";
        }
        else {
            addButton.style.display = "block";
            productAdd.style.display = "none";     
        }

        /* Persistent cart */
        updateItem(id, count);
    }, [count]);

    return <div ref={productRef} onClick={() => navigate(`/productpage/${id}`)} className="product">
        <img src={img} alt="" />
        <div className="details">
            <h5>{type}</h5>
            <h2>{name}</h2>
            <p className="rating">{rating}</p>
            <p className="price">{price}</p>
            <ProductAdd count={count} setCount={setCount}/>
            <p className="add" onClick={addToCart}>+</p>
        </div>
    </div>
}

export default Product;