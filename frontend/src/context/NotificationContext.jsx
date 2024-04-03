import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useNotiContext = () => {
    return useContext(NotificationContext)
}


// eslint-disable-next-line react/prop-types
export const NotificationProvider = ({ children }) => {
    const [state, setState] = useState({});
    return <NotificationContext.Provider value={{ state, setState }}>{children}</NotificationContext.Provider>
}