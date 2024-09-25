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
import CreateProductCategory from "../Pages/Dashboard/ProductCategory/CreateProductCategory";
import Customers from "../Pages/Dashboard/Customers/Customers";
import Manufacturer from "../Pages/Dashboard/Manufacturer/Manufacturer";
import Supplier from "../Pages/Dashboard/Supplier/Supplier";
import CreateManufacturer from "../Pages/Dashboard/Manufacturer/CreateManufacturer";
import CreateSupplier from "../Pages/Dashboard/Supplier/CreateSupplier";
import CreateCustomer from "../Pages/Dashboard/Customers/CreateCustomer";
import CreateProduct from "../Pages/Dashboard/Products/CreateProduct";
import StockAdjustment from "../Pages/Dashboard/StockAdjustment/StockAdjustment";
import StockItem from "../Pages/Dashboard/StockItem/StockItem";
import AdminProtectedRoute from "../Components/AdminProtectedRoute/AdminProtectedRoute";
import ExpiringStock from "../Pages/Dashboard/ExpiringStock/ExpiringStock";
import ExpiredStock from "../Pages/Dashboard/ExpiredStock/ExpiredStock";
import CreateAdjustment from "../Pages/Dashboard/StockAdjustment/CreateAdjustment";
import CreatePurchaseOverview from "../Pages/Dashboard/PurchaseOverview/CreatePurchaseOverview";
import CreateSales from "../Pages/Dashboard/Sales/CreateSales";
import ManageContent from "../Pages/AdminDashboard/ManageContent/ManageContent";
import ManageStore from "../Pages/AdminDashboard/ManageStore/ManageStore";
import CreateStore from "../Pages/AdminDashboard/ManageStore/CreateStore";
import SubscriptionDetails from "../Pages/AdminDashboard/SubscriptionDetails/SubscriptionDetails";
import CreateContent from "../Pages/AdminDashboard/ManageContent/CreateContent";

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
        path: "purchase-overview/create-purchase",
        element: <CreatePurchaseOverview />,
      },
      {
        path: "sales",
        element: <Sales />,
      },
      {
        path: "sales/create-sales",
        element: <CreateSales />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/create-product",
        element: <CreateProduct />,
      },
      {
        path: "product-categories",
        element: <ProductCategory />,
      },
      {
        path: "product-categories/create-product-category",
        element: (
          <AdminProtectedRoute>
            <CreateProductCategory />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "customers/create-customer",
        element: <CreateCustomer />,
      },
      {
        path: "manufacturer",
        element: <Manufacturer />,
      },
      {
        path: "manufacturer/create-manufacturer",
        element: (
          <AdminProtectedRoute>
            <CreateManufacturer />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "supplier",
        element: <Supplier />,
      },
      {
        path: "supplier/create-supplier",
        element: <CreateSupplier />,
      },
      {
        path: "stock-adjustment",
        element: <StockAdjustment />,
      },
      {
        path: "stock-adjustment/create-adjustment",
        element: <CreateAdjustment />,
      },
      {
        path: "stock-item",
        element: <StockItem />,
      },
      {
        path: "expiring-stock",
        element: <ExpiringStock/>,
      },
      {
        path: "expired-stock",
        element: <ExpiredStock />,
      },
      {
        path: "profile",
        element: <Profile />,
      },

      // Admin route 
      {
        path: "manage-content",
        element: <ManageContent />,
      },
      {
        path: "manage-content/create-content",
        element: <CreateContent />,
      },
      {
        path: "manage-store",
        element: <ManageStore />,
      },
      {
        path: "manage-store/create-store",
        element: <CreateStore />,
      },
      {
        path: "subscription-details",
        element: <SubscriptionDetails />,
      },
    ],
  },
]);
