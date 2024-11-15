import React, { createContext, useState, useEffect } from 'react';
import { fetchDocuments ,subscribeToCollection } from "../services/FirebaseService";
export const ContextCustomers = createContext();

// Tạo Provider cho customer
export const CustomersProvider = ({ children }) => {
  const [customers, setCustomer] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const customersData = await fetchDocuments('Customer');
      setCustomer(customersData);
    };
    fetchData();
    // Thiết lập listener thời gian thực
    const unsubscribe = subscribeToCollection('Customer', (newcustomersData) => {
      setCustomer(newcustomersData);
    });
    // Dọn dẹp listener khi component bị gỡ bỏ
    return () => unsubscribe();
  }, []);
  
  return (
    <ContextCustomers.Provider value={customers}>
      {children}
    </ContextCustomers.Provider>
  );
};