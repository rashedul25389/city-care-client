import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import StaffRoute from './StaffRoute';

// Pages
import Home from '../pages/Home/Home/Home';
import Login from '../pages/Auth/Login/Login';
import Register from '../pages/Auth/Register/Register';
import CreateIssue from '../pages/CreateIssue/CreateIssue';
import AllIssues from '../pages/AllIssues/AllIssues';
import IssueTrack from '../pages/IssueTrack/IssueTrack';
import Payment from '../pages/Dashboard/Payment/Payment';
import PaymentCancelled from '../pages/Dashboard/Payment/PaymentCancelled';
import PaymentHistory from '../pages/Dashboard/PaymentHistory/PaymentHistory';
import DashboardHome from '../pages/Dashboard/DashboardHome/DashboardHome';
import UsersManagement from '../pages/Dashboard/UsersManagement/UsersManagement';
import AssignStaffs from '../pages/Dashboard/AssignStaffs/AssignStaffs';
import ApproveStaffs from '../pages/Dashboard/ApproveStaffs/ApproveStaffs';
import MyIssues from '../pages/Dashboard/MyIssues/MyIssues';
import AssignedIssues from '../pages/Dashboard/AssignedIssues/AssignedIssues';
import CompletedIssues from '../pages/Dashboard/CompletedIssues/CompletedIssues';
import Staff from '../pages/Staff/Staff';
import PaymentsManagement from '../pages/Dashboard/PaymentsManagement/PaymentsManagement';
import IssueDetails from '../pages/AllIssues/IssueDetails';
import Contact from '../pages/Contact/Contact';
import SupportMessages from '../pages/Dashboard/SupportMessages/SupportMessages';
import PaymentSuccess from '../pages/Dashboard/Payment/PaymentSuccess';

export const Router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <Home /> },
            {
                path: 'contact',
                element: <Contact />,
            },
            {
                path: 'staff',
                element: (
                    <PrivateRoute>
                        <Staff />
                    </PrivateRoute>
                ),
            },
            { path: 'payment-success', element: <PaymentSuccess /> },
            {
                path: 'issues',
                element: (
                    <PrivateRoute>
                        <CreateIssue />
                    </PrivateRoute>
                ),
            },
            { path: 'all-issues', element: <AllIssues /> },
            { path: 'issue-track/:trackingId', element: <IssueTrack /> },
            {
                path: '/issue-details/:id',
                element: (
                    <PrivateRoute>
                        <IssueDetails />
                    </PrivateRoute>
                ),
            },
        ],
    },
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
        ],
    },
    {
        path: '/dashboard',
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        children: [
            { index: true, element: <DashboardHome /> },
            { path: 'my-issues', element: <MyIssues /> },
            { path: 'create-issue', element: <CreateIssue /> },
            { path: 'payment/:issueId', element: <Payment /> },
            { path: 'payment-history', element: <PaymentHistory /> },
            { path: 'payment-cancelled', element: <PaymentCancelled /> },
            { path: 'issue-details/:id', element: <IssueDetails /> },

            // Staff routes
            {
                path: 'assigned-issues',
                element: (
                    <StaffRoute>
                        <AssignedIssues />
                    </StaffRoute>
                ),
            },
            {
                path: 'completed-issues',
                element: (
                    <StaffRoute>
                        <CompletedIssues />
                    </StaffRoute>
                ),
            },

            // Admin routes
            {
                path: 'users-management',
                element: (
                    <AdminRoute>
                        <UsersManagement />
                    </AdminRoute>
                ),
            },
            {
                path: 'assign-staffs',
                element: (
                    <AdminRoute>
                        <AssignStaffs />
                    </AdminRoute>
                ),
            },
            {
                path: 'approve-staffs',
                element: (
                    <AdminRoute>
                        <ApproveStaffs />
                    </AdminRoute>
                ),
            },
            {
                path: 'all-issues',
                element: (
                    <AdminRoute>
                        <AllIssues />
                    </AdminRoute>
                ),
            },
            {
                path: 'payment-management',
                element: (
                    <AdminRoute>
                        <PaymentsManagement />
                    </AdminRoute>
                ),
            },
            {
                path: 'support-messages',
                element: (
                    <AdminRoute>
                        <SupportMessages />
                    </AdminRoute>
                ),
            },
        ],
    },
]);
