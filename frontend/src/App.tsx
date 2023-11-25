// lib
import { RouterProvider } from "react-router-dom";

// local
import { UserContextProvider } from "./context/UserContext";
import { routes } from "./configuration/routes";

export const App = () => {
  return (
    <UserContextProvider>
      <RouterProvider router={routes} />
    </UserContextProvider>
  );
};
