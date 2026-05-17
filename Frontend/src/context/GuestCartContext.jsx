import { useContext, createContext, useState, useEffect } from "react";

const GuestCartContext = createContext();


export function GuestCartProvider({children}) {
    const [guestCart, setGuestCart] = useState(() => {
        const stored = localStorage.getItem("guestCart");
        return stored ? JSON.parse(stored).filter(item => item.count > 0) : [];
    })

    useEffect(() => {
        localStorage.setItem("guestCart", JSON.stringify(guestCart));
    }, [guestCart])

    function updateItem(id, count) {
        setGuestCart(prev => {
            //If count zero , remove
            if(count === 0) {
                return prev.filter(item => item.id !== id);
            }
            //update
            const existing = prev.find(item => item.id === id);
            if (existing) {
                return prev.map(item =>
                    item.id === id ? { ...item, count } : item
                );
            }
            //Add
            return [...prev, { id, count }];
        });
    }

    function clearCart() {
        setGuestCart([]);
    }

    return (
        <GuestCartContext.Provider value={{guestCart, updateItem, clearCart}}>
            {children}
        </GuestCartContext.Provider>
    )
}


// Custom hook for easy usage
export function useGuestCart() {
    return useContext(GuestCartContext);
}