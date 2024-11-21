import React, { createContext, useState, useEffect } from 'react';
import { fetchDocuments ,subscribeToCollection } from "../services/FirebaseService";
export const ContextProducts = createContext();

// Tạo Provider cho Products
export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const productsData = await fetchDocuments('Products');
        setProducts(productsData);
      };
      fetchData();
      // Thiết lập listener thời gian thực
      const unsubscribe = subscribeToCollection('Products', (newproductsData) => {
        setProducts(newproductsData);
      });
      // Dọn dẹp listener khi component bị gỡ bỏ
      return () => unsubscribe();
    }, []);
    
    return (
      <ContextProducts.Provider value={products}>
        {children}
      </ContextProducts.Provider>
    );
  };