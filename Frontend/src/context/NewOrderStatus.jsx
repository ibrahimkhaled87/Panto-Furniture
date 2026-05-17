import {createContext, useContext, useState } from "react";

const NewStatusContext = createContext();

export function NewStatusProvider({children}) {
    const [newStatus, setNewStatus] = useState(false);

    return (
        <NewStatusContext.Provider value={{newStatus, setNewStatus}} >
            {children}
        </NewStatusContext.Provider>
    )
}

export function useNewStatus() {
    return useContext(NewStatusContext);
}