import React, { createContext, useState, useEffect } from 'react';

export const CustomersLoginContext = createContext();


// Tạo Provider cho customer
export const CustomersLoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() => {
        if(isLoggedIn) {
            localStorage.setItem('customersLogin', JSON.stringify(isLoggedIn));
        }
    }, [isLoggedIn]);

    useEffect(() => {
        const loggedInStatus = localStorage.getItem('customersLogin');
        if (loggedInStatus) {
            setIsLoggedIn(JSON.parse(loggedInStatus));
        }
    }, []);


    
    return (
        <CustomersLoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </CustomersLoginContext.Provider>
    );
};