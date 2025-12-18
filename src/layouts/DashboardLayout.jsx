import React from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import useRole from '../hooks/useRole';

import {
    Home,
    ClipboardList,
    CreditCard,
    CheckCircle,
    UserCheck,
    Bike,
    Users,
    MessageSquare,
    Wallet,
    Settings,
    LayoutDashboard,
    UserRoundCog,
} from 'lucide-react';
import LogoOne from '../components/Logo/LogoOne';

const navClass = ({ isActive }) =>
    `group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 relative overflow-hidden
   before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-(--color-one) before:transition-all before:duration-300
   [&>svg]:transition-transform [&>svg]:duration-300 group-hover:[&>svg]:scale-110
   ${
       isActive
           ? 'bg-primary text-white shadow-md before:opacity-100 [&>svg]:scale-110'
           : 'text-base-content before:opacity-0'
   }
   hover:bg-secondary hover:text-secondary-content hover:before:opacity-100`;

const DashboardLayout = () => {
    const [collapsed, setCollapsed] = React.useState(false);
    const [theme, setTheme] = React.useState('citycare');
    const { role } = useRole();

    return (
        <div className="drawer lg:drawer-open max-w-full mx-auto">
            <input
                id="dashboard-drawer"
                type="checkbox"
                className="drawer-toggle"
            />

            {/* Main Content */}
            <div className="drawer-content flex flex-col">
                {/* Top Navbar */}
                <div className="navbar bg-linear-to-r to-secondary text-white shadow-md">
                    <label
                        htmlFor="dashboard-drawer"
                        className="btn btn-ghost lg:hidden">
                        <LayoutDashboard />
                    </label>
                    {collapsed && (
                        <Link to="/">
                            <LogoOne />
                        </Link>
                    )}

                    <div className="ml-auto mr-4">
                        <button
                            onClick={() => {
                                const next =
                                    theme === 'citycare' ? 'dark' : 'citycare';
                                setTheme(next);
                                document.documentElement.setAttribute(
                                    'data-theme',
                                    next
                                );
                            }}
                            className="btn btn-sm btn-ghost text-white">
                            {theme === 'citycare' ? '🌙 Dark' : '☀️ Light'}
                        </button>
                    </div>
                </div>

                <div className="p-6 bg-base-100 min-h-screen">
                    <Outlet />
                </div>
            </div>

            {/* Sidebar */}
            <div className="drawer-side bg-red-500">
                <label
                    htmlFor="dashboard-drawer"
                    className="drawer-overlay"></label>

                <aside
                    className={`${collapsed ? 'w-20' : 'w-64'}
            bg-base-200 min-h-full shadow-lg transition-all duration-300 overflow-x-hidden bg-linear-to-r from-secondary text-white`}>
                    {/* Logo */}
                    <div className="p-4 flex items-center justify-between border-b bg-linear-to-r from-secondary text-white shadow-md">
                        {!collapsed && (
                            <Link to="/">
                                <LogoOne />
                            </Link>
                        )}
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="btn btn-sm btn-ghost hover:bg-primary hover:border-(--color-one)">
                            <LayoutDashboard size={20} />
                        </button>
                    </div>

                    {/* Menu */}
                    <ul className="menu p-2 space-y-1">
                        <li>
                            <NavLink to="/dashboard" end className={navClass}>
                                <Home size={18} />
                                {!collapsed && 'Dashboard Home'}
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/my-issues"
                                className={navClass}>
                                <ClipboardList size={18} />
                                {!collapsed && 'My Issues'}
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/payment-history"
                                className={navClass}>
                                <CreditCard size={18} />
                                {!collapsed && 'Payment History'}
                            </NavLink>
                        </li>

                        {role === 'citizen' && (
                            <>
                                <li>
                                    <NavLink
                                        to="/dashboard/assigned-issues"
                                        className={navClass}>
                                        <UserCheck size={18} />
                                        {!collapsed && 'Assigned Issues'}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard/resolved-issues"
                                        className={navClass}>
                                        <CheckCircle size={18} />
                                        {!collapsed && 'Resolved Issues'}
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {role === 'admin' && (
                            <>
                                <li>
                                    <NavLink
                                        to="/dashboard/approve-staffs"
                                        className={navClass}>
                                        <Users size={18} />
                                        {!collapsed && 'Approve Staffs'}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard/assign-staffs"
                                        className={navClass}>
                                        <Bike size={18} />
                                        {!collapsed && 'Assign Staffs'}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard/users-management"
                                        className={navClass}>
                                        <UserRoundCog size={18} />
                                        {!collapsed && 'Users Management'}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard/support-messages"
                                        className={navClass}>
                                        <MessageSquare size={18} />
                                        {!collapsed && 'Support Messages'}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard/payment-management"
                                        className={navClass}>
                                        <Wallet size={18} />
                                        {!collapsed && 'Payment Management'}
                                    </NavLink>
                                </li>
                            </>
                        )}

                        <div className="divider"></div>

                        <li>
                            <button className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-secondary hover:text-secondary-content transition-all">
                                <Settings size={18} />
                                {!collapsed && 'Settings'}
                            </button>
                        </li>
                    </ul>
                </aside>
            </div>
        </div>
    );
};

export default DashboardLayout;
