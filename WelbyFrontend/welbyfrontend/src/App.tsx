import Dashboard from './pages/AdminDashboard';
//import SignUpPage from './pages/SignUp';
import LoginPage from './pages/Login';
//import WelcomePage from './pages/Welcome'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/*<Route path="/" element={<WelcomePage />} />*/}
                <Route path="employee/login" element={<LoginPage />} />
                {/*<Route path="employee/signup" element={<SignUpPage />} />*/}
                <Route path="employee/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
