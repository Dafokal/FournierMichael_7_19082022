import { waitForElementToBeRemoved } from '@testing-library/react';
import React, { useState, createContext } from 'react';

export const LoggedContext = createContext();

export const LoggedProvider = ({ children }) => {
    const [logged, setLogged] = useState(false);
    const [user, setUser] = useState({});

    return (
        <LoggedContext.Provider value={{ logged, setLogged, user, setUser }}>
            {children}
        </LoggedContext.Provider>
    );
};
