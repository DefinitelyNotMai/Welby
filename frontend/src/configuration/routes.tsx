// lib
import { createBrowserRouter } from "react-router-dom";

// local
import { AdminViewPage } from "../pages/AdminViewPage";
import { Auth } from "../layout/Auth";
import { CompanySignUpPage } from "../pages/CompanySignUpPage";
import { DashboardPage } from "../pages/DashboardPage";
import { EmployeeSignUpPage } from "../pages/EmployeeSignUpPage";
import { LoginPage } from "../pages/LoginPage";
import { MyDashboardOverviewPage } from "../pages/DashboardPage/MyDashboardPage/MyDashboardOverviewPage";
import { MyDashboardPage } from "../pages/DashboardPage/MyDashboardPage";
import { MyDashboardWellbeingPage } from "../pages/DashboardPage/MyDashboardPage/MyDashboardWellbeingPage";
import { MyTeamOverviewPage } from "../pages/DashboardPage/MyTeamPage/MyTeamOverviewPage";
import { MyTeamPage } from "../pages/DashboardPage/MyTeamPage";
import { MyTeamProfilePage } from "../pages/DashboardPage/MyTeamPage/MyTeamProfilePage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { OurCompanyCoreValuesPage } from "../pages/DashboardPage/OurCompanyPage/OurCompanyCoreValuesPage";
import { OurCompanyGoalsPage } from "../pages/DashboardPage/OurCompanyPage/OurCompanyGoalsPage";
import { OurCompanyMissionAndVisionPage } from "../pages/DashboardPage/OurCompanyPage/OurCompanyMissionAndVisionPage";
import { OurCompanyPage } from "../pages/DashboardPage/OurCompanyPage";
import { Root } from "../layout/Root";
import { WelcomePage } from "../pages/WelcomePage";

export const routes = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "*",
        element: <NotFoundPage />,
      },
      {
        path: "/",
        element: <WelcomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/admin-view",
        element: (
          <Auth>
            <AdminViewPage />
          </Auth>
        ),
      },
      {
        path: "/signup",
        element: <CompanySignUpPage />,
      },
      {
        path: "/dashboard",
        element: (
          <Auth>
            <DashboardPage />
          </Auth>
        ),
        children: [
          {
            path: "my-dashboard",
            element: <MyDashboardPage />,
            children: [
              {
                path: "overview",
                element: <MyDashboardOverviewPage />,
              },
              {
                path: "well-being",
                element: <MyDashboardWellbeingPage />,
              },
            ],
          },
          {
            path: "my-team",
            element: <MyTeamPage />,
            children: [
              {
                path: "overview",
                element: <MyTeamOverviewPage />,
              },
              {
                path: "member-profile",
                element: <MyTeamProfilePage />,
              },
            ],
          },
          {
            path: "our-company",
            element: <OurCompanyPage />,
            children: [
              {
                path: "mission-and-vision",
                element: <OurCompanyMissionAndVisionPage />,
              },
              {
                path: "company-goals",
                element: <OurCompanyGoalsPage />,
              },
              {
                path: "core-values",
                element: <OurCompanyCoreValuesPage />,
              },
            ],
          },
        ],
      },
      {
        /*
         * NOTE: Not too sure yet but maybe put a code sent in by the company as like a parameter
         * that'll be added in the url to determine for which company the employee is signing up for?
         * "/employee-signup?code=<random_chars>&?id=1001". Not yet final, just a thought
         */
        path: "/employee-signup",
        //
        element: <EmployeeSignUpPage />,
      },
    ],
  },
]);
