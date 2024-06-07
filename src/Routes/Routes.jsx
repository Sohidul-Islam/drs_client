import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout/DashboardLayout";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import SubscriptionPlans from "../Pages/SubscriptionPlans/SubscriptionPlans";
import Home from "../Pages/Home/Home/Home";
import ProtectedRoute from "../Components/ProtectedRoute/ProtectedRoute";
import Profile from "../Pages/Dashboard/Profile/Profile";
import PurchaseOverview from "../Pages/Dashboard/PurchaseOverview/PurchaseOverview";
import Sales from "../Pages/Dashboard/Sales/Sales";
import Products from "../Pages/Dashboard/Products/Products";
import ProductCategory from "../Pages/Dashboard/ProductCategory/ProductCategory";
import Customers from "../Pages/Dashboard/Customers/Customers";
import Manufacturer from "../Pages/Dashboard/Manufacturer/Manufacturer";
import Supplier from "../Pages/Dashboard/Supplier/Supplier";

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
        path: "purchase-overview",
        element: <PurchaseOverview />,
      },
      {
        path: "sales",
        element: <Sales />,
      },

      {
        path: "products",
        element: <Products />,
      },
      {
        path: "product-categories",
        element: <ProductCategory />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "manufacturer",
        element: <Manufacturer />,
      },
      {
        path: "supplier",
        element: <Supplier />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);
