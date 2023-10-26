import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import EmployeeSignUpPage from "../pages/EmployeeSignUpPage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import SignUpPage from "../pages/SignUpPage";
import Welcome from "../pages/WelcomePage";

const routes = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "*",
        element: <NotFoundPage />,
      },
      {
        path: "/",
        element: <Welcome />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "/employee-signup",
        element: <EmployeeSignUpPage />,
      },
      {
        path: "/admin-view",
        element: <div>admin view</div>,
      },
      {
        path: "/dashboard",
        element: <div>dashboard</div>,
      },
      // {
      //   path: "/admin-view",
      //   element: <AdminView />,
      // },
      // {
      //   path: "/dashboard",
      //   element: <Dashboard />,
      //   children: [
      //     {
      //       path: "my-dashboard",
      //       element: <MyDashboard />,
      //       children: [
      //         {
      //           path: "overview",
      //           element: <MyDashboardOverview />,
      //         },
      //         {
      //           path: "well-being",
      //           element: <MyDashboardWellBeing />,
      //         },
      //       ],
      //     },
      //     {
      //       path: "my-team",
      //       element: <MyTeam />,
      //       children: [
      //         {
      //           path: "overview",
      //           element: <MyTeamOverview />,
      //         },
      //         {
      //           path: "profile",
      //           element: <MyTeamProfile />,
      //         },
      //       ],
      //     },
      //     {
      //       path: "our-company",
      //       element: <OurCompany />,
      //       children: [
      //         {
      //           path: "mission-and-vision",
      //           element: <OurCompanyMissionAndVision />,
      //         },
      //         {
      //           path: "company-goals",
      //           element: <OurCompanyGoals />,
      //         },
      //       ],
      //     },
      //   ],
      // },
    ],
  },
]);

export default routes;
