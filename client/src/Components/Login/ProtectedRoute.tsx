import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isLoggedIn } = useContext(AppContext);

    if (!isLoggedIn) {
        console.log("User is not logged in");
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;