import { useState, useEffect } from "react";
import api from "../utils/axios";

export default function useFetchProducts(search, refresh) {
    const uploads_path = `${process.env.REACT_APP_API_URL}/uploads/`;
    const [backendData, setBackendData] = useState();

    useEffect(() => {
        const controller = new AbortController(); // 2 - Cancel previous requests
        const fetchData = async () => {
            try {
                console.log(search);
                const response = await api.get("/products", {
                    params: search,    
                    signal: controller.signal
                });
                setBackendData(response.data);
            } catch (error) {
                axios.isCancel(error) ? console.log("Previous request canceled") : console.log("Error fetching: "+error);
            }
        };
        // 1 - Debounce fetchData call 300ms after last keystroke (i.e. search value change and. re-render)
        const handler = setTimeout(() => {
            fetchData();
        }, 300)

        //Cleanup (on new render)
        return () => {
            clearTimeout(handler);
            controller.abort();
        }
    }, [search, refresh]);

    return {uploads_path, backendData};
}