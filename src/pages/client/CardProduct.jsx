import React from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
function CardProduct({ a }) {
    return (
        <div className="col">
            <div className="card search-card p-4 text-center bg-white rounded-lg shadow-md">
                <div className="img-product h-40 overflow-hidden">
                    <img src={a.imgUrl} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="mt-4">
                    <CardContent className="text-center">
                        <Typography className="h-10 text-gray-600" variant="body2">
                            {a.name}
                        </Typography>

                        <Typography variant="body2">
                            <b className="text-red-600 my-3">{a.price}</b>
                            <h1 className="my-2 flex items-center justify-center">
                                Trả sau 1.125.000đ x2 kỳ
                                <img className="w-12 ml-2" src="https://assets.fundiin.vn/merchant/logo_transparent.png" alt="" />
                            </h1>
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
                    <CardActions className="flex mt-4 space-x-2">
                        <button className="rounded-md p-2 bg-sky-600 text-white w-1/2">
                            <h1>Xem Nhanh</h1>
                        </button>
                        <button className="rounded-md p-2 bg-red-200 text-red-700 w-1/2">
                            <h1>Mua Ngay</h1>
                        </button>
                    </CardActions>
                </div>
            </div>
        </div>

    );
}

export default CardProduct;