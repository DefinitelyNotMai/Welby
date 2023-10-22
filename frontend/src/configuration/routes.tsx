import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import AdminView from "../pages/AdminView";
import Dashboard from "../pages/Dashboard";
import MyDashboard from "../pages/Dashboard/MyDashboard";
import MyDashboardOverview from "../pages/Dashboard/MyDashboard/MyDashboardOverview";
import MyDashboardWellBeing from "../pages/Dashboard/MyDashboard/MyDashboardWellBeing";
import MyTeam from "../pages/Dashboard/MyTeam";
import MyTeamOverview from "../pages/Dashboard/MyTeam/MyTeamOverview";
import MyTeamProfile from "../pages/Dashboard/MyTeam/MyTeamProfile";
import OurCompany from "../pages/Dashboard/OurCompany";
import OurCompanyGoals from "../pages/Dashboard/OurCompany/OurCompanyGoals";
import OurCompanyMissionAndVision from "../pages/Dashboard/OurCompany/OurCompanyMissionAndVision";
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
            children: [
              {
                path: "overview",
                element: <MyDashboardOverview />,
              },
              {
                path: "well-being",
                element: <MyDashboardWellBeing />,
              },
            ],
          },
          {
            path: "my-team",
            element: <MyTeam />,
            children: [
              {
                path: "overview",
                element: <MyTeamOverview />,
              },
              {
                path: "profile",
                element: <MyTeamProfile />,
              },
            ],
          },
          {
            path: "our-company",
            element: <OurCompany />,
            children: [
              {
                path: "mission-and-vision",
                element: <OurCompanyMissionAndVision />,
              },
              {
                path: "company-goals",
                element: <OurCompanyGoals />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default routes;
