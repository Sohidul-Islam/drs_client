import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout/DashboardLayout";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import SubscriptionPlans from "../Pages/SubscriptionPlans/SubscriptionPlans";
import Home from "../Pages/Home/Home/Home";
import ProtectedRoute from "../Components/ProtectedRoute/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/subscription-plan",
    element: <SubscriptionPlans />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "sales",
        element: <div>sales Shop Page</div>,
      },
      {
        path: "products",
        element: <div>products Page</div>,
      },
      {
        path: "product-categories",
        element: <div>product-categories Page</div>,
      },
      {
        path: "customers",
        element: <div>customers Page</div>,
      },
      {
        path: "manufacturer",
        element: <div>manufacturer Page</div>,
      },
      {
        path: "supplier",
        element: <div>supplier Page</div>,
      },
      {
        path: "profile",
        element: <div>profile Page</div>,
      },
    ],
  },
]);
