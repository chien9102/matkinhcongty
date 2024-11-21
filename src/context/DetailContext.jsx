import React, { createContext, useState, useEffect } from 'react';
import { fetchDocuments, subscribeToCollection } from "../services/FirebaseService";
export const ContextDetail = createContext();

// Tạo Provider cho customer
export const DetailProvider = ({ children }) => {
    const [detail, setDetail] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const DetailData = await fetchDocuments('Detail');
            setDetail(DetailData);
        };
        fetchData();
        // Thiết lập listener thời gian thực
        const unsubscribe = subscribeToCollection('Detail', (newdetailData) => {
            setDetail(newdetailData);
        });
        // Dọn dẹp listener khi component bị gỡ bỏ
        return () => unsubscribe();
    }, []);

    return (
        <ContextDetail.Provider value={detail}>
            {children}
        </ContextDetail.Provider>
    );
};