import React from 'react';
import DashBoard from "../pages/admin/DashBoard";
import Categories from "../pages/admin/Categories"
import Orders from "../pages/admin/OrdersPage/Orders"
import OrdersItems from "../pages/admin/OrdersPage/OrdersItems"
import Brands from "../pages/admin/ProductsPage/Brands"
import Products from "../pages/admin/ProductsPage/Products"
import Reviews from "../pages/admin/Reviews"
import Account from "../pages/admin/UsersPage/Account"
import Wishlists from "../pages/admin/UsersPage/Wishlists"
import Commune from '../pages/admin/Location/Commune';
import District from '../pages/admin/Location/District';
import Province from '../pages/admin/Location/Province';
import { Route, Routes } from 'react-router-dom';
function AdminRoutes(props) {
    const routes = [
        {
            id: 1,
            path: "/",
            Comment : DashBoard
        },
        {
            id: 2,
            path: "/categories",
            Comment : Categories
        },
        {
            id: 3,
            path: "/orders",
            Comment : Orders
        },
        {
            id: 4,
            path: "/ordersitems",
            Comment : OrdersItems
        },
        {
            id: 5,
            path: "/brands",
            Comment : Brands
        },
        {
            id: 6,
            path: "/products",
            Comment : Products
        },
        {
            id: 7,
            path: "/reviews",
            Comment : Reviews
        },
        {
            id: 8,
            path: "/account",
            Comment : Account
        },
        {
            id: 9,
            path: "/wishlists",
            Comment : Wishlists
        },
        {
            id: 10,
            path: "/Commune",
            Comment : Commune
        },
        {
            id: 11,
            path: "/District",
            Comment : District
        },
        {
            id: 12,
            path: "/Province",
            Comment : Province
        },


    ]
    return (
        <Routes>
             {routes.map(a => (
                <Route path={a.path} element={<a.Comment />} />
             ))}
        </Routes>      
    );
}

export default AdminRoutes;
