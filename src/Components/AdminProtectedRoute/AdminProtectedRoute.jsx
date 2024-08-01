import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  // const { role } = useSelector((state) => state.auth);
  // console.log(role); output: admin

  const { pathname } = useLocation();
  const role = "user" //this is temporary, i have to remove it later and uncomment line no 6

  if (role === "user") {
    return <Navigate to="/dashboard" state={{ from: pathname }} />;
  }

  if (role === "admin") {
    return children;
  }
};

export default AdminProtectedRoute;
