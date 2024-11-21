import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useParams } from 'react-router-dom';
import { ContextProducts } from '../context/ProductsContext';
import { Modal, Box, Typography } from '@mui/material';
import { addDocument, deleteDocument, fetchDocuments, updateDocument } from '../services/FirebaseService';
import { CustomersLoginContext } from '../context/CustomerLoginContext';
import { ContextLike } from '../context/LikeContext';
import { ContextCart } from '../context/CartContext';


const thank = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 4,
    textAlign: 'center',
    borderRadius: '3px',
};
function Detail(props) {
    const { id } = useParams();
    const likes = useContext(ContextLike)
    const carts = useContext(ContextCart);
    const products = useContext(ContextProducts);
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const { isLoggedIn, setIsLoggedIn } = useContext(CustomersLoginContext);
    const [openThank, setOpenThank] = React.useState(false);
    const [isLiked, setIsLiked] = useState(false); // Trạng thái yêu thích
    const handleCloseThank = () => setOpenThank(false);

    useEffect(() => {
        const fetchDetail = async () => {
            if (id) {
                const productNew = products.find(item => item.id === id);
                setProduct(productNew);
            }
        };
        fetchDetail();
    }, [id, products]);


    useEffect(() => {
        const fetchLike = async () => {
            // Kiểm tra trạng thái yêu thích từ Firebase khi có user và product
            if (isLoggedIn && id) {
                const userLikedProduct = likes.find((like) => like.userId === isLoggedIn.id && like.productId === id);
                setIsLiked(!!userLikedProduct); // Đặt isLiked là true nếu có sản phẩm yêu thích
            }
        };
        fetchLike();
    }, [id, isLoggedIn, likes]);

    const handleIncrease = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

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

        const checkCart = carts.find(a => a.productId === product.id && a.userId === isLoggedIn.id);
        if (checkCart) {
            const updatedQuantity = checkCart.quantity + quantity;
            await updateDocument("Cart", checkCart.id, { quantity: updatedQuantity })
            setOpenThank(true);
        } else {
            // Lưu sản phẩm vào giỏ hàng trong Firebase
            await addDocument('Cart', cartItem);
            setOpenThank(true);

        }
    }
    const handleLike = async () => {
        if (!isLoggedIn) {
            alert("vui lòng đăng nhập !!!");
            return;
        }
        const likeItem = {
            userId: isLoggedIn.id,  // ID người dùng
            productId: product.id,  // ID sản phẩm
        };
        const check = likes.find(a => a.productId === product.id && a.userId === isLoggedIn.id);
        if (check) {
            await deleteDocument("Like", check.id);
            setIsLiked(false); // Đặt lại trạng thái yêu thích
        } else {
            // Lưu sản phẩm vào giỏ hàng trong Firebase
            await addDocument('Like', likeItem);
            setIsLiked(true); // Đổi trạng thái yêu thích
        }
    }


    return (
        <div className="detail">
            <div className="flex justify-between px-6 all">
                <div className="flex space-x-2">
                    <h1>Trang chủ /</h1>
                    <h1>Kính Mát /</h1>
                    <h1>Kính Mát Oakley Radar EV Path High Resolution Collection Chính Hãng</h1>
                </div>
                <div>
                    <h1 className="sp">Sản phẩm sau <i className="fa-solid fa-angles-right"></i></h1>
                </div>
            </div>

            <div className="flex flex-wrap detail1 g-2 py-4">
                <div className="w-full lg:w-1/2 px-2">
                    <div className="flex gap-2">
                        <div className="w-48 img-rada">
                            <div className="border border-gray-400 w-28 mb-3">
                                <img src="https://product.hstatic.net/1000269337/product/kinh_mat_oakley_radar_ev_path_high_resolution_yythk__5__ba1ac870dea34413b0da6d2bd4b77b9e_large.png" alt="" />
                            </div>
                            <div className="w-28 mb-3">
                                <img src="https://product.hstatic.net/1000269337/product/kinh_mat_oakley_radar_ev_path_high_resolution_yythk__3__66aed27770a346c4b062a25877ad8f31_large.png" alt="" />
                            </div>
                            <div className="w-28 mb-3">
                                <img src="https://product.hstatic.net/1000269337/product/kinh_mat_oakley_radar_ev_path_high_resolution_yythk__4__0612976e94ba4133ba78ed90061ee84d_large.png" alt="" />
                            </div>
                            <div className="w-28">
                                <img src="https://product.hstatic.net/1000269337/product/kinh_mat_oakley_radar_ev_path_high_resolution_yythk_03546b8662e34fe69d369dc088fd858c_large.png" alt="" />
                            </div>
                        </div>
                        <div className="img-tong">
                            <div className="bg-slate-500 h-52 w-80 mt-8">
                                <img src={product?.imgUrl} alt="..." className="d-block w-full h-full" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 px-2">
                    <div>
                        <div className="flex items-center space-x-2">
                            <b>{product?.name} Chính Hãng</b>
                            <div onClick={handleLike}>
                                <i className={`fa-regular fa-heart p-2 rounded-full ${isLiked ? 'bg-red-500 text-white' : 'bg-gray-800 text-gray-500'}`}></i>
                            </div>
                        </div>
                        <div className="flex items-center mt-2 space-x-2">
                            <div className="flex space-x-1">
                                <i className="fa-regular fa-star text-orange-500"></i>
                                <i className="fa-regular fa-star text-orange-500"></i>
                                <i className="fa-regular fa-star text-orange-500"></i>
                                <i className="fa-regular fa-star text-orange-500"></i>
                                <i className="fa-regular fa-star text-orange-500"></i>
                            </div>
                            <h1 className="text-xs">(0 đánh giá)</h1>
                            <b className="text-xs">| Đã bán: 0</b>
                        </div>

                        <div className="flex justify-between mt-2 thongtin">
                            <div>
                                <li><b>Tình trạng:</b> Còn hàng</li>
                                <li className="my-2"><b>Thương hiệu:</b> OAKLEY</li>
                            </div>
                            <div>
                                <li><b>Mã sản phẩm:</b> RadarC01</li>
                                <li className="my-2"><b>Dòng sản phẩm:</b> Kính Mát</li>
                            </div>
                        </div>

                        <hr className="my-3" />
                        <b className="text-orange-500">{product?.price ? product.price.toLocaleString('vi-VN') : ''} $</b>
                        <hr className="my-3" />

                        <div className="flex items-center my-3 text-center">
                            <h1 className="mr-2">Trả sau đến 12 tháng với</h1>
                            <img src="https://assets.fundiin.vn/merchant/logo_transparent.png" alt="" className="h-5 ml-2 w-10" />
                            <i className="fa-solid fa-question ml-4 rounded-full bg-black p-2 text-white h-7"></i>
                        </div>

                        <Button className="w-72" variant="contained" disableElevation>
                            <i className="fa-light fa-percent">Giảm đến 100K khi thanh toán qua Fundiin
                                <u className="ml-2 hover:text-sky-500">Xem thêm</u></i>
                        </Button>

                        <h1 className="my-2">MÀU SẮC</h1>
                        <div className="border border-yellow-400 rounded p-1 w-24 flex justify-center">
                            <button type="button" className="btn btn-dark flex items-center">
                                <div className="w-6 h-6">
                                    <img src="https://product.hstatic.net/1000269337/product/kinh_mat_oakley_radar_ev_path_high_resolution_yythk__5__ba1ac870dea34413b0da6d2bd4b77b9e_large.png" alt="" />
                                </div>
                                Đen
                            </button>
                        </div>

                        <div className="flex justify-between items-center my-2">
                            <ButtonGroup>
                                <Button onClick={handleDecrease}>-</Button>
                                <Button>{quantity}</Button>
                                <Button onClick={handleIncrease}>+</Button>
                            </ButtonGroup>

                            <Button onClick={handleAdd} className="hover:bg-orange-400 hover:text-zinc-200" variant="outlined" color="error">
                                THÊM VÀO GIỎ HÀNG
                            </Button>

                            <Modal open={openThank} onClose={handleCloseThank}>
                                <Box sx={thank}>
                                    <Typography id="thank-you-title" variant="h6" component="h2" sx={{ mt: 2 }}>
                                        Cảm ơn bạn!
                                    </Typography>
                                    <Typography id="thank-you-description" sx={{ mt: 2, color: 'gray' }}>
                                        Sản phẩm đã được thêm vào giỏ thành công
                                    </Typography>
                                    <Button variant="contained" onClick={handleCloseThank} sx={{ mt: 3, width: '100px', bgcolor: '#90CAF9' }}>
                                        OK
                                    </Button>
                                </Box>
                            </Modal>

                            <Button variant="contained" color="success">
                                MUA NGAY
                            </Button>
                        </div>

                        <h1 className="mt-3 text-center">
                            Gọi đặt mua hàng <b className="mx-2">0902.547.710</b> (9:00 - 20:00)
                        </h1>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Detail;