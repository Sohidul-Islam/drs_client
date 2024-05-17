import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout/DashboardLayout";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Home Page</div>,
  },
  {
    path: "/registration",
    element: <div>Registration Page</div>,
  },
  {
    path: "/sign-in",
    element: <div>Sign In Page</div>,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard/>,
      },
      {
        path: 'shop',
        element: <div>Dashboard Shop Page</div>
      }
    ],
  },
]);
