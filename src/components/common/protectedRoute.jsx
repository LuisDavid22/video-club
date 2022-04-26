import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getCurrentUser } from '../../services/authService';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const user = getCurrentUser();

  console.log(location);
  if (!user) return <Navigate replace to='/login' state={{ from: location }} />;

  return children;
};

export default ProtectedRoute;
