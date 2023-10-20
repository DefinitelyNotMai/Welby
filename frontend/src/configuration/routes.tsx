import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import AdminView from "../pages/AdminView";
import Dashboard from "../pages/Dashboard";
import MyDashboard from "../pages/Dashboard/MyDashboard";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Welcome from "../pages/Welcome";

const routes = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Welcome />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/admin-view",
        element: <AdminView />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "my-dashboard",
            element: <MyDashboard />,
          },
        ],
      },
    ],
  },
]);

export default routes;
