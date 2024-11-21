import React, { createContext, useState, useEffect } from 'react';
import { fetchDocuments ,subscribeToCollection } from "../services/FirebaseService";
export const ContextBrands = createContext();


// Tạo Provider cho brands
export const BrandsProvider = ({ children }) => {
  const [brands, setbrands] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const brandsData = await fetchDocuments('Brands');
      setbrands(brandsData);
    };
    fetchData();
    // Thiết lập listener thời gian thực
    const unsubscribe = subscribeToCollection('Brands', (newbrandsData) => {
      setbrands(newbrandsData);
    });
    // Dọn dẹp listener khi component bị gỡ bỏ
    return () => unsubscribe();
  }, []);
  
  return (
    <ContextBrands.Provider value={brands}>
      {children}
    </ContextBrands.Provider>
  );
};