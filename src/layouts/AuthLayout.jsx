import React from 'react';
import Logo from '../components/Logo/Logo';
import { Outlet } from 'react-router';
import LogoOne from '../components/Logo/LogoOne';
const AuthLayout = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <LogoOne />
            <div className="flex items-center">
                <div className="flex-1">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
