import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { addDocument, fetchDocuments, deleteDocument } from '../services/FirebaseService';
import { useNavigate } from 'react-router-dom';
import { CustomersLoginContext } from '../context/CustomerLoginContext';
import { ContextCategories } from '../context/CategoriesContext';
import { ContextDetail } from '../context/DetailContext';
import { ContextProducts } from '../context/ProductsContext'
import ModalDelete from '../pages/admin/ModalDelete';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useParams } from 'react-router-dom';
import { ContextLike } from '../context/LikeContext';
import { ContextCart } from '../context/CartContext';
const style = {
    flex: 0,
    position: 'absolute',
    top: '50%',
    left: '60%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
    height: "100%",
    bgcolor: 'background.paper',
    boxShadow: 0,
    p: 1,
};
const style1 = {
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    height: '100%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    // Điều chỉnh style khi màn hình lớn hơn hoặc bằng 1200px
    ...(window.innerWidth >= 1200 && {
        width: 460,
        left: '82%',
    }),
    ...(window.innerWidth >= 769 && window.innerWidth < 1200 && {
        width: 500,
        left: '70%',
    }),
    ...(window.innerWidth < 768 && {
        width: '100%',
        left: '50%',
    }),
};

const favourite = {
    position: 'absolute',
    top: '70%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    bgcolor: 'background.paper',
    p: 2,

};


