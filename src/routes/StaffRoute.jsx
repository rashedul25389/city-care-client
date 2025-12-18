import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';

const StaffRoute = ({ children }) => {
    const { user, loading, role } = useAuth();
    const location = useLocation();

    if (loading) return <p>Loading...</p>;

    if (!user || role !== 'staff')
        return <Navigate to="/" state={{ from: location }} replace />;

    return children;
};

export default StaffRoute;

// import React from 'react';
// import useAuth from '../hooks/useAuth';
// import useRole from '../hooks/useRole';
// import Loading from '../components/Loading/Loading';

// const StaffRoute = ({ children }) => {
//     const { loading, user } = useAuth();
//     const { role, roleLoading } = useRole()

//     if (loading || !user || roleLoading) {
//         return <Loading></Loading>
//     }

//     if (role !== 'staff') {
//         return <Forbidden></Forbidden>
//     }

//     return children;
// };

// export default StaffRoute;
