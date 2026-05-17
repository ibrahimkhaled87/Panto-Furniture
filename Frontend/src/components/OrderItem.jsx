import { useMemo } from "react";
import useFetchProducts from "../hooks/useFetchProducts";

export default function OrderItem({product_id, quantity}) {
    const param = useMemo(() => {
        return {ids: JSON.stringify([product_id])}; //String before sending
    }, [product_id])

    const {uploads_path, backendData} = useFetchProducts(param);
    console.log(backendData);

    return <div className="content">
        {!backendData? <p>Loading...</p> : backendData.map(el => (
            <div className="orderItem">
                <p>{el.name}</p>
                <p>{"quantity: "+quantity}</p>
            </div>
        )) }
    </div>
}