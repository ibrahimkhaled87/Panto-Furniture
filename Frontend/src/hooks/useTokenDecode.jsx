import { useState, useEffect } from "react";

function useTokenDecode() {
    const [payload, setPayload] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token) {
            setPayload( JSON.parse(atob(token.split('.')[1])) );
        }
    }, [])

    return {payload};
}

export default useTokenDecode;