import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ClientRoutes from '../../routers/ClientRoutes';

function Home(props) {
    return (
        <div>
            <Header/>
            <ClientRoutes/>
            <Footer/>
        </div>
    );
}

export default Home;