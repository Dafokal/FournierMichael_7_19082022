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

export const EditContext = createContext();

export const EditProvider = ({ children }) => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <EditContext.Provider value={{ isEditing, setIsEditing }}>
            {children}
        </EditContext.Provider>
    );
};
