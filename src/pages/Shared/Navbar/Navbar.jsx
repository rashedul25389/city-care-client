import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import useAuth from '../../../hooks/useAuth';
import Logo from '../../../components/Logo/Logo';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [open, setOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [tooltip, setTooltip] = useState(null);

    const wrapperRef = useRef(); // wrapper for profile + tooltip

    // const navLinkClass = ({ isActive }) =>
    //     `px-4 py-2 rounded-md text-sm font-medium transition
    // ${
    //     isActive
    //         ? 'bg-primary text-white'
    //         : 'text-slate-200 hover:bg-primary hover:text-white'
    // }`;

    const navLinkClass = ({ isActive }) =>
        `px-4 py-1 rounded-md text-sm font-medium transition border-b-4
${
    isActive
        ? 'bg-primary text-white border-[var(--color-one)]' // active er niche border
        : 'text-slate-200 border-transparent hover:bg-primary hover:text-white hover:border-[var(--color-one)]' // hover er niche border
}`;

    // Close tooltip and profile dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setTooltip(null);
                setProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogOut = () => {
        logOut();
        setProfileOpen(false);
        setTooltip(null);
    };

    return (
        <nav className="bg-slate-900 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <Logo className="w-9 h-9" />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-3">
                        <NavLink to="/" className={navLinkClass}>
                            Home
                        </NavLink>
                        <NavLink to="/all-issues" className={navLinkClass}>
                            All Issues
                        </NavLink>
                        {user && (
                            <NavLink
                                to="/dashboard/my-issues"
                                className={navLinkClass}
                                onMouseEnter={() =>
                                    setTooltip('View all your submitted issues')
                                }
                                onMouseLeave={() => setTooltip(null)}>
                                My Issues
                            </NavLink>
                        )}
                        <NavLink
                            to={user ? '/issues' : '/login'}
                            className={({ isActive }) =>
                                `px-4 py-1 rounded-md text-sm font-medium transition border-b-4 
                                ${
                                    isActive
                                        ? 'bg-primary border-b-4 border-(--color-one) text-white'
                                        : 'text-slate-200 hover:bg-primary hover:text-white border-b-transparent hover:border-b-4 hover:border-(--color-one)'
                                }`
                            }>
                            Report Issues
                        </NavLink>
                        {user && (
                            <NavLink to="/staff" className={navLinkClass}>
                                Be a Resolver
                            </NavLink>
                        )}

                        <NavLink to="/contact" className={navLinkClass}>
                            Contact
                        </NavLink>
                    </div>

                    {/* Right Section */}
                    <div
                        className="flex items-center gap-3 relative"
                        ref={wrapperRef}>
                        {!user ? (
                            <Link
                                to="/login"
                                className="px-4 py-2 rounded-md bg-primary text-white text-sm font-medium hover:bg-secondary transition">
                                Login
                            </Link>
                        ) : (
                            <div className="relative">
                                <button
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className="flex items-center gap-2 focus:outline-none">
                                    <img
                                        src={
                                            user.photoURL ||
                                            'https://i.ibb.co/ZYW3VTp/brown-brim.png'
                                        }
                                        alt="profile"
                                        className="w-9 h-9 rounded-full border-2 border-primary"
                                    />
                                    <ChevronDown className="w-4 h-4 text-secondary font-bold" />
                                </button>

                                {/* Profile Dropdown */}
                                {profileOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-slate-900 text-slate-200 border rounded-md shadow-lg overflow-hidden z-50">
                                        <div className="px-4 py-3 border-b">
                                            <p className="text-sm font-semibold text-slate-200">
                                                {user.displayName}
                                            </p>
                                            <p className="text-xs text-slate-300 truncate">
                                                {user.email}
                                            </p>
                                        </div>
                                        <Link
                                            to="/dashboard"
                                            className="block px-4 py-2 text-sm hover:bg-primary hover:text-white transition"
                                            onClick={() =>
                                                setProfileOpen(false)
                                            }>
                                            Dashboard
                                        </Link>
                                        <Link
                                            to="/dashboard/my-issues"
                                            className="block px-4 py-2 text-sm hover:bg-primary hover:text-white transition"
                                            onClick={() =>
                                                setProfileOpen(false)
                                            }>
                                            My Issues
                                        </Link>
                                        <button
                                            onClick={handleLogOut}
                                            className="w-full text-left px-4 py-2 text-sm font-bold text-red-500 hover:bg-primary hover:text-white transition">
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-white"
                            onClick={() => setOpen(!open)}>
                            {open ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden bg-slate-900 text-slate-300 border-t flex flex-col">
                    <NavLink
                        onClick={() => setOpen(false)}
                        to="/"
                        className={navLinkClass}>
                        Home
                    </NavLink>
                    <NavLink
                        onClick={() => setOpen(false)}
                        to="/all-issues"
                        className={navLinkClass}>
                        All Issues
                    </NavLink>
                    {user && (
                        <NavLink
                            onClick={() => setOpen(false)}
                            to="/dashboard/my-issues"
                            className={navLinkClass}>
                            My Issues
                        </NavLink>
                    )}
                    <NavLink
                        to={user ? '/issues' : '/login'}
                        onClick={() => setOpen(false)}
                        className={navLinkClass}>
                        Report Issues
                    </NavLink>
                    <NavLink
                        onClick={() => setOpen(false)}
                        to="/contact"
                        className={navLinkClass}>
                        Contact
                    </NavLink>
                </div>
            )}

            {/* Tooltip */}
            {tooltip && (
                <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-sky-500 text-white text-xs font-medium px-3 py-1 rounded shadow-lg z-50 pointer-events-none transition-all">
                    {tooltip}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
