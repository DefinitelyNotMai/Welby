// lib
import { RouterProvider } from "react-router-dom";

// local
import { UserContextProvider } from "./context/UserContext";
import { routes } from "./configuration/routes";

const App = () => {
  return (
    <UserContextProvider>
      <RouterProvider router={routes} />
    </UserContextProvider>
  );
};

export default App;
