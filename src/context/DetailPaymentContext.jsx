import React, { createContext, useState, useEffect } from 'react';
import { fetchDocuments ,subscribeToCollection } from "../services/FirebaseService";
export const ContextDetailPayments = createContext();


// Tạo Provider cho DetailPayments
export const DetailPaymentsProvider = ({ children }) => {
  const [detailPayments, setDetailPayments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const detailPaymentsData = await fetchDocuments('Detail');
      setDetailPayments(detailPaymentsData);
    };
    fetchData();
    // Thiết lập listener thời gian thực
    const unsubscribe = subscribeToCollection('Detail', (newDetailPaymentsData) => {
      setDetailPayments(newDetailPaymentsData);
    });
    // Dọn dẹp listener khi component bị gỡ bỏ
    return () => unsubscribe();
  }, []);
  
  return (
    <ContextDetailPayments.Provider value={detailPayments}>
      {children}
    </ContextDetailPayments.Provider>
  );
};