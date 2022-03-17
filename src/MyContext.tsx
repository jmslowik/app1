import React, { createContext, useContext } from "react";

const contextValue = {
    contextSource: 'App1'
}  

const MyContext = createContext(contextValue);

export const MyContextProvider = ({children, value}) => (
    <MyContext.Provider value={value || contextValue}>
        {children}
    </MyContext.Provider>
)

export const useMyContext = () => useContext(MyContext);