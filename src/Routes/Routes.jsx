import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout/DashboardLayout";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import ServicePlan from "../Pages/ServicePlan/ServicePlan";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div className="text-center">Home Page</div>,
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
    path: "/service-plan",
    element: <ServicePlan />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "shop",
        element: <div>Dashboard Shop Page</div>,
      },
    ],
  },
]);
