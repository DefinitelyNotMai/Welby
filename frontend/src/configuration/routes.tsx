// lib
import { createBrowserRouter } from "react-router-dom";

// local
import { CompanySignUpPage } from "../pages/CompanySignUpPage";
import { EmployeeSignUpPage } from "../pages/EmployeeSignUpPage";
import { LoginPage } from "../pages/LoginPage";
import { NotFoundPage } from "../pages/NotFoundPage";
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
        path: "/signup",
        element: <CompanySignUpPage />,
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
