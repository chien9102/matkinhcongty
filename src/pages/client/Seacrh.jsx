import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ContextProducts } from '../../context/ProductsContext';
import CardProduct from './CardProduct';
import { useParams } from 'react-router-dom';

function Seacrh(props) {
    const { id } = useParams();
    const products = useContext(ContextProducts);
    const [searchInput, setSearchInput] = useState("");

    const productSearch = searchInput
        ? products.filter(a =>
            a.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            a.category.toLowerCase().includes(searchInput.toLowerCase())
        )
        : products; // Nếu searchInput trống, hiển thị tất cả sản phẩm

    useEffect(() => {
        setSearchInput(id);
    }, [id])

    return (
        <div className="p-4 text-center">
            <div className="flex justify-center space-x-2">
                <p>Trang chủ</p>
                <span>/</span>
                <p>Tìm kiếm</p>
            </div>
            <div className="w-1/2 mx-auto mt-4">
                <h1 className="text-lg font-bold">Tìm kiếm</h1>
                <p>Có 1855 sản phẩm cho tìm kiếm</p>
                <p>Kết quả tìm kiếm cho <b>"ki"</b>.</p>

                <div className="input-group mt-3 flex justify-center">
                    <input
                        type="text"
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="form-control border border-gray-300 rounded-l w-1/2 px-3 py-2"
                        placeholder="Tìm Kiếm"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                    />
                    <span className="input-group-text bg-gray-200 px-4 py-2 border border-gray-300 rounded-r" id="basic-addon2">
                        Search
                    </span>
                </div>
            </div>

            <div className="mt-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {productSearch.map((a, index) => (
                        <Link key={index} to={`/Detail/${a.id}`}>
                            <CardProduct a={a} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>

    );
}

export default Seacrh;