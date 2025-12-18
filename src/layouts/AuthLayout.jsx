import React from 'react';
import Logo from '../components/Logo/Logo';
import { Outlet } from 'react-router';
import LogoTwo from '../components/Logo/LogoTwo';
import Navbar from '../pages/Shared/Navbar/Navbar';
import Footer from '../pages/Shared/Footer/Footer';
const AuthLayout = () => {
    return (
        <div className="mx-auto">
            <Navbar />
            <div className="flex items-center py-10">
                <Outlet></Outlet>
            </div>
            <Footer />
        </div>
    );
};

export default AuthLayout;
