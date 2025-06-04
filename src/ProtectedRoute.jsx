import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ role, children }) => {
  const token = localStorage.getItem('auth_token');
  const userRole = localStorage.getItem('role');

  if (!token) {
    // If not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (role) {
    const allowedRoles = Array.isArray(role) ? role : [role];
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Everything is good, allow access
  return children;
};

export default ProtectedRoute