import React, { createContext, useState, useEffect } from 'react';
import { fetchDocuments, subscribeToCollection } from "../services/FirebaseService";
export const ContextCommune = createContext();
// Tạo Provider cho customer
export const CommuneProvider = ({ children }) => {
    const [communes, setCommune] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const communeData = await fetchDocuments('Commune');
            setCommune(communeData);
        };
        fetchData();
        // Thiết lập listener thời gian thực
        const unsubscribe = subscribeToCollection('Commune', (newCommuneData) => {
            setCommune(newCommuneData);
        });
        // Dọn dẹp listener khi component bị gỡ bỏ
        return () => unsubscribe();
    }, []);

    return (
        <ContextCommune.Provider value={communes}>
            {children}
        </ContextCommune.Provider>
    );
};