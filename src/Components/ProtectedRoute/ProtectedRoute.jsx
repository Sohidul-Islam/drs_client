import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { getUser } from "../../features/auth/authSlice";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const userEmail = Cookies.get("email") || null;
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await dispatch(getUser(userEmail)).unwrap();
        const user = res?.data?.email;
        setUser(user);
        // setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [dispatch, userEmail]);

  if (loading) {
    return (
      <p className="text-center mt-5">
        Loading...
      </p>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: pathname }} />;
  }

  if (user) {
    return children;
  }
};

export default ProtectedRoute;
