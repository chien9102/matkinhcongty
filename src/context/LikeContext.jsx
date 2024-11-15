import React, { createContext, useState, useEffect } from 'react';
import { fetchDocuments, subscribeToCollection } from "../services/FirebaseService";
export const ContextLike = createContext();

// Tạo Provider cho customer
export const LikeProvider = ({ children }) => {
    const [like, setLike] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const LikeData = await fetchDocuments('Like');
            setLike(LikeData);
        };
        fetchData();
        // Thiết lập listener thời gian thực
        const unsubscribe = subscribeToCollection('Like', (newlikeData) => {
            setLike(newlikeData);
        });
        // Dọn dẹp listener khi component bị gỡ bỏ
        return () => unsubscribe();
    }, []);

    return (
        <ContextLike.Provider value={like}>
            {children}
        </ContextLike.Provider>
    );
};