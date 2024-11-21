import React, { useContext, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ContextCustomers } from '../../context/CustomerContext';
import { CustomersLoginContext } from '../../context/CustomerLoginContext';
import { fetchDocuments } from '../../services/FirebaseService';
import { useNavigate } from 'react-router-dom';
import { ContextDetailPayments } from '../../context/DetailPaymentContext';
import { ContextProducts } from '../../context/ProductsContext';
import { ContextOrder } from '../../context/OrderContext';
import { ContextCommune } from '../../context/CommuneContext';
import { ContextDistrict } from '../../context/DistrictContext';
import { ContextProvince } from '../../context/ProvinceContext';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
function Information(props) {
    const products = useContext(ContextProducts);
    const customer = useContext(ContextCustomers);
    const detailpayments = useContext(ContextDetailPayments);
    const communes = useContext(ContextCommune);
    const districts = useContext(ContextDistrict);
    const provinces = useContext(ContextProvince);
    const orders = useContext(ContextOrder)
    const { isLoggedIn, setIsLoggedIn } = useContext(CustomersLoginContext);
    const [cartItems, setCartItems] = useState([]); // Danh sách sản phẩm trong giỏ hàng
    const [user, setUser] = useState(null);  // State để lưu trữ thông tin người dùng
    const navigate = useNavigate(); // Dùng để điều hướng sau khi đăng nhập thành công
    const [detailItems, setDetailItems] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selectedDetail, setSelectedDetail] = useState([]); // Để lưu chi tiết sản phẩm được chọn
    useEffect(() => {
        const fetchData = async () => {
            const userData = await fetchDocuments('Customer'); // Lấy dữ liệu từ collection 'Customer'
            if (userData && userData.length > 0) {
                // Giả định bạn đã đăng nhập thành công và lấy được người dùng đầu tiên
                setUser(userData[0]);  // Lưu người dùng vào state
            }
        };
        fetchData();
    }, [isLoggedIn]);

    useEffect(() => {
        const fetchDetailItems = async () => {
            if (isLoggedIn) {
                const userDetailItems = detailpayments.filter(item => item.userId === isLoggedIn.id);
                setDetailItems(userDetailItems);

            } else {
                setDetailItems([]);
            }
        };
        fetchDetailItems();
    }, [isLoggedIn, detailpayments]);


    useEffect(() => {
        const fetchOrderItems = async () => {
            if (isLoggedIn) {
                const userOrderItems = orders.filter(item => item.userId === isLoggedIn.id);
                setOrderItems(userOrderItems);

            } else {
                setOrderItems([]);
            }
        };
        fetchOrderItems();
    }, [isLoggedIn, orders]);

    const [menuAll, setMenuAll] = useState('menu');
    const logout = () => {
        setIsLoggedIn(null);
        localStorage.removeItem("customersLogin");
        navigate('/Main');
    }

    const getImgDetail = (productId) => {
        const product = products.find(a => a.id === productId);  
        return product ? product.imgUrl : "";
    }

    const getNameDetail = (productId) => {
        const product = products.find(a => a.id === productId);
        return product ? product.name : "";
    }

    const getPriceDetail = (productId) => {
        const product = products.find(a => a.id === productId);
        return product ? product.price : "";
    }


    const getCommune = (id) => {
        const commune = communes.find(a => a.id == id);
        return commune ? commune.name : "";
    }

    const getDistrict = (id) => {
        const district = districts.find(a => a.id == id);
        return district ? district.name : "";
    }

    const getProvince = (id) => {
        const province = provinces.find(a => a.id == id);
        return province ? province.name : "";
    }

    const handleDetail = (orderId) => {
        const detail = detailpayments.filter(a => a.orderId === orderId); // Tìm dựa trên orderId
        console.log(detail);
        if (detail) {
            setSelectedDetail(detail); // Lưu chi tiết sản phẩm vào state
            setOpen(true); // Mở modal
        }
    };

    return (
        <div className='grid grid-cols-5 gap-4 p-12'>
            <div className='col-span-1 text-center'>
                <div className=''>
                    <i class="fa-solid fa-user"></i>
                    {isLoggedIn && isLoggedIn ? (
                        <li className=''>
                            <p>{isLoggedIn.firstName + " " + isLoggedIn.lastName}</p>  {/* Hiển thị firstName nếu có */}
                        </li>
                    ) : (
                        <li ></li>
                    )}

                </div>
                <div className="mt-3">
                    <li value="menu" onClick={() => setMenuAll("menu")} className={`text-left px-4 py-2 ${menuAll === 'menu' ? 'bg-gray-100 text-gray-800 font-medium' : 'text-gray-800 hover:bg-gray-100'} rounded form-check`}>Thông tin tài khoản</li>
                    <li value="history" onClick={() => setMenuAll("history")} className={`text-left px-4 py-2 ${menuAll === 'history' ? 'bg-gray-100 text-gray-800 font-medium' : 'text-gray-800 hover:bg-gray-100'} rounded form-check`}>Lịch sử mua hàng</li>
                    <li className="text-left px-4 py-2 text-gray-800 hover:bg-gray-100 rounded">Danh sách địa chỉ</li>
                    <li onClick={logout} className="text-left px-4 py-2 text-gray-800 hover:bg-gray-100 rounded">Đăng xuất</li>
                </div>
            </div>

            <div className={`col-span-4 ${menuAll === "menu" ? "" : "hidden"}`}>
                <u><b>THÔNG TIN TÀI KHOẢN</b></u>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="mt-3">Họ tên</p>
                        <p className="mt-3">Email</p>
                        <p className="mt-3">Giới tính</p>
                        <p className="mt-3">Số điện thoại</p>
                        <p className="mt-3">Địa chỉ</p>
                    </div>
                    {isLoggedIn ? (
                        <div>
                            <p className="mt-3">{isLoggedIn.firstName + " " + isLoggedIn.lastName}</p>
                            <p className="mt-3">{isLoggedIn.mail}</p>
                            <p className="mt-3">{isLoggedIn.gender}</p>
                            <p className="mt-3">{isLoggedIn.phone}</p>
                            <p className="mt-3">sds</p>
                        </div>
                    ) : (
                        <li></li>
                    )}
                </div>
            </div>

            <div className={`col-span-4 ${menuAll === "history" ? "" : "hidden"}`}>
                <u><b>LỊCH SỬ MUA HÀNG</b></u>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 ">
                        <div className="flex items-center space-x-4  ">
                            <div className="flex-1">
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>STT</TableCell>
                                                <TableCell align="right">Xã</TableCell>
                                                <TableCell align="right">Huyện</TableCell>
                                                <TableCell align="right">Thành Phố</TableCell>
                                                <TableCell align="right">Tên Người Nhận</TableCell>
                                                <TableCell align="right">Số Điện Thoại</TableCell>
                                                <TableCell align="right">Xem chi tiết</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {orders.map((element, index) => (
                                                <TableRow
                                                    key={element.name}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell align="right">{getCommune(element.commune)}</TableCell>
                                                    <TableCell align="right">{getDistrict(element.district)}</TableCell>
                                                    <TableCell align="right">{getProvince(element.province)}</TableCell>
                                                    <TableCell align="right">{element.name}</TableCell>
                                                    <TableCell align="right">{element.number}</TableCell>
                                                    <TableCell align="right"> <Button onClick={() => handleDetail(element.id)} variant="contained">Xem</Button></TableCell>
                                                    <Modal
                                                        open={open}
                                                        onClose={handleClose}
                                                        aria-labelledby="modal-modal-title"
                                                        aria-describedby="modal-modal-description"
                                                    >
                                                        <Box sx={style}>
                                                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                                <div>
                                                                    {selectedDetail.map(item => (
                                                                        <div className='flex flex-row p-2' >
                                                                            <div class="w-1/3">
                                                                                <div className='w-28'>
                                                                                    <img src={getImgDetail(item?.productId)} alt="" />
                                                                                </div>
                                                                            </div>
                                                                            <div class="w-1/2">
                                                                                <div>
                                                                                    <p>Tên sản phẩm: {getNameDetail(item?.productId)}</p>
                                                                                    <p>Giá cả: {getPriceDetail(item?.productId)}</p>
                                                                                    <p>Số lượng: {item?.quantity}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </Typography>
                                                        </Box>
                                                    </Modal>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default Information;