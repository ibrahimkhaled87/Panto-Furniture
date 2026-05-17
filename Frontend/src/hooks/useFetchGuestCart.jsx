import { useMemo } from "react";
import { useGuestCart } from "../context/GuestCartContext";
import useFetchProducts from "./useFetchProducts";

export default function useFetchGuestCart() {
    // Guest cart context
    const {guestCart, clearCart} = useGuestCart();
    
    // Fetch ids from guestCart
    const ids = useMemo(() => {
        const arr = guestCart.map(item => item.id);
        return {ids: JSON.stringify(arr)}; //String before sending
    }, [guestCart])
    
    // Fetch products from ids
    const { uploads_path, backendData } = useFetchProducts(ids);


    return {guestCart, clearCart, uploads_path, backendData};
}