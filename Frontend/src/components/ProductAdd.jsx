import {useState, useEffect} from "react";

function ProductAdd({count, setCount}) {
    function qtyIncrease(e) {
        e.stopPropagation();
        setCount(prev => prev + 1);
    }
    function qtyDecrease(e) {
        e.stopPropagation();
        setCount(prev => prev - 1);
    }

    return <div className="productAdd">
        <p className="minus" onClick={qtyDecrease}>-</p>
        <p className="quantity">{count}</p>
        <p className="plus" onClick={qtyIncrease}>+</p>
    </div>
}

export default ProductAdd;