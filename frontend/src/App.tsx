import UserContextProvider from "./context/UserContextProvider";

const App = () => {
  return (
    <UserContextProvider>
      <div>App</div>
    </UserContextProvider>
  );
};

export default App;
