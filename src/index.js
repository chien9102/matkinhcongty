import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrandsProvider } from './context/BrandsContext';
import { CategoriesProvider } from './context/CategoriesContext';
import { ProductsProvider } from './context/ProductsContext';
import { CustomersLoginProvider } from './context/CustomerLoginContext';
import { DetailProvider } from './context/DetailContext';
import { LikeProvider } from './context/LikeContext';
import { CartProvider } from './context/CartContext';
import { ProvinceProvider } from './context/ProvinceContext';
import { DistrictProvider } from './context/DistrictContext';
import { CommuneProvider } from './context/CommuneContext';
import { CustomersProvider } from './context/CustomerContext';
import { DetailPaymentsProvider } from './context/DetailPaymentContext';
import { OrderProvider } from './context/OrderContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProductsProvider>
      <CategoriesProvider>
        <BrandsProvider>
          <CustomersLoginProvider>
            <DetailProvider>
              <LikeProvider>
                <CartProvider>
                  <ProvinceProvider>
                    <DistrictProvider>
                      <CommuneProvider>
                        <CustomersProvider>
                          <DetailPaymentsProvider>
                            <OrderProvider>
                              <App />
                            </OrderProvider>
                          </DetailPaymentsProvider>
                        </CustomersProvider>
                      </CommuneProvider>
                    </DistrictProvider>
                  </ProvinceProvider>
                </CartProvider>
              </LikeProvider>
            </DetailProvider>
          </CustomersLoginProvider>
        </BrandsProvider>
      </CategoriesProvider>
    </ProductsProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
