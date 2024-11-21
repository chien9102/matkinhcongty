import React, { createContext, useState, useEffect } from 'react';
import { fetchDocuments, subscribeToCollection } from "../services/FirebaseService";
export const ContextProvince = createContext();
// Tạo Provider cho customer
export const ProvinceProvider = ({ children }) => {
    const [provinces, setProvince] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const provinceData = await fetchDocuments('Province');
            setProvince(provinceData);
        };
        fetchData();
        // Thiết lập listener thời gian thực
        const unsubscribe = subscribeToCollection('Province', (newprovinceData) => {
            setProvince(newprovinceData);
        });
        // Dọn dẹp listener khi component bị gỡ bỏ
        return () => unsubscribe();
    }, []);

    return (
        <ContextProvince.Provider value={provinces}>
            {children}
        </ContextProvince.Provider>
    );
};