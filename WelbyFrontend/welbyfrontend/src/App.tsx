import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import WelcomePage from './pages/Welcome'
/* Admin */
/* Company */
import CompanySignUpPage from './pages/Company/SignUp';
import CompanyLoginPage from './pages/Company/Login';
import CompanyDashboard from './pages/Company/Dashboard';
/* Employee */
import EmployeeSignUpPage from './pages/Employee/SignUp';
import EmployeeLoginPage from './pages/Employee/Login';
import EmployeeDashboard from './pages/Employee/Dashboard';
import EmployeeProfilePage from './pages/Employee/Dashboard/Profile';
import {UserContextProvider} from './context/UserContext';

function App() {
    return (
        <UserContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<WelcomePage />} />
                    <Route path="employee/login" element={<EmployeeLoginPage />} />
                    <Route path="employee/signup" element={<EmployeeSignUpPage />} />
                    <Route path="employee/dashboard" element={<EmployeeDashboard />} />
                    <Route path="employee/dashboard/profile" element={<EmployeeProfilePage />} />
                    <Route path="company/login" element={<CompanyLoginPage />} />
                    <Route path="company/signup" element={<CompanySignUpPage />} />
                    <Route path="company/dashboard" element={<CompanyDashboard />} />
                </Routes>
            </BrowserRouter>
        </UserContextProvider>
    );
}

export default App;
