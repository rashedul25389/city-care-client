import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return null;
    if (!user)
        return <Navigate to="/login" state={{ from: location }} replace />;

    return children;
};

export default PrivateRoute;



// import React from 'react';
// import useAuth from '../hooks/useAuth';
// import { Navigate, useLocation } from 'react-router';
// import Loading from '../components/Loading/Loading';

// const PrivateRoute = ({ children }) => {
//     const { user, loading } = useAuth();
//     const location = useLocation();

//     if (loading) {
//         return <Loading></Loading>
//     }

//     if(!user){
//         return <Navigate state={location.pathname} to="/login"></Navigate>
//     }

//     return children;
// };

// export default PrivateRoute;
