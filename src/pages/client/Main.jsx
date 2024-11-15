import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ContextProducts } from '../../context/ProductsContext';
import { Link } from 'react-router-dom';
function Main(props) {
    const products = useContext(ContextProducts)
    console.log(products)
    return (
        <div>
            <div id="carouselExampleControls" class="relative overflow-hidden">
                <div class="carousel-inner flex transition-transform duration-700 ease-in-out" data-carousel>
                    <div class="carousel-item flex-shrink-0 w-full active">
                        <img src="https://theme.hstatic.net/1000269337/1000981122/14/slideShow_f1_1.png?v=292" class="block w-full" alt="..." />
                    </div>
                    <div class="carousel-item flex-shrink-0 w-full">
                        <img src="https://theme.hstatic.net/1000269337/1000981122/14/slideShow_f1_2.png?v=292" class="block w-full" alt="..." />
                    </div>
                    <div class="carousel-item flex-shrink-0 w-full">
                        <img src="https://theme.hstatic.net/1000269337/1000981122/14/slideShow_f1_3.png?v=292" class="block w-full" alt="..." />
                    </div>
                </div>
                <button class="absolute top-1/2 left-2 transform -translate-y-1/2  bg-opacity-50 text-white p-2 rounded-full hover:bg-gray-700" type="button" data-carousel-prev>
                    <span class="material-icons"><i class="fa-solid fa-chevron-left"></i></span>
                </button>
                <button class="absolute top-1/2 right-2 transform -translate-y-1/2  bg-opacity-50 text-white p-2 rounded-full hover:bg-gray-700" type="button" data-carousel-next>
                    <span class="material-icons"><i class="fa-solid fa-chevron-right"></i></span>
                </button>
            </div>

            <div className="main bg-slate-100">
                <div className="sanpham mt-2">
                    <b className="text-blue-800 mt-6">KÍNH MÁT</b>
                    <div className="flex justify-between text-center py-4">
                        <b className="text-2xl">Sản Phẩm Khuyến Mãi</b>
                        <div className="flex items-center cursor-pointer xemthem">
                            <h1>XEM THÊM</h1>
                            <i className="fa-solid fa-arrow-right ml-1"></i>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-3">
                        {products.map((element) => (
                            <div className="col">
                                <Link to={`/Detail/${element.id}`}>
                                    <div className="card p-1 bg-white rounded-lg shadow-md">
                                        <div className="img-card h-44 overflow-hidden">
                                            <img src={element.imgUrl} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="text-center mt-4">
                                            <CardContent className="text-center">
                                                <Typography className="text-sm h-10 font-medium" gutterBottom variant="h10" component="div">
                                                    {element.name}
                                                </Typography>
                                                <Typography variant="body2">
                                                    <b className="text-red-600 my-3">{element.price} <sup>vnđ</sup></b>
                                                    <h1 className="my-2">Trả sau 1.125.000đ x2 kỳ</h1>
                                                </Typography>
                                                <Typography className="flex justify-between items-center" variant="body2">
                                                    <div className="flex space-x-1">
                                                        <i className="fa-regular fa-star text-orange-500"></i>
                                                        <i className="fa-regular fa-star text-orange-500"></i>
                                                        <i className="fa-regular fa-star text-orange-500"></i>
                                                        <i className="fa-regular fa-star text-orange-500"></i>
                                                        <i className="fa-regular fa-star text-orange-500"></i>
                                                    </div>
                                                    <h1 className="text-xs">(0 đánh giá)</h1>
                                                    <h1 className="text-xs">| Đã bán: 0</h1>
                                                </Typography>
                                            </CardContent>
                                            <CardActions className="flex mt-4 ">
                                                <button className="rounded-md p-2 bg-sky-600 text-white w-1/2 mr-2">
                                                    <p >Xem Nhanh</p>
                                                </button>
                                                <button className="rounded-md p-2 bg-red-200 text-red-700 w-1/2">
                                                    <p>Mua Ngay</p>
                                                </button>
                                            </CardActions>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Main;