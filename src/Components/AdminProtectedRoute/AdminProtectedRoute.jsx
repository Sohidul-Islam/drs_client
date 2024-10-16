import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const { role } = useSelector((state) => state.auth); 
  const { pathname } = useLocation();

  if (role === "user") {
    return <Navigate to="/dashboard" state={{ from: pathname }} />;
  }

  if (role === "admin") {
    return children;
  }
};

export default AdminProtectedRoute;
