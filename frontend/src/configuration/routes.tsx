// lib
import { createBrowserRouter } from "react-router-dom";

// local
import { AdminViewPage } from "../pages/AdminViewPage";
import { Auth } from "../layout/Auth";
import { CitiesPage } from "../pages/AdminViewPage/CitiesPage";
import { CompaniesPage } from "../pages/AdminViewPage/CompaniesPage";
import { CompanySignUpPage } from "../pages/CompanySignUpPage";
import { CountriesPage } from "../pages/AdminViewPage/CountriesPage";
import { DashboardPage } from "../pages/DashboardPage";
import { EmployeeSignUpPage } from "../pages/EmployeeSignUpPage";
import { EmployeesPage } from "../pages/AdminViewPage/EmployeesPage";
import { GendersPage } from "../pages/AdminViewPage/GendersPage";
import { GoalsPage } from "../pages/AdminViewPage/GoalsPage";
import { GroupsPage } from "../pages/AdminViewPage/GroupsPage";
import { IndustryTypesPage } from "../pages/AdminViewPage/IndustryTypesPage";
import { InterestsPage } from "../pages/AdminViewPage/InterestsPage";
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
import { ProfilePage } from "../pages/ProfilePage";
import { Root } from "../layout/Root";
import { StrengthsPage } from "../pages/AdminViewPage/StrengthsPage";
import { UserToGroupPage } from "../pages/AdminViewPage/UserToGroupPage";
import { UsersPage } from "../pages/AdminViewPage/UsersPage";
import { ValuesPage } from "../pages/AdminViewPage/ValuesPage";
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
        children: [
          {
            path: "companies",
            element: <CompaniesPage />,
          },
          {
            path: "employees",
            element: <EmployeesPage />,
          },
          {
            path: "goals",
            element: <GoalsPage />,
          },
          {
            path: "industry-types",
            element: <IndustryTypesPage />,
          },
          {
            path: "values",
            element: <ValuesPage />,
          },
          {
            path: "cities",
            element: <CitiesPage />,
          },
          {
            path: "countries",
            element: <CountriesPage />,
          },
          {
            path: "genders",
            element: <GendersPage />,
          },
          {
            path: "interests",
            element: <InterestsPage />,
          },
          {
            path: "strengths",
            element: <StrengthsPage />,
          },
          {
            path: "groups",
            element: <GroupsPage />,
          },
          {
            path: "users",
            element: <UsersPage />,
          },
          {
            path: "user-to-group",
            element: <UserToGroupPage />,
          },
        ],
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
        path: "/profile",
        element: (
          <Auth>
            <ProfilePage />
          </Auth>
        ),
      },
      {
        path: "/employee-signup",
        element: (
          <Auth>
            <EmployeeSignUpPage />
          </Auth>
        ),
      },
    ],
  },
]);
