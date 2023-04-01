import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  if (user) return <>{children}</>;
  else return <Navigate to="/" />;
};

export default ProtectedRoute;
