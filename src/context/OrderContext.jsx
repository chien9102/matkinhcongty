import React, { createContext, useState, useEffect } from 'react';
import { fetchDocuments, subscribeToCollection } from "../services/FirebaseService";
export const ContextOrder = createContext();
// Tạo Provider cho customer
export const OrderProvider = ({ children }) => {
    const [orders, setOrder] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const orderData = await fetchDocuments('Order');
            setOrder(orderData);
        };
        fetchData();
        // Thiết lập listener thời gian thực
        const unsubscribe = subscribeToCollection('Order', (newOrderData) => {
            setOrder(newOrderData);
        });
        // Dọn dẹp listener khi component bị gỡ bỏ
        return () => unsubscribe();
    }, []);

    return (
        <ContextOrder.Provider value={orders}>
            {children}
        </ContextOrder.Provider>
    );
};