function Header(props) {
    //header
    const { id } = useParams();
    const products = useContext(ContextProducts);
    const categories = useContext(ContextCategories);
    const likes = useContext(ContextLike);
    const carts = useContext(ContextCart);
    const [totalPrice, setTotalPrice] = useState(0);
    const { isLoggedIn, setIsLoggedIn } = useContext(CustomersLoginContext);
    const [cartItems, setCartItems] = useState([]); // Danh sách sản phẩm trong giỏ hàng
    const [likeItems, setLikeItems] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [openCart, setOpenCart] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenCart = () => setOpenCart(true);
    const handleCloseCart = () => setOpenCart(false);
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const [openFavourite, setOpenFavourite] = React.useState(false);
    const handleOpenFavourite = () => setOpenFavourite(true);
    const handleCloseFavourite = () => setOpenFavourite(false);
    const [user, setUser] = useState(null);  // State để lưu trữ thông tin người dùng
    const [deleteModalOpen, setDeleteModalOpen] = useState(false); // Trạng thái mở Modal Delete
    const [deleteModalOpenLike, setDeleteModalOpenLike] = useState(false); // Trạng thái mở Modal Delete like
    const [idDelete, setIdDelete] = useState(null);
    const [idDeleteLike, setIdDeleteLike] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState({});
    const [openThank, setOpenThank] = React.useState(false);
    const handleCloseThank = () => setOpenThank(false);

    // Lấy danh sách khách hàng từ Firebase
    useEffect(() => {
        fetchCartItems();

    }, [isLoggedIn, carts]);

    useEffect(() => {
        fetchLikeItems();

    }, [isLoggedIn, likes]);

    const fetchLikeItems = async () => {
        if (isLoggedIn) {
            const userLikeItems = likes.filter(item => item.userId === isLoggedIn.id);
            setLikeItems(userLikeItems);
        } else {
            setLikeItems([]);
        }
    };

    const fetchCartItems = async () => {
        if (isLoggedIn) {
            const userCartItems = carts.filter(item => item.userId === isLoggedIn.id);
            setCartItems(userCartItems);
        } else {
            setCartItems([]);
        }
    };

    //login


    //register
    const [update, setUpdate] = useState(false);
    const navigate = useNavigate(); // Dùng để điều hướng sau khi đăng nhập thành công
    const getImgProduct = (id) => {
        const product = products.find(a => a.id == id);
        return product ? product.imgUrl : "";
    }
    const getNameProduct = (id) => {
        const product = products.find(a => a.id == id);
        return product ? product.name : "";
    }
    const getPriceProduct = (id) => {
        const product = products.find(a => a.id == id);
        return product ? product.price : "";
    }
    const getImgLike = (id) => {
        const product = products.find(a => a.id == id);
        return product ? product.imgUrl : "";
    }
    const getNameLike = (id) => {
        const product = products.find(a => a.id == id);
        return product ? product.name : "";
    }
    const getPriceLike = (id) => {
        const product = products.find(a => a.id == id);
        return product ? product.price : "";
    }
    const handleDelete = async () => {
        if (idDelete) {
            await deleteDocument("Cart", idDelete);
            setUpdate(!update);
            setDeleteModalOpen(false);
        }
    };

    const onDelete = (element) => {
        setDeleteModalOpen(true);
        setIdDelete(element.id);
    };

    const handleDeleteModalClose = () => setDeleteModalOpen(false);

    // Hàm mở modal xóa
    const handleOpenDeleteModalLike = (productId) => {
        setIdDeleteLike(productId); // Lưu lại ID sản phẩm cần xóa
        setDeleteModalOpenLike(true); // Mở modal xác nhận
    };

    const handleDeleteLike = async () => {
        if (idDeleteLike) {
            await deleteDocument("Like", idDeleteLike); // Xóa sản phẩm trong collection 'Like'
            setLikeItems(likeItems.filter(item => item.productId !== idDeleteLike)); // Cập nhật danh sách yêu thích
            setDeleteModalOpenLike(false); // Đóng modal sau khi xóa
        }
    };

    const calculateTotal = () => {
        const total = cartItems.reduce((acc, item) => acc + (parseFloat(getPriceProduct(item.productId)) * parseFloat(item.quantity)), 0);
        setTotalPrice(total); // Cập nhật giá trị vào state
    };

    useEffect(() => {
        calculateTotal();
    }, [cartItems]);

    const handleAdd = async () => {
        if (!isLoggedIn) {
            alert("vui lòng đăng nhập !!!");
            return;
        }
        const cartItem = {
            userId: isLoggedIn.id,  // ID người dùng
            productId: product.id,  // ID sản phẩm
            quantity: quantity,
        };

        // Lưu sản phẩm vào giỏ hàng trong Firebase
        await addDocument('Cart', cartItem);
        setOpenThank(true);
    }

    const likeTotal = likes.filter(item => item.productId)

    return (
        <header className='px-10'>
            <div className='navbar p-3 ' >
                <Link to={"/Main"}><h1 className=' text-2xl font-bold'>HATO</h1></Link>
                <div className='relative search'>
                    <input className='bg-gray-200 p-1 w-full' type="text" placeholder='Bạn cần tìm gì' />
                    <Link to={`Search/0`}><i class="fa-solid fa-magnifying-glass absolute right-2 top-2"></i></Link>
                </div>
                <div className='flex items-center gap-2 menu '>
                    {isLoggedIn && isLoggedIn ? (
                        <Link to={"/Information"} >
                            <li className='flex flex-1 user'>
                                <h1>{isLoggedIn.firstName + " " + isLoggedIn.lastName}</h1>  {/* Hiển thị firstName nếu có */}
                                <i class="fa-solid fa-user ml-2"></i>
                            </li>
                        </Link>
                    ) : (
                        <Link to={"/Login"}>
                            <li className='flex flex-1 user' >
                                <h1>Tài khoản</h1>  {/* Hiển thị firstName nếu có */}
                                <i class="fa-solid fa-user ml-2"></i>
                            </li>
                        </Link>
                    )}
                    <li className='ml-6 relative p-2' onClick={handleOpenFavourite}>
                        <div className='flex'>
                            <h1>Yêu thích </h1>
                            <i class="fa-regular fa-heart ml-2"></i>
                        </div>
                        <span class="absolute top-0 right-0 bg-gray-400 text-white  rounded-full text-xs w-4 h-4 flex items-center justify-center">
                            {likeItems.length}
                        </span>
                    </li>
                    <Modal
                        open={openFavourite}
                        onClose={handleCloseFavourite}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={favourite}>
                            <div className='favourite'>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    <b >Danh mục sản phẩm yêu thích</b>
                                </Typography>
                            </div>
                            <hr className='mt-3' />
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 overflow-y-auto ">
                                    {/* Nội dung */}
                                    {likeItems.length > 0 ? (
                                        likeItems.map(item => (
                                            <div className="p-4 ">
                                                <div className="flex items-center space-x-4  ">
                                                    <img
                                                        src={getImgLike(item.productId)}
                                                        alt="Kính Mát"
                                                        className="w-20 h-20 object-cover"
                                                    />
                                                    <div className="flex-1">
                                                        <p className="font-semibold">
                                                            {getNameLike(item.productId)}
                                                        </p>
                                                        <p className="text-red-500 font-bold text-lg">{getPriceLike(item.productId).toLocaleString('vi-VN')}</p>
                                                        {/* Các biểu tượng */}
                                                        <div className="flex justify-between mt-4 w-52">
                                                            <button onClick={handleAdd} className="p-2 w-10 h-10 bg-gray-200 rounded hover:bg-gray-300">
                                                                <i class="fa-solid fa-cart-shopping"></i>
                                                            </button>
                                                            <button className="p-2 w-10 h-10 bg-gray-200 rounded hover:bg-gray-300">
                                                                <i class="fa-solid fa-heart"></i>
                                                            </button>
                                                            <button onClick={() => handleOpenDeleteModalLike(item.id)} className="p-2 w-10 h-10 bg-gray-200 rounded hover:bg-gray-300">
                                                                <i className="fa-solid fa-trash"></i>
                                                            </button>
                                                            {/* Nội dung modal xác nhận xóa */}
                                                            <Modal
                                                                open={deleteModalOpenLike}
                                                                onClose={() => setDeleteModalOpenLike(false)}
                                                                aria-labelledby="delete-confirmation-title"
                                                                aria-describedby="delete-confirmation-description"
                                                            >
                                                                <Box sx={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', width: '300px', margin: 'auto' }}>
                                                                    <Typography id="delete-confirmation-title" variant="h6">
                                                                        Xác nhận xóa sản phẩm
                                                                    </Typography>
                                                                    <Typography id="delete-confirmation-description" sx={{ mt: 2 }}>
                                                                        Bạn có chắc chắn muốn xóa sản phẩm này khỏi danh sách yêu thích không?
                                                                    </Typography>
                                                                    <div className="flex justify-end mt-4">
                                                                        <Button onClick={() => setDeleteModalOpenLike(false)} sx={{ marginRight: '10px' }}>
                                                                            Hủy
                                                                        </Button>
                                                                        <Button onClick={handleDeleteLike} variant="contained" color="error">
                                                                            Xóa
                                                                        </Button>
                                                                    </div>
                                                                </Box>
                                                            </Modal>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>Giỏ hàng của bạn đang trống.</p>
                                    )}
                                </div>
                            </Typography>
                        </Box>
                    </Modal>

                    <button onClick={handleOpenCart} className='flex rounded-md py-2 px-2 items-center relative justify-center bg-red-200 '>
                        <h1>Giỏ hàng</h1>
                        <i class="fa-solid fa-cart-shopping "></i>
                        <span class="absolute top-0 right-0  bg-gray-400 text-white rounded-full text-xs w-4 h-4 ">
                            {cartItems?.length}
                        </span>
                    </button>

                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={openCart}
                        onClose={handleCloseCart}
                        closeAfterTransition
                        slots={{ backdrop: Backdrop }}
                        slotProps={{
                            backdrop: {
                                timeout: 500,
                            },
                        }}
                    >
                        <Fade in={openCart}>
                            <div className='modalCart'>
                                <Box sx={style1}>
                                    <Typography id="transition-modal-title" variant="h6" component="h2">
                                        <div className='flex justify-between px-4 mt-3 '>
                                            <b>Giỏ hàng</b>
                                            <button className="close-button" onClick={handleCloseCart}><i class="fa-solid fa-xmark"></i></button>
                                        </div>
                                    </Typography>
                                    <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                        <div className='px-4 mb-3 flex justify-between '>
                                            <p className='flex text-zinc-300 '>Mua thêm <b className='text-orange-600 mx-1'>7,000,000</b> để được Freeship</p>
                                            <div className='w-16'>
                                                <img src="https://file.hstatic.net/200000306687/file/giphy__1__c91b6f02cea04a969d655681bb73caf8.gif" alt="" />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='overflow-y-auto h-[55vh]'>
                                            {cartItems.length > 0 ? (
                                                cartItems.map(item => (
                                                    <div>
                                                        <div className='flex flex-row p-2' key={item.productId}>
                                                            <div class="w-1/3">
                                                                <div className='w-28'>
                                                                    <img src={getImgProduct(item.productId)} alt="" />
                                                                </div>
                                                            </div>
                                                            <div class="w-1/2">
                                                                <div>
                                                                    <p className=''>{getNameProduct(item.productId)}</p>
                                                                    <p>Giá cả :{getPriceProduct(item.productId).toLocaleString('vi-VN')}</p>
                                                                    <p> Số lượng :{item.quantity}</p>
                                                                </div>
                                                            </div>
                                                            <div onClick={() => onDelete(item)} class="w-1/4">
                                                                <u className='mt-16 '>Xóa</u>
                                                            </div>
                                                            <ModalDelete handleDelete={handleDelete} deleteModalOpen={deleteModalOpen} handleDeleteModalClose={handleDeleteModalClose} />
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>Giỏ hàng của bạn đang trống.</p>
                                            )}
                                        </div>
                                        <div>
                                            <hr />
                                            <div className='flex justify-between px-4 mt-3 z-10'>
                                                <p className='text-zinc-300'>Thêm ghi chú</p>
                                                <p className='text-zinc-300'>Xem chi tiết giỏ hàng</p>
                                            </div>
                                            <h1 className='px-4 mt-2'>Phí ship & thuế được tính ở Trang Thanh Toán</h1>
                                            <Link to={"/Payments"}>
                                                <div className='flex justify-center'>
                                                    <button type="button" onClick={handleCloseCart} class="btn btn-danger h-14 w-full mt-3 bg-red-200">Thanh Toán {totalPrice.toLocaleString('vi-VN')} <sup>vnđ</sup></button>
                                                </div>
                                            </Link>
                                        </div>
                                    </Typography>
                                </Box>
                            </div>

                        </Fade>
                    </Modal>
                    <i onClick={handleOpen} class="fa-solid fa-bars"></i>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-description" >
                                <div className=''>
                                    <ul className='flex py-2 justify-between hover:bg-orange-700 hover:text-white '>
                                        <h1>KÍNH VIỄN THỊ</h1>
                                        <i class="fa-solid fa-angle-up"></i>
                                    </ul>
                                    <ul className='flex py-2 justify-between hover:bg-orange-700 hover:text-white'>
                                        <h1>KÍNH CẬN THỊ </h1>
                                        <i class="fa-solid fa-angle-up"></i>
                                    </ul>
                                    <ul className='flex  py-2 justify-between hover:bg-orange-700 hover:text-white'>
                                        <h1>KÍNH ĐA TRÒNG</h1>
                                        <i class="fa-solid fa-angle-up"></i>
                                    </ul>
                                    <ul className='flex  py-2 justify-between hover:bg-orange-700 hover:text-white'>
                                        <h1>MẮT RÂM </h1>
                                        <i class="fa-solid fa-angle-up"></i>
                                    </ul>
                                    <ul className='flex py-2 justify-between hover:bg-orange-700 hover:text-white'>
                                        <h1>GỌNG KÍNH</h1>
                                        <i class="fa-solid fa-angle-up"></i>
                                    </ul>
                                    <div className='flex  py-2 justify-between hover:bg-orange-700 hover:text-white'>
                                        <h1>KHUYẾN MÃI </h1>
                                        <i class="fa-solid fa-angle-up"></i>
                                    </div>
                                    <Link to={"/Login"}>
                                        <div className=' py-2 hover:bg-orange-700 hover:text-white'>
                                            <h1>ĐĂNG NHẬP</h1>
                                        </div>
                                    </Link>
                                    <Link to={"/Register"}>
                                        <div className='py-2 hover:bg-orange-700 hover:text-white'>
                                            <h1>ĐĂNG KÝ</h1>
                                        </div></Link>
                                </div>
                            </Typography>
                        </Box>
                    </Modal>
                </div>
            </div>
            <div className='flex kinh'>
                {categories.map((element) => (
                    <div className='flex flex-1 py-2 justify-center hover:bg-orange-700 hover:text-white '>
                        <Link to={`/Search/${element.id}`}>
                            <h1 className='text-sm'>{element.name.toUpperCase()}</h1>
                        </Link>
                    </div>
                ))}
                <div className='flex flex-1 py-2 justify-center hover:bg-orange-700 hover:text-white'>
                    <h1 className='text-sm'>KHUYẾN MÃI </h1>
                </div>
            </div>
        </header>
    );
}

export default Header;