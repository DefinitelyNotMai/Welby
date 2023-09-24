import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import AdminView from './pages/AdminView'
import Profile from './pages/Dashboard/Profile';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Welcome />,
    },
    {
        path: 'login',
        element: <Login />,
    },
    {
        path: 'signup',
        element: <SignUp />,
    },
    {
        path: 'dashboard',
        element: <Dashboard />,
    },
    {
        path: '/dashboard/profile',
        element: <Profile />,
    },
    {
        path: 'admin-view',
        element: <AdminView />,
    },
]);

const App = () => {
    return (
        <UserContextProvider>
            <RouterProvider router={router} />
        </UserContextProvider>
    );
}

export default App;
