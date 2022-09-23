import React, { useState, createContext } from 'react';

export const LoggedContext = createContext();

export const LoggedProvider = ({ children }) => {
    const [userLogged, setUserLogged] = useState('');

    return (
        <LoggedContext.Provider value={{ userLogged, setUserLogged }}>
            {children}
        </LoggedContext.Provider>
    );
};
