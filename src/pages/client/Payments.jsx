import React, { useContext, useEffect, useState } from 'react';
import { CustomersLoginContext } from '../../context/CustomerLoginContext';
import { fetchDocuments, addDocument, deleteDocument } from '../../services/FirebaseService';
import { ContextProducts } from '../../context/ProductsContext';
import { ContextCart } from '../../context/CartContext';
import { TextField, Table, TableBody, TableCell, TableContainer, MenuItem, TableHead, TableRow, Paper, Button, IconButton, ButtonGroup, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ContextProvince } from '../../context/ProvinceContext';
import { ContextDistrict } from '../../context/DistrictContext';
import { ContextCommune } from '../../context/CommuneContext';

function Payments(props) {
    const { id } = useParams();
    const products = useContext(ContextProducts);
    const [payments, setPayments] = useState([]);
    const [payment, setPayment] = useState({ name: '', email: "", number: '', address: '', province: '', district: '', commune: '', });
    const provinces = useContext(ContextProvince);
    const districts = useContext(ContextDistrict)
    const communes = useContext(ContextCommune);
    const carts = useContext(ContextCart);
    const [cartItems, setCartItems] = useState([]); // Danh sách sản phẩm trong giỏ hàng


    const { isLoggedIn, setIsLoggedIn } = useContext(CustomersLoginContext);
    const [totalPrice, setTotalPrice] = useState(0);
    const [errors, setErrors] = useState({ name: '', email: "", number: '', address: '', province: '', district: '', commune: '', });
    const [isFormValid, setIsFormValid] = useState(false);
    const navigate = useNavigate();

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
    }, [isLoggedIn]);


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

    const [deliveryMethod, setDeliveryMethod] = useState('home');
    const [buttonPay, setButtonPay] = useState();

    const validate = () => {
        let tempErrors = {};
        tempErrors.name = payment.name ? '' : 'Name is required';
        tempErrors.email = payment.email ? '' : 'Email is required';
        tempErrors.number = payment.number ? '' : 'Phone is required';
        tempErrors.address = payment.address ? '' : 'Address is required';
        setErrors(tempErrors);
        const formIsValid = !tempErrors.name && !tempErrors.number && !tempErrors.address;
        setIsFormValid(formIsValid);
        return formIsValid;
    };

    const handleSubmit = async () => {
        if (validate()) {
            if (buttonPay === 'home1') {
                payment.email = isLoggedIn.id;
                const orderResult = await addDocument('Order', payment); // lưu kết quả trả về vào orderResult
                console.log(orderResult);
                const orderId = orderResult.id; // giả sử kết quả trả về có id của order
                for (const item of cartItems) {
                    const paymentDetail = {
                        orderId: orderId, // sử dụng orderId vừa lấy được
                        productId: item.productId,
                        quantity: item.quantity
                    };
                    await addDocument("Detail", paymentDetail);
                }

                // Xóa từng sản phẩm khỏi giỏ hàng theo userId của người dùng đăng nhập
                for (const item of cartItems) {
                    await deleteDocument('Cart', item.id); // 'item.id' là ID của sản phẩm trong giỏ hàng
                }
            }
            if (buttonPay === 'home2') {
                navigate('/Transpost');
            }
        }
    };


    return (
        <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 p-10'>
            <div>
                <h1 className='text-3xl'>Mắt Kính HATO</h1>
                <p className="my-2 "> Giỏ hàng <i class="fa-solid fa-chevron-right"></i> Thông tin giao hàng <i class="fa-solid fa-chevron-right"></i> Phương thức thanh toán</p>
                <h1 className="mb-3">Thông tin giao hàng</h1>
                <p className="mb-2 flex">Bạn đã có tài khoản? <Link className='text-sky-500 hover:text-cyan-300' to={"/Login"}>Đăng nhập</Link> </p>
                <div class="space-y-4">
                    <input
                        type="text"
                        placeholder="Họ và tên"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={payment.name || ""}
                        onChange={(e) => setPayment({ ...payment, name: e.target.value })}
                    />
                    {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}

                    <div className="grid grid-cols-4 gap-2">
                        <div className='w-full col-span-2 '>
                            <input
                                type="email"
                                placeholder="Email"
                                className=" p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={isLoggedIn.id}
                                disabled
                            />

                        </div>

                        <div className='w-full col-span-2'>
                            <input
                                type="text"
                                placeholder="Số điện thoại"
                                className="  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={payment.number || ""}
                                onChange={(e) => setPayment({ ...payment, number: e.target.value })}
                            />
                            {errors.number && <div className="text-red-500 text-sm col-span-1">{errors.number}</div>}
                        </div>

                    </div>

                </div>
                <div className="mt-5">
                    <div class="border p-4 rounded-md space-y-4 ">
                        <div class="form-check">
                            <input class="form-check-input" value="home"
                                onChange={() => setDeliveryMethod('home')}
                                checked={deliveryMethod === 'home'} type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                            <label class="form-check-label" for="flexRadioDefault1">
                                Giao tận nơi
                            </label>
                        </div>
                        <div className={deliveryMethod == "home" ? "" : "hidden"}>
                            <hr className='mb-4' />
                            <input
                                type="text"
                                placeholder="Địa chỉ"
                                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={payment.address || ""}
                                onChange={(e) => setPayment({ ...payment, address: e.target.value })}
                            />
                            {errors.name && <span className="text-red-500 text-sm">{errors.address}</span>}
                            <div class="grid grid-cols-3 gap-4 mt-3">

                                <TextField
                                    select
                                    fullWidth
                                    variant="outlined" // Sử dụng outlined để đồng nhất với các thành phần khác
                                    className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={payment.province || ""}
                                    onChange={(e) => setPayment({ ...payment, province: e.target.value })}
                                >
                                    <MenuItem disabled selected>
                                        Chọn Tỉnh / Thành Phố
                                    </MenuItem>
                                    {provinces.map((province) => (
                                        <MenuItem key={province.id} value={province.id}>
                                            {province.name}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    select
                                    fullWidth
                                    variant="outlined" // Sử dụng outlined để đồng nhất với các thành phần khác
                                    className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={payment.district || ""}
                                    onChange={(e) => setPayment({ ...payment, district: e.target.value })}
                                >
                                    <MenuItem disabled selected>
                                        Chọn Quận / Huyện
                                    </MenuItem>
                                    {districts.map((district) => (
                                        <MenuItem key={district.id} value={district.id}>
                                            {district.name}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    select
                                    fullWidth
                                    variant="outlined" // Sử dụng outlined để đồng nhất với các thành phần khác
                                    className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={payment.commune || ""}
                                    onChange={(e) => setPayment({ ...payment, commune: e.target.value })}
                                >
                                    <MenuItem disabled selected>
                                        Chọn phường / xã
                                    </MenuItem>
                                    {communes.map((commune) => (
                                        <MenuItem key={commune.id} value={commune.id}>
                                            {commune.name}
                                        </MenuItem>
                                    ))}
                                </TextField>

                            </div>
                            <select onChange={(e) => setButtonPay(e.target.value)} class="w-full p-2 border mt-4 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option selected>Phương thức thanh toán</option>
                                <option value="home1">Thanh toán khi nhận hàng</option>
                                <option value="home2">Thanh toán trên mạng</option>
                            </select>
                        </div>
                        <hr />
                        <div class=" items-center ">
                            <div class="form-check">
                                <input class="form-check-input" value="store"
                                    onChange={() => setDeliveryMethod('store')}
                                    checked={deliveryMethod === 'store'} type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                <label class="form-check-label" for="flexRadioDefault2">
                                    Nhận tại cửa hàng
                                </label>
                            </div>
                            <div class={`${deliveryMethod == "store" ? "" : "hidden"}`}>
                                <hr className='mt-3' />
                                <div class={`grid grid-cols-3 gap-4 mt-3  `}>
                                    <TextField
                                        select
                                        fullWidth
                                        variant="outlined" // Sử dụng outlined để đồng nhất với các thành phần khác
                                        className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={payment.province || ""}
                                        onChange={(e) => setPayment({ ...payment, province: e.target.value })}
                                    >
                                        <MenuItem disabled selected>
                                            Chọn Tỉnh / Thành Phố
                                        </MenuItem>
                                        {provinces.length > 0 ? (
                                            provinces.map((province) => (
                                                <MenuItem key={province.id} value={province.id}>
                                                    {province.name}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem disabled>No Province Available</MenuItem>
                                        )}
                                    </TextField>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between mt-4">
                    <p className='text-cyan-500 hover:text-cyan-300'>Giỏ hàng</p>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Tiếp tục đến phương thức thanh toán
                    </button>
                </div>
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

                        <h1 className='text-2xl'>{(totalPrice - 10000).toLocaleString('vi-VN')}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payments;