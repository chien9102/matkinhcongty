import React, { useContext, useEffect, useState, useRef } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { CustomersLoginContext } from '../../context/CustomerLoginContext';
import { fetchDocuments } from '../../services/FirebaseService';
import { ContextProducts } from '../../context/ProductsContext';
import { ContextCart } from '../../context/CartContext';

import { Link } from 'react-router-dom';

function Transpost(props) {
    const products = useContext(ContextProducts);
    const carts = useContext(ContextCart);
    const [cartItems, setCartItems] = useState([]); // Danh sách sản phẩm trong giỏ hàng
    const { isLoggedIn, setIsLoggedIn } = useContext(CustomersLoginContext);
    const inputRef = useRef(null);
    const [totalPrice, setTotalPrice] = useState(0);

    
    useEffect(() => {
        const fetchCartItems = async () => {
            if (isLoggedIn) {
                const userCartItems = carts.filter(item => item.userId === isLoggedIn.id);
                setCartItems(userCartItems);
            } else {
                setCartItems([]);
            }
        };
        fetchCartItems();
    }, [[isLoggedIn]]);


    useEffect(() => {
        // Đặt focus vào input khi component được render
        inputRef.current = totalPrice - 10000;
    }, [totalPrice]);

    // PayPal options configuration
    const initialOptions = {
        "client-id": "ARIOASLwffQsuFcFmClgnM0Mq-tp6k-0DigFAPZoWyOPjo498iJo-LSts-fRhOOTfmmg4zag5kwNZJRP", // Use env variable for security
        currency: "USD",
        intent: "capture"
    };

    const handleApprove = (data, actions) => {
        return actions.order.capture().then((details) => {
            alert(`Transaction completed by ${details.payer.name.given_name}`);
            // Xử lý logic thanh toán thành công tại đây
        });
    };

    const getImgProduct = (id) => {
        const product = products.find(a => a.id == id);
        return product ? product.imgUrl : "";
    }
    const getPriceProduct = (id) => {
        const product = products.find(a => a.id == id);
        return product ? product.price : "";
    }
    const getNameProduct = (id) => {
        const product = products.find(a => a.id == id);
        return product ? product.name : "";
    }
    const calculateTotal = () => {
        const total = cartItems.reduce((acc, item) => acc + (parseFloat(getPriceProduct(item.productId)) * parseFloat(item.quantity)), 0);
        setTotalPrice(total); // Cập nhật giá trị vào state
    };
    useEffect(() => {
        calculateTotal();
    }, [cartItems]);
    return (
        <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 p-10'>
            <div>
                <h1 className='text-3xl'>Mắt Kính HATO</h1>
                <p className="my-2 "> Giỏ hàng <i class="fa-solid fa-chevron-right"></i> Thông tin giao hàng <i class="fa-solid fa-chevron-right"></i> Phương thức thanh toán</p>
                <h1>Phương thức vận chuyển</h1>
                <div className="flex items-center justify-between border border-gray-300 rounded-lg p-2 w-full my-3">
                    <div className="flex items-center">
                        <input type="radio" className="form-radio text-blue-500 focus:ring-blue-500 h-4 w-4" checked />
                        <label className="ml-2 text-gray-700">Freeship hóa đơn trên 1tr</label>
                    </div>
                    <div className="text-gray-600">
                        0
                    </div>
                </div>
                <h1 className='my-6'>Phương thức thanh toán</h1>
                <PayPalScriptProvider options={initialOptions}>
                    <PayPalButtons
                            style={{ layout: "vertical" }}
                            createOrder={(data, actions) => {
                                const priceInUSD = (inputRef.current / 24000).toFixed(2);
                                console.log("ut",priceInUSD);
                                
                                return actions.order.create({
                                    purchase_units: [{
                                        amount: {
                                            value: priceInUSD,
                                            currency_code: "USD"
                                        }
                                    }]
                                });
                            }}
                        onApprove={(data, actions) => {
                            return actions.order.capture().then((details) => {
                                const transactionId = details.id;
                            });
                        }}
                        onError={(err) => {
                            console.error("PayPal error:", err);
                        }}

                    />
                </PayPalScriptProvider>
            </div>
            <div>
                {
                    cartItems.map(item => (
                        <div className='p-2'>
                            <div className='flex flex-row p-2' >
                                <div class="w-1/3">
                                    <div class="relative ">
                                        <img src={getImgProduct(item.productId)} alt="Product Image" class="w-16 h-16 rounded-md object-cover ml-4" />
                                        <span class="absolute top-0 right-20 bg-gray-400 text-white rounded-full text-xs w-6 h-6 flex items-center justify-center">
                                            {item.quantity}
                                        </span>
                                    </div>
                                </div>
                                <div class="w-1/2">
                                    <div>
                                        <p className='text-sm h-10'>{getNameProduct(item.productId)}</p>
                                        <p>Đen</p>
                                    </div>
                                </div>
                                <div class="w-1/4">
                                    <p >{getPriceProduct(item.productId).toLocaleString('vi-VN')}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
                <hr className="my-4" />
                <div class="grid grid-cols-3 gap-2">
                    <input
                        type="text"
                        placeholder="Mã giảm giá"
                        class="w-full col-span-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button class="bg-blue-500 col-span-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Sử dụng
                    </button>
                </div>
                <hr className="my-4" />
                <div>
                    <div className='flex justify-between'>
                        <p>Tạm tính</p>
                        <p>{totalPrice.toLocaleString('vi-VN')} </p>
                    </div>
                    <div className='flex justify-between'>
                        <p>Phí vận chuyển </p>
                        <p>10,000</p>
                    </div>
                </div>
                <hr className="my-4" />
                <div className='flex justify-between'>
                    <p>Tổng cộng</p>
                    <div className='flex'>
                        <sup>vnđ</sup>
                        <h1 className='text-2xl'>{(totalPrice - 10000).toLocaleString('vi-VN')} </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Transpost;
