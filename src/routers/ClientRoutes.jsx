import React from 'react';
import Detail from '../components/Detail';
import Main from '../pages/client/Main';
import Search from '../pages/client/Seacrh'; // Corrected the typo
import Login from '../pages/client/Login';
import { Route, Routes } from 'react-router-dom';
import Register from '../pages/client/Register';
import Payments from '../pages/client/Payments';
import Transpost from '../pages/client/Transpost';
import Information from '../pages/client/Information';
function ClientRoutes(props) {
    const routes = [
        {
            id: 1,
            path: "/",
            element: Main
        },
        {
            id: 2,
            path: "/Detail/:id",
            element: Detail
        },
        {
            id: 3,
            path: "/Main",
            element: Main
        },
        {
            id: 4,
            path: "/Search/:id", // Corrected the typo
            element: Search // Corrected the typo
        },
        {
            id: 5,
            path: "/Login",
            element: Login
        },
        {
            id: 5,
            path: "/Register",
            element: Register
        },
        {
            id: 6,
            path: "/Payments",
            element: Payments
        },
        {
            id: 7,
            path: "/Transpost",
            element: Transpost
        },
        {
            id :8,
            path: "/Information",
            element: Information
        }
    ];

    return (
        <Routes>
            {routes.map(route => (
                <Route key={route.id} path={route.path} element={<route.element />} />
            ))}
        </Routes>
    );
}

export default ClientRoutes;
