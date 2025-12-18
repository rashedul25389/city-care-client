// import React from 'react';
// import { Navigate, useLocation } from 'react-router';
// import useAuth from '../hooks/useAuth';

// const AdminRoute = ({ children }) => {
//     const { user, loading, role } = useAuth();
//     const location = useLocation();
//     if (loading) return <p>Loading...</p>;
//     if (!user || role !== 'admin')
//         return <Navigate to="/" state={{ from: location }} replace />;

//     return children;
// };

// export default AdminRoute;

import React from 'react';
import useRole from '../hooks/useRole';
import useAuth from '../hooks/useAuth';
import Loading from '../components/Loading/Loading';
import Forbidden from '../components/Forbidden/Forbidden';

const AdminRoute = ({ children }) => {
    const { user } = useAuth();
    const { role, roleLoading } = useRole();

    if (!user) return <Forbidden />; // login না থাকলে

    if (roleLoading) return <Loading />;

    if (role !== 'admin') return <Forbidden />;

    return children;
};

export default AdminRoute;
