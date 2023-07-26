import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';
import WelcomePage from './pages/Welcome'
import LoginPage from './pages/Login'
import SignUpPage from './pages/SignUp'
import Dashboard from './pages/Dashboard'

function App() {
    return (
        <UserContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<WelcomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </BrowserRouter>
        </UserContextProvider>
    );
}

export default App;
