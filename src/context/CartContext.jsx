import React, { createContext, useState, useEffect } from 'react';
import { fetchDocuments, subscribeToCollection } from "../services/FirebaseService";
export const ContextCart = createContext();

// Tạo Provider cho customer
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const CartData = await fetchDocuments('Cart');
            setCart(CartData);
        };
        fetchData();
        // Thiết lập listener thời gian thực
        const unsubscribe = subscribeToCollection('Cart', (newcartData) => {
            setCart(newcartData);
        });
        // Dọn dẹp listener khi component bị gỡ bỏ
        return () => unsubscribe();
    }, []);

    return (
        <ContextCart.Provider value={cart}>
            {children}
        </ContextCart.Provider>
    );
};