import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';
import WelcomePage from './pages/Welcome'
import LoginPage from './pages/Login'
import SignUpPage from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import MyDashboard from './pages/Dashboard/MyDashboard'
import MyTeam from './pages/Dashboard/MyTeam/MyTeam'
import OurCompany from './pages/Dashboard/OurCompany'
import AdminView from './pages/AdminView'

function App() {
    return (
        <UserContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/admin-view" element={<AdminView/> }></Route>
                    <Route path="/" element={<WelcomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/dashboard/my-dashboard" element={<MyDashboard />} />
                    <Route path="/dashboard/my-team" element={<MyTeam />} />
                    <Route path="/dashboard/our-company" element={<OurCompany />} />
                </Routes>
            </BrowserRouter>
        </UserContextProvider>
    );
}

export default App;
