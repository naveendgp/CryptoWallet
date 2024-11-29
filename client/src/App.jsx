import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Register from './page/Register.jsx';
import Login from './page/Login.jsx';
import Home from './page/Home.jsx';
import MetaMask from './page/MetaMask.jsx';
import DashBoard from './page/DashBoard.jsx';
import ReferralTree from './page/RefferalTree.jsx';
import UserDetails from './page/UserDetails.jsx';
import LoginDashBoard from './page/LoginDashBoard.jsx';
import Admin from './page/Admin.jsx';

function App() {
    // Simple authentication check (example using localStorage):
    const isAuthenticated = !!localStorage.getItem('loggedIn');

    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/meta" element={<MetaMask />} />

                {/* Protected Routes */}
                <Route path="/referralTree" element={isAuthenticated ? <ReferralTree /> : <Navigate to="/login" />} />
                <Route path="/dashboard" element={isAuthenticated ? <DashBoard /> : <Navigate to="/login" />} />
                <Route path="/userDetails" element={isAuthenticated ? <UserDetails /> : <Navigate to="/login" />} />
                <Route path="/logindashboard" element={isAuthenticated ? <LoginDashBoard /> : <Navigate to="/login" />} />
                <Route path="/admin" element={isAuthenticated ? <Admin /> : <Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
