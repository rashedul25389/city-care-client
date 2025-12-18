import React from 'react';
import Logo from '../../assets/logo-1.png';
import { Link } from 'react-router';

const LogoTwo = () => {
    return (
        <Link to={'/'} className="flex items-end">
            <img className="w-50" src={Logo} alt="" />
        </Link>
    );
};

export default LogoTwo;
