import React, { createContext, useState, useEffect } from 'react';
import { fetchDocuments, subscribeToCollection } from "../services/FirebaseService";
export const ContextDistrict = createContext();
// Tạo Provider cho customer
export const DistrictProvider = ({ children }) => {
    const [districts, setDistrict] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const districtData = await fetchDocuments('District');
            setDistrict(districtData);
        };
        fetchData();
        // Thiết lập listener thời gian thực
        const unsubscribe = subscribeToCollection('District', (newDistrictData) => {
            setDistrict(newDistrictData);
        });
        // Dọn dẹp listener khi component bị gỡ bỏ
        return () => unsubscribe();
    }, []);

    return (
        <ContextDistrict.Provider value={districts}>
            {children}
        </ContextDistrict.Provider>
    );
};