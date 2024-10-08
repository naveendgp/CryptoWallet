import { React } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './page/Register.jsx'; // Make sure the path is correct
import Login from './page/Login.jsx';
import Home from "./page/Home.jsx";
import MetaMask from './page/MetaMask.jsx';
import DashBoard from './page/DashBoard.jsx'
import UserDetails from './page/UserDetails.jsx';
function App() {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path='/login' element={<Login/>}/> 
                <Route path='/meta' element={<MetaMask/>}/>
                <Route path='/dashboard' element={<DashBoard/>}/>
                <Route path='/userDetails' element={<UserDetails/>}/>
            </Routes>
        </BrowserRouter>
        </>
    );
}

export default App;
