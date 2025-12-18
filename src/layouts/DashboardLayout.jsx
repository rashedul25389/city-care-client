// import React from 'react';
// import { CiDeliveryTruck } from 'react-icons/ci';
// import {
//     FaMotorcycle,
//     FaRegCreditCard,
//     FaTasks,
//     FaUsers,
// } from 'react-icons/fa';
// import { Link, NavLink, Outlet } from 'react-router-dom';
// import useRole from '../hooks/useRole';
// import { RiEBikeFill } from 'react-icons/ri';
// import { SiGoogletasks } from 'react-icons/si';
// import logoImg from '../assets/logo-1.png';
// import { Users } from 'lucide-react';

// const DashboardLayout = () => {
//     const { role } = useRole();
//     return (
//         <div className="drawer lg:drawer-open max-w-7xl mx-auto ">
//             <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
//             <div className="drawer-content">
//                 {/* Navbar */}
//                 <nav className="navbar w-full bg-base-300">
//                     <label
//                         htmlFor="my-drawer-4"
//                         aria-label="open sidebar"
//                         className="btn btn-square btn-ghost">
//                         {/* Sidebar toggle icon */}
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 24 24"
//                             strokeLinejoin="round"
//                             strokeLinecap="round"
//                             strokeWidth="2"
//                             fill="none"
//                             stroke="currentColor"
//                             className="my-1.5 inline-block size-4">
//                             <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
//                             <path d="M9 4v16"></path>
//                             <path d="M14 10l2 2l-2 2"></path>
//                         </svg>
//                     </label>
//                     <div className="px-4">City Care Dashboard</div>
//                 </nav>
//                 {/* Page content here */}
//                 <Outlet></Outlet>
//             </div>

//             <div className="drawer-side is-drawer-close:overflow-visible">
//                 <label
//                     htmlFor="my-drawer-4"
//                     aria-label="close sidebar"
//                     className="drawer-overlay"></label>
//                 <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
//                     {/* Sidebar content here */}
//                     <ul className="menu w-full grow">
//                         {/* List item */}
//                         <li>
//                             <Link to="/">
//                                 <img src={logoImg} alt="" />
//                             </Link>
//                         </li>
//                         <li>
//                             <Link
//                                 to="/dashboard"
//                                 className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                                 data-tip="Homepage">
//                                 {/* Home icon */}
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 24 24"
//                                     strokeLinejoin="round"
//                                     strokeLinecap="round"
//                                     strokeWidth="2"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     className="my-1.5 inline-block size-4">
//                                     <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
//                                     <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
//                                 </svg>
//                                 <span className="is-drawer-close:hidden">
//                                     Home page
//                                 </span>
//                             </Link>
//                         </li>

//                         {/* our dashboard links */}
//                         <li>
//                             <NavLink
//                                 className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                                 data-tip="My Issues"
//                                 to="/dashboard/my-issues">
//                                 <CiDeliveryTruck />
//                                 <span className="is-drawer-close:hidden">
//                                     My Issue
//                                 </span>
//                             </NavLink>
//                         </li>
//                         <li>
//                             <NavLink
//                                 className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                                 data-tip="Payment History"
//                                 to="/dashboard/payment-history">
//                                 <FaRegCreditCard />
//                                 <span className="is-drawer-close:hidden">
//                                     Payment History
//                                 </span>
//                             </NavLink>
//                         </li>
//                         {role === 'citizen' && (
//                             <>
//                                 <li>
//                                     <NavLink
//                                         className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                                         data-tip="Assigned Issues"
//                                         to="/dashboard/assigned-issues">
//                                         <FaTasks />
//                                         <span className="is-drawer-close:hidden">
//                                             Assigned Issues
//                                         </span>
//                                     </NavLink>
//                                 </li>
//                                 <li>
//                                     <NavLink
//                                         className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                                         data-tip="Resolved Issues"
//                                         to="/dashboard/resolved-issues">
//                                         <SiGoogletasks />
//                                         <span className="is-drawer-close:hidden">
//                                             Resolved Issues
//                                         </span>
//                                     </NavLink>
//                                 </li>
//                             </>
//                         )}

//                         {/* admin only links */}
//                         {role === 'admin' && (
//                             <>
//                                 <li>
//                                     <NavLink
//                                         className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                                         data-tip="Approve Staffs"
//                                         to="/dashboard/approve-staffs">
//                                         <FaMotorcycle />
//                                         <span className="is-drawer-close:hidden">
//                                             Approve Staffs
//                                         </span>
//                                     </NavLink>
//                                 </li>
//                                 <li>
//                                     <NavLink
//                                         className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                                         data-tip="Assign Staffs"
//                                         to="/dashboard/assign-staffs">
//                                         <RiEBikeFill />
//                                         <span className="is-drawer-close:hidden">
//                                             Assign Staffs
//                                         </span>
//                                     </NavLink>
//                                 </li>
//                                 <li>
//                                     <NavLink
//                                         className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                                         data-tip="Users Management"
//                                         to="/dashboard/users-management">
//                                         <FaUsers></FaUsers>
//                                         <span className="is-drawer-close:hidden">
//                                             Users Management
//                                         </span>
//                                     </NavLink>
//                                 </li>
//                                 <li>
//                                     <NavLink
//                                         className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                                         data-tip="Support Messages"
//                                         to="/dashboard/support-messages">
//                                         <Users></Users>
//                                         <span className="is-drawer-close:hidden">
//                                             Support Messages
//                                         </span>
//                                     </NavLink>
//                                 </li>
//                                 <li>
//                                     <NavLink
//                                         className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                                         data-tip="Payment Management"
//                                         to="/dashboard/payment-management">
//                                         <Users></Users>
//                                         <span className="is-drawer-close:hidden">
//                                             Payment Management
//                                         </span>
//                                     </NavLink>
//                                 </li>
//                             </>
//                         )}

//                         {/* List item */}
//                         <li>
//                             <button
//                                 className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                                 data-tip="Settings">
//                                 {/* Settings icon */}
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 24 24"
//                                     strokeLinejoin="round"
//                                     strokeLinecap="round"
//                                     strokeWidth="2"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     className="my-1.5 inline-block size-4">
//                                     <path d="M20 7h-9"></path>
//                                     <path d="M14 17H5"></path>
//                                     <circle cx="17" cy="17" r="3"></circle>
//                                     <circle cx="7" cy="7" r="3"></circle>
//                                 </svg>
//                                 <span className="is-drawer-close:hidden">
//                                     Settings
//                                 </span>
//                             </button>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DashboardLayout;

// **********************
// **********************

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
